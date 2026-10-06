import { Event } from '../types/entities';

export const eventsData: Event[] = [
  // =========================================================================
  // 1. Paleolithic Symbolic Dawn
  // =========================================================================
  {
    id: 'evt-chauvet-frieze-creation',
    slug: 'chauvet-cave-paintings-creation-aurignacian',
    title: {
      en: 'Creation of Aurignacian Parietal Art & Pigment Systems at Chauvet',
      ur: 'شووہ غار میں اورینیشین دور کے نقوش اور گیرو سے تصویر کشی'
    },
    summary: {
      en: 'Upper Paleolithic hunter-foragers penetrate deep into the dark zone of the Chauvet-Pont-d’Arc limestone cave to execute hundreds of charcoal and red ochre drawings, establishing humanity’s earliest preserved externalized symbolic graphic system.',
      ur: 'شکاری قبائل نے تاریک غار کی گہرائی میں کوئلے اور گیرو سے سینکڑوں جانوروں کی تصویریں بنائیں، جس سے انسانی تاریخ میں خارجی علامتی ریکارڈ کا پہلا مستند ثبوت سامنے آیا۔'
    },
    description: {
      en: 'Upper Paleolithic human hunter-foragers penetrate deep into the dark zone of the Chauvet-Pont-d’Arc limestone cave to execute hundreds of charcoal and red ochre drawings, establishing humanity’s earliest preserved externalized symbolic graphic system.',
      ur: 'شکاری قبائل نے تاریک غار کی گہرائی میں کوئلے اور گیرو سے سینکڑوں جانوروں کی تصویریں بنائیں، جس سے انسانی تاریخ میں خارجی علامتی ریکارڈ کا پہلا مستند ثبوت سامنے آیا۔'
    },
    categories: ['culture', 'archaeology', 'environment'],
    historicalDate: {
      dateType: 'range',
      earliestYear: -37000,
      latestYear: -35000,
      precision: 'millennium',
      calendarSystem: 'astronomical',
      era: 'BP',
      displayLabel: {
        en: 'c. 36,000 – 37,000 cal BP (c. 35,000 BCE)',
        ur: 'تقریباً 36,000 تا 37,000 سال قبل (35,000 قبل مسیح)'
      },
      isApproximate: true,
      isDisputed: false,
      dateBasis: 'radiocarbon_calibrated',
      datingMethodDescription: {
        en: 'Over 80 accelerator mass spectrometry (AMS) 14C dates on charcoal pigment directly from the wall drawings, cross-validated by torch marks and cave floor charcoal.',
        ur: 'غار کی دیواروں پر کوئلے کے نمونوں پر 80 سے زائد ریڈیو کاربن 14C ایکسیلریٹر ٹیسٹ۔'
      },
      supportingSourceIds: ['src-qureshi-archive'],
      editorialNotes: {
        en: 'Firmly establishes that human symbolic external memory precedes agricultural sedentism by over 25,000 years.',
        ur: 'اس سے یہ ثابت ہوتا ہے کہ علامتی اور فنی اظہار زراعت سے پچیس ہزار سال پہلے شروع ہو چکا تھا۔'
      }
    },
    approximateDate: 'c. 36,000–37,000 cal BP',
    rawYearBPOrBCE: -36000,
    yearDisplay: { en: 'c. 36,000 – 40,000 BP', ur: 'تقریباً 36,000 تا 40,000 سال قبل' },
    chronologicalValue: -36000,
    epoch: 'paleolithic',
    placeId: 'plc-chauvet',
    associatedPlaceIds: ['plc-chauvet'],
    civilizationId: 'civ-upper-paleolithic',
    associatedCivilizationIds: ['civ-upper-paleolithic'],
    relatedPersonIds: [],
    claimIds: ['clm-01-verified-aurignacian-art'],
    primarySourceIds: ['ps-chauvet-panel'],
    chapterId: 'ch-01-symbolic-consciousness',
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 2. Megalithic Architecture & Early Holocene (Göbekli Tepe)
  // =========================================================================
  {
    id: 'evt-gobekli-enclosure-d-erection',
    slug: 'gobekli-tepe-enclosure-d-construction',
    title: {
      en: 'Erection of Megalithic Enclosure D & Pillar 43 at Göbekli Tepe',
      ur: 'گوئبکلی تپہ میں عظیم پتھریلے انکلوژر ڈی اور ستون 43 کی تنصیب'
    },
    summary: {
      en: 'Pre-Pottery Neolithic hunter-gatherers quarry, transport, and carve monolithic T-shaped limestone pillars weighing up to 10 tons, carving low and high relief predators, serpents, and celestial motifs.',
      ur: 'قبل از ظروف دور کے انسانوں نے دس ٹن وزنی پتھر کے ستون تراشے اور ان پر جانوروں کے ابھرے ہوئے علامتی نقوش اور آسمانی علامتیں کندہ کیں۔'
    },
    description: {
      en: 'Pre-Pottery Neolithic communities quarry, transport, and carve monolithic T-shaped limestone pillars weighing up to 10 tons each, adorning them with high-relief predatory and astral symbols.',
      ur: 'قبل از ظروف دور کے انسانوں نے دس ٹن وزنی پتھر کے ستون تراشے اور ان پر جانوروں کے ابھرے ہوئے علامتی نقوش کندہ کیے۔'
    },
    categories: ['archaeology', 'culture', 'environment', 'source_collection'],
    historicalDate: {
      dateType: 'disputed',
      earliestYear: -9600,
      latestYear: -8800,
      precision: 'century',
      calendarSystem: 'astronomical',
      era: 'BCE',
      displayLabel: {
        en: 'c. 9,600 – 8,800 BCE (Disputed: c. 10,950 BCE)',
        ur: 'تقریباً 9,600 تا 8,800 قبل مسیح (متبادل: 10,950 قبل مسیح)'
      },
      isApproximate: true,
      isDisputed: true,
      dateBasis: 'radiocarbon_calibrated',
      datingMethodDescription: {
        en: 'Stratigraphic 14C calibration on wall mortar and organic collagen by German Archaeological Institute (DAI). Competing hypothesis uses astronomical precession retrocalculation.',
        ur: 'جرمن آرکیالوجیکل انسٹیٹیوٹ کی جانب سے دیواروں کے گارے پر کاربن 14 ٹیسٹ؛ جبکہ متبادل نظریہ ستاروں کی گردش پر مبنی ہے۔'
      },
      alternativeDates: [
        {
          id: 'prop-gobekli-dai-consensus',
          proposalName: {
            en: 'Mainstream DAI Archaeological Stratigraphy (Schmidt / Clare)',
            ur: 'جرمن ادارے کا آثاریاتی اتفاق رائے (کلاؤس شمٹ / لی کلیئر)'
          },
          earliestYear: -9600,
          latestYear: -8800,
          displayLabel: { en: 'c. 9,600 – 8,800 BCE', ur: 'تقریباً 9,600 تا 8,800 قبل مسیح' },
          proponentOrSource: {
            en: 'German Archaeological Institute (DAI) Excavation Reports',
            ur: 'جرمن آرکیالوجیکل انسٹیٹیوٹ کی توسیعی کھدائی رپورٹ'
          },
          basis: {
            en: 'Radiocarbon dating of wall plaster, backfill strata, and faunal skeletal remains from Enclosure D.',
            ur: 'دیوار کے پلستر اور جانوروں کی ہڈیوں کی کاربن ڈیٹنگ۔'
          },
          confidence: 'high'
        },
        {
          id: 'prop-gobekli-sweatman-impact',
          proposalName: {
            en: 'Archaeoastronomy & Younger Dryas Comet Impact Hypothesis',
            ur: 'فلکی آثار قدیمہ اور شہاب ثاقب ٹکراؤ کا نظریہ (سویٹ مین)'
          },
          earliestYear: -10950,
          latestYear: -10950,
          displayLabel: { en: 'c. 10,950 BCE', ur: 'تقریباً 10,950 قبل مسیح' },
          proponentOrSource: {
            en: 'Martin Sweatman & Dimitrios Tsikritsis (2017)',
            ur: 'مارٹن سویٹ مین اور دیمتریوس تسیکریتسس (2017)'
          },
          basis: {
            en: 'Astronomical computer retro-calculation matching Pillar 43 animal constellations to the 10,950 BCE night sky and the Younger Dryas boundary.',
            ur: 'ستون 43 پر جانوروں کی پوزیشن کا کمپیوٹر سے فلکیاتی حساب جو 10,950 قبل مسیح کے آسمان سے ملتا ہے۔'
          },
          confidence: 'contested'
        }
      ],
      supportingSourceIds: ['src-qureshi-archive']
    },
    approximateDate: 'c. 9500 BCE',
    rawYearBPOrBCE: -9500,
    yearDisplay: { en: 'c. 9,600 – 8,800 BCE', ur: 'تقریباً 9,600 تا 8,800 قبل مسیح' },
    chronologicalValue: -9500,
    epoch: 'neolithic',
    placeId: 'plc-gobekli-tepe',
    associatedPlaceIds: ['plc-gobekli-tepe'],
    civilizationId: 'civ-pre-pottery-neolithic',
    associatedCivilizationIds: ['civ-pre-pottery-neolithic'],
    relatedPersonIds: ['prs-klaus-schmidt'],
    claimIds: ['clm-02-disputed-gobekli-pure-cult', 'clm-06-interpretation-pillar-43-archaeoastronomy'],
    primarySourceIds: ['ps-gobekli-pillar-43'],
    chapterId: 'ch-02-neolithic-dawn',
    epistemicStatus: 'verified',
    chronologicalConfidence: 'scholarly_majority',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 3. Urban Revolution & Proto-Cuneiform Writing (Uruk IV)
  // =========================================================================
  {
    id: 'evt-proto-cuneiform-standardization',
    slug: 'proto-cuneiform-standardization-uruk-iv',
    title: {
      en: 'Invention and Institutional Standardization of Proto-Cuneiform at Uruk',
      ur: 'ارک میں پروٹو میخی رسم الخط کی ایجاد اور باقاعدہ تنظیم'
    },
    summary: {
      en: 'Administrative scribes of the Eanna precinct in Uruk develop a standardized system of 900+ pictographic signs impressed into clay tablets, creating humanity’s first true writing technology.',
      ur: 'ارک کے معبد کے منشیوں نے مٹی کی تختیوں پر 900 سے زائد علامات اور ہندسوں کا باقاعدہ نظام وضع کیا، جس سے دنیا کی پہلی تحریری ٹیکنالوجی وجود میں آئی۔'
    },
    description: {
      en: 'The administrative scribes of the Eanna precinct in Uruk develop a standardized system of 900+ pictographic and numerical signs impressed into clay tablets, creating the world’s first true writing technology to track surplus state agricultural yields.',
      ur: 'ارک کے معبد کے منشیوں نے مٹی کی تختیوں پر 900 سے زائد علامات اور ہندسوں کا باقاعدہ نظام وضع کیا، جس سے دنیا کی پہلی تحریری ٹیکنالوجی وجود میں آئی۔'
    },
    categories: ['writing', 'technology', 'civilizations'],
    historicalDate: {
      dateType: 'range',
      earliestYear: -3400,
      latestYear: -3200,
      precision: 'century',
      calendarSystem: 'astronomical',
      era: 'BCE',
      displayLabel: {
        en: 'c. 3,400 – 3,200 BCE (Uruk IVa Stratum)',
        ur: 'تقریباً 3,400 تا 3,200 قبل مسیح (ارک IVa طبقہ)'
      },
      isApproximate: true,
      isDisputed: false,
      dateBasis: 'stratigraphic',
      datingMethodDescription: {
        en: 'Stratigraphic excavation of Eanna archaeological levels IVa and IVb, cross-dated by cylinder seal impressions and ceramic seriation.',
        ur: 'ارک کے ایانا مندر کی چوتھی پرت کی کھدائی اور مہروں کے نقوش کا باہمی موازنہ۔'
      },
      supportingSourceIds: ['src-qureshi-archive']
    },
    approximateDate: 'c. 3300 BCE',
    rawYearBPOrBCE: -3300,
    yearDisplay: { en: 'c. 3,400 – 3,200 BCE', ur: 'تقریباً 3,400 تا 3,200 قبل مسیح' },
    chronologicalValue: -3300,
    epoch: 'bronze_age',
    placeId: 'plc-uruk',
    associatedPlaceIds: ['plc-uruk'],
    civilizationId: 'civ-sumerian-early-dynastic',
    associatedCivilizationIds: ['civ-sumerian-early-dynastic'],
    relatedPersonIds: [],
    claimIds: ['clm-05-modern-scholarship-proto-cuneiform-origins'],
    primarySourceIds: ['ps-uruk-iv-tablet'],
    chapterId: 'ch-03-cuneiform-revolution',
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 4. Indus Valley Civilization: Mature Harappan Urban Planning
  // =========================================================================
  {
    id: 'evt-mohenjo-daro-urban-apex',
    slug: 'mohenjo-daro-mature-harappan-urban-apex',
    title: {
      en: 'Consolidation of Mature Harappan Grid Urbanism & Standards at Mohenjo-Daro',
      ur: 'موئن جو دڑو میں پختہ شہری منصوبہ بندی اور یکساں اوزان کا عروج'
    },
    summary: {
      en: 'The Indus civilization constructs orthogonal grid-planned baked-brick cities featuring advanced hydraulic drainage, civic bath architectures, and standard steatite seal iconography without monumental dynastic palaces.',
      ur: 'وادی سندھ کی تہذیب نے پختہ اینٹوں سے منظم شہری نظام، زیر زمین نکاسی آب اور نفیس مہریں تیار کیں جہاں بادشاہی محلات کی بجائے اجتماعی شہری سہولیات کو فوقیت حاصل تھی۔'
    },
    description: {
      en: 'The Indus civilization constructs orthogonal grid-planned baked-brick cities featuring advanced hydraulic drainage, civic bath architectures, and standard steatite seal iconography without monumental dynastic palaces.',
      ur: 'وادی سندھ کی تہذیب نے پختہ اینٹوں سے منظم شہری نظام، زیر زمین نکاسی آب اور نفیس مہریں تیار کیں جہاں بادشاہی محلات کی بجائے اجتماعی شہری سہولیات کو فوقیت حاصل تھی۔'
    },
    categories: ['civilizations', 'archaeology', 'technology'],
    historicalDate: {
      dateType: 'range',
      earliestYear: -2600,
      latestYear: -1900,
      precision: 'century',
      calendarSystem: 'astronomical',
      era: 'BCE',
      displayLabel: {
        en: 'c. 2,600 – 1,900 BCE (Mature Harappan Phase)',
        ur: 'تقریباً 2,600 تا 1,900 قبل مسیح (پختہ ہڑپائی دور)'
      },
      isApproximate: true,
      isDisputed: false,
      dateBasis: 'radiocarbon_calibrated',
      datingMethodDescription: {
        en: 'Calibrated radiocarbon dates from HR and DK areas, Harappa trench sequences, and Mesopotamian trade synchronisms (Meluhha trade in Akkadian tablets).',
        ur: 'موئن جو دڑو اور ہڑپہ کی کھدائیوں کی کاربن ڈیٹنگ اور اکادی تختیوں میں ملوخا کے ساتھ تجارتی تعلقات کا ریکارڈ۔'
      }
    },
    approximateDate: 'c. 2500–2100 BCE',
    rawYearBPOrBCE: -2500,
    yearDisplay: { en: 'c. 2,600 – 1,900 BCE', ur: 'تقریباً 2,600 تا 1,900 قبل مسیح' },
    chronologicalValue: -2500,
    epoch: 'bronze_age',
    placeId: 'plc-mohenjo-daro',
    associatedPlaceIds: ['plc-mohenjo-daro'],
    civilizationId: 'civ-indus-valley',
    associatedCivilizationIds: ['civ-indus-valley'],
    relatedPersonIds: ['prs-alexander-cunningham'],
    claimIds: ['clm-03-uncertain-indus-script-decipherment'],
    primarySourceIds: [],
    chapterId: 'ch-04-cosmological-models',
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 5. Enheduanna: Earliest Named Author in Human History
  // =========================================================================
  {
    id: 'evt-enheduanna-hymns-composition',
    slug: 'enheduanna-composes-temple-hymns-ur',
    title: {
      en: 'Enheduanna Composes the Temple Hymns & Exaltation of Inanna at Ur',
      ur: 'انہیدوانا کی جانب سے مندر کے ترانوں اور عظمتِ اینانا کی تصنیف'
    },
    summary: {
      en: 'Enheduanna, daughter of Sargon of Akkad and High Priestess of Nanna at Ur, composes unified liturgical poetry synthesizing Semitic Akkadian and Sumerian sacred traditions.',
      ur: 'اور کے معبد کی اعلیٰ کاہنہ انہیدوانا نے سامی اور سومری مذہبی روایات کو ملا کر تاریخ کی پہلی دستخط شدہ ادبی و مذہبی نظمیں تصنیف کیں۔'
    },
    description: {
      en: 'Enheduanna, daughter of Sargon of Akkad and High Priestess of Nanna at Ur, produces a unified liturgical corpus binding northern Akkadian Semitic and southern Sumerian sacred traditions into the earliest individually authored literature.',
      ur: 'اور کے معبد کی اعلیٰ کاہنہ انہیدوانا نے سامی اور سومری مذہبی روایات کو ملا کر تاریخ کی پہلی دستخط شدہ ادبی و مذہبی نظمیں تصنیف کیں۔'
    },
    categories: ['people', 'texts', 'writing', 'religious'],
    historicalDate: {
      dateType: 'range',
      earliestYear: -2300,
      latestYear: -2250,
      precision: 'decade',
      calendarSystem: 'astronomical',
      era: 'BCE',
      displayLabel: {
        en: 'c. 2,300 – 2,250 BCE (Reign of Sargon & Rimush of Akkad)',
        ur: 'تقریباً 2,300 تا 2,250 قبل مسیح (عہد سارگون و ریموش)'
      },
      isApproximate: true,
      isDisputed: false,
      dateBasis: 'epigraphic_text',
      datingMethodDescription: {
        en: 'Direct epigraphic attestation on the Alabaster Disk of Enheduanna found in the Giparu at Ur, tied to Middle Chronology Akkadian regnal synchronisms.',
        ur: 'اور کے گپارو معبد سے برآمد ہونے والی سنگ مرمر کی قرص پر درج کتبہ۔'
      }
    },
    approximateDate: 'c. 2300 BCE',
    rawYearBPOrBCE: -2300,
    yearDisplay: { en: 'c. 2,300 BCE', ur: 'تقریباً 2,300 قبل مسیح' },
    chronologicalValue: -2300,
    epoch: 'bronze_age',
    placeId: 'plc-uruk',
    associatedPlaceIds: ['plc-uruk'],
    civilizationId: 'civ-sumerian-early-dynastic',
    associatedCivilizationIds: ['civ-sumerian-early-dynastic'],
    relatedPersonIds: ['prs-enheduanna'],
    claimIds: ['clm-05-modern-scholarship-proto-cuneiform-origins'],
    primarySourceIds: ['ps-uruk-iv-tablet'],
    chapterId: 'ch-03-cuneiform-revolution',
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 6. Ancient Cosmologies: Babylonian Creation Epic (Enûma Eliš) [Chapter 01]
  // =========================================================================
  {
    id: 'evt-enuma-elish-composition',
    slug: 'composition-of-babylonian-enuma-elish',
    title: {
      en: 'Composition of the Babylonian Creation Epic (Enûma Eliš)',
      ur: 'بابل کی کائناتی داستانِ تخلیق "انوما الیش" کی تصنیف'
    },
    summary: {
      en: 'Babylonian priests compose the Seven Tablets of Creation celebrating Marduk’s cosmic victory over primordial Tiamat, dividing her corpse into celestial vaults and subterranean waters.',
      ur: 'بابل کے کاہنوں نے تخلیق کے سات ابواب پر مشتمل انوما الیش لکھی جس میں دیوتا مردوک کے تیامات کو شکست دے کر کائنات کو دو حصوں میں تقسیم کرنے کا نقشہ کھینچا گیا۔'
    },
    description: {
      en: 'In ancient Mesopotamia, scribes codify the standard theological cosmology of Babylon across seven clay tablets. Marduk splits the cosmic dragon Tiamat into two halves: one half stretched out as the canopy of heaven with guards to hold back the waters, and the other as the foundations of the deep. This model represents the foundational Near Eastern archetypal cosmogony discussed in Chapter 01.',
      ur: 'میسوپوٹیمیا میں سات تختیوں پر بابل کا روایتی کائناتی ماڈل قلمبند کیا گیا۔ اس داستان کے مطابق آسمان پانیوں کو روکنے والی ایک چھت ہے، جسے باب 01 میں قدیم تہذیبوں کے کونیاتی ماڈل کے تناظر میں زیر بحث لایا گیا ہے۔'
    },
    categories: ['texts', 'religious', 'culture', 'source_collection'],
    historicalDate: {
      dateType: 'disputed',
      earliestYear: -1750,
      latestYear: -1100,
      precision: 'century',
      calendarSystem: 'astronomical',
      era: 'BCE',
      displayLabel: {
        en: 'c. 1,750 – 1,100 BCE (Scholarly Debate: Old vs Middle Babylonian)',
        ur: 'تقریباً 1,750 تا 1,100 قبل مسیح (علمی اختلاف: قدیم بمقابلہ وسطی بابل)'
      },
      isApproximate: true,
      isDisputed: true,
      dateBasis: 'epigraphic_text',
      datingMethodDescription: {
        en: 'Linguistic, theological, and paleographic debate among Assyriologists. W.G. Lambert established the Middle Babylonian reign of Nebuchadnezzar I (c. 1125 BCE) as peak composition, while earlier scholars proposed Hammurabi’s era (c. 1750 BCE).',
        ur: 'ماہرینِ آثار قدیمہ کے درمیان لسانی و کتباتی بحث؛ ڈبلیو جی لیمبرٹ کے مطابق اس کی تدوین نبوکدنضر اول (1125 قبل مسیح) کے عہد میں ہوئی۔'
      },
      alternativeDates: [
        {
          id: 'prop-enuma-middle-babylonian',
          proposalName: {
            en: 'Middle Babylonian / Nebuchadnezzar I Consensus (W.G. Lambert)',
            ur: 'وسطی بابلی دور / نبوکدنضر اول کا متفقہ نظریہ (ڈبلیو جی لیمبرٹ)'
          },
          earliestYear: -1150,
          latestYear: -1100,
          displayLabel: { en: 'c. 1,150 – 1,100 BCE', ur: 'تقریباً 1,150 تا 1,100 قبل مسیح' },
          proponentOrSource: {
            en: 'W.G. Lambert (Babylonian Creation Myths, 2013)',
            ur: 'ڈبلیو جی لیمبرٹ (بابلی اساطیر تخلیق)'
          },
          basis: {
            en: 'Theological elevation of Marduk to supreme king of the gods reflects Babylon’s recovery of Marduk’s statue from Elam in the late 12th century BCE.',
            ur: 'بارہویں صدی قبل مسیح میں ایلام سے مردوک کے بت کی بازیابی اور مردوک کی دیوتاؤں پر برتری کا تاریخی پس منظر۔'
          },
          confidence: 'high'
        },
        {
          id: 'prop-enuma-old-babylonian',
          proposalName: {
            en: 'Old Babylonian Genesis (Hammurabi Era Proposal)',
            ur: 'قدیم بابلی دور (عہد حمورابی کا روایتی نظریہ)'
          },
          earliestYear: -1792,
          latestYear: -1750,
          displayLabel: { en: 'c. 1,792 – 1,750 BCE', ur: 'تقریباً 1,792 تا 1,750 قبل مسیح' },
          proponentOrSource: {
            en: 'Early 20th Century Assyriology (King, Heidel)',
            ur: 'بیسویں صدی کے ابتدائی محققین (کنگ، ہائیڈل)'
          },
          basis: {
            en: 'Supposition that Babylon’s political ascendancy under Hammurabi necessitated an immediate mythological legitimization.',
            ur: 'یہ قیاس کہ حمورابی کے دور میں بابل کے عروج نے فوری طور پر اس داستان کو جنم دیا۔'
          },
          confidence: 'contested'
        }
      ],
      supportingSourceIds: ['src-berossus-babyloniaca', 'src-qureshi-archive']
    },
    approximateDate: 'c. 1750–1100 BCE',
    rawYearBPOrBCE: -1200,
    yearDisplay: { en: 'c. 1,750 – 1,100 BCE', ur: 'تقریباً 1,750 تا 1,100 قبل مسیح' },
    chronologicalValue: -1200,
    epoch: 'bronze_age',
    placeId: 'plc-uruk',
    associatedPlaceIds: ['plc-uruk'],
    civilizationId: 'civ-sumer-mesopotamia',
    associatedCivilizationIds: ['civ-sumer-mesopotamia'],
    relatedPersonIds: [],
    claimIds: ['clm-ch01-ancient-skies-seven', 'clm-ch01-primary-source-enuma-elish'],
    primarySourceIds: ['ps-enuma-elish-tablets'],
    chapterId: 'ch-01-universe-seven-skies',
    associatedChapterIds: ['ch-01-universe-seven-skies'],
    epistemicStatus: 'verified',
    chronologicalConfidence: 'scholarly_majority',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 7. Neo-Assyrian Cosmology: Tablet KAR 307 (Three Stone Heavens) [Chapter 01]
  // =========================================================================
  {
    id: 'evt-neo-assyrian-kar307-heavens',
    slug: 'neo-assyrian-recording-kar-307-stone-heavens',
    title: {
      en: 'Scribes Inscribe Tablet KAR 307 (The Three-Tiered Stone Heavens at Assur)',
      ur: 'آشور میں تختی KAR 307 کی کتابت: قیمتی پتھروں کے تین آسمان'
    },
    summary: {
      en: 'Neo-Assyrian temple scholars in Assur record the mystical cuneiform cosmological treatise KAR 307, explicitly describing three superimposed crystalline stone heavens (jasper, saggilmud, luludanitu).',
      ur: 'شہر آشور کے منشیوں نے کونیاتی تختی KAR 307 تحریر کی جس میں کائنات کے تین آسمانوں کو یاشب اور دیگر قیمتی پتھروں سے بنا ہوا بیان کیا گیا ہے۔'
    },
    description: {
      en: 'Excavated from the temple library at Assur, cuneiform tablet KAR 307 provides direct epigraphic proof of ancient Mesopotamian multi-layered physical celestial structures. The upper heaven is of luludānītu-stone belonging to Anu; the middle heaven is of saggilmud-stone belonging to the Igigi; the lower heaven is of jasper upon which the constellations are drawn. This tablet is analyzed directly in Chapter 01 Section 03.',
      ur: 'آشور سے ملنے والی یہ تختی مشرق قریب کے کثیر تہوں والے آسمانوں کا ٹھوس دستاویزی ثبوت ہے۔ اس میں نچلا آسمان یاشب کا، درمیانی سگلمود کا اور بالائی آسمان لولدانیتو پتھر کا بتایا گیا ہے۔ باب 01 میں اس کی تفصیل دی گئی ہے۔'
    },
    categories: ['texts', 'archaeology', 'writing', 'source_collection'],
    historicalDate: {
      dateType: 'range',
      earliestYear: -850,
      latestYear: -650,
      precision: 'century',
      calendarSystem: 'astronomical',
      era: 'BCE',
      displayLabel: {
        en: 'c. 850 – 650 BCE (Neo-Assyrian Empire at Assur)',
        ur: 'تقریباً 850 تا 650 قبل مسیح (نو آشوری عہد)'
      },
      isApproximate: true,
      isDisputed: false,
      dateBasis: 'stratigraphic',
      datingMethodDescription: {
        en: 'Paleography and archaeological stratigraphy of the temple quarter at Assur excavated by Walter Andrae for the Deutsche Orient-Gesellschaft.',
        ur: 'جرمن ماہرین کی جانب سے آشور کے مندر کے کتبہ خانے کی کھدائی اور رسم الخط کی جانچ۔'
      },
      supportingSourceIds: ['src-berossus-babyloniaca', 'src-qureshi-archive']
    },
    approximateDate: 'c. 8th–7th century BCE',
    rawYearBPOrBCE: -750,
    yearDisplay: { en: 'c. 850 – 650 BCE', ur: 'تقریباً 850 تا 650 قبل مسیح' },
    chronologicalValue: -750,
    epoch: 'iron_age',
    placeId: 'plc-uruk',
    associatedPlaceIds: ['plc-uruk'],
    civilizationId: 'civ-sumer-mesopotamia',
    associatedCivilizationIds: ['civ-sumer-mesopotamia'],
    relatedPersonIds: [],
    claimIds: ['clm-ch01-ancient-skies-seven'],
    primarySourceIds: ['ps-kar307-tablet'],
    chapterId: 'ch-01-universe-seven-skies',
    associatedChapterIds: ['ch-01-universe-seven-skies'],
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 8. Classical Antiquity: Aristotle's De Caelo (Concentric Crystal Spheres) [Chapter 01]
  // =========================================================================
  {
    id: 'evt-aristotle-de-caelo',
    slug: 'aristotle-composes-de-caelo-crystalline-spheres',
    title: {
      en: 'Aristotle Systematizes the Concentric Crystalline Celestial Spheres (De Caelo)',
      ur: 'ارسطو کی کتاب "فی السماء" (De Caelo): بلوری آسمانی کروں کا نظام'
    },
    summary: {
      en: 'In Athens, Aristotle formulates geocentric celestial mechanics, proposing 55 nested concentric crystalline spheres composed of unchangeable aether that carry the planets and stars.',
      ur: 'ارسطو نے زمین کو مرکز مان کر 55 بلوری آسمانوں کا فلسفیانہ و ریاضیاتی ماڈل پیش کیا جو نچلے عناصر سے پاک لطیف مادے (ایتھر) پر مشتمل تھے۔'
    },
    description: {
      en: 'In De Caelo (On the Heavens), Aristotle establishes the dominant Western and Near Eastern cosmological paradigm for two millennia. Rejecting the mythological chaotic waters of Mesopotamia, he argues that the heavens are spherical, eternal, moving in continuous uniform circular motion, divided into sublunary (earth, water, air, fire) and superlunary (aether) realms. Chapter 01 contrasts this with scientific atmospheric reality.',
      ur: 'ارسطو کا یہ ماڈل دو ہزار سال تک یونانی، رومی اور اسلامی دنیا میں مانا جاتا رہا۔ اس میں آسمانوں کو مادی مگر لطیف کروں کے طور پر پیش کیا گیا تھا۔ باب 01 میں اس ماڈل اور جدید سائنسی حقائق کا تقابلی جائزہ لیا گیا ہے۔'
    },
    categories: ['science', 'texts', 'source_collection'],
    historicalDate: {
      dateType: 'approximate',
      earliestYear: -350,
      latestYear: -340,
      precision: 'decade',
      calendarSystem: 'astronomical',
      era: 'BCE',
      displayLabel: {
        en: 'c. 350 BCE (Classical Athens / Lyceum)',
        ur: 'تقریباً 350 قبل مسیح (کلاسیکی ایتھنز)'
      },
      isApproximate: true,
      isDisputed: false,
      dateBasis: 'scholarly_estimate',
      datingMethodDescription: {
        en: 'Chronology of Aristotle’s second Athenian period and the Lyceum curriculum established via Diogenes Laërtius and internal philosophical cross-references.',
        ur: 'ارسطو کی ایتھنز میں رہائش اور فلسفیانہ تصانیف کی اندرونی شہادتوں کی بنیاد پر طے شدہ تاریخ۔'
      }
    },
    approximateDate: 'c. 350 BCE',
    rawYearBPOrBCE: -350,
    yearDisplay: { en: 'c. 350 BCE', ur: 'تقریباً 350 قبل مسیح' },
    chronologicalValue: -350,
    epoch: 'classical',
    placeId: 'plc-uruk',
    civilizationId: 'civ-sumer-mesopotamia',
    relatedPersonIds: [],
    claimIds: ['clm-ch01-seven-skies-physical-nature'],
    primarySourceIds: [],
    chapterId: 'ch-01-universe-seven-skies',
    associatedChapterIds: ['ch-01-universe-seven-skies'],
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 9. Hellenistic Historiography: Berossus Compiles Babyloniaca
  // =========================================================================
  {
    id: 'evt-berossus-babyloniaca-composition',
    slug: 'berossus-compiles-babyloniaca-in-greek',
    title: {
      en: 'Berossus Compiles the Babyloniaca for Antiochus I Soter',
      ur: 'بیروسس نے بابل کی تاریخ "بیبلونیاکا" یونانی میں مدون کی'
    },
    summary: {
      en: 'Priest Berossus of Babylon translates millennia of cuneiform astronomical diaries, mythologies, and king lists into Greek for the Seleucid monarch Antiochus I.',
      ur: 'بابل کے کاہن بیروسس نے ہزاروں سال پرانے میخی ریکارڈز اور شاہی فہرستوں کا یونانی میں ترجمہ کیا تاکہ بابل کی قدیم حکمت و تاریخ کو دنیا میں متعارف کرایا جا سکے۔'
    },
    description: {
      en: 'Priest Berossus translates millennia of cuneiform astronomical diaries and mythological king lists into Greek, seeking to present Mesopotamian intellectual antiquity to the Hellenistic world.',
      ur: 'کاہن بیروسس نے ہزاروں سال پرانے میخی ریکارڈز اور شاہی فہرستوں کا یونانی میں ترجمہ کیا تاکہ بابل کی قدیم حکمت و تاریخ کو دنیا میں متعارف کرایا جا سکے۔'
    },
    categories: ['texts', 'civilizations', 'writing', 'source_collection'],
    historicalDate: {
      dateType: 'range',
      earliestYear: -281,
      latestYear: -278,
      precision: 'exact_year',
      calendarSystem: 'astronomical',
      era: 'BCE',
      displayLabel: {
        en: 'c. 281 – 278 BCE (Accession of Antiochus I Soter)',
        ur: 'تقریباً 281 تا 278 قبل مسیح (عہد انطیوکس اول)'
      },
      isApproximate: false,
      isDisputed: false,
      dateBasis: 'epigraphic_text',
      datingMethodDescription: {
        en: 'Dedication to Antiochus I Soter documented in Josephus and Eusebius, correlating precisely with Antiochus’s coregency and sole accession in 281 BCE.',
        ur: 'یونانی و رومی کتب اور سلوقی شاہی تاریخ سے تصدیق شدہ حتمی سال۔'
      },
      supportingSourceIds: ['src-berossus-babyloniaca']
    },
    approximateDate: 'c. 280 BCE',
    rawYearBPOrBCE: -280,
    yearDisplay: { en: 'c. 280 BCE', ur: 'تقریباً 280 قبل مسیح' },
    chronologicalValue: -280,
    epoch: 'classical',
    placeId: 'plc-uruk',
    associatedPlaceIds: ['plc-uruk'],
    civilizationId: 'civ-sumer-mesopotamia',
    associatedCivilizationIds: ['civ-sumer-mesopotamia'],
    relatedPersonIds: [],
    claimIds: ['clm-04-source-attested-berossus-chronology'],
    primarySourceIds: [],
    chapterId: 'ch-01-universe-seven-skies',
    associatedChapterIds: ['ch-01-universe-seven-skies', 'ch-03-cuneiform-revolution'],
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 10. Late Antiquity & Scripture: Quranic Revelation & Seven Skies [Chapter 01]
  // =========================================================================
  {
    id: 'evt-quranic-revelation-epoch',
    slug: 'quranic-revelation-and-seven-skies-formulation',
    title: {
      en: 'Quranic Revelation & The Doctrine of the Seven Skies (Sab’a Samāwāt)',
      ur: 'نزولِ قرآن اور سات آسمانوں (سبع سماوات) کا کائناتی بیان'
    },
    summary: {
      en: 'In western Arabia (Mecca and Medina), the Quran is revealed to Prophet Muhammad, presenting a strict monotheistic cosmology asserting the creation of seven layered heavens and cosmic order.',
      ur: 'حجاز (مکہ و مدینہ) میں قرآن کا نزول جس میں کائنات، آسمانوں اور زمین کی تخلیق کو خدائے واحد کی نشانیوں کے طور پر پیش کیا گیا۔'
    },
    description: {
      en: 'Between 610 and 632 CE, the text of the Quran articulates a distinct theological cosmology centering on the creation of the heavens and earth in six periods (Ayyam) and the establishment of seven skies (Sab’a Samāwāt). Chapter 01 investigates the original lecture’s theological claims and demarcates faith statements from empirical astrophysics.',
      ur: '610ء سے 632ء کے دوران نازل ہونے والی آیات میں کائنات کی تخلیق کے چھ ادوار (ایام) اور سات آسمانوں کا ذکر ملتا ہے۔ باب 01 میں ان قرآنی اصطلاحات کی لغوی تشریح اور جدید سائنس کے تناظر میں ان کی تفہیم پر تفصیلی بحث کی گئی ہے۔'
    },
    categories: ['religious', 'texts', 'source_collection'],
    historicalDate: {
      dateType: 'range',
      earliestYear: 610,
      latestYear: 632,
      precision: 'exact_year',
      calendarSystem: 'islamic_hijri',
      era: 'CE',
      displayLabel: {
        en: '610 – 632 CE (Late Antiquity Hijaz / 13 BH – 11 AH)',
        ur: '610ء تا 632ء (13 قبل ہجری تا 11 ہجری)'
      },
      isApproximate: false,
      isDisputed: false,
      dateBasis: 'traditional_record',
      datingMethodDescription: {
        en: 'Early Islamic historiographical consensus cross-referenced with early Quranic manuscripts (Birmingham, Tübingen, Sana’a palimpsest radiocarbon 14C testing to early 7th century CE).',
        ur: 'ابتدائی اسلامی تواریخ اور برمنگھم و توبنگن کے قدیم قرآنی اوراق کی کاربن 14 جانچ (ساتویں صدی کے اوائل)۔'
      },
      supportingSourceIds: ['src-qureshi-archive']
    },
    approximateDate: '610–632 CE',
    rawYearBPOrBCE: 610,
    yearDisplay: { en: '610 – 632 CE', ur: '610ء تا 632ء' },
    chronologicalValue: 610,
    epoch: 'late_antiquity',
    placeId: 'plc-uruk',
    civilizationId: 'civ-sumer-mesopotamia',
    relatedPersonIds: ['prs-furqan-qureshi'],
    claimIds: [
      'clm-ch01-seven-skies-physical-nature',
      'clm-ch01-scripture-all-answers'
    ],
    primarySourceIds: [],
    chapterId: 'ch-01-universe-seven-skies',
    associatedChapterIds: ['ch-01-universe-seven-skies'],
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 11. Modern Astrophysics: Hubble Discovers Cosmic Expansion (1929) [Chapter 01]
  // =========================================================================
  {
    id: 'evt-hubble-expansion-discovery',
    slug: 'edwin-hubble-discovers-universe-expansion-1929',
    title: {
      en: 'Edwin Hubble Discovers Extragalactic Redshift & Spacetime Expansion',
      ur: 'ایڈون ہبل کی جانب سے کائناتی پھیلاؤ اور کہکشاؤں کے سرکنے کی دریافت'
    },
    summary: {
      en: 'At Mount Wilson Observatory, astronomer Edwin Hubble establishes that distant galaxies are receding from the Milky Way with velocities proportional to their distances, discovering cosmic expansion.',
      ur: 'ماؤنٹ ولسن رصدگاہ میں ایڈون ہبل نے دور دراز کہکشاؤں کی روشنی کا تجزیہ کر کے ثابت کیا کہ کائنات ساکن نہیں بلکہ مسلسل پھیل رہی ہے۔'
    },
    description: {
      en: 'In 1929, Edwin Hubble published "A Relation between Distance and Radial Velocity among Extra-Galactic Nebulae" in PNAS. Using Cepheid variable stars measured on the 100-inch Hooker telescope, Hubble demonstrated a linear velocity-distance law (Hubble’s Law), providing observational confirmation for Alexander Friedmann and Georges Lemaître’s expanding spacetime solutions to Einstein’s General Relativity. Chapter 01 Section 02 explores this as foundational physical science.',
      ur: '1929ء میں ہبل نے تجرباتی بنیادوں پر ثابت کیا کہ کہکشائیں ایک دوسرے سے دور جا رہی ہیں۔ یہ دریافت آئن سٹائن کے نظریہ اضافت اور جارج لیماتر کے پھیلتی کائنات کے ماڈل کا پہلا ٹھوس ثبوت بنی۔ باب 01 کے سیکشن 2 میں اس سائنسی دریافت کو مفصل بیان کیا گیا ہے۔'
    },
    categories: ['science', 'people', 'source_collection'],
    historicalDate: {
      dateType: 'exact',
      earliestYear: 1929,
      latestYear: 1929,
      precision: 'exact_year',
      calendarSystem: 'gregorian_proleptic',
      era: 'CE',
      displayLabel: {
        en: '1929 CE (March 1929 Publication)',
        ur: '1929ء (مارچ 1929ء کی اشاعت)'
      },
      isApproximate: false,
      isDisputed: false,
      dateBasis: 'scholarly_estimate',
      datingMethodDescription: {
        en: 'Official primary journal publication: Proceedings of the National Academy of Sciences (PNAS), March 1929.',
        ur: 'سائنسی جریدے PNAS میں باقاعدہ اشاعت کی تاریخی دستاویز۔'
      },
      supportingSourceIds: ['src-qureshi-archive']
    },
    approximateDate: '1929 CE',
    rawYearBPOrBCE: 1929,
    yearDisplay: { en: '1929 CE', ur: '1929ء' },
    chronologicalValue: 1929,
    epoch: 'contemporary',
    placeId: 'plc-chauvet',
    civilizationId: 'civ-upper-paleolithic',
    relatedPersonIds: ['prs-furqan-qureshi'],
    claimIds: ['clm-ch01-cosmic-expansion'],
    primarySourceIds: [],
    chapterId: 'ch-01-universe-seven-skies',
    associatedChapterIds: ['ch-01-universe-seven-skies'],
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  },

  // =========================================================================
  // 12. Modern Astrophysics: Penzias & Wilson Detect CMB Radiation (1964) [Chapter 01]
  // =========================================================================
  {
    id: 'evt-cmb-discovery-penzias-wilson',
    slug: 'penzias-wilson-detect-cosmic-microwave-background',
    title: {
      en: 'Penzias & Wilson Detect Cosmic Microwave Background Radiation (CMB)',
      ur: 'پینزیاس اور ولسن کی جانب سے کائناتی پس منظر کی شعاعوں (سی ایم بی) کی دریافت'
    },
    summary: {
      en: 'Radio astronomers Arno Penzias and Robert Wilson discover the uniform 2.7 Kelvin cosmic microwave background radiation at Bell Laboratories, providing empirical evidence for the Big Bang.',
      ur: 'بیل لیبارٹریز کے سائنسدانوں نے حادثاتی طور پر کائنات میں ہر طرف پھیلی ہوئی 2.7 کیلون کی ریڈی ایشن دریافت کی جو بگ بینگ کا ناقابل تردید ثبوت بنی۔'
    },
    description: {
      en: 'Using the Crawford Hill Horn Antenna in Holmdel, New Jersey, Penzias and Wilson detected persistent isotropic microwave noise that could not be attributed to terrestrial interference or galaxy sources. Princeton physicists Robert Dicke and Jim Peebles confirmed this as the thermal relic radiation predicted from the hot primordial universe approximately 380,000 years after the Big Bang. Detailed in Chapter 01 Section 02 as modern empirical cosmology.',
      ur: 'یہ ریڈی ایشن دراصل کائنات کے آغاز کے بعد کے ابتدائی ایٹموں کے بننے کے وقت خارج ہونے والی روشنی تھی جو کائنات کے پھیلاؤ کے ساتھ مائیکرو ویو لہروں میں تبدیل ہو چکی تھی۔ باب 01 میں اسے کائنات کے آغاز کے سائنسی ثبوت کے طور پر پیش کیا گیا ہے۔'
    },
    categories: ['science', 'source_collection'],
    historicalDate: {
      dateType: 'exact',
      earliestYear: 1964,
      latestYear: 1965,
      precision: 'exact_year',
      calendarSystem: 'gregorian_proleptic',
      era: 'CE',
      displayLabel: {
        en: '1964 – 1965 CE (Detection May 1964, Published July 1965)',
        ur: '1964ء تا 1965ء (دریافت مئی 1964ء، اشاعت جولائی 1965ء)'
      },
      isApproximate: false,
      isDisputed: false,
      dateBasis: 'astronomical_ephemeris',
      datingMethodDescription: {
        en: 'Primary experimental radiometer physics measurement; published simultaneously in Astrophysical Journal in July 1965.',
        ur: 'ایسٹروفزیکل جرنل میں شائع شدہ تجرباتی سائنسی پیمائش۔'
      },
      supportingSourceIds: ['src-qureshi-archive']
    },
    approximateDate: '1964 CE',
    rawYearBPOrBCE: 1964,
    yearDisplay: { en: '1964 CE', ur: '1964ء' },
    chronologicalValue: 1964,
    epoch: 'contemporary',
    placeId: 'plc-chauvet',
    civilizationId: 'civ-upper-paleolithic',
    relatedPersonIds: ['prs-furqan-qureshi'],
    claimIds: ['clm-ch01-cosmic-expansion'],
    primarySourceIds: [],
    chapterId: 'ch-01-universe-seven-skies',
    associatedChapterIds: ['ch-01-universe-seven-skies'],
    epistemicStatus: 'verified',
    chronologicalConfidence: 'firmly_established',
    publicationStatus: 'published'
  }
];
