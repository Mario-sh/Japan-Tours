import { Scale, Sliders, Users, Calendar, Sparkles, Building2, Ticket } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, DEPARTURE_CITIES, ACCOMMODATIONS } from '../data';

interface TripCustomizerProps {
  language: Language;
  departureCity: string;
  setDepartureCity: (city: string) => void;
  durationDays: number;
  setDurationDays: (days: number) => void;
  accommodationClass: 'standard' | 'premium' | 'luxury';
  setAccommodationClass: (cls: 'standard' | 'premium' | 'luxury') => void;
  passengers: number;
  setPassengers: (num: number) => void;
  totalPrice: number;
}

export default function TripCustomizer({
  language,
  departureCity,
  setDepartureCity,
  durationDays,
  setDurationDays,
  accommodationClass,
  setAccommodationClass,
  passengers,
  setPassengers,
  totalPrice
}: TripCustomizerProps) {
  const t = TRANSLATIONS[language];

  // base multiplier calculation for display details
  const currentAccommodation = ACCOMMODATIONS.find(a => a.value === accommodationClass);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: language === 'fr' ? 'EUR' : 'USD',
      maximumFractionDigits: 0
    }).format(p);
  };

  const getPricePerPerson = () => {
    return Math.round(totalPrice / passengers);
  };

  return (
    <section id="configurator-section" className="bg-neutral-950 text-white py-16 px-6 border-t border-white/5 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto bg-neutral-920/80 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs uppercase tracking-wider font-mono">
            <Sliders className="w-3.5 h-3.5" />
            <span>{t.customizerTitle}</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-black font-sans tracking-tight">
            {language === 'fr' ? 'Personnalisez votre circuit' : 'Tailor Your Experience'}
          </h3>
          <p className="text-white/60 text-sm max-w-xl mx-auto">
            {t.customizerIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Controls Panel */}
          <div className="space-y-6">
            
            {/* 1. Departure Hub */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 uppercase">
                <Ticket className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.departureLabel}</span>
              </label>
              <div className="relative">
                <select
                  id="departure-select"
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 hover:border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 appearance-none cursor-pointer transition-colors"
                >
                  {DEPARTURE_CITIES.map((city) => (
                    <option key={city.value} value={city.value} className="bg-neutral-900 text-white">
                      {city.label} {city.priceOffset !== 0 ? `(${city.priceOffset > 0 ? '+' : ''}${city.priceOffset}$)` : ''}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
              </div>
            </div>

            {/* 2. Duration Days */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 uppercase">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  <span>{t.durationLabel}</span>
                </label>
                <span className="font-mono text-sm font-bold text-amber-500">{durationDays} {language === 'fr' ? 'jours' : 'days'}</span>
              </div>
              <div className="flex gap-2.5">
                {[7, 10, 14].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDurationDays(days)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      durationDays === days
                        ? 'bg-white text-neutral-950 border-white shadow-md'
                        : 'bg-white/5 border-white/10 hover:border-white/25 text-white'
                    }`}
                  >
                    {days} {language === 'fr' ? 'Jours' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Accommodation Class */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 uppercase">
                <Building2 className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.accommodationLabel}</span>
              </label>
              <div className="space-y-2.5">
                {ACCOMMODATIONS.map((acc) => (
                  <button
                    key={acc.value}
                    type="button"
                    onClick={() => setAccommodationClass(acc.value as any)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-4 cursor-pointer ${
                      accommodationClass === acc.value
                        ? 'border-amber-500 bg-amber-500/5 shadow-md'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-white uppercase">{acc.label[language]}</span>
                      <span className="block text-[11px] text-white/50 mt-1 font-sans line-clamp-1">{acc.description[language]}</span>
                    </div>
                    {acc.multiplier > 1.0 && (
                      <span className="bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase shrink-0">
                        +{Math.round((acc.multiplier - 1) * 100)}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Number of Travelers (Passengers) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 uppercase">
                  <Users className="w-3.5 h-3.5 text-orange-400" />
                  <span>{t.passengersLabel}</span>
                </label>
                <span className="font-mono text-sm font-bold text-amber-500">{passengers} {passengers > 1 ? (language === 'fr' ? 'personnes' : 'travelers') : (language === 'fr' ? 'personne' : 'traveler')}</span>
              </div>
              <input
                id="passengers-slider"
                type="range"
                min="1"
                max="10"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-white/10 rounded-lg cursor-pointer appearance-none"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-mono">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10+</span>
              </div>
            </div>

          </div>

          {/* Pricing Quote Summary Side */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            {/* Soft decorative background element */}
            <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
              <Sparkles className="w-32 h-32" />
            </div>

            <div className="space-y-6 relative z-10">
              <span className="font-mono text-[10px] uppercase font-bold text-amber-500 tracking-widest block">
                {language === 'fr' ? 'CONFIRMATION DU PRESET' : 'ESTIMATED PRICE DECK'}
              </span>

              <div className="space-y-1">
                <span className="block text-white/50 text-xs tracking-wider uppercase">{t.pricePerPerson}</span>
                <span className="block text-4xl md:text-5xl font-black text-white font-sans">
                  {formatPrice(getPricePerPerson())}
                </span>
              </div>

              <div className="space-y-1 pt-6 border-t border-white/10">
                <span className="block text-white/50 text-xs tracking-wider uppercase">{t.totalPriceLabel}</span>
                <span className="block text-2xl md:text-3xl font-bold text-amber-400 font-sans">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Dynamic itinerary detail bullet points */}
              <div className="pt-6 border-t border-white/10 text-xs space-y-2 text-white/70">
                <p>✓ {language === 'fr' ? 'Toutes les liaisons aériennes réservées' : 'All airport flight hubs managed'}</p>
                <p>✓ {durationDays} {language === 'fr' ? 'jours de visites avec guides locaux' : 'days fully guided in Kyoto/Tokyo'}</p>
                <p>✓ {language === 'fr' ? 'Classement hébergement :' : 'Hotel Standard : '} <span className="text-amber-300 font-bold uppercase">{currentAccommodation?.label[language].split(' (')[0]}</span></p>
                <p>✓ {language === 'fr' ? 'Carte SIM illimitée incluse' : 'Unlimited high-speed Pocket Wi-Fi included'}</p>
              </div>
            </div>

            <button
              onClick={() => {
                const formEl = document.getElementById('contacts-section');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-neutral-950 font-bold tracking-widest text-xs uppercase shadow-lg transition-transform hover:scale-[1.01] cursor-pointer text-center"
            >
              {language === 'fr' ? 'Valider et finaliser l\'itinéraire' : 'Freeze Price & Finalize Request'}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
