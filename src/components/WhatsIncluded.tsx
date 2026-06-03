import { useState } from 'react';
import { Compass, Plane, Car, Hotel, ChevronDown, CheckCircle } from 'lucide-react';
import { INCLUSIONS, DEPARTURE_CITIES, TRANSLATIONS } from '../data';
import { Language } from '../types';

interface WhatsIncludedProps {
  language: Language;
  departureCity: string;
}

export default function WhatsIncluded({ language, departureCity }: WhatsIncludedProps) {
  const [selectedInclusion, setSelectedInclusion] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  // Helper to dynamically get the flight details based on the selected hub
  const getFlightRoute = () => {
    const matchedCity = DEPARTURE_CITIES.find(c => c.value === departureCity);
    const label = matchedCity ? matchedCity.label : 'Paris (CDG)';
    
    if (departureCity === 'Tokyo Local') {
      return language === 'fr' 
        ? 'Arrivée directement sur place (vols non inclus)' 
        : 'Arrive directly on-site (flights not included)';
    }

    return language === 'fr'
      ? `Liaisons : ${matchedCity?.value || 'Paris'} – Osaka, Tokyo – ${matchedCity?.value || 'Paris'}`
      : `Routes: ${matchedCity?.value || 'Paris'} – Osaka, Tokyo – ${matchedCity?.value || 'Paris'}`;
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-500" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-orange-500" />;
      case 'Car':
        return <Car className="w-6 h-6 text-amber-500" />;
      case 'Hotel':
        return <Hotel className="w-6 h-6 text-orange-500" />;
      default:
        return <CheckCircle className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section
      id="included-section"
      className="relative bg-neutral-950 text-white py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent to-white/20" />
          <h2 className="text-xl md:text-3xl font-sans tracking-[0.2em] font-light text-white uppercase text-center shrink-0">
            {t.includedHeading}
          </h2>
          <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INCLUSIONS.map((inclusion) => {
            const isSelected = selectedInclusion === inclusion.id;
            const descriptionText = inclusion.id === 'flights' ? getFlightRoute() : inclusion.description[language];

            return (
              <div
                key={inclusion.id}
                onClick={() => setSelectedInclusion(isSelected ? null : inclusion.id)}
                className={`group relative flex flex-col justify-between p-8 rounded-2xl border bg-neutral-950/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-102 ${
                  isSelected
                    ? 'border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.15)] bg-neutral-900/60'
                    : 'border-white/10 hover:border-white/20 hover:bg-neutral-900/20'
                }`}
              >
                {/* Micro layout for top heading of cards */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
                      {getIcon(inclusion.icon)}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-white/40 group-hover:text-white/80 transition-transform ${
                        isSelected ? 'rotate-180 text-amber-500' : ''
                      }`}
                    />
                  </div>

                  <h3 className="font-sans text-xl font-bold tracking-wide text-white">
                    {inclusion.title[language]}
                  </h3>

                  <p className="font-sans text-white/70 text-sm leading-relaxed min-h-[48px]">
                    {descriptionText}
                  </p>
                </div>

                {/* Inline Accordion Details Area */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isSelected ? 'max-h-40 mt-6 pt-4 border-t border-white/10 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-sans text-amber-200/90 text-xs leading-relaxed">
                    {inclusion.details[language]}
                  </p>
                  <span className="block text-[9px] font-mono uppercase tracking-widest text-white/50 mt-3">
                    {t.contactDetails}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
