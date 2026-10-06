import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigate } = useNavigation();

  return (
    <footer className="hairline-t bg-[#F5F1EA] text-[#5C5751] mt-24">
      {/* Epistemic Charter Banner */}
      <div className="border-b border-[#162C47] bg-[#1E3A5F] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-sans font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'بنیادی تحقیقی ضابطہ' : 'Core Epistemic Standard'}</span>
            </div>
            <p className="text-sm font-serif italic text-[#F0ECE3]">
              {language === 'ur'
                ? 'کسی بھی قدیم تشریح یا نظریے کو خاموشی سے مصدقہ حقیقت میں تبدیل نہ کریں۔'
                : 'Never silently convert an interpretation into a fact.'}
            </p>
          </div>
          <button
            onClick={() => navigate(`/${language}/about`)}
            className="text-xs font-sans uppercase tracking-wider text-[#C5A059] hover:text-white underline underline-offset-4 transition-colors cursor-pointer shrink-0 font-medium"
          >
            {language === 'ur' ? 'تحقیقی منشور پڑھیں' : 'Read Epistemic Charter'} →
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Identity & Scope */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#1A1918] tracking-tight">
              {language === 'ur' ? 'چالیس ہزار سالہ علم' : '40,000 Years of Knowledge'}
            </h3>
            <p className="text-xs leading-relaxed text-[#5C5751] font-serif">
              {language === 'ur'
                ? 'ایک طویل المدتی دو لسانی تحقیقی کتب خانہ اور علمی اٹلس، جو انسانی تاریخ، آثار قدیمہ، اور علوم کے ارتقاء کا غیر جانبدارانہ اور سائنسی احاطہ کرتا ہے۔'
                : 'A long-term bilingual digital research archive and knowledge atlas designed to preserve, organize, cross-reference, and present deep-time civilizational inquiry.'}
            </p>
            <div className="pt-2 text-xs text-[#878177] font-sans">
              <span>{t.actions.publishedBy} </span>
              <strong className="text-[#1A1918] font-medium">Furqan Qureshi Research Archive</strong>
            </div>
          </div>

          {/* Col 2: Navigation Architecture */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#1A1918] font-sans font-semibold mb-4">
              {language === 'ur' ? 'مرکزی شعبہ جات' : 'Atlas Atlas Sections'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate(`/${language}/chapters`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.chapters} (Monographs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/${language}/collections`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.collections}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/${language}/atlas`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.atlas}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/${language}/research`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.research}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/${language}/timeline`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.timeline}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/${language}/sources`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.sources}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Relational Entities */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#1A1918] font-sans font-semibold mb-4">
              {language === 'ur' ? 'کیٹلاگ اور ادارے' : 'Corpus & Entities'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate(`/${language}/people`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.people} (Scholars & Authors)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/${language}/places`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.places} (Excavation Strata)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/${language}/concepts`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.concepts} (Epistemic Ideas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/${language}/about`)}
                  className="hover:text-[#1A1918] transition-colors cursor-pointer"
                >
                  {t.nav.about} (Charter & Lineage)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Epistemic Distinctions */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#1A1918] font-sans font-semibold mb-4">
              {language === 'ur' ? 'دس رکنی علمی درجہ بندی' : '10-Tier Epistemic Matrix'}
            </h4>
            <div className="space-y-1.5 text-[11px] text-[#5C5751] font-serif">
              <div>1. Primary Physical Artifacts</div>
              <div>2. Classical Secondary Sources</div>
              <div>3. Modern Peer-Reviewed Papers</div>
              <div>4. Editorial Historical Analysis</div>
              <div>5. Hermeneutic Interpretations</div>
              <div>6. Verified Claims (C14 calibrated)</div>
              <div>7. Disputed Academic Hypotheses</div>
              <div>8. Uncertain Epigraphic Matters</div>
              <div>9. Source-Attested Ancient Lore</div>
              <div>10. Unprocessed Stratigraphic Data</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 hairline-t flex flex-col sm:flex-row items-center justify-between text-xs text-[#878177]">
          <p>© {new Date().getFullYear()} 40,000 Years of Knowledge Archive. Built for serious research.</p>
          <div className="flex items-center gap-4 mt-3 sm:mt-0 font-sans">
            <button
              onClick={() => navigate(`/${language}/about`)}
              className="hover:text-[#1A1918] transition-colors cursor-pointer"
            >
              {language === 'ur' ? 'طریقہ کار' : 'Methodology'}
            </button>
            <span aria-hidden="true">·</span>
            <span>English / اردو</span>
            <span aria-hidden="true">·</span>
            <span>Open Research Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
