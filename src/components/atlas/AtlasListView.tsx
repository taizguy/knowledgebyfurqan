import React, { useState } from 'react';
import { AtlasNode, Relationship, LanguageCode } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { AtlasService } from '../../services/atlasService';
import { EpistemicBadge } from '../common/EpistemicBadge';
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
  FileText,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AtlasListViewProps {
  nodes: AtlasNode[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onFocusNodeInGraph: (nodeId: string) => void;
}

export const AtlasListView: React.FC<AtlasListViewProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  onFocusNodeInGraph
}) => {
  const { language } = useLanguage();
  const { navigateToChapter, navigateToClaim, navigateToEntity } = useNavigation();
  const isUrdu = language === 'ur';

  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set(selectedNodeId ? [selectedNodeId] : []));

  const toggleExpand = (id: string) => {
    setExpandedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getNodeIcon = (type: AtlasNode['type']) => {
    switch (type) {
      case 'chapter': return BookOpen;
      case 'claim': return Layers;
      case 'primary_source': return Scroll;
      case 'source': return Library;
      case 'person': return Users;
      case 'place': return MapPin;
      case 'concept': return Sparkles;
      case 'civilization': return Landmark;
      case 'event': return Calendar;
      case 'text': return FileText;
      default: return BookOpen;
    }
  };

  // Group nodes by entity type
  const groupedNodes = nodes.reduce<Record<string, AtlasNode[]>>((acc, node) => {
    acc[node.type] = acc[node.type] || [];
    acc[node.type].push(node);
    return acc;
  }, {});

  const typeLabels: Record<string, { en: string; ur: string }> = {
    chapter: { en: 'Chapters', ur: 'ابواب' },
    claim: { en: 'Research Claims', ur: 'تحقیقی دعوے' },
    primary_source: { en: 'Primary Artifacts & Inscriptions', ur: 'بنیادی آثار و کتبات' },
    source: { en: 'Secondary Sources & Academic Monographs', ur: 'ثانوی سائنسی کتب' },
    person: { en: 'Historical People', ur: 'شخصیات' },
    place: { en: 'Geographic Places & Excavation Sites', ur: 'مقامات و کھدائی کے مقامات' },
    concept: { en: 'Thematic & Epistemic Concepts', ur: 'علمی و فلسفیانہ تصورات' },
    civilization: { en: 'Civilizations & Dynastic Epochs', ur: 'تہذیبیں' },
    event: { en: 'Key Historical Events', ur: 'تاریخی واقعات' },
    text: { en: 'Canonical Texts & Epigraphic Panels', ur: 'کلاسیکی متون' }
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedNodes).map(([typeKey, typeNodes]) => {
        const title = typeLabels[typeKey] || { en: typeKey, ur: typeKey };
        const Icon = getNodeIcon(typeKey as any);

        return (
          <div key={typeKey} className="bg-white border border-[#E6E1D6] shadow-xs">
            {/* Group Header */}
            <div className="p-4 bg-[#FAF8F5] border-b border-[#E6E1D6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[#1E3A5F] text-white rounded-xs">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <h3 className="font-serif font-medium text-base text-[#1A1918]">
                  {title[language]}
                </h3>
              </div>
              <span className="font-mono text-xs text-[#878177]">
                {typeNodes.length} items
              </span>
            </div>

            {/* Nodes list */}
            <div className="divide-y divide-[#F0ECE3]">
              {typeNodes.map((node) => {
                const isExpanded = expandedNodeIds.has(node.id);
                const isSelected = selectedNodeId === node.id;
                const { outgoing, incoming } = AtlasService.getEntityConnections(node.id);

                return (
                  <div
                    key={node.id}
                    className={`p-4 transition-colors ${
                      isSelected ? 'bg-amber-50/20' : 'hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {node.epistemicStatus && (
                            <EpistemicBadge status={node.epistemicStatus} />
                          )}
                          <span className="font-mono text-[10px] text-[#878177]">
                            {node.id}
                          </span>
                          {node.dating && (
                            <span className="font-mono text-[10px] text-[#5C5751]">
                              · {node.dating}
                            </span>
                          )}
                        </div>

                        <h4 className="font-serif font-medium text-base text-[#1A1918]">
                          {node.label[language]}
                        </h4>

                        {node.subtitle && (
                          <p className="font-sans text-xs text-[#878177] italic truncate">
                            {node.subtitle[language]}
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onFocusNodeInGraph(node.id)}
                          className="px-2.5 py-1 text-xs font-sans text-[#1E3A5F] hover:bg-[#1E3A5F]/10 border border-[#1E3A5F]/30 rounded-xs cursor-pointer flex items-center gap-1 font-medium"
                        >
                          <span>{isUrdu ? 'نقشے میں دیکھیں' : 'View in Graph'}</span>
                        </button>

                        <button
                          onClick={() => toggleExpand(node.id)}
                          className="p-1.5 text-[#5C5751] hover:text-[#1A1918] border border-[#E6E1D6] rounded-xs cursor-pointer"
                          title="Show relationships"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Relationships view */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-[#F0ECE3] space-y-2 text-xs">
                        {node.description && (
                          <p className="font-serif text-[#5C5751] leading-relaxed mb-3">
                            {node.description[language]}
                          </p>
                        )}

                        <span className="font-mono text-[10px] uppercase text-[#878177] block font-semibold">
                          Recorded Connections ({outgoing.length + incoming.length}):
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {outgoing.map((rel) => (
                            <button
                              key={rel.relationship.id}
                              onClick={() => onSelectNode(rel.targetNode.id)}
                              className="p-2 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] text-left rtl:text-right rounded-xs cursor-pointer text-[11px]"
                            >
                              <span className="font-mono text-[9px] text-[#878177] uppercase block">
                                → {rel.relationship.type.replace(/_/g, ' ')}
                              </span>
                              <span className="font-serif font-medium text-[#1A1918] block truncate">
                                {rel.targetNode.label[language]}
                              </span>
                            </button>
                          ))}

                          {incoming.map((rel) => (
                            <button
                              key={rel.relationship.id}
                              onClick={() => onSelectNode(rel.sourceNode.id)}
                              className="p-2 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] text-left rtl:text-right rounded-xs cursor-pointer text-[11px]"
                            >
                              <span className="font-mono text-[9px] text-[#878177] uppercase block">
                                ← {rel.relationship.type.replace(/_/g, ' ')} by
                              </span>
                              <span className="font-serif font-medium text-[#1A1918] block truncate">
                                {rel.sourceNode.label[language]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
