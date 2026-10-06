import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { DataService } from '../../services/dataService';
import { Event, EventCategory, HistoricalEpoch, ChronologicalConfidence, DateType } from '../../types/entities';
import { TimelineFilterControls } from './TimelineFilterControls';
import { TimelineVisualRail } from './TimelineVisualRail';
import { TimelineListView } from './TimelineListView';
import { EventDetailDrawer } from './EventDetailDrawer';
import { ChronologyComparisonModal } from './ChronologyComparisonModal';
import { NewEventModal } from './NewEventModal';
import {
  Clock,
  Compass,
  GitCompare,
  List,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Plus,
  SlidersHorizontal
} from 'lucide-react';

export const HistoricalTimeline: React.FC = () => {
  const { language } = useLanguage();
  const { route, navigateToAtlas } = useNavigation();
  const isUrdu = language === 'ur';

  // View Mode: 'visual' | 'list'
  const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual');

  // Active investigation event
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Modals state
  const [comparisonTargetEvent, setComparisonTargetEvent] = useState<Event | null>(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<EventCategory>>(new Set());
  const [selectedEpoch, setSelectedEpoch] = useState<HistoricalEpoch | 'all'>('all');
  const [selectedConfidence, setSelectedConfidence] = useState<ChronologicalConfidence | 'all'>('all');
  const [selectedDateType, setSelectedDateType] = useState<DateType | 'all'>('all');

  // Jump year trigger
  const [targetJumpYear, setTargetJumpYear] = useState<number | null>(null);

  // Re-render version for local storage persistence
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const handleEventsUpdated = () => setDataVersion((v) => v + 1);
    window.addEventListener('archive-events-updated', handleEventsUpdated);
    return () => window.removeEventListener('archive-events-updated', handleEventsUpdated);
  }, []);

  // Parse deep-link query parameter ?event=... or ?epoch=...
  useEffect(() => {
    if (route.query) {
      if (route.query.event) {
        const found = DataService.getEventByIdOrSlug(route.query.event);
        if (found) {
          setSelectedEventId(found.id);
        }
      }
      if (route.query.epoch && route.query.epoch !== 'all') {
        setSelectedEpoch(route.query.epoch as any);
      }
    }
  }, [route.query, dataVersion]);

  // All events from data service
  const allEvents = useMemo(() => DataService.getEvents(), [dataVersion]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return allEvents.filter((ev) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch =
          ev.title.en?.toLowerCase().includes(q) ||
          ev.title.ur?.toLowerCase().includes(q) ||
          ev.title[language]?.toLowerCase().includes(q);
        const descMatch =
          ev.description?.en?.toLowerCase().includes(q) ||
          ev.description?.ur?.toLowerCase().includes(q) ||
          ev.description?.[language]?.toLowerCase().includes(q);
        const dateMatch =
          ev.historicalDate?.displayLabel?.en?.toLowerCase().includes(q) ||
          ev.historicalDate?.displayLabel?.ur?.toLowerCase().includes(q) ||
          ev.approximateDate?.toLowerCase().includes(q);
        const idMatch = ev.id.toLowerCase().includes(q);

        if (!titleMatch && !descMatch && !dateMatch && !idMatch) return false;
      }

      // 2. Categories Filter
      if (selectedCategories.size > 0) {
        const hasAnyCategory = ev.categories?.some((c) => selectedCategories.has(c));
        if (!hasAnyCategory) return false;
      }

      // 3. Epoch Filter
      if (selectedEpoch !== 'all') {
        if (ev.epoch !== selectedEpoch) return false;
      }

      // 4. Chronological Confidence Filter
      if (selectedConfidence !== 'all') {
        if (ev.chronologicalConfidence !== selectedConfidence) return false;
      }

      // 5. Date Type Filter
      if (selectedDateType !== 'all') {
        if (ev.historicalDate?.dateType !== selectedDateType) return false;
      }

      return true;
    });
  }, [
    allEvents,
    searchQuery,
    selectedCategories,
    selectedEpoch,
    selectedConfidence,
    selectedDateType,
    language
  ]);

  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return DataService.getEventByIdOrSlug(selectedEventId) || null;
  }, [selectedEventId, allEvents]);

  const handleToggleCategory = (cat: EventCategory) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories(new Set());
    setSelectedEpoch('all');
    setSelectedConfidence('all');
    setSelectedDateType('all');
    setTargetJumpYear(null);
  };

  const handleJumpToYear = (year: number) => {
    setTargetJumpYear(year);
  };

  const handleOpenComparisonForFirstDisputed = () => {
    const disputed = allEvents.find(
      (e) => Boolean(e.historicalDate?.alternativeDates && e.historicalDate.alternativeDates.length > 0)
    );
    if (disputed) {
      setComparisonTargetEvent(disputed);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#E6E1D6] pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#878177]">
            <Clock className="w-4 h-4 text-[#1E3A5F]" />
            <span>{isUrdu ? 'تاریخی خط زمانی اور تقویم' : 'Historical Timeline & Chronology'}</span>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E6E1D6] p-1 rounded-xs text-xs font-sans">
              <button
                onClick={() => setViewMode('visual')}
                className={`px-3 py-1 rounded-xs cursor-pointer flex items-center gap-1.5 font-medium transition-colors ${
                  viewMode === 'visual'
                    ? 'bg-[#1A1918] text-white shadow-2xs'
                    : 'text-[#5C5751] hover:text-[#1A1918]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'بصری پٹی (Visual Rail)' : 'Interactive Visual Rail'}</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-xs cursor-pointer flex items-center gap-1.5 font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#1A1918] text-white shadow-2xs'
                    : 'text-[#5C5751] hover:text-[#1A1918]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'فہرست وار (Directory)' : 'Event Directory'}</span>
              </button>
            </div>

            <button
              onClick={() => setIsNewEventModalOpen(true)}
              className="px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#152942] text-white text-xs font-sans font-medium rounded-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'نیا واقعہ' : 'Ingest Event'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#1A1918] tracking-tight">
          {isUrdu ? 'عمیق تاریخی خطِ زمانی' : 'Historical Chronology'}
        </h1>

        {/* Short introduction explaining the timeline */}
        <p className="mt-3 text-base sm:text-lg font-serif text-[#5C5751] max-w-3xl leading-relaxed">
          {isUrdu
            ? 'دریافت کیجیے کہ ماضی کے بارے میں کیا حقائق معلوم ہیں، تاریخی ادوار اور تواریخ کا موازنہ کیجیے، اور تاریخی تعین کے غیر یقینی پہلوؤں کو سمجھیے۔'
            : 'Explore what is known about the past, compare chronologies, investigate relationships between events, and understand the uncertainty surrounding historical dates.'}
        </p>

        {/* Archival Epistemic Banner */}
        <div className="mt-6 p-3.5 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif text-[#5C5751] flex flex-col sm:flex-row items-baseline justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1E3A5F] shrink-0" />
            <span>
              <strong>Archival Standard: </strong>
              The chronology distinguishes documented empirical dates from approximate scientific estimates, traditional scriptures, and disputed hypotheses. No year zero is assumed in BCE/CE conversions.
            </span>
          </div>

          <button
            onClick={handleOpenComparisonForFirstDisputed}
            className="text-[#1E3A5F] hover:underline font-sans font-medium text-[11px] shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <GitCompare className="w-3 h-3" />
            <span>{isUrdu ? 'اختلافی تواریخ کا موازنہ' : 'Compare Disputed Chronologies'}</span>
          </button>
        </div>
      </div>

      {/* Unified Filter & Search Controls */}
      <TimelineFilterControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        selectedEpoch={selectedEpoch}
        onSelectEpoch={setSelectedEpoch}
        selectedConfidence={selectedConfidence}
        onSelectConfidence={setSelectedConfidence}
        selectedDateType={selectedDateType}
        onSelectDateType={setSelectedDateType}
        onResetFilters={handleResetFilters}
        totalEventsCount={allEvents.length}
        filteredCount={filteredEvents.length}
        onJumpToYear={handleJumpToYear}
      />

      {/* Main Timeline View Area */}
      {viewMode === 'visual' ? (
        <TimelineVisualRail
          events={filteredEvents}
          selectedEventId={selectedEventId}
          onSelectEvent={(ev) => setSelectedEventId(ev.id)}
          targetJumpYear={targetJumpYear}
        />
      ) : (
        <TimelineListView
          events={filteredEvents}
          selectedEventId={selectedEventId}
          onSelectEvent={(ev) => setSelectedEventId(ev.id)}
          onOpenInAtlas={(id) => navigateToAtlas(id)}
        />
      )}

      {/* Detailed Event Dossier Drawer */}
      {selectedEvent && (
        <EventDetailDrawer
          event={selectedEvent}
          onClose={() => setSelectedEventId(null)}
          onOpenInAtlas={(id) => navigateToAtlas(id)}
          onOpenChronologyComparison={(ev) => setComparisonTargetEvent(ev)}
        />
      )}

      {/* Chronology Comparison Modal */}
      {comparisonTargetEvent && (
        <ChronologyComparisonModal
          event={comparisonTargetEvent}
          onClose={() => setComparisonTargetEvent(null)}
        />
      )}

      {/* New Event Ingestion Modal */}
      {isNewEventModalOpen && (
        <NewEventModal
          onClose={() => setIsNewEventModalOpen(false)}
          onEventCreated={(newEvent) => {
            setIsNewEventModalOpen(false);
            setSelectedEventId(newEvent.id);
          }}
        />
      )}
    </div>
  );
};
