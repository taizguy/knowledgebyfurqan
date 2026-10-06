import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { DataService } from '../../services/dataService';
import { EpistemicBadge } from './EpistemicBadge';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { isSearchOpen, setIsSearchOpen, navigate } = useNavigation();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = DataService.search(query, language, activeFilter);

  const filters = [
    { id: 'all', label: language === 'ur' ? 'تمام' : 'All' },
    { id: 'chapters', label: t.nav.chapters },
    { id: 'claims', label: language === 'ur' ? 'دعوے' : 'Claims' },
    { id: 'people', label: t.nav.people },
    { id: 'places', label: t.nav.places },
    { id: 'concepts', label: t.nav.concepts },
    { id: 'sources', label: t.nav.sources }
  ];

  const handleSelectResult = (path: string) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-stone-900/60 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-2xl bg-[#FBF9F5] border border-stone-300 shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[80vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        {/* Search Input Bar */}
        <div className="p-4 hairline-b flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.actions.searchPlaceholder}
            className="w-full bg-transparent text-sm md:text-base text-stone-900 focus:outline-hidden placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-800 ml-2 cursor-pointer font-medium"
          >
            {t.actions.close}
          </button>
        </div>

        {/* Filter Segmented Bar */}
        <div className="flex items-center gap-1 px-4 py-2 bg-stone-100/70 hairline-b overflow-x-auto text-xs">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1 font-medium transition-colors whitespace-nowrap cursor-pointer rounded-xs ${
                activeFilter === f.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results Stream */}
        <div className="p-4 overflow-y-auto divide-y divide-stone-200/60 space-y-2">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-xs text-stone-500">
              <p className="font-serif text-sm text-stone-700 mb-1">
                {language === 'ur'
                  ? 'چالیس ہزار سالہ انسانی علم کے محفوظ ذخیرے میں تلاش کیجیے'
                  : 'Search across 40,000 years of curated artifacts, texts, and claims'}
              </p>
              <p>Try searching: "Chauvet", "Göbekli", "Berossus", "Cuneiform", "Uruk", "علامتی شعور"</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center text-xs text-stone-500">
              <p className="font-serif text-stone-700 text-sm">
                {language === 'ur' ? 'کوئی نتیجہ نہیں ملا' : 'No records found matching query'}
              </p>
              <p className="mt-1">Try relaxing filters or searching in English/Urdu.</p>
            </div>
          ) : (
            results.map((res) => (
              <div
                key={`${res.type}-${res.id}`}
                onClick={() => handleSelectResult(res.path)}
                className="pt-2 pb-2 px-2 hover:bg-stone-100/80 transition-colors cursor-pointer rounded-sm group flex items-baseline justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-widest font-sans text-stone-500 font-semibold">
                      {res.type}
                    </span>
                    {res.epistemicStatus && (
                      <EpistemicBadge status={res.epistemicStatus} />
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-stone-900 group-hover:text-stone-700 truncate">
                    {res.title}
                  </h4>
                  {res.subtitle && (
                    <p className="text-xs text-stone-600 line-clamp-1 mt-0.5 font-serif">
                      {res.subtitle}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-800 shrink-0 rtl:rotate-180" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
