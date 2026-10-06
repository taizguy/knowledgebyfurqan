import {
  HistoricalDate,
  DateType,
  DatePrecision,
  CalendarSystem,
  DateBasis,
  ChronologicalConfidence,
  AlternativeDateProposal,
  EventCategory,
  HistoricalEpoch,
  BilingualString,
  LanguageCode
} from '../types/entities';

/**
 * Historical Year Calculations & Semantics
 *
 * NOTE ON YEAR ZERO:
 * Conventional historical BCE/CE notation has NO year zero:
 * ... 3 BCE (-3), 2 BCE (-2), 1 BCE (-1), 1 CE (+1), 2 CE (+2), 3 CE (+3) ...
 *
 * In this system:
 * - Positive integers denote CE: +1 = 1 CE, +1929 = 1929 CE.
 * - Negative integers denote BCE: -1 = 1 BCE, -9600 = 9600 BCE, -38000 = 38,000 BP.
 * - Zero is mathematically undefined in conventional history; if zero is encountered, it is treated as 1 BCE.
 */

/**
 * Calculates the exact duration in historical solar years between two signed years.
 * Correctly accounts for the absence of year zero.
 */
export function calculateYearSpan(earliestYear: number, latestYear: number): number {
  if (earliestYear === latestYear) return 0;
  const start = Math.min(earliestYear, latestYear);
  const end = Math.max(earliestYear, latestYear);

  if (start < 0 && end > 0) {
    // Across the BCE/CE boundary: subtract 1 because there is no year 0
    return end - start - 1;
  }
  return end - start;
}

/**
 * Converts signed year to an object with positive year and era string.
 */
export function signedYearToHistorical(signedYear: number): { year: number; era: 'BCE' | 'CE' | 'BP' } {
  if (signedYear <= -12000) {
    return { year: Math.abs(signedYear), era: 'BP' };
  }
  if (signedYear < 0) {
    return { year: Math.abs(signedYear), era: 'BCE' };
  }
  return { year: Math.max(1, signedYear), era: 'CE' };
}

/**
 * Formats a signed year into standard historical notation in English or Urdu.
 */
export function formatSignedYear(signedYear: number, lang: LanguageCode = 'en'): string {
  const isUrdu = lang === 'ur';

  // Deep Prehistory (Before Present notation)
  if (signedYear <= -12000) {
    const bp = Math.abs(signedYear).toLocaleString();
    return isUrdu ? `${bp} سال قبل (BP)` : `${bp} BP`;
  }

  // BCE years
  if (signedYear < 0) {
    const yr = Math.abs(signedYear).toLocaleString();
    return isUrdu ? `${yr} قبل مسیح` : `${yr} BCE`;
  }

  // CE years
  const yr = signedYear.toLocaleString();
  return isUrdu ? `${yr}ء (CE)` : `${yr} CE`;
}

/**
 * Formats a HistoricalDate into scholarly text based on type, precision, and basis.
 */
export function formatHistoricalDate(date: HistoricalDate, lang: LanguageCode = 'en'): string {
  const isUrdu = lang === 'ur';

  // If explicit localized display label is provided and valid, return it
  if (date.displayLabel && date.displayLabel[lang]) {
    return date.displayLabel[lang];
  }

  if (date.dateType === 'unknown') {
    return isUrdu ? 'تاریخ نامعلوم / غیر متعین' : 'Date Unknown / Undetermined';
  }

  const earliestStr = formatSignedYear(date.earliestYear, lang);
  const latestStr = formatSignedYear(date.latestYear, lang);

  if (date.earliestYear === date.latestYear) {
    if (date.isApproximate) {
      return isUrdu ? `تقریباً ${earliestStr}` : `c. ${earliestStr}`;
    }
    return earliestStr;
  }

  // Range
  if (date.dateType === 'range' || date.earliestYear !== date.latestYear) {
    if (date.isApproximate) {
      return isUrdu
        ? `تقریباً ${earliestStr} تا ${latestStr}`
        : `c. ${earliestStr} – ${latestStr}`;
    }
    return isUrdu
      ? `${earliestStr} تا ${latestStr}`
      : `${earliestStr} – ${latestStr}`;
  }

  return earliestStr;
}

/**
 * Evaluates the HistoricalEpoch associated with a given signed year.
 */
export function getEpochForYear(year: number): HistoricalEpoch {
  if (year < -100000) return 'cosmological';
  if (year <= -10000) return 'paleolithic';
  if (year <= -4000) return 'neolithic';
  if (year <= -1200) return 'bronze_age';
  if (year <= -500) return 'iron_age';
  if (year <= 300) return 'classical';
  if (year <= 800) return 'late_antiquity';
  if (year <= 1450) return 'medieval';
  if (year <= 1800) return 'early_modern';
  return 'contemporary';
}

/**
 * Canonical Epoch Definitions with Date Bounds and Localized Titles
 */
export interface EpochDefinition {
  id: HistoricalEpoch;
  title: BilingualString;
  dating: BilingualString;
  startYear: number;
  endYear: number;
  description: BilingualString;
}

export const EPOCH_DEFINITIONS: EpochDefinition[] = [
  {
    id: 'cosmological',
    title: { en: 'Cosmological Deep Time', ur: 'کائناتی عمیق وقت' },
    dating: { en: '13.8 Ga – 40,000 BP', ur: '13.8 ارب سال تا 40,000 سال قبل' },
    startYear: -13800000000,
    endYear: -40000,
    description: {
      en: 'Spacetime origin, cosmic microwave background, primordial nucleosynthesis, and solar system formation.',
      ur: 'کائنات کا آغاز، کائناتی پس منظر کی شعاعیں، اور زمینی کرہ کا ظہور۔'
    }
  },
  {
    id: 'paleolithic',
    title: { en: 'Upper Paleolithic', ur: 'بالائی قدیم سنگی دور' },
    dating: { en: '40,000 – 10,000 BCE', ur: '40,000 تا 10,000 قبل مسیح' },
    startYear: -40000,
    endYear: -10000,
    description: {
      en: 'Parietal cave art, externalized memory systems, ochre pigmentation, and hunter-forager symbolic systems.',
      ur: 'غاروں کی مصوری، خارجی علامتی ریکارڈ، اور انسان کے ابتدائی شعوری مظاہر۔'
    }
  },
  {
    id: 'neolithic',
    title: { en: 'Neolithic & Sedentism', ur: 'نو سنگی دور اور زراعت کا آغاز' },
    dating: { en: '10,000 – 4000 BCE', ur: '10,000 تا 4,000 قبل مسیح' },
    startYear: -10000,
    endYear: -4000,
    description: {
      en: 'Megalithic enclosures at Göbekli Tepe, plant domestication, pastoralism, and permanent village settlements.',
      ur: 'گوئبکلی تپہ کی یادگاری تعمیرات، زراعت، اور مستقل بستیوں کا ظہور۔'
    }
  },
  {
    id: 'bronze_age',
    title: { en: 'Bronze Age & Urban Dawn', ur: 'کانسی کا دور اور شہری انقلاب' },
    dating: { en: '4000 – 1200 BCE', ur: '4,000 تا 1,200 قبل مسیح' },
    startYear: -4000,
    endYear: -1200,
    description: {
      en: 'Proto-cuneiform literacy at Uruk, Egyptian Old Kingdom, Indus grid urbanism at Mohenjo-Daro, and Enheduanna’s poetry.',
      ur: 'میسوپوٹیمیا میں پہلی تحریر، سندھ کی شہری منصوبہ بندی، اور اہرام مصر۔'
    }
  },
  {
    id: 'iron_age',
    title: { en: 'Iron Age & Axial Shifts', ur: 'لوہے کا دور اور فکری تبدیلیاں' },
    dating: { en: '1200 – 500 BCE', ur: '1,200 تا 500 قبل مسیح' },
    startYear: -1200,
    endYear: -500,
    description: {
      en: 'Alphabetic writing, Neo-Assyrian celestial tablets (KAR 307), Babylonian Enuma Elish recension, and early Upanishads.',
      ur: 'حروف تہجی کا پھیلاؤ، بابل کی کونیاتی مہمات، اور فلسفیانہ متون کی تدوین۔'
    }
  },
  {
    id: 'classical',
    title: { en: 'Classical Antiquity', ur: 'کلاسیکی عہد' },
    dating: { en: '500 BCE – 300 CE', ur: '500 قبل مسیح تا 300ء' },
    startYear: -500,
    endYear: 300,
    description: {
      en: 'Aristotelian celestial spheres, Hellenistic astronomy, Ptolemaic models, and Berossus’s Babyloniaca.',
      ur: 'ارسطو کی کونیات، بطلیموس کا نظام، اور بیروسس کی تاریخ بابل۔'
    }
  },
  {
    id: 'late_antiquity',
    title: { en: 'Late Antiquity & Revelation', ur: 'عہد اواخر و آغاز اسلام' },
    dating: { en: '300 – 800 CE', ur: '300ء تا 800ء' },
    startYear: 300,
    endYear: 800,
    description: {
      en: 'Quranic revelation, early Islamic expansion, Sasanian astronomy, and translation movements.',
      ur: 'قرآنی نزول، کائنات اور سات آسمانوں کا قرآنی تصور، اور سائنسی متون کا تبادلہ۔'
    }
  },
  {
    id: 'medieval',
    title: { en: 'Islamic Golden Age & Medieval Era', ur: 'عہد زریں اور قرون وسطیٰ' },
    dating: { en: '800 – 1450 CE', ur: '800ء تا 1450ء' },
    startYear: 800,
    endYear: 1450,
    description: {
      en: 'Ibn al-Haytham’s optics, Maragha observatory, Al-Biruni’s geodetics, and scholastic science.',
      ur: 'ابن الہیثم کی بصریات، مراغہ رصدگاہ، اور البیرونی کی تحقیقات۔'
    }
  },
  {
    id: 'early_modern',
    title: { en: 'Early Modern Scientific Dawn', ur: 'ابتدائی جدید سائنسی دور' },
    dating: { en: '1450 – 1800 CE', ur: '1450ء تا 1800ء' },
    startYear: 1450,
    endYear: 1800,
    description: {
      en: 'Copernican heliocentrism, Galileo’s telescopic observations, Newtonian mechanics, and the printing revolution.',
      ur: 'کوپرنیکس کا شمسی مرکزیت کا ماڈل، گلیلیو کی دوربین، اور نیوٹن کے قوانین۔'
    }
  },
  {
    id: 'contemporary',
    title: { en: 'Contemporary Physical Astrophysics', ur: 'عصر حاضر کی فلکی طبعیات' },
    dating: { en: '1800 CE – Present', ur: '1800ء تا موجودہ دور' },
    startYear: 1800,
    endYear: 2026,
    description: {
      en: 'Hubble cosmic expansion, Penzias-Wilson CMB discovery, General Relativity, and satellite cosmology.',
      ur: 'ہبل کا کائناتی پھیلاؤ، سی ایم بی ریڈی ایشن، اور جدید فلکیاتی مشاہدات۔'
    }
  }
];

/**
 * Event Categories Metadata with Localized Names and Styling Hints
 */
export const EVENT_CATEGORY_META: Record<
  EventCategory,
  { label: BilingualString; color: string; description: BilingualString }
> = {
  science: {
    label: { en: 'Scientific Discoveries', ur: 'سائنسی دریافتیں' },
    color: '#1E3A5F',
    description: { en: 'Observational astronomy, astrophysics, physics, and empirical measurements.', ur: 'فلکیاتی و سائنسی مشاہدات۔' }
  },
  archaeology: {
    label: { en: 'Archaeology & Excavations', ur: 'آثار قدیمہ و کھدائیاں' },
    color: '#B8934A',
    description: { en: 'Material culture, strata, megaliths, and radiocarbon dating sites.', ur: 'مادی ثقافت اور کھدائی کے شواہد۔' }
  },
  texts: {
    label: { en: 'Texts & Inscriptions', ur: 'کلاسیکی متون و کتبات' },
    color: '#2D5A43',
    description: { en: 'Cuneiform tablets, papyri, epigraphy, manuscripts, and scrolls.', ur: 'تختیاں، نسخے اور کتبات۔' }
  },
  civilizations: {
    label: { en: 'Civilizations & Dynasties', ur: 'تہذیبیں و سلطنتیں' },
    color: '#8B261E',
    description: { en: 'Polities, urban centers, and civilizational emergence.', ur: 'ریاستیں اور شہری مراکز۔' }
  },
  religious: {
    label: { en: 'Religious History & Revelations', ur: 'مذہبی تاریخ و الہامات' },
    color: '#633B76',
    description: { en: 'Theological frameworks, revelations, traditions, and sacred canons.', ur: 'الہامی و روایتی متون۔' }
  },
  technology: {
    label: { en: 'Technological Developments', ur: 'ٹیکنالوجی اور ایجادات' },
    color: '#345E69',
    description: { en: 'Metallurgy, hydraulic systems, optics, and instruments.', ur: 'اوزار، پیمانے اور آلات۔' }
  },
  writing: {
    label: { en: 'Writing Systems & Scripts', ur: 'رسم الخط و تحریر' },
    color: '#4A5568',
    description: { en: 'Invention of script, logograms, alphabets, and scribal administration.', ur: 'رسم الخط کی ایجاد و ارتقاء۔' }
  },
  people: {
    label: { en: 'Key Figures & Biographies', ur: 'اہم شخصیات' },
    color: '#744210',
    description: { en: 'Pioneers, astronomers, scribes, prophets, and philosophers.', ur: 'سائنسدان، فلاسفہ اور مؤرخین۔' }
  },
  political: {
    label: { en: 'Political & Statecraft', ur: 'سیاسی تاریخ' },
    color: '#702459',
    description: { en: 'Treaties, imperial edicts, dynastic shifts, and law codes.', ur: 'معاہدات اور قوانین۔' }
  },
  migration: {
    label: { en: 'Migrations & Demographics', ur: 'ہجرتیں و آباد کاری' },
    color: '#2C5282',
    description: { en: 'Human dispersals, maritime trade corridors, and population movements.', ur: 'انسانی ہجرت اور نقل مکانی۔' }
  },
  environment: {
    label: { en: 'Environmental & Geological', ur: 'ماحولیاتی و ارضیاتی واقعات' },
    color: '#285E61',
    description: { en: 'Glacial epochs, volcanic events, megadroughts, and river shifts.', ur: 'گلیشیائی ادوار اور ماحولیاتی تبدیلیاں۔' }
  },
  culture: {
    label: { en: 'Cultural & Symbolic Arts', ur: 'ثقافتی و فنی ارتقاء' },
    color: '#975A16',
    description: { en: 'Artistic traditions, architectural monuments, and mythologies.', ur: 'فنون لطیفہ اور روایات۔' }
  },
  source_collection: {
    label: { en: 'Source Collection: 40k Years', ur: 'آرکائیو مجموعہ: 40 ہزار سالہ علم' },
    color: '#1A202C',
    description: { en: 'Key episodes investigated in Furqan Qureshi Blogs Chapter series.', ur: 'تحقیقی سلسلے میں زیر بحث موضوعات۔' }
  }
};

/**
 * Date Basis Descriptions with Archival Methodology
 */
export const DATE_BASIS_META: Record<
  DateBasis,
  { label: BilingualString; description: BilingualString }
> = {
  radiocarbon_calibrated: {
    label: { en: 'Radiocarbon 14C (AMS Calibrated)', ur: 'ریڈیو کاربن 14C (لیبارٹری جانچ)' },
    description: {
      en: 'Direct physical carbon decay measurement calibrated against tree-ring intcal curves.',
      ur: 'نامیاتی مادے کی کاربن 14 کے ذریعے سائنسی و کیمیائی پیمائش۔'
    }
  },
  stratigraphic: {
    label: { en: 'Stratigraphic Excavation Layer', ur: 'ارضیاتی و آثاریاتی پرت (Stratigraphy)' },
    description: {
      en: 'Relative archaeological chronology derived from undisturbed superimposed soil layers.',
      ur: 'کھدائی کے دوران مٹی کی تہوں اور ملبے سے متعین کردہ تاریخ۔'
    }
  },
  dendrochronology: {
    label: { en: 'Dendrochronology (Tree-Ring)', ur: 'درختوں کے حلقوں سے تاریخ (Dendrochronology)' },
    description: {
      en: 'Absolute annual calendar calibration from continuous master tree-ring sequences.',
      ur: 'درخت کے تنے کے سالانہ دائروں سے ایک ایک سال کا حتمی حساب۔'
    }
  },
  astronomical_ephemeris: {
    label: { en: 'Astronomical Ephemeris & Retrocalculation', ur: 'فلکیاتی حسابات و گرہن' },
    description: {
      en: 'Documented solar/lunar eclipses or planetary conjunctions verified via retro-ephemeris.',
      ur: 'قدیم متون میں درج سورج گرہن یا سیاروں کے اجتماع کا جدید فلکیاتی حسابی تعین۔'
    }
  },
  epigraphic_text: {
    label: { en: 'Epigraphic Inscription / Contemporary Text', ur: 'ہم عصر کتبہ یا شاہی دستاویز' },
    description: {
      en: 'Direct regnal year or contemporary dated document incised in stone or clay.',
      ur: 'پتھر یا مٹی پر کندہ ہم عصر شاہی ریکارڈ یا تاریخی مہر۔'
    }
  },
  traditional_record: {
    label: { en: 'Traditional / Religious Chronology', ur: 'روایتی و مذہبی تقویم' },
    description: {
      en: 'Date preserved in scriptural or theological historiography, demarcated from physical proof.',
      ur: 'مذہبی روایات اور قدیم تواریخ میں منقول بیان؛ مادی سائنسی ثبوت سے الگ رکھا گیا ہے۔'
    }
  },
  scholarly_estimate: {
    label: { en: 'Modern Academic Consensus Estimate', ur: 'جدید علمی اتفاق کا تخمینہ' },
    description: {
      en: 'Synthesized chronological window established by modern peer-reviewed scholarship.',
      ur: 'متعدد بین العلومی شواہد کی روشنی میں جدید محققین کا متفقہ تخمینہ۔'
    }
  },
  source_reported_provisional: {
    label: { en: 'Source-Reported Assertion (Provisional)', ur: 'ماخذ میں مذکور بیان (عارضی)' },
    description: {
      en: 'Date asserted by original video lecturer; provisional pending independent verification.',
      ur: 'اصل لیکچر میں مذکور دعویٰ؛ آزادانہ تحقیق تک عارضی درجہ دیا گیا ہے۔'
    }
  },
  unknown: {
    label: { en: 'Unknown / Undetermined', ur: 'نامعلوم / غیر مصدقہ' },
    description: {
      en: 'Insufficient archaeological, epigraphic, or physical evidence exists to establish dating.',
      ur: 'تاریخ کا تعین کرنے کے لیے ناکافی شواہد موجود ہیں۔'
    }
  }
};
