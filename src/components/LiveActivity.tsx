import { useState, useEffect } from 'react';
import { Compass, Clock, Sun, Moon, Sparkles, Check, Heart, UserCheck, MessageSquare } from 'lucide-react';
import { Language } from '../types';

interface LiveActivityProps {
  language: Language;
}

export default function LiveActivity({ language }: LiveActivityProps) {
  const [tokyoTime, setTokyoTime] = useState('');
  const [isKyotoGuideActive, setIsKyotoGuideActive] = useState(true);
  const [isTokyoGuideActive, setIsTokyoGuideActive] = useState(true);
  const [activeGuideDetail, setActiveGuideDetail] = useState<'yuki' | 'kenji' | null>(null);
  const [likes, setLikes] = useState({ yuki: 248, kenji: 312 });
  const [hasLiked, setHasLiked] = useState({ yuki: false, kenji: false });

  // Update Tokyo Time every second (Japan is UTC+9)
  useEffect(() => {
    const updateTokyoTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      
      const now = new Date();
      const tokyoString = now.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', options);
      setTokyoTime(tokyoString);
    };

    updateTokyoTime();
    const interval = setInterval(updateTokyoTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  // Determine if it is day or night in Tokyo to show a representative icon
  const isTokyoDaytime = () => {
    const now = new Date();
    // Get Japan hour specifically
    const japanHour = parseInt(
      now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour12: false, hour: '2-digit' })
    );
    return japanHour >= 6 && japanHour < 18;
  };

  const handleLike = (guide: 'yuki' | 'kenji') => {
    if (hasLiked[guide]) return;
    setLikes(prev => ({ ...prev, [guide]: prev[guide] + 1 }));
    setHasLiked(prev => ({ ...prev, [guide]: true }));
  };

  return (
    <section id="live-activity-section" className="bg-neutral-950 text-white py-16 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Light soft flare */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header segment of the Live deck */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="text-left space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold block">
              {language === 'fr' ? 'La présence humaine sur le terrain' : 'Humanized local touch'}
            </span>
            <h3 className="text-2xl md:text-4xl font-black font-sans tracking-tight">
              {language === 'fr' ? 'Des guides réels, à tout instant' : 'Interactive Ground Assistance'}
            </h3>
            <p className="text-white/60 text-sm max-w-xl">
              {language === 'fr'
                ? 'Rencontrez nos accompagnateurs officiels certifiés, basés à Kyoto et Tokyo. Suivez leur disponibilité en direct.'
                : 'Say hello to our handpicked tour designers currently active on site. Real people, real experience.'}
            </p>
          </div>

          {/* Tokyo Dynamic clock widget */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-lg backdrop-blur-md">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500 animate-pulse">
              {isTokyoDaytime() ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <div className="text-left font-mono">
              <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold">
                {language === 'fr' ? 'Heure locale à Tokyo (UTC+9)' : 'Tokyo local time (UTC+9)'}
              </span>
              <span className="text-xl font-bold tracking-wider text-white">
                {tokyoTime || '09:00:00 AM'}
              </span>
              <span className="block text-[9px] text-emerald-400 mt-0.5">
                ● {language === 'fr' ? 'Saison printanière idéale' : 'Idyllic cherry transition weather'}
              </span>
            </div>
          </div>
        </div>

        {/* Guides Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Guide 1: Yuki */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 hover:border-amber-500/40 transition-all duration-300 shadow-xl group">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0 self-center">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
                alt="Yuki Okada"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-emerald-500/80 backdrop-blur-md text-white font-mono text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>ACTIVE</span>
              </div>
            </div>

            <div className="flex-grow text-left flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
                  {language === 'fr' ? 'Co-fondatrice & Guide Senior' : 'Co-founder & Senior Kyoto Host'}
                </span>
                <h4 className="text-xl font-bold text-white">Yuki Okada</h4>
                <p className="text-white/70 text-xs leading-relaxed font-sans">
                  {language === 'fr'
                    ? 'Passionnée par les temples secrets de Kyoto, Yuki adore faire découvrir aux voyageurs des petits cafés cachés à Gion et organiser des cérémonies de thé intimes.'
                    : 'A native Kyoto historian specialized in culinary strolls and Zen philosophy. She ensures your walk through Gion feels deeply authentic.'}
                </p>
              </div>

              {/* Interaction zone */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-4">
                <button
                  onClick={() => handleLike('yuki')}
                  className={`flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer ${
                    hasLiked.yuki ? 'text-red-500' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked.yuki ? 'fill-current' : ''}`} />
                  <span>{likes.yuki}</span>
                </button>
                <button
                  onClick={() => setActiveGuideDetail(activeGuideDetail === 'yuki' ? null : 'yuki')}
                  className="flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'fr' ? "Voir l'avis" : 'Read quote'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Guide 2: Kenji */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 hover:border-orange-500/40 transition-all duration-300 shadow-xl group">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0 self-center">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
                alt="Kenji Sato"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-emerald-500/80 backdrop-blur-md text-white font-mono text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>ONLINE</span>
              </div>
            </div>

            <div className="flex-grow text-left flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold block">
                  {language === 'fr' ? 'Logisticien & Guide Tokyo' : 'Logistics expert & Tokyo Specialist'}
                </span>
                <h4 className="text-xl font-bold text-white">Kenji Sato</h4>
                <p className="text-white/70 text-xs leading-relaxed font-sans">
                  {language === 'fr'
                    ? 'Expert des Shinkansen et de la gastronomie tokyoïte. Kenji connaît les meilleurs endroits pour manger du ramen à Shibuya et sécurise vos transferts prioritaires.'
                    : 'A metro-connectivity pro with deep love for Tokyo electronic-scenes. He will guide you to our pre-screened Izakayas and neon routes with ease.'}
                </p>
              </div>

              {/* Interaction zone */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-4">
                <button
                  onClick={() => handleLike('kenji')}
                  className={`flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer ${
                    hasLiked.kenji ? 'text-red-500' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked.kenji ? 'fill-current' : ''}`} />
                  <span>{likes.kenji}</span>
                </button>
                <button
                  onClick={() => setActiveGuideDetail(activeGuideDetail === 'kenji' ? null : 'kenji')}
                  className="flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'fr' ? "Voir l'avis" : 'Read quote'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic quote detail drawer when a guide is selected */}
        {activeGuideDetail && (
          <div className="mt-6 p-4 rounded-xl border border-amber-500/35 bg-amber-500/5 text-left text-xs text-white/90 animate-fade-in">
            {activeGuideDetail === 'yuki' ? (
              <p>
                🌸 <b>Yuki:</b> "{language === 'fr' 
                  ? "Chaque printemps, je veille personnellement à adapter les horaires de visite pour admirer la floraison des cerisiers à Kyoto sans la foule. J'ai hâte de vous rencontrer et de partager une tasse de matcha traditionnelle !" 
                  : "Every season, I fine-tune our routes dynamically based on cherry transitions or autumn leaf peaks to bypass heavy tour crowds. Looking forward to meeting you!"
                }"
              </p>
            ) : (
              <p>
                ⚡ <b>Kenji:</b> "{language === 'fr'
                  ? "Vous n'avez pas à porter vos valises d'une ville à l'autre ! On s'occupe de l'expédition de vos bagages par service rapide Takkyubin pendant que vous voyagez léger en train à grande vitesse."
                  : "No lugging heavy suitcases across stations! We direct-ship your bags between hotels via premium Takkyubin Express, so you travel fast and light on the Shinkansen."
                }"
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
