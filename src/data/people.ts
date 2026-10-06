import { Person } from '../types/entities';

export const peopleData: Person[] = [
  {
    id: 'prs-furqan-qureshi',
    slug: 'furqan-qureshi',
    name: {
      en: 'Furqan Qureshi',
      ur: 'فرقان قریشی'
    },
    eraOrLifespan: 'Contemporary Researcher & Author',
    role: {
      en: 'Principal Researcher, Historiographer & Creator of "40,000 Years of Knowledge"',
      ur: 'مرکزی محقق، مؤرخ اور "چالیس ہزار سالہ علم" سلسلے کے مصنف'
    },
    civilizationIds: [],
    biography: {
      en: 'Furqan Qureshi is an essayist and independent researcher whose work bridges archaeological discovery, comparative ancient history, and civilizational epistemology. His signature series "40,000 Years of Knowledge" investigates the deep-time continuum of human consciousness, textual preservation, and scientific paradigms, creating a bilingual intellectual resource for Urdu and English readers.',
      ur: 'فرقان قریشی ایک محقق اور مصنف ہیں جن کا کام آثار قدیمہ، تقابلی تاریخ اور تہذیبی نظریہ علم کے اشتراک پر مبنی ہے۔ ان کا معرکہ آرا تحقیقی سلسلہ "چالیس ہزار سالہ علم" انسانی شعور کے ارتقاء، متنی تحفظ اور سائنسی افکار کے سفر کا احاطہ کرتا ہے۔'
    },
    primaryTextIds: [],
    associatedEventIds: [],
    associatedClaimIds: ['clm-07-editorial-analysis-epistemic-transition']
  },
  {
    id: 'prs-klaus-schmidt',
    slug: 'klaus-schmidt-archaeologist',
    name: {
      en: 'Prof. Dr. Klaus Schmidt',
      ur: 'پروفیسر ڈاکٹر کلاؤس شمٹ'
    },
    eraOrLifespan: '1953 – 2014 CE',
    role: {
      en: 'Prehistoric Archaeologist & Lead Excavator of Göbekli Tepe',
      ur: 'قبل از تاریخ کے ماہرِ آثار قدیمہ اور گوئبکلی تپہ کے چیف محقق'
    },
    civilizationIds: ['civ-pre-pottery-neolithic'],
    biography: {
      en: 'German prehistoric archaeologist who directed excavations at Göbekli Tepe from 1995 until his death in 2014. Schmidt demonstrated that hunter-gatherers were capable of organizing massive communal labor to erect monumental megalithic architecture millennia before the emergence of pottery or urban settlements.',
      ur: 'جرمن ماہر آثار قدیمہ جنہوں نے 1995 سے 2014 تک گوئبکلی تپہ پر کھدائیوں کی قیادت کی اور ثابت کیا کہ انسان نے مٹی کے برتن یا شہر بسانے سے ہزاروں سال قبل اجتماعی تعاون کے ذریعے عظیم الشان یادگاریں تعمیر کی تھیں۔'
    },
    primaryTextIds: [],
    associatedEventIds: ['ev-gobekli-enclosure-d'],
    associatedClaimIds: ['clm-02-disputed-gobekli-pure-cult', 'clm-06-interpretation-pillar-43-archaeoastronomy']
  },
  {
    id: 'prs-enheduanna',
    slug: 'enheduanna-high-priestess',
    name: {
      en: 'Enheduanna of Ur',
      ur: 'ان ہیدوانا (کاہنہِ اول، ار)'
    },
    eraOrLifespan: 'c. 2285 – 2250 BCE',
    role: {
      en: 'High Priestess of the Moon God Nanna & Earliest Named Author in Recorded History',
      ur: 'چاند کے دیوتا نانا کی اعلیٰ کاہنہ اور انسانی تاریخ کی پہلی نامزد مصنفہ'
    },
    civilizationIds: ['civ-sumer-mesopotamia'],
    biography: {
      en: 'Daughter of Sargon of Akkad, appointed High Priestess of Ur. Her signed temple hymns (including The Exaltation of Inanna) constitute the earliest literary compositions in human history bearing an explicit personal authorial voice and signature.',
      ur: 'سارگون اعظم کی صاحبزادی اور ار کے معبد کی اعلیٰ کاہنہ۔ ان کی مذہبی نظمیں انسانی تاریخ کی پہلی ادبی تخلیقات ہیں جن پر مصنف کا نام باقاعدہ درج ہے۔'
    },
    primaryTextIds: [],
    associatedEventIds: [],
    associatedClaimIds: ['clm-05-modern-scholarship-proto-cuneiform-origins']
  },
  {
    id: 'prs-berossus',
    slug: 'berossus-chaldaean-priest',
    name: {
      en: 'Berossus (Bel-re’ušunu)',
      ur: 'بیروسس (کاہن و مؤرخِ بابل)'
    },
    eraOrLifespan: 'fl. c. 330 – 260 BCE',
    role: {
      en: 'Chaldaean Priest of Bel-Marduk, Astronomer & Historian',
      ur: 'بابل کے کاہن، ماہرِ فلکیات اور مؤرخ'
    },
    civilizationIds: ['civ-sumer-mesopotamia'],
    biography: {
      en: 'Hellenistic Babylonian astronomer and priest who wrote the Greek-language Babyloniaca for Seleucid King Antiochus I, translating ancient cuneiform archives into Greek and transmitting Mesopotamian chronology to the classical Western world.',
      ur: 'بابل کے کاہن جنہوں نے قدیم میخی کتبات کا یونانی زبان میں ترجمہ کیا تاکہ بابل کی ہزاروں سالہ تاریخ یونانی دنیا تک پہنچ سکے۔'
    },
    primaryTextIds: [],
    associatedEventIds: [],
    associatedClaimIds: ['clm-04-source-attested-berossus-chronology']
  },
  {
    id: 'prs-alexander-cunningham',
    slug: 'sir-alexander-cunningham',
    name: {
      en: 'Sir Alexander Cunningham',
      ur: 'سر الیگزینڈر کننگھم'
    },
    eraOrLifespan: '1814 – 1893 CE',
    role: {
      en: 'Founder of the Archaeological Survey of India (ASI)',
      ur: 'آرکیالوجیکل سروے آف انڈیا کے بانی'
    },
    civilizationIds: ['civ-indus-valley'],
    biography: {
      en: 'British army engineer and pioneer archaeologist who founded the Archaeological Survey of India in 1861. In 1872–1873, he published the very first seal from Harappa bearing the famous humpless bull and enigmatic undeciphered characters.',
      ur: 'برطانوی ماہر آثار قدیمہ جنہوں نے 1861 میں آرکیالوجیکل سروے آف انڈیا کی بنیاد رکھی اور 1873 میں پہلی مرتبہ ہڑپہ کی مہر اور نامعلوم تحریر کو دنیا کے سامنے پیش کیا۔'
    },
    primaryTextIds: [],
    associatedEventIds: [],
    associatedClaimIds: ['clm-03-uncertain-indus-script-decipherment']
  }
];
