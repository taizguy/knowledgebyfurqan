import React, { useRef, useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Event, EventCategory } from '../../types/entities';
import {
  formatSignedYear,
  formatHistoricalDate,
  calculateYearSpan,
  EPOCH_DEFINITIONS,
  EVENT_CATEGORY_META
} from '../../utils/chronology';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  AlertTriangle,
  MapPin,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TimelineVisualRailProps {
  events: Event[];
  selectedEventId: string | null;
  onSelectEvent: (event: Event) => void;
  targetJumpYear?: number | null;
}

export const TimelineVisualRail: React.FC<TimelineVisualRailProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  targetJumpYear
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom Level: 1 = standard overview, 2 = expanded, 3 = detailed inspection
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Track lanes for collision avoidance
  const baseRailWidth = 2400 * zoomLevel;

  // Major chronological checkpoints on the calibrated axis
  const axisTicks = [
    { year: -40000, label: '40,000 BP' },
    { year: -30000, label: '30,000 BP' },
    { year: -20000, label: '20,000 BP' },
    { year: -10000, label: '10,000 BCE' },
    { year: -8000, label: '8,000 BCE' },
    { year: -6000, label: '6,000 BCE' },
    { year: -4000, label: '4,000 BCE' },
    { year: -3000, label: '3,000 BCE' },
    { year: -2000, label: '2,000 BCE' },
    { year: -1000, label: '1,000 BCE' },
    { year: -500, label: '500 BCE' },
    { year: 1, label: '1 CE' },
    { year: 500, label: '500 CE' },
    { year: 1000, label: '1000 CE' },
    { year: 1500, label: '1500 CE' },
    { year: 2000, label: '2000 CE' }
  ];

  /**
   * Non-linear hybrid projection function:
   * Maps signed years (-40,000 to +2026) to horizontal X coordinates (px).
   * Allocates appropriate visual real estate across deep time and historic antiquity.
   */
  const yearToX = (year: number): number => {
    const paddingLeft = 80;
    const usableWidth = baseRailWidth - 160;

    // Piecewise continuous segmented mapping
    // Segment 1: -40,000 to -10,000 (Paleolithic deep time) -> 20% of width
    // Segment 2: -10,000 to -4,000 (Neolithic transition) -> 18% of width
    // Segment 3: -4,000 to -1,200 (Bronze Age & Cuneiform) -> 20% of width
    // Segment 4: -1,200 to +300 (Iron Age & Classical) -> 18% of width
    // Segment 5: +300 to +1500 (Late Antiquity & Medieval) -> 12% of width
    // Segment 6: +1500 to +2026 (Early Modern & Contemporary) -> 12% of width

    if (year <= -10000) {
      const clamped = Math.max(-40000, year);
      const ratio = (clamped - -40000) / (-10000 - -40000);
      return paddingLeft + ratio * (usableWidth * 0.20);
    } else if (year <= -4000) {
      const ratio = (year - -10000) / (-4000 - -10000);
      return paddingLeft + usableWidth * 0.20 + ratio * (usableWidth * 0.18);
    } else if (year <= -1200) {
      const ratio = (year - -4000) / (-1200 - -4000);
      return paddingLeft + usableWidth * 0.38 + ratio * (usableWidth * 0.20);
    } else if (year <= 300) {
      const ratio = (year - -1200) / (300 - -1200);
      return paddingLeft + usableWidth * 0.58 + ratio * (usableWidth * 0.18);
    } else if (year <= 1500) {
      const ratio = (year - 300) / (1500 - 300);
      return paddingLeft + usableWidth * 0.76 + ratio * (usableWidth * 0.12);
    } else {
      const clamped = Math.min(2026, year);
      const ratio = (clamped - 1500) / (2026 - 1500);
      return paddingLeft + usableWidth * 0.88 + ratio * (usableWidth * 0.12);
    }
  };

  // Scroll to jump year when triggered
  React.useEffect(() => {
    if (targetJumpYear !== undefined && targetJumpYear !== null && containerRef.current) {
      const x = yearToX(targetJumpYear);
      containerRef.current.scrollTo({
        left: x - containerRef.current.clientWidth / 2,
        behavior: 'smooth'
      });
    }
  }, [targetJumpYear, zoomLevel]);

  // Distribute events across staggered vertical lanes (lanes 0, 1, 2, 3) to prevent overlapping labels
  const placedEvents = useMemo(() => {
    const lanesEndPositions: number[] = [0, 0, 0, 0, 0];

    return events.map((event) => {
      const earliestYear = event.historicalDate?.earliestYear ?? event.rawYearBPOrBCE ?? 0;
      const latestYear = event.historicalDate?.latestYear ?? earliestYear;

      const xStart = yearToX(earliestYear);
      const xEnd = Math.max(xStart + 16, yearToX(latestYear));
      const width = Math.max(22, xEnd - xStart);

      // Estimate card/label width
      const estimatedLabelWidth = 260;
      const totalSpanNeeded = Math.max(width, estimatedLabelWidth);

      // Find first available lane with no overlap (at least 20px buffer)
      let selectedLane = 0;
      for (let i = 0; i < lanesEndPositions.length; i++) {
        if (xStart >= lanesEndPositions[i] + 16) {
          selectedLane = i;
          break;
        }
      }
      lanesEndPositions[selectedLane] = xStart + totalSpanNeeded;

      return {
        event,
        xStart,
        xEnd,
        width,
        lane: selectedLane,
        isRange: earliestYear !== latestYear,
        earliestYear,
        latestYear
      };
    });
  }, [events, zoomLevel, baseRailWidth]);

  // Pan controls
  const handleScrollBy = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(3, Math.max(1, Number((prev + delta).toFixed(1)))));
  };

  return (
    <div className="bg-white border border-[#E6E1D6] shadow-xs rounded-xs overflow-hidden flex flex-col">
      {/* Visual Rail Header & Navigation Controls */}
      <div className="p-3 sm:p-4 bg-[#FAF8F5] border-b border-[#E6E1D6] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 text-xs font-mono text-[#878177]">
          <Clock className="w-4 h-4 text-[#1E3A5F]" />
          <span className="font-semibold text-[#1A1918]">
            {isUrdu ? 'تاریخی زمانی پٹی (Interactive Visual Rail)' : 'Chronological Visual Rail'}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">
            {isUrdu ? 'افقی سکرول اور ماؤس سے زوم کی سہولت' : 'Pan & inspect multi-tiered timeline'}
          </span>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5">
          {/* Pan Left / Right */}
          <button
            onClick={() => handleScrollBy(-400)}
            className="p-1.5 border border-[#E6E1D6] bg-white hover:bg-[#FAF8F5] text-[#5C5751] hover:text-[#1A1918] rounded-xs cursor-pointer shadow-2xs"
            title="Pan Left (Backwards in time)"
            aria-label="Pan Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScrollBy(400)}
            className="p-1.5 border border-[#E6E1D6] bg-white hover:bg-[#FAF8F5] text-[#5C5751] hover:text-[#1A1918] rounded-xs cursor-pointer shadow-2xs"
            title="Pan Right (Forwards in time)"
            aria-label="Pan Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Zoom In / Out */}
          <div className="h-4 w-px bg-[#E6E1D6] mx-1" />

          <button
            onClick={() => handleZoom(-0.5)}
            disabled={zoomLevel <= 1}
            className="p-1.5 border border-[#E6E1D6] bg-white hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed text-[#5C5751] rounded-xs cursor-pointer shadow-2xs"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono font-bold text-[#1A1918] px-1">
            {zoomLevel}x
          </span>
          <button
            onClick={() => handleZoom(0.5)}
            disabled={zoomLevel >= 3}
            className="p-1.5 border border-[#E6E1D6] bg-white hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed text-[#5C5751] rounded-xs cursor-pointer shadow-2xs"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setZoomLevel(1);
              if (containerRef.current) containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            }}
            className="p-1.5 border border-[#E6E1D6] bg-white hover:bg-[#FAF8F5] text-[#878177] hover:text-[#1A1918] rounded-xs cursor-pointer shadow-2xs"
            title="Reset View"
            aria-label="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Horizontal Scrollable Canvas Area */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto relative bg-[#FAF8F5]/50 select-none cursor-grab active:cursor-grabbing border-b border-[#E6E1D6]"
        style={{ height: '480px' }}
      >
        <div
          className="relative h-full"
          style={{ width: `${baseRailWidth}px` }}
        >
          {/* 1. Epoch Header Track at the very top */}
          <div className="absolute top-0 left-0 right-0 h-11 border-b border-[#E6E1D6] bg-[#FAF8F5] flex items-center z-10">
            {EPOCH_DEFINITIONS.map((epoch) => {
              const startX = yearToX(epoch.startYear);
              const endX = yearToX(epoch.endYear);
              const width = Math.max(30, endX - startX);

              return (
                <div
                  key={epoch.id}
                  style={{ left: `${startX}px`, width: `${width}px` }}
                  className="absolute h-full border-r border-[#E6E1D6] px-2 flex flex-col justify-center overflow-hidden hover:bg-white transition-colors"
                  title={`${epoch.title[language]}: ${epoch.dating[language]}`}
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1E3A5F] truncate">
                    {epoch.title[language]}
                  </span>
                  <span className="text-[9px] font-mono text-[#878177] truncate">
                    {epoch.dating[language]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 2. Calibrated Time Axis Tick Markers Line */}
          <div className="absolute top-11 left-0 right-0 h-9 bg-white/80 border-b border-[#E6E1D6] z-10">
            {axisTicks.map((tick, idx) => {
              const x = yearToX(tick.year);
              return (
                <div
                  key={idx}
                  style={{ left: `${x}px` }}
                  className="absolute top-0 bottom-0 flex flex-col items-center -translate-x-1/2"
                >
                  <div className="w-px h-2.5 bg-[#878177]" />
                  <span className="text-[9px] font-mono font-medium text-[#5C5751] mt-0.5 whitespace-nowrap">
                    {tick.label}
                  </span>
                  <div className="w-px flex-1 border-l border-dashed border-[#E6E1D6]" />
                </div>
              );
            })}
          </div>

          {/* 3. Background Vertical Grid Guide Lines (Extending full height) */}
          <div className="absolute top-20 bottom-0 left-0 right-0 pointer-events-none">
            {axisTicks.map((tick, idx) => (
              <div
                key={`line-${idx}`}
                style={{ left: `${yearToX(tick.year)}px` }}
                className="absolute top-0 bottom-0 w-px border-l border-dashed border-[#E6E1D6]/60"
              />
            ))}
          </div>

          {/* 4. Event Placement Tracks (Multi-lane: 4 lanes) */}
          <div className="absolute top-24 left-0 right-0 bottom-6">
            {placedEvents.map(({ event, xStart, xEnd, width, lane, isRange, earliestYear, latestYear }) => {
              const isSelected = selectedEventId === event.id;
              const primaryCategory: EventCategory = (event.categories?.[0] as EventCategory) || 'culture';
              const catMeta = EVENT_CATEGORY_META[primaryCategory] || EVENT_CATEGORY_META['culture'];

              // Vertical offset by lane: each lane is ~75px tall
              const laneTop = lane * 78 + 8;

              return (
                <div
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  style={{
                    left: `${xStart}px`,
                    top: `${laneTop}px`
                  }}
                  className={`absolute group cursor-pointer transition-transform duration-150 ${
                    isSelected ? 'z-30 scale-102' : 'z-20 hover:z-25'
                  }`}
                >
                  {/* Visual Node / Span Representation */}
                  <div className="flex items-start gap-2">
                    {/* Visual Marker or Span Bar */}
                    {isRange ? (
                      /* Range Span Bar */
                      <div
                        style={{ width: `${Math.max(60, width)}px` }}
                        className={`h-5.5 rounded-xs flex items-center px-2 text-[10px] font-mono font-bold transition-all border ${
                          isSelected
                            ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm'
                            : 'bg-white text-[#1A1918] border-[#878177] group-hover:border-[#1E3A5F] shadow-2xs'
                        } ${event.historicalDate?.isApproximate ? 'border-dashed' : ''}`}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0"
                          style={{ backgroundColor: isSelected ? '#FFFFFF' : catMeta.color }}
                        />
                        <span className="truncate text-[9px]">
                          {formatSignedYear(earliestYear, language)} – {formatSignedYear(latestYear, language)}
                        </span>
                      </div>
                    ) : (
                      /* Exact/Single Point Marker Diamond */
                      <div
                        className={`w-5 h-5 rounded-xs rotate-45 flex items-center justify-center transition-all border ${
                          isSelected
                            ? 'bg-[#1E3A5F] border-[#1E3A5F] text-white shadow-sm'
                            : 'bg-white border-[#878177] group-hover:border-[#1E3A5F] shadow-2xs'
                        }`}
                      >
                        <div
                          className="w-2 h-2 rounded-full -rotate-45"
                          style={{ backgroundColor: isSelected ? '#FFFFFF' : catMeta.color }}
                        />
                      </div>
                    )}

                    {/* Event Label Tag Card */}
                    <div
                      className={`min-w-[180px] max-w-[260px] p-2 rounded-xs border transition-all ${
                        isSelected
                          ? 'bg-white border-[#1E3A5F] shadow-md ring-1 ring-[#1E3A5F]'
                          : 'bg-white/95 border-[#E6E1D6] group-hover:border-[#878177] shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-mono text-[9px] font-semibold text-[#1E3A5F] tracking-tight">
                          {formatHistoricalDate(event.historicalDate, language)}
                        </span>
                        {event.historicalDate?.isDisputed && (
                          <span
                            className="inline-flex items-center gap-0.5 text-[9px] font-mono text-amber-700 bg-amber-50 px-1 rounded-2xs"
                            title="Disputed Chronology"
                          >
                            <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                            <span className="hidden sm:inline">Disputed</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-serif font-medium text-[#1A1918] line-clamp-2 leading-snug group-hover:text-[#1E3A5F] transition-colors">
                        {event.title[language]}
                      </h4>

                      {/* Quiet Metadata Indicators */}
                      <div className="mt-1 flex items-center gap-2 text-[9px] font-sans text-[#878177]">
                        <span>{catMeta.label[language]}</span>
                        {event.chapterId && (
                          <>
                            <span>·</span>
                            <span className="text-[#1E3A5F] font-mono">Ch 01</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Visual Legend & Navigation Tips */}
      <div className="p-3 bg-white border-t border-[#E6E1D6] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C5751]">
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-sans">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rotate-45 border border-[#878177] bg-white inline-block" />
            <span>Point Event</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-8 h-2.5 border border-[#878177] bg-white rounded-2xs inline-block" />
            <span>Date Range Span</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-8 h-2.5 border border-dashed border-[#878177] bg-white rounded-2xs inline-block" />
            <span>Approximate Date</span>
          </span>
          <span className="flex items-center gap-1.5 text-amber-800">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            <span>Disputed Chronology</span>
          </span>
        </div>

        <div className="text-[11px] font-mono text-[#878177]">
          {isUrdu
            ? 'کسی بھی واقعے کی مکمل تفصیلات دیکھنے کے لیے اس پر کلک کیجیے۔'
            : 'Click any event node to open detailed research dossier.'}
        </div>
      </div>
    </div>
  );
};
