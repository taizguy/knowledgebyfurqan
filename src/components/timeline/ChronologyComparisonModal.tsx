import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Event, AlternativeDateProposal } from '../../types/entities';
import {
  formatSignedYear,
  calculateYearSpan
} from '../../utils/chronology';
import {
  X,
  GitCompare,
  AlertTriangle,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

interface ChronologyComparisonModalProps {
  event: Event | null;
  onClose: () => void;
}

export const ChronologyComparisonModal: React.FC<ChronologyComparisonModalProps> = ({
  event,
  onClose
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  if (!event) return null;

  const proposals: AlternativeDateProposal[] = event.historicalDate?.alternativeDates || [];

  // Calculate chronological extremes to draw comparison timeline track
  const allYears = proposals.flatMap((p) => [p.earliestYear, p.latestYear]);
  if (allYears.length === 0) {
    allYears.push(event.historicalDate?.earliestYear || 0, event.historicalDate?.latestYear || 0);
  }

  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  const totalRangeYears = Math.max(1, calculateYearSpan(minYear, maxYear));

  // Helper to map year to percentage along comparison track
  const yearToPct = (yr: number): number => {
    if (minYear === maxYear) return 50;
    const offset = calculateYearSpan(minYear, yr);
    return Math.min(100, Math.max(0, (offset / totalRangeYears) * 100));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white border border-[#E6E1D6] max-w-4xl w-full shadow-2xl rounded-xs overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E1D6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#8B261E] text-white rounded-xs">
              <GitCompare className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
                Scholarly Chronology Matrix · Epistemic Divergence
              </span>
              <h3 className="text-base sm:text-lg font-serif font-medium text-[#1A1918]">
                {isUrdu ? 'موازنہ تواریخ و اختلافی آراء' : 'Chronology Comparison & Competing Proposals'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#878177] hover:text-[#1A1918] hover:bg-[#E6E1D6]/50 rounded-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Target Event Context */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs space-y-2">
            <span className="text-[10px] font-mono text-[#878177] uppercase tracking-wider">
              Investigated Historical Threshold
            </span>
            <h4 className="text-lg font-serif font-medium text-[#1A1918]">
              {event.title[language]}
            </h4>
            <p className="text-xs font-serif text-[#5C5751] leading-relaxed">
              {event.summary ? event.summary[language] : event.description[language]}
            </p>
          </div>

          {/* Core Archival Rule Callout */}
          <div className="p-3 bg-amber-50 border border-amber-300 text-xs text-amber-950 font-serif rounded-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong>{isUrdu ? 'آرکائیو کا اصولی منشور: ' : 'Archival Demarcation Principle: '}</strong>
              {isUrdu
                ? 'متضاد تواریخ کے اوسط نکالنے سے کبھی بھی سچی تاریخ نہیں بنتی۔ ہم اختلافی تجاویز کو مٹانے کی بجائے ان کے محققین اور دلائل کے ساتھ الگ الگ محفوظ رکھتے ہیں۔'
                : 'Scholarly conflicts are never resolved by artificially averaging competing dates. The archive preserves each proposal with its distinct evidentiary pedigree.'}
            </div>
          </div>

          {/* Comparative Horizontal Spans Visualization */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#878177]">
              <span>{formatSignedYear(minYear, language)}</span>
              <span className="text-[10px] uppercase tracking-wider">
                Total Divergence Span: ~{totalRangeYears.toLocaleString()} {isUrdu ? 'سال' : 'years'}
              </span>
              <span>{formatSignedYear(maxYear, language)}</span>
            </div>

            {/* Visual Bars Container */}
            <div className="space-y-3 p-4 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs">
              {proposals.map((prop, idx) => {
                const leftPct = yearToPct(prop.earliestYear);
                const rightPct = yearToPct(prop.latestYear);
                const widthPct = Math.max(3, rightPct - leftPct);
                const isConsensus = prop.confidence === 'high';

                return (
                  <div key={prop.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-serif">
                      <span className="font-medium text-[#1A1918]">
                        {idx + 1}. {prop.proposalName[language]}
                      </span>
                      <span className="font-mono text-[#1E3A5F] text-[11px]">
                        {prop.displayLabel[language]}
                      </span>
                    </div>

                    <div className="h-6 w-full bg-white border border-[#E6E1D6] rounded-2xs relative overflow-hidden flex items-center">
                      <div
                        style={{
                          left: `${leftPct}%`,
                          width: `${widthPct}%`
                        }}
                        className={`absolute h-4 rounded-2xs flex items-center px-2 transition-all ${
                          isConsensus
                            ? 'bg-[#1E3A5F] text-white'
                            : 'bg-[#B8934A] text-white'
                        }`}
                      >
                        <span className="truncate text-[9px] font-mono">
                          {formatSignedYear(prop.earliestYear, language)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Side-by-Side Proposal Dossiers */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#878177]">
              {isUrdu ? 'تجاویز کی تفصیلی وجوہات اور بنیاد' : 'Proposals Evidentiary Breakdown'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {proposals.map((prop) => (
                <div
                  key={prop.id}
                  className="p-4 bg-white border border-[#E6E1D6] rounded-xs space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-[#F0ECE3] pb-2">
                    <h5 className="font-serif font-semibold text-sm text-[#1A1918]">
                      {prop.proposalName[language]}
                    </h5>
                    <span className="font-mono text-xs font-bold text-[#1E3A5F]">
                      {prop.displayLabel[language]}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs font-sans text-[#5C5751]">
                    <div>
                      <strong className="text-[#1A1918]">Proponent / Source: </strong>
                      <span>{prop.proponentOrSource[language]}</span>
                    </div>

                    <div>
                      <strong className="text-[#1A1918]">Dating Methodology: </strong>
                      <span className="capitalize">{prop.datingMethod?.replace('_', ' ') || 'Stratigraphic'}</span>
                    </div>

                    <div className="pt-1 font-serif leading-relaxed text-[#2D2A26]">
                      {prop.basis[language]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E6E1D6] flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1A1918] text-white text-xs font-sans font-medium rounded-xs hover:bg-[#2D2A26] cursor-pointer shadow-xs"
          >
            {isUrdu ? 'بند کریں' : 'Close Comparison'}
          </button>
        </div>
      </div>
    </div>
  );
};
