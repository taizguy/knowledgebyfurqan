import { Translation } from '../types/entities';

export const translationsData: Translation[] = [
  {
    id: 'trans-enheduanna-hallo',
    slug: 'exaltation-inanna-hallo-van-dijk-1968',
    sourceTextId: 'txt-exaltation-inanna',
    language: 'en',
    translator: {
      en: 'William W. Hallo & J.J.A. van Dijk',
      ur: 'ولیم ڈبلیو ہالو اور جے جے وین ڈائک'
    },
    year: 1968,
    text: 'Queen of all the me, radiant light, righteous woman clothed in brilliance, beloved of heaven and earth, hierodule of An!',
    translatorNotes: 'First definitive philological translation from Yale Near Eastern Researches combining 50+ cuneiform fragments.',
    epistemicNotes: {
      en: 'Peer-reviewed academic critical edition. Epigraphically verified against composite Ur and Nippur tablet witnesses.',
      ur: 'نپور اور اور سے ملنے والے 50 سے زائد میخی نسخوں کے تقابل سے تیار کردہ علمی ترجمہ۔'
    },
    originalScriptSample: '𒎏 𒈨 <ctrl42> 𒊏 𒌓 𒁕 𒀠 𒆷 𒌓 𒀀'
  },
  {
    id: 'trans-sumerian-king-list-jacobsen',
    slug: 'sumerian-king-list-thorkild-jacobsen-1939',
    sourceTextId: 'txt-sumerian-king-list',
    language: 'en',
    translator: {
      en: 'Thorkild Jacobsen (Oriental Institute of the University of Chicago)',
      ur: 'تھورکلڈ یاکوبسن (شکاگو یونیورسٹی)'
    },
    year: 1939,
    text: 'When kingship was lowered from heaven, kingship was in Eridu. In Eridu, Alulim became king and ruled 28,800 years; Alalngar ruled 36,000 years. Two kings; they ruled its 64,800 years. Then Eridu fell and kingship was taken to Bad-tibira.',
    translatorNotes: 'The classic edition of AS 11 (The Sumerian King List), translating the Weld-Blundell Prism WB 444.',
    epistemicNotes: {
      en: 'Rigorous philological rendering of the cuneiform text. Modern scholarship notes the antediluvian figures represent astronomical cosmological reckoning rather than literal history.',
      ur: 'میخی رسم الخط کا مستند ترجمہ۔ جدید محققین کے مطابق یہ غیر معمولی سال کائناتی و فلکیاتی حسابی اکائیوں کی علامت ہیں۔'
    },
    originalScriptSample: '𒉆 𒈗 𒀭 𒋫 𒌓 𒁺 𒀀 𒁀 𒉣 𒆠 𒉆 𒈗 𒆷'
  },
  {
    id: 'trans-chauvet-clottes',
    slug: 'chauvet-semiotic-transcription-clottes-2001',
    sourceTextId: 'txt-chauvet-parietal',
    language: 'en',
    translator: {
      en: 'Dr. Jean Clottes and French National Research Team',
      ur: 'ڈاکٹر ژاں کلوٹ اور فرانسیسی قومی ٹیم'
    },
    year: 2001,
    text: 'A deliberate compositional register where cave topography, charcoal shading, and volumetric rock relief are unified into an external mythogram.',
    translatorNotes: 'Semiotic interpretation of Upper Paleolithic parietal iconography without written phonetic language.',
    epistemicNotes: {
      en: 'Visual semiotics based on physical pigment analysis and 3D laser photogrammetry.',
      ur: 'رنگوں کے کیمیائی تجزیے اور تھری ڈی لیزر نقشہ کشی پر مبنی علامتی تشریح۔'
    }
  }
];
