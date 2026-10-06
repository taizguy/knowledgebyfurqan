import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AtlasNode, Relationship, LanguageCode } from '../../types/entities';
import { useLanguage } from '../../context/LanguageContext';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
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
  Info,
  HelpCircle
} from 'lucide-react';

interface AtlasGraphCanvasProps {
  nodes: AtlasNode[];
  edges: Relationship[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onExpandNode: (nodeId: string) => void;
  onOpenLegend: () => void;
}

interface NodePosition {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const AtlasGraphCanvas: React.FC<AtlasGraphCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  onExpandNode,
  onOpenLegend
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const containerRef = useRef<HTMLDivElement>(null);

  // Pan and Zoom Transformation state
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Dragging individual node state
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  // Hovered node state
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Node Positions state
  const [positions, setPositions] = useState<Record<string, NodePosition>>({});

  // 1-degree connected node IDs of selected node
  const connectedNodeIds = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    const set = new Set<string>([selectedNodeId]);
    edges.forEach((e) => {
      if (e.sourceId === selectedNodeId) set.add(e.targetId);
      if (e.targetId === selectedNodeId) set.add(e.sourceId);
    });
    return set;
  }, [selectedNodeId, edges]);

  // Initial radial / orbital physics layout calculation
  useEffect(() => {
    const width = 900;
    const height = 650;
    const centerX = width / 2;
    const centerY = height / 2;

    const newPositions: Record<string, NodePosition> = {};
    const centerNodeId = selectedNodeId || nodes[0]?.id;

    nodes.forEach((node, idx) => {
      if (node.id === centerNodeId) {
        newPositions[node.id] = { id: node.id, x: centerX, y: centerY, vx: 0, vy: 0 };
      } else {
        // Place in concentric rings based on type / index
        const angle = (idx / (nodes.length || 1)) * 2 * Math.PI;
        const ringRadius = node.type === 'chapter' ? 140 : node.type === 'claim' ? 240 : 320;
        // Add pseudo-random offset based on ID hash for organic layout
        const jitter = (node.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 50) - 25;
        const radius = ringRadius + jitter;

        newPositions[node.id] = {
          id: node.id,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: 0,
          vy: 0
        };
      }
    });

    setPositions(newPositions);
    // Center view
    setPan({ x: 0, y: 0 });
    setZoom(1);
  }, [nodes.length]); // Re-calculate only when nodes count changes

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.min(2.5, Math.max(0.4, zoom * zoomFactor));
    setZoom(newZoom);
  };

  // Pan interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'graph-canvas-bg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    } else if (draggedNodeId && positions[draggedNodeId]) {
      // Reposition dragged node
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = (e.clientX - rect.left - pan.x) / zoom;
        const mouseY = (e.clientY - rect.top - pan.y) / zoom;
        setPositions((prev) => ({
          ...prev,
          [draggedNodeId]: { ...prev[draggedNodeId], x: mouseX, y: mouseY }
        }));
      }
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedNodeId(null);
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((z) => Math.min(2.5, z * 1.2));
  const handleZoomOut = () => setZoom((z) => Math.max(0.4, z / 1.2));
  const handleResetView = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  };

  // Node visual styling helper
  const getNodeStyling = (type: AtlasNode['type']) => {
    switch (type) {
      case 'chapter':
        return { color: '#1E3A5F', fill: '#EBF1F7', icon: BookOpen, radius: 24, strokeWidth: 3 };
      case 'claim':
        return { color: '#B8934A', fill: '#FBF7ED', icon: Layers, radius: 20, strokeWidth: 2.5 };
      case 'primary_source':
        return { color: '#947230', fill: '#F9F5EA', icon: Scroll, radius: 21, strokeWidth: 2.5 };
      case 'source':
        return { color: '#5C5751', fill: '#F3F2F0', icon: Library, radius: 19, strokeWidth: 2 };
      case 'person':
        return { color: '#4A5568', fill: '#EDF2F7', icon: Users, radius: 19, strokeWidth: 2 };
      case 'place':
        return { color: '#2C7A7B', fill: '#E6FFFA', icon: MapPin, radius: 19, strokeWidth: 2 };
      case 'concept':
        return { color: '#6B46C1', fill: '#FAF5FF', icon: Sparkles, radius: 20, strokeWidth: 2.5 };
      case 'civilization':
        return { color: '#9C4221', fill: '#FFFAF0', icon: Landmark, radius: 22, strokeWidth: 2.5 };
      case 'event':
        return { color: '#744210', fill: '#FEFCBF', icon: Calendar, radius: 18, strokeWidth: 2 };
      case 'text':
        return { color: '#805AD5', fill: '#F7FAFC', icon: FileText, radius: 19, strokeWidth: 2 };
      default:
        return { color: '#5C5751', fill: '#FFFFFF', icon: BookOpen, radius: 18, strokeWidth: 2 };
    }
  };

  // Edge styling helper
  const getEdgeStyling = (rel: Relationship) => {
    let stroke = '#878177';
    let dasharray = 'none';

    if (rel.editorialStatus === 'documented') {
      stroke = '#1E3A5F';
    } else if (rel.editorialStatus === 'cited') {
      stroke = '#5C5751';
    } else if (rel.editorialStatus === 'proposed') {
      stroke = '#B8934A';
      dasharray = '4,4';
    } else if (rel.editorialStatus === 'disputed' || rel.type === 'contradicts') {
      stroke = '#E53E3E';
      dasharray = '5,3';
    }

    return { stroke, dasharray };
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-[620px] sm:h-[680px] bg-[#FAF8F5] border border-[#E6E1D6] overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-xs"
    >
      {/* Background Grid Pattern */}
      <svg
        id="graph-canvas-bg"
        className="absolute inset-0 w-full h-full pointer-events-auto"
      >
        <defs>
          <pattern id="archival-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E6E1D6" strokeWidth="0.5" opacity="0.6" />
            <circle cx="40" cy="40" r="1" fill="#B8934A" opacity="0.3" />
          </pattern>
          {/* Arrowhead markers */}
          <marker
            id="arrow-documented"
            viewBox="0 0 10 10"
            refX="25"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#1E3A5F" />
          </marker>
          <marker
            id="arrow-cited"
            viewBox="0 0 10 10"
            refX="25"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#5C5751" />
          </marker>
          <marker
            id="arrow-proposed"
            viewBox="0 0 10 10"
            refX="25"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#B8934A" />
          </marker>
          <marker
            id="arrow-disputed"
            viewBox="0 0 10 10"
            refX="25"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#E53E3E" />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill="url(#archival-grid)" />
      </svg>

      {/* Main Interactive SVG Canvas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {/* Render Edges */}
        <g className="edges-layer">
          {edges.map((edge) => {
            const sourcePos = positions[edge.sourceId];
            const targetPos = positions[edge.targetId];
            if (!sourcePos || !targetPos) return null;

            const isHighlighted =
              selectedNodeId === edge.sourceId ||
              selectedNodeId === edge.targetId ||
              hoveredNodeId === edge.sourceId ||
              hoveredNodeId === edge.targetId;

            const isDimmed =
              selectedNodeId !== null &&
              edge.sourceId !== selectedNodeId &&
              edge.targetId !== selectedNodeId;

            const styling = getEdgeStyling(edge);
            const markerId = `arrow-${edge.editorialStatus}`;

            // Midpoint for label
            const midX = (sourcePos.x + targetPos.x) / 2;
            const midY = (sourcePos.y + targetPos.y) / 2;

            return (
              <g key={edge.id} opacity={isDimmed ? 0.15 : isHighlighted ? 1 : 0.75}>
                <line
                  x1={sourcePos.x}
                  y1={sourcePos.y}
                  x2={targetPos.x}
                  y2={targetPos.y}
                  stroke={isHighlighted ? '#1E3A5F' : styling.stroke}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={styling.dasharray}
                  markerEnd={`url(#${markerId})`}
                />
                {/* Edge relationship label */}
                {(isHighlighted || zoom > 0.8) && (
                  <text
                    x={midX}
                    y={midY - 4}
                    textAnchor="middle"
                    fill={isHighlighted ? '#1E3A5F' : '#878177'}
                    className="font-mono text-[9px] uppercase tracking-wider"
                    style={{
                      textShadow: '0 0 4px #FAF8F5, 0 0 2px #FAF8F5'
                    }}
                  >
                    {edge.type.replace(/_/g, ' ')}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Render Nodes */}
        <g className="nodes-layer">
          {nodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;

            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isConnected = connectedNodeIds.has(node.id);
            const isDimmed = selectedNodeId !== null && !isConnected;

            const style = getNodeStyling(node.type);
            const Icon = style.icon;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="pointer-events-auto cursor-pointer"
                opacity={isDimmed ? 0.25 : 1}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node.id);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setDraggedNodeId(node.id);
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Selection / Focus Halo */}
                {(isSelected || isHovered) && (
                  <circle
                    r={style.radius + 8}
                    fill="none"
                    stroke={style.color}
                    strokeWidth={1.5}
                    strokeDasharray="3,3"
                    className="animate-spin-slow"
                    opacity={0.8}
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  r={style.radius}
                  fill={style.fill}
                  stroke={isSelected ? '#1A1918' : style.color}
                  strokeWidth={isSelected ? 3.5 : style.strokeWidth}
                  className="transition-all"
                />

                {/* Epistemic Status Ring for claims */}
                {node.epistemicStatus && (
                  <circle
                    cx={style.radius - 4}
                    cy={-style.radius + 4}
                    r={4}
                    fill={
                      node.epistemicStatus === 'verified'
                        ? '#2E7D32'
                        : node.epistemicStatus === 'source_reported'
                        ? '#D97706'
                        : node.epistemicStatus === 'disputed'
                        ? '#DC2626'
                        : '#7C3AED'
                    }
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                  />
                )}

                {/* Lucide Icon Center */}
                <foreignObject
                  x={-10}
                  y={-10}
                  width={20}
                  height={20}
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon
                      style={{ color: style.color }}
                      className="w-3.5 h-3.5"
                    />
                  </div>
                </foreignObject>

                {/* Node Label Text */}
                <text
                  y={style.radius + 14}
                  textAnchor="middle"
                  className={`font-serif text-[11px] select-none ${
                    isSelected ? 'font-bold fill-[#1A1918]' : 'font-medium fill-[#2D2A26]'
                  }`}
                  style={{
                    textShadow: '0 0 5px #FAF8F5, 0 0 3px #FAF8F5'
                  }}
                >
                  {node.label[language]?.length > 28
                    ? `${node.label[language].slice(0, 26)}...`
                    : node.label[language]}
                </text>

                {/* Node subtitle badge */}
                {(isSelected || isHovered) && node.subtitle && (
                  <text
                    y={style.radius + 26}
                    textAnchor="middle"
                    className="font-mono text-[9px] fill-[#878177]"
                    style={{
                      textShadow: '0 0 4px #FAF8F5, 0 0 2px #FAF8F5'
                    }}
                  >
                    {node.subtitle[language]}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Canvas Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-1 bg-white border border-[#E6E1D6] p-1 shadow-xs rounded-xs">
        <button
          onClick={handleZoomIn}
          className="p-1.5 text-[#5C5751] hover:text-[#1A1918] hover:bg-[#FAF8F5] cursor-pointer"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 text-[#5C5751] hover:text-[#1A1918] hover:bg-[#FAF8F5] cursor-pointer"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-4 h-px bg-[#E6E1D6] my-0.5" />
        <button
          onClick={handleResetView}
          className="p-1.5 text-[#5C5751] hover:text-[#1A1918] hover:bg-[#FAF8F5] cursor-pointer"
          title="Reset Camera & Pan"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Canvas Controls (Bottom Left: Legend & Hub Expansion) */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
        <button
          onClick={onOpenLegend}
          className="px-3 py-1.5 bg-white border border-[#E6E1D6] hover:border-[#1A1918] text-xs font-sans font-medium text-[#1A1918] shadow-xs cursor-pointer flex items-center gap-1.5 rounded-xs"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#1E3A5F]" />
          <span>{isUrdu ? 'علامات کتب خانہ (Legend)' : 'Visual Legend'}</span>
        </button>

        {selectedNodeId && (
          <button
            onClick={() => onExpandNode(selectedNodeId)}
            className="px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#152840] text-white text-xs font-sans font-medium shadow-xs cursor-pointer flex items-center gap-1.5 rounded-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8934A]" />
            <span>{isUrdu ? 'مزید روابط دریافت کریں' : 'Expand Connections'}</span>
          </button>
        )}
      </div>

      {/* Floating Canvas Scale Indicator (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 bg-white/90 border border-[#E6E1D6] text-[10px] font-mono text-[#878177] rounded-xs shadow-2xs">
        {Math.round(zoom * 100)}% · {nodes.length} nodes · {edges.length} connections
      </div>
    </div>
  );
};
