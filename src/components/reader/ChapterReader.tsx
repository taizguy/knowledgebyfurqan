import React, { useState, useEffect } from 'react';
import { Chapter, Claim, Person, Place, Concept, PrimarySource, ResearchNote } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { DataService } from '../../services/dataService';
import { EpistemicBadge } from '../common/EpistemicBadge';
import { ClaimInspector } from './ClaimInspector';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Layers,
  Share2,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  MapPin,
  Calendar,
  Compass,
  AlertTriangle,
  Lightbulb,
  Youtube,
  Scroll,
  Info
} from 'lucide-react';

interface ChapterReaderProps {
  chapter: Chapter;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({ chapter }) => {
  const { language, t } = useLanguage();
  const { navigateToChapter, navigate, navigateToTimeline } = useNavigation();

  const [activeClaim, setActiveClaim] = useState<Claim | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Relational Entities lookup
  const collection = DataService.getCollectionById(chapter.collectionId);
  const featuredMedia = chapter.featuredMediaId ? DataService.getMediaById(chapter.featuredMediaId) : null;
  const primarySources = (chapter.primarySourceIds || []).map((id) => DataService.getPrimarySourceById(id)).filter(Boolean) as PrimarySource[];
  const secondarySources = (chapter.secondarySourceIds || []).map((id) => DataService.getSourceById(id)).filter(Boolean);
  const people = (chapter.personIds || []).map((id) => DataService.getPersonByIdOrSlug(id)).filter(Boolean) as Person[];
  const places = (chapter.placeIds || []).map((id) => DataService.getPlaceByIdOrSlug(id)).filter(Boolean) as Place[];
  const concepts = (chapter.conceptIds || []).map((id) => DataService.getConceptByIdOrSlug(id)).filter(Boolean) as Concept[];
  const researchNotes = (chapter.researchNoteIds || []).map((id) => DataService.getResearchNotes().find((n) => n.id === id)).filter(Boolean) as ResearchNote[];
  const relatedChapters = (chapter.relatedChapterIds || []).map((id) => DataService.getChapterByIdOrSlug(id)).filter(Boolean) as Chapter[];
  const claims = (chapter.claimIds || []).map((id) => DataService.getClaimByIdOrSlug(id)).filter(Boolean) as Claim[];
  const relatedEvents = DataService.getEventsByChapter(chapter.id);

  const allChapters = DataService.getChapters();
  const currentIndex = allChapters.findIndex((c) => c.id === chapter.id);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  const fontClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    larger: 'text-xl sm:text-2xl leading-loose'
  }[fontSize];

  return (
    <article className="min-h-screen bg-[#FAF8F5] pb-28">
      {/* Reading Progress Rail */}
      <div className="fixed top-18 left-0 right-0 h-0.5 bg-[#E6E1D6]/60 z-30">
        <div
          className="h-full bg-[#1E3A5F] transition-all duration-75"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Sticky Reading Utility Bar */}
      <div className="sticky top-19 z-20 bg-[#FAF8F5]/96 backdrop-blur-xs hairline-b py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#5C5751]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/${language}/chapters`)}
              className="hover:text-[#1A1918] transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{t.labels.backToChapters}</span>
            </button>
            <span aria-hidden="true" className="text-[#E6E1D6]">·</span>
            <span className="font-mono text-[#878177]">
              {language === 'ur' ? `باب ${chapter.chapterNumber}` : `Chapter ${chapter.chapterNumber}`}
            </span>
            {collection && (
              <>
                <span aria-hidden="true" className="text-[#E6E1D6] hidden md:inline">·</span>
                <span className="font-serif italic hidden md:inline truncate max-w-xs text-[#5C5751]">
                  {collection.title[language]}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 bg-[#F0ECE3] p-0.5 rounded-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 text-xs font-serif cursor-pointer ${fontSize === 'normal' ? 'bg-white text-[#1A1918] font-bold shadow-xs' : 'text-[#5C5751]'}`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 text-sm font-serif cursor-pointer ${fontSize === 'large' ? 'bg-white text-[#1A1918] font-bold shadow-xs' : 'text-[#5C5751]'}`}
                title="Large text size"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2500);
                }
              }}
              className="hover:text-[#1A1918] flex items-center gap-1 cursor-pointer font-sans"
              title={t.actions.share}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {copied
                  ? language === 'ur'
                    ? 'ربط محفوظ!'
                    : 'Link Copied!'
                  : t.actions.share}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. CHAPTER HEADER & SOURCE METADATA */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#878177] font-sans uppercase tracking-widest mb-3">
          <span className="font-bold text-[#1E3A5F]">
            {language === 'ur' ? `باب ${chapter.chapterNumber}` : `CHAPTER 0${chapter.chapterNumber}`}
          </span>
          <span aria-hidden="true">·</span>
          <span>{collection ? collection.title[language] : '40,000 Years of Knowledge'}</span>
          <span aria-hidden="true">·</span>
          <span>{chapter.timeframe}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#1A1918] tracking-tight leading-[1.12] mb-3">
          {chapter.title[language]}
        </h1>

        <p className="text-lg sm:text-xl font-serif italic text-[#5C5751] leading-relaxed max-w-3xl mb-8">
          {chapter.subtitle[language]}
        </p>

        {/* Archival Provenance Card */}
        <div className="p-5 bg-white border border-[#E6E1D6] text-xs font-serif text-[#2D2A26] shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0ECE3] pb-2.5">
            <span className="text-[11px] font-sans uppercase tracking-wider font-semibold text-[#878177]">
              Archival Source Ingestion Dossier
            </span>
            <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-300 text-amber-900 font-mono text-[10px] uppercase font-medium">
              {chapter.researchStatus || 'Source Cataloged · Audit In Progress'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <strong className="font-sans uppercase text-[10px] text-[#878177] block">Creator / Source:</strong>
              <div className="font-medium text-[#1A1918] flex items-center gap-1.5 mt-0.5">
                <Youtube className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{chapter.originalSourceCreator || 'Furqan Qureshi Blogs'}</span>
              </div>
            </div>

            <div>
              <strong className="font-sans uppercase text-[10px] text-[#878177] block">Publication Date:</strong>
              <div className="font-mono text-[#1A1918] mt-0.5">
                {chapter.publicationDate || '13 October 2022'}
              </div>
            </div>

            <div>
              <strong className="font-sans uppercase text-[10px] text-[#878177] block">Duration / Scale:</strong>
              <div className="font-mono text-[#1A1918] mt-0.5">
                {chapter.duration || 'approximately 48 minutes'}
              </div>
            </div>
          </div>

          {chapter.originalSourceUrl && (
            <div className="pt-2 border-t border-[#F0ECE3] flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-3">
                <span className="text-[#878177] font-sans">Original Video Record:</span>
                <a
                  href={chapter.originalSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E3A5F] hover:underline flex items-center gap-1 font-sans font-medium"
                >
                  <span>View Original YouTube Lecture</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <button
                onClick={() => navigate(`/${language}/research?chapter=${chapter.id}`)}
                className="px-2.5 py-1 bg-[#1E3A5F] hover:bg-[#152840] text-white font-sans font-medium rounded-xs cursor-pointer flex items-center gap-1 transition-colors shadow-2xs"
              >
                <Layers className="w-3 h-3 text-[#B8934A]" />
                <span>{language === 'ur' ? 'تحقیقاتی کارگاہ میں کھولیے' : 'Open in Research Workspace'}</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 2. OVERVIEW */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="p-6 sm:p-8 bg-[#F5F1EA] border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#1E3A5F] text-[#1A1918] space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold block">
            {language === 'ur' ? 'خلاصہ اور وسعتِ تحقیق' : 'Overview & Scope'}
          </span>
          <p className="text-base sm:text-lg font-serif leading-relaxed text-[#2D2A26]">
            {chapter.abstract[language]}
          </p>
        </div>
      </section>

      {/* 3. ORIGINAL SOURCE SECTIONS (PROVISIONAL TIMESTAMPS) */}
      {chapter.provisionalTimestamps && chapter.provisionalTimestamps.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-[#F0ECE3] pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B8934A]" />
                <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1A1918]">
                  {language === 'ur' ? 'اصل ماخذ کے سیکشنز اور ٹائم اسٹیمپس' : 'Original Source Sections (Provisional Timestamps)'}
                </h2>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-amber-50 border border-amber-300 text-amber-900 font-medium">
                Marked: Provisional
              </span>
            </div>

            <div className="p-3 bg-amber-50/50 border border-amber-200 text-xs font-serif text-amber-950 mb-4 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {language === 'ur'
                  ? 'انتباہ: یہ ٹائم اسٹیمپس عارضی (Provisional) ہیں جب تک کہ اصل ویڈیو کے ساتھ سیکنڈ بہ سیکنڈ ان کی آزادانہ جانچ مکمل نہ ہو۔ کوئی من گھڑت تحریر شامل نہیں کی گئی۔'
                  : 'Notice: These timestamps are marked Provisional until independently verified against the physical runtime of the source video. No transcript text or quotations have been invented.'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {chapter.provisionalTimestamps.map((ts, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[#FAF8F5] border border-[#E6E1D6] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[#1E3A5F] font-bold shrink-0">{ts.time}</span>
                    <span className="font-serif text-[#1A1918] truncate">{ts.title}</span>
                  </div>
                  <span className="text-[9px] uppercase font-sans text-amber-800 bg-amber-100/60 px-1.5 py-0.5 shrink-0">
                    Provisional
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. RESEARCH MAP (3-WAY INTELLECTUAL FRAMEWORK) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
          <span className="text-xs font-sans uppercase tracking-widest text-[#878177] font-semibold block mb-2 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#1E3A5F]" />
            <span>Research Map: The 3 Pillars of Chapter 01</span>
          </span>
          <p className="text-xs font-serif text-[#5C5751] mb-6 leading-relaxed">
            The chapter investigates cosmic origins through three distinct epistemic registers that must never be conflated:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-serif">
            {/* Pillar 1 */}
            <div className="p-4 bg-[#F0FDF4] border border-[#14532D]/20">
              <span className="font-sans uppercase text-[10px] font-bold text-[#14532D] block mb-1">
                Pillar 1: Physical Science
              </span>
              <p className="text-[#1A1918] leading-relaxed mb-2 font-medium">
                Observable Cosmology &amp; Metric Expansion
              </p>
              <p className="text-[#5C5751] leading-relaxed">
                CMB radiation, Hubble-Lemaître expansion, and observational limits at the Planck threshold.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 bg-[#F0FDFA] border border-[#0F766E]/20">
              <span className="font-sans uppercase text-[10px] font-bold text-[#0F766E] block mb-1">
                Pillar 2: Ancient Civilizations
              </span>
              <p className="text-[#1A1918] leading-relaxed mb-2 font-medium">
                Mesopotamian, Egyptian &amp; Hellenistic Spheres
              </p>
              <p className="text-[#5C5751] leading-relaxed">
                Superimposed stone heavens, astronomical star tables, and planetary wanderer mythology.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 bg-[#EEF2FF] border border-[#3730A3]/20">
              <span className="font-sans uppercase text-[10px] font-bold text-[#3730A3] block mb-1">
                Pillar 3: Religious Revelation
              </span>
              <p className="text-[#1A1918] leading-relaxed mb-2 font-medium">
                The Seven Skies (Sab’a Samawat) &amp; Exegesis
              </p>
              <p className="text-[#5C5751] leading-relaxed">
                Quranic passages on primordial smoke (Dukhan) and the metaphysical horizons of the Arsh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* READING NARRATIVE WITH EDITORIAL VISUAL DISTINCTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 space-y-12">
        {chapter.sections.map((section, idx) => (
          <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] tracking-tight border-b border-[#E6E1D6] pb-3">
              {section.heading[language]}
            </h2>

            {section.subheading && (
              <p className="text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold">
                {section.subheading[language]}
              </p>
            )}

            <p
              className={`font-serif text-[#242220] ${fontClasses} ${
                idx === 0
                  ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left rtl:first-letter:float-right first-letter:mr-3 rtl:first-letter:ml-3 first-letter:mt-1 first-letter:text-[#1A1918]'
                  : ''
              }`}
            >
              {section.body[language]}
            </p>

            {/* Epistemic Callout Box */}
            {section.epistemicCallout && (
              <div className="my-6 p-5 bg-white border border-[#E6E1D6] shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider font-sans font-semibold text-[#878177]">
                      {language === 'ur' ? 'علمی درجہ بندی' : 'Epistemic Demarcation'}
                    </span>
                    <EpistemicBadge status={section.epistemicCallout.status} />
                  </div>
                </div>
                <p className="text-sm font-serif italic text-[#1A1918] leading-relaxed">
                  "{section.epistemicCallout.text[language]}"
                </p>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* 5. CLAIMS DOSSIER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-[#F0ECE3] pb-3">
            <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1A1918] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#1E3A5F]" />
              <span>{language === 'ur' ? 'اس باب میں مدون کردہ دعوے' : 'Formulated Claims Investigated in this Chapter'}</span>
            </h2>
            <span className="font-mono text-xs text-[#878177]">{claims.length} claims</span>
          </div>

          <div className="space-y-4">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="p-4 bg-[#FAF8F5] border border-[#E6E1D6] flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <EpistemicBadge status={claim.status || claim.epistemicStatus} />
                    {claim.timestamp && (
                      <span className="font-mono text-[11px] text-[#878177]">Timestamp: {claim.timestamp}</span>
                    )}
                  </div>
                  <h3 className="text-sm font-serif font-medium text-[#1A1918] mb-2 leading-relaxed">
                    {claim.statement[language]}
                  </h3>
                  <p className="text-xs font-serif text-[#5C5751] leading-relaxed mb-3">
                    {claim.epistemicRationale[language]}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E6E1D6] flex items-center justify-between text-xs">
                  <span className="font-sans text-[11px] text-[#878177]">
                    Consensus: {claim.confidenceRating.replace(/_/g, ' ')}
                  </span>
                  <button
                    onClick={() => setActiveClaim(claim)}
                    className="text-[#1E3A5F] hover:underline font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Evidence</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRIMARY SOURCES */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
          <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1A1918] mb-4 flex items-center gap-2 border-b border-[#F0ECE3] pb-3">
            <CheckCircle className="w-4 h-4 text-[#1E3A5F]" />
            <span>Primary Sources &amp; Empirical Records</span>
          </h2>
          {primarySources.length > 0 ? (
            <div className="space-y-4">
              {primarySources.map((ps) => (
                <div key={ps.id} className="p-4 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif">
                  <div className="font-semibold text-sm text-[#1A1918] mb-1">{ps.title[language]}</div>
                  <div className="text-[#5C5751] mb-2">
                    <span>{ps.datingRange}</span> · <span>Repository: {ps.currentLocation[language]}</span>
                  </div>
                  <p className="italic text-[#2D2A26]">"{ps.epistemicNotes[language]}"</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs font-serif text-[#5C5751] italic">
              Empirical physics uses calibrated space telescope radiometry (Planck, WMAP) rather than ancient inscriptions.
            </p>
          )}
        </div>
      </section>

      {/* 7. SCIENTIFIC EVIDENCE */}
      {chapter.scientificEvidence && chapter.scientificEvidence.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
            <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#14532D] mb-4 flex items-center gap-2 border-b border-[#F0ECE3] pb-3">
              <ShieldCheck className="w-4 h-4 text-[#14532D]" />
              <span>Scientific Evidence &amp; Observational Cosmology</span>
            </h2>
            <div className="space-y-4">
              {chapter.scientificEvidence.map((se, idx) => (
                <div key={idx} className="p-4 bg-[#F0FDF4]/50 border border-[#14532D]/20 text-xs font-serif">
                  <h3 className="font-sans font-bold text-xs text-[#14532D] uppercase tracking-wide mb-1">
                    {se.topic[language]}
                  </h3>
                  <div className="mb-2">
                    <strong className="font-sans text-[10px] uppercase text-[#1A1918] block">Established Consensus:</strong>
                    <p className="text-[#2D2A26] leading-relaxed">{se.consensus[language]}</p>
                  </div>
                  <div>
                    <strong className="font-sans text-[10px] uppercase text-[#9A3412] block">Empirical Limitations:</strong>
                    <p className="text-[#5C5751] leading-relaxed">{se.limitations[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. HISTORICAL EVIDENCE */}
      {chapter.historicalEvidence && chapter.historicalEvidence.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
            <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#0F766E] mb-4 flex items-center gap-2 border-b border-[#F0ECE3] pb-3">
              <Scroll className="w-4 h-4 text-[#0F766E]" />
              <span>Historical Evidence: Ancient Civilizational Cosmologies</span>
            </h2>
            <div className="space-y-4">
              {chapter.historicalEvidence.map((he, idx) => (
                <div key={idx} className="p-4 bg-[#F0FDFA]/50 border border-[#0F766E]/20 text-xs font-serif">
                  <h3 className="font-sans font-bold text-xs text-[#0F766E] uppercase tracking-wide mb-1">
                    {he.civilization[language]}
                  </h3>
                  <div className="mb-2">
                    <strong className="font-sans text-[10px] uppercase text-[#1A1918] block">Documented Textual Record:</strong>
                    <p className="text-[#2D2A26] leading-relaxed">{he.record[language]}</p>
                  </div>
                  <div>
                    <strong className="font-sans text-[10px] uppercase text-[#878177] block">Historiographical Scope:</strong>
                    <p className="text-[#5C5751] leading-relaxed">{he.limitations[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. RELIGIOUS TEXTS & HERMENEUTICS */}
      {chapter.religiousTexts && chapter.religiousTexts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
            <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#3730A3] mb-4 flex items-center gap-2 border-b border-[#F0ECE3] pb-3">
              <BookOpen className="w-4 h-4 text-[#3730A3]" />
              <span>Religious Texts &amp; Scriptural Cosmologies</span>
            </h2>
            <div className="space-y-4">
              {chapter.religiousTexts.map((rt, idx) => (
                <div key={idx} className="p-4 bg-[#EEF2FF]/50 border border-[#3730A3]/20 text-xs font-serif">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans font-bold text-xs text-[#3730A3] uppercase tracking-wide">
                      {rt.tradition[language]}
                    </span>
                    <span className="font-mono text-[11px] text-[#878177]">{rt.citation}</span>
                  </div>
                  <blockquote className="my-2 p-3 bg-white border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#3730A3] text-sm text-[#1A1918] font-medium leading-relaxed">
                    {rt.passage[language]}
                  </blockquote>
                  <div>
                    <strong className="font-sans text-[10px] uppercase text-[#878177] block">Hermeneutic Status:</strong>
                    <p className="text-[#5C5751] leading-relaxed">{rt.hermeneuticStatus[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9.5 CHRONOLOGICAL CONTEXT & TIMELINE EVENTS */}
      {relatedEvents.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0ECE3] pb-3">
              <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1E3A5F] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1E3A5F]" />
                <span>{language === 'ur' ? 'تاریخی خطِ زمانی اور متعلقہ تواریخ' : 'Chronological Context & Timeline Thresholds'}</span>
              </h2>

              <button
                onClick={() => navigateToTimeline()}
                className="text-xs font-sans text-[#1E3A5F] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'ur' ? 'مکمل خط زمانی دیکھیں' : 'View Full Historical Timeline'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>

            <p className="text-xs font-serif text-[#5C5751] leading-relaxed">
              {language === 'ur'
                ? 'باب میں زیر بحث کائناتی نظریات اور تاریخی متون کا مستند زمانی تسلسل، تجرباتی فلکیات سے لے کر قدیم کتبات تک۔'
                : 'Empirical astrophysical discoveries and ancient cosmological texts referenced in this chapter mapped along the archive’s calibrated historical chronology.'}
            </p>

            <div className="space-y-2.5 pt-1">
              {relatedEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => navigateToTimeline(ev.id)}
                  className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] rounded-xs cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#1E3A5F]">
                        {ev.historicalDate?.displayLabel?.[language] || ev.approximateDate}
                      </span>
                      <EpistemicBadge status={ev.epistemicStatus} />
                    </div>
                    <h4 className="font-serif font-medium text-xs sm:text-sm text-[#1A1918] truncate">
                      {ev.title[language]}
                    </h4>
                  </div>

                  <span className="text-xs font-sans text-[#1E3A5F] shrink-0 flex items-center gap-1 font-medium">
                    <span>{language === 'ur' ? 'خط زمانی میں دیکھیں' : 'Inspect on Timeline'}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. RELATED CONCEPTS */}
      {concepts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
            <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1A1918] mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#831843]" />
              <span>Connected Epistemic Concepts</span>
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {concepts.map((cn) => (
                <button
                  key={cn.id}
                  onClick={() => navigate(`/${language}/concepts?id=${cn.id}`)}
                  className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F5F1EA] border border-[#E6E1D6] text-[#1A1918] flex items-center gap-1.5 cursor-pointer font-serif"
                >
                  <Sparkles className="w-3 h-3 text-[#B8934A]" />
                  <span>{cn.name[language]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. RELATED CHAPTERS */}
      {relatedChapters.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
            <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1A1918] mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1E3A5F]" />
              <span>Connected Chapters in the Series</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {relatedChapters.map((rc) => (
                <button
                  key={rc.id}
                  onClick={() => navigateToChapter(rc.slug)}
                  className="p-3 bg-[#FAF8F5] hover:bg-[#F5F1EA] border border-[#E6E1D6] text-left rtl:text-right flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] uppercase font-sans text-[#878177] block">
                      Chapter {rc.chapterNumber}
                    </span>
                    <span className="font-serif font-medium text-[#1A1918] block truncate max-w-xs">
                      {rc.title[language]}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 text-[#878177]" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. RESEARCH NOTES */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs space-y-4">
          <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1A1918] flex items-center gap-2 border-b border-[#F0ECE3] pb-3">
            <FileText className="w-4 h-4 text-[#1E3A5F]" />
            <span>Research Notes &amp; Methodological Governance</span>
          </h2>

          <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif space-y-2">
            <strong className="font-sans text-[11px] uppercase tracking-wider text-[#1A1918] block">
              Source Preservation Standard:
            </strong>
            <p className="text-[#5C5751] leading-relaxed">
              The archive records Furqan Qureshi’s original video presentation faithfully without censorship or editorial rewriting. Where the author asserts strong theological conclusions, we preserve them as original source viewpoints while tagging them with appropriate epistemic tiers so researchers can transparently distinguish faith claims from peer-reviewed physical physics.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif space-y-2">
            <strong className="font-sans text-[11px] uppercase tracking-wider text-[#9A3412] block">
              The Hazard of Concordism:
            </strong>
            <p className="text-[#5C5751] leading-relaxed">
              We urge caution against uncritical concordism—the practice of forcing ancient sacred verses to match whatever physical science models happen to be popular in a given decade. Ancient texts spoke to their immediate audiences in evocative metaphysical terms; empirical science advances through falsifiable mathematical measurement.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter Deep Inspector Drawer */}
      <ClaimInspector claim={activeClaim} onClose={() => setActiveClaim(null)} />
    </article>
  );
};
