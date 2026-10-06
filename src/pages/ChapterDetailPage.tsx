import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { DataService } from '../services/dataService';
import { ChapterReader } from '../components/reader/ChapterReader';

export const ChapterDetailPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { route, navigate } = useNavigation();

  const slug = route.param;
  const chapter = slug ? DataService.getChapterByIdOrSlug(slug) : null;

  if (!chapter) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">
          {language === 'ur' ? 'مطلوبہ باب دستیاب نہیں' : 'Chapter Not Found'}
        </h1>
        <p className="text-stone-600 font-serif mb-6">
          {language === 'ur'
            ? 'درخواست کردہ باب کا ربط درست نہیں ہے۔'
            : 'The chapter requested does not exist in the archival database.'}
        </p>
        <button
          onClick={() => navigate(`/${language}/chapters`)}
          className="px-4 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold rounded-xs cursor-pointer"
        >
          {t.labels.backToChapters}
        </button>
      </div>
    );
  }

  return <ChapterReader chapter={chapter} />;
};
