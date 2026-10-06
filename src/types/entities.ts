/**
 * 40,000 Years of Knowledge — Core Knowledge Architecture Entity Models
 * Strict separation of source material, primary sources, secondary sources,
 * modern scholarship, editorial analysis, and interpretation.
 * Never silently convert an interpretation into a fact.
 */

export type LanguageCode = 'en' | 'ur';

export interface BilingualString {
  en: string;
  ur: string;
}

export interface BilingualContent {
  en: string;
  ur: string;
}

/**
 * 10 Research Claim Statuses:
 * 1. Unreviewed
 * 2. Source Reported (Crucial: does NOT imply verified!)
 * 3. Primary Source Located
 * 4. Partially Verified
 * 5. Verified
 * 6. Disputed
 * 7. Unsupported
 * 8. Incorrect
 * 9. Interpretive
 * 10. Open Question
 */
export type ClaimStatus =
  | 'unreviewed'
  | 'source_reported'
  | 'primary_source_located'
  | 'partially_verified'
  | 'verified'
  | 'disputed'
  | 'unsupported'
  | 'incorrect'
  | 'interpretive'
  | 'open_question';

/**
 * Epistemic Status (Harmonizes claim statuses with source and analysis classifications)
 */
export type EpistemicStatus =
  | ClaimStatus
  | 'uncertain'
  | 'source_attested_unverified'
  | 'primary_source'
  | 'secondary_source'
  | 'modern_scholarship'
  | 'editorial_analysis'
  | 'interpretation'
  | 'source_material';

/**
 * Source Types (17 Structured Classifications)
 */
export type SourceType =
  | 'primary_text'
  | 'religious_text'
  | 'hadith'
  | 'ancient_text'
  | 'inscription'
  | 'archaeological_evidence'
  | 'academic_paper'
  | 'academic_book'
  | 'scientific_institution'
  | 'museum'
  | 'encyclopedia'
  | 'government_archive'
  | 'interview'
  | 'video'
  | 'podcast'
  | 'website'
  | 'other';

export interface Tag {
  id: string;
  slug: string;
  label: BilingualString;
  category: 'epoch' | 'discipline' | 'region' | 'theme' | 'epistemology';
}

export interface MediaItem {
  id: string;
  type: 'image' | 'manuscript_scan' | 'inscription' | 'map' | 'audio' | 'rock_art';
  url: string;
  caption: BilingualString;
  credit: BilingualString;
  license: string;
  institution?: BilingualString;
  accessionNumber?: string;
  dimensions?: string;
}

export interface Citation {
  id: string;
  sourceId: string;
  author?: BilingualString;
  title?: BilingualString;
  publication?: BilingualString;
  date?: string;
  sourceType?: SourceType;
  pageOrFolio?: string;
  passageRef?: string;
  timestamp?: string; // e.g., "18:52" for video/audio/podcast sources
  url?: string;
  quote?: BilingualString;
  annotation?: BilingualString;
  epistemicTier?: 'primary' | 'secondary' | 'critical_edition' | 'peer_reviewed_journal';
}

export interface ResearchNote {
  id: string;
  slug: string;
  title: BilingualString;
  author: BilingualString;
  dateCreated: string;
  relatedEntityId: string;
  relatedEntityType: 'Chapter' | 'Claim' | 'Source' | 'Person' | 'Place' | 'Concept' | 'Text';
  content: BilingualContent;
  epistemicLevel: 'editorial_analysis' | 'scholarly_note' | 'comparative_hypothesis';
  citationIds: string[];
}

export interface Translation {
  id: string;
  slug?: string;
  sourceTextId: string;
  language: LanguageCode;
  translator: BilingualString;
  year: number | string;
  text: string;
  translatorNotes?: string;
  epistemicNotes?: BilingualString;
  originalScriptSample?: string;
}

export interface Quote {
  id: string;
  sourceId: string;
  authorId?: string;
  passage: BilingualString;
  originalLanguageText?: string;
  originalLanguageName?: string;
  context: BilingualString;
  citationId?: string;
  relatedClaimIds?: string[];
}

export interface Text {
  id: string;
  slug: string;
  title: BilingualString;
  originalTitle?: string;
  originalLanguage: string;
  approximateDate: string; // e.g., "c. 2300 BCE" or "36,000 BP"
  civilizationId: string;
  authorId?: string;
  medium: BilingualString;
  summary: BilingualContent;
  extantManuscriptsSummary: BilingualString;
  primarySourceId?: string;
  tagIds: string[];
  claimIds?: string[];
  quoteIds?: string[];
  translationIds?: string[];
}

export interface PrimarySource {
  id: string;
  slug: string;
  title: BilingualString;
  originalTitle?: string;
  originalLanguage?: string;
  originalText?: string; // Original untranslated epigraphic or textual transcription
  translation?: BilingualString;
  translator?: BilingualString;
  edition?: BilingualString;
  date: string;
  datingRange: string;
  artifactType: 'inscription' | 'manuscript' | 'osteological' | 'stratigraphic' | 'numismatic' | 'rock_art';
  currentLocation: BilingualString;
  accessionNumber?: string;
  provenance: BilingualString;
  datingMethod: BilingualString;
  materialForm: BilingualString;
  preservationStatus: BilingualString;
  verifiedBy: BilingualString[];
  epistemicNotes: BilingualString;
  citation?: BilingualString;
  sourceImageUrl?: string;
  mediaItemIds: string[];
  associatedClaimIds?: string[];
  // Cardinal distinction: what artifact states vs modern interpretation
  interpretationDistinction?: {
    originalAttestation: BilingualString;
    physicalProof: BilingualString;
    scholarlyInterpretation: BilingualString;
  };
}

export interface Source {
  id: string;
  slug: string;
  title: BilingualString;
  authors: BilingualString[];
  publication: BilingualString; // Publisher, journal, or issuing body
  publicationYearOrEpoch: string;
  sourceType: SourceType;
  url?: string;
  archiveUrl?: string; // Permanent archive link (e.g. archive.org or institutional repository)
  isbn?: string;
  doi?: string;
  language: string;
  description: BilingualContent;
  reliabilityNotes: BilingualString;
  accessDate?: string;
  citationInformation: BilingualString;
  timestamp?: string; // For audiovisual material e.g. "18:52"
  primarySourceDetailId?: string;
  epistemicClass: EpistemicStatus;
  criticalEditionNotes?: BilingualString;
  claimIds?: string[];
  // Backwards compatibility helpers
  publisherOrOrigin?: BilingualString;
  reliabilityAssessment?: BilingualString;
  urlOrDoi?: string;
}

export interface Claim {
  id: string;
  slug: string;
  statement: BilingualString;
  language: LanguageCode;
  chapterId?: string;
  sectionId?: string;
  timestamp?: string; // Originating timestamp from audiovisual/lecture material e.g. "18:42"
  claimType: 'historical' | 'archaeological' | 'astronomical' | 'epigraphic' | 'theological' | 'linguistic' | 'anthropological' | 'cosmological';
  status: ClaimStatus; // Official 10-tier claim status
  epistemicStatus: EpistemicStatus; // Harmonized alias
  confidence: 'high' | 'medium' | 'low' | 'contested' | 'speculative' | 'unsupported';
  confidenceRating: 'firmly_established' | 'scholarly_majority' | 'contested_hypothesis' | 'tradition_only';
  epistemicRationale: BilingualString;
  primarySourceIds: string[];
  secondarySourceIds: string[];
  // Supporting and Contradicting Evidence Breakdown
  supportingEvidence?: BilingualContent[];
  contradictingEvidence?: BilingualContent[];
  editorialNotes?: BilingualContent;
  researchNoteIds?: string[];
  relatedClaimIds?: string[];
  // Core Archive Demarcation Formula:
  // Source says X · Primary evidence indicates Y · Modern scholarship concludes Z · Editorial assessment
  archiveDissection?: {
    sourceSays: BilingualString;
    primaryEvidenceIndicates: BilingualString;
    modernScholarshipConcludes: BilingualString;
    editorialAssessment: BilingualString;
  };
  competingViewpoints?: {
    perspective: BilingualString;
    proponents: BilingualString;
    counterEvidence: BilingualString;
    sourceIds: string[];
  }[];
  associatedPersonIds: string[];
  associatedPlaceIds: string[];
  associatedConceptIds: string[];
  associatedEventIds?: string[];
  chapterIds: string[];
}

export interface Person {
  id: string;
  slug: string;
  name: BilingualString;
  alternateNames?: BilingualString[];
  eraOrLifespan: string;
  role: BilingualString;
  civilizationId?: string;
  civilizationIds: string[];
  biography: BilingualContent;
  primaryTextIds: string[];
  associatedEventIds: string[];
  associatedClaimIds: string[];
  associatedChapterIds?: string[];
  imageMediaId?: string;
}

export interface Place {
  id: string;
  slug: string;
  name: BilingualString;
  ancientNames?: BilingualString[];
  region: BilingualString;
  modernCountry: BilingualString;
  coordinates: {
    lat: number;
    lng: number;
  };
  earliestOccupation: string;
  archaeologicalStratum: BilingualString;
  civilizationIds: string[];
  description: BilingualContent;
  excavationHistory: BilingualContent;
  primaryArtifactIds: string[];
  associatedEventIds: string[];
  associatedClaimIds?: string[];
  mediaItemIds: string[];
}

// ==========================================
// Chronology & Structured Date Model
// ==========================================

export type DateType =
  | 'exact'
  | 'approximate'
  | 'range'
  | 'century'
  | 'millennium'
  | 'period'
  | 'traditional'
  | 'disputed'
  | 'unknown';

export type DatePrecision =
  | 'exact_day'
  | 'exact_year'
  | 'decade'
  | 'century'
  | 'millennium'
  | 'epoch_broad'
  | 'uncertain';

export type CalendarSystem =
  | 'gregorian_proleptic'
  | 'julian'
  | 'astronomical'
  | 'islamic_hijri'
  | 'sumerian_regnal'
  | 'biblical_traditional';

export type DateBasis =
  | 'radiocarbon_calibrated'
  | 'stratigraphic'
  | 'dendrochronology'
  | 'astronomical_ephemeris'
  | 'epigraphic_text'
  | 'traditional_record'
  | 'scholarly_estimate'
  | 'source_reported_provisional'
  | 'unknown';

export type ChronologicalConfidence =
  | 'firmly_established'
  | 'scholarly_majority'
  | 'contested_hypothesis'
  | 'traditional_narrative'
  | 'speculative_conjecture'
  | 'unverified';

export interface AlternativeDateProposal {
  id: string;
  proposalName: BilingualString;
  earliestYear: number; // Signed year: negative for BCE, positive for CE (no year zero)
  latestYear: number;
  displayLabel: BilingualString;
  proponentOrSource: BilingualString;
  basis: BilingualString;
  datingMethod?: DateBasis;
  sourceId?: string;
  confidence: 'high' | 'medium' | 'contested' | 'speculative';
  notes?: BilingualContent;
}

export interface HistoricalDate {
  dateType: DateType;
  earliestYear: number; // Signed year: negative for BCE, positive for CE (no year zero)
  latestYear: number;   // For point events earliestYear === latestYear; for intervals earliestYear < latestYear
  precision: DatePrecision;
  calendarSystem: CalendarSystem;
  era: 'BCE' | 'CE' | 'BP';
  displayLabel: BilingualString;
  isApproximate: boolean;
  isDisputed: boolean;
  dateBasis: DateBasis;
  datingMethodDescription?: BilingualString;
  alternativeDates?: AlternativeDateProposal[];
  supportingSourceIds?: string[];
  editorialNotes?: BilingualContent;
}

export type EventCategory =
  | 'civilizations'
  | 'political'
  | 'religious'
  | 'people'
  | 'texts'
  | 'archaeology'
  | 'science'
  | 'technology'
  | 'writing'
  | 'migration'
  | 'environment'
  | 'culture'
  | 'source_collection';

export type HistoricalEpoch =
  | 'cosmological'
  | 'paleolithic'
  | 'neolithic'
  | 'bronze_age'
  | 'iron_age'
  | 'classical'
  | 'late_antiquity'
  | 'medieval'
  | 'early_modern'
  | 'contemporary';

export interface Event {
  id: string;
  slug: string;
  title: BilingualString;
  summary: BilingualContent;
  description: BilingualContent;
  categories: EventCategory[];
  historicalDate: HistoricalDate;
  // Backwards compatibility fields
  approximateDate: string;
  rawYearBPOrBCE: number; // Negative for BCE/BP, positive for CE
  yearDisplay: BilingualString;
  chronologicalValue: number;
  epoch: HistoricalEpoch;
  // Relational Entity IDs
  placeId: string;
  associatedPlaceIds?: string[];
  civilizationId: string;
  associatedCivilizationIds?: string[];
  relatedPersonIds: string[];
  associatedPersonIds?: string[];
  canonicalTextIds?: string[];
  associatedTextIds?: string[];
  associatedConceptIds?: string[];
  chapterId?: string;
  associatedChapterIds?: string[];
  claimIds: string[];
  primarySourceIds: string[];
  supportingSourceIds?: string[];
  contradictingSourceIds?: string[];
  researchNoteIds?: string[];
  epistemicStatus: EpistemicStatus;
  chronologicalConfidence: ChronologicalConfidence;
  publicationStatus: 'published' | 'under_review' | 'provisional';
  editorialNotes?: BilingualContent;
  isSourceReported?: boolean;
}

export type TimelineEvent = Event;

export interface Civilization {
  id: string;
  slug: string;
  name: BilingualString;
  flourishedEra: string;
  approximateYearsRange: [number, number]; // [startBP_BCE, endBP_BCE]
  primaryGeographicRegion: BilingualString;
  description: BilingualContent;
  canonicalScriptOrLanguage: BilingualString;
  epistemicRecordStatus: BilingualString;
  associatedPlaceIds: string[];
  canonicalTextIds: string[];
  keyConceptIds: string[];
}

export interface Concept {
  id: string;
  slug: string;
  name: BilingualString;
  alternateTerms?: BilingualString[];
  category: 'cosmology' | 'epistemology' | 'linguistics' | 'social_order' | 'theology' | 'science' | 'material_culture';
  definition: BilingualContent;
  historicalEvolution: BilingualContent;
  civilizationIds: string[];
  firstAttestedEpoch: string;
  relatedConceptIds: string[];
  chapterIds: string[];
  claimIds: string[];
}

export interface ChapterSection {
  id: string;
  order: number;
  heading: BilingualString;
  subheading?: BilingualString;
  body: BilingualContent;
  epistemicCallout?: {
    status: EpistemicStatus;
    text: BilingualString;
    sourceIds: string[];
  };
  claimIds: string[];
  citationIds: string[];
  mediaItemId?: string;
}

export interface Chapter {
  id: string;
  collectionId: string;
  chapterNumber: number;
  slug: string;
  title: BilingualString;
  subtitle: BilingualString;
  abstract: BilingualContent;
  timeframe: string;
  readTimeMinutes: number;
  // Archival Source Preservation Fields
  originalSourceTitle?: string;
  originalSourceUrl?: string;
  originalSourceCreator?: string;
  publicationDate?: string;
  duration?: string;
  researchStatus?: string;
  originalDescription?: BilingualContent;
  provisionalTimestamps?: Array<{
    time: string;
    title: string;
    isProvisional: boolean;
    sectionNote?: string;
  }>;
  sections: ChapterSection[];
  concludingSynthesis: BilingualContent;
  methodologicalNotice: BilingualContent;
  claimIds: string[];
  primarySourceIds: string[];
  secondarySourceIds: string[];
  personIds: string[];
  placeIds: string[];
  conceptIds: string[];
  civilizationIds: string[];
  timelineEventIds: string[];
  citationIds: string[];
  researchNoteIds?: string[];
  relatedChapterIds?: string[];
  featuredMediaId?: string;
  // Epistemic Demarcation Matrices
  scientificEvidence?: Array<{
    topic: BilingualString;
    consensus: BilingualString;
    limitations: BilingualString;
    citations?: string[];
  }>;
  historicalEvidence?: Array<{
    civilization: BilingualString;
    record: BilingualString;
    limitations: BilingualString;
    sourceIds?: string[];
  }>;
  religiousTexts?: Array<{
    tradition: BilingualString;
    passage: BilingualString;
    citation: string;
    hermeneuticStatus: BilingualString;
  }>;
}

export interface Article {
  id: string;
  slug: string;
  title: BilingualString;
  deck: BilingualString;
  author: BilingualString;
  publicationDate: string;
  content: BilingualContent;
  epistemicType: 'editorial_analysis' | 'modern_scholarship' | 'archival_critique' | 'historiographical_survey';
  chapterId?: string;
  claimIds: string[];
  sourceIds: string[];
  citationIds: string[];
  tagIds: string[];
}

export interface Collection {
  id: string;
  slug: string;
  title: BilingualString;
  curator: BilingualString;
  creatorSource?: BilingualString;
  collectionType?: string;
  languageScope?: BilingualString;
  researchStatus?: string;
  epochSpan: string;
  scopeNotice: BilingualContent;
  description: BilingualContent;
  methodology?: BilingualContent;
  topics?: BilingualString[];
  chapterIds: string[];
  articleIds: string[];
  featured: boolean;
  relatedResearch?: Array<{
    title: BilingualString;
    description: BilingualContent;
    url?: string;
  }>;
}

export interface ResearchWorkspaceStats {
  totalChapters: number;
  totalClaims: number;
  unreviewedClaims: number;
  claimsWithEvidence: number;
  openQuestions: number;
  disputedClaims: number;
  verifiedClaims: number;
  sourceReportedClaims: number;
  interpretiveClaims: number;
  partiallyVerifiedClaims: number;
  primarySourcesLocated: number;
}

export interface ResearchProjectSummary {
  chapterId: string;
  chapterSlug: string;
  chapterNumber: number;
  title: BilingualString;
  collectionTitle: BilingualString;
  sourceCreator: string;
  sourceUrl: string;
  publicationDate: string;
  duration: string;
  totalClaimsCount: number;
  reviewedClaimsCount: number;
  verifiedClaimsCount: number;
  disputedClaimsCount: number;
  openQuestionsCount: number;
  evidenceAttachmentRate: number; // 0 to 100 percentage
  provisionalTimestampsCount: number;
  editorialStatus: string;
  outstandingTasks: string[];
}

/**
 * Knowledge Atlas Graph Types
 */
export type AtlasNodeType =
  | 'collection'
  | 'chapter'
  | 'section'
  | 'claim'
  | 'source'
  | 'primary_source'
  | 'person'
  | 'place'
  | 'event'
  | 'concept'
  | 'civilization'
  | 'text'
  | 'timeline_event';

export type RelationshipType =
  | 'contains'
  | 'references'
  | 'supports'
  | 'contradicts'
  | 'discusses'
  | 'associated_with'
  | 'participated_in'
  | 'occurred_at'
  | 'located_in'
  | 'part_of'
  | 'influenced'
  | 'derived_from'
  | 'interprets'
  | 'chronologically_precedes'
  | 'chronologically_follows'
  | 'related_concept'
  | 'related_chapter';

export type RelationshipEditorialStatus =
  | 'documented' // Directly attested in ancient inscription or physical artifact
  | 'cited'      // Corroborated in peer-reviewed academic literature
  | 'proposed'   // Editorially formulated research hypothesis
  | 'disputed';  // Contested relationship with conflicting evidence

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  description?: BilingualString;
  supportingSourceIds?: string[];
  editorialStatus: RelationshipEditorialStatus;
  notes?: BilingualString;
  weight?: number;
}

export interface AtlasNode {
  id: string;
  type: AtlasNodeType;
  label: BilingualString;
  subtitle?: BilingualString;
  description?: BilingualString;
  epistemicStatus?: EpistemicStatus;
  dating?: string;
  entityId: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  connectionsCount?: number;
}


