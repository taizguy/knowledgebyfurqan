import { Claim } from '../types/entities';

export const claimsData: Claim[] = [
  {
    id: 'clm-01-verified-aurignacian-art',
    slug: 'verified-aurignacian-parietal-art-antiquity',
    statement: {
      en: 'Upper Paleolithic parietal art at Chauvet and El Castillo demonstrates intentional symbolic external memory systems dating to at least 36,000–40,000 BP.',
      ur: 'شووہ اور ال کستیلو کی غاروں کے قدیم نقوش ثابت کرتے ہیں کہ انسان کم از کم 36 سے 40 ہزار سال قبل خارجی یادداشت اور علامتی نظام کا استعمال کر رہا تھا۔'
    },
    language: 'en',
    chapterId: 'ch-01-symbolic-consciousness',
    sectionId: 'sec-01-01',
    timestamp: '04:15',
    claimType: 'archaeological',
    status: 'verified',
    epistemicStatus: 'verified',
    confidence: 'high',
    confidenceRating: 'firmly_established',
    epistemicRationale: {
      en: 'Verified through cross-calibrated AMS radiocarbon dating of organic charcoal layers, thermoluminescence of heated calcite, and stratigraphic sealing by collapsed scree dating to 21,500 BP.',
      ur: 'کوئلے کی ریڈیو کاربن پیمائش اور غار کے قدرتی سیل ہونے کی جغرافیائی تہوں سے سائنسی طور پر مکمل طور پر ثابت شدہ۔'
    },
    primarySourceIds: ['ps-chauvet-panel'],
    secondarySourceIds: ['src-clottes-2003'],
    supportingEvidence: [
      {
        en: 'Direct AMS radiocarbon dating of charcoal pigment samples (Gif-sur-Yvette and Lyon laboratories) yielding 36,000–37,000 cal BP across multiple sample points.',
        ur: 'مختلف آزاد تجربہ گاہوں میں کوئلے کے نمونوں کی ریڈیو کاربن تاریخ جو 36 سے 37 ہزار سال قبل کی تصدیق کرتی ہے۔'
      },
      {
        en: 'Geomorphological dating of entrance rockfall that permanently sealed the cave chamber ~21,500 BP, precluding any later contamination or modern forging.',
        ur: 'غار کے دہانے کے گرنے کا ارضیاتی ثبوت جس نے 21,500 سال قبل غار کو ہمیشہ کے لیے بند کر دیا تھا، جس سے بعد کی آلودگی یا جعل سازی ناممکن ہے۔'
      }
    ],
    contradictingEvidence: [
      {
        en: 'Initial skepticism by Christian Züchner suggesting stylistic parallels to later Magdalenian art (c. 15,000 BP); refuted by subsequent blind multi-laboratory test batteries.',
        ur: 'ابتدائی دور میں چند ماہرین کا خیال تھا کہ یہ نقوش بعد کے مگدالین دور کے ہیں؛ مگر بلائنڈ لیب ٹیسٹوں نے اس شبہے کو مکمل طور پر ختم کر دیا۔'
      }
    ],
    editorialNotes: {
      en: 'This establishes that human external symbolic scaffolding is at least 40,000 years old. We are not dealing with idle doodling, but structured cognitive externalization.',
      ur: 'یہ دریافت ثابت کرتی ہے کہ انسانی دماغ چالیس ہزار سال قبل ہی اپنے اندرونی تصورات کو مادی شکل میں محفوظ کرنے کی مکمل صلاحیت رکھتا تھا۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Archaeological fieldwork report documents charcoal megafauna pigments and negative hand stencils.',
        ur: 'فیلڈ رپورٹ میں کوئلے سے بنی جانوروں کی پینٹنگز اور ہاتھوں کے چھاپ درج ہیں۔'
      },
      primaryEvidenceIndicates: {
        en: 'Direct physical carbon isotope ratios (C14) sealed under 21 millennia of untouched stalagmitic flowstone.',
        ur: 'اکیس ہزار سال پرانی چونا تہوں کے نیچے محفوظ قدرتی کاربن 14 کی پیمائش۔'
      },
      modernScholarshipConcludes: {
        en: 'Parietal visual notation was established in Western Europe by the Aurignacian culture by 36,000 BP.',
        ur: 'جدید علمی اتفاق کہ 36 ہزار سال قبل اورینیشین دور میں غاروں کی مصوری کا باقاعدہ وجود تھا۔'
      },
      editorialAssessment: {
        en: 'Firmly verified empirical fact; serves as baseline for deep-time symbolic consciousness.',
        ur: 'مکمل طور پر مصدقہ سائنسی حقیقت، جو علامتی شعور کے چالیس ہزار سالہ سفر کی بنیادی بنیاد ہے۔'
      }
    },
    associatedPersonIds: [],
    associatedPlaceIds: ['plc-chauvet'],
    associatedConceptIds: ['cnc-symbolic-consciousness'],
    associatedEventIds: ['evt-chauvet-frieze-creation'],
    chapterIds: ['ch-01-symbolic-consciousness'],
    relatedClaimIds: ['clm-07-editorial-analysis-epistemic-transition']
  },
  {
    id: 'clm-02-disputed-gobekli-pure-cult',
    slug: 'disputed-gobekli-tepe-purely-hunter-cult-temple',
    statement: {
      en: 'Göbekli Tepe functioned exclusively as an isolated, non-residential cult temple complex visited periodically by nomadic hunter-gatherers.',
      ur: 'گوئبکلی تپہ مکمل طور پر ایک غیر آباد عبادت گاہ تھی جہاں خانہ بدوش شکاری صرف مذہبی رسومات کے لیے آتے تھے۔'
    },
    language: 'en',
    chapterId: 'ch-02-neolithic-dawn',
    sectionId: 'sec-02-02',
    timestamp: '14:20',
    claimType: 'archaeological',
    status: 'disputed',
    epistemicStatus: 'disputed',
    confidence: 'contested',
    confidenceRating: 'contested_hypothesis',
    epistemicRationale: {
      en: 'Initially formulated by Klaus Schmidt (1995–2014). Subsequently disputed by the renewed German-Turkish excavation team (Lee Clare et al., 2018–present) after uncovering residential architecture, water cisterns, and food processing areas.',
      ur: 'کلاؤس شمٹ کا ابتدائی نظریہ تھا۔ بعد ازاں نئی کھدائیوں میں رہائشی مکانات، پانی کے حوض اور روزمرہ اناج پیسنے کے اوزار ملنے کے بعد اب یہ دعویٰ شدید اختلاف کی زد میں ہے۔'
    },
    primarySourceIds: ['ps-gobekli-pillar-43'],
    secondarySourceIds: ['src-schmidt-2006'],
    supportingEvidence: [
      {
        en: 'Schmidt’s original excavation layers lacked recognized hearths or standard domestic mudbrick compounds; monumental T-pillars dominate the central enclosures.',
        ur: 'ابتدائی کھدائی میں روایتی گھریلو چولہے نہیں ملے تھے اور دیوقامت ستون ہی مرکز میں تھے۔'
      }
    ],
    contradictingEvidence: [
      {
        en: 'Identification of domestic rainwater cisterns, hundreds of basalt grinding bowls, and macro-botanical residues indicating continuous habitation and seasonal feast storage.',
        ur: 'پانی ذخیرہ کرنے کے تالاب، اناج پیسنے کی سینکڑوں سلیں اور روزمرہ خوراک کے آثار مستقل رہائش کی تصدیق کرتے ہیں۔'
      }
    ],
    editorialNotes: {
      en: 'We record Schmidt’s hypothesis respectfully while clearly highlighting the recent empirical discoveries that cast strong doubt on the "pure temple" exclusivity.',
      ur: 'ہم کلاؤس شمٹ کے مفروضے کا احترام کرتے ہیں، لیکن نئی دریافتوں سے ثابت ہونے والے رہائشی شواہد کو بھی پوری غیر جانبداری سے سامنے لاتے ہیں۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Schmidt (2006) monograph designates the site as the world’s first mountain sanctuary devoid of domestic life.',
        ur: 'شمٹ کی کتاب میں اسے دنیا کا پہلا غیر آباد پہاڑی معبد قرار دیا گیا۔'
      },
      primaryEvidenceIndicates: {
        en: 'Presence of both monumental ritual enclosures and extensive residential domestic grinding equipment.',
        ur: 'عظیم ستونوں کے ساتھ ساتھ روزمرہ رہائش اور اناج پیسنے کے آلات کی موجودگی۔'
      },
      modernScholarshipConcludes: {
        en: 'Göbekli Tepe was likely a settled or semi-sedentary ritual aggregation hub rather than a lonely deserted mountaintop shrine.',
        ur: 'جدید ماہرین کے نزدیک یہ مکمل غیر آباد معبد نہیں بلکہ مستقل یا نیم مستقل آباد بستی تھی۔'
      },
      editorialAssessment: {
        en: 'Disputed claim; interface must never present Schmidt’s pure-sanctuary idea as settled fact.',
        ur: 'متنازعہ دعویٰ؛ قاری کو واضح بتایا جانا چاہیے کہ اس پر علمی اختلاف موجود ہے۔'
      }
    },
    competingViewpoints: [
      {
        perspective: {
          en: 'Pure Sanctuary Paradigm (Schmidt hypothesis)',
          ur: 'خالصتاً معبد کا نظریہ (شمٹ مفروضہ)'
        },
        proponents: {
          en: 'Klaus Schmidt, early DAI team (1995–2010)',
          ur: 'کلاؤس شمٹ اور ابتدائی تحقیقی ٹیم'
        },
        counterEvidence: {
          en: 'Lack of recognized hearths in early upper trench tests.',
          ur: 'ابتدائی کھائیوں میں چولہے نہ ملنا۔'
        },
        sourceIds: ['src-schmidt-2006']
      },
      {
        perspective: {
          en: 'Settled Agropastoral Village Hypothesis',
          ur: 'آباد بستی اور اناج پروسیسنگ کا نظریہ'
        },
        proponents: {
          en: 'Lee Clare, Oliver Dietrich, Laura Dietrich (2018–present)',
          ur: 'لی کلیئر اور موجودہ کھدائی ٹیم (2018 تا حال)'
        },
        counterEvidence: {
          en: 'Basalt grinding bowls and domestic cisterns found throughout Enclosures C, D, and domestic channels.',
          ur: 'پانی کے حوض اور سینکڑوں اناج پیسنے کے برتنوں کی دریافت۔'
        },
        sourceIds: []
      }
    ],
    associatedPersonIds: ['prs-klaus-schmidt'],
    associatedPlaceIds: ['plc-gobekli-tepe'],
    associatedConceptIds: ['cnc-monumental-architecture'],
    associatedEventIds: ['evt-gobekli-enclosure-d-erection'],
    chapterIds: ['ch-02-neolithic-dawn'],
    relatedClaimIds: ['clm-06-interpretation-pillar-43-archaeoastronomy']
  },
  {
    id: 'clm-03-uncertain-indus-script-decipherment',
    slug: 'uncertain-indus-script-linguistic-affiliation',
    statement: {
      en: 'The undeciphered signs on Harappan steatite seals represent a Dravidian agglutinative language family.',
      ur: 'وادی سندھ کی مہروں پر کندہ تحریر دراوڑی زبان کے خاندان سے تعلق رکھتی ہے۔'
    },
    language: 'en',
    chapterId: 'ch-04-cosmological-models',
    sectionId: 'sec-04-03',
    timestamp: '22:10',
    claimType: 'linguistic',
    status: 'open_question',
    epistemicStatus: 'open_question',
    confidence: 'speculative',
    confidenceRating: 'contested_hypothesis',
    epistemicRationale: {
      en: 'Because no bilingual epigraphic artifact (like the Rosetta Stone or Behistun Inscription) has been discovered, and corpus inscriptions average only 4.6 signs, all proposed Dravidian, Indo-Aryan, or Munda decipherments remain unproven open questions.',
      ur: 'کسی دو لسانی کتبے کی عدم دستیابی اور تحریروں کے اوسطاً صرف 4.6 علامات پر مشتمل ہونے کی وجہ سے دراوڑی یا دیگر لسانی دعوے غیر ثابت شدہ اور کھلا سوال ہیں۔'
    },
    primarySourceIds: [],
    secondarySourceIds: [],
    supportingEvidence: [
      {
        en: 'Posited survival of the Dravidian Brahui linguistic pocket in Balochistan, near Harappan sites.',
        ur: 'بلوچستان میں دراوڑی زبان براہوی کا وجود، جو ہڑپہ کے علاقوں کے قریب ہے۔'
      },
      {
        en: 'Asko Parpola’s rebus readings interpreting fish glyphs (min) as astral signs (min = star in proto-Dravidian).',
        ur: 'آسکو پارپولا کی ریبس تحقیق جس میں مچھلی کی علامت کو دراوڑی زبان میں ستارے کے ہم معنی لیا گیا۔'
      }
    ],
    contradictingEvidence: [
      {
        en: 'Farmer, Sproat, and Witzel (2004) argued the signs are non-linguistic political-religious emblems rather than phonetic script.',
        ur: 'فارمر، سپروٹ اور وٹزل کا استدلال کہ یہ مہریں زبان نہیں بلکہ قبائلی یا مذہبی علامات ہیں۔'
      },
      {
        en: 'Absence of lengthy running texts or historical narrative inscriptions across 4,000+ known seal artifacts.',
        ur: 'چار ہزار سے زائد مہروں میں کسی ایک پر بھی طویل متن یا جملے کی عدم موجودگی۔'
      }
    ],
    editorialNotes: {
      en: 'The archive marks Indus decipherment as an Open Question. Never declare a favored linguistic theory as proven fact.',
      ur: 'ہمارا آرکائیو وادی سندھ کے رسم الخط کے حل کو کھلا سوال قرار دیتا ہے؛ کسی ایک نظریے کو حتمی نہیں کہا جا سکتا۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Various scholars have proposed over 60 conflicting decipherments over the past century.',
        ur: 'ماضی کے سو سالوں میں ماہرین نے ساٹھ سے زائد متضاد حل پیش کیے۔'
      },
      primaryEvidenceIndicates: {
        en: 'Inscribed steatite seals and pottery sherds with 400+ distinct glyphs, typically in short sequences of 4 to 7 signs.',
        ur: 'مہروں اور مٹی کے برتنوں پر چار سو سے زائد منفرد علامات، جو مختصر شکل میں ہیں۔'
      },
      modernScholarshipConcludes: {
        en: 'No proposed phonetic or linguistic decipherment enjoys broad scholarly consensus without bilingual verification.',
        ur: 'کسی دو لسانی کتبے کے بغیر کسی بھی دعوے پر ماہرین کا عمومی اتفاق رائے ناممکن ہے۔'
      },
      editorialAssessment: {
        en: 'An enduring open question in historical linguistics and epigraphy.',
        ur: 'تاریخی لسانیات اور آثار قدیمہ کا ایک حل طلب کھلا سوال۔'
      }
    },
    associatedPersonIds: ['prs-alexander-cunningham'],
    associatedPlaceIds: ['plc-mohenjo-daro'],
    associatedConceptIds: ['cnc-decipherment-methodology'],
    associatedEventIds: ['evt-mohenjo-daro-urban-apex'],
    chapterIds: ['ch-04-cosmological-models'],
    relatedClaimIds: []
  },
  {
    id: 'clm-04-source-attested-berossus-chronology',
    slug: 'source-attested-unverified-berossus-antediluvian-chronology',
    statement: {
      en: 'Ten antediluvian kings ruled the cities of southern Mesopotamia for a combined total of 120 saroi (432,000 solar years) before the deluge.',
      ur: 'طوفان نوح سے قبل دس بادشاہوں نے میسوپوٹیمیا پر مجموعی طور پر 432,000 سال تک حکمرانی کی۔'
    },
    language: 'en',
    chapterId: 'ch-03-cuneiform-revolution',
    sectionId: 'sec-03-04',
    timestamp: '31:45',
    claimType: 'historical',
    status: 'source_reported',
    epistemicStatus: 'source_reported',
    confidence: 'unsupported',
    confidenceRating: 'tradition_only',
    epistemicRationale: {
      en: 'Attested in the Hellenistic historical compilation of Berossus and the Sumerian King List (Weld-Blundell Prism WB 444). However, modern geological, archaeological, and biological science confirms this 432,000-year span is a mythological cosmological sexagesimal number, not a historical biological reality.',
      ur: 'بیروسس کی کتاب اور سومری شاہی فہرست میں یہ درج تو ہے، مگر سائنسی و تاریخی اعتبار سے یہ دیومالائی و کائناتی ریاضی کا علامتی ہندسہ ہے، تاریخی حقیقت نہیں۔'
    },
    primarySourceIds: ['ps-uruk-iv-tablet'],
    secondarySourceIds: ['src-berossus-babyloniaca'],
    supportingEvidence: [
      {
        en: 'Exact textual concurrence between Berossus’s Babyloniaca (FGrHist 680) and earlier cuneiform prism WB 444 on the names and sequence of the pre-flood monarchs.',
        ur: 'بیروسس کی کتاب اور قدیم سومری پرزم دونوں میں طوفان سے پہلے کے بادشاہوں کے نام اور ترتیب ایک جیسی ہے۔'
      }
    ],
    contradictingEvidence: [
      {
        en: 'Homo sapiens biological lifespan and prehistoric demographic records prove human individuals cannot live tens of thousands of years.',
        ur: 'حیاتیاتی اور بشریاتی حقائق ثابت کرتے ہیں کہ انسان ہزاروں سال زندہ نہیں رہ سکتا۔'
      },
      {
        en: 'Archaeological stratigraphy at Eridu, Uruk, and Shuruppak demonstrates continuous cultural occupation without 400,000 years of dynastic antiquity.',
        ur: 'اریدو، ارک اور شورپک کی کھدائیوں سے مسلسل انسانی تہیں ملی ہیں جن میں چار لاکھ سال کی قدامت کا کوئی وجود نہیں۔'
      }
    ],
    editorialNotes: {
      en: 'CRITICAL DEMARCATION: Source Reported does NOT mean Verified. A primary cuneiform clay prism states 432,000 years; this proves what ancient scribes wrote, but it does NOT establish it as historical physical fact.',
      ur: 'اہم ترین علمی اصول: ماخذ میں درج ہونے کا مطلب سائنسی تصدیق ہرگز نہیں ہے۔ سومری تختی پر 432,000 سال لکھا ہوا ہونا صرف یہ ثابت کرتا ہے کہ قدیم منشی نے ایسا لکھا تھا، یہ اس بات کا ثبوت نہیں کہ واقعہ حقیقت تھا۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'The Sumerian King List and Berossus state that 10 antediluvian kings reigned for 432,000 years before the flood.',
        ur: 'سومری بادشاہی فہرست اور بیروسس کا بیان کہ دس بادشاہوں نے طوفان سے قبل 432,000 سال حکومت کی۔'
      },
      primaryEvidenceIndicates: {
        en: 'Cuneiform prism WB 444 physically contains these exact numbers engraved in clay.',
        ur: 'مٹی کا پرزم ڈبلیو بی 444 اصل حالت میں یہ اعداد و شمار اپنے اوپر محفوظ رکھتا ہے۔'
      },
      modernScholarshipConcludes: {
        en: 'The numbers represent sacred sexagesimal numerology (120 × 3,600 = 432,000) linking earthly kingship to cosmic astronomical cycles.',
        ur: 'جدید تحقیق سے ثابت ہے کہ یہ ساٹھ پر مبنی مقدس کائناتی حساب تھا جس کا مقصد زمین پر بادشاہت کو فلکیاتی دائروں سے جوڑنا تھا۔'
      },
      editorialAssessment: {
        en: 'Source Reported (Unverified as Physical History). Perfect example of the archive’s demarcation charter.',
        ur: 'ماخذ میں مذکور مگر تاریخی طور پر غیر مصدقہ۔ ہمارے آرکائیو کے اصول تفریق کی بہترین مثال۔'
      }
    },
    associatedPersonIds: ['prs-berossus'],
    associatedPlaceIds: ['plc-uruk'],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    associatedEventIds: ['evt-proto-cuneiform-standardization'],
    chapterIds: ['ch-03-cuneiform-revolution'],
    relatedClaimIds: ['clm-05-modern-scholarship-proto-cuneiform-origins']
  },
  {
    id: 'clm-05-modern-scholarship-proto-cuneiform-origins',
    slug: 'modern-scholarship-proto-cuneiform-origins',
    statement: {
      en: 'Proto-cuneiform was not an organic alphabet, but a deliberate state-designed administrative mnemonic semiotic technology engineered for resource management in centralized Uruk institutions.',
      ur: 'پروٹو میخی تحریر اتفاقی یا نامیاتی عمل نہیں تھی، بلکہ ارک کے مرکزی اداروں میں ریاستی وسائل کی نگرانی کے لیے باقاعدہ تخلیق کردہ انتظامی علامتی ٹیکنالوجی تھی۔'
    },
    language: 'en',
    chapterId: 'ch-03-cuneiform-revolution',
    sectionId: 'sec-03-01',
    timestamp: '09:30',
    claimType: 'epigraphic',
    status: 'verified',
    epistemicStatus: 'modern_scholarship',
    confidence: 'high',
    confidenceRating: 'scholarly_majority',
    epistemicRationale: {
      en: 'Consensus of modern assyriologists and epigraphers (Glassner, Nissen, Englund) based on the sudden standardization of lexical lists (such as the Lu A professional titles list) across Uruk IV–III strata without gradual evolutionary precursors.',
      ur: 'جدید ماہرین آثار و لسانیات کا متفقہ مؤقف، جو لغوی فہرستوں اور انتظامی مہروں کی اچانک باقاعدہ تنظیم سے ثابت ہوتا ہے۔'
    },
    primarySourceIds: ['ps-uruk-iv-tablet'],
    secondarySourceIds: ['src-glassner-2003'],
    supportingEvidence: [
      {
        en: 'Discovery of identical lexical lists (such as the Lu A profession hierarchy) duplicated verbatim across Uruk IV strata, showing central scribal training.',
        ur: 'ارک کی تہوں سے پیشوں کی ایک جیسی لغوی فہرستوں کی دریافت جو باقاعدہ اسکول اور تربیت کا ثبوت ہے۔'
      },
      {
        en: 'Over 85% of excavated Uruk IV–III tablets are bureaucratic balance sheets of grain, livestock, and labor rations.',
        ur: 'ارک سے ملنے والی 85 فیصد سے زائد تختیاں غلہ، مویشیوں اور مزدوروں کی تقسیم کے کھاتے ہیں۔'
      }
    ],
    contradictingEvidence: [
      {
        en: 'Denise Schmandt-Besserat proposed writing evolved gradually from geometric clay counting tokens; Glassner and Englund demonstrate the token system cannot account for abstract grammatical signs.',
        ur: 'شمینڈٹ بسیرات کا پرانا نظریہ کہ تحریر کھلونوں سے نکلی؛ جدید لسانیات نے ثابت کیا کہ علامتی نظام باقاعدہ سوچ کا نتیجہ تھا۔'
      }
    ],
    editorialNotes: {
      en: 'Writing began as an instrument of state audit, taxation, and labor accounting, not romantic poetry or private letters.',
      ur: 'تحریر کا آغاز شاعری کے لیے نہیں بلکہ ٹیکس وصولی، غلہ کی پیمائش اور ریاستی نظم و ضبط کے لیے ہوا تھا۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Glassner (2003) demonstrates writing emerged as a structured semiological system invented in the Uruk IV period.',
        ur: 'گلاسنر کی کتاب ثابت کرتی ہے کہ تحریر باقاعدہ علامتی نظام کے طور پر ارک میں ایجاد ہوئی۔'
      },
      primaryEvidenceIndicates: {
        en: 'Stratified clay tablets from Uruk containing identical lexical signs and sexagesimal arithmetic.',
        ur: 'ارک کی تہوں سے ملنے والی تختیاں جن پر ایک جیسی علامات اور ریاضی کندہ ہے۔'
      },
      modernScholarshipConcludes: {
        en: 'Proto-cuneiform was deliberately created by state scribes to serve administrative logistics.',
        ur: 'جدید تحقیق کا حتمی نتیجہ کہ پروٹو میخی رسم الخط ارک کے منشیوں نے انتظامی ضروریات کے لیے ایجاد کیا۔'
      },
      editorialAssessment: {
        en: 'Firmly grounded in both epigraphic artifacts and institutional sociological models.',
        ur: 'کتبات اور سماجیاتی شواہد دونوں سے مکمل طور پر مصدقہ سائنسی تحقیق۔'
      }
    },
    associatedPersonIds: ['prs-enheduanna'],
    associatedPlaceIds: ['plc-uruk'],
    associatedConceptIds: ['cnc-cuneiform-transmission'],
    associatedEventIds: ['evt-proto-cuneiform-standardization'],
    chapterIds: ['ch-03-cuneiform-revolution'],
    relatedClaimIds: ['clm-04-source-attested-berossus-chronology']
  },
  {
    id: 'clm-06-interpretation-pillar-43-archaeoastronomy',
    slug: 'interpretation-pillar-43-archaeoastronomy-comet-strike',
    statement: {
      en: 'The animal reliefs on Göbekli Tepe Pillar 43 represent constellations and encode a Younger Dryas comet impact event dating to 10,890 BCE.',
      ur: 'گوئبکلی تپہ کے ستون 43 پر بنے جانور دراصل برجوں اور ستاروں کے نقوش ہیں جو 10,890 قبل مسیح کے شہابی حادثے کو ظاہر کرتے ہیں۔'
    },
    language: 'en',
    chapterId: 'ch-02-neolithic-dawn',
    sectionId: 'sec-02-03',
    timestamp: '26:50',
    claimType: 'astronomical',
    status: 'interpretive',
    epistemicStatus: 'interpretation',
    confidence: 'contested',
    confidenceRating: 'contested_hypothesis',
    epistemicRationale: {
      en: 'Proposed by Martin Sweatman and Dimitrios Tsikritsis (2017). Strongly contested by the Göbekli Tepe excavation team (Jens Notroff, Oliver Dietrich et al.) as speculative pattern-matching unsupported by Neolithic iconographic context or astronomical records.',
      ur: 'مارٹن سویٹمین کا پیش کردہ حسابی تخمینہ۔ کھدائی کرنے والی مرکزی ٹیم نے اسے قبل از وقت اور غیر مصدقہ قرار دے کر رد کیا ہے۔'
    },
    primarySourceIds: ['ps-gobekli-pillar-43'],
    secondarySourceIds: ['src-schmidt-2006'],
    supportingEvidence: [
      {
        en: 'Computerized statistical correlation of animal figures to zodiacal constellations as viewed from the northern hemisphere around 10,950 BCE.',
        ur: 'کمپیوٹر ماڈلنگ جس میں جانوروں کے نقوش کا موازنہ 10,950 قبل مسیح کے آسمانی ستاروں سے کیا گیا۔'
      }
    ],
    contradictingEvidence: [
      {
        en: 'The excavation team demonstrated the animal motifs appear on portable domestic artifacts, pestles, and bone needles throughout upper Mesopotamia without astronomical orientation.',
        ur: 'کھدائی ٹیم نے ثابت کیا کہ یہ جانور روزمرہ کے گھریلو اوزاروں پر بھی ملتے ہیں جن کا فلکیات سے کوئی تعلق نہیں۔'
      },
      {
        en: 'Stratigraphic dating of Enclosure D places its construction c. 9500 BCE, more than 1,300 years after the proposed Younger Dryas boundary impact event.',
        ur: 'انکلوژر ڈی کی اصل تاریخ 9500 قبل مسیح ہے، جو مفروضہ شہابی حادثے سے تیرہ سو سال بعد کی ہے۔'
      }
    ],
    editorialNotes: {
      en: 'Classified strictly as an Interpretation / Contested Hypothesis. Popular media sensationalism must not be mistaken for empirical archaeological consensus.',
      ur: 'اسے سختی سے تشریح اور غیر مصدقہ مفروضے کے طور پر درج کیا گیا ہے۔ سوشل میڈیا کی قیاس آرائیوں کو سائنسی حقیقت نہ سمجھا جائے۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Sweatman & Tsikritsis (2017) argue Pillar 43 is a date stamp for a catastrophic cosmic impact.',
        ur: 'سویٹمین اور ساتھیوں کا دعویٰ کہ ستون 43 ایک فلکیاتی حادثے کی تاریخ ریکارڈ کرتا ہے۔'
      },
      primaryEvidenceIndicates: {
        en: 'Limestone pillar carving showing vulture, scorpion, disc, and headless human.',
        ur: 'پتھر کا ستون جس پر گدھ، بچھو، دائرہ اور بغیر سر کا جسم کندہ ہے۔'
      },
      modernScholarshipConcludes: {
        en: 'The astronomical interpretation is methodologically flawed and rejected by field archaeologists.',
        ur: 'ماہرین آثار قدیمہ اس فلکیاتی مفروضے کو غیر سائنسی اور بے بنیاد قرار دیتے ہیں۔'
      },
      editorialAssessment: {
        en: 'A speculative modern interpretation lacking epigraphic and archaeological backing.',
        ur: 'ایک جدید قیاس آرائی جس کی تائید کھدائی کے حقائق سے نہیں ہوتی۔'
      }
    },
    associatedPersonIds: ['prs-klaus-schmidt'],
    associatedPlaceIds: ['plc-gobekli-tepe'],
    associatedConceptIds: ['cnc-monumental-architecture'],
    associatedEventIds: ['evt-gobekli-enclosure-d-erection'],
    chapterIds: ['ch-02-neolithic-dawn'],
    relatedClaimIds: ['clm-02-disputed-gobekli-pure-cult']
  },
  {
    id: 'clm-07-editorial-analysis-epistemic-transition',
    slug: 'editorial-analysis-40k-epistemic-transmission-continuity',
    statement: {
      en: 'The 40,000-year arc of human knowledge represents a shift from embodied visceral myth to external symbolic scaffolding, culminating in systematic critical verification.',
      ur: 'انسانی علم کا چالیس ہزار سالہ سفر وجدانی دیومالا سے خارجی علامتی اوزاروں اور بالآخر باقاعدہ تنقیدی جانچ پڑتال کی طرف ارتقاء کو ظاہر کرتا ہے۔'
    },
    language: 'en',
    chapterId: 'ch-01-symbolic-consciousness',
    sectionId: 'sec-01-04',
    timestamp: '42:15',
    claimType: 'cosmological',
    status: 'partially_verified',
    epistemicStatus: 'editorial_analysis',
    confidence: 'high',
    confidenceRating: 'firmly_established',
    epistemicRationale: {
      en: 'Editorial framework formulated by Furqan Qureshi in the foundational series, providing the philosophical lens to separate ancient testimony from empirical verification without modern condescension.',
      ur: 'فرقان قریشی کے تحقیقی سلسلے کا فکری تناظر، جو قدیم گواہی اور سائنسی تصدیق کے درمیان غیر متعصبانہ تمیز قائم کرتا ہے۔'
    },
    primarySourceIds: [],
    secondarySourceIds: ['src-qureshi-archive'],
    supportingEvidence: [
      {
        en: 'Material progression from cave ochre pigments to clay tally tokens, standardized cuneiform lexical lists, and modern scientific laboratory carbon calibrations.',
        ur: 'غار کے رنگوں سے لے کر مٹی کی تختیوں، میخی فہرستوں اور جدید لیبارٹری پیمائشوں تک تاریخی ارتقاء کے مادی شواہد۔'
      }
    ],
    contradictingEvidence: [],
    editorialNotes: {
      en: 'This framework defines the charter of the entire archive: honoring the primary record without conflating mythology with empirical science.',
      ur: 'یہ فکری اصول پورے آرکائیو کی بنیاد ہے: قدیم کتبات کی عزت کرنا مگر دیومالا کو سائنسی ثبوت نہ سمجھنا۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'The 40,000 Years of Knowledge series posits knowledge as continuous externalized memory.',
        ur: 'چالیس ہزار سالہ علم کا سلسلہ انسانی یادداشت کے مادی ارتقاء کا فلسفہ پیش کرتا ہے۔'
      },
      primaryEvidenceIndicates: {
        en: 'Empirical timeline of inscribed artifacts from 40k BP to present.',
        ur: 'چالیس ہزار سال قبل سے اب تک کے تحریری و مادی نوادرات کی تاریخی زنجیر۔'
      },
      modernScholarshipConcludes: {
        en: 'Cognitive archaeology supports external symbolic storage as a primary driver of human cultural evolution (Donald, Renfrew).',
        ur: 'شعوری آثار قدیمہ (ڈینلڈ، رینفریو) تصدیق کرتی ہے کہ بیرونی یادداشت ہی ثقافت کا اصل انجن ہے۔'
      },
      editorialAssessment: {
        en: 'Editorial analytical synthesis underpinning the archive’s architectural design.',
        ur: 'ادارتی و فلسفیانہ جائزہ جس پر اس پورے تحقیقی نظام کی بنیاد رکھی گئی ہے۔'
      }
    },
    associatedPersonIds: ['prs-furqan-qureshi'],
    associatedPlaceIds: [],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    associatedEventIds: [],
    chapterIds: ['ch-01-symbolic-consciousness', 'ch-03-cuneiform-revolution'],
    relatedClaimIds: ['clm-01-verified-aurignacian-art', 'clm-05-modern-scholarship-proto-cuneiform-origins']
  },
  {
    id: 'clm-ch01-cosmic-expansion',
    slug: 'metric-expansion-of-spacetime-and-cmb-verification',
    statement: {
      en: 'Physical astrophysics verifies the metric expansion of spacetime from an initial hot dense state ~13.8 billion years ago, confirmed by the Cosmic Microwave Background (CMB) and cosmological redshift.',
      ur: 'طبیعی فلکیات برقی و کائناتی سرخ منتقلی اور کائناتی پس منظر کی شعاعوں (CMB) کے ذریعے 13.8 ارب سال قبل بگ بینگ اور وسعت پذیر کائنات کی تصدیق کرتی ہے۔'
    },
    language: 'en',
    chapterId: 'ch-01-universe-seven-skies',
    sectionId: 'sec-01-03',
    timestamp: '02:42',
    claimType: 'astronomical',
    status: 'verified',
    epistemicStatus: 'verified',
    confidence: 'high',
    confidenceRating: 'firmly_established',
    epistemicRationale: {
      en: 'Empirically verified by Edwin Hubble (1929), Arno Penzias & Robert Wilson (1965), and high-precision orbital observatories (COBE, WMAP, Planck). Spacetime metric expansion is an established physical observation.',
      ur: 'ہبل، پینزیاس، ولسن اور پلانک خلائی دوربین کے تجرباتی ڈیٹا سے مصدقہ سائنسی حقیقت۔'
    },
    primarySourceIds: [],
    secondarySourceIds: ['src-qureshi-archive'],
    supportingEvidence: [
      {
        en: 'CMB blackbody temperature measured at 2.7255 K with isotropic spatial distribution across the entire celestial sphere.',
        ur: 'کائناتی پس منظر کی شعاعوں کا یکساں درجہ حرارت (2.7255 کیلون) جو ابتدائی کائنات کا براہ راست عکس ہے۔'
      },
      {
        en: 'Spectral absorption lines of distant galaxies uniformly shifted toward longer red wavelengths proportional to distance.',
        ur: 'دور دراز کی کہکشاؤں سے آنے والی روشنی کا سرخ رنگ میں شفٹ ہونا جو کائنات کی وسعت کا قطعی ثبوت ہے۔'
      }
    ],
    contradictingEvidence: [],
    editorialNotes: {
      en: 'Astrophysical consensus models expansion within the observable universe (~93 billion light-years diameter); questions regarding what lies "beyond" or "above" remain speculative and outside direct telescopic calibration.',
      ur: 'سائنس قابل مشاہدہ کائنات (93 ارب نوری سال) کی وسعت کو مانتی ہے، جبکہ اس کے بعد کے دائرے تاحال دوربین کے مشاہدے سے ماورا ہیں۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Original video discusses what modern physical science establishes regarding the expansion and age of the cosmos.',
        ur: 'ویڈیو میں جدید سائنس کے کائناتی پھیلاؤ اور عمر کے نظریات کا جائزہ لیا گیا ہے۔'
      },
      primaryEvidenceIndicates: {
        en: 'Calibrated satellite radiometry and galactic spectrography across all celestial quadrants.',
        ur: 'خلائی سیٹلائٹس کی تابکاری پیمائش اور کہکشاؤں کا اسپیکٹرم۔'
      },
      modernScholarshipConcludes: {
        en: 'Standard Lambda-CDM cosmological model of an expanding universe with dark energy and dark matter.',
        ur: 'معیاری لیمبڈا سی ڈی ایم ماڈل جو پھیلتی ہوئی کائنات کی تصدیق کرتا ہے۔'
      },
      editorialAssessment: {
        en: 'Verified empirical science; must be kept distinct from metaphysical interpretations.',
        ur: 'مصدقہ سائنسی حقیقت جسے فلسفیانہ و مذہبی تاویلات سے الگ رکھنا ضروری ہے۔'
      }
    },
    associatedPersonIds: ['prs-furqan-qureshi'],
    associatedPlaceIds: [],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-01-universe-seven-skies'],
    relatedClaimIds: ['clm-ch01-seven-skies-physical-nature']
  },
  {
    id: 'clm-ch01-ancient-skies-seven',
    slug: 'ancient-multi-layered-cosmologies-and-seven-heavens',
    statement: {
      en: 'Ancient Mesopotamian, Egyptian, and Mediterranean civilizations structured cosmological space into multi-layered celestial vaults (frequently three or seven tiers) corresponding to the visible naked-eye planetary wanderers.',
      ur: 'قدیم میسوپوٹیمیا، مصر اور سامی اقوام نے آسمان کو کثیر تہوں (عموماً تین یا سات آسمانوں) میں تقسیم کیا تھا جو سات متحرک سیاروں کے مداروں کے مطابق تھے۔'
    },
    language: 'en',
    chapterId: 'ch-01-universe-seven-skies',
    sectionId: 'sec-01-05',
    timestamp: '05:16',
    claimType: 'historical',
    status: 'partially_verified',
    epistemicStatus: 'modern_scholarship',
    confidence: 'medium',
    confidenceRating: 'scholarly_majority',
    epistemicRationale: {
      en: 'Documented across cuneiform tablets (e.g. KAR 307: three heavens of stone) and Hellenistic astrological systems mapping the 7 classical planets (Moon, Mercury, Venus, Sun, Mars, Jupiter, Saturn).',
      ur: 'میسوپوٹیمیا کی میخی تختیوں (تین سنگی آسمان) اور قدیم فلکیاتی ریکارڈ میں سات سیاروں کی بنیاد پر آسمانی تقسیم مصدقہ طور پر درج ہے۔'
    },
    primarySourceIds: ['ps-uruk-iv-tablet'],
    secondarySourceIds: ['src-berossus-babyloniaca'],
    supportingEvidence: [
      {
        en: 'Babylonian astronomical texts designate upper, middle, and lower heavens associated with Anu, Bel, and Ea.',
        ur: 'بابل کے متون میں بالائی، درمیانی اور زیریں آسمان کے تصورات مٹی کی تختیوں پر محفوظ ہیں۔'
      }
    ],
    contradictingEvidence: [],
    editorialNotes: {
      en: 'The number seven in ancient cosmology frequently derived from the seven visible wandering celestial bodies observable before the invention of optical telescopes.',
      ur: 'قدیم دنیا میں سات کا ہندسہ اکثر دوربین کی ایجاد سے قبل آنکھ سے نظر آنے والے سات متحرک سیاروں کی وجہ سے مقدس سمجھا جاتا تھا۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Video surveys what ancient civilizations (Sumerians, Babylonians, Egyptians) recorded regarding the architecture of the sky.',
        ur: 'ویڈیو میں قدیم تہذیبوں کے آسمانی نقشوں اور عقائد کا جائزہ پیش کیا گیا ہے۔'
      },
      primaryEvidenceIndicates: {
        en: 'Extant cuneiform tablets and tomb ceiling star clocks recording astral layers.',
        ur: 'میسوپوٹیمیا کی تختیاں اور اہراموں کی چھتوں پر بنے ستاروں کے نقشے۔'
      },
      modernScholarshipConcludes: {
        en: 'Multi-tiered heavens were a standard cosmological motif across the ancient Near East.',
        ur: 'قدیم مشرق قریب میں کثیر تہوں والے آسمانوں کا تصور ایک عمومی ثقافتی نمونہ تھا۔'
      },
      editorialAssessment: {
        en: 'Historical claim verified by archaeological texts; demonstrates historical precedent of the seven heavens motif.',
        ur: 'تاریخی کتبات سے مصدقہ؛ سات آسمانوں کے تصور کا قدیم تہذیبی پس منظر ظاہر کرتا ہے۔'
      }
    },
    associatedPersonIds: ['prs-berossus'],
    associatedPlaceIds: ['plc-uruk'],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-01-universe-seven-skies'],
    relatedClaimIds: ['clm-ch01-seven-skies-physical-nature']
  },
  {
    id: 'clm-ch01-seven-skies-physical-nature',
    slug: 'theological-concept-of-seven-skies-open-question',
    statement: {
      en: 'The "Seven Skies" (Sab’a Samawat) revealed in religious scripture constitute seven physically stratified astrophysical layers or concentric dimensional realms encompassing the material universe.',
      ur: 'قرآنی اور مذہبی اصطلاح "سبع سمٰوات" (سات آسمان) مادی کائنات کو گھیرے ہوئے سات الگ الگ طبیعی یا کائناتی تہوں کو ظاہر کرتی ہے۔'
    },
    language: 'en',
    chapterId: 'ch-01-universe-seven-skies',
    sectionId: 'sec-01-15',
    timestamp: '37:30',
    claimType: 'theological',
    status: 'open_question',
    epistemicStatus: 'open_question',
    confidence: 'speculative',
    confidenceRating: 'contested_hypothesis',
    epistemicRationale: {
      en: 'Classified strictly as an Open Question / Hermeneutic Interpretation. In classical Islamic exegesis (Tabari, Ibn Kathir, Razi), opinions diverge between physical vaults, spiritual realms, and planetary spheres. Modern astrophysics observes a continuous metric space without physical domes or boundaries.',
      ur: 'سختی سے ایک کھلا سوال اور تفسیری نظریہ مانا جاتا ہے۔ کلاسیکی مفسرین میں جسمانی چھتوں، روحانی مداروں اور فلکیاتی کروں کے درمیان گہرا اختلاف رہا ہے۔ جدید سائنس کسی ٹھوس دیوار یا چھت کا مشاہدہ نہیں کرتی۔'
    },
    primarySourceIds: [],
    secondarySourceIds: ['src-qureshi-archive'],
    supportingEvidence: [
      {
        en: 'Multiple Quranic attestations (e.g. Surah Al-Mulk 67:3, Al-Baqarah 2:29, Fussilat 41:12) describing the creation of seven heavens in harmony.',
        ur: 'قرآن مجید میں متعدد آیات میں سات آسمانوں کی تخلیق کا صریح ذکر۔'
      }
    ],
    contradictingEvidence: [
      {
        en: 'Telescopic astronomy, deep-field cosmology, and particle physics detect no physical barriers, concentric celestial crystal spheres, or material domes dividing space.',
        ur: 'خلائی دوربینوں اور فزکس کے مشاہدات میں فضا یا خلا کے اندر کسی ٹھوس گنبد، دیوار یا کرسٹل چھت کا کوئی وجود نہیں ملتا۔'
      }
    ],
    editorialNotes: {
      en: 'CARDINAL ARCHIVE RULE: We do not dismiss the theological revelation as primitive nonsense, nor do we invent pseudo-scientific physical proof. The nature of the Seven Skies remains an open theological question beyond empirical falsification.',
      ur: 'بنیادی آرکائیو اصول: نہ تو ہم قرآنی بیان کو رد کرتے ہیں اور نہ ہی زبردستی سائنس کو اس پر لاگو کرنے کی غیر سائنسی کوشش کرتے ہیں۔ یہ ایک ایمانی و تفسیری کھلا سوال ہے۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Furqan Qureshi analyzes the linguistic root of "Sama" (that which is above/exalted) and presents cosmological theories attempting to correlate the seven skies with astrophysical dimensions.',
        ur: 'فرقان قریشی لفظ "سماء" کے لغوی مفہوم اور جدید فزکس کے ڈائمینشنز کے ساتھ ممکنہ تقابل کا جائزہ پیش کرتے ہیں۔'
      },
      primaryEvidenceIndicates: {
        en: 'Scriptural text of Surah Fussilat and Al-Mulk; no empirical physical sample of upper heavens exists.',
        ur: 'قرآنی متون؛ بالائی آسمانوں کا کوئی مادی سائنسی نمونہ انسانی دسترس میں نہیں ہے۔'
      },
      modernScholarshipConcludes: {
        en: 'Concordist attempts to map ancient cosmological vocabulary onto 20th-century quantum physics or string theory are hermeneutically contested.',
        ur: 'قدیم کائناتی الفاظ کو جدید کوانٹم فزکس پر زبردستی منطبق کرنے کی کوششوں کو سنجیدہ علمی حلقوں میں متنازعہ مانا جاتا ہے۔'
      },
      editorialAssessment: {
        en: 'An enduring open question belonging to scriptural hermeneutics and theology, distinct from empirical physics.',
        ur: 'علم الکلام اور تفسیری کونیات کا ایک کھلا سوال جو سائنسی تجربات کے دائرے سے ماورا ہے۔'
      }
    },
    associatedPersonIds: ['prs-furqan-qureshi'],
    associatedPlaceIds: [],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-01-universe-seven-skies'],
    relatedClaimIds: ['clm-ch01-cosmic-expansion', 'clm-ch01-ancient-skies-seven']
  },
  {
    id: 'clm-ch01-scripture-all-answers',
    slug: 'theological-omniscience-assertion-source-reported',
    statement: {
      en: 'A single religious tradition contains all exhaustive cosmological and empirical answers to the structure and origin of the physical universe.',
      ur: 'ایک مخصوص مذہبی روایت کے پاس کائنات کی طبیعی ساخت اور آغاز سے متعلق تمام حتمی سائنسی و کائناتی جوابات موجود ہیں۔'
    },
    language: 'en',
    chapterId: 'ch-01-universe-seven-skies',
    sectionId: 'sec-01-09',
    timestamp: '16:04',
    claimType: 'theological',
    status: 'source_reported',
    epistemicStatus: 'source_reported',
    confidence: 'unsupported',
    confidenceRating: 'tradition_only',
    epistemicRationale: {
      en: 'Classified strictly as Source Reported (Unverified Empirical Claim). This rhetorical claim is articulated in the video presentation (Section 16:04). The archive catalogs it faithfully as the creator’s spoken thesis, but explicitly demarcates faith-based claims from scientifically verified consensus.',
      ur: 'سختی سے "ماخذ میں مذکور (غیر مصدقہ)" کے طور پر درجہ بند۔ یہ ویڈیو کے مصنف کا ایک ایمانی و خطیبانہ دعویٰ ہے جسے آرکائیو میں درج کیا گیا ہے، مگر اسے سائنسی تحقیق کا ثابت شدہ نتیجہ نہیں مانا جا سکتا۔'
    },
    primarySourceIds: [],
    secondarySourceIds: ['src-qureshi-archive'],
    supportingEvidence: [],
    contradictingEvidence: [
      {
        en: 'Empirical natural science relies on reproducible observation, measurement, and falsification, which are distinct in method and scope from spiritual or moral revelation.',
        ur: 'تجرباتی سائنس مشاہدے اور تجربے پر چلتی ہے، جس کا دائرہ اخلاقی و روحانی الہام کے دائرے سے مختلف ہے۔'
      }
    ],
    editorialNotes: {
      en: 'Source Preservation Standard: We do not alter or censor the video author’s strong theological conviction, but we tag it with the Archive Demarcation badge so readers understand the epistemic distinction.',
      ur: 'ماخذ کے تحفظ کا اصول: ہم مصنف کے مؤقف کو سنسر نہیں کرتے، مگر اسے ادارتی طور پر واضح کرتے ہیں تاکہ قاری کو معلوم ہو کہ یہ ایک ایمانی بیان ہے۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'The video asserts at 16:04 that divine revelation possesses all answers where ancient civilizations and secular science falter.',
        ur: 'ویڈیو میں دعویٰ کیا گیا ہے کہ وحی الٰہی کے پاس تمام جوابات موجود ہیں۔'
      },
      primaryEvidenceIndicates: {
        en: 'Spoken audiovisual lecture statement by Furqan Qureshi.',
        ur: 'فرقان قریشی کے لیکچر کا صوتی و بصری بیان۔'
      },
      modernScholarshipConcludes: {
        en: 'Philosophy of science establishes that religious texts are not technical science manuals.',
        ur: 'فلسفہ سائنس کے مطابق مذہبی متون طبیعیات کی تکنیکی نصابی کتابیں نہیں ہیں۔'
      },
      editorialAssessment: {
        en: 'Source Reported statement; faithfully preserved as source material without presenting it as empirical fact.',
        ur: 'ماخذ کا اپنا بیان؛ اسے آزادانہ سائنسی تصدیق کے بغیر خالصتاً ماخذ کی رائے کے طور پر محفوظ رکھا گیا ہے۔'
      }
    },
    associatedPersonIds: ['prs-furqan-qureshi'],
    associatedPlaceIds: [],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-01-universe-seven-skies'],
    relatedClaimIds: ['clm-ch01-seven-skies-physical-nature']
  },
  {
    id: 'clm-ch01-unreviewed-pre-islamic-astronomy',
    slug: 'unreviewed-pre-islamic-bedouin-star-lore-anwa',
    statement: {
      en: 'Pre-Islamic Arabian star lore (Anwa) preserved celestial navigation markers that influenced early Arabic cosmological vocabulary prior to Greek translation movements.',
      ur: 'قبل از اسلام عرب قبائل کا روایتی علم النجوم (انواء) ایسی فلکیاتی اصطلاحات پر مشتمل تھا جس نے یونانی تراجم سے قبل عربی کونیاتی زبان کو تشکیل دیا۔'
    },
    language: 'en',
    chapterId: 'ch-01-universe-seven-skies',
    sectionId: 'sec-ch01-05-understanding-the-sky',
    timestamp: '23:42',
    claimType: 'linguistic',
    status: 'unreviewed',
    epistemicStatus: 'unreviewed',
    confidence: 'contested',
    confidenceRating: 'contested_hypothesis',
    epistemicRationale: {
      en: 'Awaiting primary epigraphic collation against Safaitic and Thamudic rock inscriptions. Currently based on secondary medieval lexicographical compilations (e.g. Ibn Qutaybah).',
      ur: 'صفائی اور ثمودی کتبات کے ساتھ تقابل تاحال مکمل نہیں ہوا؛ فی الوقت قرون وسطیٰ کی لغات کے بیانات پر مبنی غیر جائزہ شدہ دعویٰ۔'
    },
    primarySourceIds: [],
    secondarySourceIds: ['src-qureshi-archive'],
    supportingEvidence: [
      {
        en: 'Ibn Qutaybah’s Kitab al-Anwa documents traditional meteorological star risings among nomadic tribes.',
        ur: 'ابن قتیبہ کی کتاب الانواء میں بدوی قبائل کے موسمی اور فلکیاتی مشاہدات کا اندراج۔'
      }
    ],
    contradictingEvidence: [],
    editorialNotes: {
      en: 'Status: Unreviewed. Research workspace editorial team needs to cross-examine pre-Islamic epigraphic attestations before elevating status.',
      ur: 'حیثیت: تاحال زیرِ تحقیق۔ اس دعوے کی تصدیق کے لیے کتباتی شواہد کی پڑتال جاری ہے۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Source lecture references early linguistic understandings of the sky among Arabian nomads.',
        ur: 'ویڈیو لیکچر میں بدوی عربوں کے کائناتی فہم اور آسمان کے روایتی ناموں کا تذکرہ ہے۔'
      },
      primaryEvidenceIndicates: {
        en: 'North Arabian rock inscriptions cataloging star deities (Ruda, Nuha) and seasonal markers.',
        ur: 'شمالی عرب کے کتبات جن میں ستاروں اور موسمی علامتوں کا ذکر ملتا ہے۔'
      },
      modernScholarshipConcludes: {
        en: 'Anwa traditions represent indigenous empirical observational weather tracking distinct from Hellenistic astrology.',
        ur: 'جدید ماہرین کے نزدیک انواء روایات یونانی علم نجوم سے الگ خالصتاً مقامی موسمی مشاہدات تھے۔'
      },
      editorialAssessment: {
        en: 'Unreviewed item queued for formal epigraphic literature verification.',
        ur: 'غیر جائزہ شدہ اندراج؛ رسمی کتباتی تصدیق کے انتظار میں۔'
      }
    },
    associatedPersonIds: ['prs-furqan-qureshi'],
    associatedPlaceIds: [],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-01-universe-seven-skies'],
    relatedClaimIds: []
  },
  {
    id: 'clm-ch01-primary-source-enuma-elish-sky',
    slug: 'primary-source-located-mesopotamian-watery-sky-firmament',
    statement: {
      en: 'The Mesopotamian epic Enuma Elish describes Marduk cleaving the primordial water goddess Tiamat into two halves, forming the upper cosmic waters and the celestial roof.',
      ur: 'میسوپوٹیمیا کی قدیم رزمیہ اینوما ایلیش میں بیان ہے کہ مردوک نے سمندری دیوی تیامت کے دو ٹکڑے کر کے ایک سے بالائی آسمانی چھت اور پانیوں کو الگ کیا۔'
    },
    language: 'en',
    chapterId: 'ch-01-universe-seven-skies',
    sectionId: 'sec-ch01-03-ancient-civilizations',
    timestamp: '05:16',
    claimType: 'epigraphic',
    status: 'primary_source_located',
    epistemicStatus: 'primary_source_located',
    confidence: 'high',
    confidenceRating: 'firmly_established',
    epistemicRationale: {
      en: 'Primary cuneiform tablet source identified: Enuma Elish Tablet IV, lines 137–146 (British Museum K.3437+). The mythological text is physically authenticated, but represents religious mythology rather than physical astrophysics.',
      ur: 'بنیادی میخی تختی کا سراغ مل چکا ہے: برٹش میوزیم میں اینوما ایلیش تختی نمبر 4 (K.3437+)۔ کتبہ مادی طور پر موجود ہے مگر یہ دیومالائی عقیدہ ہے، سائنسی حقیقت نہیں۔'
    },
    primarySourceIds: ['ps-uruk-iv-tablet'],
    secondarySourceIds: ['src-berossus-babyloniaca'],
    supportingEvidence: [
      {
        en: 'British Museum cuneiform accession K.3437+ preserves lines: "He split her up like a flat fish into two halves; one half of her he established as a covering for heaven."',
        ur: 'برٹش میوزیم کی میخی تختی پر واضح عبارت کہ اس نے تیامت کو مچھلی کی طرح چیرا اور آدھے حصے کو آسمان کی چھت بنا دیا۔'
      }
    ],
    contradictingEvidence: [],
    editorialNotes: {
      en: 'Primary Source Located confirms that ancient Near Eastern scribes did indeed formulate a watery firmament mythology. This primary text documents ancient belief, not physical reality.',
      ur: 'بنیادی ماخذ کی موجودگی اس بات کا ثبوت ہے کہ قدیم لوگ ایسا عقیدہ رکھتے تھے، نہ کہ یہ کہ کائنات حقیقت میں ایسے بنی تھی۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Video discusses ancient Mesopotamian cosmological models and their mythological framing.',
        ur: 'ویڈیو میں قدیم میسوپوٹیمیا کے کائناتی ماڈلز اور دیومالائی کہانیوں کا ذکر ہے۔'
      },
      primaryEvidenceIndicates: {
        en: 'Cuneiform tablet K.3437+ from the Library of Ashurbanipal at Nineveh.',
        ur: 'نینویٰ میں اشور بنی پال کے کتب خانے سے ملنے والی میخی تختی K.3437+۔'
      },
      modernScholarshipConcludes: {
        en: 'Enuma Elish Tablet IV represents 1st millennium BCE Babylonian political-theological legitimation of Marduk.',
        ur: 'جدید اشوریات کے مطابق یہ تختی مردوک کی بالادستی کو ثابت کرنے والی مذہبی رزمیہ تھی۔'
      },
      editorialAssessment: {
        en: 'Primary source authenticated. Epistemic status set to Primary Source Located; claim records ancient mythological ideology.',
        ur: 'بنیادی تختی کی تصدیق ہو چکی ہے؛ یہ قدیم تہذیب کے دیومالائی عقیدے کو مصدقہ طور پر ریکارڈ کرتی ہے۔'
      }
    },
    associatedPersonIds: ['prs-berossus'],
    associatedPlaceIds: ['plc-uruk'],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-01-universe-seven-skies'],
    relatedClaimIds: ['clm-ch01-ancient-skies-seven']
  },
  {
    id: 'clm-ch01-unsupported-solid-dome-firmament',
    slug: 'unsupported-physical-solid-dome-firmament-vault',
    statement: {
      en: 'The observable sky is enclosed by a physically solid, impenetrable material dome or crystalline vault resting on mountain pillars at the edge of the flat terrestrial plane.',
      ur: 'قابلِ مشاہدہ آسمان ایک ٹھوس، غیر مرئی مادی گنبد یا کرسٹل چھت کے اندر بند ہے جو زمین کے کناروں پر قائم پہاڑوں پر ٹکی ہوئی ہے۔'
    },
    language: 'en',
    chapterId: 'ch-01-universe-seven-skies',
    sectionId: 'sec-ch01-04-what-is-sky-science',
    timestamp: '25:03',
    claimType: 'astronomical',
    status: 'unsupported',
    epistemicStatus: 'unsupported',
    confidence: 'unsupported',
    confidenceRating: 'tradition_only',
    epistemicRationale: {
      en: 'Empirically and scientifically unsupported. Thousands of artificial satellites, suborbital probes, and interplanetary spacecraft (Voyager 1 & 2, New Horizons) have passed through all atmospheric strata without encountering any physical resistance or boundary vault.',
      ur: 'تجرباتی و سائنسی طور پر مکمل غیر مصدقہ اور بے بنیاد۔ ہزاروں مصنوعی سیارچے اور وائجر خلائی جہاز بغیر کسی ٹھوس رکاوٹ کے خلا میں سفر کر چکے ہیں۔'
    },
    primarySourceIds: [],
    secondarySourceIds: ['src-qureshi-archive'],
    supportingEvidence: [],
    contradictingEvidence: [
      {
        en: 'Spacecraft navigation telemetry demonstrates smooth transition across all atmospheric strata (troposphere through exosphere) directly into interplanetary vacuum.',
        ur: 'خلائی راکٹوں اور سیارچوں کے راستے میں کسی بھی قسم کی ٹھوس رکاوٹ، دیوار یا گنبد کی عدم موجودگی۔'
      },
      {
        en: 'Atmospheric pressure gradients follow the barometric formula P(h) = P₀ e^(-Mgh/RT), demonstrating continuous gaseous thinning rather than containment by a vault.',
        ur: 'کرہ ہوائی کا دباؤ بلندی کے ساتھ بتدریج کم ہوتا جاتا ہے جو گیس کے قدرتی پھیلاؤ کا ثبوت ہے، کسی ٹھوس چھت کا نہیں۔'
      }
    ],
    editorialNotes: {
      en: 'Status: Unsupported. The archive explicitly flags this ancient pre-scientific observational intuition as scientifically unsupported by modern astrophysics and aerospace telemetry.',
      ur: 'حیثیت: غیر مصدقہ۔ قدیم مشاہداتی دھوکے کو جدید خلائی سائنس کے مقابلے میں قطعی غیر ثابت شدہ قرار دیا گیا ہے۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Lecture clarifies that physical science disproves any solid physical ceiling over the Earth.',
        ur: 'لیکچر میں واضح کیا گیا ہے کہ سائنس زمین کے اوپر کسی ٹھوس چھت کے وجود کو قطعی مسترد کرتی ہے۔'
      },
      primaryEvidenceIndicates: {
        en: 'Decades of telemetry and space vehicle trajectories traversing low Earth orbit to interstellar space.',
        ur: 'خلائی سفر کی پیمائشیں جو زمین کے گرد کھلی خلا کی تصدیق کرتی ہیں۔'
      },
      modernScholarshipConcludes: {
        en: 'Atmosphere is an unconfined gaseous envelope bound only by gravity.',
        ur: 'زمینی فضا محض کشش ثقل کے تحت رکی ہوئی گیس ہے، کوئی مادی چھت نہیں۔'
      },
      editorialAssessment: {
        en: 'Unsupported claim; categorized under clear epistemic boundary to prevent flat-earth pseudoscience.',
        ur: 'غیر مصدقہ دعویٰ؛ قاری کو واضح بتایا گیا ہے کہ اس کا کوئی سائنسی ثبوت نہیں۔'
      }
    },
    associatedPersonIds: ['prs-furqan-qureshi'],
    associatedPlaceIds: [],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-01-universe-seven-skies'],
    relatedClaimIds: ['clm-ch01-cosmic-expansion']
  },
  {
    id: 'clm-ch01-incorrect-ptolemaic-crystal-spheres',
    slug: 'incorrect-ptolemaic-geocentric-crystal-spheres-model',
    statement: {
      en: 'The sun, planets, and fixed stars are embedded inside physical concentric nested crystalline spheres made of quintessence that physically rotate around a stationary central Earth.',
      ur: 'سورج، ستارے اور سیارے شفاف کرسٹل کے بنے ٹھوس آسمانی کروں کے اندر جڑے ہوئے ہیں جو ساکن زمین کے گرد گھومتے ہیں۔'
    },
    language: 'en',
    chapterId: 'ch-01-universe-seven-skies',
    sectionId: 'sec-ch01-03-ancient-civilizations',
    timestamp: '10:48',
    claimType: 'astronomical',
    status: 'incorrect',
    epistemicStatus: 'incorrect',
    confidence: 'unsupported',
    confidenceRating: 'tradition_only',
    epistemicRationale: {
      en: 'Historically influential classical model formulated by Aristotle and Ptolemy (Almagest). Empirically disproven by Tycho Brahe (observing the 1577 comet traversing posited solid spheres without collision), Johannes Kepler (elliptical planetary orbits), and Isaac Newton (gravitation).',
      ur: 'ارسطو اور بطلیموس کا تاریخی ماڈل، جسے ٹائیکو براہے کے دم دار ستارے کے مشاہدے (1577)، کیپلر کے بیضوی مداروں اور نیوٹن کے قانون کشش ثقل نے مکمل طور پر غلط ثابت کر دیا۔'
    },
    primarySourceIds: [],
    secondarySourceIds: ['src-berossus-babyloniaca'],
    supportingEvidence: [],
    contradictingEvidence: [
      {
        en: 'Tycho Brahe observed the Great Comet of 1577 showed parallax placing it far beyond the moon, passing freely through the posited solid crystalline planetary orbs.',
        ur: 'ٹائیکو براہے نے 1577 کے دم دار ستارے کو چاند کے پار بغیر کسی کرسٹل چھت سے ٹکرائے گزرتے ہوئے دیکھا۔'
      },
      {
        en: 'Kepler’s First Law establishes non-circular elliptical orbits with variable velocities, physically incompatible with rigid concentric spheres.',
        ur: 'کیپلر کے قوانین نے ثابت کیا کہ سیارے بیضوی راستوں پر چلتے ہیں، جن کا ٹھوس کروں کے ساتھ کوئی تعلق نہیں۔'
      }
    ],
    editorialNotes: {
      en: 'Status: Incorrect. This historical hypothesis is preserved for its significance in the history of science, but marked strictly as Incorrect according to physical empirical reality.',
      ur: 'حیثیت: غلط / مسترد شدہ۔ یہ نظریہ سائنس کی تاریخ کے حصے کے طور پر محفوظ ہے مگر سائنسی حقیقت کے اعتبار سے غلط ہے۔'
    },
    archiveDissection: {
      sourceSays: {
        en: 'Lecture discusses historical civilizational models and explains where ancient cosmological systems failed.',
        ur: 'لیکچر میں قدیم تہذیبی ماڈلز اور ان کی سائنسی خامیوں کا تفصیلی جائزہ لیا گیا ہے۔'
      },
      primaryEvidenceIndicates: {
        en: 'Extant historical manuscripts of Aristotle’s De Caelo and Ptolemy’s Planetary Hypotheses.',
        ur: 'ارسطو کی کتاب ڈی سیلو اور بطلیموس کے قلمی نسخے۔'
      },
      modernScholarshipConcludes: {
        en: 'The crystalline sphere hypothesis was a mathematical-philosophical construct dismantled by early modern observational astronomy.',
        ur: 'کرسٹل کروں کا نظریہ ایک فرضی فلسفیانہ ماڈل تھا جسے جدید فلکیات نے مسترد کر دیا۔'
      },
      editorialAssessment: {
        en: 'Incorrect historical model. Serves as pedagogical exemplar in the archive for debunked paradigms.',
        ur: 'تاریخی طور پر مسترد شدہ ماڈل جو سائنسی ارتقاء کو سمجھنے میں مدد دیتا ہے۔'
      }
    },
    associatedPersonIds: ['prs-berossus'],
    associatedPlaceIds: [],
    associatedConceptIds: ['cnc-epistemic-demarcation'],
    chapterIds: ['ch-01-universe-seven-skies'],
    relatedClaimIds: ['clm-ch01-ancient-skies-seven']
  }
];
