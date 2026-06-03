import { ArrowRight, Instagram, Twitter, Compass } from 'lucide-react';
import { HeroCard, Language } from '../types';
import { HERO_CARDS, TRANSLATIONS } from '../data';

interface HeroProps {
  language: Language;
  onExploreClick: () => void;
  onCardClick: (card: HeroCard) => void;
  onBookClick: () => void;
}

export default function Hero({ language, onExploreClick, onCardClick, onBookClick }: HeroProps) {
  const t = TRANSLATIONS[language];

  return (
    <section
      id="hero-section"
      className="relative min-h-screen bg-neutral-950 flex flex-col justify-between overflow-hidden pt-24 pb-12 cursor-default"
    >
      {/* Cinematic Golden Hour Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000"
          alt="Mt Fuji Sunrise"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200";
          }}
          className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] scale-105 animate-pulse-slow"
        />
        {/* Soft golden-orange sunrise gradient layers to replicate the warm glow from the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/40" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      {/* Giant "JAPAN" Watermark text */}
      <div className="absolute inset-0 z-10 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <h1 className="text-[14vw] md:text-[18vw] font-black tracking-[0.15em] text-white/[0.05] leading-none uppercase font-sans select-none text-center">
          JAPAN
        </h1>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col justify-center items-start pt-12 md:pt-16">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-12">
          
          {/* Left Text Block */}
          <div className="max-w-2xl text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-500 text-xs tracking-wider uppercase backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{t.heroSubtitle}</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-sans tracking-tight text-white font-extrabold leading-tight">
              {language === 'fr' ? 'La magie du' : 'Experience the'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                {language === 'fr' ? 'Soleil Levant' : 'Rising Sun'}
              </span>
            </h2>

            <p className="text-white/70 max-w-md font-sans text-sm md:text-base leading-relaxed tracking-wide">
              {language === 'fr' 
                ? 'Une aventure immersive de 10 jours combinant de somptueux temples historiques, une cuisine d\'exception et le dynamisme futuriste de Tokyo.'
                : 'A curated 10-day immersive adventure through historic temples, legendary cuisines, and the vibrant, high-neon city streets of modern Tokyo.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-explore-button"
                onClick={onExploreClick}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-sans text-xs tracking-wider uppercase px-8 py-3.5 rounded-full flex items-center gap-2 backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <span>{t.heroMainBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Portrait Component: Woman in Kimono */}
          <div className="relative flex flex-col items-center select-none">
            <div className="relative w-64 h-80 md:w-80 md:h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=800"
                alt="Traditional Japanese Attire"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&q=80&w=800";
                }}
                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 brightness-[0.85] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="font-sans text-white text-xs tracking-widest uppercase bg-neutral-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                  {language === 'fr' ? 'Tradition & Beauté' : 'Traditional Kimono'}
                </span>
              </div>
            </div>
            
            {/* Soft decorative blur ring behind portrait */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 to-transparent blur-2xl -z-10 rounded-full" />
          </div>

        </div>
      </div>

      {/* Navigation social sidebar on the right as in screenshot */}
      <div className="absolute right-6 top-1/3 z-20 flex flex-col items-center gap-5">
        <div className="w-px h-16 bg-white/20" />
        <a href="#instagram" className="text-white/40 hover:text-white transition-colors" title="Instagram">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="#twitter" className="text-white/40 hover:text-white transition-colors" title="Twitter">
          <Twitter className="w-4 h-4" />
        </a>
        <a href="#contacts" className="text-white/40 hover:text-white transition-colors" title="Globe">
          <Compass className="w-4 h-4" />
        </a>
        <div className="w-px h-16 bg-white/20" />
      </div>

      {/* Footer-Deck overlaid cards on the bottom (3 cities, 10 days, etc.) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-12 md:mt-24">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6">
          
          {/* Scrolling horizontal deck matching the photo exactly */}
          <div className="flex-grow flex gap-3 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-5 sm:overflow-x-visible sm:pb-0">
            {HERO_CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => onCardClick(card)}
                className="group relative flex flex-col justify-between p-4 h-40 md:h-48 rounded-xl overflow-hidden border border-white/15 bg-neutral-950/40 backdrop-blur-md text-left transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] focus:outline-none cursor-pointer flex-shrink-0 w-[140px] sm:w-auto snap-align-start"
              >
                {/* Background image inside card */}
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-65 transition-opacity duration-300">
                  <img
                    src={card.image}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600";
                    }}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-neutral-950/30" />
                </div>

                {/* Card Title and Content */}
                <span className="relative z-10 text-[10px] font-sans text-amber-500 font-bold tracking-widest uppercase">
                  {card.badge}
                </span>

                <div className="relative z-10">
                  <h4 className="font-sans text-white text-sm md:text-base font-bold leading-tight tracking-wide group-hover:text-amber-300 transition-colors">
                    {card.title}
                  </h4>
                </div>
              </button>
            ))}
          </div>

          {/* Solid White 'Book' button block as in right-bottom of hero area */}
          <div className="flex items-center justify-center lg:justify-end min-w-[200px]">
            <button
              id="hero-floating-book-button"
              onClick={onBookClick}
              className="w-full lg:w-48 py-4 px-6 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold tracking-widest uppercase text-xs shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              {t.bookBtn}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
