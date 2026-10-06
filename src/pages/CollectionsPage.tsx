import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { DataService } from '../services/dataService';
import {
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  CheckCircle,
  FileText,
  Calendar,
  Youtube,
  ShieldCheck,
  User
} from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigateToChapter, navigate } = useNavigation();

  // Get the flagship 40,000 Years of Knowledge collection
  const mainCollection = DataService.getCollectionById('col-40k-series') || DataService.getCollections()[0];
  const allChapters = DataService.getChapters().filter((c) => c.collectionId === mainCollection.id || !c.collectionId);
  const people = DataService.getPeople();
  const places = DataService.getPlaces();
  const concepts = DataService.getConcepts();
  const sources = DataService.getSources();
  const timelineEvents = DataService.getTimelineEvents().slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* 1. COLLECTION HERO & INTRODUCTION */}
      <header className="border-b border-[#E6E1D6] pb-10">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#878177] font-sans uppercase tracking-widest mb-3">
          <span className="font-bold text-[#1E3A5F]">Archival Research Collection</span>
          <span aria-hidden="true">·</span>
          <span>{mainCollection.collectionType || 'Video Research Series'}</span>
          <span aria-hidden="true">·</span>
          <span>{mainCollection.languageScope?.[language] || 'Urdu / English Mixed Source Material'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#1A1918] tracking-tight mb-4">
          {mainCollection.title[language]}
        </h1>

        <div className="p-4 bg-white border border-[#E6E1D6] mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-sans uppercase text-[11px] font-semibold text-[#878177]">Creator / Source:</span>
            <span className="font-serif font-semibold text-[#1A1918] flex items-center gap-1.5">
              <Youtube className="w-4 h-4 text-red-600" />
              {mainCollection.creatorSource?.[language] || 'Furqan Qureshi Blogs'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans uppercase text-[11px] font-semibold text-[#878177]">Research Status:</span>
            <span className="font-mono px-2 py-0.5 bg-amber-50 border border-amber-300 text-amber-900 font-medium">
              {mainCollection.researchStatus || 'Active Archival Ingestion & Critical Verification'}
            </span>
          </div>
        </div>

        <p className="text-base sm:text-lg font-serif text-[#2D2A26] leading-relaxed max-w-4xl">
          {mainCollection.description[language]}
        </p>
      </header>

      {/* 2. RESEARCH METHODOLOGY */}
      <section className="p-8 bg-white border border-[#E6E1D6] shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#1E3A5F] font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Research Methodology &amp; Epistemic Demarcation</span>
        </div>

        <p className="text-sm font-serif text-[#2D2A26] leading-relaxed">
          {mainCollection.methodology?.[language]}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F0ECE3] text-xs font-serif">
          <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
            <strong className="font-sans uppercase text-[10px] text-[#B8934A] block mb-1">
              1. Original Source Information
            </strong>
            <p className="text-[#5C5751] leading-relaxed">
              Preserves the original video lectures, provisional timestamps, and speaker arguments without distortion or selective rewriting.
            </p>
          </div>

          <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
            <strong className="font-sans uppercase text-[10px] text-[#3730A3] block mb-1">
              2. Archive Editorial Scaffolding
            </strong>
            <p className="text-[#5C5751] leading-relaxed">
              Provides historiographical contextualization, identifying rhetorical themes and comparative cross-civilizational links.
            </p>
          </div>

          <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
            <strong className="font-sans uppercase text-[10px] text-[#14532D] block mb-1">
              3. Empirical Research Findings
            </strong>
            <p className="text-[#5C5751] leading-relaxed">
              Requires physical epigraphic artifacts, radiocarbon calibrations, and peer-reviewed consensus before claims are deemed verified.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CHAPTER INDEX (NUMBERED CHAPTERS) */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E1D6] pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
              Archival Monograph Index
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918]">
              {language === 'ur' ? 'ابواب کی مکمل فہرست' : 'Collection Chapter Index'}
            </h2>
          </div>
          <span className="font-mono text-xs text-[#878177]">
            {allChapters.length} Chapters Cataloged
          </span>
        </div>

        <div className="space-y-4">
          {allChapters.map((ch) => (
            <div
              key={ch.id}
              className="bg-white border border-[#E6E1D6] p-6 shadow-2xs hover:border-[#1E3A5F] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
                  <span className="px-2 py-0.5 bg-[#1E3A5F] text-white font-bold rounded-xs font-mono text-[11px]">
                    CHAPTER 0{ch.chapterNumber}
                  </span>
                  <span className="font-mono text-[#878177]">{ch.timeframe}</span>
                  {ch.duration && (
                    <>
                      <span aria-hidden="true" className="text-[#E6E1D6]">·</span>
                      <span className="font-mono text-[#878177] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ch.duration}
                      </span>
                    </>
                  )}
                  {ch.researchStatus && (
                    <>
                      <span aria-hidden="true" className="text-[#E6E1D6]">·</span>
                      <span className="font-mono text-[10px] text-amber-900 bg-amber-50 border border-amber-200 px-1.5 py-0.2">
                        {ch.researchStatus}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1A1918]">
                  {ch.title[language]}
                </h3>

                <p className="text-xs font-serif text-[#5C5751] line-clamp-2 leading-relaxed">
                  {ch.subtitle[language]}
                </p>

                {ch.originalSourceTitle && (
                  <div className="text-[11px] font-sans text-[#878177] flex items-center gap-1.5">
                    <Youtube className="w-3 h-3 text-red-600" />
                    <span>Source: {ch.originalSourceTitle}</span>
                    {ch.publicationDate && <span>({ch.publicationDate})</span>}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigateToChapter(ch.slug)}
                className="shrink-0 px-4 py-2.5 bg-[#1A1918] hover:bg-[#1E3A5F] text-white text-xs font-sans uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs rounded-xs"
              >
                <span>Open Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TOPICS */}
      {mainCollection.topics && mainCollection.topics.length > 0 && (
        <section className="p-8 bg-white border border-[#E6E1D6] shadow-xs space-y-4">
          <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1A1918] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B8934A]" />
            <span>Key Research Inquiries &amp; Thematic Horizons</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {mainCollection.topics.map((topic, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif font-medium text-[#1A1918]"
              >
                · {topic[language]}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. TIMELINE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-2">
          <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1A1918] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1E3A5F]" />
            <span>Collection Deep-Time Timeline</span>
          </h2>
          <button
            onClick={() => navigate(`/${language}/timeline`)}
            className="text-xs text-[#1E3A5F] hover:underline font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>Full Chronicle</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {timelineEvents.map((ev) => (
            <div key={ev.id} className="p-4 bg-white border border-[#E6E1D6] space-y-1">
              <span className="font-mono text-[#1E3A5F] font-bold block">{ev.yearDisplay[language]}</span>
              <h3 className="font-serif font-medium text-[#1A1918] text-sm">{ev.title[language]}</h3>
              <p className="font-serif text-[#5C5751] line-clamp-2">{ev.summary[language]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PEOPLE, PLACES, CONCEPTS & SOURCES DOSSIER */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* People */}
        <div className="p-5 bg-white border border-[#E6E1D6] space-y-3">
          <h3 className="text-xs uppercase font-sans font-semibold text-[#1A1918] flex items-center gap-1.5 border-b border-[#F0ECE3] pb-2">
            <User className="w-3.5 h-3.5 text-[#B8934A]" />
            <span>Key Figures ({people.length})</span>
          </h3>
          <div className="space-y-1.5 text-xs font-serif">
            {people.slice(0, 5).map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/${language}/people?id=${p.id}`)}
                className="w-full text-left rtl:text-right hover:text-[#1E3A5F] truncate block cursor-pointer"
              >
                · {p.name[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Places */}
        <div className="p-5 bg-white border border-[#E6E1D6] space-y-3">
          <h3 className="text-xs uppercase font-sans font-semibold text-[#1A1918] flex items-center gap-1.5 border-b border-[#F0ECE3] pb-2">
            <MapPin className="w-3.5 h-3.5 text-[#1E3A5F]" />
            <span>Excavation Sites ({places.length})</span>
          </h3>
          <div className="space-y-1.5 text-xs font-serif">
            {places.slice(0, 5).map((pl) => (
              <button
                key={pl.id}
                onClick={() => navigate(`/${language}/places?id=${pl.id}`)}
                className="w-full text-left rtl:text-right hover:text-[#1E3A5F] truncate block cursor-pointer"
              >
                · {pl.name[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Concepts */}
        <div className="p-5 bg-white border border-[#E6E1D6] space-y-3">
          <h3 className="text-xs uppercase font-sans font-semibold text-[#1A1918] flex items-center gap-1.5 border-b border-[#F0ECE3] pb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#831843]" />
            <span>Core Concepts ({concepts.length})</span>
          </h3>
          <div className="space-y-1.5 text-xs font-serif">
            {concepts.slice(0, 5).map((cn) => (
              <button
                key={cn.id}
                onClick={() => navigate(`/${language}/concepts?id=${cn.id}`)}
                className="w-full text-left rtl:text-right hover:text-[#1E3A5F] truncate block cursor-pointer"
              >
                · {cn.name[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="p-5 bg-white border border-[#E6E1D6] space-y-3">
          <h3 className="text-xs uppercase font-sans font-semibold text-[#1A1918] flex items-center gap-1.5 border-b border-[#F0ECE3] pb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Archival Sources ({sources.length})</span>
          </h3>
          <div className="space-y-1.5 text-xs font-serif">
            {sources.slice(0, 5).map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(`/${language}/sources?id=${s.id}`)}
                className="w-full text-left rtl:text-right hover:text-[#1E3A5F] truncate block cursor-pointer"
              >
                · {s.title[language]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RELATED RESEARCH */}
      {mainCollection.relatedResearch && mainCollection.relatedResearch.length > 0 && (
        <section className="p-6 bg-white border border-[#E6E1D6] shadow-xs space-y-4">
          <h2 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#1A1918] flex items-center gap-2 border-b border-[#F0ECE3] pb-3">
            <FileText className="w-4 h-4 text-[#1E3A5F]" />
            <span>Related Research Papers &amp; Epistemic Charters</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mainCollection.relatedResearch.map((rr, idx) => (
              <div key={idx} className="p-4 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif space-y-1">
                <h3 className="font-semibold text-sm text-[#1A1918]">{rr.title[language]}</h3>
                <p className="text-[#5C5751] leading-relaxed">{rr.description[language]}</p>
                {rr.url && (
                  <button
                    onClick={() => navigate(`/${language}${rr.url}`)}
                    className="text-[#1E3A5F] font-sans font-medium hover:underline flex items-center gap-1 pt-2 cursor-pointer"
                  >
                    <span>Read Paper</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
