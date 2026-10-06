import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  BookOpen,
  Layers,
  Scroll,
  Library,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  Landmark,
  FileText
} from 'lucide-react';

interface AtlasLegendProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AtlasLegend: React.FC<AtlasLegendProps> = ({ isOpen, onToggle }) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const nodeTypes = [
    { type: 'chapter', label: isUrdu ? 'باب (Chapter)' : 'Chapter', icon: BookOpen, color: '#1E3A5F', bg: 'bg-[#1E3A5F]' },
    { type: 'claim', label: isUrdu ? 'دعویٰ (Claim)' : 'Claim', icon: Layers, color: '#B8934A', bg: 'bg-[#B8934A]' },
    { type: 'primary_source', label: isUrdu ? 'بنیادی آثار (Primary Source)' : 'Primary Artifact', icon: Scroll, color: '#947230', bg: 'bg-[#947230]' },
    { type: 'source', label: isUrdu ? 'ثانوی ماخذ (Source/Monograph)' : 'Secondary Monograph', icon: Library, color: '#5C5751', bg: 'bg-[#5C5751]' },
    { type: 'person', label: isUrdu ? 'شخصیت (Person)' : 'Person', icon: Users, color: '#4A5568', bg: 'bg-[#4A5568]' },
    { type: 'place', label: isUrdu ? 'مقام (Place)' : 'Excavation Site / Place', icon: MapPin, color: '#2C7A7B', bg: 'bg-[#2C7A7B]' },
    { type: 'concept', label: isUrdu ? 'تصور (Concept)' : 'Epistemic Concept', icon: Sparkles, color: '#6B46C1', bg: 'bg-[#6B46C1]' },
    { type: 'civilization', label: isUrdu ? 'تہذیب (Civilization)' : 'Civilization', icon: Landmark, color: '#9C4221', bg: 'bg-[#9C4221]' },
    { type: 'event', label: isUrdu ? 'واقعہ (Event)' : 'Historical Event', icon: Calendar, color: '#744210', bg: 'bg-[#744210]' },
    { type: 'text', label: isUrdu ? 'کلاسیکی متن (Text)' : 'Canonical Text', icon: FileText, color: '#805AD5', bg: 'bg-[#805AD5]' }
  ];

  const relationshipStyles = [
    { label: isUrdu ? 'مصدقہ / دستاویزی ربط' : 'Documented (Inscriptions / Physical Proof)', style: 'border-solid border-[#1E3A5F]', note: 'Direct empirical witness' },
    { label: isUrdu ? 'سائنسی حوالے سے ثابت' : 'Cited in Academic Literature', style: 'border-solid border-[#5C5751]', note: 'Peer-reviewed consensus' },
    { label: isUrdu ? 'ادارتی تحقیقی مفروضہ' : 'Proposed Research Hypothesis', style: 'border-dashed border-amber-600', note: 'Under investigation' },
    { label: isUrdu ? 'متنازعہ / متضاد تعلق' : 'Disputed / Contradicting', style: 'border-dashed border-rose-600', note: 'Active scholarly debate' }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-4 left-4 z-20 max-w-sm w-full bg-white/95 backdrop-blur-xs border border-[#E6E1D6] p-4 shadow-lg text-xs font-serif rounded-xs">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F0ECE3]">
        <span className="font-sans font-bold uppercase tracking-wider text-[11px] text-[#1A1918]">
          {isUrdu ? 'علمیاتی علامات اور مفاہیم' : 'Atlas Visual Legend'}
        </span>
        <button
          onClick={onToggle}
          className="text-[#878177] hover:text-[#1A1918] cursor-pointer text-xs"
        >
          ✕
        </button>
      </div>

      {/* Nodes grid */}
      <div className="mb-4">
        <span className="text-[10px] font-mono uppercase text-[#878177] block mb-2 font-semibold">
          {isUrdu ? 'اداروں کی اقسام (Node Types)' : 'Entity Node Classifications'}
        </span>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px]">
          {nodeTypes.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.type} className="flex items-center gap-1.5 truncate">
                <span className={`w-3.5 h-3.5 rounded-full ${item.bg} flex items-center justify-center shrink-0 text-white text-[8px]`}>
                  <Icon className="w-2.5 h-2.5" />
                </span>
                <span className="truncate text-[#2D2A26]">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Relationships */}
      <div className="pt-2 border-t border-[#F0ECE3]">
        <span className="text-[10px] font-mono uppercase text-[#878177] block mb-2 font-semibold">
          {isUrdu ? 'روابط کی نوعیت (Relationship Provenance)' : 'Relationship Epistemic Provenance'}
        </span>
        <div className="space-y-1.5 text-[11px]">
          {relationshipStyles.map((rel, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`w-5 border-t-2 ${rel.style} shrink-0`} />
                <span className="text-[#2D2A26] truncate">{rel.label}</span>
              </div>
              <span className="text-[10px] font-mono text-[#878177] shrink-0">{rel.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
