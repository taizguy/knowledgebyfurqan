import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { DataService } from '../services/dataService';
import { Layers, FileText, ArrowRight, Lightbulb } from 'lucide-react';

export const ConceptsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { route, navigateToClaim, navigateToChapter } = useNavigation();
  const concepts = DataService.getConcepts();

  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (route.query && route.query.id) {
      setHighlightedId(route.query.id);
      const el = document.getElementById(route.query.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [route.query]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="border-b border-[#E6E1D6] pb-8 mb-10">
        <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
          Epistemological Lexicon
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#1A1918] tracking-tight mt-1">
          {language === 'ur' ? 'تصورات: نظریاتی اور علمی اصطلاحات' : 'Concepts: Foundational Epistemic Ideas'}
        </h1>
        <p className="mt-3 text-base font-serif text-[#5C5751] max-w-2xl leading-relaxed">
          {language === 'ur'
            ? 'وہ فکری اور فلسفیانہ اصول جنہوں نے انسانی شعور کی تشکیل کی: بیرونی یادداشت، یادگاری تعمیرات، اور متنی توثیق کے ضوابط۔ دیکھیے کہ کون سا تصور کن ابواب اور دعووں سے جڑا ہوا ہے۔'
            : 'Core philosophical, semiotic, and methodological concepts structuring the research atlas. Trace every chapter and claim interconnected with each concept.'}
        </p>
      </div>

      <div className="space-y-8">
        {concepts.map((concept) => {
          const connectedChapters = DataService.getChaptersByConcept(concept.id);
          const connectedClaims = DataService.getClaimsByConcept(concept.id);
          const isTarget = highlightedId === concept.id;

          return (
            <div
              key={concept.id}
              id={concept.id}
              className={`bg-white border p-6 sm:p-8 shadow-2xs transition-all ${
                isTarget ? 'border-[#831843] ring-2 ring-[#831843]/20' : 'border-[#E6E1D6] hover:border-[#878177]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#878177] font-semibold">
                  Category: {concept.category.replace(/_/g, ' ')}
                </span>
                <span className="font-mono text-xs text-[#878177]">{concept.firstAttestedEpoch}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#831843] shrink-0" />
                <span>{concept.name[language]}</span>
              </h2>

              {/* Alternate Terms */}
              {concept.alternateTerms && concept.alternateTerms.length > 0 && (
                <div className="flex flex-wrap gap-2 text-xs text-[#5C5751] mb-4 font-serif">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-[#878177]">Also known as:</span>
                  {concept.alternateTerms.map((term, idx) => (
                    <span key={idx} className="italic text-[#1A1918]">
                      "{term[language]}"{idx < concept.alternateTerms!.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-base font-serif text-[#2D2A26] leading-relaxed mb-4">
                {concept.definition[language]}
              </p>

              <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif text-[#5C5751] leading-relaxed mb-6">
                <strong className="font-sans uppercase tracking-wider text-[#1A1918] text-[10px] block mb-1">
                  Historical &amp; Epistemic Evolution:
                </strong>
                {concept.historicalEvolution[language]}
              </div>

              {/* Connected Chapters & Connected Claims */}
              <div className="pt-6 border-t border-[#F0ECE3] space-y-4">
                <span className="text-xs uppercase tracking-wider text-[#878177] font-sans block font-semibold">
                  {language === 'ur' ? 'اس تصور سے منسلک ابواب اور دعوے:' : 'Connected Chapters & Claims in the Archive:'}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Connected Chapters */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E6E1D6]">
                    <span className="font-sans uppercase text-[10px] text-[#1E3A5F] font-bold block mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#1E3A5F]" />
                      <span>Chapters Discussing This Concept ({connectedChapters.length}):</span>
                    </span>
                    {connectedChapters.length > 0 ? (
                      <div className="space-y-1.5 font-serif">
                        {connectedChapters.map((ch) => (
                          <button
                            key={ch.id}
                            onClick={() => navigateToChapter(ch.slug)}
                            className="w-full text-left rtl:text-right text-[#1E3A5F] hover:underline flex items-center justify-between gap-2 cursor-pointer"
                          >
                            <span className="truncate">
                              Chapter {ch.chapterNumber}: {ch.title[language]}
                            </span>
                            <ArrowRight className="w-3 h-3 shrink-0 rtl:rotate-180" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[#878177] italic font-serif">Foundational across archive</span>
                    )}
                  </div>

                  {/* Connected Claims */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E6E1D6]">
                    <span className="font-sans uppercase text-[10px] text-[#9A3412] font-bold block mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#9A3412]" />
                      <span>Investigated Claims ({connectedClaims.length}):</span>
                    </span>
                    {connectedClaims.length > 0 ? (
                      <div className="space-y-1.5 font-serif">
                        {connectedClaims.map((clm) => (
                          <button
                            key={clm.id}
                            onClick={() => navigateToClaim(clm.id)}
                            className="w-full text-left rtl:text-right text-[#1E3A5F] hover:underline flex items-center justify-between gap-2 cursor-pointer"
                          >
                            <span className="truncate">{clm.statement[language]}</span>
                            <ArrowRight className="w-3 h-3 shrink-0 rtl:rotate-180" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[#878177] italic font-serif">No isolated claims</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
