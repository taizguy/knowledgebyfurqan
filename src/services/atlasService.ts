import {
  AtlasNode,
  Relationship,
  AtlasNodeType,
  RelationshipType,
  RelationshipEditorialStatus,
  LanguageCode
} from '../types/entities';
import { DataService } from './dataService';
import { relationshipsData } from '../data/relationships';

export class AtlasService {
  private static cachedNodes: AtlasNode[] | null = null;
  private static cachedEdges: Relationship[] | null = null;

  static invalidateCache() {
    this.cachedNodes = null;
    this.cachedEdges = null;
  }

  /**
   * Builds the complete set of AtlasNodes by indexing all entities in DataService.
   */
  static getAllNodes(): AtlasNode[] {
    if (this.cachedNodes) return this.cachedNodes;

    const nodes: AtlasNode[] = [];

    // 1. Collections
    DataService.getCollections().forEach((col) => {
      nodes.push({
        id: col.id,
        type: 'collection',
        label: col.title,
        subtitle: { en: 'Archival Research Series', ur: 'تحقیقی مجموعہ' },
        description: col.description,
        dating: col.epochSpan,
        entityId: col.id
      });
    });

    // 2. Chapters
    DataService.getChapters().forEach((ch) => {
      nodes.push({
        id: ch.id,
        type: 'chapter',
        label: ch.title,
        subtitle: {
          en: `Chapter 0${ch.chapterNumber} · ${ch.timeframe}`,
          ur: `باب 0${ch.chapterNumber} · ${ch.timeframe}`
        },
        description: ch.abstract,
        dating: ch.timeframe,
        entityId: ch.id
      });
    });

    // 3. Claims
    DataService.getClaims().forEach((clm) => {
      nodes.push({
        id: clm.id,
        type: 'claim',
        label: clm.statement,
        subtitle: {
          en: `Claim (${clm.claimType}) · ${clm.timestamp || ''}`,
          ur: `دعوے کی قسم: ${clm.claimType}`
        },
        description: clm.epistemicRationale,
        epistemicStatus: clm.status || clm.epistemicStatus,
        entityId: clm.id
      });
    });

    // 4. Primary Sources
    DataService.getPrimarySources().forEach((ps) => {
      nodes.push({
        id: ps.id,
        type: 'primary_source',
        label: ps.title,
        subtitle: {
          en: `Primary Artifact · ${ps.artifactType}`,
          ur: `بنیادی آثار · ${ps.artifactType}`
        },
        description: ps.epistemicNotes,
        dating: ps.datingRange,
        entityId: ps.id
      });
    });

    // 5. Secondary Sources
    DataService.getSources().forEach((src) => {
      nodes.push({
        id: src.id,
        type: 'source',
        label: src.title,
        subtitle: {
          en: `${src.authors.map((a) => a.en).join(', ')} (${src.publicationYearOrEpoch})`,
          ur: `${src.authors.map((a) => a.ur).join(', ')} (${src.publicationYearOrEpoch})`
        },
        description: src.description,
        dating: src.publicationYearOrEpoch,
        entityId: src.id
      });
    });

    // 6. People
    DataService.getPeople().forEach((prs) => {
      nodes.push({
        id: prs.id,
        type: 'person',
        label: prs.name,
        subtitle: prs.role,
        description: prs.biography,
        dating: prs.eraOrLifespan,
        entityId: prs.id
      });
    });

    // 7. Places
    DataService.getPlaces().forEach((plc) => {
      nodes.push({
        id: plc.id,
        type: 'place',
        label: plc.name,
        subtitle: {
          en: `${plc.region.en}, ${plc.modernCountry.en}`,
          ur: `${plc.region.ur}، ${plc.modernCountry.ur}`
        },
        description: plc.description,
        dating: plc.earliestOccupation,
        entityId: plc.id
      });
    });

    // 8. Concepts
    DataService.getConcepts().forEach((cnc) => {
      nodes.push({
        id: cnc.id,
        type: 'concept',
        label: cnc.name,
        subtitle: { en: 'Philosophical / Epistemic Concept', ur: 'فلسفیانہ و علمی تصور' },
        description: cnc.definition,
        entityId: cnc.id
      });
    });

    // 9. Civilizations
    DataService.getCivilizations().forEach((civ) => {
      nodes.push({
        id: civ.id,
        type: 'civilization',
        label: civ.name,
        subtitle: { en: `Flourished: ${civ.flourishedEra}`, ur: `عہد: ${civ.flourishedEra}` },
        description: civ.description,
        dating: civ.flourishedEra,
        entityId: civ.id
      });
    });

    // 10. Texts
    DataService.getTexts().forEach((txt) => {
      nodes.push({
        id: txt.id,
        type: 'text',
        label: txt.title,
        subtitle: {
          en: `Canonical Text · ${txt.approximateDate}`,
          ur: `کلاسیکی متن · ${txt.approximateDate}`
        },
        description: txt.summary,
        dating: txt.approximateDate,
        entityId: txt.id
      });
    });

    // 11. Events
    DataService.getEvents().forEach((evt) => {
      nodes.push({
        id: evt.id,
        type: 'event',
        label: evt.title,
        subtitle: {
          en: `Historical Event · ${evt.approximateDate}`,
          ur: `تاریخی واقعہ · ${evt.approximateDate}`
        },
        description: evt.description,
        dating: evt.approximateDate,
        entityId: evt.id
      });
    });

    this.cachedNodes = nodes;

    // Calculate connections count for each node based on all relationships
    const allEdges = this.getAllRelationships();
    const edgeCounts: Record<string, number> = {};
    allEdges.forEach((rel) => {
      edgeCounts[rel.sourceId] = (edgeCounts[rel.sourceId] || 0) + 1;
      edgeCounts[rel.targetId] = (edgeCounts[rel.targetId] || 0) + 1;
    });

    nodes.forEach((n) => {
      n.connectionsCount = edgeCounts[n.id] || 0;
    });

    return nodes;
  }

  /**
   * Retrieves all relationships, merging base relationships with dynamic claim-source attachments.
   */
  static getAllRelationships(): Relationship[] {
    if (this.cachedEdges) return this.cachedEdges;

    const edges: Relationship[] = [...relationshipsData];
    const existingPairs = new Set<string>();

    edges.forEach((e) => {
      existingPairs.add(`${e.sourceId}:${e.targetId}`);
      existingPairs.add(`${e.targetId}:${e.sourceId}`);
    });

    // Dynamically derive relationships from active claims in DataService
    const claims = DataService.getClaims();
    claims.forEach((clm) => {
      // Primary sources
      clm.primarySourceIds.forEach((psId) => {
        const pairKey = `${clm.id}:${psId}`;
        if (!existingPairs.has(pairKey)) {
          edges.push({
            id: `rel-dyn-${clm.id}-${psId}`,
            sourceId: clm.id,
            targetId: psId,
            type: 'supports',
            description: {
              en: 'Evidentiary primary inscription / archaeological text citation',
              ur: 'منسلک بنیادی تاریخی کتبہ یا متن'
            },
            editorialStatus: 'cited',
            weight: 2
          });
          existingPairs.add(pairKey);
        }
      });

      // Secondary sources
      clm.secondarySourceIds.forEach((sId) => {
        const pairKey = `${clm.id}:${sId}`;
        if (!existingPairs.has(pairKey)) {
          edges.push({
            id: `rel-dyn-${clm.id}-${sId}`,
            sourceId: clm.id,
            targetId: sId,
            type: 'references',
            description: {
              en: 'Academic literature cited in claim appraisal',
              ur: 'تحقیقی جائزے میں حوالہ شدہ علمی ماخذ'
            },
            editorialStatus: 'cited',
            weight: 2
          });
          existingPairs.add(pairKey);
        }
      });

      // Associated Chapter
      if (clm.chapterId) {
        const pairKey = `${clm.chapterId}:${clm.id}`;
        if (!existingPairs.has(pairKey)) {
          edges.push({
            id: `rel-dyn-${clm.chapterId}-${clm.id}`,
            sourceId: clm.chapterId,
            targetId: clm.id,
            type: 'discusses',
            description: {
              en: 'Chapter investigates and extracts claim',
              ur: 'باب میں یہ دعویٰ زیر بحث لایا گیا ہے'
            },
            editorialStatus: 'cited',
            weight: 2
          });
          existingPairs.add(pairKey);
        }
      }
    });

    // Dynamically derive relationships from active events in DataService
    const events = DataService.getEvents();
    events.forEach((evt) => {
      // Event occurred at Place
      if (evt.placeId) {
        const pairKey = `${evt.id}:${evt.placeId}`;
        if (!existingPairs.has(pairKey)) {
          edges.push({
            id: `rel-dyn-${evt.id}-${evt.placeId}`,
            sourceId: evt.id,
            targetId: evt.placeId,
            type: 'occurred_at',
            description: {
              en: 'Historical event located at site',
              ur: 'تاریخی واقعہ اس مقام پر پیش آیا'
            },
            editorialStatus: 'cited',
            weight: 2
          });
          existingPairs.add(pairKey);
        }
      }

      // Event part of Civilization
      if (evt.civilizationId) {
        const pairKey = `${evt.id}:${evt.civilizationId}`;
        if (!existingPairs.has(pairKey)) {
          edges.push({
            id: `rel-dyn-${evt.id}-${evt.civilizationId}`,
            sourceId: evt.id,
            targetId: evt.civilizationId,
            type: 'part_of',
            description: {
              en: 'Event belongs to civilization epoch',
              ur: 'واقعہ اس تہذیبی دور کا حصہ ہے'
            },
            editorialStatus: 'cited',
            weight: 2
          });
          existingPairs.add(pairKey);
        }
      }

      // Event associated with Chapter
      if (evt.chapterId) {
        const pairKey = `${evt.chapterId}:${evt.id}`;
        if (!existingPairs.has(pairKey)) {
          edges.push({
            id: `rel-dyn-${evt.chapterId}-${evt.id}`,
            sourceId: evt.chapterId,
            targetId: evt.id,
            type: 'discusses',
            description: {
              en: 'Chapter analyzes historical event and chronology',
              ur: 'باب میں یہ تاریخی واقعہ اور اس کا خط زمانی زیر بحث ہے'
            },
            editorialStatus: 'cited',
            weight: 2
          });
          existingPairs.add(pairKey);
        }
      }

      // Event associated with Claims
      evt.claimIds?.forEach((clmId) => {
        const pairKey = `${evt.id}:${clmId}`;
        if (!existingPairs.has(pairKey)) {
          edges.push({
            id: `rel-dyn-${evt.id}-${clmId}`,
            sourceId: evt.id,
            targetId: clmId,
            type: 'supports',
            description: {
              en: 'Historical event contextualizes claim',
              ur: 'تاریخی واقعہ دعوے کے سیاق و سباق کی تائید کرتا ہے'
            },
            editorialStatus: 'cited',
            weight: 2
          });
          existingPairs.add(pairKey);
        }
      });
    });

    this.cachedEdges = edges;
    return edges;
  }

  /**
   * Retrieves a node by ID.
   */
  static getNodeById(id: string): AtlasNode | undefined {
    return this.getAllNodes().find((n) => n.id === id || n.entityId === id);
  }

  /**
   * Returns a coherent initial subgraph centered on Chapter 01 (Creation of the Universe & Seven Skies).
   */
  static getInitialCluster(centerEntityId: string = 'ch-01-universe-seven-skies'): {
    nodes: AtlasNode[];
    edges: Relationship[];
  } {
    const allNodes = this.getAllNodes();
    const allEdges = this.getAllRelationships();

    const centerNode = allNodes.find((n) => n.id === centerEntityId);
    if (!centerNode) {
      // Fallback to first chapter
      return { nodes: allNodes.slice(0, 15), edges: allEdges.slice(0, 20) };
    }

    // Direct 1-degree connections
    const relevantEdgeIds = new Set<string>();
    const nodeIds = new Set<string>([centerNode.id]);

    allEdges.forEach((edge) => {
      if (edge.sourceId === centerNode.id) {
        nodeIds.add(edge.targetId);
        relevantEdgeIds.add(edge.id);
      } else if (edge.targetId === centerNode.id) {
        nodeIds.add(edge.sourceId);
        relevantEdgeIds.add(edge.id);
      }
    });

    // Also include inter-connections between these 1st-degree nodes
    allEdges.forEach((edge) => {
      if (nodeIds.has(edge.sourceId) && nodeIds.has(edge.targetId)) {
        relevantEdgeIds.add(edge.id);
      }
    });

    const activeNodes = allNodes.filter((n) => nodeIds.has(n.id));
    const activeEdges = allEdges.filter((e) => relevantEdgeIds.has(e.id));

    return { nodes: activeNodes, edges: activeEdges };
  }

  /**
   * Expands the current graph by finding un-included neighbors of a selected node.
   */
  static expandNeighborhood(
    targetNodeId: string,
    currentNodes: AtlasNode[],
    currentEdges: Relationship[]
  ): { nodes: AtlasNode[]; edges: Relationship[]; addedCount: number } {
    const allNodes = this.getAllNodes();
    const allEdges = this.getAllRelationships();

    const existingNodeIds = new Set(currentNodes.map((n) => n.id));
    const existingEdgeIds = new Set(currentEdges.map((e) => e.id));

    const newNodes: AtlasNode[] = [...currentNodes];
    const newEdges: Relationship[] = [...currentEdges];
    let addedCount = 0;

    allEdges.forEach((edge) => {
      let neighborId: string | null = null;
      if (edge.sourceId === targetNodeId) neighborId = edge.targetId;
      else if (edge.targetId === targetNodeId) neighborId = edge.sourceId;

      if (neighborId) {
        if (!existingNodeIds.has(neighborId)) {
          const neighborNode = allNodes.find((n) => n.id === neighborId);
          if (neighborNode) {
            newNodes.push(neighborNode);
            existingNodeIds.add(neighborId);
            addedCount++;
          }
        }
        if (!existingEdgeIds.has(edge.id)) {
          newEdges.push(edge);
          existingEdgeIds.add(edge.id);
        }
      }
    });

    return { nodes: newNodes, edges: newEdges, addedCount };
  }

  /**
   * Multilingual entity search across titles, descriptions, and IDs.
   */
  static searchEntities(query: string, lang: LanguageCode = 'en'): AtlasNode[] {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const allNodes = this.getAllNodes();

    return allNodes.filter((node) => {
      const matchLabel =
        node.label[lang]?.toLowerCase().includes(q) ||
        node.label.en?.toLowerCase().includes(q) ||
        node.label.ur?.toLowerCase().includes(q);

      const matchSubtitle =
        node.subtitle &&
        (node.subtitle[lang]?.toLowerCase().includes(q) ||
          node.subtitle.en?.toLowerCase().includes(q) ||
          node.subtitle.ur?.toLowerCase().includes(q));

      const matchDesc =
        node.description &&
        (node.description[lang]?.toLowerCase().includes(q) ||
          node.description.en?.toLowerCase().includes(q) ||
          node.description.ur?.toLowerCase().includes(q));

      const matchId = node.id.toLowerCase().includes(q);

      return matchLabel || matchSubtitle || matchDesc || matchId;
    });
  }

  /**
   * Retrieves all connections (incoming and outgoing) for an entity.
   */
  static getEntityConnections(entityId: string): {
    outgoing: Array<{ relationship: Relationship; targetNode: AtlasNode }>;
    incoming: Array<{ relationship: Relationship; sourceNode: AtlasNode }>;
  } {
    const allNodes = this.getAllNodes();
    const allEdges = this.getAllRelationships();

    const outgoing: Array<{ relationship: Relationship; targetNode: AtlasNode }> = [];
    const incoming: Array<{ relationship: Relationship; sourceNode: AtlasNode }> = [];

    allEdges.forEach((rel) => {
      if (rel.sourceId === entityId) {
        const target = allNodes.find((n) => n.id === rel.targetId);
        if (target) outgoing.push({ relationship: rel, targetNode: target });
      } else if (rel.targetId === entityId) {
        const source = allNodes.find((n) => n.id === rel.sourceId);
        if (source) incoming.push({ relationship: rel, sourceNode: source });
      }
    });

    return { outgoing, incoming };
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('archive-claims-updated', () => {
    AtlasService.invalidateCache();
  });
  window.addEventListener('archive-sources-updated', () => {
    AtlasService.invalidateCache();
  });
  window.addEventListener('archive-events-updated', () => {
    AtlasService.invalidateCache();
  });
}

