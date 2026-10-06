import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { Event } from '../../types/entities';
import {
  formatHistoricalDate,
  formatSignedYear,
  calculateYearSpan,
  EVENT_CATEGORY_META,
  DATE_BASIS_META
} from '../../utils/chronology';
import { DataService } from '../../services/dataService';
import { EpistemicBadge } from '../common/EpistemicBadge';
import {
  ArrowUpDown,
  Clock,
  Compass,
  MapPin,
  BookOpen,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TimelineListViewProps {
  events: Event[];
  selectedEventId: string | null;
  onSelectEvent: (event: Event) => void;
  onOpenInAtlas: (eventId: string) => void;
}

export const TimelineListView: React.FC<TimelineListViewProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  onOpenInAtlas
}) => {
  const { language } = useLanguage();
  const { navigateToChapter } = useNavigation();
  const isUrdu = language === 'ur';

  const [sortAscending, setSortAscending] = useState(true);

  const sortedEvents = React.useMemo(() => {
    return [...events].sort((a, b) => {
      const yearA = a.historicalDate?.earliestYear ?? a.rawYearBPOrBCE ?? 0;
      const yearB = b.historicalDate?.earliestYear ?? b.rawYearBPOrBCE ?? 0;
      return sortAscending ? yearA - yearB : yearB - yearA;
    });
  }, [events, sortAscending]);

  return (
    <div className="bg-white border border-[#E6E1D6] shadow-xs rounded-xs overflow-hidden">
      {/* List Header Bar */}
      <div className="p-4 bg-[#FAF8F5] border-b border-[#E6E1D6] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#1E3A5F]" />
          <h3 className="font-serif text-sm font-semibold text-[#1A1918]">
            {isUrdu ? 'فہرست وار تاریخی ریکارڈ (Chronological Register)' : 'Chronological Event Directory'}
          </h3>
          <span className="text-xs font-mono text-[#878177]">
            ({events.length} {isUrdu ? 'واقعات' : 'documented events'})
          </span>
        </div>

        <button
          onClick={() => setSortAscending(!sortAscending)}
          className="px-2.5 py-1.5 border border-[#E6E1D6] bg-white hover:bg-[#FAF8F5] text-xs font-sans text-[#1A1918] rounded-xs cursor-pointer flex items-center gap-1.5 transition-colors"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-[#1E3A5F]" />
          <span>
            {sortAscending
              ? isUrdu
                ? 'ترتیب: قدیم ترین سے جدید'
                : 'Oldest to Most Recent'
              : isUrdu
              ? 'ترتیب: جدید سے قدیم ترین'
              : 'Most Recent to Oldest'}
          </span>
        </button>
      </div>

      {/* Events Table / Item Cards */}
      <div className="divide-y divide-[#F0ECE3]">
        {sortedEvents.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm font-serif text-[#878177]">
              {isUrdu
                ? 'موجودہ فلٹرز سے مطابقت رکھنے والا کوئی واقعہ نہیں ملا۔'
                : 'No historical events match active category or epoch filters.'}
            </p>
          </div>
        ) : (
          sortedEvents.map((event) => {
            const isSelected = selectedEventId === event.id;
            const place = event.placeId ? DataService.getPlaceByIdOrSlug(event.placeId) : null;
            const civ = event.civilizationId ? DataService.getCivilizationByIdOrSlug(event.civilizationId) : null;
            const chapter = event.chapterId ? DataService.getChapterByIdOrSlug(event.chapterId) : null;

            const dateBasis = event.historicalDate?.dateBasis;
            const dateBasisMeta = dateBasis ? DATE_BASIS_META[dateBasis] : null;

            const earliestYear = event.historicalDate?.earliestYear ?? event.rawYearBPOrBCE ?? 0;
            const latestYear = event.historicalDate?.latestYear ?? earliestYear;
            const spanDuration = calculateYearSpan(earliestYear, latestYear);

            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className={`p-4 sm:p-5 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#F5F2EB]/90 border-l-4 rtl:border-l-0 rtl:border-r-4 border-l-[#1E3A5F] rtl:border-r-[#1E3A5F]'
                    : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Column: Date and Key Info */}
                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Date expression and Confidence badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#1E3A5F] tracking-tight bg-white border border-[#E6E1D6] px-2 py-0.5 rounded-2xs">
                        {formatHistoricalDate(event.historicalDate, language)}
                      </span>

                      {spanDuration > 0 && (
                        <span className="text-[11px] font-mono text-[#878177]">
                          (span: ~{spanDuration.toLocaleString()} {isUrdu ? 'سال' : 'years'})
                        </span>
                      )}

                      <EpistemicBadge status={event.epistemicStatus} />

                      {event.historicalDate?.isDisputed && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-2xs">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>{isUrdu ? 'اختلافی تواریخ' : 'Disputed Proposal'}</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-base sm:text-lg font-serif font-medium text-[#1A1918] leading-snug">
                      {event.title[language]}
                    </h4>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm font-serif text-[#5C5751] line-clamp-2 leading-relaxed">
                      {event.summary ? event.summary[language] : event.description[language]}
                    </p>

                    {/* Dating Basis & Method Info */}
                    {dateBasisMeta && (
                      <div className="text-[11px] font-sans text-[#878177] flex items-center gap-1.5 pt-1">
                        <strong className="text-[#1A1918]">
                          {isUrdu ? 'طریقہ تعین تاریخ:' : 'Dating Basis:'}
                        </strong>
                        <span>{dateBasisMeta.label[language]}</span>
                      </div>
                    )}

                    {/* Thematic Categories */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-sans text-[#878177]">
                      {event.categories?.map((cat) => {
                        const meta = EVENT_CATEGORY_META[cat];
                        return (
                          <span key={cat} className="inline-flex items-center gap-1">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: meta?.color || '#1E3A5F' }}
                            />
                            <span>{meta ? meta.label[language] : cat}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Anchors and Action Buttons */}
                  <div className="lg:w-72 shrink-0 pt-2 lg:pt-0 lg:border-l rtl:lg:border-l-0 rtl:lg:border-r border-[#E6E1D6] lg:pl-5 rtl:lg:pl-0 rtl:lg:pr-5 flex flex-col justify-between space-y-3">
                    {/* Anchors */}
                    <div className="space-y-1.5 text-xs font-sans text-[#5C5751]">
                      {place && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#878177] shrink-0" />
                          <span className="font-serif truncate">{place.name[language]}</span>
                        </div>
                      )}
                      {civ && (
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-2xs bg-[#8B261E] shrink-0" />
                          <span className="font-serif truncate">{civ.name[language]}</span>
                        </div>
                      )}
                      {chapter && (
                        <div className="flex items-center gap-1.5 text-[#1E3A5F]">
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-serif truncate">
                            {isUrdu ? `باب 0${chapter.chapterNumber}` : `Chapter 0${chapter.chapterNumber}`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#F0ECE3]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(event);
                        }}
                        className="px-2.5 py-1 bg-[#1A1918] text-white hover:bg-[#2D2A26] text-xs font-sans font-medium rounded-xs cursor-pointer shadow-2xs flex items-center gap-1"
                      >
                        <span>{isUrdu ? 'تفصیلات' : 'Inspect'}</span>
                        <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenInAtlas(event.id);
                        }}
                        className="px-2.5 py-1 border border-[#E6E1D6] hover:bg-white text-xs font-sans text-[#1E3A5F] rounded-xs cursor-pointer flex items-center gap-1"
                        title="View in Knowledge Atlas"
                      >
                        <Compass className="w-3 h-3 text-[#1E3A5F]" />
                        <span>Atlas</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
