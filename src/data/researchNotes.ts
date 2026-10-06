import { Article, ResearchNote } from '../types/entities';

export const articlesData: Article[] = [
  {
    id: 'art-methodological-epistemology',
    slug: 'the-epistemic-charter-of-40000-years',
    title: {
      en: 'The Epistemic Charter: Demarcating Fact, Attestation, and Interpretation',
      ur: 'تحقیقی منشور: حقیقت، تاریخی گواہی، اور تشریح کی فکری حد بندی'
    },
    deck: {
      en: 'A foundational essay on why digital research archives must dismantle the illusion of monolithic certainty in historiography.',
      ur: 'ایک بنیادی فکری مقالہ کہ کیوں ایک سنجیدہ ڈیجیٹل ریسرچ آرکائیو کو تاریخ نویسی میں قطعی یقین کے فریب کو ختم کرنا چاہیے۔'
    },
    author: {
      en: 'Furqan Qureshi',
      ur: 'فرقان قریشی'
    },
    publicationDate: '2025-01-15',
    epistemicType: 'editorial_analysis',
    content: {
      en: 'When reading historical and archaeological claims, the general public is frequently confronted with binary simplifications: a claim is either reported as unquestioned fact or dismissed as a myth. In reality, human knowledge exists across an intricate continuum.\n\nOur archive establishes ten clear categories:\n1. Source Material: Raw unprocessed archaeological and geological data.\n2. Primary Sources: Material objects, tablets, and inscriptions created during the epoch under study.\n3. Secondary Sources: Compilations, chronicles, and commentaries composed after the historical event.\n4. Modern Scholarship: Contemporary critical, peer-reviewed scientific investigations.\n5. Editorial Analysis: The systemic synthesis formulated by the archive curators.\n6. Interpretation: Hermeneutic paradigms (psychological, structural, cosmological) applied to explain facts.\n7. Uncertain Claims: Where physical or epigraphic evidence is insufficient for consensus.\n8. Disputed Claims: Where two or more robust academic camps maintain contradictory positions.\n9. Verified Claims: Claims confirmed by independent cross-calibrated dating and empirical evidence.\n10. Source-Attested but Unverified: Claims found in ancient texts that lack independent physical corroboration.\n\nBy refusing to collapse these ten categories into a single flat narrative, we honor both the ancient witnesses and the modern critical mind.',
      ur: 'جب عوام تاریخی یا آثار قدیمہ کے بیانات پڑھتے ہیں تو اکثر انہیں دو ٹوک سادگی کا سامنا ہوتا ہے: کسی بات کو یا تو سو فیصد اٹل حقیقت بنا دیا جاتا ہے یا اسے فرضی کہانی کہہ کر مسترد کر دیا جاتا ہے۔ جبکہ حقیقت میں انسانی علم کا دائرہ کہیں زیادہ وسیع اور پیچیدہ ہے۔\n\nہمارا پورٹل علم کے دس درجات قائم کرتا ہے:\n۱. خام ماخذ و مادی شواہد: وہ خام ارضیاتی و آثار قدیمہ کا مواد جو زمین سے نکلتا ہے۔\n۲. بنیادی ماخذ: اس دور کے اپنے ہاتھوں سے لکھے گئے کتبات، مہریں اور تختیاں۔\n۳. ثانوی ماخذ: بعد کے ادوار میں لکھی گئی تاریخی کتب و تذکرے۔\n۴. جدید سائنسی تحقیق: ہم عصر ماہرین آثار، فزکس اور لسانیات کے تصدیق شدہ تحقیقی مقالے۔\n۵. ادارتی تجزیہ: ریسرچ پروجیکٹ کے محققین کا فکری خلاصہ۔\n۶. تشریح و تعبیر: شواہد کو سمجھنے کے مختلف فلسفیانہ یا نفسیاتی ماڈل۔\n۷. غیر یقینی بیانات: جہاں شواہد کم ہیں اور حتمی فیصلہ ناممکن ہے۔\n۸. متنازعہ بیانات: جہاں صف اول کے محققین کے درمیان علمی اختلاف موجود ہے۔\n۹. مصدقہ بیانات: جن کی تصدیق ریڈیو کاربن اور ارضیاتی پیمانوں سے ثابت ہو چکی ہے۔\n۱۰. ماخذ میں مذکور مگر غیر مصدقہ: وہ قدیم بیانات جو کتابوں میں تو ہیں لیکن آزاد سائنسی ثبوت نہیں رکھتے۔\n\nان دس درجوں کو الگ رکھ کر ہی ہم قدیم اسلاف کے احترام اور جدید سائنسی دیانت دونوں کا حق ادا کر سکتے ہیں۔'
    },
    claimIds: [
      'clm-01-verified-aurignacian-art',
      'clm-02-disputed-gobekli-pure-cult',
      'clm-04-source-attested-berossus-chronology',
      'clm-07-editorial-analysis-epistemic-transition'
    ],
    sourceIds: ['src-qureshi-archive'],
    citationIds: ['cit-qureshi-2024-p1'],
    tagIds: ['tag-epistemology', 'tag-methodology']
  }
];

export const researchNotesData: ResearchNote[] = [
  {
    id: 'rn-01-c14-calibration',
    slug: 'note-on-radiocarbon-calibration-upper-paleolithic',
    title: {
      en: 'Technical Note: Radiocarbon Calibration Curves in Deep Time',
      ur: 'تکنیکی نوٹ: چالیس ہزار سالہ تاریخ پیمائی میں کاربن ڈیٹنگ کے اصول'
    },
    author: {
      en: 'Archive Epigraphic & Chronometric Unit',
      ur: 'آرکائیو کا شعبہ تاریخ پیمائی'
    },
    dateCreated: '2024-11-20',
    relatedEntityId: 'ch-01-symbolic-consciousness',
    relatedEntityType: 'Chapter',
    content: {
      en: 'Uncalibrated radiocarbon years (BP) deviate significantly from calendar years prior to 15,000 BP due to historical atmospheric carbon-14 flux. All dates in the 40,000 Years of Knowledge atlas use calibrated values (cal BP) adhering to the IntCal20 calibration standard.',
      ur: 'پندرہ ہزار سال سے پرانی تاریخوں میں خام ریڈیو کاربن اور شمسی سالوں میں نمایاں فرق ہوتا ہے۔ اس لیے ہمارے اٹلس میں تمام سال جدید ترین IntCal20 کیلیبریٹڈ پیمانے کے تحت پیش کیے گئے ہیں۔'
    },
    epistemicLevel: 'scholarly_note',
    citationIds: ['cit-clottes-2003-p42']
  }
];
