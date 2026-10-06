import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';

import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ChaptersPage } from './pages/ChaptersPage';
import { ChapterDetailPage } from './pages/ChapterDetailPage';
import { ResearchPage } from './pages/ResearchPage';
import { KnowledgeAtlasPage } from './pages/KnowledgeAtlasPage';
import { TimelinePage } from './pages/TimelinePage';
import { PeoplePage } from './pages/PeoplePage';
import { PlacesPage } from './pages/PlacesPage';
import { ConceptsPage } from './pages/ConceptsPage';
import { SourcesPage } from './pages/SourcesPage';
import { AboutPage } from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { route } = useNavigation();

  const renderActivePage = () => {
    switch (route.section) {
      case 'home':
        return <HomePage />;
      case 'collections':
        return <CollectionsPage />;
      case 'chapters':
        return <ChaptersPage />;
      case 'chapter-detail':
        return <ChapterDetailPage />;
      case 'research':
        return <ResearchPage />;
      case 'atlas':
        return <KnowledgeAtlasPage />;
      case 'timeline':
        return <TimelinePage />;
      case 'people':
        return <PeoplePage />;
      case 'places':
        return <PlacesPage />;
      case 'concepts':
        return <ConceptsPage />;
      case 'sources':
        return <SourcesPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900">
      <Header />
      <main className="flex-1">
        {renderActivePage()}
      </main>
      <Footer />
      <SearchModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </LanguageProvider>
  );
}
