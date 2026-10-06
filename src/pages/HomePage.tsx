import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { DataService } from '../services/dataService';
import { EpistemicBadge } from '../components/common/EpistemicBadge';
import { BookOpen, Layers, Compass, ArrowRight, ShieldCheck, Clock, CheckCircle, FileText, MapPin, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigateToChapter, navigate } = useNavigation();

  const collections = DataService.getCollections();
  const featuredCollection = collections[0];
  const chapters = DataService.getChapters();
  const heroImage = DataService.getMediaById('media-hero-scroll');
  const claims = DataService.getClaims();
  const primarySources = DataService.getPrimarySources();
  const timelineEvents = DataService.getTimelineEvents().slice(0, 3);
  const leadChapter = chapters[0];

  return (
    <div className="space-y-24 pb-28">
      {/* 1. ARCHIVAL HERO SECTION */}
      <section className="hairline-b bg-gradient-to-b from-[#F5F1EA]/80 to-[#FAF8F5] pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            {/* Archival Classification Marker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5C5751] font-sans font-medium">
              <span>VOL. 40K</span>
              <span aria-hidden="true">·</span>
              <span>40,000 BP — PRESENT</span>
              <span aria-hidden="true">·</span>
              <span>{language === 'ur' ? 'دو لسانی علمی کتب خانہ' : 'Bilingual Digital Archive'}</span>
            </div>

            {/* Exact Required Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-[#1A1918] tracking-tight leading-[1.1] text-wrap-balance">
              {language === 'ur' ? 'چالیس ہزار سالہ علم' : '40,000 Years of Knowledge'}
            </h1>

            {/* Exact Required Subtitle */}
            <p className="text-lg sm:text-xl font-serif text-[#5C5751] max-w-3xl leading-relaxed">
              {language === 'ur'
                ? 'ایک دو لسانی تحقیقی کتب خانہ جو انسانی افکار، تہذیبوں، مذاہب، سائنس، تاریخ اور وجود کے ریکارڈ کا احاطہ کرتا ہے۔'
                : "A bilingual research archive exploring humanity's record of ideas, civilizations, religion, science, history, and existence."}
            </p>

            {/* Archival Callout Notice: Never Silently Convert Interpretation to Fact */}
            <div className="w-full max-w-2xl py-3 px-4 bg-white/80 border border-[#E6E1D6] text-xs font-serif text-[#5C5751] flex items-center justify-center gap-2 mt-2">
              <span className="font-sans font-semibold uppercase tracking-wider text-[#1A1918] text-[10px]">
                {language === 'ur' ? 'اصولِ تحقیق:' : 'Epistemic Demarcation:'}
              </span>
              <span className="italic">
                {language === 'ur'
                  ? 'کسی بھی قدیم تشریح یا نظریے کو خاموشی سے مصدقہ حقیقت میں تبدیل نہ کریں۔'
                  : 'Never silently convert an interpretation into a fact.'}
              </span>
            </div>

            {/* Hero Image Vitrine */}
            {heroImage && (
              <div className="w-full mt-6 border border-[#E6E1D6] bg-white p-2.5 shadow-xs">
                <div className="overflow-hidden bg-[#F0ECE3] aspect-16/9 relative max-h-[460px]">
                  <img
                    src={heroImage.url}
                    alt={heroImage.caption[language]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-3 px-2 flex flex-col sm:flex-row items-baseline justify-between text-xs text-[#5C5751] gap-2">
                  <span className="font-serif italic text-[#1A1918]">
                    {heroImage.caption[language]}
                  </span>
                  <span className="font-sans text-[11px] text-[#878177]">
                    {heroImage.credit[language]}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E6E1D6] pb-4 mb-8 flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
              Archival Repository Division
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] mt-1">
              {language === 'ur' ? 'منتخب مجموعہ' : 'Featured Collection'}
            </h2>
          </div>
          <button
            onClick={() => navigate(`/${language}/collections`)}
            className="text-xs uppercase tracking-wider text-[#1E3A5F] hover:text-[#1A1918] font-semibold underline underline-offset-4 cursor-pointer"
          >
            {language === 'ur' ? 'تمام مجموعات دیکھیں' : 'View All Collections'} →
          </button>
        </div>

        {featuredCollection && (
          <div className="bg-white border border-[#E6E1D6] p-8 sm:p-10 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#878177] mb-3">
              <span className="font-semibold text-[#1A1918]">{featuredCollection.epochSpan}</span>
              <span aria-hidden="true">·</span>
              <span>Curated by {featuredCollection.curator[language]}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] mb-3">
              {featuredCollection.title[language]}
            </h3>

            <p className="text-sm sm:text-base font-serif italic text-[#5C5751] mb-6 leading-relaxed max-w-3xl">
              {featuredCollection.scopeNotice[language]}
            </p>

            <p className="text-sm font-serif text-[#1A1918] leading-relaxed mb-8 max-w-3xl">
              {featuredCollection.description[language]}
            </p>

            {/* Included Chapters Grid */}
            <div className="pt-6 border-t border-[#E6E1D6]">
              <span className="text-xs uppercase tracking-wider text-[#878177] font-sans font-semibold block mb-4">
                {language === 'ur' ? 'شامل شدہ ابواب (مونوگرافس):' : 'Included Monographs in This Series:'}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapters.slice(0, 4).map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => navigateToChapter(ch.slug)}
                    className="text-left rtl:text-right p-4 bg-[#FAF8F5] hover:bg-[#F4F0E8] border border-[#E6E1D6] transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="min-w-0 pr-3 rtl:pr-0 rtl:pl-3">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-sans text-[#878177] mb-1">
                        <span>Chapter {ch.chapterNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{ch.timeframe}</span>
                      </div>
                      <div className="text-sm font-serif font-medium text-[#1A1918] group-hover:text-[#1E3A5F] truncate">
                        {ch.title[language]}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 text-[#878177] group-hover:text-[#1A1918] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. LATEST RESEARCH & EPISTEMIC MATRIX */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E6E1D6] pb-4 mb-8 flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
              The Claim-Evidence Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] mt-1">
              {language === 'ur' ? 'تازہ ترین تحقیقی جائزے اور دعوے' : 'Latest Research & Epistemic Inquiries'}
            </h2>
          </div>
          <button
            onClick={() => navigate(`/${language}/research`)}
            className="text-xs uppercase tracking-wider text-[#1E3A5F] hover:text-[#1A1918] font-semibold underline underline-offset-4 cursor-pointer"
          >
            {language === 'ur' ? 'مکمل ریسرچ میٹرکس کھولیں' : 'Open Claims Engine'} →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {claims.slice(0, 3).map((clm) => (
            <div
              key={clm.id}
              className="bg-white border border-[#E6E1D6] p-6 flex flex-col justify-between hover:border-[#878177] transition-colors shadow-xs"
            >
              <div>
                <div className="mb-3">
                  <EpistemicBadge status={clm.epistemicStatus} />
                </div>
                <h3 className="font-serif text-base font-medium text-[#1A1918] leading-snug mb-3">
                  {clm.statement[language]}
                </h3>
                <p className="font-serif text-xs text-[#5C5751] line-clamp-3 leading-relaxed mb-4">
                  {clm.epistemicRationale[language]}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE3] flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-[#878177] uppercase">
                  Consensus: {clm.confidenceRating.replace('_', ' ')}
                </span>
                <button
                  onClick={() => navigate(`/${language}/research?claim=${clm.id}`)}
                  className="font-medium text-[#1E3A5F] hover:underline cursor-pointer"
                >
                  {t.actions.viewEvidence} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXPLORE THE KNOWLEDGE ATLAS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E3A5F] text-white p-8 sm:p-12 shadow-sm border border-[#162C47]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-sans font-semibold">
                <Compass className="w-4 h-4" />
                <span>Multi-Dimensional Relational Topology</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight">
                {language === 'ur' ? 'علمی اٹلس کا جائزہ لیں' : 'Explore the Knowledge Atlas'}
              </h2>
              <p className="text-sm sm:text-base font-serif text-[#D6E0EC] leading-relaxed max-w-2xl">
                {language === 'ur'
                  ? 'تہذیبوں، کھدائی کے مقامات، بنیادی کتبات اور فلسفیانہ تصورات کا باہمی ربط۔ دریافت کیجیے کہ کس طرح مختلف ادوار کے فکری دھاگے آپس میں پیوست ہیں۔'
                  : 'An interactive cross-reference atlas mapping the topological connections between prehistoric sites, early river civilizations, decipherment methodologies, and scribal systems.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                onClick={() => navigate(`/${language}/atlas`)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF8F5] text-[#1A1918] font-sans text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors cursor-pointer shadow-xs"
              >
                <span>{t.actions.exploreAtlas}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 text-[#1E3A5F]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TIMELINE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E6E1D6] pb-4 mb-8 flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
              Chronometric Horizons
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] mt-1">
              {t.nav.timeline}
            </h2>
          </div>
          <button
            onClick={() => navigate(`/${language}/timeline`)}
            className="text-xs uppercase tracking-wider text-[#1E3A5F] hover:text-[#1A1918] font-semibold underline underline-offset-4 cursor-pointer"
          >
            {language === 'ur' ? 'مکمل تاریخی خط دیکھیں' : 'View Complete Chronicle'} →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timelineEvents.map((ev) => (
            <div key={ev.id} className="bg-white border border-[#E6E1D6] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold text-[#1A1918]">
                    {ev.yearDisplay[language]}
                  </span>
                  <EpistemicBadge status={ev.epistemicStatus} />
                </div>
                <h3 className="text-base font-serif font-medium text-[#1A1918] mb-2 leading-snug">
                  {ev.title[language]}
                </h3>
                <p className="text-xs font-serif text-[#5C5751] line-clamp-3 leading-relaxed">
                  {ev.summary[language]}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE3] mt-4 flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase font-sans text-[#878177]">
                  Epoch: {ev.epoch.replace('_', ' ')}
                </span>
                <button
                  onClick={() => navigate(`/${language}/timeline`)}
                  className="font-medium text-[#1E3A5F] hover:underline cursor-pointer"
                >
                  Examine Event →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED SOURCES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E6E1D6] pb-4 mb-8 flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
              Primary Inscriptions &amp; Critical Editions
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] mt-1">
              {language === 'ur' ? 'منتخب مآخذ اور کتبات' : 'Featured Sources & Inscriptions'}
            </h2>
          </div>
          <button
            onClick={() => navigate(`/${language}/sources`)}
            className="text-xs uppercase tracking-wider text-[#1E3A5F] hover:text-[#1A1918] font-semibold underline underline-offset-4 cursor-pointer"
          >
            {language === 'ur' ? 'تمام مآخذ کی فہرست' : 'View Bibliography'} →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primarySources.map((ps) => (
            <div key={ps.id} className="bg-white border border-[#E6E1D6] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1E3A5F]">
                    Primary Artifact
                  </span>
                  <span className="font-mono text-[11px] text-[#878177]">{ps.datingRange}</span>
                </div>
                <h3 className="text-base font-serif font-medium text-[#1A1918] mb-2 leading-snug">
                  {ps.title[language]}
                </h3>
                <p className="text-xs font-serif text-[#5C5751] italic mb-3">
                  "{ps.epistemicNotes[language]}"
                </p>
                <div className="text-[11px] text-[#878177] font-serif border-t border-[#F0ECE3] pt-2">
                  <span>Repository: {ps.currentLocation[language]}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE3]">
                <button
                  onClick={() => navigate(`/${language}/sources`)}
                  className="text-xs font-medium text-[#1E3A5F] hover:underline cursor-pointer"
                >
                  Examine Provenance →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BEGIN READING (Doorway into Chapter 1) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-[#F5F1EA] border border-[#E6E1D6]">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
              Archival Monograph Doorway
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1A1918]">
              {language === 'ur' ? 'مطالعہ شروع کیجیے: باب اول' : 'Begin Reading: Chapter 1'}
            </h2>
            <p className="text-base font-serif italic text-[#5C5751] leading-relaxed">
              {leadChapter.title[language]} — {leadChapter.subtitle[language]}
            </p>
            <p className="text-sm font-serif text-[#5C5751] leading-relaxed">
              {leadChapter.abstract[language]}
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigateToChapter(leadChapter.slug)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A1918] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{language === 'ur' ? 'باب اول کا مطالعہ شروع کریں' : 'Open Chapter 1 Monograph'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
