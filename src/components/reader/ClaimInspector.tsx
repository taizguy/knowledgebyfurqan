import React from 'react';
import { Claim } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { DataService } from '../../services/dataService';
import { EpistemicBadge } from '../common/EpistemicBadge';
import {
  X,
  CheckCircle,
  AlertTriangle,
  Layers,
  BookOpen,
  MapPin,
  Lightbulb,
  User,
  ArrowRight,
  Clock,
  ShieldAlert,
  FileText
} from 'lucide-react';

interface ClaimInspectorProps {
  claim: Claim | null;
  onClose: () => void;
}

export const ClaimInspector: React.FC<ClaimInspectorProps> = ({ claim, onClose }) => {
  const { language, t } = useLanguage();
  const { navigate, navigateToChapter } = useNavigation();

  if (!claim) return null;

  const primarySources = claim.primarySourceIds.map((id) => DataService.getPrimarySourceById(id)).filter(Boolean);
  const secondarySources = claim.secondarySourceIds.map((id) => DataService.getSourceById(id)).filter(Boolean);
  const places = claim.associatedPlaceIds.map((id) => DataService.getPlaceByIdOrSlug(id)).filter(Boolean);
  const concepts = claim.associatedConceptIds.map((id) => DataService.getConceptByIdOrSlug(id)).filter(Boolean);
  const people = claim.associatedPersonIds.map((id) => DataService.getPersonByIdOrSlug(id)).filter(Boolean);
  const chapters = (claim.chapterIds || []).map((id) => DataService.getChapterByIdOrSlug(id)).filter(Boolean);

  const isSourceReportedOnly =
    claim.status === 'source_reported' ||
    claim.epistemicStatus === 'source_reported' ||
    claim.epistemicStatus === 'source_attested_unverified';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-stone-900/50 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-2xl h-full bg-[#FBF9F5] border-l rtl:border-l-0 rtl:border-r border-[#E6E1D6] shadow-2xl flex flex-col overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E6E1D6] flex items-start justify-between gap-4 sticky top-0 z-10 shadow-xs">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] uppercase tracking-widest text-[#878177] font-sans font-semibold">
                Epistemic Demarcation Engine
              </span>
              <EpistemicBadge status={claim.status || claim.epistemicStatus} />
              {claim.timestamp && (
                <span className="inline-flex items-center gap-1 font-mono text-xs text-[#878177]">
                  <Clock className="w-3 h-3" />
                  {claim.timestamp}
                </span>
              )}
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1A1918] leading-snug">
              {claim.statement[language]}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#878177] hover:text-[#1A1918] hover:bg-[#F5F1EA] rounded-xs transition-colors cursor-pointer"
            aria-label="Close claim inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-8">
          {/* CRITICAL DEMARCATION BANNER for Source Reported */}
          {isSourceReportedOnly && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xs flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 font-serif leading-relaxed">
                <strong className="font-sans uppercase tracking-wider block font-semibold text-amber-900 mb-1">
                  {language === 'ur' ? 'اہم ترین علمی تفریق: ماخذ میں مذکور ≠ سائنسی تصدیق' : 'Critical Demarcation Standard: Source Reported ≠ Verified'}
                </strong>
                {language === 'ur'
                  ? 'یہ دعویٰ قدیم تحریری ماخذ میں درج ضرور ہے، لیکن اسے ہم عصر مادی آثار یا سائنسی پیمائش سے آزادانہ طور پر ثابت نہیں مانا جا سکتا۔ آرکائیو کا بنیادی اصول ہے کہ کسی تشریح یا روایتی بیان کو از خود حقیقت کا درجہ نہ دیا جائے۔'
                  : 'This statement is recorded in a historical, mythological, or literary source; however, it has NOT been established as an empirical, physical, or scientific fact. Never silently convert an ancient attestation into historical fact.'}
              </div>
            </div>
          )}

          {/* Epistemic Rationale & Scientific Demarcation */}
          <div className="bg-white p-5 border border-[#E6E1D6] shadow-2xs">
            <h4 className="text-xs uppercase tracking-wider text-[#1A1918] font-sans font-semibold mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#1E3A5F]" />
              <span>{language === 'ur' ? 'سائنسی و تاریخی پڑتال کا جواز' : 'Epistemic Demarcation & Rationale'}</span>
            </h4>
            <p className="text-sm font-serif text-[#2D2A26] leading-relaxed">
              {claim.epistemicRationale[language]}
            </p>
            <div className="mt-4 pt-3 border-t border-[#F0ECE3] flex flex-wrap items-center justify-between text-xs text-[#5C5751] font-sans">
              <div>
                <span className="font-semibold text-[#1A1918]">Claim Type: </span>
                <span className="capitalize">{claim.claimType}</span>
              </div>
              <div>
                <span className="font-semibold text-[#1A1918]">Consensus Rating: </span>
                <span className="font-mono text-[#1E3A5F]">{claim.confidenceRating.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          {/* Core Archive Dissection Formula */}
          {claim.archiveDissection && (
            <div className="bg-[#FAF8F5] border border-[#E6E1D6] p-5">
              <h4 className="text-xs uppercase tracking-wider text-[#878177] font-sans font-semibold mb-4">
                {language === 'ur' ? 'چار جہتی ثبوتی تجزیہ (Archive Dissection)' : 'Four-Part Evidentiary Breakdown'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
                <div className="bg-white p-3.5 border border-[#E6E1D6]">
                  <span className="font-sans uppercase tracking-wider text-[10px] text-[#878177] font-bold block mb-1">
                    1. Source Material
                  </span>
                  <p className="text-[#2D2A26] leading-relaxed">
                    {claim.archiveDissection.sourceSays[language]}
                  </p>
                </div>
                <div className="bg-white p-3.5 border border-[#E6E1D6]">
                  <span className="font-sans uppercase tracking-wider text-[10px] text-[#14532D] font-bold block mb-1">
                    2. Primary Physical Proof
                  </span>
                  <p className="text-[#2D2A26] leading-relaxed">
                    {claim.archiveDissection.primaryEvidenceIndicates[language]}
                  </p>
                </div>
                <div className="bg-white p-3.5 border border-[#E6E1D6]">
                  <span className="font-sans uppercase tracking-wider text-[10px] text-[#0F766E] font-bold block mb-1">
                    3. Modern Scholarship
                  </span>
                  <p className="text-[#2D2A26] leading-relaxed">
                    {claim.archiveDissection.modernScholarshipConcludes[language]}
                  </p>
                </div>
                <div className="bg-white p-3.5 border border-[#E6E1D6]">
                  <span className="font-sans uppercase tracking-wider text-[10px] text-[#3730A3] font-bold block mb-1">
                    4. Editorial Assessment
                  </span>
                  <p className="text-[#2D2A26] leading-relaxed">
                    {claim.archiveDissection.editorialAssessment[language]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Supporting Evidence vs Contradicting Evidence */}
          {((claim.supportingEvidence && claim.supportingEvidence.length > 0) ||
            (claim.contradictingEvidence && claim.contradictingEvidence.length > 0)) && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-[#1A1918] font-sans font-semibold">
                {language === 'ur' ? 'شواہد کا موازنہ و تقابل' : 'Evidentiary Synthesis: Supporting & Contradicting'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Supporting */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-200">
                  <span className="text-xs uppercase tracking-wider text-emerald-900 font-sans font-bold flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Supporting Evidence</span>
                  </span>
                  {claim.supportingEvidence && claim.supportingEvidence.length > 0 ? (
                    <ul className="space-y-2 text-xs font-serif text-stone-800 leading-relaxed list-disc list-inside">
                      {claim.supportingEvidence.map((ev, idx) => (
                        <li key={idx}>{ev[language]}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 font-serif italic">None established</p>
                  )}
                </div>

                {/* Contradicting */}
                <div className="p-4 bg-amber-50/50 border border-amber-200">
                  <span className="text-xs uppercase tracking-wider text-amber-900 font-sans font-bold flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Contradicting / Counter Evidence</span>
                  </span>
                  {claim.contradictingEvidence && claim.contradictingEvidence.length > 0 ? (
                    <ul className="space-y-2 text-xs font-serif text-stone-800 leading-relaxed list-disc list-inside">
                      {claim.contradictingEvidence.map((ev, idx) => (
                        <li key={idx}>{ev[language]}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 font-serif italic">None attested</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Competing Scholarly Hypotheses if present */}
          {claim.competingViewpoints && claim.competingViewpoints.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1A1918] font-sans font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>{t.labels.competingHypotheses}</span>
              </h4>
              <div className="space-y-3">
                {claim.competingViewpoints.map((vw, idx) => (
                  <div key={idx} className="p-4 bg-white border border-amber-200">
                    <div className="font-semibold text-xs text-[#1A1918] mb-1 font-sans">
                      {vw.perspective[language]}
                    </div>
                    <div className="text-xs text-[#5C5751] mb-1">
                      <span className="font-medium text-[#1A1918]">Proponents: </span>
                      {vw.proponents[language]}
                    </div>
                    <p className="text-xs text-[#2D2A26] font-serif leading-relaxed">
                      {vw.counterEvidence[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Primary Evidence Artifacts */}
          {primarySources.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1A1918] font-sans font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#1E3A5F]" />
                <span>{t.labels.primarySources}</span>
              </h4>
              <div className="space-y-3">
                {primarySources.map((ps) => (
                  <div key={ps!.id} className="p-4 bg-white border border-[#E6E1D6]">
                    <div className="text-xs font-semibold text-[#1A1918] font-serif">{ps!.title[language]}</div>
                    <div className="mt-1 text-xs text-[#5C5751]">
                      <span>{t.labels.datingRange}: </span>
                      <span className="font-mono text-[#1A1918]">{ps!.datingRange}</span>
                    </div>
                    <div className="mt-1 text-xs text-[#5C5751]">
                      <span>{t.labels.currentLocation}: </span>
                      <span>{ps!.currentLocation[language]}</span>
                    </div>
                    <p className="mt-2 text-xs font-serif text-[#5C5751] italic">
                      "{ps!.epistemicNotes[language]}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secondary & Modern Sources */}
          {secondarySources.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#1A1918] font-sans font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#5C5751]" />
                <span>{language === 'ur' ? 'علمی مآخذ و حوالہ جات' : 'Secondary Sources & Literature'}</span>
              </h4>
              <div className="space-y-3">
                {secondarySources.map((s) => (
                  <div key={s!.id} className="p-4 bg-white border border-[#E6E1D6]">
                    <div className="text-xs font-semibold text-[#1A1918]">{s!.title[language]}</div>
                    <div className="mt-0.5 text-xs text-[#5C5751]">
                      {s!.authors.map((a) => a[language]).join(', ')} ({s!.publicationYearOrEpoch})
                    </div>
                    <p className="mt-2 text-xs text-[#5C5751] font-serif">
                      {s!.reliabilityNotes?.[language] || s!.reliabilityAssessment?.[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigable Entity Relationships */}
          <div className="pt-4 border-t border-[#E6E1D6] space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-[#1A1918] font-sans font-semibold">
              {t.labels.associatedEntities}
            </h4>

            {/* Chapters */}
            {chapters.length > 0 && (
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#878177] font-sans block mb-1.5">
                  Appears in Chapters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {chapters.map((ch) => (
                    <button
                      key={ch!.id}
                      onClick={() => {
                        onClose();
                        navigateToChapter(ch!.slug);
                      }}
                      className="px-2.5 py-1 bg-white border border-[#E6E1D6] text-xs font-serif text-[#1E3A5F] hover:border-[#1E3A5F] flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3 h-3 text-[#878177]" />
                      <span>{ch!.title[language]}</span>
                      <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* People, Places, Concepts */}
            <div className="flex flex-wrap gap-2 text-xs">
              {people.map((p) => (
                <button
                  key={p!.id}
                  onClick={() => {
                    onClose();
                    navigate(`/${language}/people?id=${p!.id}`);
                  }}
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1A1918] flex items-center gap-1 text-[#2D2A26] cursor-pointer"
                >
                  <User className="w-3 h-3 text-[#B8934A]" />
                  <span>{p!.name[language]}</span>
                </button>
              ))}

              {places.map((pl) => (
                <button
                  key={pl!.id}
                  onClick={() => {
                    onClose();
                    navigate(`/${language}/places?id=${pl!.id}`);
                  }}
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1A1918] flex items-center gap-1 text-[#2D2A26] cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-[#1E3A5F]" />
                  <span>{pl!.name[language]}</span>
                </button>
              ))}

              {concepts.map((cn) => (
                <button
                  key={cn!.id}
                  onClick={() => {
                    onClose();
                    navigate(`/${language}/concepts?id=${cn!.id}`);
                  }}
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1A1918] flex items-center gap-1 text-[#2D2A26] cursor-pointer"
                >
                  <Lightbulb className="w-3 h-3 text-[#831843]" />
                  <span>{cn!.name[language]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
