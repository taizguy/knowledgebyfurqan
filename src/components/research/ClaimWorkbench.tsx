import React, { useState, useEffect } from 'react';
import { Claim, ClaimStatus, EpistemicStatus, Source, PrimarySource, Person, Place, Concept } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { DataService } from '../../services/dataService';
import { EpistemicBadge } from '../common/EpistemicBadge';
import { DossierExportModal } from './DossierExportModal';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Youtube,
  ExternalLink,
  ShieldAlert,
  FileCheck,
  BookOpen,
  Save,
  Check,
  Plus,
  Trash2,
  Share2,
  Download,
  Eye,
  Sliders,
  Layers,
  Sparkles,
  Users,
  MapPin,
  AlertTriangle,
  Lightbulb,
  Info
} from 'lucide-react';

interface ClaimWorkbenchProps {
  claim: Claim;
  onClose: () => void;
  onClaimUpdated: (updatedClaim: Claim) => void;
  allClaims?: Claim[];
  onNavigateClaim?: (claim: Claim) => void;
}

export const ClaimWorkbench: React.FC<ClaimWorkbenchProps> = ({
  claim,
  onClose,
  onClaimUpdated,
  allClaims = [],
  onNavigateClaim
}) => {
  const { language } = useLanguage();
  const { navigateToEntity, navigateToChapter } = useNavigation();
  const isUrdu = language === 'ur';

  // Sub-tab selection inside Workbench
  const [activeTab, setActiveTab] = useState<
    'dissection' | 'extraction' | 'entities' | 'decision' | 'sources' | 'preview'
  >('dissection');

  // Editable fields state
  const [status, setStatus] = useState<ClaimStatus>(claim.status || (claim.epistemicStatus as any) || 'unreviewed');
  const [confidenceRating, setConfidenceRating] = useState(claim.confidenceRating);
  const [editorialNotesText, setEditorialNotesText] = useState(
    claim.editorialNotes ? claim.editorialNotes[language] || claim.editorialNotes.en : ''
  );
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // New Source quick-attach form state
  const [sourceSearchQuery, setSourceSearchQuery] = useState('');
  const [isAddingNewSource, setIsAddingNewSource] = useState(false);
  const [newSourceTitle, setNewSourceTitle] = useState('');
  const [newSourceAuthor, setNewSourceAuthor] = useState('');
  const [newSourceYear, setNewSourceYear] = useState('');
  const [newSourceType, setNewSourceType] = useState('academic_paper');
  const [sourceCatalogType, setSourceCatalogType] = useState<'secondary' | 'primary'>('secondary');

  // Synchronize state when claim prop changes
  useEffect(() => {
    setStatus(claim.status || (claim.epistemicStatus as any) || 'unreviewed');
    setConfidenceRating(claim.confidenceRating);
    setEditorialNotesText(claim.editorialNotes ? claim.editorialNotes[language] || claim.editorialNotes.en : '');
    setSaveSuccess(false);
  }, [claim, language]);

  // Associated Chapter & Collection
  const chapter = claim.chapterId ? DataService.getChapterByIdOrSlug(claim.chapterId) : null;
  const collection = chapter ? DataService.getCollectionById(chapter.collectionId) : null;

  // Attached Sources
  const primarySources = claim.primarySourceIds
    .map((id) => DataService.getPrimarySourceById(id))
    .filter(Boolean) as PrimarySource[];

  const secondarySources = claim.secondarySourceIds
    .map((id) => DataService.getSourceById(id))
    .filter(Boolean) as Source[];

  // All catalog sources for picker
  const allCatalogSources = DataService.getSources();
  const allCatalogPrimary = DataService.getPrimarySources();

  // Associated Entities
  const associatedPeople = claim.associatedPersonIds
    .map((id) => DataService.getPersonByIdOrSlug(id))
    .filter(Boolean) as Person[];

  const associatedPlaces = claim.associatedPlaceIds
    .map((id) => DataService.getPlaceByIdOrSlug(id))
    .filter(Boolean) as Place[];

  const associatedConcepts = claim.associatedConceptIds
    .map((id) => DataService.getConceptByIdOrSlug(id))
    .filter(Boolean) as Concept[];

  // Parse timestamp to YouTube seconds
  const parseTimestampToSeconds = (ts?: string): number => {
    if (!ts) return 0;
    const parts = ts.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  };

  const videoOffsetSeconds = parseTimestampToSeconds(claim.timestamp);
  const youtubeTimestampUrl = chapter?.originalSourceUrl
    ? `${chapter.originalSourceUrl}&t=${videoOffsetSeconds}s`
    : `https://www.youtube.com/watch?v=td9xnYpXlJo&t=${videoOffsetSeconds}s`;

  // Previous & Next navigation
  const currentIndex = allClaims.findIndex((c) => c.id === claim.id);
  const prevClaim = currentIndex > 0 ? allClaims[currentIndex - 1] : null;
  const nextClaim = currentIndex < allClaims.length - 1 ? allClaims[currentIndex + 1] : null;

  // Save changes handler
  const handleSaveDecision = () => {
    const updated = DataService.updateClaim(claim.id, {
      status,
      epistemicStatus: status,
      confidenceRating,
      confidence: status === 'verified' ? 'high' : status === 'unsupported' ? 'unsupported' : 'medium',
      editorialNotes: {
        en: editorialNotesText,
        ur: editorialNotesText
      }
    });

    if (updated) {
      onClaimUpdated(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  // Attach source handler
  const handleAttachSource = (sourceId: string, isPrimary: boolean = false) => {
    DataService.attachSourceToClaim(claim.id, sourceId, isPrimary);
    const fresh = DataService.getClaimByIdOrSlug(claim.id);
    if (fresh) onClaimUpdated(fresh);
  };

  // Detach source handler
  const handleDetachSource = (sourceId: string) => {
    DataService.detachSourceFromClaim(claim.id, sourceId);
    const fresh = DataService.getClaimByIdOrSlug(claim.id);
    if (fresh) onClaimUpdated(fresh);
  };

  const isSourceReported =
    status === 'source_reported' ||
    claim.status === 'source_reported' ||
    claim.epistemicStatus === 'source_reported';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#E6E1D6] max-w-5xl w-full h-[94vh] flex flex-col shadow-2xl overflow-hidden rounded-xs">
        {/* Top App Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E6E1D6] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="p-1.5 bg-[#1E3A5F] text-white rounded-xs shrink-0 font-mono text-[10px] uppercase font-bold tracking-wider">
              WORKBENCH
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono text-[#878177]">
                <span className="font-bold text-[#1A1918]">{claim.id}</span>
                {claim.timestamp && (
                  <>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 text-[#1E3A5F]">
                      <Clock className="w-3 h-3" />
                      {claim.timestamp}
                    </span>
                  </>
                )}
                {chapter && (
                  <>
                    <span>·</span>
                    <span className="font-serif italic truncate max-w-xs hidden sm:inline">
                      {isUrdu ? `باب 0${chapter.chapterNumber}` : `Ch 0${chapter.chapterNumber}`}
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-serif font-medium text-[#1A1918] truncate max-w-xl">
                {claim.statement[language]}
              </h2>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Prev/Next buttons */}
            <div className="flex items-center gap-1 border border-[#E6E1D6] bg-white rounded-xs p-0.5">
              <button
                disabled={!prevClaim}
                onClick={() => prevClaim && onNavigateClaim && onNavigateClaim(prevClaim)}
                className="p-1 text-[#5C5751] hover:text-[#1A1918] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Previous Claim"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button
                disabled={!nextClaim}
                onClick={() => nextClaim && onNavigateClaim && onNavigateClaim(nextClaim)}
                className="p-1 text-[#5C5751] hover:text-[#1A1918] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Next Claim"
              >
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-2.5 py-1.5 border border-[#E6E1D6] hover:bg-[#FAF8F5] text-xs font-sans text-[#1A1918] font-medium rounded-xs cursor-pointer flex items-center gap-1"
              title="Export Dossier (JSON / Markdown / BibTeX)"
            >
              <Download className="w-3.5 h-3.5 text-[#1E3A5F]" />
              <span className="hidden sm:inline">{isUrdu ? 'برآمد' : 'Export'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#878177] hover:text-[#1A1918] hover:bg-[#F5F1EA] rounded-xs cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Notification Banner if Source Reported */}
        {isSourceReported && (
          <div className="px-5 py-2.5 bg-amber-100/80 border-b border-amber-300 text-xs text-amber-950 font-serif flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0" />
              <span>
                <strong>{isUrdu ? 'اہم ترین علمی تفریق:' : 'CRITICAL ARCHIVAL DISTINCTION:'}</strong>{' '}
                {isUrdu
                  ? '’’ماخذ میں مذکور‘‘ ہونے کا مطلب سائنسی یا تاریخی تصدیق ہرگز نہیں ہے۔ اس دعوے کو عوامی قارئین کے سامنے غیر مصدقہ کے طور پر پیش کیا جائے گا۔'
                  : "'Source Reported' records what the author or scripture stated; it does NOT mean empirically verified. Independent primary proof is required."}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-xs shrink-0">
              UNVERIFIED REPORT
            </span>
          </div>
        )}

        {/* Tab Navigation Rail */}
        <div className="px-4 sm:px-6 bg-white border-b border-[#E6E1D6] flex items-center gap-1 overflow-x-auto text-xs font-sans shrink-0">
          {[
            { id: 'dissection', label: isUrdu ? 'علمیاتی تفریق (Demarcation)' : '1. Epistemic Demarcation', icon: Layers },
            { id: 'extraction', label: isUrdu ? 'ماخذ کا بیان (Extraction)' : '2. Source Extraction', icon: Youtube },
            { id: 'entities', label: isUrdu ? 'نوادرات و ادارے (Entities)' : '3. Linked Entities', icon: BookOpen },
            { id: 'decision', label: isUrdu ? 'ادارتی فیصلہ (Editorial Audit)' : '4. Status & Audit Decision', icon: Sliders },
            { id: 'sources', label: isUrdu ? 'شواہد و مآخذ (Sources)' : `5. Sources (${primarySources.length + secondarySources.length})`, icon: FileCheck },
            { id: 'preview', label: isUrdu ? 'اشاعتی نمائش (Public Preview)' : '6. Publication Preview', icon: Eye }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'border-[#1E3A5F] text-[#1E3A5F] font-bold bg-[#FAF8F5]'
                    : 'border-transparent text-[#5C5751] hover:text-[#1A1918]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Workbench Workspace Panels */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: 4-PART ARCHIVE DISSECTION & EVIDENCE APPRAISAL */}
          {activeTab === 'dissection' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Claim Statement & Status Banner */}
              <div className="p-6 bg-white border border-[#E6E1D6] shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <EpistemicBadge status={status} />
                    <span className="font-mono text-xs text-[#878177] uppercase">
                      Consensus: {confidenceRating.replace(/_/g, ' ')}
                    </span>
                  </div>
                  {claim.timestamp && (
                    <span className="font-mono text-xs text-[#1E3A5F] bg-[#1E3A5F]/5 px-2.5 py-1 rounded-xs border border-[#1E3A5F]/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Timestamp: {claim.timestamp}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1A1918] leading-snug">
                  {claim.statement[language]}
                </h3>

                <p className="mt-2 text-sm font-serif text-[#878177] italic">
                  {language === 'en' ? claim.statement.ur : claim.statement.en}
                </p>

                <div className="mt-4 pt-4 border-t border-[#F0ECE3]">
                  <h4 className="text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold mb-1">
                    {isUrdu ? 'علمیاتی جواز (Epistemic Rationale):' : 'Epistemic Rationale & Justification:'}
                  </h4>
                  <p className="text-sm font-serif text-[#2D2A26] leading-relaxed">
                    {claim.epistemicRationale[language]}
                  </p>
                </div>
              </div>

              {/* 4-PART ARCHIVE DISSECTION FORMULA */}
              {claim.archiveDissection && (
                <div className="space-y-3">
                  <h4 className="text-xs font-sans uppercase tracking-widest text-[#878177] font-bold flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#1E3A5F]" />
                    <span>
                      {isUrdu ? 'چار نکاتی علمیاتی تجزیہ (Demarcation Matrix)' : '4-Part Archival Demarcation Matrix'}
                    </span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 1. Source Says */}
                    <div className="p-4 bg-white border border-[#E6E1D6] rounded-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#878177] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>1. What the Source Asserts</span>
                      </div>
                      <p className="text-xs font-serif text-[#2D2A26] leading-relaxed pt-1">
                        {claim.archiveDissection.sourceSays[language]}
                      </p>
                    </div>

                    {/* 2. Primary Evidence Indicates */}
                    <div className="p-4 bg-white border border-[#E6E1D6] rounded-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#878177] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                        <span>2. Primary Artifact / Epigraphic Proof</span>
                      </div>
                      <p className="text-xs font-serif text-[#2D2A26] leading-relaxed pt-1">
                        {claim.archiveDissection.primaryEvidenceIndicates[language]}
                      </p>
                    </div>

                    {/* 3. Modern Scholarship Concludes */}
                    <div className="p-4 bg-white border border-[#E6E1D6] rounded-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#878177] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        <span>3. Modern Scholarship Consensus</span>
                      </div>
                      <p className="text-xs font-serif text-[#2D2A26] leading-relaxed pt-1">
                        {claim.archiveDissection.modernScholarshipConcludes[language]}
                      </p>
                    </div>

                    {/* 4. Editorial Assessment */}
                    <div className="p-4 bg-white border border-[#1E3A5F]/30 bg-[#1E3A5F]/3 rounded-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#1E3A5F] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#1E3A5F]" />
                        <span>4. Archival Editorial Assessment</span>
                      </div>
                      <p className="text-xs font-serif text-[#1A1918] leading-relaxed pt-1 font-medium">
                        {claim.archiveDissection.editorialAssessment[language]}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Side-by-Side Evidence Appraisal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Supporting Evidence */}
                <div className="p-5 bg-white border border-emerald-200/80 rounded-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans uppercase font-bold text-emerald-800">
                    <Check className="w-4 h-4" />
                    <span>Supporting Evidence & Calibration</span>
                  </div>
                  {claim.supportingEvidence && claim.supportingEvidence.length > 0 ? (
                    <ul className="space-y-2 text-xs font-serif text-[#2D2A26]">
                      {claim.supportingEvidence.map((ev, i) => (
                        <li key={i} className="p-2.5 bg-emerald-50/40 border border-emerald-100 rounded-xs leading-relaxed">
                          {ev[language]}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs font-serif text-[#878177] italic">
                      No positive physical or literary proof registered yet.
                    </p>
                  )}
                </div>

                {/* Contradicting Evidence */}
                <div className="p-5 bg-white border border-rose-200/80 rounded-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans uppercase font-bold text-rose-800">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Contradicting Evidence / Caveats</span>
                  </div>
                  {claim.contradictingEvidence && claim.contradictingEvidence.length > 0 ? (
                    <ul className="space-y-2 text-xs font-serif text-[#2D2A26]">
                      {claim.contradictingEvidence.map((ev, i) => (
                        <li key={i} className="p-2.5 bg-rose-50/40 border border-rose-100 rounded-xs leading-relaxed">
                          {ev[language]}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs font-serif text-[#878177] italic">
                      No documented empirical counter-evidence recorded.
                    </p>
                  )}
                </div>
              </div>

              {/* Competing Viewpoints */}
              {claim.competingViewpoints && claim.competingViewpoints.length > 0 && (
                <div className="p-5 bg-white border border-[#E6E1D6] rounded-xs space-y-3">
                  <h4 className="text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#1E3A5F]" />
                    <span>Scholarly Debate & Competing Viewpoints</span>
                  </h4>
                  <div className="space-y-3">
                    {claim.competingViewpoints.map((view, i) => (
                      <div key={i} className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs space-y-1">
                        <div className="font-serif font-bold text-[#1A1918]">
                          {view.perspective[language]}
                        </div>
                        <div className="text-[11px] font-sans text-[#5C5751]">
                          <strong>Proponents:</strong> {view.proponents[language]}
                        </div>
                        <div className="text-xs font-serif text-[#2D2A26] pt-1">
                          <strong>Counter-arguments:</strong> {view.counterEvidence[language]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SOURCE EXTRACTION & AUDIOVISUAL DEEP-LINK */}
          {activeTab === 'extraction' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white border border-[#E6E1D6] p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE3]">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
                      Source Audio-Visual Provenance
                    </span>
                    <h3 className="text-lg font-serif font-medium text-[#1A1918]">
                      Originating Lecture & Timestamp Extraction
                    </h3>
                  </div>
                  <a
                    href={youtubeTimestampUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-sans font-medium rounded-xs cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>Watch at {claim.timestamp || '00:00'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Source Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs">
                    <span className="text-[#878177] block text-[10px] uppercase">Original Creator / Speaker</span>
                    <span className="font-medium text-[#1A1918]">
                      {chapter?.originalSourceCreator || 'Furqan Qureshi Blogs'}
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs">
                    <span className="text-[#878177] block text-[10px] uppercase">Time Offset</span>
                    <span className="font-mono font-medium text-[#1E3A5F]">
                      {claim.timestamp || 'N/A'} (approx. {videoOffsetSeconds}s)
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs sm:col-span-2">
                    <span className="text-[#878177] block text-[10px] uppercase">Associated Chapter Section</span>
                    <span className="font-serif text-[#1A1918]">
                      {claim.sectionId || 'Section catalog pending primary video verification'}
                    </span>
                  </div>
                </div>

                {/* Verbatim Quote Excerpt */}
                <div className="pt-2">
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold mb-2">
                    Verbatim Spoken Statement / Surrounding Transcript
                  </label>
                  <blockquote className="p-4 bg-[#FAF8F5] border-l-4 border-[#1E3A5F] text-xs font-serif text-[#1A1918] italic leading-relaxed">
                    {claim.archiveDissection?.sourceSays[language] ||
                      'Spoken excerpt cataloged from video lecture; subject to line-by-line verification.'}
                  </blockquote>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LINKED ENTITIES & ONTOLOGY */}
          {activeTab === 'entities' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white border border-[#E6E1D6] p-6 shadow-xs space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
                    Knowledge Graph Connections
                  </span>
                  <h3 className="text-lg font-serif font-medium text-[#1A1918]">
                    Cross-Archival Entity Anchors
                  </h3>
                  <p className="text-xs font-serif text-[#5C5751] mt-1">
                    This claim is structurally interconnected with people, places, and philosophical concepts across deep time.
                  </p>
                </div>

                {/* People */}
                <div>
                  <h4 className="text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#1E3A5F]" />
                    <span>Historical People ({associatedPeople.length})</span>
                  </h4>
                  {associatedPeople.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {associatedPeople.map((person) => (
                        <button
                          key={person.id}
                          onClick={() => {
                            onClose();
                            navigateToEntity('people', person.id);
                          }}
                          className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] text-left rtl:text-right rounded-xs cursor-pointer transition-colors"
                        >
                          <div className="font-serif font-medium text-xs text-[#1A1918]">
                            {person.name[language]}
                          </div>
                          <div className="text-[11px] font-sans text-[#878177]">
                            {person.role[language]} · {person.eraOrLifespan}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-serif text-[#878177] italic">No individuals tagged.</p>
                  )}
                </div>

                {/* Places */}
                <div>
                  <h4 className="text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1E3A5F]" />
                    <span>Geographic Anchors & Sites ({associatedPlaces.length})</span>
                  </h4>
                  {associatedPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {associatedPlaces.map((place) => (
                        <button
                          key={place.id}
                          onClick={() => {
                            onClose();
                            navigateToEntity('places', place.id);
                          }}
                          className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] text-left rtl:text-right rounded-xs cursor-pointer transition-colors"
                        >
                          <div className="font-serif font-medium text-xs text-[#1A1918]">
                            {place.name[language]}
                          </div>
                          <div className="text-[11px] font-sans text-[#878177]">
                            {place.region[language]} · {place.modernCountry[language]}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-serif text-[#878177] italic">No geographic places tagged.</p>
                  )}
                </div>

                {/* Concepts */}
                <div>
                  <h4 className="text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B8934A]" />
                    <span>Thematic Concepts ({associatedConcepts.length})</span>
                  </h4>
                  {associatedConcepts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {associatedConcepts.map((concept) => (
                        <button
                          key={concept.id}
                          onClick={() => {
                            onClose();
                            navigateToEntity('concepts', concept.id);
                          }}
                          className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] text-left rtl:text-right rounded-xs cursor-pointer transition-colors"
                        >
                          <div className="font-serif font-medium text-xs text-[#1A1918]">
                            {concept.name[language]}
                          </div>
                          <div className="text-[11px] font-serif text-[#878177] line-clamp-1">
                            {concept.definition[language]}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-serif text-[#878177] italic">No concepts tagged.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EDITORIAL DECISION & STATUS AUDIT */}
          {activeTab === 'decision' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white border border-[#E6E1D6] p-6 shadow-xs space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
                    Editorial Governance Engine
                  </span>
                  <h3 className="text-lg font-serif font-medium text-[#1A1918]">
                    Epistemic Status Audit & Decision
                  </h3>
                  <p className="text-xs font-serif text-[#5C5751] mt-1">
                    Set the definitive classification under the archive&apos;s 10-tier standard. Changes persist in your active research session.
                  </p>
                </div>

                {/* Status Selector */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#1A1918] font-bold mb-2">
                    Official Epistemic Status (10 Tiers)
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ClaimStatus)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-medium text-[#1A1918] focus:border-[#1E3A5F]"
                  >
                    <option value="unreviewed">1. Unreviewed (Pending audit)</option>
                    <option value="source_reported">2. Source Reported (Attested in text, unverified)</option>
                    <option value="primary_source_located">3. Primary Source Located (Physical artifact found)</option>
                    <option value="partially_verified">4. Partially Verified (Corroborated in part)</option>
                    <option value="verified">5. Verified (Empirically established)</option>
                    <option value="disputed">6. Disputed (Scholarly disagreement)</option>
                    <option value="unsupported">7. Unsupported (No evidence)</option>
                    <option value="incorrect">8. Incorrect (Refuted by modern science/mechanics)</option>
                    <option value="interpretive">9. Interpretive (Hermeneutic commentary)</option>
                    <option value="open_question">10. Open Question (Beyond empirical reach)</option>
                  </select>
                </div>

                {/* Confidence Consensus Selector */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold mb-2">
                    Scholarly Consensus Rating
                  </label>
                  <select
                    value={confidenceRating}
                    onChange={(e) => setConfidenceRating(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs text-[#1A1918]"
                  >
                    <option value="firmly_established">Firmly Established (Scientific consensus)</option>
                    <option value="scholarly_majority">Scholarly Majority (Standard textbook view)</option>
                    <option value="contested_hypothesis">Contested Hypothesis (Active academic debate)</option>
                    <option value="tradition_only">Tradition Only (Religious or mythic lore)</option>
                  </select>
                </div>

                {/* Editorial Notes Textarea */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold mb-2">
                    Editorial Appraisal & Peer Review Notes
                  </label>
                  <textarea
                    rows={4}
                    value={editorialNotesText}
                    onChange={(e) => setEditorialNotesText(e.target.value)}
                    placeholder="Enter peer review rationale, future radiocarbon verification goals, or philological citations..."
                    className="w-full p-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918] focus:border-[#1E3A5F]"
                  />
                </div>

                {/* Save Decision Button */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs font-sans text-emerald-700 font-medium flex items-center gap-1">
                    {saveSuccess && (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Changes saved to active research session!</span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={handleSaveDecision}
                    className="px-5 py-2.5 bg-[#1E3A5F] hover:bg-[#152840] text-white text-xs font-sans uppercase tracking-wider font-semibold rounded-xs cursor-pointer shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Editorial Decision</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SOURCE MANAGEMENT & LINKING */}
          {activeTab === 'sources' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white border border-[#E6E1D6] p-6 shadow-xs space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
                    Bibliographic & Artifact Provenance
                  </span>
                  <h3 className="text-lg font-serif font-medium text-[#1A1918]">
                    Attached Primary Artifacts & Secondary Literature
                  </h3>
                  <p className="text-xs font-serif text-[#5C5751] mt-1">
                    Attach authenticated material objects or academic papers to elevate the epistemic confidence of this claim.
                  </p>
                </div>

                {/* Primary Sources Attached */}
                <div className="space-y-3">
                  <h4 className="text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold flex items-center justify-between">
                    <span>1. Primary Artifacts Attached ({primarySources.length})</span>
                  </h4>
                  {primarySources.length > 0 ? (
                    <div className="space-y-2">
                      {primarySources.map((ps) => (
                        <div
                          key={ps.id}
                          className="p-3 bg-[#FAF8F5] border border-amber-300/80 rounded-xs flex items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <span className="font-serif font-bold text-[#1A1918] block">
                              {ps.title[language]}
                            </span>
                            <span className="font-sans text-[11px] text-[#878177]">
                              {ps.datingRange} · {ps.currentLocation[language]} · {ps.materialForm[language]}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDetachSource(ps.id)}
                            className="text-stone-400 hover:text-rose-700 p-1 cursor-pointer"
                            title="Detach artifact"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-stone-50 border border-dashed border-stone-200 text-xs font-serif text-[#878177] italic text-center">
                      No primary physical artifacts attached to this claim yet.
                    </div>
                  )}
                </div>

                {/* Secondary Sources Attached */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-sans uppercase tracking-wider text-[#878177] font-semibold flex items-center justify-between">
                    <span>2. Secondary Sources & Monographs ({secondarySources.length})</span>
                  </h4>
                  {secondarySources.length > 0 ? (
                    <div className="space-y-2">
                      {secondarySources.map((s) => (
                        <div
                          key={s.id}
                          className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs flex items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <span className="font-serif font-bold text-[#1A1918] block">
                              {s.title[language]}
                            </span>
                            <span className="font-sans text-[11px] text-[#878177]">
                              {s.authors.map((a) => a[language]).join(', ')} ({s.publicationYearOrEpoch}) · {s.publication[language]}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDetachSource(s.id)}
                            className="text-stone-400 hover:text-rose-700 p-1 cursor-pointer"
                            title="Detach source"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-stone-50 border border-dashed border-stone-200 text-xs font-serif text-[#878177] italic text-center">
                      No secondary academic papers or monographs attached.
                    </div>
                  )}
                </div>

                {/* Source Picker from Catalog */}
                <div className="pt-4 border-t border-[#F0ECE3] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-sans uppercase tracking-wider text-[#1A1918] font-bold">
                      Attach Source from Archive Catalog
                    </h4>
                    <div className="flex items-center gap-1 bg-[#F5F1EA] p-0.5 rounded-xs text-[11px] font-sans">
                      <button
                        type="button"
                        onClick={() => setSourceCatalogType('secondary')}
                        className={`px-2 py-0.5 rounded-xs cursor-pointer ${
                          sourceCatalogType === 'secondary'
                            ? 'bg-white text-[#1A1918] font-bold shadow-2xs'
                            : 'text-[#5C5751]'
                        }`}
                      >
                        Secondary Sources ({allCatalogSources.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setSourceCatalogType('primary')}
                        className={`px-2 py-0.5 rounded-xs cursor-pointer ${
                          sourceCatalogType === 'primary'
                            ? 'bg-white text-[#1A1918] font-bold shadow-2xs'
                            : 'text-[#5C5751]'
                        }`}
                      >
                        Primary Artifacts ({allCatalogPrimary.length})
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={sourceSearchQuery}
                    onChange={(e) => setSourceSearchQuery(e.target.value)}
                    placeholder={
                      sourceCatalogType === 'primary'
                        ? 'Search primary artifacts by title or provenance...'
                        : 'Search secondary sources by title or author...'
                    }
                    className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918]"
                  />

                  <div className="max-h-52 overflow-y-auto space-y-1.5 border border-[#E6E1D6] p-2 bg-[#FAF8F5] rounded-xs">
                    {sourceCatalogType === 'secondary'
                      ? allCatalogSources
                          .filter((s) => {
                            if (!sourceSearchQuery.trim()) return true;
                            const q = sourceSearchQuery.toLowerCase();
                            return (
                              s.title.en.toLowerCase().includes(q) ||
                              s.title.ur.toLowerCase().includes(q) ||
                              s.authors.some((a) => a.en.toLowerCase().includes(q))
                            );
                          })
                          .slice(0, 15)
                          .map((s) => {
                            const isAttached = claim.secondarySourceIds.includes(s.id);
                            return (
                              <div
                                key={s.id}
                                className="p-2.5 bg-white border border-stone-200/80 rounded-xs flex items-center justify-between gap-2 text-xs"
                              >
                                <div className="truncate">
                                  <span className="font-serif font-medium text-[#1A1918] block truncate">
                                    {s.title[language]}
                                  </span>
                                  <span className="text-[10px] text-[#878177] font-sans">
                                    {s.authors.map((a) => a[language]).join(', ')} ({s.publicationYearOrEpoch}) · {s.sourceType}
                                  </span>
                                </div>
                                <button
                                  disabled={isAttached}
                                  onClick={() => handleAttachSource(s.id, false)}
                                  className={`px-2.5 py-1 text-[11px] font-sans font-medium rounded-xs cursor-pointer ${
                                    isAttached
                                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                      : 'bg-[#1E3A5F] text-white hover:bg-[#152840]'
                                  }`}
                                >
                                  {isAttached ? 'Attached' : '+ Attach'}
                                </button>
                              </div>
                            );
                          })
                      : allCatalogPrimary
                          .filter((ps) => {
                            if (!sourceSearchQuery.trim()) return true;
                            const q = sourceSearchQuery.toLowerCase();
                            return (
                              ps.title.en.toLowerCase().includes(q) ||
                              ps.title.ur.toLowerCase().includes(q) ||
                              ps.provenance.en.toLowerCase().includes(q)
                            );
                          })
                          .slice(0, 15)
                          .map((ps) => {
                            const isAttached = claim.primarySourceIds.includes(ps.id);
                            return (
                              <div
                                key={ps.id}
                                className="p-2.5 bg-white border border-amber-200/80 rounded-xs flex items-center justify-between gap-2 text-xs"
                              >
                                <div className="truncate">
                                  <span className="font-serif font-medium text-[#1A1918] block truncate">
                                    {ps.title[language]}
                                  </span>
                                  <span className="text-[10px] text-amber-900 font-sans">
                                    {ps.datingRange} · {ps.materialForm[language]} · {ps.currentLocation[language]}
                                  </span>
                                </div>
                                <button
                                  disabled={isAttached}
                                  onClick={() => handleAttachSource(ps.id, true)}
                                  className={`px-2.5 py-1 text-[11px] font-sans font-medium rounded-xs cursor-pointer ${
                                    isAttached
                                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                      : 'bg-[#B8934A] text-stone-900 hover:bg-[#a07c36] font-semibold'
                                  }`}
                                >
                                  {isAttached ? 'Attached' : '+ Attach Artifact'}
                                </button>
                              </div>
                            );
                          })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PUBLICATION PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white border border-[#E6E1D6] p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
                    Public Chapter Reader Simulation
                  </span>
                  <h3 className="text-lg font-serif font-medium text-[#1A1918]">
                    Verified Claim Card Presentation
                  </h3>
                  <p className="text-xs font-serif text-[#5C5751] mt-1">
                    This is how reader visitors will experience this claim in the public Chapter Reader and Claim Inspector drawer.
                  </p>
                </div>

                {/* Render Simulated Public Card */}
                <div className="p-6 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <EpistemicBadge status={status} />
                    {claim.timestamp && (
                      <span className="font-mono text-xs text-[#878177]">⏱️ {claim.timestamp}</span>
                    )}
                  </div>
                  <h4 className="text-lg font-serif font-medium text-[#1A1918]">
                    {claim.statement[language]}
                  </h4>
                  <p className="text-xs font-serif text-[#5C5751] leading-relaxed">
                    {claim.epistemicRationale[language]}
                  </p>

                  {isSourceReported && (
                    <div className="p-3 bg-amber-100/70 border border-amber-300 text-xs text-amber-950 font-serif flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>
                        Notice: Attested in source video, but unverified by independent primary empirical proof.
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#E6E1D6] flex items-center justify-between text-xs font-sans text-[#878177]">
                    <span>
                      {primarySources.length} primary artifact(s) · {secondarySources.length} source(s)
                    </span>
                    <span className="text-[#1E3A5F] font-medium">Consensus: {confidenceRating.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Dossier Modal */}
      {isExportModalOpen && (
        <DossierExportModal
          claim={claim}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}
    </div>
  );
};
