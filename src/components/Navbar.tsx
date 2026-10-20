import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Music, VolumeX, Sparkles, UserCheck } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface NavbarProps {
  onOpenPlanner: () => void;
  guestCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPlanner, guestCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    if (isPlayingMusic) {
      weddingAudio.stop();
      setIsPlayingMusic(false);
    } else {
      const started = weddingAudio.start();
      if (started) setIsPlayingMusic(true);
    }
  };

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Events & Program', href: '#events' },
    { label: 'Venues & Map', href: '#venues' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Prayers & Wishes', href: '#wishes' },
    { label: 'Gift Registry', href: '#gifting' },
    { label: 'Guest List', href: '#registry' },
    { label: 'Aso-Ebi & Attire', href: '#attire' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#082F1E]/95 backdrop-blur-md py-3 shadow-lg border-b border-[#D4AF37]/30 text-white'
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="Home"
          >
            <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#0A3824]/80 text-[#D4AF37] shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-serif-luxury text-lg font-bold">M&C</span>
            </div>
            <div>
              <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-wide block leading-tight text-[#F9E498]">
                Melvin &amp; Chidimma
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1">
                <span>#MELWED2026</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#E2583E]"></span>
                <span className="hidden sm:inline">IGBO ROYALTY</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-stone-200 hover:text-[#D4AF37] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4AF37] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Music, Planner, RSVP */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-full border transition-all flex items-center gap-1.5 text-xs font-medium ${
                isPlayingMusic
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F9E498] animate-pulse'
                  : 'border-white/20 bg-black/30 text-stone-300 hover:border-[#D4AF37]/50'
              }`}
              title={isPlayingMusic ? 'Mute Celebration Melody' : 'Play Celebration Melody'}
              aria-label="Toggle ambient melody"
            >
              {isPlayingMusic ? (
                <>
                  <Music className="w-4 h-4 text-[#D4AF37]" />
                  <span className="hidden md:inline text-[11px]">Music Playing</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden md:inline text-[11px]">Play Melody</span>
                </>
              )}
            </button>

            {/* Planner Portal Trigger */}
            <button
              onClick={onOpenPlanner}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#0A3824]/60 text-[#F3E5AB] text-xs hover:bg-[#0A3824] transition-colors"
              title="Wedding Planner Dashboard"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-medium">Planner ({guestCount})</span>
            </button>

            {/* Direct RSVP CTA */}
            <a
              href="#rsvp"
              onClick={(e) => handleLinkClick(e, '#rsvp')}
              className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-[#D4AF37] via-[#ECC867] to-[#AA771C] text-[#0A3824] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 shadow-md"
            >
              <Heart className="w-3.5 h-3.5 fill-[#0A3824]" />
              <span>RSVP</span>
            </a>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:text-[#D4AF37] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden flex flex-col justify-between pt-20 pb-8 px-6">
          <div className="flex flex-col gap-4 mt-4">
            <div className="text-center pb-4 border-b border-white/10">
              <span className="font-script-luxury text-3xl text-[#D4AF37]">Melvin &amp; Chidimma</span>
              <p className="text-xs text-stone-300 mt-1 uppercase tracking-widest">
                Traditional &amp; White Wedding 2026
              </p>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-lg font-serif-luxury text-stone-100 hover:text-[#D4AF37] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]/50" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner();
              }}
              className="w-full py-2.5 rounded-lg border border-[#D4AF37]/40 bg-[#0A3824] text-[#F3E5AB] text-sm flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Wedding Planner Portal ({guestCount} Guests)</span>
            </button>

            <a
              href="#rsvp"
              onClick={(e) => handleLinkClick(e, '#rsvp')}
              className="w-full py-3 rounded-full text-center text-sm font-bold bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#0A3824] shadow-lg flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-[#0A3824]" />
              <span>Register Attendance (RSVP)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
