import React from 'react';
import { AtlasNode, Relationship } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { DataService } from '../../services/dataService';
import { AtlasService } from '../../services/atlasService';
import { EpistemicBadge } from '../common/EpistemicBadge';
import {
  X,
  ChevronLeft,
  ArrowRight,
  ExternalLink,
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
  Clock,
  ShieldAlert,
  Compass
} from 'lucide-react';

interface EntityDetailPanelProps {
  node: AtlasNode | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  onExpandNode: (nodeId: string) => void;
  historyStack: string[];
  onBack: () => void;
}

export const EntityDetailPanel: React.FC<EntityDetailPanelProps> = ({
  node,
  onClose,
  onSelectNode,
  onExpandNode,
  historyStack,
  onBack
}) => {
  const { language } = useLanguage();
  const { navigateToChapter, navigateToClaim, navigateToEntity, navigateToTimeline } = useNavigation();
  const isUrdu = language === 'ur';

  if (!node) return null;

  // Retrieve incoming and outgoing connections
  const { outgoing, incoming } = AtlasService.getEntityConnections(node.id);

  // Retrieve underlying domain object
  const getDomainObject = () => {
    switch (node.type) {
      case 'chapter':
        return DataService.getChapterByIdOrSlug(node.entityId);
      case 'claim':
        return DataService.getClaimByIdOrSlug(node.entityId);
      case 'primary_source':
        return DataService.getPrimarySourceById(node.entityId);
      case 'source':
        return DataService.getSourceById(node.entityId);
      case 'person':
        return DataService.getPersonByIdOrSlug(node.entityId);
      case 'place':
        return DataService.getPlaceByIdOrSlug(node.entityId);
      case 'concept':
        return DataService.getConceptByIdOrSlug(node.entityId);
      case 'civilization':
        return DataService.getCivilizationByIdOrSlug(node.entityId);
      case 'text':
        return DataService.getTextByIdOrSlug(node.entityId);
      case 'event':
        return DataService.getEventByIdOrSlug(node.entityId);
      default:
        return null;
    }
  };

  const domainData: any = getDomainObject();

  // Navigation action to full detail page
  const handleOpenFullPage = () => {
    if (node.type === 'chapter' && domainData?.slug) {
      navigateToChapter(domainData.slug);
    } else if (node.type === 'claim') {
      navigateToClaim(node.entityId);
    } else if (node.type === 'person') {
      navigateToEntity('people', node.entityId);
    } else if (node.type === 'place') {
      navigateToEntity('places', node.entityId);
    } else if (node.type === 'concept') {
      navigateToEntity('concepts', node.entityId);
    } else if (node.type === 'source' || node.type === 'primary_source') {
      navigateToEntity('sources', node.entityId);
    } else if (node.type === 'event') {
      navigateToTimeline(node.entityId);
    }
  };

  // Node type icon helper
  const getNodeTypeIcon = (type: AtlasNode['type']) => {
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

  const TypeIcon = getNodeTypeIcon(node.type);

  return (
    <div className="w-full lg:w-96 bg-white border border-[#E6E1D6] shadow-xl flex flex-col h-full max-h-[680px] overflow-hidden rounded-xs shrink-0">
      {/* Panel Header */}
      <div className="p-4 bg-[#FAF8F5] border-b border-[#E6E1D6] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {historyStack.length > 1 && (
            <button
              onClick={onBack}
              className="p-1 text-[#5C5751] hover:text-[#1A1918] cursor-pointer"
              title="Return to previous selection"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
          )}
          <span className="p-1 bg-[#1E3A5F] text-white rounded-xs">
            <TypeIcon className="w-3.5 h-3.5" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#878177]">
            {node.type.replace(/_/g, ' ')}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-[#878177] hover:text-[#1A1918] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Panel Scrollable Body */}
      <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
        {/* Title and Subtitle */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            {node.epistemicStatus && (
              <EpistemicBadge status={node.epistemicStatus} />
            )}
            {node.dating && (
              <span className="font-mono text-[10px] text-[#878177]">
                {node.dating}
              </span>
            )}
          </div>

          <h3 className="text-lg font-serif font-medium text-[#1A1918] leading-snug">
            {node.label[language]}
          </h3>

          {node.subtitle && (
            <p className="font-sans text-[11px] text-[#878177] mt-1 italic">
              {node.subtitle[language]}
            </p>
          )}
        </div>

        {/* Description / Summary */}
        {node.description && (
          <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs font-serif leading-relaxed text-[#2D2A26]">
            {node.description[language]}
          </div>
        )}

        {/* Type Specific Fields */}
        {node.type === 'claim' && domainData && (
          <div className="space-y-2 border-t border-[#F0ECE3] pt-3 font-serif">
            <span className="text-[10px] font-mono uppercase text-[#878177] block font-semibold">
              Epistemic Appraisal
            </span>
            <div className="p-2.5 bg-amber-50/50 border border-amber-200/60 rounded-xs text-[#2D2A26]">
              <strong>Rationale: </strong>
              {domainData.epistemicRationale?.[language]}
            </div>
            {domainData.timestamp && (
              <div className="font-mono text-[11px] text-[#1E3A5F] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Timestamp: {domainData.timestamp}</span>
              </div>
            )}
          </div>
        )}

        {node.type === 'chapter' && domainData && (
          <div className="space-y-2 border-t border-[#F0ECE3] pt-3 text-xs font-sans">
            <span className="text-[10px] font-mono uppercase text-[#878177] block font-semibold">
              Archival Source Information
            </span>
            <div className="text-[11px] text-[#5C5751] space-y-1">
              <div>Creator: <strong>{domainData.originalSourceCreator}</strong></div>
              <div>Published: {domainData.publicationDate} · {domainData.duration}</div>
              <div className="font-mono text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded-xs inline-block">
                {domainData.researchStatus}
              </div>
            </div>
          </div>
        )}

        {/* Direct Connections / Relationships */}
        <div className="border-t border-[#F0ECE3] pt-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#878177] font-semibold">
              Archival Connections ({outgoing.length + incoming.length})
            </span>
            <button
              onClick={() => onExpandNode(node.id)}
              className="text-[#1E3A5F] hover:underline font-sans text-[11px] font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#B8934A]" />
              <span>Expand in Graph</span>
            </button>
          </div>

          {/* Outgoing relationships */}
          {outgoing.length > 0 && (
            <div className="space-y-1.5">
              {outgoing.map((item) => (
                <button
                  key={item.relationship.id}
                  onClick={() => onSelectNode(item.targetNode.id)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] text-left rtl:text-right rounded-xs cursor-pointer transition-colors flex items-center justify-between gap-2 group"
                >
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-[#878177] uppercase block">
                      → {item.relationship.type.replace(/_/g, ' ')}
                    </span>
                    <span className="font-serif font-medium text-xs text-[#1A1918] group-hover:text-[#1E3A5F] truncate block">
                      {item.targetNode.label[language]}
                    </span>
                  </div>
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-xs shrink-0 ${
                    item.relationship.editorialStatus === 'documented'
                      ? 'bg-blue-50 text-blue-900'
                      : item.relationship.editorialStatus === 'cited'
                      ? 'bg-stone-100 text-stone-800'
                      : item.relationship.editorialStatus === 'proposed'
                      ? 'bg-amber-50 text-amber-900'
                      : 'bg-rose-50 text-rose-900'
                  }`}>
                    {item.relationship.editorialStatus}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Incoming relationships */}
          {incoming.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {incoming.map((item) => (
                <button
                  key={item.relationship.id}
                  onClick={() => onSelectNode(item.sourceNode.id)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#E6E1D6] hover:border-[#1E3A5F] text-left rtl:text-right rounded-xs cursor-pointer transition-colors flex items-center justify-between gap-2 group"
                >
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-[#878177] uppercase block">
                      ← {item.relationship.type.replace(/_/g, ' ')} by
                    </span>
                    <span className="font-serif font-medium text-xs text-[#1A1918] group-hover:text-[#1E3A5F] truncate block">
                      {item.sourceNode.label[language]}
                    </span>
                  </div>
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-xs shrink-0 ${
                    item.relationship.editorialStatus === 'documented'
                      ? 'bg-blue-50 text-blue-900'
                      : 'bg-stone-100 text-stone-800'
                  }`}>
                    {item.relationship.editorialStatus}
                  </span>
                </button>
              ))}
            </div>
          )}

          {outgoing.length === 0 && incoming.length === 0 && (
            <p className="text-xs font-serif text-[#878177] italic">
              No recorded connections cataloged in this branch.
            </p>
          )}
        </div>
      </div>

      {/* Panel Footer Action */}
      <div className="p-3 bg-[#FAF8F5] border-t border-[#E6E1D6] flex items-center justify-between gap-2 shrink-0">
        <button
          onClick={handleOpenFullPage}
          className="w-full py-2 px-3 bg-[#1A1918] hover:bg-[#2D2A26] text-white text-xs font-sans uppercase tracking-wider font-semibold rounded-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>{isUrdu ? 'مکمل صفحہ کھولیے' : 'Open Complete Record'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
};
