import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigate } = useNavigation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
      {/* Header */}
      <div className="border-b border-[#E6E1D6] pb-8">
        <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
          Institutional &amp; Methodological Charter
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#1A1918] tracking-tight mt-1">
          {language === 'ur' ? 'ہمارے بارے میں اور تحقیقی ضابطہ' : 'About: The Epistemic Charter'}
        </h1>
        <p className="mt-4 text-lg font-serif italic text-[#5C5751] leading-relaxed">
          {language === 'ur'
            ? 'علم کے چالیس ہزار سالہ سفر کو محفوظ کرنے، پرکھنے اور پیش کرنے کے لیے قائم کیا گیا ایک سنجیدہ ڈیجیٹل کتب خانہ۔'
            : 'A digital research library and knowledge atlas dedicated to preserving, organizing, cross-referencing, and critically testing forty millennia of human thought.'}
        </p>
      </div>

      {/* Foundational Principle Banner */}
      <div className="p-8 sm:p-10 bg-[#1E3A5F] text-white border border-[#162C47] shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-sans font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'ur' ? 'مرکزی اصول' : 'Core Foundational Principle'}</span>
        </div>
        <p className="text-2xl sm:text-3xl font-serif italic text-white leading-snug">
          {language === 'ur'
            ? 'کسی بھی تعبیر یا نظریے کو خاموشی سے مصدقہ حقیقت میں تبدیل نہ کریں۔'
            : 'Never silently convert an interpretation into a fact.'}
        </p>
        <p className="text-xs sm:text-sm font-serif text-[#D6E0EC] leading-relaxed pt-2">
          {language === 'ur'
            ? 'جب تک کسی بات کی تصدیق آزاد ارضیاتی، کیمیائی، یا کتباتی شواہد سے نہ ہو، اسے محض اس وجہ سے حتمی سچ نہیں مانا جا سکتا کہ وہ کسی قدیم کتاب میں درج ہے یا کسی جدید فلسفی کا پسندیدہ نظریہ ہے۔'
            : 'Historiographical integrity demands an unwavering boundary between empirical material artifacts, ancient textual lore, academic debate, and philosophical synthesis.'}
        </p>
      </div>

      {/* The 10 Epistemic Tiers Detailed */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] border-b border-[#E6E1D6] pb-3">
          {language === 'ur' ? 'دس رکنی علمی حد بندی' : 'The 10-Tier Epistemic Architecture'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#1A1918] text-[11px] uppercase tracking-wider block mb-1">
              1. Source Material
            </span>
            <p className="text-[#5C5751] leading-relaxed">Raw unprocessed archaeological strata, radiocarbon counts, and forensic surveys.</p>
          </div>

          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#1E3A5F] text-[11px] uppercase tracking-wider block mb-1">
              2. Primary Sources
            </span>
            <p className="text-[#5C5751] leading-relaxed">Direct material artifacts, tablets, and inscriptions created during the subject epoch.</p>
          </div>

          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#475569] text-[11px] uppercase tracking-wider block mb-1">
              3. Secondary Sources
            </span>
            <p className="text-[#5C5751] leading-relaxed">Compilations, chronicles, and classical commentaries written long after the events.</p>
          </div>

          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#0F766E] text-[11px] uppercase tracking-wider block mb-1">
              4. Modern Scholarship
            </span>
            <p className="text-[#5C5751] leading-relaxed">Contemporary peer-reviewed archaeological, philological, and scientific studies.</p>
          </div>

          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#3730A3] text-[11px] uppercase tracking-wider block mb-1">
              5. Editorial Analysis
            </span>
            <p className="text-[#5C5751] leading-relaxed">Systemic historical synthesis formulated by archive researchers.</p>
          </div>

          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#831843] text-[11px] uppercase tracking-wider block mb-1">
              6. Interpretation
            </span>
            <p className="text-[#5C5751] leading-relaxed">Hermeneutic, psychological, or cosmological readings of material evidence.</p>
          </div>

          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#854D0E] text-[11px] uppercase tracking-wider block mb-1">
              7. Uncertain Claims
            </span>
            <p className="text-[#5C5751] leading-relaxed">Insufficient evidence to reach scholarly consensus (e.g. Indus script phonology).</p>
          </div>

          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#9A3412] text-[11px] uppercase tracking-wider block mb-1">
              8. Disputed Claims
            </span>
            <p className="text-[#5C5751] leading-relaxed">Claims contested by major academic camps with competing evidential arguments.</p>
          </div>

          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#14532D] text-[11px] uppercase tracking-wider block mb-1">
              9. Verified Claims
            </span>
            <p className="text-[#5C5751] leading-relaxed">Established by multiple independent, cross-calibrated archaeological and textual proofs.</p>
          </div>

          <div className="p-5 bg-white border border-[#E6E1D6]">
            <span className="font-sans font-bold text-[#334155] text-[11px] uppercase tracking-wider block mb-1">
              10. Source-Attested (Unverified)
            </span>
            <p className="text-[#5C5751] leading-relaxed">Stated inside an ancient text (e.g. 432,000-year reigns) but uncorroborated physically.</p>
          </div>
        </div>
      </section>

      {/* Origin & Lineage: Furqan Qureshi Blogs */}
      <section className="p-8 sm:p-10 bg-[#F5F1EA] border border-[#E6E1D6] space-y-4">
        <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#1A1918]">
          {language === 'ur' ? 'تحقیقی پس منظر اور فرقان قریشی ریسرچ سلسلہ' : 'Origins: Furqan Qureshi Research Archive'}
        </h2>
        <p className="text-sm font-serif text-[#2D2A26] leading-relaxed">
          {language === 'ur'
            ? 'یہ پروجیکٹ فرقان قریشی بلاگز کے تاریخی و فلسفیانہ تحقیقی سلسلے "چالیس ہزار سالہ علم" سے شروع ہوا ہے۔ اس کا مقصد اردو اور انگریزی دونوں زبانوں میں گہری تحقیق، قدیم متون کے ترجمے، اور سائنسی آثار قدیمہ کو عام فہم اور علمی انداز میں جمع کرنا ہے۔'
            : 'This project began with the signature research series "40,000 Years of Knowledge" associated with Furqan Qureshi Blogs. The system is engineered to serve as an enduring repository for cross-cultural historiography, epigraphic analysis, and deep-time intellectual history.'}
        </p>
        <p className="text-sm font-serif text-[#5C5751] leading-relaxed">
          {language === 'ur'
            ? 'پورٹل کا ڈیٹا ماڈل خالصتاً رشتہ دارانہ بنیادوں پر تشکیل دیا گیا ہے تاکہ مستقبل میں نئی کھدائیوں اور دستاویزات کے اضافے سے علم کا یہ محافظ خانہ مزید وسعت پا سکے۔'
            : 'The platform is built on an open entity-relational model, allowing new archaeological excavations, critical editions, and research collections to be continuously integrated without altering the core epistemic constitution.'}
        </p>
      </section>
    </div>
  );
};
