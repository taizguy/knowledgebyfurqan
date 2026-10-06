import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Event, EventCategory, DatePrecision, DateBasis, CalendarSystem } from '../../types/entities';
import { DataService } from '../../services/dataService';
import {
  EVENT_CATEGORY_META,
  DATE_BASIS_META,
  formatSignedYear,
  getEpochForYear
} from '../../utils/chronology';
import { X, Calendar, Plus, AlertCircle, Sparkles } from 'lucide-react';

interface NewEventModalProps {
  onClose: () => void;
  onEventCreated: (event: Event) => void;
}

export const NewEventModal: React.FC<NewEventModalProps> = ({
  onClose,
  onEventCreated
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const [titleEn, setTitleEn] = useState('');
  const [titleUr, setTitleUr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descUr, setDescUr] = useState('');

  // Date fields
  const [earliestYear, setEarliestYear] = useState<number>(-3300);
  const [latestYear, setLatestYear] = useState<number>(-3200);
  const [isApproximate, setIsApproximate] = useState(true);
  const [precision, setPrecision] = useState<DatePrecision>('century');
  const [calendarSystem, setCalendarSystem] = useState<CalendarSystem>('astronomical');
  const [dateBasis, setDateBasis] = useState<DateBasis>('stratigraphic');
  const [datingMethodDescEn, setDatingMethodDescEn] = useState('');

  // Categories
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>(['archaeology']);

  // Validation error state
  const [validationError, setValidationError] = useState<string | null>(null);

  const chapters = DataService.getChapters();
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch-01-universe-seven-skies');

  const toggleCategory = (cat: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleEn.trim() && !titleUr.trim()) {
      setValidationError(isUrdu ? 'براہ کرم واقعے کا عنوان درج کیجیے۔' : 'Please provide an event title in English or Urdu.');
      return;
    }

    if (earliestYear > latestYear) {
      setValidationError(
        isUrdu
          ? 'ابتدائی سال آخری سال سے زیادہ نہیں ہو سکتا۔'
          : 'Earliest year cannot be mathematically greater than latest year.'
      );
      return;
    }

    setValidationError(null);

    const newId = `evt-${Date.now().toString().slice(-6)}-${titleEn.slice(0, 15).toLowerCase().replace(/[^a-z0-9]/g, '-') || 'chronicle'}`;

    const newEvent: Event = {
      id: newId,
      slug: newId,
      title: {
        en: titleEn.trim() || titleUr.trim(),
        ur: titleUr.trim() || titleEn.trim()
      },
      summary: {
        en: descEn.trim() || descUr.trim(),
        ur: descUr.trim() || descEn.trim()
      },
      description: {
        en: descEn.trim() || descUr.trim(),
        ur: descUr.trim() || descEn.trim()
      },
      categories: selectedCategories.length > 0 ? selectedCategories : ['culture'],
      historicalDate: {
        dateType: earliestYear === latestYear ? 'exact' : 'range',
        earliestYear,
        latestYear,
        precision,
        calendarSystem,
        era: earliestYear < 0 ? 'BCE' : 'CE',
        displayLabel: {
          en: earliestYear === latestYear
            ? `${isApproximate ? 'c. ' : ''}${formatSignedYear(earliestYear, 'en')}`
            : `${isApproximate ? 'c. ' : ''}${formatSignedYear(earliestYear, 'en')} – ${formatSignedYear(latestYear, 'en')}`,
          ur: earliestYear === latestYear
            ? `${isApproximate ? 'تقریباً ' : ''}${formatSignedYear(earliestYear, 'ur')}`
            : `${isApproximate ? 'تقریباً ' : ''}${formatSignedYear(earliestYear, 'ur')} تا ${formatSignedYear(latestYear, 'ur')}`
        },
        isApproximate,
        isDisputed: false,
        dateBasis,
        datingMethodDescription: datingMethodDescEn.trim()
          ? { en: datingMethodDescEn.trim(), ur: datingMethodDescEn.trim() }
          : undefined
      },
      approximateDate: `${formatSignedYear(earliestYear, 'en')}`,
      rawYearBPOrBCE: earliestYear,
      yearDisplay: {
        en: earliestYear === latestYear
          ? `${isApproximate ? 'c. ' : ''}${formatSignedYear(earliestYear, 'en')}`
          : `${isApproximate ? 'c. ' : ''}${formatSignedYear(earliestYear, 'en')} – ${formatSignedYear(latestYear, 'en')}`,
        ur: earliestYear === latestYear
          ? `${isApproximate ? 'تقریباً ' : ''}${formatSignedYear(earliestYear, 'ur')}`
          : `${isApproximate ? 'تقریباً ' : ''}${formatSignedYear(earliestYear, 'ur')} تا ${formatSignedYear(latestYear, 'ur')}`
      },
      chronologicalValue: earliestYear,
      epoch: getEpochForYear(earliestYear),
      placeId: 'plc-uruk',
      civilizationId: 'civ-sumer-mesopotamia',
      relatedPersonIds: [],
      claimIds: [],
      primarySourceIds: [],
      chapterId: selectedChapterId || undefined,
      associatedChapterIds: selectedChapterId ? [selectedChapterId] : [],
      epistemicStatus: 'verified',
      chronologicalConfidence: 'scholarly_majority',
      publicationStatus: 'published'
    };

    const saved = DataService.addEvent(newEvent);
    onEventCreated(saved);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white border border-[#E6E1D6] max-w-2xl w-full my-8 shadow-2xl rounded-xs overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E1D6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#1E3A5F] text-white rounded-xs">
              <Calendar className="w-4 h-4 text-[#B8934A]" />
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
                Archival Ingestion Engine
              </span>
              <h3 className="text-base font-serif font-medium text-[#1A1918]">
                {isUrdu ? 'نیا تاریخی واقعہ اور خط زمانی درج کریں' : 'Ingest Historical Timeline Event'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#878177] hover:text-[#1A1918] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {validationError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Title Inputs */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1A1918] font-semibold mb-1">
              Event Title (English) *
            </label>
            <input
              type="text"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g., Construction of the Ishtar Gate & Processional Way..."
              className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs font-serif text-[#1A1918] focus:outline-hidden focus:border-[#1E3A5F]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1A1918] font-semibold mb-1">
              Event Title (Urdu)
            </label>
            <input
              type="text"
              value={titleUr}
              onChange={(e) => setTitleUr(e.target.value)}
              placeholder="مثال: اشتر گیٹ کی تعمیر اور بابلی جلوس کی شاہراہ..."
              dir="rtl"
              className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs font-serif text-[#1A1918] focus:outline-hidden focus:border-[#1E3A5F]"
            />
          </div>

          {/* Chronological Year Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs">
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#878177] mb-1">
                Earliest Year (negative for BCE, positive for CE) *
              </label>
              <input
                type="number"
                required
                value={earliestYear}
                onChange={(e) => setEarliestYear(Number(e.target.value))}
                className="w-full p-1.5 bg-white border border-[#E6E1D6] rounded-xs font-mono font-medium text-[#1A1918]"
              />
              <span className="text-[10px] font-mono text-[#1E3A5F] mt-0.5 block">
                {formatSignedYear(earliestYear, language)}
              </span>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-[#878177] mb-1">
                Latest Year (same if point event) *
              </label>
              <input
                type="number"
                required
                value={latestYear}
                onChange={(e) => setLatestYear(Number(e.target.value))}
                className="w-full p-1.5 bg-white border border-[#E6E1D6] rounded-xs font-mono font-medium text-[#1A1918]"
              />
              <span className="text-[10px] font-mono text-[#1E3A5F] mt-0.5 block">
                {formatSignedYear(latestYear, language)}
              </span>
            </div>
          </div>

          {/* Basis and Precision */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#878177] mb-1">
                Dating Basis
              </label>
              <select
                value={dateBasis}
                onChange={(e) => setDateBasis(e.target.value as any)}
                className="w-full p-1.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs font-serif"
              >
                {Object.entries(DATE_BASIS_META).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label[language]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-[#878177] mb-1">
                Precision
              </label>
              <select
                value={precision}
                onChange={(e) => setPrecision(e.target.value as any)}
                className="w-full p-1.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs font-serif"
              >
                <option value="exact_year">Exact Year</option>
                <option value="decade">Decade</option>
                <option value="century">Century</option>
                <option value="millennium">Millennium</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="isApproximateCheck"
                checked={isApproximate}
                onChange={(e) => setIsApproximate(e.target.checked)}
                className="rounded-xs"
              />
              <label htmlFor="isApproximateCheck" className="text-xs font-serif text-[#1A1918]">
                Approximate date (c.)
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1A1918] font-semibold mb-1">
              Description / Summary (English)
            </label>
            <textarea
              rows={3}
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              placeholder="Detailed historical contextualization and archaeological basis..."
              className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs font-serif text-[#1A1918] focus:outline-hidden"
            />
          </div>

          {/* Associated Chapter */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-[#878177] mb-1">
              Associated Chapter in Archive
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
              className="w-full p-1.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs font-serif"
            >
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  Chapter 0{ch.chapterNumber}: {ch.title[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-[#E6E1D6] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 border border-[#E6E1D6] text-xs font-sans text-[#5C5751] hover:text-[#1A1918] rounded-xs cursor-pointer"
            >
              {isUrdu ? 'منسوخ' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#1E3A5F] hover:bg-[#152942] text-white text-xs font-sans font-medium rounded-xs cursor-pointer shadow-xs"
            >
              {isUrdu ? 'واقعہ محفوظ کریں' : 'Save & Ingest Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
