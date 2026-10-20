import React, { useState, useEffect } from 'react';
import { Calendar, Heart, MapPin, Sparkles, Download, ArrowDown } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_COUPLE.countdownTarget).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const downloadCalendarFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Melvin & Chidimma Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Traditional Wedding (Igba Nkwu) - Melvin & Chidimma #MELWED2026
DESCRIPTION:Join us for the Traditional Wine Carrying Ceremony (Igba Nkwu Nwanyi) of Melvin Okafor & Chidimma Eze.
LOCATION:Independence Layout, Enugu, Nigeria
DTSTART:20261218T110000Z
DTEND:20261218T200000Z
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:Holy Matrimony & Reception - Melvin & Chidimma #MELWED2026
DESCRIPTION:Holy Matrimony and Royal Reception Banquet for Melvin & Chidimma.
LOCATION:Holy Ghost Cathedral & The Monarch Palace Ballroom, Enugu
DTSTART:20261220T090000Z
DTEND:20261220T210000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Melvin_and_Chidimma_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden bg-[#072418]">
      {/* Background with Ambient Overlay and Traditional Subtle Texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/igbo-couple-igbankwu.jpg"
          alt="Melvin and Chidimma Igbo Wedding Celebration"
          className="w-full h-full object-cover object-top opacity-35 filter brightness-75 scale-105 transform animate-pulse duration-[12000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3824] via-[#0A3824]/80 to-black/75"></div>
        {/* Subtle Gold Dust Sparkle Overlay */}
        <div className="absolute inset-0 igbo-pattern opacity-40 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Igbo Cultural Royal Salutation */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#0A3824]/80 text-[#F9E498] text-xs sm:text-sm font-medium mb-6 shadow-inner animate-float">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="tracking-widest uppercase text-[11px] sm:text-xs">
            Nnọọ Nụ! • The Royal Igbo Union
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E2583E]"></span>
          <span className="text-white/80 font-serif-luxury italic">#MELWED2026</span>
        </div>

        {/* Honor to Parents / Ancestral Call */}
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl font-serif-luxury italic tracking-wider mb-2">
          Together with their families, Chief &amp; Lolo Emmanuel Eze and Mr. &amp; Mrs. Kenneth Okafor, joyfully request the honor of your presence
        </p>

        {/* Bride & Groom Name Display - Ultra Luxury Editorial */}
        <div className="my-3 sm:my-5">
          <span className="block font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Melvin Chukwudi
          </span>
          <div className="flex items-center justify-center gap-4 my-1 sm:my-2">
            <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]"></span>
            <span className="font-script-luxury text-4xl sm:text-6xl md:text-7xl text-[#D4AF37] leading-none px-2">
              &amp;
            </span>
            <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]"></span>
          </div>
          {/* Prominent display of the Bride's name */}
          <span className="block font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9E498] tracking-tight">
            Chidimma Precious
          </span>
          <span className="inline-block mt-2 text-xs uppercase tracking-[0.3em] text-[#E2583E] font-semibold">
            (Ada Eze • Queen of Mel's Heart)
          </span>
        </div>

        {/* Date & Dual Venues Tag */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-white text-xs sm:text-sm font-medium mt-2 mb-8 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-1.5 text-[#F9E498]">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>Dec 18 &amp; 20, 2026</span>
          </div>
          <span className="text-[#D4AF37]">•</span>
          <div className="flex items-center gap-1.5 text-stone-200">
            <MapPin className="w-4 h-4 text-[#E2583E]" />
            <span>Independence Layout, Enugu</span>
          </div>
          <span className="text-[#D4AF37] hidden sm:inline">•</span>
          <div className="text-stone-300 hidden sm:block">
            Traditional (Igba Nkwu) &amp; White Wedding
          </div>
        </div>

        {/* Countdown Timer with Igbo Accents */}
        <div className="w-full max-w-xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
            Counting Down to Forever
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0A3824]/90 border border-[#D4AF37]/40 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 backdrop-blur-md shadow-xl flex flex-col items-center justify-center transform hover:scale-105 transition-transform"
              >
                <span className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#F9E498]/80 font-medium mt-0.5 sm:mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <a
            href="#rsvp"
            className="w-full sm:w-auto flex-1 px-8 py-3.5 rounded-full text-sm font-bold tracking-wide bg-gradient-to-r from-[#D4AF37] via-[#ECC867] to-[#AA771C] text-[#0A3824] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <Heart className="w-4 h-4 fill-[#0A3824]" />
            <span>RSVP / Register Attendance</span>
          </a>

          <button
            onClick={downloadCalendarFile}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-medium tracking-wide bg-white/10 hover:bg-white/20 text-white border border-[#D4AF37]/50 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#D4AF37]" />
            <span>Save to Calendar</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <a
          href="#story"
          className="mt-12 text-stone-400 hover:text-[#D4AF37] flex flex-col items-center gap-1 text-xs tracking-widest uppercase transition-colors"
        >
          <span>Explore The Celebration</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
        </a>
      </div>
    </section>
  );
};
