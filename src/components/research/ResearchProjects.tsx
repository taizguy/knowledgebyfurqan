import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { ResearchProjectSummary } from '../../types/entities';
import {
  BookOpen,
  Youtube,
  ExternalLink,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  Filter,
  Download,
  Share2
} from 'lucide-react';

interface ResearchProjectsProps {
  projects: ResearchProjectSummary[];
  onSelectChapterFilter: (chapterId: string) => void;
  onOpenWorkbenchWithClaimId?: (claimId: string) => void;
  onExportChapterDossier: (project: ResearchProjectSummary) => void;
}

export const ResearchProjects: React.FC<ResearchProjectsProps> = ({
  projects,
  onSelectChapterFilter,
  onExportChapterDossier
}) => {
  const { language } = useLanguage();
  const { navigateToChapter } = useNavigation();
  const isUrdu = language === 'ur';

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-[#E6E1D6] p-6 shadow-xs flex flex-col sm:flex-row items-baseline justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#878177] mb-1">
            <BookOpen className="w-4 h-4 text-[#1E3A5F]" />
            <span>{isUrdu ? 'تحقیقاتی منصوبے بلحاظ ابواب' : 'Chapter Research Projects'}</span>
          </div>
          <h2 className="text-2xl font-serif font-medium text-[#1A1918]">
            {isUrdu ? 'تخلیقی ماخذ اور ادواری تحقیقات' : 'Monographic Source Catalog & Investigation Pipeline'}
          </h2>
          <p className="mt-1 text-sm font-serif text-[#5C5751]">
            {isUrdu
              ? 'ہر باب ایک آزاد تحقیقی منصوبہ ہے جس میں ویڈیو لیکچر کے تمام بیانات کو نکال کر ان کی شواہد کے ساتھ جانچ کی جاتی ہے۔'
              : 'Each chapter represents a self-contained research project tracking claims extracted from audio-visual lectures and canonical texts.'}
          </p>
        </div>
        <span className="font-mono text-xs text-[#878177] px-3 py-1 bg-[#F5F1EA] border border-[#E6E1D6] rounded-xs">
          {projects.length} {isUrdu ? 'فعال منصوبے' : 'Active Projects'}
        </span>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => {
          const progressPercent = project.totalClaimsCount > 0
            ? Math.round((project.reviewedClaimsCount / project.totalClaimsCount) * 100)
            : 0;

          return (
            <div
              key={project.chapterId}
              className="bg-white border border-[#E6E1D6] hover:border-[#878177] transition-all p-6 sm:p-8 shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#F0ECE3]">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
                    <span className="px-2.5 py-0.5 bg-[#1E3A5F] text-white font-mono text-[11px] font-semibold rounded-xs">
                      {isUrdu ? `باب 0${project.chapterNumber}` : `CHAPTER 0${project.chapterNumber}`}
                    </span>
                    <span className="text-[#878177]">·</span>
                    <span className="font-serif italic text-[#5C5751]">
                      {project.collectionTitle[language]}
                    </span>
                    <span className="text-[#878177]">·</span>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/70 font-mono text-[11px] rounded-xs">
                      {project.editorialStatus}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1A1918]">
                    {project.title[language]}
                  </h3>

                  {/* Source Metadata Banner */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#5C5751] font-sans pt-1">
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <Youtube className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{project.sourceCreator}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1 text-[#878177]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{project.publicationDate}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1 text-[#878177]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{project.duration}</span>
                    </div>
                    <span>·</span>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E3A5F] hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>{isUrdu ? 'اصل ویڈیو ماخذ' : 'Source Video'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Progress Metric Ring/Bar */}
                <div className="lg:w-64 bg-[#FAF8F5] p-4 border border-[#E6E1D6] rounded-xs shrink-0">
                  <div className="flex items-center justify-between text-xs font-sans mb-1.5">
                    <span className="text-[#5C5751] font-medium">
                      {isUrdu ? 'تحقیقاتی تکمیل:' : 'Audit Progress:'}
                    </span>
                    <span className="font-mono font-bold text-[#1A1918]">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#E6E1D6] rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-[#1E3A5F] transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#5C5751] pt-1 border-t border-[#E6E1D6]/60">
                    <div>
                      <span className="text-[#878177] block text-[10px]">{isUrdu ? 'کل دعوے' : 'Total Claims'}</span>
                      <span className="font-bold text-[#1A1918]">{project.totalClaimsCount}</span>
                    </div>
                    <div>
                      <span className="text-[#878177] block text-[10px]">{isUrdu ? 'مصدقہ' : 'Verified'}</span>
                      <span className="font-bold text-emerald-700">{project.verifiedClaimsCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outstanding Tasks Checklist */}
              <div className="mt-5 pt-4">
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-[#878177] mb-2.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#B8934A]" />
                  <span>{isUrdu ? 'زیر التوا ادارتی کام (Outstanding Tasks):' : 'Outstanding Editorial Tasks:'}</span>
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-serif text-[#2D2A26]">
                  {project.outstandingTasks.map((task, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 bg-[#FAF8F5] border border-[#E6E1D6]/70 rounded-xs flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8934A] shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#F0ECE3] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectChapterFilter(project.chapterId)}
                    className="px-4 py-2 bg-[#1A1918] hover:bg-[#2D2A26] text-white font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>{isUrdu ? 'اس باب کے دعوے جانچیے' : 'Filter Claims to this Chapter'}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </button>

                  <button
                    onClick={() => navigateToChapter(project.chapterSlug)}
                    className="px-3.5 py-2 border border-[#E6E1D6] hover:border-[#1A1918] text-[#1A1918] font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#1E3A5F]" />
                    <span>{isUrdu ? 'عوامی مطالعہ (Public Reader)' : 'Open Chapter Reader'}</span>
                  </button>
                </div>

                <button
                  onClick={() => onExportChapterDossier(project)}
                  className="px-3 py-2 text-[#5C5751] hover:text-[#1A1918] hover:bg-[#F5F1EA] cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'تحقیقی مسودہ ڈاؤن لوڈ کریں' : 'Export Research Dossier'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
