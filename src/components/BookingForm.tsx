import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Send, Database, Eye } from 'lucide-react';
import { Language, BookingRequest } from '../types';
import { TRANSLATIONS } from '../data';

interface BookingFormProps {
  language: Language;
  departureCity: string;
  durationDays: number;
  accommodationClass: 'standard' | 'premium' | 'luxury';
  passengers: number;
  totalPrice: number;
  onSubmit: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => void;
  showAdminToggle: boolean;
  onAdminToggle: () => void;
  isAdminVisible: boolean;
}

export default function BookingForm({
  language,
  departureCity,
  durationDays,
  accommodationClass,
  passengers,
  totalPrice,
  onSubmit,
  showAdminToggle,
  onAdminToggle,
  isAdminVisible
}: BookingFormProps) {
  const t = TRANSLATIONS[language];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert(language === 'fr' ? 'Veuillez remplir votre nom et votre numéro.' : 'Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit({
        name,
        phone,
        comment,
        departureCity,
        passengers,
        durationDays,
        accommodationClass,
        totalPrice
      });
      setIsSubmitted(true);
      setIsSubmitting(false);
      setName('');
      setPhone('');
      setComment('');
    }, 1200);
  };

  return (
    <section
      id="contacts-section"
      className="relative min-h-[90vh] flex flex-col justify-end bg-neutral-950 py-24 overflow-hidden border-t border-white/5"
    >
      {/* Background with Chureito Pagoda, Mount Fuji and Cherry Blossoms at sunset/night */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=1500"
          alt="Pagoda and Cherry Blossoms"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1500";
          }}
          className="w-full h-full object-cover brightness-[0.5] contrast-[1.1]"
        />
        {/* Deep navy and twilight overlays to mimic the dark contrast from the screenshot */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/45 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-neutral-950 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Call to action */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-amber-500 text-xs tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'fr' ? 'Offre Limitée' : 'Group size limited to 12'}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-sans leading-tight tracking-tight text-white">
            {t.formHeading}
          </h2>

          <p className="text-white/70 max-w-lg font-sans text-sm md:text-base leading-relaxed">
            {language === 'fr'
              ? 'Laissez votre demande d\'information. Un spécialiste concevra votre itinéraire privatif sur-mesure gratuitement sous 24h. Pas d\'engagement, prix garanti pendant 14 jours.'
              : 'Our Japan experts will refine your personal itinerary matching your starting airport. Lock in this price lock with no setup commitments required today.'}
          </p>

          {/* Social media footer logos */}
          <div className="flex items-center gap-4 pt-4 text-xs text-white/40 font-mono">
            <span>© JAPAN TOURS CO.</span>
            <span>•</span>
            <span>OSAKA BRANCH</span>
            <span>•</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Right Side: Form Block Overlaid exactly as in screenshot */}
        <div className="lg:col-span-6">
          <div className="w-full max-w-md ml-auto bg-neutral-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative">
            
            {/* Header / Leaving request */}
            <div className="mb-8 text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold block mb-1">
                {t.formSubtitle}
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-sans tracking-wide text-white">
                {language === 'fr' ? 'Demander des informations' : 'Leave a request'}
              </h3>
            </div>

            {/* If request submitted */}
            {isSubmitted ? (
              <div className="space-y-6 text-center py-6 animate-fade-in">
                <div className="flex justify-center">
                  <div className="p-4 bg-amber-500/10 rounded-full border border-amber-500/30">
                    <CheckCircle2 className="w-12 h-12 text-amber-400 animate-bounce" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                    {t.successTitle}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t.successMsg}
                  </p>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="py-2.5 px-4 rounded-xl border border-white/20 text-white font-sans text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                  >
                    {language === 'fr' ? 'Faire une autre demande' : 'Submit Another Request'}
                  </button>
                </div>
              </div>
            ) : (
              // Actual Form Fields
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Name Input */}
                <div className="relative group text-left">
                  <input
                    id="input-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    className="w-full bg-transparent border-b border-white/20 focus:border-amber-500 py-3 text-sm focus:outline-none text-white peer transition-colors duration-300"
                  />
                  <label
                    htmlFor="input-name"
                    className="absolute left-0 top-3 text-white/50 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-amber-500"
                  >
                    {t.labelName}
                  </label>
                </div>

                {/* 2. Phone Input */}
                <div className="relative group text-left">
                  <input
                    id="input-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder=" "
                    className="w-full bg-transparent border-b border-white/20 focus:border-amber-500 py-3 text-sm focus:outline-none text-white peer transition-colors duration-300"
                  />
                  <label
                    htmlFor="input-phone"
                    className="absolute left-0 top-3 text-white/50 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-amber-500"
                  >
                    {t.labelPhone}
                  </label>
                </div>

                {/* 3. Comment Input */}
                <div className="relative group text-left">
                  <textarea
                    id="input-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder=" "
                    rows={2}
                    className="w-full bg-transparent border-b border-white/20 focus:border-amber-500 py-3 text-sm focus:outline-none text-white peer transition-colors duration-300 resize-none"
                  />
                  <label
                    htmlFor="input-comment"
                    className="absolute left-0 top-3 text-white/50 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-amber-500"
                  >
                    {t.labelComment}
                  </label>
                </div>

                {/* Hidden presets reference labels */}
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center justify-between text-[11px] text-white/50 font-mono">
                  <span>Hub: <b className="text-white">{departureCity}</b></span>
                  <span>Days: <b className="text-white">{durationDays}</b></span>
                  <span>Acc: <b className="text-white">{accommodationClass}</b></span>
                </div>

                {/* Submit button (exactly matches white look under cherry blossoms in screenshot) */}
                <button
                  id="form-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-neutral-100 disabled:bg-white/40 text-neutral-950 font-bold uppercase tracking-widest text-xs py-4 px-6 rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t.btnSend}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick dashboard shortcut portal for client requests */}
            {showAdminToggle && (
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onAdminToggle}
                  className="inline-flex items-center gap-2 text-xs text-amber-500 hover:text-amber-400 font-mono transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isAdminVisible ? t.hideRequests : t.viewRequests}</span>
                </button>
                <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-mono">
                  <Database className="w-3 h-3 text-green-500" />
                  <span>Live Sandbox DB</span>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
