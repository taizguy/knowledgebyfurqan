import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { Search, Globe, Menu, X, ChevronDown, BookOpen, Compass, Layers, Clock, Library, Users, MapPin, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { route, navigate, setIsSearchOpen } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);

  // Primary navigation strictly adhering to user's specification:
  // Home · Collections · Knowledge Atlas · Research · Timeline · Sources · Search
  const primaryNav = [
    { key: 'home', label: t.nav.home, path: `/${language}` },
    { key: 'collections', label: t.nav.collections, path: `/${language}/collections` },
    { key: 'atlas', label: t.nav.atlas, path: `/${language}/atlas` },
    { key: 'research', label: t.nav.research, path: `/${language}/research` },
    { key: 'timeline', label: t.nav.timeline, path: `/${language}/timeline` },
    { key: 'sources', label: t.nav.sources, path: `/${language}/sources` },
  ];

  // Secondary catalog directory: People, Places, Concepts, About
  const secondaryDirectory = [
    { key: 'people', label: t.nav.people, path: `/${language}/people`, icon: Users },
    { key: 'places', label: t.nav.places, path: `/${language}/places`, icon: MapPin },
    { key: 'concepts', label: t.nav.concepts, path: `/${language}/concepts`, icon: Sparkles },
    { key: 'about', label: t.nav.about, path: `/${language}/about`, icon: BookOpen },
  ];

  const isCurrentActive = (key: string) => {
    if (key === 'home') return route.section === 'home';
    if (key === 'collections') return route.section === 'collections';
    if (key === 'atlas') return route.section === 'atlas';
    if (key === 'research') return route.section === 'research';
    if (key === 'timeline') return route.section === 'timeline';
    if (key === 'sources') return route.section === 'sources';
    return route.section === key;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/96 backdrop-blur-xs hairline-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text element wordmark in display serif */}
          <div className="flex items-center">
            <button
              onClick={() => navigate(`/${language}`)}
              className="text-lg md:text-xl font-serif font-medium tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap cursor-pointer text-left rtl:text-right"
            >
              {language === 'ur' ? 'چالیس ہزار سالہ علم' : '40,000 Years of Knowledge'}
            </button>
          </div>

          {/* Zone 2: Primary navigation links (Home, Collections, Atlas, Research, Timeline, Sources, Corpus dropdown) */}
          <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse text-xs font-sans font-medium tracking-wide uppercase text-stone-600">
            {primaryNav.map((link) => (
              <button
                key={link.key}
                onClick={() => navigate(link.path)}
                className={`py-1 transition-colors whitespace-nowrap cursor-pointer relative ${
                  isCurrentActive(link.key)
                    ? 'text-stone-950 font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.label}
                {isCurrentActive(link.key) && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1E3A5F]" />
                )}
              </button>
            ))}

            {/* Secondary Catalog Index Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}
                className="flex items-center gap-1 py-1 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                aria-expanded={catalogDropdownOpen}
              >
                <span>{language === 'ur' ? 'فہرست کتب خانہ' : 'Corpus Index'}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {catalogDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCatalogDropdownOpen(false)}
                  />
                  <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-3 w-52 bg-white border border-stone-200 shadow-lg py-2 z-20 font-sans normal-case text-xs">
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-stone-400 font-semibold border-b border-stone-100">
                      {language === 'ur' ? 'علمی ادارے' : 'Relational Entities'}
                    </div>
                    {secondaryDirectory.map((sec) => {
                      const IconComponent = sec.icon;
                      return (
                        <button
                          key={sec.key}
                          onClick={() => {
                            navigate(sec.path);
                            setCatalogDropdownOpen(false);
                          }}
                          className="w-full text-left rtl:text-right px-3 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <IconComponent className="w-3.5 h-3.5 text-stone-400" />
                          <span>{sec.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary Actions (Search & Bilingual Switcher) */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label={t.nav.search}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-sans"
              title={t.nav.search}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline uppercase tracking-wider">{t.nav.search}</span>
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium tracking-wide text-stone-800 hover:text-stone-950 hover:bg-stone-200/60 border border-stone-300 rounded-xs transition-colors cursor-pointer whitespace-nowrap"
              title={language === 'en' ? 'Switch to Urdu (اردو)' : 'انگریزی میں تبدیل کریں'}
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span>{language === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden hairline-t bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-stone-400 font-sans font-semibold px-3 py-1">
            Primary Navigation
          </div>
          {primaryNav.map((link) => (
            <button
              key={link.key}
              onClick={() => {
                navigate(link.path);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left rtl:text-right py-2 px-3 text-sm font-medium rounded-xs transition-colors ${
                isCurrentActive(link.key)
                  ? 'bg-stone-200/70 text-stone-950 font-semibold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 hairline-t mt-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-400 font-sans font-semibold px-3 py-1">
              {language === 'ur' ? 'علمی ادارے اور کیٹلاگ' : 'Catalog Entities'}
            </div>
            {secondaryDirectory.map((sec) => (
              <button
                key={sec.key}
                onClick={() => {
                  navigate(sec.path);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left rtl:text-right py-1.5 px-3 text-xs text-stone-600 hover:bg-stone-100 rounded-xs"
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
