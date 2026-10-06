import { Concept } from '../types/entities';

export const conceptsData: Concept[] = [
  {
    id: 'cnc-symbolic-consciousness',
    slug: 'symbolic-consciousness-and-external-memory',
    name: {
      en: 'Symbolic Consciousness & External Memory Scaffolding',
      ur: 'علامتی شعور اور خارجی یادداشت'
    },
    alternateTerms: [
      { en: 'Exogrammatic Storage', ur: 'خارجی علامتی ذخیرہ' },
      { en: 'Semiotic Revolution', ur: 'علامتی انقلاب' }
    ],
    category: 'epistemology',
    definition: {
      en: 'The human cognitive leap enabling the encoding of abstract thought, cosmological order, and communal memory onto external physical media (stone, bone, pigments, clay) beyond biological brain capacity.',
      ur: 'انسانی ادراک کی وہ جست جس نے تجریدی سوچ اور کائناتی مشاہدات کو مادی ذرائع (پتھر، ہڈی، رنگ اور مٹی) پر محفوظ کرنے کے قابل بنایا۔'
    },
    historicalEvolution: {
      en: 'From Upper Paleolithic notch-batons (40,000 BP) to Neolithic megalithic relief glyphs, culminating in standardized proto-cuneiform bureaucratic signs.',
      ur: 'چالیس ہزار سال قبل غاروں کے نشانات سے لے کر نو سنگی دور کے تراشیدہ ستونوں اور پھر میخی رسم الخط تک کا تسلسل۔'
    },
    civilizationIds: ['civ-upper-paleolithic', 'civ-pre-pottery-neolithic', 'civ-sumer-mesopotamia'],
    firstAttestedEpoch: 'Upper Paleolithic (c. 40,000 BP)',
    relatedConceptIds: ['cnc-epistemic-demarcation', 'cnc-cuneiform-transmission'],
    chapterIds: ['ch-01-symbolic-consciousness'],
    claimIds: ['clm-01-verified-aurignacian-art', 'clm-07-editorial-analysis-epistemic-transition']
  },
  {
    id: 'cnc-monumental-architecture',
    slug: 'monumental-sacred-architecture-pre-pottery',
    name: {
      en: 'Monumental Collective Architecture Before Agrarian Surplus',
      ur: 'زرعی فاضل پیداوار سے قبل یادگاری اجتماعی تعمیرات'
    },
    alternateTerms: [
      { en: 'Megalithic Aggregation', ur: 'یک سنگی تعمیراتی اجتماع' }
    ],
    category: 'material_culture',
    definition: {
      en: 'The architectural phenomenon whereby non-sedentary or semi-sedentary groups mobilized hundreds of coordinated laborers to quarry, sculpt, and erect massive stone monuments prior to the consolidation of farming.',
      ur: 'وہ تعمیراتی عمل جس میں نیم خانہ بدوش گروہوں نے مستقل زراعت شروع ہونے سے پہلے سینکڑوں افراد کے تعاون سے وزنی پتھر تراش کر یادگاریں قائم کیں۔'
    },
    historicalEvolution: {
      en: 'Challenged the 20th-century Childean orthodoxy that agriculture was a prerequisite for monumental public works.',
      ur: 'اس نے بیسویں صدی کے اس روایتی نظریے کو غلط ثابت کیا کہ یادگاری عمارتوں کے لیے پہلے مستقل زراعت اور غلے کی بچت لازمی شرط ہے۔'
    },
    civilizationIds: ['civ-pre-pottery-neolithic'],
    firstAttestedEpoch: 'Pre-Pottery Neolithic A (c. 9,600 BCE)',
    relatedConceptIds: ['cnc-symbolic-consciousness'],
    chapterIds: ['ch-02-neolithic-dawn'],
    claimIds: ['clm-02-disputed-gobekli-pure-cult', 'clm-06-interpretation-pillar-43-archaeoastronomy']
  },
  {
    id: 'cnc-epistemic-demarcation',
    slug: 'epistemic-demarcation-source-vs-interpretation',
    name: {
      en: 'Epistemic Demarcation: Source vs. Interpretation',
      ur: 'علمی حد بندی: ماخذ اور تعبیر کا اصولی فرق'
    },
    alternateTerms: [
      { en: 'Methodological Rigor in Historiography', ur: 'تاریخ نویسی میں سائنسی و تنقیدی احتیاط' }
    ],
    category: 'epistemology',
    definition: {
      en: 'The cardinal rule of research that prohibits silently transforming an ancient text’s internal assertion or modern hermeneutic hypothesis into an established empirical fact.',
      ur: 'تحقیق کا بنیادی اصول جس کی رو سے کسی قدیم متنی دعوے یا جدید تشریحی مفروضے کو بغیر آزاد ثبوت کے خاموشی سے قطعی حقیقت نہیں مانا جا سکتا۔'
    },
    historicalEvolution: {
      en: 'Articulated from classical historiographers (Thucydides, Ibn Khaldun) to modern forensic archaeology and emphasized in the 40,000 Years of Knowledge research architecture.',
      ur: 'ابن خلدون کے تنقیدی اصولوں سے لے کر جدید آثار قدیمہ تک اور بالخصوص اس ریسرچ پورٹل کے بنیادی منشور میں مدون۔'
    },
    civilizationIds: ['civ-sumer-mesopotamia', 'civ-indus-valley'],
    firstAttestedEpoch: 'Foundational Epistemological Principle',
    relatedConceptIds: ['cnc-symbolic-consciousness', 'cnc-decipherment-methodology'],
    chapterIds: ['ch-01-symbolic-consciousness', 'ch-03-cuneiform-revolution'],
    claimIds: ['clm-04-source-attested-berossus-chronology', 'clm-07-editorial-analysis-epistemic-transition']
  },
  {
    id: 'cnc-cuneiform-transmission',
    slug: 'cuneiform-textual-transmission-and-lexicography',
    name: {
      en: 'Cuneiform Textual Transmission & Lexicography',
      ur: 'میخی متنی ترسیل اور لغت نویسی'
    },
    alternateTerms: [
      { en: 'Edubba Scribal Curricula', ur: 'قدیم سومری درسگاہوں کا نصاب' }
    ],
    category: 'linguistics',
    definition: {
      en: 'The formalized educational apparatus and clay preservation technology that preserved Sumerian and Akkadian literature, mathematical tables, and royal inscriptions across three millennia.',
      ur: 'مٹی کی تختیوں کا وہ منظم نظام جس نے سومری اور اکادی ادب، ریاضی اور قوانین کو تین ہزار سال تک من و عن محفوظ رکھا۔'
    },
    historicalEvolution: {
      en: 'Evolved from Uruk IV economic tallies (c. 3,300 BCE) into bilingual lexical sign lists, epic poetry (Gilgamesh), and astronomical ephemerides.',
      ur: 'ارک کے ابتدائی کھاتوں سے شروع ہو کر گلگامش جیسے عظیم رزمیوں اور فلکیاتی جدولوں تک پھیلا۔'
    },
    civilizationIds: ['civ-sumer-mesopotamia'],
    firstAttestedEpoch: 'Late Uruk Period (c. 3,400 BCE)',
    relatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-03-cuneiform-revolution'],
    claimIds: ['clm-05-modern-scholarship-proto-cuneiform-origins']
  },
  {
    id: 'cnc-decipherment-methodology',
    slug: 'epigraphic-decipherment-methodology',
    name: {
      en: 'Epigraphic Decipherment & Corpus Methodology',
      ur: 'کتباتی حل رموز اور لسانی طریقہ کار'
    },
    category: 'science',
    definition: {
      en: 'The mathematical, phonological, and comparative principles necessary to independently crack lost ancient scripts, requiring bilingual inscriptions, substantial corpus size, or identifiable proper names.',
      ur: 'کسی قدیم رسم الخط کے رموز حل کرنے کے سائنسی اصول، جن کے لیے دو لسانی کتبہ یا وسیع متنی ذخیرہ بنیادی ضرورت ہے۔'
    },
    historicalEvolution: {
      en: 'Successfully demonstrated in Egyptian Hieroglyphs (Champollion, 1822) and Cuneiform (Rawlinson, 1857); currently constrained in the undeciphered Indus script.',
      ur: 'مصری ہیروگلیفس اور میخی خطوط میں کامیاب رہا، جبکہ وادی سندھ کے خط میں اب بھی محدود ہے۔'
    },
    civilizationIds: ['civ-indus-valley'],
    firstAttestedEpoch: '19th Century Historiographical Science',
    relatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-04-cosmological-models'],
    claimIds: ['clm-03-uncertain-indus-script-decipherment']
  }
];
