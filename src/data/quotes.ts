import { Quote } from '../types/entities';

export const quotesData: Quote[] = [
  {
    id: 'qte-enheduanna-opening',
    sourceId: 'src-glassner-2003',
    authorId: 'prs-enheduanna',
    passage: {
      en: 'Queen of all the me, radiant light, righteous woman clothed in brilliance, beloved of heaven and earth, hierodule of An!',
      ur: 'تمام خدائی قوانین (مے) کی ملکہ، تابناک روشنی، حق کی پیکر جو جلال کے لباس میں ملبوس ہے، آسمان و زمین کی محبوبہ، دیوتا ان کی معتمد خاص!'
    },
    originalLanguageText: 'nin me šar₂-ra u₄ dalla e₃-a munus zid me-lam₂ gub-bu ki aŋ₂ an uraš-a',
    originalLanguageName: 'Sumerian (Classic cuneiform transcription)',
    context: {
      en: 'Opening invocation of Nin-me-šara (The Exaltation of Inanna), marking humanity’s first verified individualized poetic and authorial voice preserved in writing.',
      ur: 'نظم "عظمتِ اینانا" کا افتتاحی کلمہ، جو تحریری تاریخ میں پہلی بار کسی منفرد اور دستخط شدہ مصنف کی آواز کا پتہ دیتا ہے۔'
    },
    citationId: 'cit-glassner-2003-p104',
    relatedClaimIds: ['clm-05-modern-scholarship-proto-cuneiform-origins']
  },
  {
    id: 'qte-sumerian-king-list-opening',
    sourceId: 'src-berossus-babyloniaca',
    authorId: 'prs-berossus',
    passage: {
      en: 'When kingship was lowered from heaven, the kingship was in Eridu. In Eridu, Alulim became king and ruled 28,800 years.',
      ur: 'جب بادشاہت آسمان سے اتاری گئی تو سب سے پہلے اریدو میں قائم ہوئی۔ اریدو میں الولیم بادشاہ بنا اور اس نے 28,800 سال حکومت کی۔'
    },
    originalLanguageText: 'nam-lugal an-ta e₃-de₃-a-ba eri-du₁₀(ki) nam-lugal-la',
    originalLanguageName: 'Sumerian (Weld-Blundell Prism WB 444)',
    context: {
      en: 'The opening formula of the Sumerian King List recording cosmic antediluvian epochs measured in sexagesimal multiples (saroi of 3,600 years).',
      ur: 'سومری شاہی فہرست کا افتتاحی جملہ جس میں طوفان نوح سے پہلے کے دیومالائی کائناتی ادوار کا بیان ہے۔'
    },
    citationId: 'cit-berossus-p12',
    relatedClaimIds: ['clm-04-source-attested-berossus-chronology']
  },
  {
    id: 'qte-schmidt-gobekli',
    sourceId: 'src-schmidt-2006',
    authorId: 'prs-klaus-schmidt',
    passage: {
      en: 'First came the temple, then came the city. The megaliths of Göbekli Tepe prove that symbolic architecture preceded agricultural sedentarism.',
      ur: 'پہلے معبد تعمیر ہوا، پھر شہر آباد ہوئے۔ گوئبکلی تپہ کے ستون ثابت کرتے ہیں کہ علامتی اور مذہبی تعمیرات زراعت اور مستقل آبادی سے پہلے وجود میں آئیں۔'
    },
    originalLanguageText: 'Zuerst kam der Tempel, dann die Stadt.',
    originalLanguageName: 'German',
    context: {
      en: 'Klaus Schmidt’s paradigm-shifting thesis proposing that the cognitive and ritual mobilization at Göbekli Tepe triggered the Neolithic agricultural revolution.',
      ur: 'پروفیسر کلاؤس شمٹ کا انقلابی نظریہ کہ مذہبی اجتماعات نے انسانوں کو زراعت اور غلہ جمع کرنے پر مجبور کیا۔'
    },
    citationId: 'cit-schmidt-2006-p112',
    relatedClaimIds: ['clm-02-disputed-gobekli-pure-cult']
  },
  {
    id: 'qte-qureshi-epistemic-charter',
    sourceId: 'src-qureshi-archive',
    authorId: 'prs-furqan-qureshi',
    passage: {
      en: 'We do not dismiss the ancient myth as primitive folly, nor do we worship it as literal science. We subject every claim to its exact evidential weight.',
      ur: 'ہم نہ تو قدیم دیومالا کو محض جہالت کہہ کر مسترد کرتے ہیں، اور نہ ہی اسے لفظ بہ لفظ حتمی سائنس مانتے ہیں۔ ہم ہر دعوے کو اس کے اصل ثبوتی وزن کے مطابق جانچتے ہیں۔'
    },
    originalLanguageText: 'ہم نہ تو قدیم دیومالا کو محض جہالت کہہ کر مسترد کرتے ہیں، اور نہ ہی اسے لفظ بہ لفظ حتمی سائنس مانتے ہیں۔ ہم ہر دعوے کو اس کے اصل ثبوتی وزن کے مطابق جانچتے ہیں۔',
    originalLanguageName: 'Urdu',
    context: {
      en: 'The core methodological principle of the 40,000 Years of Knowledge series by Furqan Qureshi, separating source reporting from independent empirical proof.',
      ur: 'فرقان قریشی کے تحقیقی سلسلے کا بنیادی علمی قاعدہ، جو مآخذ کے بیان اور سائنسی ثبوت کے درمیان حد بندی قائم کرتا ہے۔'
    },
    citationId: 'cit-qureshi-2024-epistemic',
    relatedClaimIds: ['clm-07-editorial-analysis-epistemic-transition']
  }
];
