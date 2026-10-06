import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, EpistemicStatus } from '../types/entities';

interface Translations {
  siteTitle: string;
  siteSubtitle: string;
  archiveSubtitle: string;
  nav: {
    home: string;
    collections: string;
    chapters: string;
    research: string;
    atlas: string;
    timeline: string;
    people: string;
    places: string;
    concepts: string;
    sources: string;
    search: string;
    about: string;
  };
  epistemicTiers: Record<EpistemicStatus, { label: string; description: string }>;
  actions: {
    readChapter: string;
    inspectClaims: string;
    viewEvidence: string;
    exploreAtlas: string;
    switchLanguage: string;
    searchPlaceholder: string;
    clearFilters: string;
    close: string;
    share: string;
    downloadCitation: string;
    jumpToSection: string;
    readTime: string;
    publishedBy: string;
    allCategories: string;
    methodologyNote: string;
  };
  labels: {
    primarySources: string;
    secondarySources: string;
    modernScholarship: string;
    editorialAnalysis: string;
    claimsIdentified: string;
    epistemicStatus: string;
    excavationProvenance: string;
    datingRange: string;
    datingMethod: string;
    currentLocation: string;
    verifiedBy: string;
    associatedEntities: string;
    competingHypotheses: string;
    deepTimeHorizon: string;
    civilizations: string;
    geography: string;
    author: string;
    readMore: string;
    backToChapters: string;
    relatedChapters: string;
    marginNotes: string;
  };
}

const UI_TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    siteTitle: '40,000 Years of Knowledge',
    siteSubtitle: 'Bilingual Research Archive & Knowledge Atlas',
    archiveSubtitle: 'A digital research library separating ancient testimony, archaeological evidence, and modern interpretation.',
    nav: {
      home: 'Home',
      collections: 'Collections',
      chapters: 'Chapters',
      research: 'Research & Claims',
      atlas: 'Knowledge Atlas',
      timeline: 'Timeline',
      people: 'People',
      places: 'Places',
      concepts: 'Concepts',
      sources: 'Sources',
      search: 'Search',
      about: 'About'
    },
    epistemicTiers: {
      unreviewed: {
        label: 'Unreviewed',
        description: 'Claim cataloged in the archive but not yet subjected to critical evidence audit.'
      },
      source_reported: {
        label: 'Source Reported (Unverified)',
        description: 'Recorded in a historical or ancient source; NOT independently verified by primary material proof.'
      },
      primary_source_located: {
        label: 'Primary Source Located',
        description: 'Direct physical manuscript or in situ epigraphic inscription physically recovered.'
      },
      partially_verified: {
        label: 'Partially Verified',
        description: 'Supported by indirect material or chronological indicators, but awaiting definitive confirmation.'
      },
      verified: {
        label: 'Verified Claim',
        description: 'Confirmed by multiple cross-calibrated material, stratigraphic, or scientific proofs.'
      },
      disputed: {
        label: 'Disputed Claim',
        description: 'Subject of active, substantiated academic contestation among specialists.'
      },
      unsupported: {
        label: 'Unsupported Claim',
        description: 'Asserted by tradition or later writers, but entirely lacking contemporaneous physical evidence.'
      },
      incorrect: {
        label: 'Incorrect / Refuted',
        description: 'Demonstrably contradicted by calibrated dating, stratigraphy, or forensic analysis.'
      },
      interpretive: {
        label: 'Interpretive Hypothesis',
        description: 'A theoretical, symbolic, or hermeneutic reading; plausible but distinct from empirical fact.'
      },
      open_question: {
        label: 'Open Question',
        description: 'A profound historical or linguistic enigma (e.g. undeciphered script) with no academic consensus.'
      },
      // Harmonized & source types
      uncertain: {
        label: 'Uncertain Claim',
        description: 'Insufficient material or epigraphic evidence to establish certainty.'
      },
      source_attested_unverified: {
        label: 'Source-Attested (Unverified)',
        description: 'Reported in an ancient textual source without independent verification.'
      },
      primary_source: {
        label: 'Primary Source',
        description: 'Direct physical artifact, tablet, or inscription from the period.'
      },
      secondary_source: {
        label: 'Secondary Source',
        description: 'Later historical compilation, commentary, or chronicle.'
      },
      modern_scholarship: {
        label: 'Modern Scholarship',
        description: 'Contemporary peer-reviewed scientific and historical analysis.'
      },
      editorial_analysis: {
        label: 'Editorial Analysis',
        description: 'Analytical synthesis formulated by the archive curators.'
      },
      interpretation: {
        label: 'Hermeneutic Interpretation',
        description: 'Theoretical, spiritual, or symbolic reading of evidence.'
      },
      source_material: {
        label: 'Source Material',
        description: 'Raw stratigraphic, radiocarbon, or survey data without synthesis.'
      }
    },
    actions: {
      readChapter: 'Read Monograph',
      inspectClaims: 'Inspect Claims',
      viewEvidence: 'Examine Evidence',
      exploreAtlas: 'Open Atlas',
      switchLanguage: 'اردو',
      searchPlaceholder: 'Search artifacts, claims, places, scholars, texts...',
      clearFilters: 'Reset Filters',
      close: 'Close',
      share: 'Share Link',
      downloadCitation: 'Export Citation',
      jumpToSection: 'Contents',
      readTime: 'min read',
      publishedBy: 'Curated by',
      allCategories: 'All Categories',
      methodologyNote: 'Methodological Standard'
    },
    labels: {
      primarySources: 'Primary Artifacts & Inscriptions',
      secondarySources: 'Secondary Accounts & Chronicles',
      modernScholarship: 'Peer-Reviewed Scholarship',
      editorialAnalysis: 'Archive Editorial Analysis',
      claimsIdentified: 'Formulated Claims',
      epistemicStatus: 'Epistemic Status',
      excavationProvenance: 'Provenance & Discovery',
      datingRange: 'Chronometric Horizon',
      datingMethod: 'Verification & Dating Method',
      currentLocation: 'Physical Repository',
      verifiedBy: 'Scientific Verification Bodies',
      associatedEntities: 'Relational Graph Nodes',
      competingHypotheses: 'Scholarly Competing Hypotheses',
      deepTimeHorizon: 'Deep-Time Chronology',
      civilizations: 'Civilizational Horizon',
      geography: 'Geographical Coordinates',
      author: 'Author / Scribe',
      readMore: 'Continue Reading',
      backToChapters: 'Back to Chapters',
      relatedChapters: 'Connected Monographs',
      marginNotes: 'Scholarly Marginalia & Sources'
    }
  },
  ur: {
    siteTitle: 'چالیس ہزار سالہ علم',
    siteSubtitle: 'دو لسانی تحقیقی آرکائیو اور علمی اٹلس',
    archiveSubtitle: 'ایک سنجیدہ ڈیجیٹل کتب خانہ جو قدیم گواہی، مادی شواہد، اور جدید تشریح میں واضح حد بندی قائم کرتا ہے۔',
    nav: {
      home: 'مرکزی صفحہ',
      collections: 'مجموعات',
      chapters: 'ابواب',
      research: 'تحقیق و دعوے',
      atlas: 'علمی اٹلس',
      timeline: 'تاریخی خط',
      people: 'شخصیات',
      places: 'مقامات',
      concepts: 'تصورات',
      sources: 'مآخذ و اسناد',
      search: 'تلاش',
      about: 'ہمارے بارے میں'
    },
    epistemicTiers: {
      unreviewed: {
        label: 'غیر جائزہ شدہ',
        description: 'دعوے کا اندراج ہو چکا ہے مگر تنقیدی سائنسی جانچ ابھی باقی ہے۔'
      },
      source_reported: {
        label: 'ماخذ میں مذکور (غیر مصدقہ)',
        description: 'قدیم یا تاریخی کتاب میں درج، مگر آزاد زمینی و سائنسی ثبوت سے تاحال غیر مصدقہ۔'
      },
      primary_source_located: {
        label: 'بنیادی مادی کتبہ موجود',
        description: 'اصل دور کا مٹی کا برتن، تختی یا پتھریلا کتبہ برآمد ہو چکا ہے۔'
      },
      partially_verified: {
        label: 'جزوی مصدقہ',
        description: 'ضمنی آثار و قرائن سے تائید شدہ مگر حتمی ثبوت کا انتظار ہے۔'
      },
      verified: {
        label: 'مصدقہ دعویٰ',
        description: 'متعدد آزاد سائنسی و ارضیاتی شواہد سے ثابت شدہ حقیقت۔'
      },
      disputed: {
        label: 'متنازعہ دعویٰ',
        description: 'ماہرین آثار قدیمہ و تاریخ کے درمیان فعال علمی اختلاف کا شکار۔'
      },
      unsupported: {
        label: 'بلا ثبوت دعویٰ',
        description: 'بعد کی روایات میں مذکور مگر اس دور کے مادی یا متنی شواہد سے یکسر خالی۔'
      },
      incorrect: {
        label: 'غلط / مسترد شدہ',
        description: 'سائنسی تاریخ پیمائی یا فرانزک جانچ سے باطل ثابت شدہ۔'
      },
      interpretive: {
        label: 'تشریحی مفروضہ',
        description: 'شواہد کا علامتی یا فلسفیانہ مفہوم؛ قابل فہم مگر مادی ثبوت سے الگ۔'
      },
      open_question: {
        label: 'کھلا سوال',
        description: 'ایک تاریخی یا لسانی معمہ (جیسے وادی سندھ کا رسم الخط) جس پر اتفاق رائے نہیں۔'
      },
      uncertain: {
        label: 'غیر یقینی دعویٰ',
        description: 'شواہد کی کمی کے باعث حتمی رائے قائم کرنا فی الحال ممکن نہیں۔'
      },
      source_attested_unverified: {
        label: 'ماخذ میں مذکور (غیر مصدقہ)',
        description: 'قدیم کتبات یا کتابوں میں درج مگر آزاد سائنسی توثیق سے محروم۔'
      },
      primary_source: {
        label: 'بنیادی ماخذ',
        description: 'اس دور کا اپنا کتبہ، تختی، برتن یا مادی باقیات۔'
      },
      secondary_source: {
        label: 'ثانوی ماخذ',
        description: 'بعد کے ادوار میں مرتب کردہ تاریخ، بیاض یا خلاصہ۔'
      },
      modern_scholarship: {
        label: 'جدید سائنسی تحقیق',
        description: 'ہم عصر محققین کے تصدیق شدہ سائنسی اور لسانی مقالے۔'
      },
      editorial_analysis: {
        label: 'ادارتی تجزیہ',
        description: 'اس تحقیقی پروجیکٹ کے محققین کی فکری و تجزیاتی ترکیب۔'
      },
      interpretation: {
        label: 'تشریح و تاویل',
        description: 'شواہد کا علامتی، نفسیاتی یا فلسفیانہ مفہوم۔'
      },
      source_material: {
        label: 'خام مادی مواد',
        description: 'زمین سے نکلی ہوئی خام ارضیاتی و کیمیائی پیمائشیں۔'
      }
    },
    actions: {
      readChapter: 'باب کا مطالعہ کریں',
      inspectClaims: 'دعووں کی جانچ پڑتال',
      viewEvidence: 'شواہد ملاحظہ کریں',
      exploreAtlas: 'اٹلس کھولیں',
      switchLanguage: 'English',
      searchPlaceholder: 'آثار، دعوے، شخصیات، مقامات، اور مآخذ تلاش کریں...',
      clearFilters: 'فلٹر ختم کریں',
      close: 'بند کریں',
      share: 'ربط شیئر کریں',
      downloadCitation: 'حوالہ نقل کریں',
      jumpToSection: 'فہرست مندرجات',
      readTime: 'منٹ مطالعہ',
      publishedBy: 'تحقیق و ترتیب',
      allCategories: 'تمام درجات',
      methodologyNote: 'تحقیقی ضابطہ'
    },
    labels: {
      primarySources: 'بنیادی مادی مآخذ و کتبات',
      secondarySources: 'ثانوی تاریخی کتب و روایات',
      modernScholarship: 'جدید سائنسی و تعلیمی مقالے',
      editorialAnalysis: 'آرکائیو کا ادارتی تجزیہ',
      claimsIdentified: 'مدون کردہ دعوے',
      epistemicStatus: 'علمی درجہ',
      excavationProvenance: 'دریافت اور جائے وقوعہ',
      datingRange: 'تاریخی و زمانی حدود',
      datingMethod: 'تاریخ پیمائی کا طریقہ کار',
      currentLocation: 'موجودہ مقام / عجائب گھر',
      verifiedBy: 'توثیق کرنے والے سائنسی ادارے',
      associatedEntities: 'متعلقہ علمی روابط',
      competingHypotheses: 'متبادل علمی آراء',
      deepTimeHorizon: 'عمیق وقت کا تاریخی دائرہ',
      civilizations: 'تہذیبی تعلق',
      geography: 'جغرافیائی نقاط',
      author: 'مصنف / کاتب',
      readMore: 'مزید پڑھیے',
      backToChapters: 'تمام ابواب کی طرف',
      relatedChapters: 'متعلقہ ابواب',
      marginNotes: 'علمی حواشی اور مآخذ'
    }
  }
};

interface LanguageContextType {
  language: LanguageCode;
  direction: 'ltr' | 'rtl';
  t: Translations;
  setLanguage: (lang: LanguageCode) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialLanguage = (): LanguageCode => {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/ur')) return 'ur';
    return 'en';
  };

  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  const direction: 'ltr' | 'rtl' = language === 'ur' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang);
    const currentPath = window.location.pathname;
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length > 0 && (parts[0] === 'en' || parts[0] === 'ur')) {
      parts[0] = newLang;
      const newPath = '/' + parts.join('/');
      window.history.pushState({}, '', newPath + window.location.search);
    } else {
      window.history.pushState({}, '', `/${newLang}${currentPath}`);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        t: UI_TRANSLATIONS[language],
        setLanguage,
        toggleLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
