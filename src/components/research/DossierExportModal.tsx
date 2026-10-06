import React, { useState } from 'react';
import { Claim, Chapter, Source, PrimarySource } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import { DataService } from '../../services/dataService';
import { X, Copy, Check, Download, FileCode, FileText, BookOpen } from 'lucide-react';

interface DossierExportModalProps {
  claim?: Claim | null;
  chapter?: Chapter | null;
  onClose: () => void;
}

export const DossierExportModal: React.FC<DossierExportModalProps> = ({
  claim,
  chapter,
  onClose
}) => {
  const { language } = useLanguage();
  const [format, setFormat] = useState<'json' | 'markdown' | 'bibtex'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!claim && !chapter) return null;

  const targetTitle = claim ? claim.statement.en : (chapter ? chapter.title.en : 'Dossier');

  // Generate Export Content
  const generateExportText = (): string => {
    if (format === 'json') {
      if (claim) {
        return JSON.stringify(
          {
            archive: '40,000 Years of Knowledge',
            epistemicStandard: '10-Tier Demarcation Framework',
            exportDate: new Date().toISOString(),
            claim
          },
          null,
          2
        );
      } else if (chapter) {
        const chapterClaims = DataService.getClaims().filter(
          (c) => c.chapterId === chapter.id || chapter.claimIds.includes(c.id)
        );
        return JSON.stringify(
          {
            archive: '40,000 Years of Knowledge',
            chapter,
            claims: chapterClaims
          },
          null,
          2
        );
      }
    }

    if (format === 'markdown') {
      if (claim) {
        return `---
title: "${claim.statement.en}"
id: "${claim.id}"
status: "${claim.status}"
confidence: "${claim.confidenceRating}"
discipline: "${claim.claimType}"
timestamp: "${claim.timestamp || 'N/A'}"
dateExported: "${new Date().toISOString().split('T')[0]}"
archive: "40,000 Years of Knowledge Research Archive"
---

# Research Claim Dossier: ${claim.id}

## Statement
**English**: ${claim.statement.en}
**Urdu**: ${claim.statement.ur}

## Epistemic Classification
- **Status**: ${claim.status.toUpperCase()}
- **Consensus Rating**: ${claim.confidenceRating}
- **Epistemic Rationale**: ${claim.epistemicRationale.en}

${
  claim.status === 'source_reported'
    ? `> ⚠️ **ARCHIVAL NOTICE**: This claim is classified as *Source Reported*. Attestation in source media does not constitute empirical verification.\n`
    : ''
}

## 4-Part Archive Demarcation Dissection
1. **Source Asserts**: ${claim.archiveDissection?.sourceSays.en || 'Recorded in lecture'}
2. **Primary Evidence Indicates**: ${claim.archiveDissection?.primaryEvidenceIndicates.en || 'None located'}
3. **Modern Scholarship Concludes**: ${claim.archiveDissection?.modernScholarshipConcludes.en || 'Under peer evaluation'}
4. **Editorial Assessment**: ${claim.archiveDissection?.editorialAssessment.en || 'Preliminary archival record'}

## Supporting Evidence
${(claim.supportingEvidence || [])
  .map((e, idx) => `${idx + 1}. ${e.en}`)
  .join('\n') || '_None recorded_'}

## Contradicting Evidence / Caveats
${(claim.contradictingEvidence || [])
  .map((e, idx) => `${idx + 1}. ${e.en}`)
  .join('\n') || '_None recorded_'}

## Editorial Notes
${claim.editorialNotes?.en || '_No editorial notes provided_'}

## Attached Primary Artifacts
${claim.primarySourceIds.length > 0 ? claim.primarySourceIds.map((id) => `- \`${id}\``).join('\n') : '_None_'}

## Attached Secondary Sources
${claim.secondarySourceIds.length > 0 ? claim.secondarySourceIds.map((id) => `- \`${id}\``).join('\n') : '_None_'}
`;
      } else if (chapter) {
        return `# Archival Project Dossier: Chapter 0${chapter.chapterNumber} — ${chapter.title.en}

- **Collection**: 40,000 Years of Knowledge
- **Creator/Source**: ${chapter.originalSourceCreator || 'Furqan Qureshi Blogs'}
- **Original Source URL**: ${chapter.originalSourceUrl}
- **Publication Date**: ${chapter.publicationDate}
- **Editorial Status**: ${chapter.researchStatus}

## Abstract
${chapter.abstract.en}

## Methodological Notice
${chapter.methodologicalNotice?.en || 'Source metadata preserved line-by-line.'}
`;
      }
    }

    if (format === 'bibtex') {
      if (claim) {
        return `@misc{archival_claim_${claim.id.replace(/[^a-zA-Z0-9]/g, '_')},
  title = {${claim.statement.en}},
  author = {40,000 Years of Knowledge Editorial Archive},
  year = {${new Date().getFullYear()}},
  note = {Status: ${claim.status}; Consensus: ${claim.confidenceRating}; Timestamp: ${claim.timestamp || 'N/A'}},
  url = {https://40k-knowledge.archive/research?claim=${claim.id}}
}`;
      } else if (chapter) {
        return `@incollection{qureshi_${chapter.slug.replace(/[^a-zA-Z0-9]/g, '_')},
  title = {${chapter.title.en}},
  author = {${chapter.originalSourceCreator || 'Furqan Qureshi'}},
  booktitle = {40,000 Years of Knowledge Archive},
  year = {2022},
  url = {${chapter.originalSourceUrl}}
}`;
      }
    }

    return '';
  };

  const exportText = generateExportText();

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(exportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const extension = format === 'json' ? 'json' : format === 'bibtex' ? 'bib' : 'md';
    const filename = `${claim ? claim.id : chapter ? chapter.slug : 'dossier'}.${extension}`;
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#E6E1D6] max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-[#E6E1D6] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#878177]">
              Research Dossier Exporter
            </span>
            <h3 className="text-base font-serif font-medium text-[#1A1918] truncate max-w-md">
              {targetTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#878177] hover:text-[#1A1918] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="px-5 py-3 border-b border-[#F0ECE3] bg-white flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-1">
            <span className="text-[#878177] mr-2">Format:</span>
            <button
              onClick={() => setFormat('markdown')}
              className={`px-3 py-1 font-medium cursor-pointer rounded-xs ${
                format === 'markdown'
                  ? 'bg-[#1E3A5F] text-white'
                  : 'bg-[#FAF8F5] text-[#5C5751] hover:bg-[#F0ECE3]'
              }`}
            >
              Markdown (.md)
            </button>
            <button
              onClick={() => setFormat('json')}
              className={`px-3 py-1 font-medium cursor-pointer rounded-xs ${
                format === 'json'
                  ? 'bg-[#1E3A5F] text-white'
                  : 'bg-[#FAF8F5] text-[#5C5751] hover:bg-[#F0ECE3]'
              }`}
            >
              JSON (.json)
            </button>
            <button
              onClick={() => setFormat('bibtex')}
              className={`px-3 py-1 font-medium cursor-pointer rounded-xs ${
                format === 'bibtex'
                  ? 'bg-[#1E3A5F] text-white'
                  : 'bg-[#FAF8F5] text-[#5C5751] hover:bg-[#F0ECE3]'
              }`}
            >
              BibTeX (.bib)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 border border-[#E6E1D6] hover:bg-[#FAF8F5] text-[#1A1918] font-medium cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-[#1A1918] hover:bg-[#2D2A26] text-white font-medium cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content Preview */}
        <div className="p-5 flex-1 overflow-y-auto bg-[#1A1918] text-[#F5F1EA] font-mono text-xs leading-relaxed selection:bg-[#B8934A]">
          <pre className="whitespace-pre-wrap">{exportText}</pre>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#E6E1D6] text-[11px] font-sans text-[#878177] flex items-center justify-between">
          <span>Standards-compliant machine-readable archival format</span>
          <button
            onClick={onClose}
            className="text-[#1E3A5F] hover:underline font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
