import React, { useState } from 'react';
import { AtlasNode, AtlasNodeType, RelationshipType, RelationshipEditorialStatus } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Layers,
  BookOpen,
  MapPin,
  Users,
  Scroll,
  Library,
  Landmark,
  Calendar,
  FileText
} from 'lucide-react';

interface AtlasFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: AtlasNode[];
  onSelectSearchResult: (nodeId: string) => void;

  selectedNodeTypes: Set<AtlasNodeType>;
  onToggleNodeType: (type: AtlasNodeType) => void;

  selectedRelationshipTypes: Set<RelationshipType>;
  onToggleRelationshipType: (type: RelationshipType) => void;

  selectedEditorialStatuses: Set<RelationshipEditorialStatus>;
  onToggleEditorialStatus: (status: RelationshipEditorialStatus) => void;

  onResetFilters: () => void;
  totalNodesCount: number;
  totalEdgesCount: number;
}

export const AtlasFilterBar: React.FC<AtlasFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectSearchResult,
  selectedNodeTypes,
  onToggleNodeType,
  selectedRelationshipTypes,
  onToggleRelationshipType,
  selectedEditorialStatuses,
  onToggleEditorialStatus,
  onResetFilters,
  totalNodesCount,
  totalEdgesCount
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const [isFilterPanelExpanded, setIsFilterPanelExpanded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const nodeTypesList: Array<{ type: AtlasNodeType; label: string; icon: any }> = [
    { type: 'chapter', label: isUrdu ? 'ابواب' : 'Chapters', icon: BookOpen },
    { type: 'claim', label: isUrdu ? 'دعوے' : 'Claims', icon: Layers },
    { type: 'primary_source', label: isUrdu ? 'بنیادی آثار' : 'Primary Artifacts', icon: Scroll },
    { type: 'source', label: isUrdu ? 'ثانوی کتب' : 'Monographs', icon: Library },
    { type: 'person', label: isUrdu ? 'شخصیات' : 'People', icon: Users },
    { type: 'place', label: isUrdu ? 'مقامات' : 'Places', icon: MapPin },
    { type: 'concept', label: isUrdu ? 'تصورات' : 'Concepts', icon: Sparkles },
    { type: 'civilization', label: isUrdu ? 'تہذیبیں' : 'Civilizations', icon: Landmark },
    { type: 'event', label: isUrdu ? 'واقعات' : 'Events', icon: Calendar },
    { type: 'text', label: isUrdu ? 'متون' : 'Texts', icon: FileText }
  ];

  const relationshipTypesList: Array<{ type: RelationshipType; label: string }> = [
    { type: 'contains', label: 'Contains' },
    { type: 'discusses', label: 'Discusses' },
    { type: 'supports', label: 'Supports' },
    { type: 'contradicts', label: 'Contradicts' },
    { type: 'references', label: 'References' },
    { type: 'located_in', label: 'Located In' },
    { type: 'associated_with', label: 'Associated With' },
    { type: 'part_of', label: 'Part Of' },
    { type: 'chronologically_precedes', label: 'Precedes' },
    { type: 'related_concept', label: 'Related Concept' }
  ];

  const editorialStatusesList: Array<{ status: RelationshipEditorialStatus; label: string }> = [
    { status: 'documented', label: isUrdu ? 'مصدقہ کتباتی (Documented)' : 'Documented in Artifacts' },
    { status: 'cited', label: isUrdu ? 'سائنسی کتب (Cited)' : 'Cited in Scholarship' },
    { status: 'proposed', label: isUrdu ? 'تحقیقی مفروضہ (Proposed)' : 'Editorial Hypothesis' },
    { status: 'disputed', label: isUrdu ? 'متنازعہ (Disputed)' : 'Disputed Connection' }
  ];

  const hasActiveFilters =
    selectedNodeTypes.size > 0 ||
    selectedRelationshipTypes.size > 0 ||
    selectedEditorialStatuses.size > 0;

  return (
    <div className="bg-white border border-[#E6E1D6] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top Search & Controls Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Prominent Search Bar with Dropdown */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-[#878177]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder={
              isUrdu
                ? 'اٹلس میں شخصیات، مقامات، ابواب، یا کائناتی تصورات تلاش کریں...'
                : 'Search people, places, claims, concepts, or ancient texts across the Atlas...'
            }
            className="w-full pl-9 pr-8 rtl:pl-8 rtl:pr-9 py-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs text-xs font-serif text-[#1A1918] placeholder-[#878177] focus:outline-hidden focus:border-[#1E3A5F]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 rtl:right-auto rtl:left-2.5 top-1/2 -translate-y-1/2 text-[#878177] hover:text-[#1A1918]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-[#E6E1D6] shadow-xl max-h-60 overflow-y-auto rounded-xs divide-y divide-[#F0ECE3]">
              {searchResults.slice(0, 8).map((node) => (
                <button
                  key={node.id}
                  onClick={() => {
                    onSelectSearchResult(node.id);
                    setIsSearchFocused(false);
                  }}
                  className="w-full p-2.5 text-left rtl:text-right hover:bg-[#FAF8F5] cursor-pointer flex items-center justify-between gap-2 text-xs"
                >
                  <div className="truncate">
                    <span className="font-serif font-medium text-[#1A1918] block truncate">
                      {node.label[language]}
                    </span>
                    <span className="font-mono text-[10px] text-[#878177]">
                      {node.type.replace(/_/g, ' ')} {node.dating ? `· ${node.dating}` : ''}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#1E3A5F] bg-[#1E3A5F]/10 px-1.5 py-0.5 rounded-xs shrink-0">
                    Focus Node
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Toggle and Metrics */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsFilterPanelExpanded(!isFilterPanelExpanded)}
            className={`px-3 py-2 text-xs font-sans font-medium rounded-xs cursor-pointer transition-colors flex items-center gap-1.5 border ${
              isFilterPanelExpanded || hasActiveFilters
                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                : 'bg-white border-[#E6E1D6] text-[#5C5751] hover:text-[#1A1918]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'فلٹرز و پیمانے' : 'Filters & Epistemics'}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#B8934A]" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="p-2 border border-[#E6E1D6] hover:bg-[#FAF8F5] text-[#878177] hover:text-[#1A1918] cursor-pointer rounded-xs"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="px-3 py-2 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xs font-mono text-[11px] text-[#5C5751] shrink-0">
            {totalNodesCount} nodes · {totalEdgesCount} edges
          </div>
        </div>
      </div>

      {/* Expanded Multi-Filter Section */}
      {isFilterPanelExpanded && (
        <div className="pt-4 border-t border-[#F0ECE3] space-y-4 text-xs font-sans">
          {/* Node Types Pills */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#878177] block mb-2 font-semibold">
              Filter by Node Entity Type:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {nodeTypesList.map((item) => {
                const isSelected = selectedNodeTypes.has(item.type);
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    onClick={() => onToggleNodeType(item.type)}
                    className={`px-2.5 py-1 rounded-xs font-medium cursor-pointer transition-colors flex items-center gap-1 text-[11px] border ${
                      isSelected
                        ? 'bg-[#1A1918] text-white border-[#1A1918]'
                        : 'bg-[#FAF8F5] text-[#5C5751] border-[#E6E1D6] hover:bg-white'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Relationship Provenance Status */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#878177] block mb-2 font-semibold">
              Filter by Relationship Provenance Standard:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {editorialStatusesList.map((item) => {
                const isSelected = selectedEditorialStatuses.has(item.status);
                return (
                  <button
                    key={item.status}
                    onClick={() => onToggleEditorialStatus(item.status)}
                    className={`px-2.5 py-1 rounded-xs font-medium cursor-pointer transition-colors text-[11px] border ${
                      isSelected
                        ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                        : 'bg-[#FAF8F5] text-[#5C5751] border-[#E6E1D6] hover:bg-white'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Relationship Types Pills */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#878177] block mb-2 font-semibold">
              Filter by Relationship Classification:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {relationshipTypesList.map((item) => {
                const isSelected = selectedRelationshipTypes.has(item.type);
                return (
                  <button
                    key={item.type}
                    onClick={() => onToggleRelationshipType(item.type)}
                    className={`px-2.5 py-1 rounded-xs font-medium cursor-pointer transition-colors text-[11px] border ${
                      isSelected
                        ? 'bg-[#B8934A] text-stone-900 border-[#B8934A] font-bold'
                        : 'bg-[#FAF8F5] text-[#5C5751] border-[#E6E1D6] hover:bg-white'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
