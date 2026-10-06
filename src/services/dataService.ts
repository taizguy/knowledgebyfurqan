import {
  Chapter,
  Claim,
  Collection,
  Civilization,
  Place,
  Person,
  Concept,
  TimelineEvent,
  Event,
  Source,
  PrimarySource,
  Text,
  Quote,
  Translation,
  Article,
  ResearchNote,
  EpistemicStatus,
  LanguageCode,
  ResearchWorkspaceStats,
  ResearchProjectSummary
} from '../types/entities';

import { chaptersData } from '../data/chapters';
import { claimsData } from '../data/claims';
import { collectionsData } from '../data/collections';
import { civilizationsData } from '../data/civilizations';
import { placesData } from '../data/places';
import { peopleData } from '../data/people';
import { conceptsData } from '../data/concepts';
import { timelineEventsData } from '../data/timeline';
import { eventsData } from '../data/events';
import { textsData } from '../data/texts';
import { quotesData } from '../data/quotes';
import { translationsData } from '../data/translations';
import { sourcesData, primarySourcesData } from '../data/sources';
import { articlesData, researchNotesData } from '../data/researchNotes';
import { citationsData } from '../data/citations';
import { mediaData } from '../data/media';

// Local storage keys for interactive session persistence
const CLAIMS_STORAGE_KEY = 'archive_workspace_claims_store';
const SOURCES_STORAGE_KEY = 'archive_workspace_sources_store';
const EVENTS_STORAGE_KEY = 'archive_timeline_events_store';

function loadStoredClaims(): Claim[] {
  if (typeof window === 'undefined') return [...claimsData];
  try {
    const raw = localStorage.getItem(CLAIMS_STORAGE_KEY);
    if (!raw) return [...claimsData];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const merged = [...parsed];
      for (const defaultClaim of claimsData) {
        if (!merged.some((c) => c.id === defaultClaim.id)) {
          merged.push(defaultClaim);
        }
      }
      return merged;
    }
  } catch (err) {
    console.error('Failed to load claims from storage:', err);
  }
  return [...claimsData];
}

function loadStoredSources(): Source[] {
  if (typeof window === 'undefined') return [...sourcesData];
  try {
    const raw = localStorage.getItem(SOURCES_STORAGE_KEY);
    if (!raw) return [...sourcesData];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to load sources from storage:', err);
  }
  return [...sourcesData];
}

function loadStoredEvents(): Event[] {
  if (typeof window === 'undefined') return [...eventsData];
  try {
    const raw = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!raw) return [...eventsData];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const merged = [...parsed];
      for (const defaultEvent of eventsData) {
        if (!merged.some((e) => e.id === defaultEvent.id)) {
          merged.push(defaultEvent);
        }
      }
      return merged;
    }
  } catch (err) {
    console.error('Failed to load events from storage:', err);
  }
  return [...eventsData];
}

let activeClaimsCache: Claim[] = loadStoredClaims();
let activeSourcesCache: Source[] = loadStoredSources();
let activeEventsCache: Event[] = loadStoredEvents();

function persistClaims() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(activeClaimsCache));
      window.dispatchEvent(new CustomEvent('archive-claims-updated'));
    } catch (err) {
      console.error('Failed to persist claims:', err);
    }
  }
}

function persistSources() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SOURCES_STORAGE_KEY, JSON.stringify(activeSourcesCache));
      window.dispatchEvent(new CustomEvent('archive-sources-updated'));
    } catch (err) {
      console.error('Failed to persist sources:', err);
    }
  }
}

function persistEvents() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(activeEventsCache));
      window.dispatchEvent(new CustomEvent('archive-events-updated'));
    } catch (err) {
      console.error('Failed to persist events:', err);
    }
  }
}

export class DataService {
  // Collections
  static getCollections(): Collection[] {
    return collectionsData;
  }

  static getCollectionById(id: string): Collection | undefined {
    return collectionsData.find((c) => c.id === id || c.slug === id);
  }

  // Chapters
  static getChapters(): Chapter[] {
    return chaptersData;
  }

  static getChapterByIdOrSlug(idOrSlug: string): Chapter | undefined {
    return chaptersData.find((ch) => ch.id === idOrSlug || ch.slug === idOrSlug);
  }

  // Claims
  static getClaims(statusFilter?: EpistemicStatus): Claim[] {
    if (!statusFilter || statusFilter === ('all' as any)) return activeClaimsCache;
    return activeClaimsCache.filter((c) => c.epistemicStatus === statusFilter || c.status === statusFilter);
  }

  static getClaimByIdOrSlug(idOrSlug: string): Claim | undefined {
    return activeClaimsCache.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
  }

  static updateClaim(id: string, updates: Partial<Claim>): Claim | undefined {
    const index = activeClaimsCache.findIndex((c) => c.id === id || c.slug === id);
    if (index === -1) return undefined;

    const existing = activeClaimsCache[index];
    const updated: Claim = {
      ...existing,
      ...updates,
      // If status changed, synchronize epistemicStatus
      epistemicStatus: updates.status ? (updates.status as EpistemicStatus) : (updates.epistemicStatus || existing.epistemicStatus),
      status: updates.status || (existing.status as any)
    };

    activeClaimsCache[index] = updated;
    persistClaims();
    return updated;
  }

  static addClaim(newClaim: Claim): Claim {
    activeClaimsCache = [newClaim, ...activeClaimsCache];
    persistClaims();
    return newClaim;
  }

  static attachSourceToClaim(claimId: string, sourceId: string, isPrimary: boolean = false): void {
    const claim = activeClaimsCache.find((c) => c.id === claimId);
    if (!claim) return;

    const isPrimaryEffective = isPrimary || primarySourcesData.some((ps) => ps.id === sourceId || ps.slug === sourceId);

    if (isPrimaryEffective) {
      if (!claim.primarySourceIds.includes(sourceId)) {
        claim.primarySourceIds = [...claim.primarySourceIds, sourceId];
      }
    } else {
      if (!claim.secondarySourceIds.includes(sourceId)) {
        claim.secondarySourceIds = [...claim.secondarySourceIds, sourceId];
      }
    }

    persistClaims();
  }

  static detachSourceFromClaim(claimId: string, sourceId: string): void {
    const claim = activeClaimsCache.find((c) => c.id === claimId);
    if (!claim) return;

    claim.primarySourceIds = claim.primarySourceIds.filter((id) => id !== sourceId);
    claim.secondarySourceIds = claim.secondarySourceIds.filter((id) => id !== sourceId);

    persistClaims();
  }

  static resetArchivalDefaults(): void {
    activeClaimsCache = [...claimsData];
    activeSourcesCache = [...sourcesData];
    activeEventsCache = [...eventsData];
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(CLAIMS_STORAGE_KEY);
        localStorage.removeItem(SOURCES_STORAGE_KEY);
        localStorage.removeItem(EVENTS_STORAGE_KEY);
        window.dispatchEvent(new CustomEvent('archive-claims-updated'));
        window.dispatchEvent(new CustomEvent('archive-sources-updated'));
        window.dispatchEvent(new CustomEvent('archive-events-updated'));
      } catch (e) {
        console.error(e);
      }
    }
  }

  // Research Workspace Live Overview Analytics
  static getResearchOverviewStats(): ResearchWorkspaceStats {
    const claims = activeClaimsCache;
    const chapters = chaptersData;

    const unreviewedClaims = claims.filter((c) => c.status === 'unreviewed' || c.epistemicStatus === 'unreviewed').length;
    const verifiedClaims = claims.filter((c) => c.status === 'verified' || c.epistemicStatus === 'verified').length;
    const disputedClaims = claims.filter((c) => c.status === 'disputed' || c.epistemicStatus === 'disputed').length;
    const openQuestions = claims.filter((c) => c.status === 'open_question' || c.epistemicStatus === 'open_question').length;
    const sourceReportedClaims = claims.filter(
      (c) => c.status === 'source_reported' || c.epistemicStatus === 'source_reported' || c.epistemicStatus === 'source_attested_unverified'
    ).length;
    const interpretiveClaims = claims.filter((c) => c.status === 'interpretive' || c.epistemicStatus === 'interpretive').length;
    const partiallyVerifiedClaims = claims.filter((c) => c.status === 'partially_verified' || c.epistemicStatus === 'partially_verified').length;
    const primarySourcesLocated = claims.filter((c) => c.status === 'primary_source_located' || c.epistemicStatus === 'primary_source_located').length;
    const claimsWithEvidence = claims.filter((c) => c.primarySourceIds.length > 0 || c.secondarySourceIds.length > 0).length;

    return {
      totalChapters: chapters.length,
      totalClaims: claims.length,
      unreviewedClaims,
      claimsWithEvidence,
      openQuestions,
      disputedClaims,
      verifiedClaims,
      sourceReportedClaims,
      interpretiveClaims,
      partiallyVerifiedClaims,
      primarySourcesLocated
    };
  }

  // Research Projects for Workspace
  static getResearchProjects(): ResearchProjectSummary[] {
    const chapters = chaptersData;
    const collections = collectionsData;

    return chapters.map((ch) => {
      const col = collections.find((c) => c.id === ch.collectionId);
      const chapterClaims = activeClaimsCache.filter(
        (c) => c.chapterId === ch.id || ch.claimIds.includes(c.id) || c.chapterIds?.includes(ch.id)
      );

      const totalClaimsCount = chapterClaims.length;
      const reviewedClaimsCount = chapterClaims.filter((c) => c.status !== 'unreviewed').length;
      const verifiedClaimsCount = chapterClaims.filter((c) => c.status === 'verified').length;
      const disputedClaimsCount = chapterClaims.filter((c) => c.status === 'disputed').length;
      const openQuestionsCount = chapterClaims.filter((c) => c.status === 'open_question').length;

      const claimsWithAttachedSources = chapterClaims.filter(
        (c) => c.primarySourceIds.length > 0 || c.secondarySourceIds.length > 0
      ).length;

      const evidenceAttachmentRate = totalClaimsCount > 0
        ? Math.round((claimsWithAttachedSources / totalClaimsCount) * 100)
        : 0;

      const provisionalTimestampsCount = ch.provisionalTimestamps ? ch.provisionalTimestamps.length : 0;

      // Outstanding tasks generation
      const tasks: string[] = [];
      if (provisionalTimestampsCount > 0) {
        tasks.push(`Verify ${provisionalTimestampsCount} provisional video timestamps against source audio`);
      }
      const unreviewedCount = totalClaimsCount - reviewedClaimsCount;
      if (unreviewedCount > 0) {
        tasks.push(`Complete peer appraisal on ${unreviewedCount} unreviewed claim(s)`);
      }
      const lackingEvidenceCount = totalClaimsCount - claimsWithAttachedSources;
      if (lackingEvidenceCount > 0) {
        tasks.push(`Collate primary artifacts or secondary literature for ${lackingEvidenceCount} claim(s)`);
      }
      if (disputedClaimsCount > 0) {
        tasks.push(`Document competing viewpoints for ${disputedClaimsCount} disputed claim(s)`);
      }
      if (tasks.length === 0) {
        tasks.push('All cataloged claims reviewed; ready for publication audit');
      }

      return {
        chapterId: ch.id,
        chapterSlug: ch.slug,
        chapterNumber: ch.chapterNumber,
        title: ch.title,
        collectionTitle: col ? col.title : { en: '40,000 Years of Knowledge', ur: 'چالیس ہزار سالہ علم' },
        sourceCreator: ch.originalSourceCreator || 'Furqan Qureshi Blogs',
        sourceUrl: ch.originalSourceUrl || 'https://www.youtube.com/watch?v=td9xnYpXlJo',
        publicationDate: ch.publicationDate || '13 October 2022',
        duration: ch.duration || 'approximately 48 minutes',
        totalClaimsCount,
        reviewedClaimsCount,
        verifiedClaimsCount,
        disputedClaimsCount,
        openQuestionsCount,
        evidenceAttachmentRate,
        provisionalTimestampsCount,
        editorialStatus: ch.researchStatus || 'Preliminary Archival Ingestion',
        outstandingTasks: tasks
      };
    });
  }

  // Civilizations
  static getCivilizations(): Civilization[] {
    return civilizationsData;
  }

  static getCivilizationByIdOrSlug(idOrSlug: string): Civilization | undefined {
    return civilizationsData.find((civ) => civ.id === idOrSlug || civ.slug === idOrSlug);
  }

  // Places
  static getPlaces(): Place[] {
    return placesData;
  }

  static getPlaceByIdOrSlug(idOrSlug: string): Place | undefined {
    return placesData.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  }

  // People
  static getPeople(): Person[] {
    return peopleData;
  }

  static getPersonByIdOrSlug(idOrSlug: string): Person | undefined {
    return peopleData.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  }

  // Concepts
  static getConcepts(): Concept[] {
    return conceptsData;
  }

  static getConceptByIdOrSlug(idOrSlug: string): Concept | undefined {
    return conceptsData.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
  }

  // Texts
  static getTexts(): Text[] {
    return textsData;
  }

  static getTextByIdOrSlug(idOrSlug: string): Text | undefined {
    return textsData.find((t) => t.id === idOrSlug || t.slug === idOrSlug);
  }

  // Quotes
  static getQuotes(): Quote[] {
    return quotesData;
  }

  static getQuoteById(id: string): Quote | undefined {
    return quotesData.find((q) => q.id === id);
  }

  static getQuotesByAuthor(authorId: string): Quote[] {
    return quotesData.filter((q) => q.authorId === authorId);
  }

  static getQuotesBySource(sourceId: string): Quote[] {
    return quotesData.filter((q) => q.sourceId === sourceId);
  }

  // Translations
  static getTranslations(): Translation[] {
    return translationsData;
  }

  static getTranslationsByTextId(textId: string): Translation[] {
    return translationsData.filter((tr) => tr.sourceTextId === textId);
  }

  // Events & Chronology
  static getEvents(categoryFilter?: string, epochFilter?: string): Event[] {
    let list = [...activeEventsCache].sort((a, b) => {
      const yearA = a.historicalDate?.earliestYear ?? a.rawYearBPOrBCE ?? 0;
      const yearB = b.historicalDate?.earliestYear ?? b.rawYearBPOrBCE ?? 0;
      return yearA - yearB;
    });

    if (categoryFilter && categoryFilter !== 'all') {
      list = list.filter((e) => e.categories?.includes(categoryFilter as any));
    }

    if (epochFilter && epochFilter !== 'all') {
      list = list.filter((e) => e.epoch === epochFilter);
    }

    return list;
  }

  static getEventByIdOrSlug(idOrSlug: string): Event | undefined {
    return activeEventsCache.find((e) => e.id === idOrSlug || e.slug === idOrSlug);
  }

  static updateEvent(id: string, updates: Partial<Event>): Event | undefined {
    const index = activeEventsCache.findIndex((e) => e.id === id || e.slug === id);
    if (index === -1) return undefined;

    const existing = activeEventsCache[index];
    const updated: Event = {
      ...existing,
      ...updates,
      historicalDate: updates.historicalDate ? { ...existing.historicalDate, ...updates.historicalDate } : existing.historicalDate
    };

    activeEventsCache[index] = updated;
    persistEvents();
    return updated;
  }

  static addEvent(newEvent: Event): Event {
    activeEventsCache = [...activeEventsCache, newEvent];
    persistEvents();
    return newEvent;
  }

  static deleteEvent(id: string): boolean {
    const prevLen = activeEventsCache.length;
    activeEventsCache = activeEventsCache.filter((e) => e.id !== id && e.slug !== id);
    if (activeEventsCache.length !== prevLen) {
      persistEvents();
      return true;
    }
    return false;
  }

  static getEventsByChapter(chapterId: string): Event[] {
    return activeEventsCache.filter(
      (e) => e.chapterId === chapterId || e.associatedChapterIds?.includes(chapterId)
    );
  }

  static getEventsWithAlternativeDates(): Event[] {
    return activeEventsCache.filter(
      (e) => Boolean(e.historicalDate?.alternativeDates && e.historicalDate.alternativeDates.length > 0)
    );
  }

  // Timeline Events
  static getTimelineEvents(epochFilter?: string): TimelineEvent[] {
    return this.getEvents('all', epochFilter);
  }

  // Sources & Primary Sources
  static getSources(): Source[] {
    return sourcesData;
  }

  static getPrimarySources(): PrimarySource[] {
    return primarySourcesData;
  }

  static getSourceById(id: string): Source | undefined {
    return sourcesData.find((s) => s.id === id || s.slug === id);
  }

  static getPrimarySourceById(id: string): PrimarySource | undefined {
    return primarySourcesData.find((ps) => ps.id === id || ps.slug === id);
  }

  static getCitationById(id: string) {
    return citationsData[id];
  }

  static getMediaById(id: string) {
    return mediaData[id];
  }

  // Articles & Notes
  static getArticles(): Article[] {
    return articlesData;
  }

  static getResearchNotes(): ResearchNote[] {
    return researchNotesData;
  }

  // ==========================================
  // Relational Cross-Referencing Helpers
  // ==========================================

  // Where does a Person appear across the archive?
  static getClaimsByPerson(personId: string): Claim[] {
    return activeClaimsCache.filter(
      (c) => c.associatedPersonIds.includes(personId)
    );
  }

  static getChaptersByPerson(personId: string): Chapter[] {
    return chaptersData.filter(
      (ch) => ch.personIds?.includes(personId)
    );
  }

  static getTextsByPerson(personId: string): Text[] {
    return textsData.filter(
      (t) => t.authorId === personId
    );
  }

  static getEventsByPerson(personId: string): Event[] {
    return eventsData.filter(
      (e) => e.relatedPersonIds.includes(personId)
    );
  }

  // Where does a Concept appear across the archive?
  static getClaimsByConcept(conceptId: string): Claim[] {
    return activeClaimsCache.filter(
      (c) => c.associatedConceptIds.includes(conceptId)
    );
  }

  static getChaptersByConcept(conceptId: string): Chapter[] {
    return chaptersData.filter(
      (ch) => ch.conceptIds?.includes(conceptId)
    );
  }

  // Where does a Source appear across the archive?
  static getClaimsBySource(sourceId: string): Claim[] {
    return activeClaimsCache.filter(
      (c) => c.secondarySourceIds.includes(sourceId) || c.primarySourceIds.includes(sourceId)
    );
  }

  static getChaptersBySource(sourceId: string): Chapter[] {
    return chaptersData.filter(
      (ch) =>
        ch.secondarySourceIds?.includes(sourceId) ||
        ch.primarySourceIds?.includes(sourceId)
    );
  }

  // Where does a Place appear across the archive?
  static getClaimsByPlace(placeId: string): Claim[] {
    return activeClaimsCache.filter(
      (c) => c.associatedPlaceIds.includes(placeId)
    );
  }

  static getEventsByPlace(placeId: string): Event[] {
    return eventsData.filter(
      (e) => e.placeId === placeId
    );
  }

  static getEventsByCivilization(civId: string): Event[] {
    return eventsData.filter(
      (e) => e.civilizationId === civId
    );
  }

  // Universal Search
  static search(
    query: string,
    lang: LanguageCode = 'en',
    entityTypeFilter: string = 'all',
    epistemicFilter?: EpistemicStatus
  ) {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{
      id: string;
      slug: string;
      type: string;
      title: string;
      subtitle?: string;
      epistemicStatus?: EpistemicStatus;
      path: string;
    }> = [];

    // Search Chapters
    if (entityTypeFilter === 'all' || entityTypeFilter === 'chapters') {
      for (const ch of chaptersData) {
        const titleMatch = ch.title[lang].toLowerCase().includes(q);
        const subMatch = ch.subtitle[lang].toLowerCase().includes(q);
        const absMatch = ch.abstract[lang].toLowerCase().includes(q);
        if (titleMatch || subMatch || absMatch) {
          results.push({
            id: ch.id,
            slug: ch.slug,
            type: 'chapter',
            title: ch.title[lang],
            subtitle: ch.subtitle[lang],
            path: `/${lang}/chapters/${ch.slug}`
          });
        }
      }
    }

    // Search Claims
    if (entityTypeFilter === 'all' || entityTypeFilter === 'claims') {
      for (const clm of claimsData) {
        if (epistemicFilter && clm.epistemicStatus !== epistemicFilter && clm.status !== epistemicFilter) continue;
        const stmtMatch = clm.statement[lang].toLowerCase().includes(q);
        const ratMatch = clm.epistemicRationale[lang].toLowerCase().includes(q);
        if (stmtMatch || ratMatch) {
          results.push({
            id: clm.id,
            slug: clm.slug,
            type: 'claim',
            title: clm.statement[lang],
            subtitle: clm.epistemicRationale[lang],
            epistemicStatus: clm.epistemicStatus,
            path: `/${lang}/research?claim=${clm.id}`
          });
        }
      }
    }

    // Search Texts
    if (entityTypeFilter === 'all' || entityTypeFilter === 'texts') {
      for (const t of textsData) {
        const titleMatch = t.title[lang].toLowerCase().includes(q);
        const origMatch = t.originalTitle?.toLowerCase().includes(q);
        const sumMatch = t.summary[lang].toLowerCase().includes(q);
        if (titleMatch || origMatch || sumMatch) {
          results.push({
            id: t.id,
            slug: t.slug,
            type: 'text',
            title: t.title[lang],
            subtitle: `${t.originalLanguage} · ${t.approximateDate}`,
            path: `/${lang}/sources?text=${t.id}`
          });
        }
      }
    }

    // Search People
    if (entityTypeFilter === 'all' || entityTypeFilter === 'people') {
      for (const p of peopleData) {
        const nameMatch = p.name[lang].toLowerCase().includes(q);
        const bioMatch = p.biography[lang].toLowerCase().includes(q);
        if (nameMatch || bioMatch) {
          results.push({
            id: p.id,
            slug: p.slug,
            type: 'person',
            title: p.name[lang],
            subtitle: p.role[lang],
            path: `/${lang}/people?id=${p.id}`
          });
        }
      }
    }

    // Search Places
    if (entityTypeFilter === 'all' || entityTypeFilter === 'places') {
      for (const pl of placesData) {
        const nameMatch = pl.name[lang].toLowerCase().includes(q);
        const descMatch = pl.description[lang].toLowerCase().includes(q);
        if (nameMatch || descMatch) {
          results.push({
            id: pl.id,
            slug: pl.slug,
            type: 'place',
            title: pl.name[lang],
            subtitle: `${pl.region[lang]} · ${pl.modernCountry[lang]}`,
            path: `/${lang}/places?id=${pl.id}`
          });
        }
      }
    }

    // Search Concepts
    if (entityTypeFilter === 'all' || entityTypeFilter === 'concepts') {
      for (const c of conceptsData) {
        const nameMatch = c.name[lang].toLowerCase().includes(q);
        const defMatch = c.definition[lang].toLowerCase().includes(q);
        if (nameMatch || defMatch) {
          results.push({
            id: c.id,
            slug: c.slug,
            type: 'concept',
            title: c.name[lang],
            subtitle: c.definition[lang],
            path: `/${lang}/concepts?id=${c.id}`
          });
        }
      }
    }

    // Search Sources
    if (entityTypeFilter === 'all' || entityTypeFilter === 'sources') {
      for (const s of sourcesData) {
        const titleMatch = s.title[lang].toLowerCase().includes(q);
        const authorMatch = s.authors.some((a) => a[lang].toLowerCase().includes(q));
        if (titleMatch || authorMatch) {
          results.push({
            id: s.id,
            slug: s.slug,
            type: 'source',
            title: s.title[lang],
            subtitle: s.authors.map((a) => a[lang]).join(', '),
            epistemicStatus: s.epistemicClass,
            path: `/${lang}/sources?id=${s.id}`
          });
        }
      }
    }

    return results;
  }
}
