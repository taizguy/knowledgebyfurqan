import { Civilization } from '../types/entities';

export const civilizationsData: Civilization[] = [
  {
    id: 'civ-upper-paleolithic',
    slug: 'upper-paleolithic-symbolic-foragers',
    name: {
      en: 'Upper Paleolithic Foraging Cultures',
      ur: 'بالائی قدیم سنگی دور کی شکاری ثقافتیں'
    },
    flourishedEra: 'c. 45,000 – 11,700 BP',
    approximateYearsRange: [-45000, -11700],
    primaryGeographicRegion: {
      en: 'Eurasian Steppe, Franco-Cantabrian Basin, Zagros Mountains & Levant',
      ur: 'یوریشین خطہ، فرانکو-کانتابرین طاس، اور کوہِ زاگرس'
    },
    description: {
      en: 'The formative horizon of Homo sapiens cognitive behavior characterized by representational parietal rock art, musical bone flutes, ochre processing, and calibrated celestial tracking notched into mobiliary antler batons.',
      ur: 'انسانی شعور کا وہ بنیادی دور جس میں غاروں کی مصوری، ہڈی کی بانسری، گیرو کے رنگ اور چاند کے مدارج کے حساب کے لیے سینگوں پر نشانات لگانے کا آغاز ہوا۔'
    },
    canonicalScriptOrLanguage: {
      en: 'Non-textual graphic semiotic notation (geometric signs, hand stencils, faunal iconography)',
      ur: 'غیر تحریری علامتی اور تصویری نشانات (ہاتھوں کے چھاپے اور ہندسی خاکے)'
    },
    epistemicRecordStatus: {
      en: 'Exclusively material archaeological strata, AMS radiocarbon dates, and forensic taphonomy',
      ur: 'صرف آثار قدیمہ کی ارضیاتی تہوں اور کاربن ڈیٹنگ پر مبنی مصدقہ ریکارڈ'
    },
    associatedPlaceIds: ['plc-chauvet'],
    canonicalTextIds: [],
    keyConceptIds: ['cnc-symbolic-consciousness']
  },
  {
    id: 'civ-pre-pottery-neolithic',
    slug: 'pre-pottery-neolithic-taurus-zagros',
    name: {
      en: 'Pre-Pottery Neolithic Horizon (Taurus-Zagros)',
      ur: 'قبل از ظروف نو سنگی تہذیب (توروس و زاگرس)'
    },
    flourishedEra: 'c. 10,000 – 7,000 BCE',
    approximateYearsRange: [-10000, -7000],
    primaryGeographicRegion: {
      en: 'Upper Mesopotamia (Şanlıurfa Plateau, Fertile Crescent Arc)',
      ur: 'بالائی میسوپوٹیمیا (شانلی اورفا سطح مرتفع، ہلال زرخیز)'
    },
    description: {
      en: 'Revolutionary transitional civilization that erected monumental stone circles at Göbekli Tepe and Karahan Tepe prior to pottery, initiating the domestication of einkorn wheat and social labor aggregation.',
      ur: 'وہ انقلابی عبوری تہذیب جس نے مٹی کے برتن بنانے سے قبل گوئبکلی تپہ جیسے عظیم الشان پتھروں کے مراکز تعمیر کیے اور گندم کی افزائش شروع کی۔'
    },
    canonicalScriptOrLanguage: {
      en: 'Monumental high-relief zoomorphic and anthropomorphic symbolic stone glyphs',
      ur: 'پتھروں پر تراشیدہ علامتی، حیوانی اور انسانی خاکے'
    },
    epistemicRecordStatus: {
      en: 'Stratigraphic architecture, osteoarchaeological faunal remains, and micro-botanical phytoliths',
      ur: 'عمارتوں کی مٹی کی تہیں، جانوروں کی ہڈیاں اور نباتاتی باقیات'
    },
    associatedPlaceIds: ['plc-gobekli-tepe'],
    canonicalTextIds: [],
    keyConceptIds: ['cnc-monumental-architecture']
  },
  {
    id: 'civ-sumer-mesopotamia',
    slug: 'sumer-and-ancient-mesopotamia',
    name: {
      en: 'Sumer & Mesopotamian City-States',
      ur: 'سومیر اور میسوپوٹیمیا کی شہری ریاستیں'
    },
    flourishedEra: 'c. 4,500 – 1,750 BCE',
    approximateYearsRange: [-4500, -1750],
    primaryGeographicRegion: {
      en: 'Tigris–Euphrates Alluvial Plains (Modern Southern Iraq)',
      ur: 'دجلہ و فرات کا میدانی خطہ (موجودہ جنوبی عراق)'
    },
    description: {
      en: 'The cradle of urban civilization where writing (cuneiform), sexagesimal mathematics, irrigation law codes, and monumental ziggurats originated, laying the bureaucratic and cosmological foundations of recorded history.',
      ur: 'شہری تمدن کا گہوارہ جہاں میخی تحریر، ریاضی کا حسابی نظام، آبپاشی کے قوانین اور عظیم معابد کا آغاز ہوا جس نے باقاعدہ تاریخ کی بنیاد رکھی۔'
    },
    canonicalScriptOrLanguage: {
      en: 'Sumerian language (isolate) & Akkadian (Semitic) written in cuneiform on clay',
      ur: 'سومری اور اکادی زبانیں جو مٹی پر میخی خط میں تحریر کی گئیں'
    },
    epistemicRecordStatus: {
      en: 'Extensive physical corpus of hundreds of thousands of deciphered clay cuneiform tablets',
      ur: 'لاکھوں کی تعداد میں مٹی کی تختیوں کا تصدیق شدہ اور حل شدہ کتباتی خزانہ'
    },
    associatedPlaceIds: ['plc-uruk'],
    canonicalTextIds: ['txt-uruk-tablets'],
    keyConceptIds: ['cnc-cuneiform-transmission', 'cnc-epistemic-demarcation']
  },
  {
    id: 'civ-indus-valley',
    slug: 'indus-valley-harappan-civilization',
    name: {
      en: 'Indus Valley (Harappan) Civilization',
      ur: 'وادی سندھ کی (ہڑپائی) تہذیب'
    },
    flourishedEra: 'c. 3,300 – 1,300 BCE (Mature Harappan 2600–1900 BCE)',
    approximateYearsRange: [-3300, -1300],
    primaryGeographicRegion: {
      en: 'Indus River Basin (Modern Pakistan & Northwest India)',
      ur: 'دریائے سندھ کا طاس (موجودہ پاکستان اور شمال مغربی بھارت)'
    },
    description: {
      en: 'Enormous Bronze Age urban civilization famous for advanced orthogonal grid urban planning, hydraulic municipal sewerage, standardized binary-decimal weights, and enigmatic uncracked glyphs.',
      ur: 'کانسی کے دور کی عظیم ترین شہری تہذیب جو گلیوں کی باقاعدہ منصوبہ بندی، زیر زمین نکاسی آب اور معیاری اوزان کے لیے دنیا بھر میں منفرد حیثیت رکھتی ہے۔'
    },
    canonicalScriptOrLanguage: {
      en: 'Indus Script (undeciphered steatite seal iconography)',
      ur: 'وادی سندھ کا رسم الخط (تاحال غیر حل شدہ علامات)'
    },
    epistemicRecordStatus: {
      en: 'Rich material urban architecture and thousands of seals; linguistic content remains uncertain',
      ur: 'شاندار مادی اور تعمیری شواہد، لیکن لسانی تحریر ابھی تک غیر حل شدہ معمہ ہے'
    },
    associatedPlaceIds: ['plc-mohenjo-daro'],
    canonicalTextIds: [],
    keyConceptIds: ['cnc-decipherment-methodology']
  }
];
