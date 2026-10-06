import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  EventCategory,
  HistoricalEpoch,
  ChronologicalConfidence,
  DateType
} from '../../types/entities';
import {
  EVENT_CATEGORY_META,
  EPOCH_DEFINITIONS
} from '../../utils/chronology';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Calendar,
  Layers,
  ShieldCheck,
  Tag,
  Clock
} from 'lucide-react';

interface TimelineFilterControlsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategories: Set<EventCategory>;
  onToggleCategory: (cat: EventCategory) => void;
  selectedEpoch: HistoricalEpoch | 'all';
  onSelectEpoch: (ep: HistoricalEpoch | 'all') => void;
  selectedConfidence: ChronologicalConfidence | 'all';
  onSelectConfidence: (conf: ChronologicalConfidence | 'all') => void;
  selectedDateType: DateType | 'all';
  onSelectDateType: (dt: DateType | 'all') => void;
  onResetFilters: () => void;
  totalEventsCount: number;
  filteredCount: number;
  onJumpToYear: (year: number) => void;
}

export const TimelineFilterControls: React.FC<TimelineFilterControlsProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  selectedEpoch,
  onSelectEpoch,
  selectedConfidence,
  onSelectConfidence,
  selectedDateType,
  onSelectDateType,
  onResetFilters,
  totalEventsCount,
  filteredCount,
  onJumpToYear
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const [expandedFilters, setExpandedFilters] = React.useState(false);

  const categoriesList = Object.keys(EVENT_CATEGORY_META) as EventCategory[];

  const quickJumpMilestones = [
    { label: { en: '40,000 BP (Paleolithic)', ur: '40,000 سال قبل' }, year: -38000 },
    { label: { en: '9600 BCE (Göbekli Tepe)', ur: '9600 قبل مسیح' }, year: -9600 },
    { label: { en: '3300 BCE (Cuneiform & Urbanism)', ur: '3300 قبل مسیح' }, year: -3300 },
    { label: { en: '1200 BCE (Enuma Elish)', ur: '1200 قبل مسیح' }, year: -1200 },
    { label: { en: '350 BCE (Classical Antiquity)', ur: '350 قبل مسیح' }, year: -350 },
    { label: { en: '610 CE (Quranic Revelation)', ur: '610ء' }, year: 610 },
    { label: { en: '1929 CE (Cosmic Expansion)', ur: '1929ء' }, year: 1929 }
  ];

  return (
    <div className="bg-white border border-[#E6E1D6] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top Search & Filter Toggle Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#878177] absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              isUrdu
                ? 'واقعہ، سال، تہذیب، متن یا تاریخی شخصیت تلاش کیجیے...'
                : 'Search historical events, dates, civilizations, texts, or figures...'
            }
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918] placeholder-[#878177] focus:outline-hidden focus:border-[#1E3A5F]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-[#878177] hover:text-[#1A1918] cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Toolbar Actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={() => setExpandedFilters(!expandedFilters)}
            className={`px-3 py-2 border rounded-xs text-xs font-sans font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              expandedFilters
                ? 'bg-[#1A1918] text-white border-[#1A1918]'
                : 'bg-white text-[#5C5751] border-[#E6E1D6] hover:text-[#1A1918]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'توسیعی فلٹرز' : 'Refine Filters'}</span>
            {(selectedCategories.size > 0 ||
              selectedEpoch !== 'all' ||
              selectedConfidence !== 'all' ||
              selectedDateType !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-[#B8934A]" />
            )}
          </button>

          <button
            onClick={onResetFilters}
            className="px-2.5 py-2 border border-[#E6E1D6] text-xs font-sans text-[#878177] hover:text-[#1A1918] hover:bg-[#FAF8F5] rounded-xs transition-colors cursor-pointer flex items-center gap-1"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isUrdu ? 'ریسیٹ' : 'Reset'}</span>
          </button>

          <span className="text-[11px] font-mono text-[#878177] ml-1">
            {filteredCount} / {totalEventsCount}
          </span>
        </div>
      </div>

      {/* Epoch Horizon Segmented Strip */}
      <div className="pt-2 border-t border-[#F0ECE3]">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-sans no-scrollbar">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#878177] mr-2 shrink-0">
            {isUrdu ? 'تاریخی عہد:' : 'Epoch:'}
          </span>
          <button
            onClick={() => onSelectEpoch('all')}
            className={`px-2.5 py-1 rounded-xs font-medium shrink-0 transition-colors cursor-pointer text-xs ${
              selectedEpoch === 'all'
                ? 'bg-[#1A1918] text-white shadow-2xs'
                : 'text-[#5C5751] hover:text-[#1A1918] hover:bg-[#FAF8F5]'
            }`}
          >
            {isUrdu ? 'تمام ادوار' : 'All Epochs'}
          </button>
          {EPOCH_DEFINITIONS.map((epoch) => (
            <button
              key={epoch.id}
              onClick={() => onSelectEpoch(epoch.id)}
              className={`px-2.5 py-1 rounded-xs font-medium shrink-0 transition-colors cursor-pointer text-xs ${
                selectedEpoch === epoch.id
                  ? 'bg-[#1E3A5F] text-white shadow-2xs'
                  : 'text-[#5C5751] hover:text-[#1A1918] hover:bg-[#FAF8F5]'
              }`}
            >
              {epoch.title[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Collapsible Refinement Controls */}
      {expandedFilters && (
        <div className="pt-3 border-t border-[#F0ECE3] space-y-4">
          {/* Categories Multi-Select */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#878177] mb-1.5">
              {isUrdu ? 'تحقیقی زمرہ جات (Categories):' : 'Thematic Categories:'}
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              {categoriesList.map((catKey) => {
                const meta = EVENT_CATEGORY_META[catKey];
                const isSelected = selectedCategories.has(catKey);

                return (
                  <button
                    key={catKey}
                    onClick={() => onToggleCategory(catKey)}
                    className={`px-2.5 py-1 text-xs font-sans rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#FAF8F5] border-[#1E3A5F] text-[#1E3A5F] font-semibold'
                        : 'bg-white border-[#E6E1D6] text-[#5C5751] hover:text-[#1A1918]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span>{meta.label[language]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Granular Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {/* Chronological Confidence */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#878177] mb-1">
                {isUrdu ? 'تاریخی وثوق (Confidence):' : 'Chronological Confidence:'}
              </label>
              <select
                value={selectedConfidence}
                onChange={(e) => onSelectConfidence(e.target.value as any)}
                className="w-full p-1.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918] focus:outline-hidden"
              >
                <option value="all">{isUrdu ? 'تمام درجات' : 'All Confidence Levels'}</option>
                <option value="firmly_established">{isUrdu ? 'حتمی ثبوت (Firmly Established)' : 'Firmly Established'}</option>
                <option value="scholarly_majority">{isUrdu ? 'علمی اتفاق (Scholarly Majority)' : 'Scholarly Majority'}</option>
                <option value="contested_hypothesis">{isUrdu ? 'زیر بحث نظریہ (Contested Hypothesis)' : 'Contested Hypothesis'}</option>
                <option value="traditional_narrative">{isUrdu ? 'روایتی تقویم (Traditional Narrative)' : 'Traditional Narrative'}</option>
              </select>
            </div>

            {/* Date Structure Type */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#878177] mb-1">
                {isUrdu ? 'تاریخ کی نوعیت (Date Type):' : 'Date Precision Structure:'}
              </label>
              <select
                value={selectedDateType}
                onChange={(e) => onSelectDateType(e.target.value as any)}
                className="w-full p-1.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918] focus:outline-hidden"
              >
                <option value="all">{isUrdu ? 'تمام انواع' : 'All Date Formats'}</option>
                <option value="exact">{isUrdu ? 'حتمی سال (Exact Year)' : 'Exact Year'}</option>
                <option value="range">{isUrdu ? 'تاریخی دورانیہ (Year Range)' : 'Historical Range'}</option>
                <option value="disputed">{isUrdu ? 'اختلافی تواریخ (Disputed Chronology)' : 'Disputed Proposal'}</option>
                <option value="traditional">{isUrdu ? 'روایتی بیان (Traditional Record)' : 'Traditional Record'}</option>
              </select>
            </div>

            {/* Quick Time Warp Milestones */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#878177] mb-1">
                {isUrdu ? 'تیز رفتار منتقلی (Jump to Milestone):' : 'Jump to Chronological Threshold:'}
              </label>
              <select
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (!isNaN(val)) onJumpToYear(val);
                }}
                defaultValue=""
                className="w-full p-1.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918] focus:outline-hidden"
              >
                <option value="" disabled>
                  {isUrdu ? 'تاریخی موڑ منتخب کیجیے...' : 'Select historical threshold...'}
                </option>
                {quickJumpMilestones.map((m, idx) => (
                  <option key={idx} value={m.year}>
                    {m.label[language]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
