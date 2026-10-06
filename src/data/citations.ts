import { Citation } from '../types/entities';

export const citationsData: Record<string, Citation> = {
  'cit-clottes-2003-p42': {
    id: 'cit-clottes-2003-p42',
    sourceId: 'src-clottes-2003',
    author: { en: 'Dr. Jean Clottes', ur: 'ڈاکٹر ژاں کلوٹ' },
    title: { en: 'Return to Chauvet Cave: Excavating the Oldest Known Cave Art', ur: 'شووہ غار کی طرف واپسی' },
    publication: { en: 'Thames & Hudson, London', ur: 'تھامس اینڈ ہڈسن، لندن' },
    date: '2003',
    sourceType: 'academic_book',
    pageOrFolio: 'pp. 42–48',
    passageRef: 'Section: Radiocarbon Calibration and Pigment Analysis',
    url: 'https://thamesandhudson.com/return-to-chauvet-cave-9780500511190',
    quote: {
      en: 'The charcoal determinations from the Salle des Panneaux and Megaloceros Gallery converge upon an Aurignacian age between 36,000 and 37,000 cal BP, rendering Chauvet one of the oldest attested parietal sanctuaries in human prehistory.',
      ur: 'شووہ غار کے کوئلے کے نمونوں سے حاصل شدہ تاریخیں 36 سے 37 ہزار سال قبل کی طرف اشارہ کرتی ہیں، جو اسے انسانی تاریخ کی قدیم ترین مصور پناہ گاہ ثابت کرتی ہیں۔'
    },
    annotation: {
      en: 'Sample verified independently by Gif-sur-Yvette and Laboratoire de Recherche des Monuments Historiques.',
      ur: 'دو آزاد فرانسیسی لیبارٹریوں کی جانب سے تصدیق شدہ نمونے۔'
    },
    epistemicTier: 'primary'
  },
  'cit-schmidt-2006-p112': {
    id: 'cit-schmidt-2006-p112',
    sourceId: 'src-schmidt-2006',
    author: { en: 'Prof. Dr. Klaus Schmidt', ur: 'پروفیسر ڈاکٹر کلاؤس شمٹ' },
    title: { en: 'Sie bauten die ersten Tempel: Das rätselhafte Heiligtum der Steinzeitjäger', ur: 'انہوں نے پہلے معبد تعمیر کیے' },
    publication: { en: 'C.H. Beck Verlag, Munich', ur: 'سی ایچ بیک، میونخ' },
    date: '2006',
    sourceType: 'academic_book',
    pageOrFolio: 'pp. 112–119',
    passageRef: 'Chapter 4: The Pillars of Enclosure D',
    url: 'https://www.chbeck.de/schmidt-bauten-ersten-tempel/product/18797',
    quote: {
      en: 'The monolithic T-pillars must be understood not as architectural roof supports, but as stone representations of stylized anthropomorphic beings presiding over sacred assemblies.',
      ur: 'یہ ٹی شکل کے یک سنگی ستون چھت کو سہارا دینے کے لیے نہیں بلکہ مقدس اجتماعات کی صدارت کرنے والے انسان نما مظاہر کے طور پر تراشے گئے تھے۔'
    },
    annotation: {
      en: 'Primary hypothesis of Klaus Schmidt; remains the standard baseline against which subsequent domestic and functional hypotheses are debated.',
      ur: 'کلاؤس شمٹ کا بنیادی نظریہ، جس پر اب نئی کھدائیوں کے بعد بھی بحث جاری ہے۔'
    },
    epistemicTier: 'primary'
  },
  'cit-glassner-2003-p15': {
    id: 'cit-glassner-2003-p15',
    sourceId: 'src-glassner-2003',
    author: { en: 'Jean-Jacques Glassner', ur: 'ژاں ژاک گلاسنر' },
    title: { en: 'The Invention of Cuneiform: Writing in Sumer', ur: 'میخی خط کی ایجاد' },
    publication: { en: 'Johns Hopkins University Press, Baltimore', ur: 'جانز ہاپکنز یونیورسٹی پریس' },
    date: '2003',
    sourceType: 'academic_book',
    pageOrFolio: 'pp. 15–23',
    passageRef: 'Introduction: Beyond the Accounting Token Mirage',
    url: 'https://www.press.jhu.edu/books/title/2723/invention-cuneiform',
    quote: {
      en: 'Writing in Mesopotamia was not an accidental derivative of bullae and counting tokens; it was a deliberate semiological rupture, creating a visual language to represent the cognitive taxonomy of the universe.',
      ur: 'میسوپوٹیمیا میں تحریر محض گنتی کے مٹی کے گولوں کا اتفاقی نتیجہ نہیں تھی، بلکہ یہ کائنات کے فکری نظم کو ظاہر کرنے کے لیے ایک باقاعدہ تخلیق کردہ تصویری زبان تھی۔'
    },
    annotation: {
      en: 'Crucial philological critique establishing that proto-cuneiform possessed intellectual intentionality beyond mere merchant receipts.',
      ur: 'اہم لسانی تحقیق جس نے ثابت کیا کہ تحریر محض دکانداری کا حساب نہیں بلکہ فکری انقلاب تھی۔'
    },
    epistemicTier: 'peer_reviewed_journal'
  },
  'cit-berossus-frag-1': {
    id: 'cit-berossus-frag-1',
    sourceId: 'src-berossus-babyloniaca',
    author: { en: 'Berossus of Babylon', ur: 'بیروسس (کاہنِ بابل)' },
    title: { en: 'Babyloniaca (Fragments in Eusebius Chronicon)', ur: 'بیبلونیاکا (یونانی اقتباسات)' },
    publication: { en: 'Felix Jacoby (ed.), FGrHist 680 F 1', ur: 'فیلکس یاکوبی، FGrHist 680' },
    date: 'c. 280 BCE',
    sourceType: 'ancient_text',
    pageOrFolio: 'Fragment 1 (FGrHist 680 F 1)',
    passageRef: 'Preserved in Eusebius, Chronicon I',
    quote: {
      en: 'In the reign of the first king, Aloros of Babylon, there ruled ten kings for a duration of 120 saroi, each saros comprising 3,600 years, yielding 432,000 years in total before the great flood inundated the land.',
      ur: 'پہلے بادشاہ الورس سے لے کر طوفان نوح تک دس بادشاہوں نے مجموعی طور پر 120 ساروی یعنی 432,000 سال حکومت کی۔'
    },
    annotation: {
      en: 'Secondary preservation of Hellenistic date. Represents traditional temple chronology based on sexagesimal multiples (120 × 3,600). Must not be conflated with empirical physical history.',
      ur: 'یونانی دور میں محفوظ شدہ روایت جو سومری حسابی ریاضی پر مبنی ہے، اس کا مادی تاریخ سے کوئی تعلق نہیں۔'
    },
    epistemicTier: 'secondary'
  },
  'cit-qureshi-2024-p1': {
    id: 'cit-qureshi-2024-p1',
    sourceId: 'src-qureshi-archive',
    author: { en: 'Furqan Qureshi', ur: 'فرقان قریشی' },
    title: { en: '40,000 Years of Knowledge: Research Archive & Monograph Papers', ur: 'چالیس ہزار سالہ علم: تحقیقی آرکائیو' },
    publication: { en: 'Furqan Qureshi Blogs, Paper 1', ur: 'فرقان قریشی بلاگز' },
    date: '2024',
    sourceType: 'video',
    pageOrFolio: 'Paper 1, pp. 3–9',
    passageRef: 'The 40,000-Year Memory Horizon',
    timestamp: 'Furqan Qureshi Blogs · Chapter 01 · 18:52',
    url: 'https://furqanqureshi.com/40000-years',
    quote: {
      en: 'The deepest crisis in modern historiography is the silent substitution of conjecture for verified material provenance. When an archaeological report lists an artifact, that is evidence; when an interpreter assigns an intention, that is a hypothesis. A civilizational archive must keep the two perpetually distinct.',
      ur: 'جدید تاریخ نویسی کا سب سے بڑا المیہ یہ ہے کہ قیاس آرائی کو خاموشی سے مصدقہ حقیقت بنا دیا جاتا ہے۔ جب کوئی رپورٹ کسی قدیم برتن کی موجودگی بتاتی ہے تو وہ ثبوت ہے؛ لیکن جب کوئی اس کے پیچھے نیت بیان کرتا ہے تو وہ مفروضہ ہے۔ ایک سچے علمی محافظ خانے کو ان دونوں میں ہمیشہ واضح فرق رکھنا چاہیے۔'
    },
    annotation: {
      en: 'Foundational methodological manifesto of the 40,000 Years of Knowledge initiative, articulating the 10-tier demarcation.',
      ur: 'چالیس ہزار سالہ علم ریسرچ پروجیکٹ کا بنیادی طریقہ کار اور منشور۔'
    },
    epistemicTier: 'peer_reviewed_journal'
  }
};
