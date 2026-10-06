import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import {
  AtlasNode,
  AtlasNodeType,
  Relationship,
  RelationshipType,
  RelationshipEditorialStatus
} from '../../types/entities';
import { AtlasService } from '../../services/atlasService';
import { AtlasGraphCanvas } from './AtlasGraphCanvas';
import { EntityDetailPanel } from './EntityDetailPanel';
import { AtlasFilterBar } from './AtlasFilterBar';
import { AtlasListView } from './AtlasListView';
import { AtlasLegend } from './AtlasLegend';
import {
  Compass,
  Network,
  List,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
  Info
} from 'lucide-react';

export const KnowledgeAtlas: React.FC = () => {
  const { language } = useLanguage();
  const { route } = useNavigation();
  const isUrdu = language === 'ur';

  // View mode: 'graph' or 'list'
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');

  // Currently loaded graph nodes and edges
  const [graphData, setGraphData] = useState<{ nodes: AtlasNode[]; edges: Relationship[] }>(() => {
    return AtlasService.getInitialCluster('ch-01-universe-seven-skies');
  });

  // Selected Node ID & Navigation History Stack
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('ch-01-universe-seven-skies');
  const [historyStack, setHistoryStack] = useState<string[]>(['ch-01-universe-seven-skies']);

  // Legend modal toggle
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Active Filter Sets
  const [selectedNodeTypes, setSelectedNodeTypes] = useState<Set<AtlasNodeType>>(new Set());
  const [selectedRelationshipTypes, setSelectedRelationshipTypes] = useState<Set<RelationshipType>>(new Set());
  const [selectedEditorialStatuses, setSelectedEditorialStatuses] = useState<Set<RelationshipEditorialStatus>>(new Set());

  // Deep-linking: handle query param ?entity=... or ?focus=...
  useEffect(() => {
    if (route.query) {
      const targetId = route.query.entity || route.query.focus || route.query.id;
      if (targetId) {
        const found = AtlasService.getNodeById(targetId);
        if (found) {
          // If not in current graph, expand neighborhood around it
          setGraphData((prev) => {
            const hasNode = prev.nodes.some((n) => n.id === found.id);
            if (!hasNode) {
              const cluster = AtlasService.getInitialCluster(found.id);
              return cluster;
            }
            return prev;
          });
          setSelectedNodeId(found.id);
          setHistoryStack((prev) => [...prev, found.id]);
        }
      }
    }
  }, [route.query]);

  // Handle Node Selection with History
  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setHistoryStack((prev) => [...prev, nodeId]);
  };

  // Handle History Back
  const handleHistoryBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop(); // remove current
      const prevId = newStack[newStack.length - 1];
      setHistoryStack(newStack);
      setSelectedNodeId(prevId);
    }
  };

  // Expand Node Connections in Graph
  const handleExpandNode = (nodeId: string) => {
    setGraphData((prev) => {
      const expanded = AtlasService.expandNeighborhood(nodeId, prev.nodes, prev.edges);
      return { nodes: expanded.nodes, edges: expanded.edges };
    });
  };

  // Toggle Filters Handlers
  const handleToggleNodeType = (type: AtlasNodeType) => {
    setSelectedNodeTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const handleToggleRelationshipType = (type: RelationshipType) => {
    setSelectedRelationshipTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const handleToggleEditorialStatus = (status: RelationshipEditorialStatus) => {
    setSelectedEditorialStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const handleResetFilters = () => {
    setSelectedNodeTypes(new Set());
    setSelectedRelationshipTypes(new Set());
    setSelectedEditorialStatuses(new Set());
    setSearchQuery('');
  };

  // Reset Graph to initial Chapter 01 cluster
  const handleResetView = () => {
    handleResetFilters();
    const cluster = AtlasService.getInitialCluster('ch-01-universe-seven-skies');
    setGraphData(cluster);
    setSelectedNodeId('ch-01-universe-seven-skies');
    setHistoryStack(['ch-01-universe-seven-skies']);
  };

  // Search Results
  const searchResults = useMemo(() => {
    return AtlasService.searchEntities(searchQuery, language);
  }, [searchQuery, language]);

  // Filtered Graph Nodes & Edges
  const filteredData = useMemo(() => {
    let nodes = graphData.nodes;
    let edges = graphData.edges;

    // Filter by Node Type
    if (selectedNodeTypes.size > 0) {
      nodes = nodes.filter((n) => selectedNodeTypes.has(n.type));
    }

    // Filter by Relationship Type
    if (selectedRelationshipTypes.size > 0) {
      edges = edges.filter((e) => selectedRelationshipTypes.has(e.type));
    }

    // Filter by Editorial Provenance Status
    if (selectedEditorialStatuses.size > 0) {
      edges = edges.filter((e) => selectedEditorialStatuses.has(e.editorialStatus));
    }

    // Filter edges to ensure both endpoints exist in filtered nodes
    const nodeIds = new Set(nodes.map((n) => n.id));
    edges = edges.filter((e) => nodeIds.has(e.sourceId) && nodeIds.has(e.targetId));

    return { nodes, edges };
  }, [
    graphData,
    selectedNodeTypes,
    selectedRelationshipTypes,
    selectedEditorialStatuses
  ]);

  // Currently Selected Node Object
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return AtlasService.getNodeById(selectedNodeId) || null;
  }, [selectedNodeId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#E6E1D6] pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#878177]">
            <Compass className="w-4 h-4 text-[#1E3A5F]" />
            <span>{isUrdu ? 'جامع علمی نقشہ' : 'Knowledge Atlas · Interconnected Topography'}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E6E1D6] p-1 rounded-xs text-xs font-sans">
            <button
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1 rounded-xs cursor-pointer flex items-center gap-1.5 font-medium transition-colors ${
                viewMode === 'graph'
                  ? 'bg-[#1A1918] text-white shadow-2xs'
                  : 'text-[#5C5751] hover:text-[#1A1918]'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'بصری نقشہ (Interactive Graph)' : 'Interactive Graph'}</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-xs cursor-pointer flex items-center gap-1.5 font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#1A1918] text-white shadow-2xs'
                  : 'text-[#5C5751] hover:text-[#1A1918]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'فہرست وار ریکارڈ (Relational Index)' : 'Relational Directory'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#1A1918] tracking-tight">
          {isUrdu ? 'علمیاتی اٹلس' : 'Knowledge Atlas'}
        </h1>

        {/* Required Concise Introduction */}
        <p className="mt-3 text-base sm:text-lg font-serif text-[#5C5751] max-w-3xl leading-relaxed">
          {isUrdu
            ? 'دریافت کیجیے کہ آرکائیو میں افکار، شخصیات، واقعات، متون اور شواہد کس طرح باہم مربوط ہیں۔'
            : 'Explore how ideas, people, events, texts, and evidence connect across the archive.'}
        </p>

        {/* Epistemic Transparency Philosophy Banner */}
        <div className="mt-6 p-3.5 bg-[#FAF8F5] border border-[#E6E1D6] text-xs font-serif text-[#5C5751] flex flex-col sm:flex-row items-baseline justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1E3A5F] shrink-0" />
            <span>
              <strong>Archival Standard: </strong>
              Relationships correspond exclusively to documented records in the database. Disputed hypotheses and source attestations are clearly demarcated from empirical facts.
            </span>
          </div>
          <button
            onClick={handleResetView}
            className="text-[#1E3A5F] hover:underline font-sans font-medium text-[11px] shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Chapter 01 Hub</span>
          </button>
        </div>
      </div>

      {/* Unified Filter & Search Bar */}
      <AtlasFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSelectSearchResult={(id) => {
          handleSelectNode(id);
          handleExpandNode(id);
        }}
        selectedNodeTypes={selectedNodeTypes}
        onToggleNodeType={handleToggleNodeType}
        selectedRelationshipTypes={selectedRelationshipTypes}
        onToggleRelationshipType={handleToggleRelationshipType}
        selectedEditorialStatuses={selectedEditorialStatuses}
        onToggleEditorialStatus={handleToggleEditorialStatus}
        onResetFilters={handleResetFilters}
        totalNodesCount={filteredData.nodes.length}
        totalEdgesCount={filteredData.edges.length}
      />

      {/* Main Content Area: Graph Canvas or List View */}
      {viewMode === 'graph' ? (
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Left/Center: Interactive SVG Graph Canvas */}
          <div className="w-full flex-1 relative">
            {filteredData.nodes.length === 0 ? (
              <div className="h-[600px] bg-white border border-[#E6E1D6] flex flex-col items-center justify-center p-8 text-center">
                <SlidersHorizontal className="w-8 h-8 text-[#878177] mb-3" />
                <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                  {isUrdu ? 'کوئی ربط ظاہر نہیں ہو رہا' : 'No Graph Nodes Match Active Filters'}
                </h3>
                <p className="mt-1 text-xs font-serif text-[#5C5751] max-w-sm">
                  {isUrdu
                    ? 'براہ کرم فلٹرز تبدیل کریں یا ریسیٹ کا بٹن دبائیے۔'
                    : 'Your active type or provenance filters excluded all loaded nodes. Reset filters to restore the view.'}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-[#1A1918] text-white text-xs font-sans font-medium rounded-xs cursor-pointer shadow-xs"
                >
                  {isUrdu ? 'فلٹرز ختم کریں' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <>
                <AtlasGraphCanvas
                  nodes={filteredData.nodes}
                  edges={filteredData.edges}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={handleSelectNode}
                  onExpandNode={handleExpandNode}
                  onOpenLegend={() => setIsLegendOpen(true)}
                />

                {/* Floating Visual Legend */}
                <AtlasLegend
                  isOpen={isLegendOpen}
                  onToggle={() => setIsLegendOpen(false)}
                />
              </>
            )}
          </div>

          {/* Right: Selected Entity Contextual Detail Panel */}
          {selectedNode && (
            <EntityDetailPanel
              node={selectedNode}
              onClose={() => setSelectedNodeId(null)}
              onSelectNode={handleSelectNode}
              onExpandNode={handleExpandNode}
              historyStack={historyStack}
              onBack={handleHistoryBack}
            />
          )}
        </div>
      ) : (
        /* Accessible List-Based Alternative */
        <AtlasListView
          nodes={filteredData.nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={handleSelectNode}
          onFocusNodeInGraph={(id) => {
            handleSelectNode(id);
            setViewMode('graph');
          }}
        />
      )}
    </div>
  );
};
