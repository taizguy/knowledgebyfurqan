import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { DataService } from '../services/dataService';
import { Claim, EpistemicStatus, ResearchProjectSummary } from '../types/entities';
import { ResearchOverview } from '../components/research/ResearchOverview';
import { ResearchProjects } from '../components/research/ResearchProjects';
import { ClaimRegister } from '../components/research/ClaimRegister';
import { ClaimWorkbench } from '../components/research/ClaimWorkbench';
import { NewClaimModal } from '../components/research/NewClaimModal';
import { DossierExportModal } from '../components/research/DossierExportModal';
import {
  Layers,
  Sparkles,
  BookOpen,
  Filter,
  BarChart3,
  Clock,
  ShieldAlert,
  ArrowRight,
  Database,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export const ResearchPage: React.FC = () => {
  const { language } = useLanguage();
  const { route, navigate } = useNavigation();
  const isUrdu = language === 'ur';

  // Workspace View Tabs: 'overview' | 'projects' | 'register'
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'overview' | 'projects' | 'register'>('overview');

  // Active investigation workbench target
  const [workbenchClaim, setWorkbenchClaim] = useState<Claim | null>(null);

  // Modals state
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [exportProjectTarget, setExportProjectTarget] = useState<ResearchProjectSummary | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Active filters for Register
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [chapterFilter, setChapterFilter] = useState<string>('all');

  // Trigger re-render on data persistence
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const handleDataUpdate = () => {
      setDataVersion((v) => v + 1);
    };
    window.addEventListener('archive-claims-updated', handleDataUpdate);
    window.addEventListener('archive-sources-updated', handleDataUpdate);
    return () => {
      window.removeEventListener('archive-claims-updated', handleDataUpdate);
      window.removeEventListener('archive-sources-updated', handleDataUpdate);
    };
  }, []);

  // Parse URL parameters e.g. ?claim=... or ?chapter=... or ?status=...
  useEffect(() => {
    if (route.query) {
      if (route.query.claim) {
        const found = DataService.getClaimByIdOrSlug(route.query.claim);
        if (found) {
          setWorkbenchClaim(found);
        }
      }
      if (route.query.chapter) {
        setChapterFilter(route.query.chapter);
        setActiveWorkspaceTab('register');
      }
      if (route.query.status) {
        setStatusFilter(route.query.status);
        setActiveWorkspaceTab('register');
      }
      if (route.query.tab && ['overview', 'projects', 'register'].includes(route.query.tab)) {
        setActiveWorkspaceTab(route.query.tab as any);
      }
    }
  }, [route.query, dataVersion]);

  // Dynamic Application Data
  const stats = useMemo(() => DataService.getResearchOverviewStats(), [dataVersion]);
  const projects = useMemo(() => DataService.getResearchProjects(), [dataVersion]);
  const allClaims = useMemo(() => DataService.getClaims(), [dataVersion]);

  const handleClaimUpdated = (updatedClaim: Claim) => {
    setWorkbenchClaim(updatedClaim);
  };

  const handleConfirmReset = () => {
    DataService.resetArchivalDefaults();
    setWorkbenchClaim(null);
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Title & Breadcrumbs */}
      <div className="border-b border-[#E6E1D6] pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#878177]">
            <Compass className="w-4 h-4 text-[#1E3A5F]" />
            <span>{isUrdu ? 'علمیاتی ادارتی کارگاہ' : 'Research Workspace & Epistemic Matrix'}</span>
          </div>

          <span className="font-mono text-xs px-2.5 py-1 bg-[#1E3A5F]/10 text-[#1E3A5F] border border-[#1E3A5F]/20 rounded-xs">
            10-Tier Epistemic Demarcation Engine
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#1A1918] tracking-tight">
          {isUrdu ? 'تحقیقاتی کارگاہ اور ثبوتی جائزہ' : 'Research Workspace'}
        </h1>
        <p className="mt-3 text-base font-serif text-[#5C5751] max-w-3xl leading-relaxed">
          {isUrdu
            ? 'خام ویڈیو مواد اور تاریخی متون کو باقاعدہ شواہد میں تبدیل کرنے کا پیشہ ورانہ تحقیقی ماحول۔ ہر دعوے کو اس کے مادی ثبوت، اختلافی آراء اور آزاد سائنسی اتفاق کے ساتھ الگ کیجیے۔'
            : 'The core editorial research environment transforming video lectures and ancient texts into structured, evidence-based knowledge dossiers. Extract claims, attach primary artifacts, record disagreements, and prepare verified material for publication.'}
        </p>

        {/* Workspace Primary Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto text-xs font-sans">
          <button
            onClick={() => setActiveWorkspaceTab('overview')}
            className={`px-4 py-2 font-medium tracking-wide transition-colors cursor-pointer rounded-xs flex items-center gap-2 ${
              activeWorkspaceTab === 'overview'
                ? 'bg-[#1A1918] text-white shadow-xs'
                : 'bg-white border border-[#E6E1D6] text-[#5C5751] hover:text-[#1A1918]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'تحقیقاتی جائزہ (Overview)' : '1. Research Overview'}</span>
          </button>

          <button
            onClick={() => setActiveWorkspaceTab('projects')}
            className={`px-4 py-2 font-medium tracking-wide transition-colors cursor-pointer rounded-xs flex items-center gap-2 ${
              activeWorkspaceTab === 'projects'
                ? 'bg-[#1A1918] text-white shadow-xs'
                : 'bg-white border border-[#E6E1D6] text-[#5C5751] hover:text-[#1A1918]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'تحقیقی منصوبے (Projects)' : `2. Research Projects (${projects.length})`}</span>
          </button>

          <button
            onClick={() => setActiveWorkspaceTab('register')}
            className={`px-4 py-2 font-medium tracking-wide transition-colors cursor-pointer rounded-xs flex items-center gap-2 ${
              activeWorkspaceTab === 'register'
                ? 'bg-[#1A1918] text-white shadow-xs'
                : 'bg-white border border-[#E6E1D6] text-[#5C5751] hover:text-[#1A1918]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'دعووں کا رجسٹر (Claim Register)' : `3. Claim Register (${allClaims.length})`}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: RESEARCH OVERVIEW */}
      {activeWorkspaceTab === 'overview' && (
        <ResearchOverview
          stats={stats}
          onSelectStatusFilter={(st) => {
            setStatusFilter(st);
            setActiveWorkspaceTab('register');
          }}
          onOpenNewClaimModal={() => setIsNewClaimModalOpen(true)}
          onSelectTab={(tab) => {
            if (tab === 'projects') setActiveWorkspaceTab('projects');
            else if (tab === 'register') setActiveWorkspaceTab('register');
          }}
          onResetSession={() => setIsResetConfirmOpen(true)}
        />
      )}

      {/* VIEW 2: RESEARCH PROJECTS */}
      {activeWorkspaceTab === 'projects' && (
        <ResearchProjects
          projects={projects}
          onSelectChapterFilter={(chapId) => {
            setChapterFilter(chapId);
            setActiveWorkspaceTab('register');
          }}
          onExportChapterDossier={(project) => {
            setExportProjectTarget(project);
          }}
        />
      )}

      {/* VIEW 3: CLAIM REGISTER */}
      {activeWorkspaceTab === 'register' && (
        <ClaimRegister
          claims={allClaims}
          selectedClaimId={workbenchClaim?.id}
          initialChapterFilter={chapterFilter}
          initialStatusFilter={statusFilter}
          onSelectClaim={(clm) => setWorkbenchClaim(clm)}
          onOpenNewClaimModal={() => setIsNewClaimModalOpen(true)}
        />
      )}

      {/* CLAIM WORKBENCH DRAWER / MODAL */}
      {workbenchClaim && (
        <ClaimWorkbench
          claim={workbenchClaim}
          allClaims={allClaims}
          onClose={() => setWorkbenchClaim(null)}
          onClaimUpdated={handleClaimUpdated}
          onNavigateClaim={(clm) => setWorkbenchClaim(clm)}
        />
      )}

      {/* NEW CLAIM EXTRACTION MODAL */}
      {isNewClaimModalOpen && (
        <NewClaimModal
          onClose={() => setIsNewClaimModalOpen(false)}
          defaultChapterId={chapterFilter !== 'all' ? chapterFilter : undefined}
          onClaimCreated={(newClaim) => {
            setIsNewClaimModalOpen(false);
            setWorkbenchClaim(newClaim);
          }}
        />
      )}

      {/* CHAPTER DOSSIER EXPORT MODAL */}
      {exportProjectTarget && (
        <DossierExportModal
          chapter={DataService.getChapterByIdOrSlug(exportProjectTarget.chapterId)}
          onClose={() => setExportProjectTarget(null)}
        />
      )}

      {/* RESET CONFIRMATION MODAL */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E6E1D6] max-w-md w-full p-6 shadow-2xl rounded-xs space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#1A1918]">
              {isUrdu ? 'آرکائیو ترامیم بحال کریں؟' : 'Reset Archival Baseline?'}
            </h3>
            <p className="text-xs font-serif text-[#5C5751] leading-relaxed">
              {isUrdu
                ? 'کیا آپ واقعی سیشن کے تمام تدوین شدہ دعووں، نئے شامل کردہ شواہد اور ترامیم کو اصل بنیادی آرکائیو پر بحال کرنا چاہتے ہیں؟'
                : 'This will reset all session modifications, new claims, and attached sources back to the pristine archival baseline defaults.'}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-1.5 border border-[#E6E1D6] text-xs font-sans text-[#5C5751] hover:text-[#1A1918] rounded-xs cursor-pointer"
              >
                {isUrdu ? 'منسوخ' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-3.5 py-1.5 bg-[#8B261E] hover:bg-[#721F18] text-white text-xs font-sans font-medium rounded-xs cursor-pointer shadow-xs"
              >
                {isUrdu ? 'ہاں، بحال کریں' : 'Confirm Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
