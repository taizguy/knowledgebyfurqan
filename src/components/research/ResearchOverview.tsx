import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ResearchWorkspaceStats } from '../../types/entities';
import {
  Layers,
  FileCheck,
  Clock,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Database,
  RotateCcw
} from 'lucide-react';

interface ResearchOverviewProps {
  stats: ResearchWorkspaceStats;
  onSelectStatusFilter: (status: string) => void;
  onOpenNewClaimModal: () => void;
  onSelectTab: (tab: 'projects' | 'register' | 'workbench' | 'sources') => void;
  onResetSession: () => void;
}

export const ResearchOverview: React.FC<ResearchOverviewProps> = ({
  stats,
  onSelectStatusFilter,
  onOpenNewClaimModal,
  onSelectTab,
  onResetSession
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const statCards = [
    {
      id: 'all',
      title: isUrdu ? 'کل تحقیقی دعوے' : 'Total Registered Claims',
      count: stats.totalClaims,
      subtitle: isUrdu ? 'آرکائیو میں درج تمام بیانات' : 'Total cataloged propositions',
      icon: Database,
      accent: 'border-[#1E3A5F]/40 bg-[#1E3A5F]/5 text-[#1E3A5F]',
      badgeBg: 'bg-[#1E3A5F] text-white',
      filterKey: 'all'
    },
    {
      id: 'unreviewed',
      title: isUrdu ? 'جائزہ کے منتظر' : 'Awaiting Review',
      count: stats.unreviewedClaims,
      subtitle: isUrdu ? 'ابتدائی اندراج، جانچ باقی ہے' : 'Initial ingestion pending audit',
      icon: Clock,
      accent: 'border-stone-300 bg-stone-50 text-stone-700',
      badgeBg: 'bg-stone-700 text-white',
      filterKey: 'unreviewed'
    },
    {
      id: 'with_evidence',
      title: isUrdu ? 'مربوط شواہد والے' : 'Claims with Evidence',
      count: stats.claimsWithEvidence,
      subtitle: isUrdu ? 'بنیادی آثار یا سائنسی مقالات' : 'Primary artifacts or monographs attached',
      icon: FileCheck,
      accent: 'border-emerald-600/30 bg-emerald-50/40 text-emerald-800',
      badgeBg: 'bg-emerald-700 text-white',
      filterKey: 'has_sources'
    },
    {
      id: 'open_question',
      title: isUrdu ? 'کھلے سوالات' : 'Unresolved Questions',
      count: stats.openQuestions,
      subtitle: isUrdu ? 'سائنسی مشاہدے سے ماورا' : 'Beyond empirical measurement',
      icon: HelpCircle,
      accent: 'border-purple-300 bg-purple-50/40 text-purple-800',
      badgeBg: 'bg-purple-700 text-white',
      filterKey: 'open_question'
    },
    {
      id: 'disputed',
      title: isUrdu ? 'متنازعہ دعوے' : 'Disputed Claims',
      count: stats.disputedClaims,
      subtitle: isUrdu ? 'ماہرین میں متضاد شواہد' : 'Conflicting scholarly positions',
      icon: AlertTriangle,
      accent: 'border-rose-300 bg-rose-50/40 text-rose-800',
      badgeBg: 'bg-rose-700 text-white',
      filterKey: 'disputed'
    },
    {
      id: 'verified',
      title: isUrdu ? 'مصدقہ / اشاعت کیلئے تیار' : 'Verified & Publication Ready',
      count: stats.verifiedClaims,
      subtitle: isUrdu ? 'مادی و سائنسی تجربات سے ثابت' : 'Empirically authenticated consensus',
      icon: CheckCircle2,
      accent: 'border-[#1E3A5F]/40 bg-[#1E3A5F]/10 text-[#1E3A5F]',
      badgeBg: 'bg-[#1E3A5F] text-white',
      filterKey: 'verified'
    },
    {
      id: 'source_reported',
      title: isUrdu ? 'ماخذ میں مذکور (غیر مصدقہ)' : 'Source Reported (Unverified)',
      count: stats.sourceReportedClaims,
      subtitle: isUrdu ? 'صرف کتبات یا مصنف کا بیان' : 'Attested in text, lacking empirical proof',
      icon: ShieldAlert,
      accent: 'border-amber-300 bg-amber-50/50 text-amber-900',
      badgeBg: 'bg-amber-600 text-white',
      filterKey: 'source_reported'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Workspace Charter */}
      <div className="bg-white border border-[#E6E1D6] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F0ECE3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#878177] mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{isUrdu ? 'ادارتی و سائنسی تحقیقاتی نظام' : 'Archival Epistemic Workspace · Realtime Ingestion'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918]">
              {isUrdu ? 'تحقیقاتی جائزہ اور علمیاتی پیش رفت' : 'Archival Investigation Dashboard'}
            </h2>
            <p className="mt-2 text-sm font-serif text-[#5C5751] max-w-3xl leading-relaxed">
              {isUrdu
                ? 'ویڈیو لیکچرز اور قدیم متون کو خام معلومات سے نکال کر دس رکنی سائنسی پیمانوں کے تحت جانچیے۔ ہر دعوے کے ساتھ بنیادی نوادرات اور آزاد سائنسی مقالات منسلک کیجیے۔'
                : 'The research workspace is the editorial engine transforming raw audio-visual and textual source material into rigorously verified public research dossiers. All metrics are computed dynamically from active archival data.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenNewClaimModal}
              className="px-4 py-2 bg-[#1A1918] hover:bg-[#2D2A26] text-white text-xs font-sans uppercase tracking-wider font-semibold cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8934A]" />
              <span>{isUrdu ? 'نیا دعویٰ شامل کریں' : '+ Extract New Claim'}</span>
            </button>
            <button
              onClick={() => onSelectTab('projects')}
              className="px-3.5 py-2 border border-[#E6E1D6] hover:border-[#1A1918] bg-white text-xs font-sans font-medium text-[#1A1918] cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#1E3A5F]" />
              <span>{isUrdu ? 'ابواب و پروجیکٹس' : 'View Projects'}</span>
            </button>
            <button
              onClick={onResetSession}
              title={isUrdu ? 'ڈیفالٹ آرکائیو پر بحال کریں' : 'Reset session cache to archive defaults'}
              className="p-2 border border-[#E6E1D6] hover:border-stone-400 bg-white text-[#878177] hover:text-[#1A1918] cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Epistemic Demarcation Principle Banner */}
        <div className="mt-6 p-4 bg-amber-50/70 border border-amber-200/80 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-900 rounded-xs shrink-0 mt-0.5 sm:mt-0">
              <ShieldAlert className="w-4 h-4 text-amber-800" />
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider text-amber-950 font-sans block sm:inline mr-2">
                {isUrdu ? 'بنیادی ادارتی قانون:' : 'Cardinal Archival Principle:'}
              </span>
              <span className="font-serif italic text-amber-900">
                {isUrdu
                  ? '’’ماخذ میں مذکور‘‘ ہونے کا مطلب سائنسی یا تاریخی تصدیق ہرگز نہیں ہے۔ کسی بھی تشریح یا دیومالائی دعوے کو آزاد مادی شواہد کے بغیر مصدقہ حقیقت قرار نہیں دیا جا سکتا۔'
                  : 'Never conflate source attestation with empirical fact. A statement reported in source material remains unverified until independent primary artifacts or scientific consensus corroborate it.'}
              </span>
            </div>
          </div>
          <span className="font-mono text-[11px] text-amber-800 shrink-0 font-medium px-2 py-0.5 bg-amber-200/50 rounded-xs">
            10-Tier Epistemic Standard
          </span>
        </div>
      </div>

      {/* Realtime Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => {
                onSelectStatusFilter(card.filterKey);
                onSelectTab('register');
              }}
              className={`p-5 bg-white border text-left rtl:text-right transition-all cursor-pointer hover:shadow-md flex flex-col justify-between group ${card.accent}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xs bg-white/80 border border-stone-200/60 shadow-2xs">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-xs ${card.badgeBg}`}>
                    {card.count}
                  </span>
                </div>
                <h3 className="font-serif font-medium text-base text-[#1A1918] group-hover:text-[#1E3A5F] transition-colors">
                  {card.title}
                </h3>
                <p className="mt-1 text-xs font-serif text-[#5C5751] line-clamp-2">
                  {card.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/50 flex items-center justify-between text-[11px] font-sans font-medium text-[#1E3A5F]">
                <span>{isUrdu ? 'رجسٹر میں دیکھیے' : 'Filter Register'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
