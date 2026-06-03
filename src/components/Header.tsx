import { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onBookClick: () => void;
}

export default function Header({ language, setLanguage, onBookClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          id="logo-button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Globe className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-sans font-semibold tracking-widest text-white text-lg uppercase transition-all duration-300 group-hover:text-amber-500">
            JAPAN TOURS
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          <button
            id="nav-about"
            onClick={() => scrollToSection('about-section')}
            className="text-white/80 hover:text-white font-sans text-sm tracking-widest uppercase transition-colors duration-200 cursor-pointer"
          >
            {t.navAbout}
          </button>
          <button
            id="nav-included"
            onClick={() => scrollToSection('included-section')}
            className="text-white/80 hover:text-white font-sans text-sm tracking-widest uppercase transition-colors duration-200 cursor-pointer"
          >
            {t.navIncluded}
          </button>
          <button
            id="nav-contacts"
            onClick={() => scrollToSection('contacts-section')}
            className="text-white/80 hover:text-white font-sans text-sm tracking-widest uppercase transition-colors duration-200 cursor-pointer"
          >
            {t.navContacts}
          </button>
        </nav>

        {/* Right Controls */}
        <div id="header-right-controls" className="hidden md:flex items-center gap-6">
          {/* Language Toggle */}
          <div className="flex bg-white/5 p-1 rounded-full border border-white/15">
            <button
              id="lang-en"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              id="lang-fr"
              onClick={() => setLanguage('fr')}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                language === 'fr'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              FR
            </button>
          </div>

          {/* Book CTA */}
          <button
            id="header-book-button"
            onClick={onBookClick}
            className="px-6 py-2 rounded-full border border-white/40 text-white font-sans text-xs tracking-wider uppercase hover:bg-white hover:text-neutral-950 hover:border-white transition-all duration-300 cursor-pointer"
          >
            {t.bookBtn}
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="text-xs font-bold tracking-widest border border-white/20 bg-white/5 hover:bg-white/10 text-white px-2 py-1 rounded-md"
          >
            {language.toUpperCase()}
          </button>
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-amber-500 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-panel"
          className="md:hidden fixed inset-x-0 top-[60px] bg-neutral-950/95 backdrop-blur-xl border-b border-white/15 h-[calc(100vh-60px)] z-40 p-8 flex flex-col justify-start gap-8"
        >
          <button
            onClick={() => scrollToSection('about-section')}
            className="text-white hover:text-amber-500 text-lg tracking-widest text-left font-sans uppercase font-medium border-b border-white/10 pb-4"
          >
            {t.navAbout}
          </button>
          <button
            onClick={() => scrollToSection('included-section')}
            className="text-white hover:text-amber-500 text-lg tracking-widest text-left font-sans uppercase font-medium border-b border-white/10 pb-4"
          >
            {t.navIncluded}
          </button>
          <button
            onClick={() => scrollToSection('contacts-section')}
            className="text-white hover:text-amber-500 text-lg tracking-widest text-left font-sans uppercase font-medium border-b border-white/10 pb-4"
          >
            {t.navContacts}
          </button>

          <button
            onClick={onBookClick}
            className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold tracking-wider py-3 px-6 rounded-lg uppercase transition-all text-center"
          >
            {t.bookBtn}
          </button>
        </div>
      )}
    </header>
  );
}
