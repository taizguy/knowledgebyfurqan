import React from 'react';
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
  X,
  Clock,
  Compass,
  MapPin,
  Landmark,
  BookOpen,
  Layers,
  Scroll,
  ExternalLink,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  GitCompare,
  Users
} from 'lucide-react';

interface EventDetailDrawerProps {
  event: Event | null;
  onClose: () => void;
  onOpenInAtlas: (eventId: string) => void;
  onOpenChronologyComparison: (event: Event) => void;
}

export const EventDetailDrawer: React.FC<EventDetailDrawerProps> = ({
  event,
  onClose,
  onOpenInAtlas,
  onOpenChronologyComparison
}) => {
  const { language } = useLanguage();
  const { navigateToChapter, navigateToClaim, navigateToEntity } = useNavigation();
  const isUrdu = language === 'ur';

  if (!event) return null;

  // Resolve connected entities
  const place = event.placeId ? DataService.getPlaceByIdOrSlug(event.placeId) : null;
  const civ = event.civilizationId ? DataService.getCivilizationByIdOrSlug(event.civilizationId) : null;
  const chapter = event.chapterId ? DataService.getChapterByIdOrSlug(event.chapterId) : null;
  const primarySources = (event.primarySourceIds || [])
    .map((id) => DataService.getPrimarySourceById(id))
    .filter((ps): ps is NonNullable<typeof ps> => Boolean(ps));
  const people = (event.relatedPersonIds || [])
    .map((id) => DataService.getPersonByIdOrSlug(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const claims = (event.claimIds || [])
    .map((id) => DataService.getClaimByIdOrSlug(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const earliestYear = event.historicalDate?.earliestYear ?? event.rawYearBPOrBCE ?? 0;
  const latestYear = event.historicalDate?.latestYear ?? earliestYear;
  const spanDuration = calculateYearSpan(earliestYear, latestYear);
  const dateBasis = event.historicalDate?.dateBasis;
  const dateBasisMeta = dateBasis ? DATE_BASIS_META[dateBasis] : null;

  const hasAlternatives = Boolean(
    event.historicalDate?.alternativeDates && event.historicalDate.alternativeDates.length > 0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-[#E6E1D6] animate-in slide-in-from-right duration-200 overflow-hidden">
        {/* Top App Bar */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E1D6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#1E3A5F] text-white rounded-xs">
              <Clock className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
                Historical Event Dossier · {event.id}
              </span>
              <h2 className="text-base sm:text-lg font-serif font-medium text-[#1A1918] truncate max-w-md">
                {event.title[language]}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenInAtlas(event.id)}
              className="px-2.5 py-1.5 border border-[#E6E1D6] bg-white hover:bg-[#FAF8F5] text-xs font-sans text-[#1E3A5F] rounded-xs cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Explore in Knowledge Atlas"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Atlas</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#878177] hover:text-[#1A1918] hover:bg-[#E6E1D6]/50 rounded-xs transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Dossier Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Chronological Header Card */}
          <div className="bg-[#FAF8F5] border border-[#E6E1D6] p-4 sm:p-5 rounded-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-[#1E3A5F] tracking-wide">
                {formatHistoricalDate(event.historicalDate, language)}
              </span>
              <EpistemicBadge status={event.epistemicStatus} />
            </div>

            {/* Structured Date Metrics Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E6E1D6] text-xs font-sans">
              <div>
                <span className="block text-[10px] uppercase font-mono text-[#878177]">
                  {isUrdu ? 'ابتدائی سال' : 'Earliest Year'}
                </span>
                <span className="font-mono font-medium text-[#1A1918]">
                  {formatSignedYear(earliestYear, language)}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-mono text-[#878177]">
                  {isUrdu ? 'آخری سال' : 'Latest Year'}
                </span>
                <span className="font-mono font-medium text-[#1A1918]">
                  {formatSignedYear(latestYear, language)}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-mono text-[#878177]">
                  {isUrdu ? 'دورانیہ' : 'Duration Span'}
                </span>
                <span className="font-mono font-medium text-[#1A1918]">
                  {spanDuration > 0
                    ? `~${spanDuration.toLocaleString()} ${isUrdu ? 'سال' : 'yrs'}`
                    : isUrdu
                    ? 'نقطہ واقعہ'
                    : 'Point Event'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-mono text-[#878177]">
                  {isUrdu ? 'تقویمی نظام' : 'Calendar System'}
                </span>
                <span className="font-serif capitalize text-[#1A1918]">
                  {event.historicalDate?.calendarSystem?.replace('_', ' ') || 'Gregorian'}
                </span>
              </div>
            </div>

            {/* Method & Basis */}
            {dateBasisMeta && (
              <div className="pt-2 border-t border-[#E6E1D6] text-xs font-serif text-[#5C5751]">
                <strong className="text-[#1A1918]">{isUrdu ? 'تاریخی بنیاد: ' : 'Dating Basis: '}</strong>
                <span>{dateBasisMeta.label[language]} — {dateBasisMeta.description[language]}</span>
              </div>
            )}

            {event.historicalDate?.datingMethodDescription && (
              <div className="text-xs font-serif text-[#5C5751] italic bg-white p-2.5 border border-[#E6E1D6] rounded-2xs">
                {event.historicalDate.datingMethodDescription[language]}
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1A1918] leading-tight">
              {event.title[language]}
            </h3>
            {event.title[language === 'ur' ? 'en' : 'ur'] && (
              <div className="text-xs font-serif text-[#878177] italic">
                {event.title[language === 'ur' ? 'en' : 'ur']}
              </div>
            )}

            <p className="text-sm font-serif text-[#2D2A26] leading-relaxed pt-1">
              {event.description[language]}
            </p>
          </div>

          {/* Disputed Chronology Alert & Alternative Proposals */}
          {hasAlternatives && (
            <div className="bg-amber-50/70 border border-amber-300 p-4 rounded-xs space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{isUrdu ? 'متوازی و اختلافی تواریخ (Alternative Proposals)' : 'Competing Chronological Proposals'}</span>
                </div>

                <button
                  onClick={() => onOpenChronologyComparison(event)}
                  className="px-2 py-1 bg-amber-900 text-white text-[11px] font-sans font-medium rounded-xs hover:bg-amber-950 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <GitCompare className="w-3 h-3" />
                  <span>{isUrdu ? 'موازنہ کریں' : 'Compare Side-by-Side'}</span>
                </button>
              </div>

              <p className="text-xs font-serif text-amber-950 leading-relaxed">
                {isUrdu
                  ? 'اس واقعے کی تاریخ کے تعین میں محققین یا روایات کے درمیان اختلاف موجود ہے۔ آرکائیو نے دونوں آراء کو ان کے متعلقہ شواہد کے ساتھ الگ الگ محفوظ کیا ہے۔'
                  : 'Scholars dispute the dating of this event. Rather than forcing a false consensus, both proposals are preserved with their evidence.'}
              </p>

              <div className="space-y-2 pt-1">
                {event.historicalDate.alternativeDates?.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-3 bg-white border border-amber-200 text-xs rounded-2xs space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2 font-serif font-semibold text-[#1A1918]">
                      <span>{prop.proposalName[language]}</span>
                      <span className="font-mono text-[#1E3A5F]">{prop.displayLabel[language]}</span>
                    </div>
                    <div className="text-[11px] font-sans text-[#5C5751]">
                      <strong>Proponent / Source: </strong>
                      {prop.proponentOrSource[language]}
                    </div>
                    <div className="text-[11px] font-serif text-[#5C5751] italic">
                      {prop.basis[language]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connected Research Entities */}
          <div className="space-y-4 pt-2 border-t border-[#E6E1D6]">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#878177]">
              {isUrdu ? 'مربوط علمی ادارے اور آرکائیو ریکارڈز' : 'Connected Research Records & Entities'}
            </h4>

            {/* Chapter Link */}
            {chapter && (
              <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen className="w-4 h-4 text-[#1E3A5F] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#878177] uppercase">
                      Associated Chapter
                    </span>
                    <h5 className="text-xs font-serif font-medium text-[#1A1918] truncate">
                      {isUrdu ? `باب 0${chapter.chapterNumber}: ` : `Chapter 0${chapter.chapterNumber}: `}
                      {chapter.title[language]}
                    </h5>
                  </div>
                </div>

                <button
                  onClick={() => navigateToChapter(chapter.slug)}
                  className="px-2.5 py-1 text-xs font-sans font-medium text-[#1E3A5F] hover:text-[#1A1918] transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <span>{isUrdu ? 'باب پڑھیں' : 'Read Chapter'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            )}

            {/* Place and Civilization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif">
              {place && (
                <div className="p-3 border border-[#E6E1D6] rounded-xs">
                  <div className="flex items-center gap-1.5 text-[#878177] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase">Excavation Site / Place</span>
                  </div>
                  <div className="font-medium text-[#1A1918]">{place.name[language]}</div>
                  <div className="text-[11px] text-[#5C5751]">{place.region[language]}</div>
                </div>
              )}

              {civ && (
                <div className="p-3 border border-[#E6E1D6] rounded-xs">
                  <div className="flex items-center gap-1.5 text-[#878177] mb-1">
                    <Landmark className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase">Civilization / Epoch</span>
                  </div>
                  <div className="font-medium text-[#1A1918]">{civ.name[language]}</div>
                  <div className="text-[11px] text-[#5C5751]">{civ.flourishedEra}</div>
                </div>
              )}
            </div>

            {/* People */}
            {people.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#878177]">
                  {isUrdu ? 'متعلقہ شخصیات:' : 'Associated Historical Figures:'}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {people.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => navigateToEntity('people', p.id)}
                      className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] text-xs font-serif text-[#1A1918] rounded-xs cursor-pointer flex items-center gap-1"
                    >
                      <Users className="w-3 h-3 text-[#878177]" />
                      <span>{p.name[language]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Claims */}
            {claims.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono text-[#878177]">
                  {isUrdu ? 'متعلقہ تحقیقی دعوے (Research Claims):' : 'Investigated Claims in Workspace:'}
                </span>
                <div className="space-y-1.5">
                  {claims.map((clm) => (
                    <div
                      key={clm.id}
                      onClick={() => navigateToClaim(clm.id)}
                      className="p-2.5 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] rounded-xs cursor-pointer text-xs space-y-1 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-1 font-mono text-[10px] text-[#878177]">
                        <span>{clm.id}</span>
                        <EpistemicBadge status={clm.status || clm.epistemicStatus} />
                      </div>
                      <p className="font-serif text-[#1A1918] line-clamp-1">{clm.statement[language]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Artifacts */}
            {primarySources.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono text-[#878177]">
                  {isUrdu ? 'بنیادی مادی آثار و کتبات:' : 'Primary Artifacts & Inscriptions:'}
                </span>
                <div className="space-y-1">
                  {primarySources.map((ps) => (
                    <div
                      key={ps.id}
                      className="p-2.5 border border-[#E6E1D6] rounded-xs text-xs font-serif flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Scroll className="w-3.5 h-3.5 text-[#1E3A5F]" />
                        <span className="font-medium text-[#1A1918]">{ps.title[language]}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#878177]">{ps.datingRange}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E6E1D6] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onOpenInAtlas(event.id)}
            className="px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#152942] text-white text-xs font-sans font-medium rounded-xs cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'اٹلس میں مشاہدہ کریں' : 'Explore in Knowledge Atlas'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-[#E6E1D6] text-xs font-sans text-[#5C5751] hover:text-[#1A1918] hover:bg-white rounded-xs cursor-pointer"
          >
            {isUrdu ? 'بند کریں' : 'Close Dossier'}
          </button>
        </div>
      </div>
    </div>
  );
};
