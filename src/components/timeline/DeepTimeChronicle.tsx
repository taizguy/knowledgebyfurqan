import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { DataService } from '../../services/dataService';
import { EpistemicBadge } from '../common/EpistemicBadge';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

export const DeepTimeChronicle: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigateToChapter, navigate } = useNavigation();

  const [activeEpoch, setActiveEpoch] = useState<string>('all');
  const events = DataService.getTimelineEvents(activeEpoch);

  const epochs = [
    { id: 'all', label: language === 'ur' ? 'تمام ادوار' : 'All Horizons' },
    { id: 'paleolithic', label: language === 'ur' ? 'قدیم سنگی دور (۴۰,۰۰۰ سال قبل)' : 'Paleolithic (40,000 BP)' },
    { id: 'neolithic', label: language === 'ur' ? 'نو سنگی دور (۹,۶۰۰ قبل مسیح)' : 'Neolithic (c. 9,600 BCE)' },
    { id: 'bronze_age', label: language === 'ur' ? 'کانسی کا دور (۳,۴۰۰ قبل مسیح)' : 'Bronze Age (c. 3,400 BCE)' },
    { id: 'classical', label: language === 'ur' ? 'کلاسیکی دور (۲۸۰ قبل مسیح)' : 'Classical Antiquity' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="border-b border-[#E6E1D6] pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#878177] mb-2">
          <Clock className="w-4 h-4 text-[#1E3A5F]" />
          <span>{language === 'ur' ? 'عمیق وقت کا خط زمانی' : 'Deep Time Historiographical Rail'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-[#1A1918] tracking-tight">
          {t.nav.timeline}
        </h1>
        <p className="mt-2 text-base font-serif text-[#5C5751] max-w-2xl leading-relaxed">
          {language === 'ur'
            ? 'چالیس ہزار سال قبل غاروں کے اولین سرخ نشانات سے لے کر تحریر اور سائنسی جانچ پڑتال کے ارتقاء تک کے بنیادی تاریخی موڑ۔'
            : 'Explore key chronometric thresholds from 40,000 BP cave mark-making to cuneiform literacy, annotated with verified dating methodologies.'}
        </p>
      </div>

      {/* Epoch Filter Bar */}
      <div className="flex items-center gap-2 border-b border-[#E6E1D6] pb-3 mb-10 overflow-x-auto text-xs font-sans">
        {epochs.map((ep) => (
          <button
            key={ep.id}
            onClick={() => setActiveEpoch(ep.id)}
            className={`px-3.5 py-1.5 font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer rounded-xs ${
              activeEpoch === ep.id
                ? 'bg-[#1A1918] text-white shadow-xs'
                : 'text-[#5C5751] hover:text-[#1A1918] hover:bg-[#F5F1EA]'
            }`}
          >
            {ep.label}
          </button>
        ))}
      </div>

      {/* Chronological Timeline Stream */}
      <div className="relative border-l rtl:border-l-0 rtl:border-r border-[#E6E1D6] ml-4 rtl:ml-0 rtl:mr-4 pl-6 rtl:pl-0 rtl:pr-6 space-y-10">
        {events.map((ev) => {
          const place = DataService.getPlaceByIdOrSlug(ev.placeId);
          const civ = DataService.getCivilizationByIdOrSlug(ev.civilizationId);
          const chapter = ev.chapterId ? DataService.getChapterByIdOrSlug(ev.chapterId) : null;

          return (
            <div key={ev.id} className="relative group">
              {/* Node Marker on vertical axis */}
              <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-2 w-3.5 h-3.5 rounded-full bg-[#FAF8F5] border-2 border-[#1E3A5F] group-hover:bg-[#1E3A5F] transition-colors" />

              <div className="bg-white border border-[#E6E1D6] p-6 shadow-2xs hover:border-[#878177] transition-all">
                {/* Epoch Date & Epistemic Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-semibold text-[#1A1918] tracking-wide">
                    {ev.yearDisplay[language]}
                  </span>
                  <EpistemicBadge status={ev.epistemicStatus} />
                </div>

                <h3 className="text-xl font-serif font-medium text-[#1A1918] mb-2 leading-snug">
                  {ev.title[language]}
                </h3>

                <p className="text-sm font-serif text-[#2D2A26] leading-relaxed mb-4">
                  {ev.summary[language]}
                </p>

                {/* Relational Anchors */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#878177] pt-3 border-t border-[#F0ECE3]">
                  {place && (
                    <span className="flex items-center gap-1 font-serif text-[#5C5751]">
                      <MapPin className="w-3.5 h-3.5 text-[#878177]" />
                      <span>{place.name[language]}</span>
                    </span>
                  )}
                  {civ && (
                    <span className="font-serif text-[#5C5751]">
                      {civ.name[language]}
                    </span>
                  )}
                </div>

                {/* Read Chapter Link if attached */}
                {chapter && (
                  <div className="mt-4 pt-3 border-t border-[#F0ECE3] flex items-center justify-end">
                    <button
                      onClick={() => navigateToChapter(chapter.slug)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1E3A5F] hover:text-[#1A1918] transition-colors cursor-pointer"
                    >
                      <span>{language === 'ur' ? 'متعلقہ باب پڑھیں' : 'Read Associated Chapter'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
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
