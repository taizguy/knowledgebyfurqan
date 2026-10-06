import { Source, PrimarySource } from '../types/entities';

export const primarySourcesData: PrimarySource[] = [
  {
    id: 'ps-chauvet-panel',
    slug: 'chauvet-pont-d-arc-rock-panels',
    title: {
      en: 'Chauvet-Pont-d’Arc Wall Panel Stencils & Charcoal Megafauna',
      ur: 'شووہ غار کی دیواروں پر پینٹنگز اور کوئلے سے بنی تصاویر'
    },
    originalTitle: 'Grotte Chauvet-Pont d’Arc: Panneau des Chevaux et des Lions',
    originalLanguage: 'Non-textual graphic notation (Ochre & Charcoal pigments)',
    originalText: '[Graphic parietal notation: 440+ faunal representations including lions, mammoths, and positive/negative hand stencils]',
    translation: {
      en: 'Parietal visual narrative encoding megafauna ecology, natural cave morphology, and human communal presence without textual script.',
      ur: 'بغیر تحریری الفاظ کے قدرتی غار کی بناوٹ اور جانوروں کے ماحولیاتی مشاہدات کا مصور اور علامتی بیان۔'
    },
    translator: {
      en: 'Visual semiotic transcription by Dr. Jean Clottes and CNRS speleologists',
      ur: 'ڈاکٹر ژاں کلوٹ اور فرانسیسی ماہرین کا علامتی جائزہ'
    },
    edition: {
      en: 'CNRS Parietal Research Survey Edition (2001)',
      ur: 'سی این آر ایس پیرائیٹل سروے ایڈیشن (2001)'
    },
    date: 'c. 36,000 – 37,000 cal BP',
    datingRange: '37,000 – 33,500 BP (Calibrated AMS)',
    artifactType: 'rock_art',
    currentLocation: {
      en: 'Vallon-Pont-d’Arc, Ardèche, France (Access Restricted; Exact Facsimile at Grotte Chauvet 2)',
      ur: 'آردیش، فرانس (حفاظتی نقطہ نظر سے رسائی محدود؛ ہو بہو نقل شووہ 2 میں موجود)'
    },
    accessionNumber: 'CHV-ARC-1994-01',
    provenance: {
      en: 'Discovered in situ December 18, 1994 by Jean-Marie Chauvet, Éliette Brunel, and Christian Hillaire',
      ur: '18 دسمبر 1994 کو ژاں میری شووہ اور ساتھیوں نے دریافت کیا'
    },
    datingMethod: {
      en: 'AMS Radiocarbon Dating on charcoal pigments (Gif-sur-Yvette & Lyon Laboratoires: 36,000–37,000 cal BP)',
      ur: 'کوئلے کے ذرات کی ریڈیو کاربن تاریخ پیمائی (تقریباً 36,000 سے 37,000 سال قبل)'
    },
    materialForm: {
      en: 'Charcoal and red iron-oxide pigments on natural karstic limestone',
      ur: 'قدرتی چونے کے پتھر پر لکڑی کا کوئلہ اور گیرو (آئرن آکسائیڈ)'
    },
    preservationStatus: {
      en: 'Pristine sealed chamber, protected by natural rockfall ~21,500 BP',
      ur: '21,500 سال قبل پتھر گرنے کی وجہ سے غار سیل ہو کر قدرتی طور پر محفوظ رہی'
    },
    verifiedBy: [
      { en: 'CNRS (French National Centre for Scientific Research)', ur: 'سی این آر ایس (فرانسیسی قومی مرکز برائے سائنسی تحقیق)' },
      { en: 'Laboratoire des Sciences du Climat et de l’Environnement (LSCE)', ur: 'فرانسیسی ماحولیاتی لیبارٹری' }
    ],
    epistemicNotes: {
      en: 'Direct empirical carbon dates from pigment samples cross-verified by 8 international laboratories, proving Aurignacian antiquity.',
      ur: 'مختلف بین الاقوامی تجربہ گاہوں کی جانب سے کوئلے کے نمونوں کی ریڈیو کاربن تاریخ کی آزادانہ توثیق۔'
    },
    citation: {
      en: 'Clottes, J. (ed.) 2001. La Grotte Chauvet: L’art des origines. Paris: Éditions du Seuil.',
      ur: 'ژاں کلوٹ، شووہ غار: آغاز کا فن، پیرس، 2001'
    },
    sourceImageUrl: '/src/assets/images/paleolithic_cave_art_1791226824905.jpg',
    mediaItemIds: ['media-paleolithic-art'],
    associatedClaimIds: ['clm-01-verified-aurignacian-art'],
    interpretationDistinction: {
      originalAttestation: {
        en: 'The cavern walls bear physical carbonized pigment figures of lions, rhinoceroses, and negative hand prints.',
        ur: 'غار کی دیواروں پر کوئلے سے بنے ببر شیر، گینڈے اور ہاتھوں کے منفی چھاپ موجود ہیں۔'
      },
      physicalProof: {
        en: 'Multiple independent AMS radiocarbon counts confirm age between 36,000 and 37,000 cal BP.',
        ur: 'آزادانہ ریڈیو کاربن پیمائشیں ثابت کرتی ہیں کہ ان کی عمر 36 سے 37 ہزار سال قبل کی ہے۔'
      },
      scholarlyInterpretation: {
        en: 'Prehistorians interpret this as evidence of an externalized symbolic memory and mythic consciousness.',
        ur: 'ماہرین آثار قدیمہ اسے انسانی خارجی یادداشت اور علامتی شعور کی بیداری قرار دیتے ہیں۔'
      }
    }
  },
  {
    id: 'ps-gobekli-pillar-43',
    slug: 'gobekli-tepe-pillar-43-vulture-stone',
    title: {
      en: 'Göbekli Tepe Enclosure D — Monolithic T-Pillar 43 (The Vulture Stone)',
      ur: 'گوئبکلی تپہ انکلوژر ڈی — ٹی ستون 43 (گدھ کا پتھر)'
    },
    originalTitle: 'Göbekli Tepe Pfeiler 43 (Geierstein)',
    originalLanguage: 'Pre-literate high-relief iconography',
    originalText: '[High-relief petroglyphs depicting a vulture balancing a sphere, scorpion, soaring crane, and headless human figure]',
    translation: {
      en: 'Monumental relief program depicting raptors, reptiles, and headless anthropomorphic figures within an early Neolithic sacred landscape.',
      ur: 'قبل از ظروف دور کا سنگی شاہکار جس میں پرندوں، بچھو اور بغیر سر کے انسانی جسم کی نقاشی کی گئی ہے۔'
    },
    translator: {
      en: 'Iconographic analysis by German Archaeological Institute (DAI)',
      ur: 'جرمن آرکیالوجیکل انسٹیٹیوٹ کا علامتی و تصویری تجزیہ'
    },
    edition: {
      en: 'DAI Göbekli Tepe Excavation Monograph Series (2012)',
      ur: 'جرمن انسٹیٹیوٹ کی کھدائی رپورٹ ایڈیشن (2012)'
    },
    date: 'c. 9500 – 9000 BCE',
    datingRange: '9600 – 8800 cal BCE (Stratum III Pre-Pottery Neolithic A/B)',
    artifactType: 'inscription',
    currentLocation: {
      en: 'Göbekli Tepe In Situ Archaeological Enclosure D, Şanlıurfa, Turkey',
      ur: 'شانلی اورفہ، ترکی (اصل کھدائی کے مقام انکلوژر ڈی میں موجود)'
    },
    accessionNumber: 'GT-ENC-D-P43',
    provenance: {
      en: 'Excavated in situ by Klaus Schmidt and the German Archaeological Institute (DAI) in 2003',
      ur: '2003 میں کلاؤس شمٹ اور جرمن ٹیم نے اصل حالت میں دریافت کیا'
    },
    datingMethod: {
      en: 'Radiocarbon dating of organic matrix in pedogenic carbonate wall coatings and backing sediment fill',
      ur: 'دیواروں کے کیمیائی کوٹنگز اور ارد گرد کی مٹی میں نامیاتی مادوں کی ریڈیو کاربن تاریخ'
    },
    materialForm: {
      en: 'Monolithic crystalline limestone quarried from the adjacent plateau',
      ur: 'پہاڑی سطح مرتفع سے تراشا گیا ایک ہی ٹکڑے پر مشتمل دیوقامت چونا پتھر'
    },
    preservationStatus: {
      en: 'Exceptional preservation due to intentional backfilling of the enclosure in antiquity',
      ur: 'قدیم زمانے میں مٹی سے جان بوجھ کر ڈھانپ دیے جانے کی وجہ سے بہترین حالت میں محفوظ'
    },
    verifiedBy: [
      { en: 'Deutsches Archäologisches Institut (DAI)', ur: 'جرمن آرکیالوجیکل انسٹیٹیوٹ' },
      { en: 'Ministry of Culture and Tourism, Republic of Turkey', ur: 'وزارت ثقافت و سیاحت، جمہوریہ ترکی' }
    ],
    epistemicNotes: {
      en: 'Physical megalithic architecture firmly dated to ~9500 BCE. The controversial astronomical comet-strike hypothesis remains an unverified modern interpretation.',
      ur: 'ستون کی مادی قدامت 9500 قبل مسیح مصدقہ ہے۔ البتہ اس پر شہابی حادثے کا جدید فلکیاتی نظریہ غیر مصدقہ تشریح ہے۔'
    },
    citation: {
      en: 'Schmidt, K. 2012. Göbekli Tepe: A Stone Age Sanctuary in South-Eastern Anatolia. Berlin: ex oriente.',
      ur: 'کلاؤس شمٹ، 2012، گوئبکلی تپہ: جنوب مشرقی اناطولیہ میں پتھر کے زمانے کی عبادت گاہ، برلن'
    },
    sourceImageUrl: '/src/assets/images/gobekli_tepe_megalith_1791226833446.jpg',
    mediaItemIds: ['media-gobekli-megalith'],
    associatedClaimIds: ['clm-02-disputed-gobekli-pure-cult', 'clm-06-interpretation-pillar-43-archaeoastronomy'],
    interpretationDistinction: {
      originalAttestation: {
        en: 'The stone pillar physically features carved reliefs of vultures, scorpions, and a headless human.',
        ur: 'پتھر کے ستون پر گدھ، بچھو اور بغیر سر کے جسم کی ابھری ہوئی شبیہیں کندہ ہیں۔'
      },
      physicalProof: {
        en: 'Limestone stratum firmly dated to 9500 BCE by radiocarbon analysis of construction backing.',
        ur: 'تعمیراتی تہوں کی کاربن تاریخ سے 9500 قبل مسیح کا زمانہ ثابت ہے۔'
      },
      scholarlyInterpretation: {
        en: 'Excavation team views it as mortuary and ancestor cult; Sweatman interprets it as an astronomical comet impact date.',
        ur: 'کھدائی کے ڈائریکٹرز اسے اجداد اور موت کی رسومات سمجھتے ہیں، جبکہ سویٹمین اسے فلکیاتی حادثے کا کوڈ قرار دیتا ہے۔'
      }
    }
  },
  {
    id: 'ps-uruk-iv-tablet',
    slug: 'uruk-iv-administrative-clay-tablet',
    title: {
      en: 'Proto-Cuneiform Administrative Tablet (MSVO 3, 11 / CDLI P002342)',
      ur: 'پروٹو میخی انتظامی مٹی کی تختی (CDLI P002342)'
    },
    originalTitle: 'Uruk IV Administrative Grain and Beer Allocation Ledger',
    originalLanguage: 'Proto-Cuneiform pictographic script (Archaic Sumerian substrate)',
    originalText: '[Archaic cuneiform pictographs: ŠE (barley grain), DUG (vessel), SANGA (temple accountant), ŠID (accounting check)]',
    translation: {
      en: 'Administrative recording of 1,200 liters of barley grain disbursed to the temple brewery under the authority of chief accountant.',
      ur: 'معبد کے چیف اکاؤنٹنٹ کی نگرانی میں شراب خانے کو جاری کردہ 1,200 لیٹر جو کے غلے کا دفتری حساب کتاب۔'
    },
    translator: {
      en: 'Philological transcription by Prof. Robert K. Englund (CDLI / UCLA)',
      ur: 'پروفیسر رابرٹ انگلینڈ (سی ڈی ایل آئی / یو سی ایل اے) کی لسانی نقل'
    },
    edition: {
      en: 'Materialien zu den Frühen Schriftzeugnissen des Vorderen Orients (MSVO 3, 1998)',
      ur: 'قدیم مشرقی متون کا برلن ایڈیشن (1998)'
    },
    date: 'c. 3300 – 3100 BCE',
    datingRange: '3300 – 3000 BCE (Late Uruk Period, Level IVa)',
    artifactType: 'manuscript',
    currentLocation: {
      en: 'Vorderasiatisches Museum, Pergamonmuseum, Berlin, Germany',
      ur: 'پرگامون میوزیم، برلن، جرمنی'
    },
    accessionNumber: 'VAM-VAT-15245 (CDLI P002342)',
    provenance: {
      en: 'Recovered during Deutsche Orient-Gesellschaft excavations at Uruk (Warka), Iraq, Red Temple Eanna district',
      ur: 'جرمن اورینٹ سوسائٹی کی کھدائی، ارک (ورکاء)، عراق'
    },
    datingMethod: {
      en: 'Archaeological ceramic seriation, architectural stratigraphy of the Eanna IVa precinct, and contextual AMS radiocarbon',
      ur: 'ارک کے ایانا معبد کی ارضیاتی تہوں اور برتنوں کے موازنے سے تاریخ کا تعین'
    },
    materialForm: {
      en: 'Unbaked fine alluvial clay impressed with triangular reed stylus and cylinder seal',
      ur: 'دریا کی چکنی مٹی جس پر سرکنڈے کے قلم اور بیضوی مہر سے نشانات لگائے گئے'
    },
    preservationStatus: {
      en: 'Complete intact tablet with crisp sign impressions and reverse seal imprint',
      ur: 'مکمل تختی مع پشت پر مہر کے محفوظ نشانات'
    },
    verifiedBy: [
      { en: 'Cuneiform Digital Library Initiative (CDLI)', ur: 'کیونیفارم ڈیجیٹل لائبریری انیشی ایٹو' },
      { en: 'Free University of Berlin Cuneiform Studies', ur: 'برلن یونیورسٹی کا شعبہ قدیم علوم' }
    ],
    epistemicNotes: {
      en: 'Primary bureaucratic artifact. Numerical sexagesimal system completely deciphered; early ideographs denote barley quantities and administrative offices.',
      ur: 'قدیم ترین انتظامی دستاویز۔ ساٹھ پر مبنی حسابی نظام مکمل حل شدہ ہے جبکہ علامات جو اور غلے کے حجم ظاہر کرتی ہیں۔'
    },
    citation: {
      en: 'Englund, R.K. 1998. Texts from the Late Uruk Period. Berlin: Gebr. Mann Verlag.',
      ur: 'رابرٹ انگلینڈ، اواخر ارک کے متون، برلن، 1998'
    },
    sourceImageUrl: '/src/assets/images/cuneiform_clay_cylinder_1791226842129.jpg',
    mediaItemIds: ['media-cuneiform-cylinder'],
    associatedClaimIds: ['clm-05-modern-scholarship-proto-cuneiform-origins'],
    interpretationDistinction: {
      originalAttestation: {
        en: 'The clay tablet records exact quantities of barley grain allocated under an administrative seal.',
        ur: 'مٹی کی تختی پر جو کے دانوں کا حساب دفتری مہر کے تحت درج ہے۔'
      },
      physicalProof: {
        en: 'Stratigraphically sealed in Uruk IV destruction debris, establishing physical writing by 3300 BCE.',
        ur: 'ارک کی تہوں میں مٹی سے دبی ہوئی برآمد ہوئی جس سے 3300 قبل مسیح میں تحریر کا وجود ثابت ہے۔'
      },
      scholarlyInterpretation: {
        en: 'Scholars agree this confirms writing arose as an institutional state management apparatus rather than poetic leisure.',
        ur: 'ماہرین کا اتفاق ہے کہ تحریر شاعری یا تفریح کے لیے نہیں بلکہ ریاستی نظم و ضبط چلانے کے لیے ایجاد ہوئی۔'
      }
    }
  }
];

export const sourcesData: Source[] = [
  {
    id: 'src-schmidt-2006',
    slug: 'schmidt-sie-bauten-die-ersten-tempel',
    title: {
      en: 'Sie bauten die ersten Tempel: Das rätselhafte Heiligtum der Steinzeitjäger',
      ur: 'انہوں نے پہلے معبد تعمیر کیے: پتھر کے زمانے کے شکاریوں کی پراسرار عبادت گاہ'
    },
    authors: [
      { en: 'Prof. Dr. Klaus Schmidt', ur: 'پروفیسر ڈاکٹر کلاؤس شمٹ' }
    ],
    publication: {
      en: 'C.H. Beck Verlag, Munich',
      ur: 'سی ایچ بیک پبلشر، میونخ'
    },
    publisherOrOrigin: {
      en: 'C.H. Beck Verlag, Munich',
      ur: 'سی ایچ بیک پبلشر، میونخ'
    },
    publicationYearOrEpoch: '2006',
    sourceType: 'academic_book',
    isbn: '978-3406535000',
    url: 'https://www.chbeck.de/schmidt-bauten-ersten-tempel/product/18797',
    archiveUrl: 'https://archive.org/details/siebautendieerstentempel0000schm',
    language: 'German (English Translation: Building the First Temples, 2012)',
    description: {
      en: 'Foundational excavation monograph authored by the discoverer and first director of Göbekli Tepe, establishing the megalithic chronology and monumental nature of the Pre-Pottery Neolithic sanctuary.',
      ur: 'گوئبکلی تپہ کے بانی محقق کی بنیادی کتاب جس نے قبل از ظروف دور میں پتھر کے عظیم ستونوں کی تاریخی قدامت کو ثابت کیا۔'
    },
    reliabilityNotes: {
      en: 'Seminal monograph by the principal excavation director. Contains essential empirical site data, though the hunter-only cult hypothesis is now being nuanced by later findings.',
      ur: 'کھدائی کے ڈائریکٹر کا بنیادی مقالہ۔ اگرچہ بنیادی شواہد مستند ہیں، تاہم غیر آباد عبادت گاہ کا نظریہ بعد کی کھدائیوں سے تبدیل ہو رہا ہے۔'
    },
    reliabilityAssessment: {
      en: 'Seminal monograph by the principal excavation director. Contains essential empirical site data, though the hunter-only cult hypothesis is now being nuanced by later findings.',
      ur: 'کھدائی کے ڈائریکٹر کا بنیادی مقالہ۔ اگرچہ بنیادی شواہد مستند ہیں، تاہم غیر آباد عبادت گاہ کا نظریہ بعد کی کھدائیوں سے تبدیل ہو رہا ہے۔'
    },
    accessDate: '2024-08-14',
    citationInformation: {
      en: 'Schmidt, Klaus. 2006. Sie bauten die ersten Tempel: Das rätselhafte Heiligtum der Steinzeitjäger. Munich: C.H. Beck.',
      ur: 'کلاؤس شمٹ، 2006، انہوں نے پہلے معبد تعمیر کیے، میونخ'
    },
    epistemicClass: 'modern_scholarship',
    claimIds: ['clm-02-disputed-gobekli-pure-cult', 'clm-06-interpretation-pillar-43-archaeoastronomy']
  },
  {
    id: 'src-qureshi-archive',
    slug: 'furqan-qureshi-40k-series-archive',
    title: {
      en: '40,000 Years of Knowledge: Research Archive & Monograph Papers',
      ur: 'چالیس ہزار سالہ علم: تحقیقی آرکائیو اور فکری مقالات'
    },
    authors: [
      { en: 'Furqan Qureshi', ur: 'فرقان قریشی' }
    ],
    publication: {
      en: 'Furqan Qureshi Research Archive / Furqan Qureshi Blogs',
      ur: 'فرقان قریشی ریسرچ آرکائیو / فرقان قریشی بلاگز'
    },
    publisherOrOrigin: {
      en: 'Furqan Qureshi Research Archive / Furqan Qureshi Blogs',
      ur: 'فرقان قریشی ریسرچ آرکائیو / فرقان قریشی بلاگز'
    },
    publicationYearOrEpoch: '2023–2026',
    sourceType: 'website',
    url: 'https://furqanqureshi.com/40000-years',
    archiveUrl: 'https://web.archive.org/web/*/furqanqureshi.com',
    language: 'English & Urdu (Bilingual)',
    description: {
      en: 'Long-term research inquiry surveying deep-time human consciousness, archaeology, and epistemic demarcation between physical facts and speculative lore.',
      ur: 'طویل المدتی تحقیقی سلسلہ جو انسانی شعور کے ارتقاء، آثار قدیمہ، اور مادی حقائق و دیومالائی قیاسات کے درمیان حد بندی کا جائزہ لیتا ہے۔'
    },
    reliabilityNotes: {
      en: 'Systematic historiographical and epistemological essays synthesizing peer-reviewed archaeological consensus and primary inscriptions for Urdu and English readers.',
      ur: 'تہذیبی نظریہ علم، آثار قدیمہ اور فلسفیانہ تاریخ پر اردو اور انگریزی قارئین کے لیے بنیادی تحقیقی سلسلہ۔'
    },
    reliabilityAssessment: {
      en: 'Systematic historiographical and epistemological essays synthesizing peer-reviewed archaeological consensus and primary inscriptions for Urdu and English readers.',
      ur: 'تہذیبی نظریہ علم، آثار قدیمہ اور فلسفیانہ تاریخ پر اردو اور انگریزی قارئین کے لیے بنیادی تحقیقی سلسلہ۔'
    },
    accessDate: '2026-10-01',
    timestamp: 'Chapter 01 · 18:52',
    citationInformation: {
      en: 'Qureshi, Furqan. 2024. "40,000 Years of Knowledge: The Deep Time Horizon." Furqan Qureshi Blogs, Paper 1: 3–22.',
      ur: 'فرقان قریشی، 2024، "چالیس ہزار سالہ علم"، فرقان قریشی بلاگز، مقالہ ۱'
    },
    epistemicClass: 'editorial_analysis',
    claimIds: ['clm-01-verified-aurignacian-art', 'clm-07-editorial-analysis-epistemic-transition']
  },
  {
    id: 'src-clottes-2003',
    slug: 'clottes-chauvet-cave-art',
    title: {
      en: 'Return to Chauvet Cave: Excavating the Oldest Known Cave Art',
      ur: 'شووہ غار کی طرف واپسی: قدیم ترین غار آرٹ کی دریافت'
    },
    authors: [
      { en: 'Dr. Jean Clottes', ur: 'ڈاکٹر ژاں کلوٹ' }
    ],
    publication: {
      en: 'Thames & Hudson, London & Paris',
      ur: 'تھامس اینڈ ہڈسن پبلشر، لندن'
    },
    publisherOrOrigin: {
      en: 'Thames & Hudson, London & Paris',
      ur: 'تھامس اینڈ ہڈسن پبلشر، لندن'
    },
    publicationYearOrEpoch: '2003',
    sourceType: 'academic_book',
    isbn: '978-0500511190',
    url: 'https://thamesandhudson.com/return-to-chauvet-cave-9780500511190',
    language: 'English & French',
    description: {
      en: 'Comprehensive archaeological report detailing pigment forensic analysis, AMS radiocarbon dates, and high-precision survey of the Chauvet-Pont-d’Arc subterranean galleries.',
      ur: 'جامع سائنسی رپورٹ جس میں رنگوں کی فرانزک تحقیق اور ریڈیو کاربن تاریخوں کی تفصیل درج ہے۔'
    },
    reliabilityNotes: {
      en: 'Peer-reviewed archaeological monograph detailing AMS radiocarbon samples, micro-stratigraphy, and Aurignacian parietal art techniques.',
      ur: 'سائنسی بنیادوں پر لکھی گئی کتاب جس میں کاربن ڈیٹنگ اور قدیم چٹانی نقوش کے تکنیکی شواہد پیش کیے گئے ہیں۔'
    },
    reliabilityAssessment: {
      en: 'Peer-reviewed archaeological monograph detailing AMS radiocarbon samples, micro-stratigraphy, and Aurignacian parietal art techniques.',
      ur: 'سائنسی بنیادوں پر لکھی گئی کتاب جس میں کاربن ڈیٹنگ اور قدیم چٹانی نقوش کے تکنیکی شواہد پیش کیے گئے ہیں۔'
    },
    accessDate: '2024-05-19',
    citationInformation: {
      en: 'Clottes, Jean. 2003. Return to Chauvet Cave: Excavating the Oldest Known Cave Art. London: Thames & Hudson.',
      ur: 'ژاں کلوٹ، 2003، شووہ غار کی طرف واپسی، لندن'
    },
    epistemicClass: 'modern_scholarship',
    claimIds: ['clm-01-verified-aurignacian-art']
  },
  {
    id: 'src-glassner-2003',
    slug: 'glassner-the-invention-of-cuneiform',
    title: {
      en: 'The Invention of Cuneiform: Writing in Sumer',
      ur: 'میخی رسم الخط کی ایجاد: سومیر میں تحریر کا ظہور'
    },
    authors: [
      { en: 'Jean-Jacques Glassner', ur: 'ژاں ژاک گلاسنر' }
    ],
    publication: {
      en: 'Johns Hopkins University Press, Baltimore',
      ur: 'جانز ہاپکنز یونیورسٹی پریس'
    },
    publisherOrOrigin: {
      en: 'Johns Hopkins University Press, Baltimore',
      ur: 'جانز ہاپکنز یونیورسٹی پریس'
    },
    publicationYearOrEpoch: '2003',
    sourceType: 'academic_book',
    isbn: '978-0801873898',
    doi: '10.1353/book.3312',
    url: 'https://www.press.jhu.edu/books/title/2723/invention-cuneiform',
    language: 'English (Translated by Zainab Bahrani & Marc Van De Mieroop)',
    description: {
      en: 'Groundbreaking philological monograph proving that writing in Sumer emerged as a fully realized semiological system rather than a mindless byproduct of accounting counters.',
      ur: 'معروف لسانی تحقیق جس نے ثابت کیا کہ سومیر میں تحریر ایک مکمل فکری اور علامتی نظام کے طور پر وجود میں آئی۔'
    },
    reliabilityNotes: {
      en: 'Rigorous philological analysis rejecting simplistic accounting-token evolution, proving writing emerged as a comprehensive symbolic conceptual system.',
      ur: 'جامع لسانی تحقیق جس نے ثابت کیا کہ تحریر محض حساب کتاب کی ضرورت نہیں بلکہ ایک مکمل فکری علامتی نظام کے طور پر وجود میں آئی۔'
    },
    reliabilityAssessment: {
      en: 'Rigorous philological analysis rejecting simplistic accounting-token evolution, proving writing emerged as a comprehensive symbolic conceptual system.',
      ur: 'جامع لسانی تحقیق جس نے ثابت کیا کہ تحریر محض حساب کتاب کی ضرورت نہیں بلکہ ایک مکمل فکری علامتی نظام کے طور پر وجود میں آئی۔'
    },
    accessDate: '2024-09-02',
    citationInformation: {
      en: 'Glassner, Jean-Jacques. 2003. The Invention of Cuneiform: Writing in Sumer. Baltimore: Johns Hopkins University Press.',
      ur: 'ژاں ژاک گلاسنر، 2003، میخی خط کی ایجاد، بالٹی مور'
    },
    epistemicClass: 'modern_scholarship',
    claimIds: ['clm-05-modern-scholarship-proto-cuneiform-origins']
  },
  {
    id: 'src-berossus-babyloniaca',
    slug: 'berossus-babyloniaca-fragments',
    title: {
      en: 'Babyloniaca (Historical Fragments preserved in Eusebius, Syncellus, and Josephus)',
      ur: 'بیبلونیاکا (یوسیبیس، سنسیلس اور یوسیفس کے ذریعے محفوظ شدہ اقتباسات)'
    },
    authors: [
      { en: 'Berossus (Priest of Bel-Marduk)', ur: 'بیروسس (کاہنِ بابل)' }
    ],
    publication: {
      en: 'Fragmente der griechischen Historiker (FGrHist 680), Ed. Felix Jacoby',
      ur: 'قدیم یونانی مورخین کے اقتباسات، مرتب: فیلکس یاکوبی'
    },
    publisherOrOrigin: {
      en: 'Fragmente der griechischen Historiker (FGrHist 680), Ed. Felix Jacoby',
      ur: 'قدیم یونانی مورخین کے اقتباسات، مرتب: فیلکس یاکوبی'
    },
    publicationYearOrEpoch: 'c. 280 BCE',
    sourceType: 'ancient_text',
    archiveUrl: 'https://archive.org/details/babyloniacafelis0000bero',
    language: 'Ancient Greek (Translating Babylonian Cuneiform Archives)',
    description: {
      en: 'Historical treatise dedicated to Seleucid King Antiochus I, translating Mesopotamian astronomical records, deluge narratives, and king lists into Greek.',
      ur: 'سلوقی بادشاہ کے لیے لکھی گئی تاریخ جس میں بابل کے فلکیاتی ریکارڈ اور طوفان نوح سے پہلے کے بادشاہوں کی فہرست یونانی میں منتقل کی گئی۔'
    },
    reliabilityNotes: {
      en: 'Valuable secondary witness to genuine cuneiform king lists, but mixed with legendary antediluvian chronologies (432,000 years) that must not be taken as historical chronological facts.',
      ur: 'سومری بادشاہوں کی اصل فہرست کا اہم گواہ، لیکن اس میں شامل 432,000 سالہ دیو مالائی مدت کو تاریخی حقیقت نہیں سمجھا جا سکتا۔'
    },
    reliabilityAssessment: {
      en: 'Valuable secondary witness to genuine cuneiform king lists, but mixed with legendary antediluvian chronologies (432,000 years) that must not be taken as historical chronological facts.',
      ur: 'سومری بادشاہوں کی اصل فہرست کا اہم گواہ، لیکن اس میں شامل 432,000 سالہ دیو مالائی مدت کو تاریخی حقیقت نہیں سمجھا جا سکتا۔'
    },
    accessDate: '2024-06-11',
    citationInformation: {
      en: 'Jacoby, Felix. 1958. Die Fragmente der griechischen Historiker (FGrHist 680: Berossos). Leiden: E.J. Brill.',
      ur: 'فیلکس یاکوبی، 1958، یونانی مورخین کے اقتباسات: بیروسس، لیڈن'
    },
    epistemicClass: 'secondary_source',
    criticalEditionNotes: {
      en: 'Original lost; survived only as selective quotations in Christian and Jewish chronographic compilations.',
      ur: 'اصل نسخہ ناپید ہے۔ بعد کے عیسائی اور یہودی مورخین کے کتب میں اقتباسات باقی ہیں۔'
    },
    claimIds: ['clm-04-source-attested-berossus-chronology']
  },
  {
    id: 'src-ibn-khaldun-muqaddimah',
    slug: 'ibn-khaldun-muqaddimah-prolegomena',
    title: {
      en: 'The Muqaddimah: An Introduction to History (Kitāb al-ʻIbar)',
      ur: 'مقدمہ ابن خلدون: تاریخ کا تعارف و عمرانی اصول'
    },
    authors: [
      { en: 'Ibn Khaldun (Walī al-Dīn ‘Abd al-Raḥmān)', ur: 'ابن خلدون (ولی الدین عبد الرحمن)' }
    ],
    publication: {
      en: 'Bulaq Press / Princeton University Press (Ed. Franz Rosenthal)',
      ur: 'بولاق پریس قاہرہ / پرنسٹن یونیورسٹی پریس'
    },
    publisherOrOrigin: {
      en: 'Bulaq Press / Princeton University Press (Ed. Franz Rosenthal)',
      ur: 'بولاق پریس قاہرہ / پرنسٹن یونیورسٹی پریس'
    },
    publicationYearOrEpoch: '1377 CE',
    sourceType: 'academic_book',
    isbn: '978-0691166544',
    url: 'https://press.princeton.edu/books/hardcover/9780691166544/the-muqaddimah',
    language: 'Classical Arabic',
    description: {
      en: 'Foundational historiographical treatise articulating the laws of human social organization (ʻUmrān), social cohesion (ʻAṣabiyyah), and the critical verification of historical reports to eliminate impossible exaggerations.',
      ur: 'تاریخ اور عمرانیات کا لازوال شاہکار جس میں ابن خلدون نے تاریخی روایات کی تنقیدی جانچ، عصبیت کے قوانین، اور جھوٹی مبالغہ آرائیوں کو سائنسی اصولوں سے چھانٹنے کا طریقہ وضع کیا۔'
    },
    reliabilityNotes: {
      en: 'Pioneering scientific treatise introducing methodological historical criticism; universally regarded by modern historiographers as the precursor to sociological epistemology.',
      ur: 'تاریخی تنقید اور سائنسی جانچ کا پیش رو مقالہ جسے دنیا بھر میں عمرانیات اور علمیاتی چھان بین کی بنیاد مانا جاتا ہے۔'
    },
    reliabilityAssessment: {
      en: 'Pioneering scientific treatise introducing methodological historical criticism; universally regarded by modern historiographers as the precursor to sociological epistemology.',
      ur: 'تاریخی تنقید اور سائنسی جانچ کا پیش رو مقالہ جسے دنیا بھر میں عمرانیات اور علمیاتی چھان بین کی بنیاد مانا جاتا ہے۔'
    },
    accessDate: '2025-01-10',
    citationInformation: {
      en: 'Ibn Khaldun. 1958. The Muqaddimah: An Introduction to History. Translated by Franz Rosenthal. 3 vols. New York: Pantheon Books.',
      ur: 'ابن خلدون، مقدمہ، ترجمہ فرانز روزنتھال، پرنسٹن، 1958'
    },
    epistemicClass: 'secondary_source',
    claimIds: ['clm-07-editorial-analysis-epistemic-transition']
  }
];
