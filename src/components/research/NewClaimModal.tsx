import React, { useState } from 'react';
import { Claim, ClaimStatus, EpistemicStatus } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import { DataService } from '../../services/dataService';
import { X, Sparkles, Check, AlertCircle, ShieldAlert } from 'lucide-react';

interface NewClaimModalProps {
  onClose: () => void;
  onClaimCreated: (newClaim: Claim) => void;
  defaultChapterId?: string;
}

export const NewClaimModal: React.FC<NewClaimModalProps> = ({
  onClose,
  onClaimCreated,
  defaultChapterId
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const chapters = DataService.getChapters();
  const defaultChapter = defaultChapterId || (chapters.length > 0 ? chapters[0].id : '');

  const [statementEn, setStatementEn] = useState('');
  const [statementUr, setStatementUr] = useState('');
  const [chapterId, setChapterId] = useState(defaultChapter);
  const [timestamp, setTimestamp] = useState('00:00');
  const [claimType, setClaimType] = useState<Claim['claimType']>('historical');
  const [status, setStatus] = useState<ClaimStatus>('unreviewed');
  const [confidenceRating, setConfidenceRating] = useState<Claim['confidenceRating']>('contested_hypothesis');
  const [rationaleEn, setRationaleEn] = useState('');
  const [rationaleUr, setRationaleUr] = useState('');
  const [editorialNotesEn, setEditorialNotesEn] = useState('');
  const [sourceQuotation, setSourceQuotation] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statementEn.trim() && !statementUr.trim()) {
      setValidationError(isUrdu ? 'براہ کرم دعوے کا متن درج کیجیے۔' : 'Please provide a claim statement in English or Urdu.');
      return;
    }
    setValidationError(null);

    const newId = `clm-${Date.now().toString().slice(-6)}-${statementEn.slice(0, 15).toLowerCase().replace(/[^a-z0-9]/g, '-') || 'extracted'}`;

    const newClaim: Claim = {
      id: newId,
      slug: newId,
      statement: {
        en: statementEn.trim() || statementUr.trim(),
        ur: statementUr.trim() || statementEn.trim()
      },
      language: 'en',
      chapterId: chapterId,
      timestamp: timestamp.trim() || undefined,
      claimType: claimType,
      status: status,
      epistemicStatus: status,
      confidence: status === 'verified' ? 'high' : status === 'unsupported' ? 'unsupported' : 'medium',
      confidenceRating: confidenceRating,
      epistemicRationale: {
        en: rationaleEn.trim() || 'Extracted via Research Workspace; awaiting formal verification.',
        ur: rationaleUr.trim() || 'تحقیقاتی کارگاہ کے ذریعے اندراج؛ باقاعدہ جانچ باقی ہے۔'
      },
      primarySourceIds: [],
      secondarySourceIds: [],
      supportingEvidence: [],
      contradictingEvidence: [],
      editorialNotes: editorialNotesEn.trim()
        ? {
            en: editorialNotesEn.trim(),
            ur: editorialNotesEn.trim()
          }
        : undefined,
      archiveDissection: {
        sourceSays: {
          en: sourceQuotation.trim() || 'Recorded from audio-visual source transcript.',
          ur: sourceQuotation.trim() || 'صوتی و بصری ماخذ سے حاصل کردہ بیان۔'
        },
        primaryEvidenceIndicates: {
          en: 'Awaiting primary artifact collation.',
          ur: 'بنیادی مادی شواہد کی تلاش جاری ہے۔'
        },
        modernScholarshipConcludes: {
          en: 'Awaiting modern peer-reviewed bibliographic review.',
          ur: 'جدید علمی اتفاق کا جائزہ باقی ہے۔'
        },
        editorialAssessment: {
          en: 'Newly ingested claim in the active research register.',
          ur: 'نئے درج شدہ دعوے کا ابتدائی ادارتی اندراج۔'
        }
      },
      associatedPersonIds: [],
      associatedPlaceIds: [],
      associatedConceptIds: [],
      chapterIds: chapterId ? [chapterId] : []
    };

    const saved = DataService.addClaim(newClaim);
    onClaimCreated(saved);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#E6E1D6] max-w-3xl w-full my-8 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#E6E1D6] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#1E3A5F] text-white rounded-xs">
              <Sparkles className="w-4 h-4 text-[#B8934A]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
                Archival Extraction Engine
              </span>
              <h3 className="text-base font-serif font-medium text-[#1A1918]">
                {isUrdu ? 'نیا تحقیقی دعویٰ درج کیجیے' : 'Extract & Ingest Research Claim'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#878177] hover:text-[#1A1918] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {validationError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-serif rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Statement in English */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-[#1A1918] font-semibold mb-1">
              Claim Statement (English) *
            </label>
            <input
              type="text"
              required
              value={statementEn}
              onChange={(e) => setStatementEn(e.target.value)}
              placeholder="e.g., Upper Paleolithic parietal art demonstrates intentional external memory systems..."
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918] focus:outline-hidden focus:border-[#1E3A5F]"
            />
          </div>

          {/* Statement in Urdu */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-[#1A1918] font-semibold mb-1">
              دعویٰ کا متن (اردو) *
            </label>
            <input
              type="text"
              dir="rtl"
              value={statementUr}
              onChange={(e) => setStatementUr(e.target.value)}
              placeholder="مثال: بالائی قدیم سنگی دور کے نقوش خارجی علامتی یادداشت کا ثبوت ہیں..."
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918] focus:outline-hidden focus:border-[#1E3A5F]"
            />
          </div>

          {/* Chapter & Timestamp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] mb-1">
                Associated Chapter
              </label>
              <select
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs text-[#1A1918]"
              >
                {chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    Ch 0{ch.chapterNumber}: {ch.title.en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] mb-1">
                Source Timestamp Offset (e.g. MM:SS)
              </label>
              <input
                type="text"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="16:04"
                className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-mono text-[#1A1918]"
              />
            </div>
          </div>

          {/* Discipline & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] mb-1">
                Disciplinary Category
              </label>
              <select
                value={claimType}
                onChange={(e) => setClaimType(e.target.value as any)}
                className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs text-[#1A1918]"
              >
                <option value="historical">Historical</option>
                <option value="archaeological">Archaeological</option>
                <option value="astronomical">Astronomical / Physical</option>
                <option value="theological">Theological</option>
                <option value="linguistic">Linguistic</option>
                <option value="epigraphic">Epigraphic</option>
                <option value="cosmological">Cosmological</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] mb-1">
                Initial Epistemic Status (10-Tier)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs text-[#1A1918] font-medium"
              >
                <option value="unreviewed">1. Unreviewed</option>
                <option value="source_reported">2. Source Reported (Unverified)</option>
                <option value="primary_source_located">3. Primary Source Located</option>
                <option value="partially_verified">4. Partially Verified</option>
                <option value="verified">5. Verified</option>
                <option value="disputed">6. Disputed</option>
                <option value="unsupported">7. Unsupported</option>
                <option value="incorrect">8. Incorrect</option>
                <option value="interpretive">9. Interpretive</option>
                <option value="open_question">10. Open Question</option>
              </select>
            </div>
          </div>

          {/* Notice if Source Reported is chosen */}
          {status === 'source_reported' && (
            <div className="p-3 bg-amber-50 border border-amber-300 text-xs text-amber-950 font-serif flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0" />
              <span>
                Cardinal Archive Rule: Marking as &apos;Source Reported&apos; records what the source stated; it will NOT be presented to readers as verified empirical truth.
              </span>
            </div>
          )}

          {/* Original Source Quote */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] mb-1">
              Verbatim Source Statement / Quotation
            </label>
            <textarea
              rows={2}
              value={sourceQuotation}
              onChange={(e) => setSourceQuotation(e.target.value)}
              placeholder="Exact words or paraphrase spoken in video lecture / written in manuscript..."
              className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918]"
            />
          </div>

          {/* Epistemic Rationale */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] mb-1">
              Epistemic Rationale / Academic Justification
            </label>
            <textarea
              rows={2}
              value={rationaleEn}
              onChange={(e) => setRationaleEn(e.target.value)}
              placeholder="Why is this claim classified with this epistemic status? Cite methods or absence of proof..."
              className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918]"
            />
          </div>

          {/* Editorial Notes */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-[#878177] mb-1">
              Editorial Audit Notes
            </label>
            <textarea
              rows={2}
              value={editorialNotesEn}
              onChange={(e) => setEditorialNotesEn(e.target.value)}
              placeholder="Internal instructions for secondary literature searches, counter-evidence, etc..."
              className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918]"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-[#E6E1D6] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#E6E1D6] text-[#5C5751] hover:text-[#1A1918] text-xs font-sans font-medium rounded-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1A1918] hover:bg-[#2D2A26] text-white text-xs font-sans uppercase tracking-wider font-semibold rounded-xs cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save & Ingest Claim</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
