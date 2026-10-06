import { Place } from '../types/entities';

export const placesData: Place[] = [
  {
    id: 'plc-chauvet',
    slug: 'chauvet-pont-d-arc-cave',
    name: {
      en: 'Chauvet-Pont-d’Arc Cave',
      ur: 'شووہ پونٹ دآرک غار'
    },
    region: {
      en: 'Ardèche Department, Auvergne-Rhône-Alpes',
      ur: 'آردیش، فرانس'
    },
    modernCountry: {
      en: 'France',
      ur: 'فرانس'
    },
    coordinates: {
      lat: 44.3867,
      lng: 4.4161
    },
    earliestOccupation: 'c. 37,000 BP (Aurignacian)',
    archaeologicalStratum: {
      en: 'Sealed karst limestone floor with intact footprint trails, hearth ash, and charcoal parietal walls',
      ur: 'سیل شدہ چونے کی قدرتی غار جس میں قدیم انسانوں کے قدموں کے نشانات اور کوئلہ محفوظ ہے'
    },
    civilizationIds: ['civ-upper-paleolithic'],
    description: {
      en: 'One of the most prolific and exquisitely preserved prehistoric art sanctuaries in the world, containing over 1,000 paintings of lions, mammoths, rhinoceroses, and human hand stencils.',
      ur: 'دنیا کے محفوظ ترین قبل از تاریخ آرٹ کے خزانوں میں سے ایک، جہاں شیروں، میمتھ اور گینڈوں کی ہزار سے زائد مصور تصویریں اور ہاتھوں کے نشانات موجود ہیں۔'
    },
    excavationHistory: {
      en: 'Discovered in December 1994 by speleologists Chauvet, Brunel, and Hillaire. Rigorously preserved without tourist contamination; physical access restricted to certified researchers.',
      ur: '1994 میں دریافت ہوئی۔ ماحولیاتی بگاڑ سے بچانے کے لیے سیاحوں کے لیے بند کر کے سائنسی بنیادوں پر ہو بہو نقل تعمیر کی گئی۔'
    },
    primaryArtifactIds: ['ps-chauvet-panel'],
    associatedEventIds: ['ev-chauvet-art-creation'],
    mediaItemIds: ['media-paleolithic-art']
  },
  {
    id: 'plc-gobekli-tepe',
    slug: 'gobekli-tepe-sanliurfa',
    name: {
      en: 'Göbekli Tepe',
      ur: 'گوئبکلی تپہ'
    },
    ancientNames: [
      { en: 'Potbelly Hill', ur: 'گھڑے نما ابھری ہوئی پہاڑی' }
    ],
    region: {
      en: 'Southeastern Anatolia (Germuş Mountains)',
      ur: 'جنوب مشرقی اناطولیہ'
    },
    modernCountry: {
      en: 'Republic of Türkiye',
      ur: 'ترکیہ'
    },
    coordinates: {
      lat: 37.2231,
      lng: 38.9225
    },
    earliestOccupation: 'c. 9,600 BCE (Layer III)',
    archaeologicalStratum: {
      en: 'Layer III (PPNA monumental round structures), Layer II (PPNB rectangular enclosures)',
      ur: 'تیسری تہہ (گول دائروں والے یادگاری ستون) اور دوسری تہہ (چوکور کمرے)'
    },
    civilizationIds: ['civ-pre-pottery-neolithic'],
    description: {
      en: 'A 15-meter tall anthropogenic tell consisting of multiple concentric enclosures with T-shaped megaliths weighing up to 20 tons, predating Stonehenge by 6,000 years.',
      ur: 'پندرہ میٹر بلند تاریخی ٹیلہ جس میں بیس ٹن وزنی ٹی شکل کے یک سنگی ستون گول دائروں میں نصب ہیں، جو برطانوی اسٹون ہینج سے چھ ہزار سال قدیم ہیں۔'
    },
    excavationHistory: {
      en: 'Identified as a survey site in 1963; systematic excavations begun in 1995 by Klaus Schmidt with the German Archaeological Institute and Şanlıurfa Museum.',
      ur: '1963 کے سروے میں شناخت ہوئی جبکہ 1995 میں کلاؤس شمٹ کی قیادت میں باقاعدہ سائنسی کھدائیوں کا آغاز ہوا۔'
    },
    primaryArtifactIds: ['ps-gobekli-pillar-43'],
    associatedEventIds: ['ev-gobekli-enclosure-d'],
    mediaItemIds: ['media-gobekli-pillar']
  },
  {
    id: 'plc-uruk',
    slug: 'uruk-warka-mesopotamia',
    name: {
      en: 'Uruk (Modern Warka)',
      ur: 'ارک (موجودہ ورکا)'
    },
    ancientNames: [
      { en: 'Unug (Sumerian), Erech (Hebrew)', ur: 'اونوگ (سومری)، ایریک (عبرانی)' }
    ],
    region: {
      en: 'Muthanna Governorate, Lower Euphrates',
      ur: 'المثنیٰ صوبہ، زیریں فرات، عراق'
    },
    modernCountry: {
      en: 'Iraq',
      ur: 'عراق'
    },
    coordinates: {
      lat: 31.3222,
      lng: 45.6361
    },
    earliestOccupation: 'c. 5,000 BCE (Ubaid period)',
    archaeologicalStratum: {
      en: 'Extensive 18-strata architectural tell, including the White Temple of Anu and Eanna limestone district',
      ur: 'اٹھارہ ارضیاتی تہوں پر مشتمل تاریخی شہر جس میں انو کا سفید معبد اور ایانا کا مقدس احاطہ شامل ہے'
    },
    civilizationIds: ['civ-sumer-mesopotamia'],
    description: {
      en: 'Widely recognized as the worlds first true metropolis, home to up to 50,000 residents in the 4th millennium BCE and the birthplace of proto-cuneiform writing.',
      ur: 'دنیا کا پہلا حقیقی دارالحکومت جہاں چوتھی صدی قبل مسیح میں پچاس ہزار افراد آباد تھے اور جہاں میخی تحریر کا باضابطہ آغاز ہوا۔'
    },
    excavationHistory: {
      en: 'First explored by William Loftus in 1849; systematically excavated by the Deutsche Orient-Gesellschaft from 1912 onwards.',
      ur: '1849 میں ولیم لافٹس نے جائزہ لیا جبکہ 1912 سے جرمن اورینٹ سوسائٹی نے منظم کھدائیاں کیں۔'
    },
    primaryArtifactIds: ['ps-uruk-iv-tablet'],
    associatedEventIds: ['ev-proto-cuneiform-invention'],
    mediaItemIds: ['media-cuneiform-cylinder']
  },
  {
    id: 'plc-mohenjo-daro',
    slug: 'mohenjo-daro-sindh',
    name: {
      en: 'Mohenjo-Daro (Mound of the Dead)',
      ur: 'موئن جو دڑو (مردوں کا ٹیلہ)'
    },
    region: {
      en: 'Larkana District, Sindh',
      ur: 'ضلع لاڑکانہ، سندھ'
    },
    modernCountry: {
      en: 'Pakistan',
      ur: 'پاکستان'
    },
    coordinates: {
      lat: 27.3292,
      lng: 68.1389
    },
    earliestOccupation: 'c. 2,600 BCE',
    archaeologicalStratum: {
      en: 'Massive baked-brick urban citadel and lower city with bitumen-lined Great Bath and deep wells',
      ur: 'پکی اینٹوں سے تعمیر شدہ قلعہ، رہائشی شہر، غسل خانہ اور زیر زمین پختہ نالیاں'
    },
    civilizationIds: ['civ-indus-valley'],
    description: {
      en: 'The largest metropolitan settlement of the ancient Indus civilization, celebrated for municipal civil engineering, standardized brick ratios (1:2:4), and lack of overt martial monuments.',
      ur: 'وادی سندھ کی تہذیب کا سب سے بڑا شہری مرکز جو اپنی مثالی بلدیاتی منصوبہ بندی اور امن پسند طرز زندگی کے لیے مشہور ہے۔'
    },
    excavationHistory: {
      en: 'Discovered in 1922 by R.D. Banerji; excavated under Sir John Marshall and Mortimer Wheeler; designated a UNESCO World Heritage site in 1980.',
      ur: '1922 میں راکھال داس بنرجی نے دریافت کیا اور بعد میں سر جان مارشل کی نگرانی میں کھدائی مکمل ہوئی۔'
    },
    primaryArtifactIds: [],
    associatedEventIds: ['ev-indus-urban-climax'],
    mediaItemIds: []
  }
];
