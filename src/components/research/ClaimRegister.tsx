import React, { useState, useMemo } from 'react';
import { Claim, EpistemicStatus } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import { DataService } from '../../services/dataService';
import { EpistemicBadge } from '../common/EpistemicBadge';
import {
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  SlidersHorizontal,
  X,
  Compass
} from 'lucide-react';

interface ClaimRegisterProps {
  claims: Claim[];
  selectedClaimId?: string;
  onSelectClaim: (claim: Claim) => void;
  onOpenNewClaimModal: () => void;
  initialChapterFilter?: string;
  initialStatusFilter?: string;
}

export const ClaimRegister: React.FC<ClaimRegisterProps> = ({
  claims,
  selectedClaimId,
  onSelectClaim,
  onOpenNewClaimModal,
  initialChapterFilter = 'all',
  initialStatusFilter = 'all'
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [chapterFilter, setChapterFilter] = useState(initialChapterFilter);
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [claimTypeFilter, setClaimTypeFilter] = useState('all');
  const [sourceAvailabilityFilter, setSourceAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'status' | 'confidence' | 'id'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Chapters list for filter dropdown
  const chapters = useMemo(() => DataService.getChapters(), []);

  // Filtered & Sorted claims
  const filteredClaims = useMemo(() => {
    let result = claims.filter((claim) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const statementEn = claim.statement.en.toLowerCase();
        const statementUr = claim.statement.ur.toLowerCase();
        const rationaleEn = claim.epistemicRationale.en.toLowerCase();
        const rationaleUr = claim.epistemicRationale.ur.toLowerCase();
        const idMatch = claim.id.toLowerCase().includes(q);
        const matchesText =
          statementEn.includes(q) ||
          statementUr.includes(q) ||
          rationaleEn.includes(q) ||
          rationaleUr.includes(q) ||
          idMatch;
        if (!matchesText) return false;
      }

      // Chapter filter
      if (chapterFilter !== 'all') {
        const matchesChapter =
          claim.chapterId === chapterFilter ||
          claim.chapterIds?.includes(chapterFilter);
        if (!matchesChapter) return false;
      }

      // Status filter
      if (statusFilter !== 'all') {
        if (claim.status !== statusFilter && claim.epistemicStatus !== statusFilter) {
          return false;
        }
      }

      // Claim type filter
      if (claimTypeFilter !== 'all') {
        if (claim.claimType !== claimTypeFilter) return false;
      }

      // Source availability filter
      if (sourceAvailabilityFilter === 'has_primary') {
        if (claim.primarySourceIds.length === 0) return false;
      } else if (sourceAvailabilityFilter === 'has_secondary') {
        if (claim.secondarySourceIds.length === 0) return false;
      } else if (sourceAvailabilityFilter === 'has_sources') {
        if (claim.primarySourceIds.length === 0 && claim.secondarySourceIds.length === 0) return false;
      } else if (sourceAvailabilityFilter === 'no_sources') {
        if (claim.primarySourceIds.length > 0 || claim.secondarySourceIds.length > 0) return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'timestamp') {
        const timeA = a.timestamp || '99:99';
        const timeB = b.timestamp || '99:99';
        comparison = timeA.localeCompare(timeB);
      } else if (sortBy === 'status') {
        comparison = (a.status || '').localeCompare(b.status || '');
      } else if (sortBy === 'confidence') {
        comparison = (a.confidence || '').localeCompare(b.confidence || '');
      } else if (sortBy === 'id') {
        comparison = a.id.localeCompare(b.id);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [
    claims,
    searchQuery,
    chapterFilter,
    statusFilter,
    claimTypeFilter,
    sourceAvailabilityFilter,
    sortBy,
    sortOrder
  ]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setChapterFilter('all');
    setStatusFilter('all');
    setClaimTypeFilter('all');
    setSourceAvailabilityFilter('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    chapterFilter !== 'all' ||
    statusFilter !== 'all' ||
    claimTypeFilter !== 'all' ||
    sourceAvailabilityFilter !== 'all';

  return (
    <div className="space-y-6">
      {/* Search and Filter Panel */}
      <div className="bg-white border border-[#E6E1D6] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-5 border-b border-[#F0ECE3]">
          {/* Text Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-[#878177]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isUrdu
                  ? 'دعویٰ، شناختی کوڈ، سائنسی جواز یا کلیدی لفظ تلاش کریں...'
                  : 'Search claim statements, rationale, keywords, or claim ID...'
              }
              className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918] placeholder-[#878177] focus:outline-hidden focus:border-[#1E3A5F]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-[#878177] hover:text-[#1A1918]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action to create claim */}
          <button
            onClick={onOpenNewClaimModal}
            className="px-4 py-2 bg-[#1A1918] hover:bg-[#2D2A26] text-white text-xs font-sans uppercase tracking-wider font-semibold cursor-pointer transition-colors shadow-xs flex items-center justify-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8934A]" />
            <span>{isUrdu ? 'نیا دعویٰ درج کریں' : '+ Add Research Claim'}</span>
          </button>
        </div>

        {/* Multi-Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          {/* Chapter Filter */}
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-wider text-[#878177] mb-1">
              {isUrdu ? 'باب (Chapter)' : 'Filter by Chapter'}
            </label>
            <select
              value={chapterFilter}
              onChange={(e) => setChapterFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs text-[#1A1918] focus:outline-hidden focus:border-[#1E3A5F]"
            >
              <option value="all">{isUrdu ? 'تمام ابواب' : 'All Chapters'}</option>
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {isUrdu ? `باب 0${ch.chapterNumber}: ` : `Ch 0${ch.chapterNumber}: `}
                  {ch.title[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter (10 Epistemic Tiers) */}
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-wider text-[#878177] mb-1">
              {isUrdu ? 'علمیاتی حیثیت (Status)' : 'Epistemic Status'}
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs text-[#1A1918] focus:outline-hidden focus:border-[#1E3A5F]"
            >
              <option value="all">{isUrdu ? 'تمام درجات' : 'All 10 Statuses'}</option>
              <option value="unreviewed">{isUrdu ? 'Unreviewed (غیر جائزہ شدہ)' : 'Unreviewed'}</option>
              <option value="source_reported">{isUrdu ? 'Source Reported (ماخذ میں مذکور)' : 'Source Reported'}</option>
              <option value="primary_source_located">{isUrdu ? 'Primary Source Located (بنیادی کتبہ موجود)' : 'Primary Source Located'}</option>
              <option value="partially_verified">{isUrdu ? 'Partially Verified (جزوی مصدقہ)' : 'Partially Verified'}</option>
              <option value="verified">{isUrdu ? 'Verified (مصدقہ سائنسی)' : 'Verified'}</option>
              <option value="disputed">{isUrdu ? 'Disputed (متنازعہ)' : 'Disputed'}</option>
              <option value="unsupported">{isUrdu ? 'Unsupported (غیر مصدقہ)' : 'Unsupported'}</option>
              <option value="incorrect">{isUrdu ? 'Incorrect (مسترد شدہ)' : 'Incorrect'}</option>
              <option value="interpretive">{isUrdu ? 'Interpretive (تشریحی و تاویلی)' : 'Interpretive'}</option>
              <option value="open_question">{isUrdu ? 'Open Question (کھلا سوال)' : 'Open Question'}</option>
            </select>
          </div>

          {/* Claim Type Filter */}
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-wider text-[#878177] mb-1">
              {isUrdu ? 'شعبہ / قسم' : 'Claim Classification'}
            </label>
            <select
              value={claimTypeFilter}
              onChange={(e) => setClaimTypeFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs text-[#1A1918] focus:outline-hidden focus:border-[#1E3A5F]"
            >
              <option value="all">{isUrdu ? 'تمام اقسام' : 'All Disciplines'}</option>
              <option value="astronomical">{isUrdu ? 'فلکیاتی (Astronomical)' : 'Astronomical / Physical'}</option>
              <option value="archaeological">{isUrdu ? 'آثار قدیمہ (Archaeological)' : 'Archaeological'}</option>
              <option value="theological">{isUrdu ? 'مذہبی و کلامی (Theological)' : 'Theological'}</option>
              <option value="historical">{isUrdu ? 'تاریخی (Historical)' : 'Historical'}</option>
              <option value="linguistic">{isUrdu ? 'لسانیاتی (Linguistic)' : 'Linguistic'}</option>
              <option value="epigraphic">{isUrdu ? 'کتباتی (Epigraphic)' : 'Epigraphic'}</option>
              <option value="cosmological">{isUrdu ? 'کونیاتی (Cosmological)' : 'Cosmological'}</option>
            </select>
          </div>

          {/* Source Availability Filter */}
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-wider text-[#878177] mb-1">
              {isUrdu ? 'شواہد کی موجودگی' : 'Source Evidence'}
            </label>
            <select
              value={sourceAvailabilityFilter}
              onChange={(e) => setSourceAvailabilityFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs text-[#1A1918] focus:outline-hidden focus:border-[#1E3A5F]"
            >
              <option value="all">{isUrdu ? 'تمام' : 'All Claims'}</option>
              <option value="has_sources">{isUrdu ? 'شواہد منسلک ہیں' : 'Evidence Attached'}</option>
              <option value="has_primary">{isUrdu ? 'بنیادی نوادرات منسلک ہیں' : 'Has Primary Artifacts'}</option>
              <option value="has_secondary">{isUrdu ? 'ثانوی ماخذ / کتب' : 'Has Secondary Monographs'}</option>
              <option value="no_sources">{isUrdu ? 'کوئی ماخذ منسلک نہیں' : 'No Sources Attached'}</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Sorting Controls */}
        <div className="mt-4 pt-3 border-t border-[#F0ECE3] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#878177]">
              {isUrdu
                ? `${filteredClaims.length} دعوے ظاہر ہیں (کل ${claims.length} میں سے)`
                : `Showing ${filteredClaims.length} of ${claims.length} claims`}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-rose-700 hover:underline flex items-center gap-1 cursor-pointer font-sans"
              >
                <X className="w-3 h-3" />
                <span>{isUrdu ? 'فلٹرز ختم کریں' : 'Clear Filters'}</span>
              </button>
            )}
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-2">
            <span className="text-[#878177] font-sans">{isUrdu ? 'ترتیب:' : 'Sort by:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1 px-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs text-[#1A1918]"
            >
              <option value="timestamp">{isUrdu ? 'ٹائم اسٹیمپ' : 'Video Timestamp'}</option>
              <option value="status">{isUrdu ? 'حیثیت' : 'Verification Status'}</option>
              <option value="confidence">{isUrdu ? 'اعتماد کی سطح' : 'Scholarly Consensus'}</option>
              <option value="id">{isUrdu ? 'شناختی کوڈ' : 'Claim ID'}</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1.5 border border-[#E6E1D6] hover:bg-[#FAF8F5] rounded-xs text-[#5C5751] cursor-pointer"
              title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-3">
        {filteredClaims.length === 0 ? (
          <div className="bg-white border border-[#E6E1D6] p-12 text-center">
            <SlidersHorizontal className="w-8 h-8 text-[#878177] mx-auto mb-3" />
            <h4 className="font-serif text-lg font-medium text-[#1A1918]">
              {isUrdu ? 'کوئی دعویٰ نہیں ملا' : 'No Claims Match Selected Filters'}
            </h4>
            <p className="mt-1 text-xs font-serif text-[#5C5751] max-w-md mx-auto">
              {isUrdu
                ? 'براہ کرم تلاش کا لفظ بدلیں یا فلٹرز کو ختم کر کے دوبارہ کوشش کریں۔'
                : 'Try adjusting your search query, selecting "All Chapters", or clearing the status filters.'}
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-4 px-3.5 py-1.5 bg-[#1A1918] text-white text-xs font-sans font-medium rounded-xs cursor-pointer"
            >
              {isUrdu ? 'تمام فلٹرز ختم کریں' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          filteredClaims.map((claim) => {
            const isSelected = selectedClaimId === claim.id;
            const isSourceReported =
              claim.status === 'source_reported' ||
              claim.epistemicStatus === 'source_reported' ||
              claim.epistemicStatus === 'source_attested_unverified';

            const claimChapter = claim.chapterId
              ? chapters.find((ch) => ch.id === claim.chapterId)
              : null;

            return (
              <div
                key={claim.id}
                className={`bg-white border transition-all p-5 shadow-2xs ${
                  isSelected
                    ? 'border-[#1E3A5F] ring-1 ring-[#1E3A5F] bg-[#FAF8F5]'
                    : isSourceReported
                    ? 'border-amber-300/80 hover:border-amber-400 bg-amber-50/10'
                    : 'border-[#E6E1D6] hover:border-[#878177]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {/* Metadata Header */}
                    <div className="flex flex-wrap items-center gap-2">
                      <EpistemicBadge status={claim.status || claim.epistemicStatus} />

                      <span className="font-mono text-[11px] text-[#878177] bg-[#FAF8F5] px-2 py-0.5 border border-[#E6E1D6] rounded-xs">
                        {claim.id}
                      </span>

                      {claim.timestamp && (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#878177] bg-stone-100/70 px-2 py-0.5 rounded-xs">
                          <Clock className="w-3 h-3 text-[#1E3A5F]" />
                          <span>{claim.timestamp}</span>
                        </span>
                      )}

                      <span className="font-mono text-[10px] uppercase text-[#878177] bg-stone-50 px-2 py-0.5 border border-stone-200/60 rounded-xs">
                        {claim.claimType}
                      </span>

                      {claimChapter && (
                        <span className="font-serif italic text-xs text-[#5C5751]">
                          {isUrdu ? `باب 0${claimChapter.chapterNumber}` : `Ch 0${claimChapter.chapterNumber}`}
                        </span>
                      )}
                    </div>

                    {/* Claim Statement */}
                    <h3 className="text-base sm:text-lg font-serif font-medium text-[#1A1918] leading-snug">
                      {claim.statement[language]}
                    </h3>

                    {/* Secondary Language Subtitle for Bilingual Comparison */}
                    <p className="text-xs font-serif text-[#878177] leading-relaxed italic">
                      {language === 'en' ? claim.statement.ur : claim.statement.en}
                    </p>

                    {/* Epistemic Rationale */}
                    <p className="text-xs font-serif text-[#5C5751] line-clamp-2 leading-relaxed">
                      {claim.epistemicRationale[language]}
                    </p>

                    {/* Warning callout for Source Reported */}
                    {isSourceReported && (
                      <div className="p-2 bg-amber-100/70 border border-amber-300 text-[11px] text-amber-950 font-serif flex items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                        <span>
                          {isUrdu
                            ? 'تنبیہ: ماخذ میں مذکور ہونے کا مطلب سائنسی یا تاریخی تصدیق ہرگز نہیں ہے۔'
                            : 'Note: Attested in source video/text, but lacks independent primary empirical corroboration.'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F0ECE3]">
                    <div className="text-[11px] font-mono text-[#878177] flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>
                        {claim.primarySourceIds.length} primary · {claim.secondarySourceIds.length} sec
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectClaim(claim)}
                      className="px-3.5 py-1.5 bg-[#1E3A5F] hover:bg-[#152840] text-white text-xs font-sans font-medium rounded-xs cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{isUrdu ? 'ورک بینچ میں کھولیں' : 'Open in Workbench'}</span>
                      <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                    </button>
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
