import { Relationship } from '../types/entities';

export const relationshipsData: Relationship[] = [
  // ========================================================
  // Chapter 01 (Creation of the Universe & Seven Skies) Hub
  // ========================================================
  {
    id: 'rel-ch01-col-contains',
    sourceId: 'col-40k-series',
    targetId: 'ch-01-universe-seven-skies',
    type: 'contains',
    description: {
      en: 'Collection contains Chapter 01 as foundational opening investigation.',
      ur: 'تحقیقی سلسلے میں باب 01 افتتاحی باب کے طور پر شامل ہے۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-ch01-clm-expansion',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'clm-ch01-cosmic-expansion',
    type: 'discusses',
    description: {
      en: 'Chapter analyzes astrophysical cosmological expansion and microwave background radiation.',
      ur: 'باب میں کائناتی پھیلاؤ اور پس منظر کی شعاعوں کا تجزیہ کیا گیا ہے۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-ch01-clm-ancient-skies',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'clm-ch01-ancient-skies-seven',
    type: 'discusses',
    description: {
      en: 'Chapter surveys ancient Near Eastern multi-layered celestial vaults.',
      ur: 'باب میں قدیم مشرق قریب کے کثیر تہوں والے آسمانوں کے ماڈلز کا جائزہ ہے۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-ch01-clm-seven-skies',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'clm-ch01-seven-skies-physical-nature',
    type: 'discusses',
    description: {
      en: 'Chapter investigates physical nature of seven skies (Sab’a Samawat) as an open question.',
      ur: 'باب میں سات آسمانوں کی حقیقت کو ایک تفسیری کھلے سوال کے طور پر پیش کیا گیا ہے۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-ch01-clm-scripture-answers',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'clm-ch01-scripture-all-answers',
    type: 'discusses',
    description: {
      en: 'Chapter catalogs rhetorical claim of scriptural omniscience as source reported.',
      ur: 'باب میں مصنف کا کائناتی علم کا دعویٰ ماخذ میں مذکور کے طور پر درج ہے۔'
    },
    editorialStatus: 'documented',
    weight: 1
  },
  {
    id: 'rel-ch01-clm-enuma-elish',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'clm-ch01-primary-source-enuma-elish-sky',
    type: 'discusses',
    description: {
      en: 'Chapter contrasts scientific cosmology with Mesopotamian watery firmament in Enuma Elish.',
      ur: 'باب میں سائنسی کونیات اور اینوما ایلیش کے پانیوں کی چھت کا تقابل کیا گیا ہے۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-ch01-clm-solid-dome',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'clm-ch01-unsupported-solid-dome-firmament',
    type: 'discusses',
    description: {
      en: 'Chapter disproves pre-scientific claims of a solid material dome over Earth.',
      ur: 'باب میں زمین پر ٹھوس گنبد کے غیر سائنسی دعوے کو رد کیا گیا ہے۔'
    },
    editorialStatus: 'cited',
    weight: 1
  },
  {
    id: 'rel-ch01-clm-ptolemaic-crystal',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'clm-ch01-incorrect-ptolemaic-crystal-spheres',
    type: 'discusses',
    description: {
      en: 'Chapter examines Aristotle and Ptolemy geocentric crystalline spheres disproven by modern mechanics.',
      ur: 'باب میں ارسطو اور بطلیموس کے کرسٹل کروں کی تردید کا سائنسی جائزہ ہے۔'
    },
    editorialStatus: 'cited',
    weight: 1
  },
  {
    id: 'rel-ch01-src-qureshi',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'src-qureshi-archive',
    type: 'derived_from',
    description: {
      en: 'Chapter transcribed and structured from Furqan Qureshi video lecture (13 Oct 2022).',
      ur: 'باب کا مواد فرقان قریشی کے ویڈیو لیکچر سے اخذ شدہ ہے۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-ch01-prs-qureshi',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'prs-furqan-qureshi',
    type: 'associated_with',
    description: {
      en: 'Lecture researched and presented by Furqan Qureshi.',
      ur: 'تحقیق و پیشکش فرقان قریشی۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-ch01-cnc-demarcation',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'cnc-epistemic-demarcation',
    type: 'discusses',
    description: {
      en: 'Establishes foundational standard separating empirical astronomy from theological revelation.',
      ur: 'سائنسی مشاہدے اور ایمانی تاویل کے درمیان تفریق کا بنیادی اصول طے کرتا ہے۔'
    },
    editorialStatus: 'cited',
    weight: 3
  },
  {
    id: 'rel-ch01-civ-sumerian',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'civ-sumerian-early-dynastic',
    type: 'associated_with',
    description: {
      en: 'Chapter examines earliest recorded cuneiform celestial terminology in Sumer.',
      ur: 'باب میں سومیر کے قدیم ترین فلکیاتی متون کا جائزہ لیا گیا ہے۔'
    },
    editorialStatus: 'cited',
    weight: 1
  },
  {
    id: 'rel-ch01-rel-ch02',
    sourceId: 'ch-01-universe-seven-skies',
    targetId: 'ch-01-symbolic-consciousness',
    type: 'related_chapter',
    description: {
      en: 'Connects cosmic origins to the emergence of human symbolic consciousness at 40,000 BP.',
      ur: 'کائناتی آغاز کو چالیس ہزار سال قبل انسانی شعور کے ظہور سے جوڑتا ہے۔'
    },
    editorialStatus: 'proposed',
    weight: 1
  },

  // ========================================================
  // Claim Connections & Evidence Grounding
  // ========================================================
  {
    id: 'rel-clm-exp-qureshi-src',
    sourceId: 'clm-ch01-cosmic-expansion',
    targetId: 'src-qureshi-archive',
    type: 'references',
    description: {
      en: 'Presented in section 02:42 of the source video.',
      ur: 'ویڈیو کے حصہ 02:42 میں پیش کیا گیا۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-clm-ancient-berossus-src',
    sourceId: 'clm-ch01-ancient-skies-seven',
    targetId: 'src-berossus-babyloniaca',
    type: 'references',
    description: {
      en: 'Attested in Berossus’s Babyloniaca and cuneiform tablet traditions.',
      ur: 'بیروسس کی تاریخ اور میخی روایات میں مذکور۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-clm-ancient-uruk-ps',
    sourceId: 'clm-ch01-ancient-skies-seven',
    targetId: 'ps-uruk-iv-tablet',
    type: 'supports',
    description: {
      en: 'Uruk IV administrative and astronomical tablets record early sky pictograms (AN).',
      ur: 'ارک کی تختیاں آسمان کی قدیم ترین علامت (آن) ریکارڈ کرتی ہیں۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-clm-ptolemaic-contradicts-exp',
    sourceId: 'clm-ch01-incorrect-ptolemaic-crystal-spheres',
    targetId: 'clm-ch01-cosmic-expansion',
    type: 'contradicts',
    description: {
      en: 'Geocentric crystalline vault hypothesis is physically disproven by metric spacetime expansion.',
      ur: 'ٹھوس کروں کا نظریہ وسعت پذیر کائنات کے سائنسی قوانین سے متضاد ہے۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-clm-seven-skies-demarcation',
    sourceId: 'clm-ch01-seven-skies-physical-nature',
    targetId: 'cnc-epistemic-demarcation',
    type: 'related_concept',
    description: {
      en: 'Demarcates scriptural metaphor and faith from verifiable astrophysics.',
      ur: 'مذہبی کلام اور سائنسی فلکیات کے دائروں کو الگ کرتا ہے۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },

  // ========================================================
  // Chapter 02 (Symbolic Consciousness) & Chauvet Cave Hub
  // ========================================================
  {
    id: 'rel-ch02-clm-aurignacian',
    sourceId: 'ch-01-symbolic-consciousness',
    targetId: 'clm-01-verified-aurignacian-art',
    type: 'discusses',
    description: {
      en: 'Chapter analyzes Upper Paleolithic parietal art dating to 36,000–40,000 BP.',
      ur: 'باب میں 36 سے 40 ہزار سال پرانی غاروں کی مصوری کا جائزہ لیا گیا ہے۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-clm-aurignacian-ps-chauvet',
    sourceId: 'clm-01-verified-aurignacian-art',
    targetId: 'ps-chauvet-panel',
    type: 'supports',
    description: {
      en: 'Physical rock panel stencils directly verified by AMS radiocarbon C14 dating.',
      ur: 'شووہ غار کے نقوش ریڈیو کاربن پیمائش سے مصدقہ ہیں۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-clm-aurignacian-src-clottes',
    sourceId: 'clm-01-verified-aurignacian-art',
    targetId: 'src-clottes-2003',
    type: 'references',
    description: {
      en: 'Documented in Jean Clottes’s peer-reviewed monograph Chauvet Cave (2003).',
      ur: 'ژاں کلوٹ کی سائنسی کتاب (2003) میں درج ثبوت۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-ps-chauvet-plc-chauvet',
    sourceId: 'ps-chauvet-panel',
    targetId: 'plc-chauvet',
    type: 'located_in',
    description: {
      en: 'Limestone rock panel situated within the Chauvet-Pont-d’Arc subterranean cavern.',
      ur: 'شووہ غار کے اندر واقع چٹانی دیوار۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-evt-chauvet-plc-chauvet',
    sourceId: 'evt-chauvet-frieze-creation',
    targetId: 'plc-chauvet',
    type: 'occurred_at',
    description: {
      en: 'Aurignacian parietal frieze created at Chauvet Cave ~36,000 BP.',
      ur: 'شووہ غار میں 36 ہزار سال قبل مصوری کا عمل۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-prs-clottes-src-clottes',
    sourceId: 'prs-jean-clottes',
    targetId: 'src-clottes-2003',
    type: 'references',
    description: {
      en: 'Authored primary archaeological monograph on Chauvet findings.',
      ur: 'شووہ غار پر بنیادی مونوگراف کے مصنف۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-prs-clottes-plc-chauvet',
    sourceId: 'prs-jean-clottes',
    targetId: 'plc-chauvet',
    type: 'associated_with',
    description: {
      en: 'Directed multidisciplinary scientific dating and conservation mission at Chauvet.',
      ur: 'شووہ غار کے سائنسی مشن کے سربراہ۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-plc-chauvet-civ-aurignacian',
    sourceId: 'plc-chauvet',
    targetId: 'civ-aurignacian-paleolithic',
    type: 'part_of',
    description: {
      en: 'Stratigraphically belongs to European Upper Paleolithic Aurignacian techno-complex.',
      ur: 'بالائی قدیم سنگی دور کے اورینیشین ثقافتی دور کا حصہ۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-ch02-cnc-symbolic',
    sourceId: 'ch-01-symbolic-consciousness',
    targetId: 'cnc-symbolic-consciousness',
    type: 'discusses',
    description: {
      en: 'Investigates externalized cognitive notation as the birth of external memory.',
      ur: 'خارجی علامتی یادداشت کے آغاز کے طور پر تحقیق۔'
    },
    editorialStatus: 'cited',
    weight: 3
  },

  // ========================================================
  // Göbekli Tepe & Neolithic Dawn Hub
  // ========================================================
  {
    id: 'rel-ch03-clm-gobekli-temple',
    sourceId: 'ch-02-neolithic-dawn',
    targetId: 'clm-02-disputed-gobekli-pure-cult',
    type: 'discusses',
    description: {
      en: 'Chapter evaluates Schmidt’s pure-sanctuary thesis versus new domestic evidence.',
      ur: 'باب میں خالص معبد کے نظریے اور رہائشی شواہد کا تقابل ہے۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-clm-gobekli-ps-pillar43',
    sourceId: 'clm-02-disputed-gobekli-pure-cult',
    targetId: 'ps-gobekli-pillar-43',
    type: 'supports',
    description: {
      en: 'Monolithic T-shaped limestone pillar in Enclosure D physically verified.',
      ur: 'انکلوژر ڈی میں ٹی شکل کا پتھریلا ستون مادی طور پر موجود ہے۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-clm-gobekli-src-schmidt',
    sourceId: 'clm-02-disputed-gobekli-pure-cult',
    targetId: 'src-schmidt-2006',
    type: 'references',
    description: {
      en: 'Schmidt formulated the pure sanctuary paradigm in Sie bauten die ersten Tempel.',
      ur: 'شمٹ کی کتاب جس میں پہلا معبد قرار دیا گیا۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-ps-pillar43-plc-gobekli',
    sourceId: 'ps-gobekli-pillar-43',
    targetId: 'plc-gobekli-tepe',
    type: 'located_in',
    description: {
      en: 'In situ at Göbekli Tepe Enclosure D, Şanlıurfa, southeastern Turkey.',
      ur: 'گوئبکلی تپہ انکلوژر ڈی میں اصل مقام پر قائم۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-prs-schmidt-plc-gobekli',
    sourceId: 'prs-klaus-schmidt',
    targetId: 'plc-gobekli-tepe',
    type: 'associated_with',
    description: {
      en: 'Discovered and directed excavations at Göbekli Tepe from 1995 to 2014.',
      ur: '1995 سے 2014 تک کھدائی کے ڈائریکٹر۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-plc-gobekli-civ-ppn',
    sourceId: 'plc-gobekli-tepe',
    targetId: 'civ-pre-pottery-neolithic',
    type: 'part_of',
    description: {
      en: 'Monumental cultural apex of Pre-Pottery Neolithic A and B (PPNA/PPNB).',
      ur: 'قبل از ظروف نو سنگی دور (PPNA/B) کا شاہکار۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-ch03-cnc-monumental',
    sourceId: 'ch-02-neolithic-dawn',
    targetId: 'cnc-monumental-architecture',
    type: 'discusses',
    description: {
      en: 'Analyzes emergence of collective megalithic construction prior to agriculture.',
      ur: 'زراعت سے قبل اجتماعی پتھریلی تعمیرات کا جائزہ۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-clm-pillar43-comet-disputed',
    sourceId: 'clm-06-interpretation-pillar-43-archaeoastronomy',
    targetId: 'ps-gobekli-pillar-43',
    type: 'interprets',
    description: {
      en: 'Speculative archaeoastronomical theory reading pillar animals as zodiacal comet impact.',
      ur: 'ستون 43 پر جانوروں کے نقوش کو شہابی حادثہ قرار دینے کا غیر ثابت شدہ مفروضہ۔'
    },
    editorialStatus: 'disputed',
    weight: 1
  },

  // ========================================================
  // Cuneiform Writing Revolution & Mesopotamia Hub
  // ========================================================
  {
    id: 'rel-ch04-clm-protocuneiform',
    sourceId: 'ch-03-cuneiform-revolution',
    targetId: 'clm-05-modern-scholarship-proto-cuneiform-origins',
    type: 'discusses',
    description: {
      en: 'Chapter analyzes state-designed origin of proto-cuneiform accounting technology.',
      ur: 'باب میں پروٹو میخی تحریر کی ریاستی ایجاد کا سائنسی مطالعہ۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-clm-protocuneiform-ps-uruk',
    sourceId: 'clm-05-modern-scholarship-proto-cuneiform-origins',
    targetId: 'ps-uruk-iv-tablet',
    type: 'supports',
    description: {
      en: 'Uruk IV clay economic tablet physically confirms state rationing accountancy.',
      ur: 'ارک چہارم کی مٹی کی تختی ریاستی تقسیم کے کھاتوں کی تصدیق کرتی ہے۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-clm-protocuneiform-src-glassner',
    sourceId: 'clm-05-modern-scholarship-proto-cuneiform-origins',
    targetId: 'src-glassner-2003',
    type: 'references',
    description: {
      en: 'Supported by Jean-Jacques Glassner’s The Invention of Cuneiform (2003).',
      ur: 'گلاسنر کی کتاب میں تحریر کی ایجاد کا دستاویزی ثبوت۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-ps-uruk-plc-uruk',
    sourceId: 'ps-uruk-iv-tablet',
    targetId: 'plc-uruk',
    type: 'located_in',
    description: {
      en: 'Excavated from the Eanna sacred precinct at Uruk (Warka), southern Iraq.',
      ur: 'ارک (ورکا) کے ایانا مندر کی کھدائی سے برآمد۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-prs-enheduanna-txt-inanna',
    sourceId: 'prs-enheduanna',
    targetId: 'txt-exaltation-inanna',
    type: 'influenced',
    description: {
      en: 'Enheduanna composed the Nin-me-sar-ra (Exaltation of Inanna), world’s first signed literary text.',
      ur: 'انہیدوانا نے دنیا کی پہلی دستخط شدہ ادبی تصنیف تخلیق کی۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-prs-enheduanna-civ-sumerian',
    sourceId: 'prs-enheduanna',
    targetId: 'civ-sumerian-early-dynastic',
    type: 'part_of',
    description: {
      en: 'High priestess of Nanna at Ur during the Akkadian-Sumerian union under Sargon.',
      ur: 'اور کے شہر میں نانا دیوتا کی چیف پجارن۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-prs-berossus-src-berossus',
    sourceId: 'prs-berossus',
    targetId: 'src-berossus-babyloniaca',
    type: 'references',
    description: {
      en: 'Berossus, priest of Bel in Babylon, authored Babyloniaca in Greek c. 281 BCE.',
      ur: 'بیروسس نے یونانی زبان میں بابل کی تاریخ لکھی۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-clm-berossus-source-reported',
    sourceId: 'clm-04-source-attested-berossus-chronology',
    targetId: 'src-berossus-babyloniaca',
    type: 'references',
    description: {
      en: '432,000-year antediluvian reign is faithfully recorded as source reported mythology.',
      ur: 'طوفان سے قبل 432,000 سال کی بادشاہت ماخذ کا دیومالائی بیان ہے۔'
    },
    editorialStatus: 'cited',
    weight: 1
  },
  {
    id: 'rel-plc-uruk-civ-sumerian',
    sourceId: 'plc-uruk',
    targetId: 'civ-sumerian-early-dynastic',
    type: 'part_of',
    description: {
      en: 'Metropolitan center and birthplace of writing in Sumerian civilization.',
      ur: 'سومری تہذیب کا مرکزی دارالحکومت اور تحریر کا گہوارہ۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-ch04-cnc-cuneiform',
    sourceId: 'ch-03-cuneiform-revolution',
    targetId: 'cnc-cuneiform-transmission',
    type: 'discusses',
    description: {
      en: 'Tracks transmission of cuneiform technology from administrative ledger to literature.',
      ur: 'حسابی کھاتوں سے ادب تک میخی تحریر کے سفر کا جائزہ۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },

  // ========================================================
  // Indus Valley & Decipherment Open Question Hub
  // ========================================================
  {
    id: 'rel-ch05-clm-indus-script',
    sourceId: 'ch-04-cosmological-models',
    targetId: 'clm-03-uncertain-indus-script-decipherment',
    type: 'discusses',
    description: {
      en: 'Chapter evaluates decipherment methodologies and Dravidian agglutinative hypotheses.',
      ur: 'باب میں وادی سندھ کے رسم الخط اور دراوڑی مفروضوں کا تنقیدی جائزہ ہے۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },
  {
    id: 'rel-clm-indus-plc-mohenjo',
    sourceId: 'clm-03-uncertain-indus-script-decipherment',
    targetId: 'plc-mohenjo-daro',
    type: 'associated_with',
    description: {
      en: 'Over 1,500 inscribed steatite seals recovered from Mohenjo-daro archaeological excavations.',
      ur: 'موہنجودڑو کی کھدائیوں سے پندرہ سو سے زائد کتباتی مہریں برآمد ہوئیں۔'
    },
    editorialStatus: 'documented',
    weight: 2
  },
  {
    id: 'rel-plc-mohenjo-civ-indus',
    sourceId: 'plc-mohenjo-daro',
    targetId: 'civ-indus-valley-mature',
    type: 'part_of',
    description: {
      en: 'Major urban planned metropolis of the Mature Harappan Civilisation.',
      ur: 'وادی سندھ کی تہذیب کا سب سے بڑا منصوبہ بند شہری مرکز۔'
    },
    editorialStatus: 'documented',
    weight: 3
  },
  {
    id: 'rel-prs-cunningham-plc-mohenjo',
    sourceId: 'prs-alexander-cunningham',
    targetId: 'plc-mohenjo-daro',
    type: 'associated_with',
    description: {
      en: 'Published first Harappan inscribed seal in 1875 Archaeological Survey reports.',
      ur: '1875 میں ہڑپہ کی پہلی مہر شائع کرنے والے سرکردہ ماہر آثار۔'
    },
    editorialStatus: 'documented',
    weight: 1
  },
  {
    id: 'rel-clm-indus-cnc-decipherment',
    sourceId: 'clm-03-uncertain-indus-script-decipherment',
    targetId: 'cnc-decipherment-methodology',
    type: 'related_concept',
    description: {
      en: 'Exemplifies requirements for cryptographic epigraphic decipherment without bilingual keys.',
      ur: 'دو لسانی کتبے کے بغیر لسانی حل کے سائنسی اصولوں کی مثال۔'
    },
    editorialStatus: 'cited',
    weight: 2
  },

  // ========================================================
  // Chronological Sequence Links Across Millennia
  // ========================================================
  {
    id: 'rel-time-chauvet-gobekli',
    sourceId: 'evt-chauvet-frieze-creation',
    targetId: 'evt-gobekli-enclosure-d-erection',
    type: 'chronologically_precedes',
    description: {
      en: 'Aurignacian parietal art (36,000 BP) precedes PPNA monumental architecture (11,500 BP) by ~24,000 years.',
      ur: 'شووہ غار کی مصوری گوئبکلی تپہ سے تقریباً چوبیس ہزار سال پہلے کی ہے۔'
    },
    editorialStatus: 'documented',
    weight: 1
  },
  {
    id: 'rel-time-gobekli-uruk',
    sourceId: 'evt-gobekli-enclosure-d-erection',
    targetId: 'evt-proto-cuneiform-standardization',
    type: 'chronologically_precedes',
    description: {
      en: 'Göbekli Tepe (c. 9500 BCE) precedes Uruk proto-cuneiform standardization (c. 3200 BCE) by over 6,000 years.',
      ur: 'گوئبکلی تپہ ارک کی تحریر سے چھ ہزار سال پہلے قائم ہوا تھا۔'
    },
    editorialStatus: 'documented',
    weight: 1
  },
  {
    id: 'rel-time-uruk-mohenjo',
    sourceId: 'evt-proto-cuneiform-standardization',
    targetId: 'evt-mohenjo-daro-urban-apex',
    type: 'chronologically_precedes',
    description: {
      en: 'Uruk proto-cuneiform (c. 3200 BCE) precedes Mature Harappan urban apex (c. 2500 BCE) by ~700 years.',
      ur: 'ارک کی پہلی تحریر موہنجودڑو کے عروج سے سات سو سال قبل کی ہے۔'
    },
    editorialStatus: 'documented',
    weight: 1
  }
];
