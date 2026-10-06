import { Collection } from '../types/entities';

export const collectionsData: Collection[] = [
  {
    id: 'col-40k-series',
    slug: '40000-years-of-knowledge-series',
    title: {
      en: '40,000 Years of Knowledge',
      ur: 'چالیس ہزار سالہ علم'
    },
    curator: {
      en: 'Furqan Qureshi (Furqan Qureshi Blogs)',
      ur: 'فرقان قریشی (فرقان قریشی بلاگز)'
    },
    creatorSource: {
      en: 'Furqan Qureshi Blogs',
      ur: 'فرقان قریشی بلاگز'
    },
    collectionType: 'Video research series',
    languageScope: {
      en: 'Urdu / English mixed source material',
      ur: 'اردو اور انگریزی مخلوط ماخذی مواد'
    },
    researchStatus: 'Active Archival Ingestion & Critical Verification',
    epochSpan: '40,000 BP – Contemporary Cosmos',
    featured: true,
    scopeNotice: {
      en: 'An ongoing archival research inquiry exploring humanity’s record of existence, astronomical models, ancient archaeology, religious traditions, and modern scientific discoveries.',
      ur: 'انسانی وجود، کائناتی ماڈلز، قدیم آثار، مذہبی روایات اور جدید سائنسی دریافتوں کا احاطہ کرنے والا ایک وسیع تر تحقیقی مجموعہ۔'
    },
    description: {
      en: 'The "40,000 Years of Knowledge" series originates as a long-form video and textual research inquiry produced by Furqan Qureshi Blogs. Rather than serving as an uncritical broadcast transcript, this archive catalogs each chapter as an empirical research workspace: preserving original video metadata and provisional timestamps while subjecting every assertion to strict independent epistemic audit, primary artifact cross-referencing, and modern scientific scrutiny.',
      ur: 'فرقان قریشی بلاگز کا یہ وڈیو ریسرچ سلسلہ انسانی علم اور تاریخ کے اہم ترین سوالات پر محیط ہے۔ ہمارا آرکائیو اسے محض ایک ویڈیو پلے لسٹ کے طور پر نہیں بلکہ ایک باضابطہ تحقیقی کتب خانے کے طور پر منظم کرتا ہے، جہاں اصل لیکچر کے بیانات کو محفوظ رکھتے ہوئے ان کی آزادانہ سائنسی اور تاریخی جانچ پڑتال کی جاتی ہے۔'
    },
    methodology: {
      en: 'The archive operates under a strict four-way demarcation rule: (1) Original Source Information represents the spoken arguments, timestamps, and hypotheses of the creator; (2) Archive Editorial Information provides historiographical framing and context; (3) Research Findings denote independently verified empirical proofs; (4) Unverified Claims remain strictly marked as provisional or open questions. Never silently convert an interpretation into a fact.',
      ur: 'تحقیقی ضابطہ: (۱) اصل ماخذ کی معلومات (لیکچرار کا بیان و ٹائم اسٹیمپس)؛ (۲) ادارتی و تاریخی تناظر؛ (۳) آزادانہ سائنسی و ارضیاتی شواہد؛ (۴) غیر مصدقہ دعوؤں کی واضح نشاندہی۔ کسی بھی تشریح کو از خود حتمی حقیقت نہیں مانا جاتا۔'
    },
    topics: [
      {
        en: 'Cosmology & the Origin of the Universe',
        ur: 'کونیات اور کائنات کا آغاز'
      },
      {
        en: 'The Seven Skies (Sab’a Samawat) in Ancient & Scripture Lore',
        ur: 'قدیم روایات اور آسمانی کتب میں سات آسمان'
      },
      {
        en: 'Paleolithic Symbolic Consciousness & Parietal Rock Art',
        ur: 'قدیم حجری دور کا علامتی شعور اور غاروں کی مصوری'
      },
      {
        en: 'Neolithic Monumental Enclosures & Göbekli Tepe',
        ur: 'نو سنگی دور کی عظیم عبادت گاہیں اور گوئبکلی تپہ'
      },
      {
        en: 'The Invention of Cuneiform & Administrative Memory',
        ur: 'میخی رسم الخط کی ایجاد اور تحریری یادداشت'
      },
      {
        en: 'Epistemic Demarcation: Separating Science from Speculation',
        ur: 'علمیاتی حد بندی: سائنس، روایت اور قیاس آرائی میں تمیز'
      }
    ],
    chapterIds: [
      'ch-01-universe-seven-skies',
      'ch-02-neolithic-dawn',
      'ch-03-cuneiform-revolution',
      'ch-04-cosmological-models'
    ],
    articleIds: ['art-methodological-epistemology'],
    relatedResearch: [
      {
        title: {
          en: 'The Epistemic Charter: Demarcating Fact from Hermeneutic Tradition',
          ur: 'علمیاتی چارٹر: مادی حقائق اور تاویلی روایات میں فرق'
        },
        description: {
          en: 'The foundational methodological guidelines governing source ingestion and evidence auditing in the 40,000 Years archive.',
          ur: 'اس آرکائیو میں ماخذی مواد کی جانچ پڑتال کے لیے بنیادی سائنسی اور فکری اصول۔'
        },
        url: '/research'
      },
      {
        title: {
          en: 'Comparative Ancient Near Eastern & Quranic Cosmologies',
          ur: 'قدیم مشرق قریب اور قرآنی کائناتی تصورات کا تقابلی مطالعہ'
        },
        description: {
          en: 'Investigation into celestial sphere models, the firmament, and observational horizon physics.',
          ur: 'آسمانی کروں، گنبد اور جدید فلکیاتی افق کی سائنسی اور تاریخی تحقیق۔'
        },
        url: '/concepts?id=cnc-epistemic-demarcation'
      }
    ]
  },
  {
    id: 'col-comparative-cosmology',
    slug: 'comparative-ancient-cosmologies',
    title: {
      en: 'Comparative Ancient Cosmologies Archive',
      ur: 'تقابلی قدیم کائناتی نظریات کا آرکائیو'
    },
    curator: {
      en: 'Research Editorial Board',
      ur: 'تحقیقی مجلسِ ادارت'
    },
    collectionType: 'Monograph synthesis',
    epochSpan: 'c. 3,500 BCE – 500 CE',
    featured: false,
    scopeNotice: {
      en: 'A systematic cross-cultural repository analyzing cosmological models across Mesopotamia, Egypt, the Indus Valley, Vedic South Asia, Pre-Socratic Greece, and Han China.',
      ur: 'میسوپوٹیمیا، قدیم مصر، وادی سندھ، یونان اور قدیم چین کے کائناتی افکار کا تقابلی اور سائنسی مطالعہ۔'
    },
    description: {
      en: 'Examines how distinct civilizations mapped the heavens, computed calendars, and rationalized terrestrial order through astral architecture and celestial mathematics.',
      ur: 'یہ جانچ پڑتال کہ مختلف تہذیبوں نے آسمان کے ستاروں کے نقشے کیسے بنائے، تقویم کیسے تیار کی، اور ریاضی کے ذریعے زمینی نظم و ضبط کیسے قائم کیا۔'
    },
    chapterIds: ['ch-04-cosmological-models'],
    articleIds: []
  },
  {
    id: 'col-epistemic-methodology',
    slug: 'methodological-charter-and-epistemology',
    title: {
      en: 'Epistemic Demarcation & Historiographical Methodology',
      ur: 'علمی حد بندی اور تاریخ نویسی کے اصول و ضوابط'
    },
    curator: {
      en: 'Furqan Qureshi Research Archive',
      ur: 'فرقان قریشی ریسرچ آرکائیو'
    },
    collectionType: 'Methodological charter',
    epochSpan: 'Perpetual Methodological Standard',
    featured: false,
    scopeNotice: {
      en: 'The epistemological constitution governing all research published in the atlas.',
      ur: 'اس علمی اٹلس میں شائع ہونے والی تمام تحقیقات کے لیے ضابطہ اخلاق اور طریقہ کار۔'
    },
    description: {
      en: 'Articulates the strict 10-tier distinction between primary physical artifacts, secondary witnesses, unverified traditions, and modern peer-reviewed scholarship.',
      ur: 'ماخذ، ثانوی روایات، غیر مصدقہ دعوؤں اور جدید سائنسی تحقیق کے درمیان دس رکنی فرق کی تفصیلی وضاحت۔'
    },
    chapterIds: [],
    articleIds: ['art-methodological-epistemology']
  }
];
