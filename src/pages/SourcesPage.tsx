import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { DataService } from '../services/dataService';
import { EpistemicBadge } from '../components/common/EpistemicBadge';
import { BookOpen, CheckCircle, Scroll, ExternalLink, ArrowRight, Layers, FileText } from 'lucide-react';

export const SourcesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { route, navigateToClaim } = useNavigation();

  const primarySources = DataService.getPrimarySources();
  const sources = DataService.getSources();
  const texts = DataService.getTexts();

  const [activeTab, setActiveTab] = useState<'all' | 'primary' | 'texts' | 'secondary'>('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (route.query) {
      if (route.query.id) setHighlightedId(route.query.id);
      if (route.query.text) {
        setHighlightedId(route.query.text);
        setActiveTab('texts');
      }
    }
  }, [route.query]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="border-b border-[#E6E1D6] pb-8 mb-10">
        <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
          Epigraphic Corpus &amp; Critical Editions
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#1A1918] tracking-tight mt-1">
          {language === 'ur' ? 'مآخذ و اسناد: کتبات اور تاریخی متون' : 'Sources & Bibliography: Epigraphic Inscriptions'}
        </h1>
        <p className="mt-3 text-base font-serif text-[#5C5751] max-w-3xl leading-relaxed">
          {language === 'ur'
            ? 'بنیادی مادی کتبات، کلاسیکی روایات، اور جدید سائنسی مقالات کا باضابطہ اندراج۔ یہاں ہر ماخذ کی سائنسی حیثیت اور قابل اعتمادی کا واضح جائزہ درج ہے۔'
            : 'Explore the complete corpus of primary physical artifacts, ancient texts, classical secondary witnesses, and modern peer-reviewed monographs underpinning the atlas.'}
        </p>
      </div>

      {/* Epistemic Rule Reminder */}
      <div className="p-4 bg-white border border-[#E6E1D6] mb-8 text-xs text-[#5C5751] flex flex-col sm:flex-row items-baseline justify-between gap-2">
        <div>
          <strong className="font-sans uppercase tracking-wider text-[#1A1918]">Demarcation Standard: </strong>
          <span className="font-serif italic text-[#2D2A26]">
            Primary artifacts (tablets, pigments, strata) are empirical witnesses; secondary chronicles reflect preserved tradition.
          </span>
        </div>
        <span className="font-mono text-[#878177] shrink-0">
          {primarySources.length} Primary · {texts.length} Canonical Texts · {sources.length} Monographs/Sources
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E6E1D6] pb-3 mb-8 overflow-x-auto text-xs font-sans">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer rounded-xs ${
            activeTab === 'all'
              ? 'bg-[#1A1918] text-white shadow-xs'
              : 'text-[#5C5751] hover:text-[#1A1918] hover:bg-[#F5F1EA]'
          }`}
        >
          {language === 'ur' ? 'تمام مآخذ' : 'All Sources'}
        </button>
        <button
          onClick={() => setActiveTab('primary')}
          className={`px-3.5 py-1.5 font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer rounded-xs ${
            activeTab === 'primary'
              ? 'bg-[#1A1918] text-white shadow-xs'
              : 'text-[#5C5751] hover:text-[#1A1918] hover:bg-[#F5F1EA]'
          }`}
        >
          {t.labels.primarySources} ({primarySources.length})
        </button>
        <button
          onClick={() => setActiveTab('texts')}
          className={`px-3.5 py-1.5 font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer rounded-xs ${
            activeTab === 'texts'
              ? 'bg-[#1A1918] text-white shadow-xs'
              : 'text-[#5C5751] hover:text-[#1A1918] hover:bg-[#F5F1EA]'
          }`}
        >
          {language === 'ur' ? 'قدیم و کلاسیکی متون' : 'Canonical Texts'} ({texts.length})
        </button>
        <button
          onClick={() => setActiveTab('secondary')}
          className={`px-3.5 py-1.5 font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer rounded-xs ${
            activeTab === 'secondary'
              ? 'bg-[#1A1918] text-white shadow-xs'
              : 'text-[#5C5751] hover:text-[#1A1918] hover:bg-[#F5F1EA]'
          }`}
        >
          {t.labels.secondarySources} &amp; Monographs ({sources.length})
        </button>
      </div>

      <div className="space-y-10">
        {/* Primary Artifacts Stream */}
        {(activeTab === 'all' || activeTab === 'primary') && (
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#1E3A5F]" />
              <span>{t.labels.primarySources}</span>
            </h2>
            {primarySources.map((ps) => {
              const relyingClaims = DataService.getClaimsBySource(ps.id);
              const isTarget = highlightedId === ps.id;

              return (
                <div
                  key={ps.id}
                  id={ps.id}
                  className={`bg-white border-2 p-6 shadow-2xs transition-all ${
                    isTarget ? 'border-[#1E3A5F] ring-2 ring-[#1E3A5F]/20' : 'border-[#E6E1D6] hover:border-[#878177]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-sans uppercase tracking-widest text-[#1E3A5F] font-bold">
                      Primary Material Artifact · {ps.artifactType.replace(/_/g, ' ')}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#1A1918]">{ps.datingRange}</span>
                  </div>

                  <h3 className="text-xl font-serif font-medium text-[#1A1918] mb-1">
                    {ps.title[language]}
                  </h3>

                  {ps.originalTitle && (
                    <div className="text-xs font-serif italic text-[#5C5751] mb-2">
                      Original / Standard Ref: {ps.originalTitle}
                    </div>
                  )}

                  {ps.accessionNumber && (
                    <div className="font-mono text-xs text-[#878177] mb-3">
                      Accession / Shelfmark: {ps.accessionNumber}
                    </div>
                  )}

                  {/* Primary Artifact Distinction Breakdown */}
                  {ps.interpretationDistinction && (
                    <div className="my-4 p-4 bg-[#FAF8F5] border border-[#E6E1D6] space-y-2 text-xs font-serif">
                      <span className="font-sans uppercase tracking-wider text-[10px] text-[#878177] font-bold block mb-1">
                        Archival Distinction: What Artifact States vs Interpretation
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-white p-3 border border-[#E6E1D6]">
                          <strong className="font-sans uppercase text-[10px] text-[#1E3A5F] block mb-1">
                            1. Original Inscription
                          </strong>
                          <span className="text-[#2D2A26]">{ps.interpretationDistinction.originalAttestation[language]}</span>
                        </div>
                        <div className="bg-white p-3 border border-[#E6E1D6]">
                          <strong className="font-sans uppercase text-[10px] text-[#14532D] block mb-1">
                            2. Empirical Physical Proof
                          </strong>
                          <span className="text-[#2D2A26]">{ps.interpretationDistinction.physicalProof[language]}</span>
                        </div>
                        <div className="bg-white p-3 border border-[#E6E1D6]">
                          <strong className="font-sans uppercase text-[10px] text-[#0F766E] block mb-1">
                            3. Scholarly Interpretation
                          </strong>
                          <span className="text-[#2D2A26]">{ps.interpretationDistinction.scholarlyInterpretation[language]}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif text-[#2D2A26] space-y-1 mb-3">
                    <div>
                      <strong className="font-sans text-[#1A1918] text-[10px] uppercase tracking-wider">
                        Provenance:
                      </strong>{' '}
                      {ps.provenance[language]}
                    </div>
                    <div>
                      <strong className="font-sans text-[#1A1918] text-[10px] uppercase tracking-wider">
                        Dating Methodology:
                      </strong>{' '}
                      {ps.datingMethod[language]}
                    </div>
                    <div>
                      <strong className="font-sans text-[#1A1918] text-[10px] uppercase tracking-wider">
                        Physical Repository:
                      </strong>{' '}
                      {ps.currentLocation[language]}
                    </div>
                  </div>

                  <p className="text-xs font-serif text-[#5C5751] italic mb-4">
                    "{ps.epistemicNotes[language]}"
                  </p>

                  {/* Connected Claims Relying on this Primary Source */}
                  {relyingClaims.length > 0 && (
                    <div className="pt-3 border-t border-[#F0ECE3]">
                      <span className="text-[11px] uppercase tracking-wider text-[#878177] font-sans block mb-2 font-semibold">
                        Claims Grounded on this Artifact ({relyingClaims.length}):
                      </span>
                      <div className="space-y-1.5">
                        {relyingClaims.map((clm) => (
                          <button
                            key={clm.id}
                            onClick={() => navigateToClaim(clm.id)}
                            className="w-full text-left rtl:text-right text-xs font-serif text-[#1E3A5F] hover:text-[#1A1918] hover:underline flex items-center gap-1.5 cursor-pointer"
                          >
                            <Layers className="w-3.5 h-3.5 text-[#878177] shrink-0" />
                            <span className="truncate">{clm.statement[language]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Canonical Ancient & Primary Texts Stream */}
        {(activeTab === 'all' || activeTab === 'texts') && (
          <div className="space-y-6 pt-4">
            <h2 className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold mb-2 flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[#B8934A]" />
              <span>{language === 'ur' ? 'قدیم و کلاسیکی متون کا کارپس' : 'Canonical Texts & Literary Monuments'}</span>
            </h2>
            {texts.map((text) => {
              const author = text.authorId ? DataService.getPersonByIdOrSlug(text.authorId) : null;
              const civ = DataService.getCivilizationByIdOrSlug(text.civilizationId);
              const translations = DataService.getTranslationsByTextId(text.id);
              const quotes = text.quoteIds?.map((qid) => DataService.getQuoteById(qid)).filter(Boolean) || [];

              return (
                <div
                  key={text.id}
                  id={text.id}
                  className="bg-white border border-[#E6E1D6] p-6 shadow-2xs hover:border-[#878177] transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-sans uppercase tracking-widest text-[#B8934A] font-semibold">
                      {civ?.name[language]} · {text.originalLanguage}
                    </span>
                    <span className="font-mono text-xs text-[#878177]">{text.approximateDate}</span>
                  </div>

                  <h3 className="text-xl font-serif font-medium text-[#1A1918] mb-1">
                    {text.title[language]}
                  </h3>

                  {text.originalTitle && (
                    <div className="text-xs font-serif italic text-[#5C5751] mb-2">
                      Original: {text.originalTitle}
                    </div>
                  )}

                  {author && (
                    <div className="text-xs font-sans text-[#1A1918] mb-3">
                      Author: <span className="font-semibold">{author.name[language]}</span> ({author.role[language]})
                    </div>
                  )}

                  <p className="text-sm font-serif text-[#2D2A26] leading-relaxed mb-4">
                    {text.summary[language]}
                  </p>

                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif text-[#5C5751] mb-4">
                    <strong className="font-sans text-[#1A1918] text-[10px] uppercase tracking-wider block mb-1">
                      Extant Manuscript Witnesses:
                    </strong>
                    {text.extantManuscriptsSummary[language]}
                  </div>

                  {/* Verbatim Quotes if present */}
                  {quotes.length > 0 && (
                    <div className="my-3 p-3 bg-amber-50/40 border border-amber-200/60 text-xs font-serif">
                      <span className="font-sans uppercase text-[10px] text-amber-900 font-bold block mb-1">
                        Verbatim Inscribed Passage:
                      </span>
                      {quotes.map((q) => (
                        <div key={q!.id} className="space-y-1">
                          {q!.originalLanguageText && (
                            <p className="font-mono text-[11px] text-stone-700 italic">
                              "{q!.originalLanguageText}" ({q!.originalLanguageName})
                            </p>
                          )}
                          <p className="text-[#1A1918] font-serif font-medium">
                            "{q!.passage[language]}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Critical Translations */}
                  {translations.length > 0 && (
                    <div className="pt-3 border-t border-[#F0ECE3] text-xs text-[#5C5751]">
                      <span className="font-sans uppercase text-[10px] font-semibold text-[#878177] block mb-1">
                        Published Critical Translations:
                      </span>
                      {translations.map((tr) => (
                        <div key={tr.id} className="font-serif">
                          · {tr.translator[language]} ({tr.year}) {tr.originalScriptSample && <span className="ml-2 font-mono text-[11px]">[{tr.originalScriptSample}]</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Secondary & Modern Scholarship Stream */}
        {(activeTab === 'all' || activeTab === 'secondary') && (
          <div className="space-y-6 pt-4">
            <h2 className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#5C5751]" />
              <span>{language === 'ur' ? 'کلاسیکی متون و جدید سائنسی تصانیف' : 'Secondary Sources & Academic Monographs'}</span>
            </h2>
            {sources.map((s) => {
              const relyingClaims = DataService.getClaimsBySource(s.id);
              const relyingChapters = DataService.getChaptersBySource(s.id);

              return (
                <div
                  key={s.id}
                  id={s.id}
                  className="bg-white border border-[#E6E1D6] p-6 shadow-2xs hover:border-[#878177] transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <EpistemicBadge status={s.epistemicClass} />
                      <span className="text-[11px] font-mono uppercase text-[#878177]">
                        {s.sourceType.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#878177]">{s.publicationYearOrEpoch}</span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-[#1A1918] mb-1">
                    {s.title[language]}
                  </h3>

                  <div className="text-xs font-sans text-[#5C5751] mb-3">
                    By {s.authors.map((a) => a[language]).join(', ')} ·{' '}
                    <span className="font-serif italic">{s.publication[language]}</span>
                    {s.isbn && <span className="font-mono text-[#878177] ml-2">(ISBN: {s.isbn})</span>}
                    {s.doi && <span className="font-mono text-[#878177] ml-2">(DOI: {s.doi})</span>}
                  </div>

                  <p className="text-xs font-serif text-[#2D2A26] leading-relaxed mb-3">
                    {s.description[language]}
                  </p>

                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif text-[#2D2A26] mb-3">
                    <strong className="font-sans text-[#1A1918] text-[10px] uppercase tracking-wider block mb-1">
                      Archival Reliability &amp; Epistemic Notes:
                    </strong>
                    {s.reliabilityNotes[language]}
                  </div>

                  {/* Connected Claims Relying on this Source */}
                  {relyingClaims.length > 0 && (
                    <div className="pt-3 border-t border-[#F0ECE3]">
                      <span className="text-[11px] uppercase tracking-wider text-[#878177] font-sans block mb-1.5 font-semibold">
                        Archive Claims Relying on this Source ({relyingClaims.length}):
                      </span>
                      <div className="space-y-1">
                        {relyingClaims.map((clm) => (
                          <button
                            key={clm.id}
                            onClick={() => navigateToClaim(clm.id)}
                            className="w-full text-left rtl:text-right text-xs font-serif text-[#1E3A5F] hover:text-[#1A1918] hover:underline flex items-center gap-1.5 cursor-pointer"
                          >
                            <Layers className="w-3.5 h-3.5 text-[#878177] shrink-0" />
                            <span className="truncate">{clm.statement[language]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Connected Chapters */}
                  {relyingChapters.length > 0 && (
                    <div className="mt-2 text-xs font-serif text-[#5C5751] flex items-center gap-2">
                      <span className="font-sans text-[10px] uppercase text-[#878177] font-semibold">Cited in Chapters:</span>
                      {relyingChapters.map((ch) => (
                        <span key={ch.id} className="text-[#1A1918] italic font-medium">
                          {ch.title[language]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
