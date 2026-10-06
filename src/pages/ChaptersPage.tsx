import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { DataService } from '../services/dataService';
import { ArrowRight, Clock, Youtube } from 'lucide-react';

export const ChaptersPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigateToChapter } = useNavigation();
  const chapters = DataService.getChapters();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="border-b border-[#E6E1D6] pb-8 mb-10">
        <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
          Curated Monograph Corpus
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#1A1918] tracking-tight mt-1">
          {language === 'ur' ? 'چالیس ہزار سالہ علم: تمام ابواب' : '40,000 Years of Knowledge — Chapter Index'}
        </h1>
        <p className="mt-3 text-base font-serif text-[#5C5751] max-w-2xl leading-relaxed">
          {language === 'ur'
            ? 'فرقان قریشی ریسرچ آرکائیو کا بنیادی سلسلہ جو انسانی شعور کے ارتقاء، مادی آثار اور تنقیدی نظریہ علم کا باب وار احاطہ کرتا ہے۔'
            : 'Explore each foundational chapter in the series. Every monograph details primary stratigraphic and textual sources, separating verified historical evidence from secondary hypotheses.'}
        </p>
      </div>

      {/* Chapters List */}
      <div className="space-y-6">
        {chapters.map((ch) => {
          const media = ch.featuredMediaId ? DataService.getMediaById(ch.featuredMediaId) : null;
          return (
            <div
              key={ch.id}
              onClick={() => navigateToChapter(ch.slug)}
              className="bg-white border border-[#E6E1D6] p-6 sm:p-8 hover:border-[#1E3A5F] transition-all cursor-pointer group shadow-2xs"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Text Details */}
                <div className={media ? 'md:col-span-8' : 'md:col-span-12'}>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-sans mb-2">
                    <span className="font-bold text-white bg-[#1E3A5F] px-2 py-0.5 rounded-xs font-mono text-[11px]">
                      Chapter 0{ch.chapterNumber}
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
                        <span className="text-[10px] font-mono text-amber-900 bg-amber-50 border border-amber-200 px-1.5 py-0.2">
                          {ch.researchStatus}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] group-hover:text-[#1E3A5F] transition-colors leading-tight mb-2">
                    {ch.title[language]}
                  </h2>

                  <p className="text-sm font-serif italic text-[#5C5751] mb-3 leading-relaxed">
                    {ch.subtitle[language]}
                  </p>

                  <p className="text-sm font-serif text-[#2D2A26] line-clamp-3 leading-relaxed mb-4">
                    {ch.abstract[language]}
                  </p>

                  {ch.originalSourceTitle && (
                    <div className="text-[11px] font-sans text-[#878177] flex items-center gap-1.5 mb-3">
                      <Youtube className="w-3.5 h-3.5 text-red-600" />
                      <span>Original Video: {ch.originalSourceTitle}</span>
                      {ch.publicationDate && <span>({ch.publicationDate})</span>}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-[#1E3A5F] font-sans font-medium uppercase tracking-wider">
                    <span className="underline underline-offset-4">{t.actions.readChapter}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Thumbnail if present */}
                {media && (
                  <div className="md:col-span-4 hidden md:block">
                    <div className="overflow-hidden border border-[#E6E1D6] bg-[#F0ECE3] aspect-4/3">
                      <img
                        src={media.url}
                        alt={media.caption[language]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
