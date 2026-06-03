import { useState, useEffect } from 'react';
import { Sparkles, Info, X, MapPin, Compass, Play, ExternalLink } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutTour from './components/AboutTour';
import WhatsIncluded from './components/WhatsIncluded';
import LiveActivity from './components/LiveActivity';
import TripCustomizer from './components/TripCustomizer';
import BookingForm from './components/BookingForm';
import AdminPortal from './components/AdminPortal';
import { Language, BookingRequest, HeroCard } from './types';
import { TRANSLATIONS } from './data';

export default function App() {
  const [language, setLanguage] = useState<Language>('fr'); // Default to French to match user request prompt
  const [departureCity, setDepartureCity] = useState<string>('Paris');
  const [durationDays, setDurationDays] = useState<number>(10);
  const [accommodationClass, setAccommodationClass] = useState<'standard' | 'premium' | 'luxury'>('standard');
  const [passengers, setPassengers] = useState<number>(2);
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [isAdminVisible, setIsAdminVisible] = useState<boolean>(false);
  const [hasAdminHash, setHasAdminHash] = useState<boolean>(false);
  const [activeHeroCard, setActiveHeroCard] = useState<HeroCard | null>(null);

  const t = TRANSLATIONS[language];

  // Listen to hash change to reveal admin portal hidden entry
  useEffect(() => {
    const handleHashCheck = () => {
      const isHashAdmin = window.location.hash === '#admin';
      setHasAdminHash(isHashAdmin);
      if (isHashAdmin) {
        setIsAdminVisible(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  // Load bookings from local storage
  useEffect(() => {
    const saved = localStorage.getItem('japan_tours_bookings');
    if (saved) {
      try {
        setRequests(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved bookings', e);
      }
    } else {
      // Seed default requests for sandbox demonstration
      const initialSeed: BookingRequest[] = [
        {
          id: 'REQ-3982',
          name: 'Dylan Eloko',
          phone: '+33 6 12 34 56 78',
          comment: 'Je souhaite fêter mon anniversaire à Tokyo lors de ce circuit !',
          departureCity: 'Paris',
          passengers: 2,
          durationDays: 10,
          accommodationClass: 'premium',
          totalPrice: 4200,
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          status: 'pending'
        },
        {
          id: 'REQ-1049',
          name: 'Marie Dupont',
          phone: '+33 7 98 76 54 32',
          comment: 'Is Japan Rail Pass included automatically for Shinkansen train models?',
          departureCity: 'Paris',
          passengers: 4,
          durationDays: 14,
          accommodationClass: 'standard',
          totalPrice: 6800,
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          status: 'approved'
        }
      ];
      localStorage.setItem('japan_tours_bookings', JSON.stringify(initialSeed));
      setRequests(initialSeed);
    }
  }, []);

  // Update central local state & store
  const saveRequests = (updated: BookingRequest[]) => {
    localStorage.setItem('japan_tours_bookings', JSON.stringify(updated));
    setRequests(updated);
  };

  // Add a new booking request
  const handleAddRequest = (newRequest: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    const r: BookingRequest = {
      ...newRequest,
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    const updated = [r, ...requests];
    saveRequests(updated);
  };

  // Update status
  const handleUpdateStatus = (id: string, status: 'pending' | 'approved' | 'contacted') => {
    const updated = requests.map(req => {
      if (req.id === id) {
        return { ...req, status };
      }
      return req;
    });
    saveRequests(updated);
  };

  // Delete status
  const handleDeleteRequest = (id: string) => {
    const updated = requests.filter(req => req.id !== id);
    saveRequests(updated);
  };

  // Calculate simulated pricing
  const calculateTotalPrice = () => {
    const multipliers = { standard: 1.0, premium: 1.35, luxury: 1.9 };
    const flightOffsets = {
      'Paris': 850,
      'Moscow': 730,
      'New York': 1000,
      'London': 930,
      'Montreal': 1070,
      'Tokyo Local': 0
    };

    const baseRefundRate = 145; // daily rate per person
    const accommodationMultiplier = multipliers[accommodationClass] || 1.0;
    const currentFlightCost = flightOffsets[departureCity as keyof typeof flightOffsets] ?? 850;

    const pricePerPerson = (baseRefundRate * durationDays) * accommodationMultiplier + currentFlightCost;
    return Math.round(pricePerPerson * passengers);
  };

  const totalPrice = calculateTotalPrice();

  // Scroll functions
  const handleScrollToBooking = () => {
    const formEl = document.getElementById('configurator-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTimeline = () => {
    const target = document.getElementById('about-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white select-none relative font-sans antialiased">
      
      {/* 1. Header component */}
      <Header
        language={language}
        setLanguage={setLanguage}
        onBookClick={handleScrollToBooking}
      />

      {/* 2. Hero cinematic area */}
      <Hero
        language={language}
        onExploreClick={handleScrollToTimeline}
        onCardClick={(card) => setActiveHeroCard(card)}
        onBookClick={handleScrollToBooking}
      />

      {/* 3. About section with timeline */}
      <AboutTour language={language} />

      {/* 4. What is included grid panel */}
      <WhatsIncluded language={language} departureCity={departureCity} />

      {/* Live Activity & Human Touch section */}
      <LiveActivity language={language} />

      {/* 5. Trip interactive simulation customizer */}
      <TripCustomizer
        language={language}
        departureCity={departureCity}
        setDepartureCity={setDepartureCity}
        durationDays={durationDays}
        setDurationDays={setDurationDays}
        accommodationClass={accommodationClass}
        setAccommodationClass={setAccommodationClass}
        passengers={passengers}
        setPassengers={setPassengers}
        totalPrice={totalPrice}
      />

      {/* 6. Form with scenic sunset background overlay */}
      <BookingForm
        language={language}
        departureCity={departureCity}
        durationDays={durationDays}
        accommodationClass={accommodationClass}
        passengers={passengers}
        totalPrice={totalPrice}
        onSubmit={handleAddRequest}
        showAdminToggle={hasAdminHash}
        onAdminToggle={() => setIsAdminVisible(!isAdminVisible)}
        isAdminVisible={isAdminVisible}
      />

      {/* Interactive Submissions Dashboard */}
      {isAdminVisible && (
        <section id="admin-portal-wrapper" className="bg-neutral-950 pb-24 px-6 relative z-30">
          <div className="max-w-4xl mx-auto">
            <AdminPortal
              language={language}
              requests={requests}
              onUpdateStatus={handleUpdateStatus}
              onDeleteRequest={handleDeleteRequest}
              onClose={() => setIsAdminVisible(false)}
            />
          </div>
        </section>
      )}

      {/* 7. Scenic Sub-footer branding match */}
      <footer className="bg-neutral-950 border-t border-white/5 py-12 text-center text-white/30 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-500" />
            <span className="font-sans font-black tracking-widest uppercase text-white">JAPAN TOURS</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-wider">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white cursor-pointer">{language === 'fr' ? 'Haut de page' : 'Back to top'}</button>
            <a href="#about-section" className="hover:text-white">{t.navAbout}</a>
            <a href="#included-section" className="hover:text-white">{t.navIncluded}</a>
            <a href="#contacts-section" className="hover:text-white">{t.navContacts}</a>
          </div>
          <p className="font-mono text-[10px]">DESIGN INSPIRED BY REAL LANDING CONCEPT • CURATED INTENT</p>
        </div>
      </footer>

      {/* Detail overlay modal when a hero highlight card is clicked */}
      {activeHeroCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fade-in text-white">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveHeroCard(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-950/60 text-white/50 hover:text-white hover:bg-neutral-950/85 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 relative">
              <img 
                src={activeHeroCard.image} 
                alt={activeHeroCard.title} 
                referrerPolicy="no-referrer" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800";
                }}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
              <span className="absolute bottom-4 left-6 px-3 py-1 bg-amber-500 text-neutral-950 font-bold uppercase tracking-widest text-[10px] rounded-full">
                {activeHeroCard.badge}
              </span>
            </div>

            <div className="p-8 space-y-4 text-left">
              <h4 className="text-2xl font-black font-sans tracking-tight">
                {activeHeroCard.title}
              </h4>
              <p className="text-white/70 text-sm leading-relaxed font-sans">
                {language === 'fr' ? 'Découvrez des moments exceptionnels de notre itinéraire exclusif de 10 jours au Japon.' : 'A highlight curated inside our default 10-day luxury Japanese guide loop.'}
              </p>
              
              <div className="border-t border-white/10 pt-4 space-y-2.5 text-xs text-white/60">
                <p>✓ {language === 'fr' ? 'Accompagnement multilingue complet.' : 'Multilingual local assistance.'}</p>
                <p>✓ {language === 'fr' ? 'Billet de train Shinkansen grande vitesse inclus.' : 'Bullet-train JR Shinkansen seat reserved.'}</p>
                <p>✓ {language === 'fr' ? 'Accès coupe-file aux monuments majeurs.' : 'Instant queue skip pass for temples.'}</p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setActiveHeroCard(null);
                    handleScrollToBooking();
                  }}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  {language === 'fr' ? 'Configurer mon devis' : 'Simulate This Itinerary'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
