import { useState } from 'react';
import { Calendar, Compass, MapPin, Utensils, CheckCircle } from 'lucide-react';
import { ITINERARY, TRANSLATIONS } from '../data';
import { Language } from '../types';

interface AboutTourProps {
  language: Language;
}

export default function AboutTour({ language }: AboutTourProps) {
  const [activeSegment, setActiveSegment] = useState<number>(0);
  const t = TRANSLATIONS[language];

  return (
    <section
      id="about-section"
      className="relative bg-neutral-950 text-white py-24 border-t border-white/5 overflow-hidden"
    >
      {/* Decorative Light Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent to-white/20" />
          <h2 className="text-xl md:text-3xl font-sans tracking-[0.2em] font-light text-white uppercase text-center shrink-0">
            {t.aboutTitle}
          </h2>
          <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Descriptive Blocks */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <p className="font-sans text-white/90 text-lg md:text-xl leading-relaxed font-light">
                {t.aboutParagraph1}
              </p>
              <h3 className="font-sans text-3xl md:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-orange-400 to-red-500">
                {t.aboutParagraph2}
              </h3>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 shadow-xl">
              <p className="font-sans text-neutral-300 text-sm md:text-base leading-relaxed">
                {t.aboutParagraph3}
              </p>
              
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center text-xs text-white/70">
                <div>
                  <span className="block font-bold text-amber-500 mb-1">01</span>
                  <span>{language === 'fr' ? 'Planifié' : 'Fully Planned'}</span>
                </div>
                <div>
                  <span className="block font-bold text-orange-500 mb-1">02</span>
                  <span>{language === 'fr' ? 'Privé' : 'Small Groups'}</span>
                </div>
                <div>
                  <span className="block font-bold text-red-500 mb-1">03</span>
                  <span>{language === 'fr' ? 'Serein' : 'All-Inclusive'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline & Interactive Detailed View */}
          <div className="lg:col-span-7 col-span-1 flex flex-col md:flex-row gap-8 items-start">
            
            {/* Elegant Vertical Timeline */}
            <div className="relative pl-10 border-l-2 border-white/10 space-y-16 w-full md:w-3/5">
              {ITINERARY.map((step, index) => {
                const isActive = activeSegment === index;
                return (
                  <button
                    key={step.dayRange}
                    onClick={() => setActiveSegment(index)}
                    className="group relative block w-full text-left focus:outline-none transition-all cursor-pointer"
                  >
                    {/* Pulsing Milestones Circle Node */}
                    <div
                      className={`absolute -left-[51px] top-1 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                        isActive
                          ? 'bg-amber-500 border-amber-500 scale-125 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                          : 'bg-neutral-950 border-white/30 group-hover:border-white/60'
                      }`}
                    >
                      {isActive && <div className="w-2 h-2 rounded-full bg-white bg-opacity-95" />}
                    </div>

                    <div className="space-y-2">
                      <span
                        className={`font-mono text-sm tracking-widest font-bold uppercase transition-colors ${
                          isActive ? 'text-amber-500' : 'text-white/40'
                        }`}
                      >
                        {step.dayRange}
                      </span>
                      <h4
                        className={`font-sans text-2xl font-bold tracking-wide transition-colors ${
                          isActive ? 'text-white scale-102 origin-left' : 'text-white/60 group-hover:text-white'
                        }`}
                      >
                        {step.city}
                      </h4>
                      <p className="font-sans text-white/50 text-xs line-clamp-2 md:line-clamp-3">
                        {step.description}
                      </p>
                    </div>

                    {/* Previews Thumbnails aligned on timeline */}
                    <div className="flex gap-2.5 mt-4 overflow-hidden rounded-lg">
                      {step.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative w-16 h-12 rounded overflow-hidden border border-white/10 opacity-60 hover:opacity-100 transition-opacity"
                        >
                          <img 
                            src={img} 
                            alt={step.city} 
                            referrerPolicy="no-referrer" 
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=300";
                            }}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Day Details Drawer panel */}
            <div className="w-full md:w-2/5 md:sticky md:top-24 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold">
                  {ITINERARY[activeSegment].dayRange}
                </span>
                <h4 className="font-sans text-2xl font-black tracking-wide text-white mt-1 border-b border-white/10 pb-3">
                  {ITINERARY[activeSegment].city}
                </h4>
              </div>

              {/* Main Image Slider */}
              <div className="h-32 rounded-xl overflow-hidden border border-white/10">
                <img
                  src={ITINERARY[activeSegment].images[0]}
                  alt={ITINERARY[activeSegment].city}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=600";
                  }}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Day Description */}
              <p className="font-sans text-white/80 text-xs leading-relaxed">
                {ITINERARY[activeSegment].description}
              </p>

              {/* Include Checklist details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{language === 'fr' ? 'À ne pas manquer' : 'Top Attractions'}</span>
                  </div>
                  <ul className="space-y-1.5 pl-5 list-disc text-white/70 text-xs">
                    {ITINERARY[activeSegment].attractions.map((att) => (
                      <li key={att}>{att}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-400 uppercase">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>{language === 'fr' ? 'Cuisine phare' : 'Gourmet Note'}</span>
                  </div>
                  <p className="font-sans text-white/70 italic text-xs pl-5">
                    {ITINERARY[activeSegment].mustEat}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
