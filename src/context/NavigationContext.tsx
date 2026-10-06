import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export interface RouteState {
  section: string; // 'home' | 'collections' | 'chapters' | 'chapter-detail' | 'research' | 'atlas' | 'timeline' | 'people' | 'places' | 'concepts' | 'sources' | 'search' | 'about'
  param?: string; // slug or id
  query?: Record<string, string>;
}

interface NavigationContextType {
  route: RouteState;
  navigate: (path: string) => void;
  navigateToChapter: (slug: string) => void;
  navigateToClaim: (id: string) => void;
  navigateToEntity: (type: 'people' | 'places' | 'concepts' | 'sources', id: string) => void;
  navigateToTimeline: (eventId?: string) => void;
  navigateToAtlas: (entityId?: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Parse path to route state
  const parsePath = (path: string): RouteState => {
    const url = new URL(path, window.location.origin);
    const parts = url.pathname.split('/').filter(Boolean);
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Check language prefix
    if (parts.length > 0 && (parts[0] === 'en' || parts[0] === 'ur')) {
      const langInUrl = parts[0];
      if (langInUrl !== language) {
        setLanguage(langInUrl);
      }
      parts.shift(); // remove language code
    }

    if (parts.length === 0) {
      return { section: 'home', query: searchParams };
    }

    const first = parts[0];
    if (first === 'chapters') {
      if (parts[1]) {
        return { section: 'chapter-detail', param: parts[1], query: searchParams };
      }
      return { section: 'chapters', query: searchParams };
    }

    if (
      [
        'collections',
        'research',
        'atlas',
        'timeline',
        'people',
        'places',
        'concepts',
        'sources',
        'search',
        'about'
      ].includes(first)
    ) {
      return { section: first, param: parts[1], query: searchParams };
    }

    return { section: 'home', query: searchParams };
  };

  const [route, setRoute] = useState<RouteState>(() => parsePath(window.location.pathname + window.location.search));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parsePath(window.location.pathname + window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  const navigate = (path: string) => {
    // Ensure path has language prefix
    let target = path;
    if (!target.startsWith('/en') && !target.startsWith('/ur')) {
      target = `/${language}${target.startsWith('/') ? '' : '/'}${target}`;
    }
    window.history.pushState({}, '', target);
    setRoute(parsePath(target));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToChapter = (slug: string) => {
    navigate(`/${language}/chapters/${slug}`);
  };

  const navigateToClaim = (id: string) => {
    navigate(`/${language}/research?claim=${id}`);
  };

  const navigateToEntity = (type: 'people' | 'places' | 'concepts' | 'sources', id: string) => {
    navigate(`/${language}/${type}?id=${id}`);
  };

  const navigateToTimeline = (eventId?: string) => {
    if (eventId) {
      navigate(`/${language}/timeline?event=${eventId}`);
    } else {
      navigate(`/${language}/timeline`);
    }
  };

  const navigateToAtlas = (entityId?: string) => {
    if (entityId) {
      navigate(`/${language}/atlas?entity=${entityId}`);
    } else {
      navigate(`/${language}/atlas`);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        route,
        navigate,
        navigateToChapter,
        navigateToClaim,
        navigateToEntity,
        navigateToTimeline,
        navigateToAtlas,
        isSearchOpen,
        setIsSearchOpen
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
