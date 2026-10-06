import { MediaItem } from '../types/entities';

export const mediaData: Record<string, MediaItem> = {
  'media-hero-scroll': {
    id: 'media-hero-scroll',
    type: 'manuscript_scan',
    url: '/src/assets/images/hero_deep_time_scroll_1791226809273.jpg',
    caption: {
      en: 'Illuminated manuscript and cuneiform clay tablets preserved in vitrine lighting',
      ur: 'عجائب گھر میں محفوظ شدہ قدیم مخطوطہ اور میخی مٹی کی تختیاں'
    },
    credit: {
      en: '40,000 Years of Knowledge Archival Repository',
      ur: 'چالیس ہزار سالہ علم آرکائیو ریپازٹری'
    },
    license: 'Archival Institutional Access',
    institution: {
      en: 'Central Research Archive',
      ur: 'مرکزی تحقیقی محافظ خانہ'
    }
  },
  'media-paleolithic-art': {
    id: 'media-paleolithic-art',
    type: 'rock_art',
    url: '/src/assets/images/paleolithic_cave_art_1791226820535.jpg',
    caption: {
      en: 'Upper Paleolithic parietal composition: ochre hand stencils and fauna on limestone wall (c. 36,000 BP)',
      ur: 'بالائی قدیم سنگی دور کے چٹانی نقوش: گیرو سے بنے ہاتھوں کے چھاپے اور جانور (تقریباً 36 ہزار سال قبل)'
    },
    credit: {
      en: 'Prehistoric Speleological Survey & CNRS Archive',
      ur: 'قبل از تاریخ غار سروے اور سی این آر ایس آرکائیو'
    },
    license: 'Scientific Documentation',
    institution: {
      en: 'Caverne du Pont-d’Arc Preservation Trust',
      ur: 'پونٹ دآرک پریزرویشن ٹرسٹ'
    }
  },
  'media-gobekli-pillar': {
    id: 'media-gobekli-pillar',
    type: 'inscription',
    url: '/src/assets/images/gobekli_tepe_megalith_1791226832786.jpg',
    caption: {
      en: 'Monolithic T-shaped Pillar 43 in Enclosure D at Göbekli Tepe showing zoomorphic bas-relief (c. 9,600 BCE)',
      ur: 'گوئبکلی تپہ کا ٹی شکل کا ستون ۴۳ مع ابھری ہوئی حیوانی نقاشی (تقریباً ۹۶۰۰ قبل مسیح)'
    },
    credit: {
      en: 'German Archaeological Institute (DAI) / Şanlıurfa Museum',
      ur: 'جرمن آرکیالوجیکل انسٹیٹیوٹ اور شانلی اورفا میوزیم'
    },
    license: 'Archaeological Survey License',
    institution: {
      en: 'Ministry of Culture and Tourism, Türkiye',
      ur: 'وزارتِ ثقافت و سیاحت، ترکیہ'
    }
  },
  'media-cuneiform-cylinder': {
    id: 'media-cuneiform-cylinder',
    type: 'inscription',
    url: '/src/assets/images/cuneiform_clay_cylinder_1791226842129.jpg',
    caption: {
      en: 'Ancient Mesopotamian cuneiform clay document inscribed with administrative and royal decrees',
      ur: 'قدیم میسوپوٹیمیا کی مٹی کی تختی جس پر دفتری و شاہی فرامین میخی خط میں کندہ ہیں'
    },
    credit: {
      en: 'Near Eastern Epigraphic Archive & CDLI',
      ur: 'مشرق قریب کتباتی آرکائیو اور سی ڈی ایل آئی'
    },
    license: 'Public Domain Academic Scan',
    institution: {
      en: 'Vorderasiatisches Museum',
      ur: 'مشرق قریب کا عجائب گھر'
    }
  }
};
