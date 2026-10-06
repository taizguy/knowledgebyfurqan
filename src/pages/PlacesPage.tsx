import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { DataService } from '../services/dataService';
import { ArrowRight, MapPin, Layers, CheckCircle, Calendar, Compass } from 'lucide-react';

export const PlacesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { route, navigate, navigateToClaim } = useNavigation();
  const places = DataService.getPlaces();

  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (route.query && route.query.id) {
      setHighlightedId(route.query.id);
      const el = document.getElementById(route.query.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [route.query]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="border-b border-[#E6E1D6] pb-8 mb-10">
        <span className="text-xs uppercase tracking-widest text-[#878177] font-sans font-semibold">
          Topographical &amp; Excavation Corpus
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#1A1918] tracking-tight mt-1">
          {language === 'ur' ? 'مقامات: آثار قدیمہ اور کھدائیاں' : 'Places: Archaeological Sites & Stratigraphy'}
        </h1>
        <p className="mt-3 text-base font-serif text-[#5C5751] max-w-2xl leading-relaxed">
          {language === 'ur'
            ? 'شووہ کی زیر زمین غار سے لے کر وادی سندھ کے پختہ شہروں تک: جغرافیائی نقاط، ارضیاتی تہیں اور کھدائیوں کی تاریخ۔ دیکھیے کہ کس مقام سے کون سا ثبوت اور واقعہ وابستہ ہے۔'
            : 'Explore key geographical loci and excavation strata where deep-time evidence was uncovered. Trace associated primary artifacts, chronicle events, and investigated claims for each site.'}
        </p>
      </div>

      <div className="space-y-10">
        {places.map((place) => {
          const media = place.mediaItemIds[0] ? DataService.getMediaById(place.mediaItemIds[0]) : null;
          const claims = DataService.getClaimsByPlace(place.id);
          const events = DataService.getEventsByPlace(place.id);
          const artifacts = place.primaryArtifactIds
            .map((id) => DataService.getPrimarySourceById(id))
            .filter(Boolean);
          const isTarget = highlightedId === place.id;

          return (
            <div
              key={place.id}
              id={place.id}
              className={`bg-white border p-6 sm:p-8 shadow-2xs transition-all ${
                isTarget ? 'border-[#1E3A5F] ring-2 ring-[#1E3A5F]/20' : 'border-[#E6E1D6] hover:border-[#878177]'
              }`}
            >
              {/* Media thumbnail if present */}
              {media && (
                <div className="mb-6 overflow-hidden border border-[#E6E1D6] aspect-21/9 bg-[#F0ECE3] max-h-72">
                  <img
                    src={media.url}
                    alt={media.caption[language]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between text-xs text-[#878177] font-sans mb-2">
                <span className="font-mono font-medium text-[#1A1918]">{place.earliestOccupation}</span>
                <span>
                  {place.region[language]}, {place.modernCountry[language]}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1918] mb-1">
                {place.name[language]}
              </h2>

              {place.ancientNames && place.ancientNames.length > 0 && (
                <div className="text-xs font-serif italic text-[#5C5751] mb-3">
                  Ancient designations: {place.ancientNames.map((n) => n[language]).join(' · ')}
                </div>
              )}

              <p className="text-base font-serif text-[#2D2A26] leading-relaxed mb-6">
                {place.description[language]}
              </p>

              {/* Stratum & Excavation details */}
              <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D6] text-xs space-y-2 font-serif mb-6">
                <div>
                  <strong className="font-sans text-[#1A1918] uppercase tracking-wider text-[10px]">
                    Archaeological Stratum:
                  </strong>{' '}
                  <span className="text-[#5C5751]">{place.archaeologicalStratum[language]}</span>
                </div>
                <div>
                  <strong className="font-sans text-[#1A1918] uppercase tracking-wider text-[10px]">
                    Excavation History:
                  </strong>{' '}
                  <span className="text-[#5C5751]">{place.excavationHistory[language]}</span>
                </div>
              </div>

              {/* Relational Connections: Artifacts, Events, Claims */}
              <div className="pt-6 border-t border-[#F0ECE3] space-y-4">
                <span className="text-xs uppercase tracking-wider text-[#878177] font-sans block font-semibold">
                  {language === 'ur' ? 'اس مقام کے مادی و تاریخی شواہد:' : 'Site Discoveries & Evidentiary Record:'}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Primary Artifacts */}
                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
                    <span className="font-sans uppercase text-[10px] text-[#1E3A5F] font-bold block mb-1.5 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#1E3A5F]" />
                      <span>Primary Artifacts ({artifacts.length}):</span>
                    </span>
                    {artifacts.length > 0 ? (
                      <div className="space-y-1 font-serif">
                        {artifacts.map((art) => (
                          <button
                            key={art!.id}
                            onClick={() => navigate(`/${language}/sources?id=${art!.id}`)}
                            className="w-full text-left rtl:text-right text-[#1E3A5F] hover:underline truncate block cursor-pointer"
                          >
                            {art!.title[language]}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[#878177] italic font-serif">Field survey only</span>
                    )}
                  </div>

                  {/* Chronicle Events */}
                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
                    <span className="font-sans uppercase text-[10px] text-[#0F766E] font-bold block mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#0F766E]" />
                      <span>Chronicle Events ({events.length}):</span>
                    </span>
                    {events.length > 0 ? (
                      <div className="space-y-1 font-serif text-[#2D2A26]">
                        {events.map((ev) => (
                          <div key={ev.id} className="truncate">
                            · {ev.title[language]}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[#878177] italic font-serif">Continuous period</span>
                    )}
                  </div>

                  {/* Investigated Claims */}
                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E1D6]">
                    <span className="font-sans uppercase text-[10px] text-[#9A3412] font-bold block mb-1.5 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#9A3412]" />
                      <span>Investigated Claims ({claims.length}):</span>
                    </span>
                    {claims.length > 0 ? (
                      <div className="space-y-1 font-serif">
                        {claims.map((clm) => (
                          <button
                            key={clm.id}
                            onClick={() => navigateToClaim(clm.id)}
                            className="w-full text-left rtl:text-right text-[#1E3A5F] hover:underline truncate block cursor-pointer"
                          >
                            {clm.statement[language]}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[#878177] italic font-serif">None formulated</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Coordinates & Atlas Action */}
              <div className="mt-6 pt-4 border-t border-[#F0ECE3] flex items-center justify-between text-xs text-[#878177]">
                <span className="font-mono flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  {place.coordinates.lat}° N, {place.coordinates.lng}° E
                </span>
                <button
                  onClick={() => navigate(`/${language}/atlas`)}
                  className="text-[#1E3A5F] font-medium hover:underline flex items-center gap-1 cursor-pointer font-sans"
                >
                  <span>{t.actions.exploreAtlas}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
