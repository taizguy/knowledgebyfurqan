import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { DataService } from '../services/dataService';
import { Layers, FileText, Scroll, Calendar, ArrowRight, Quote as QuoteIcon } from 'lucide-react';

export const PeoplePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { route, navigateToClaim, navigateToChapter, navigate } = useNavigation();
  const people = DataService.getPeople();

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
          Biographical &amp; Scribal Corpus
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#1A1918] tracking-tight mt-1">
          {language === 'ur' ? 'شخصیات: محققین، کاہن اور مؤرخین' : 'People: Scholars, Authors & Epigraphers'}
        </h1>
        <p className="mt-3 text-base font-serif text-[#5C5751] max-w-2xl leading-relaxed">
          {language === 'ur'
            ? 'قدیم دنیا کے پہلے دستخط شدہ مصنفین سے لے کر جدید آثار قدیمہ اور علمی تحقیق کے بانیوں تک کا سوانحی ریکارڈ۔ معلوم کیجیے کہ یہ شخصیات آرکائیو میں کہاں کہاں ظاہر ہوتی ہیں۔'
            : 'Explore foundational figures in the preservation, decipherment, and historiography of deep-time knowledge, from Enheduanna of Ur to modern field researchers. Track where each figure appears across the entire archive.'}
        </p>
      </div>

      <div className="space-y-8">
        {people.map((person) => {
          const civ = person.civilizationIds[0] ? DataService.getCivilizationByIdOrSlug(person.civilizationIds[0]) : null;
          const claims = DataService.getClaimsByPerson(person.id);
          const chapters = DataService.getChaptersByPerson(person.id);
          const texts = DataService.getTextsByPerson(person.id);
          const events = DataService.getEventsByPerson(person.id);
          const quotes = DataService.getQuotesByAuthor(person.id);
          const isTarget = highlightedId === person.id;

          return (
            <div
              key={person.id}
              id={person.id}
              className={`bg-white border p-6 sm:p-8 shadow-2xs transition-all ${
                isTarget ? 'border-[#1E3A5F] ring-2 ring-[#1E3A5F]/20' : 'border-[#E6E1D6] hover:border-[#878177]'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#878177] font-sans mb-3">
                <span className="font-mono font-medium text-[#1A1918]">{person.eraOrLifespan}</span>
                {civ && <span>{civ.name[language]}</span>}
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] mb-1">
                {person.name[language]}
              </h2>

              <p className="text-xs font-sans uppercase tracking-wider text-[#B8934A] mb-4 font-semibold">
                {person.role[language]}
              </p>

              <p className="text-base font-serif text-[#2D2A26] leading-relaxed mb-6">
                {person.biography[language]}
              </p>

              {/* Verbatim Quote by Person if attested */}
              {quotes.length > 0 && (
                <div className="mb-6 p-4 bg-[#FAF8F5] border border-amber-200/60 text-xs font-serif">
                  <div className="flex items-center gap-1.5 text-amber-900 font-sans uppercase text-[10px] font-bold mb-1">
                    <QuoteIcon className="w-3.5 h-3.5" />
                    <span>Inscribed Voice:</span>
                  </div>
                  {quotes.map((q) => (
                    <div key={q.id}>
                      {q.originalLanguageText && (
                        <p className="font-mono text-[11px] text-stone-600 mb-1">
                          "{q.originalLanguageText}" ({q.originalLanguageName})
                        </p>
                      )}
                      <p className="font-medium text-[#1A1918] italic">
                        "{q.passage[language]}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Comprehensive Cross-Archive Relationships */}
              <div className="pt-6 border-t border-[#F0ECE3] space-y-4">
                <span className="text-xs uppercase tracking-wider text-[#878177] font-sans block font-semibold">
                  {language === 'ur' ? 'آرکائیو میں سوانحی و علمی ربط:' : 'Where this Person Appears in the Archive:'}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Linked Chapters */}
                  {chapters.length > 0 && (
                    <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
                      <span className="font-sans uppercase text-[10px] text-[#878177] font-bold block mb-1.5 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-[#1E3A5F]" />
                        <span>Discussed in Chapters ({chapters.length}):</span>
                      </span>
                      <div className="space-y-1">
                        {chapters.map((ch) => (
                          <button
                            key={ch.id}
                            onClick={() => navigateToChapter(ch.slug)}
                            className="w-full text-left rtl:text-right font-serif text-[#1E3A5F] hover:underline truncate block cursor-pointer"
                          >
                            Chapter {ch.chapterNumber}: {ch.title[language]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Linked Texts */}
                  {texts.length > 0 && (
                    <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
                      <span className="font-sans uppercase text-[10px] text-[#878177] font-bold block mb-1.5 flex items-center gap-1">
                        <Scroll className="w-3 h-3 text-[#B8934A]" />
                        <span>Penned or Canonical Texts ({texts.length}):</span>
                      </span>
                      <div className="space-y-1">
                        {texts.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => navigate(`/${language}/sources?text=${t.id}`)}
                            className="w-full text-left rtl:text-right font-serif text-[#1E3A5F] hover:underline truncate block cursor-pointer"
                          >
                            {t.title[language]} ({t.approximateDate})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Linked Historical Events */}
                  {events.length > 0 && (
                    <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
                      <span className="font-sans uppercase text-[10px] text-[#878177] font-bold block mb-1.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#0F766E]" />
                        <span>Associated Chronicle Events ({events.length}):</span>
                      </span>
                      <div className="space-y-1 font-serif text-[#2D2A26]">
                        {events.map((e) => (
                          <div key={e.id} className="truncate">
                            · {e.title[language]} ({e.approximateDate})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Associated Research Claims */}
                  {claims.length > 0 && (
                    <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
                      <span className="font-sans uppercase text-[10px] text-[#878177] font-bold block mb-1.5 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#9A3412]" />
                        <span>Associated Research Claims ({claims.length}):</span>
                      </span>
                      <div className="space-y-1">
                        {claims.map((clm) => (
                          <button
                            key={clm.id}
                            onClick={() => navigateToClaim(clm.id)}
                            className="w-full text-left rtl:text-right font-serif text-[#1E3A5F] hover:underline truncate block cursor-pointer"
                          >
                            {clm.statement[language]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
