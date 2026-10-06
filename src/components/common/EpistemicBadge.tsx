import React from 'react';
import { EpistemicStatus } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';

interface EpistemicBadgeProps {
  status: EpistemicStatus;
  showDescription?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const EpistemicBadge: React.FC<EpistemicBadgeProps> = ({
  status,
  showDescription = false,
  interactive = false,
  onClick,
  className = ''
}) => {
  const { t } = useLanguage();
  const tier = t.epistemicTiers[status] || {
    label: String(status).replace(/_/g, ' '),
    description: ''
  };

  // Restrained Archival Palette with subtle borders
  const getStatusStyles = (st: EpistemicStatus) => {
    switch (st) {
      case 'verified':
        return {
          textColor: 'text-[#14532D]',
          borderColor: 'border-[#14532D]/30',
          dotColor: 'bg-[#14532D]',
          surface: 'bg-[#F0FDF4]'
        };
      case 'partially_verified':
        return {
          textColor: 'text-[#065F46]',
          borderColor: 'border-[#065F46]/30',
          dotColor: 'bg-[#065F46]',
          surface: 'bg-[#ECFDF5]'
        };
      case 'primary_source_located':
      case 'primary_source':
        return {
          textColor: 'text-[#1E3A5F]',
          borderColor: 'border-[#1E3A5F]/30',
          dotColor: 'bg-[#1E3A5F]',
          surface: 'bg-[#F0F4F9]'
        };
      case 'source_reported':
      case 'source_attested_unverified':
        return {
          textColor: 'text-[#475569]',
          borderColor: 'border-[#475569]/30',
          dotColor: 'bg-[#475569]',
          surface: 'bg-[#F8FAFC]'
        };
      case 'disputed':
        return {
          textColor: 'text-[#9A3412]',
          borderColor: 'border-[#9A3412]/30',
          dotColor: 'bg-[#9A3412]',
          surface: 'bg-[#FFF7ED]'
        };
      case 'unsupported':
      case 'incorrect':
        return {
          textColor: 'text-[#991B1B]',
          borderColor: 'border-[#991B1B]/30',
          dotColor: 'bg-[#991B1B]',
          surface: 'bg-[#FEF2F2]'
        };
      case 'open_question':
      case 'uncertain':
        return {
          textColor: 'text-[#854D0E]',
          borderColor: 'border-[#854D0E]/30',
          dotColor: 'bg-[#854D0E]',
          surface: 'bg-[#FEFCE8]'
        };
      case 'interpretive':
      case 'interpretation':
        return {
          textColor: 'text-[#831843]',
          borderColor: 'border-[#831843]/30',
          dotColor: 'bg-[#831843]',
          surface: 'bg-[#FDF2F8]'
        };
      case 'modern_scholarship':
        return {
          textColor: 'text-[#0F766E]',
          borderColor: 'border-[#0F766E]/30',
          dotColor: 'bg-[#0F766E]',
          surface: 'bg-[#F0FDFA]'
        };
      case 'editorial_analysis':
        return {
          textColor: 'text-[#3730A3]',
          borderColor: 'border-[#3730A3]/30',
          dotColor: 'bg-[#3730A3]',
          surface: 'bg-[#EEF2FF]'
        };
      case 'secondary_source':
        return {
          textColor: 'text-[#52525B]',
          borderColor: 'border-[#52525B]/30',
          dotColor: 'bg-[#52525B]',
          surface: 'bg-[#F4F4F5]'
        };
      case 'unreviewed':
      case 'source_material':
      default:
        return {
          textColor: 'text-[#57534E]',
          borderColor: 'border-[#D6D3D1]',
          dotColor: 'bg-[#78716C]',
          surface: 'bg-[#FAF8F5]'
        };
    }
  };

  const style = getStatusStyles(status);

  return (
    <span
      onClick={interactive ? onClick : undefined}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-sans font-medium uppercase tracking-wider border rounded-xs ${
        style.textColor
      } ${style.borderColor} ${style.surface} ${
        interactive ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''
      } ${className}`}
      title={tier.description}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dotColor}`} />
      <span>{tier.label}</span>
      {showDescription && (
        <span className="font-serif normal-case tracking-normal text-xs text-[#5C5751] ml-1">
          — {tier.description}
        </span>
      )}
    </span>
  );
};
