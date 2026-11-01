import React, { useState, useEffect } from 'react';
import { Calendar, Heart, MapPin, Sparkles, Download, ArrowDown, Clock } from 'lucide-react';
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
PRODID:-//Eniola and Oluwaseyi Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Holy Matrimony & Engagement - Eniola & Oluwaseyi #DesignersMeet
DESCRIPTION:Join us for the Engagement Ceremony and Holy Matrimony of Falola Abisola Eniola & Adebiyi Peter Oluwaseyi (#DesignersMeet).
LOCATION:JJ & Jaz Event Center, Taoheed Road, Basin, Ilorin, Kwara State, Nigeria
DTSTART:20261107T100000Z
DTEND:20261107T200000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Eniola_and_Oluwaseyi_DesignersMeet_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 overflow-hidden bg-[#240408]">
      {/* Background Hero Picture with Deep Wine & Amber Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="./photos/outdoor-umbrella.jpg"
          alt="Eniola & Oluwaseyi #DesignersMeet"
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.08] scale-105 transform animate-pulse duration-[14000ms]"
        />
        {/* Multilayered Luxury Gradients for Maximum Legibility and Drama */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#240408] via-[#380A11]/75 to-black/85"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#240408]/90 via-transparent to-[#240408]/90"></div>
        {/* Subtle royal pattern */}
        <div className="absolute inset-0 wine-pattern opacity-30 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Royal Monogram Crest */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] bg-[#380A11]/90 backdrop-blur-md flex items-center justify-center text-[#F5E19A] shadow-2xl mb-6 animate-float">
          <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-widest">
            {WEDDING_COUPLE.monogram}
          </span>
        </div>

        {/* Hashtag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#380A11]/90 text-[#F5E19A] text-xs sm:text-sm font-medium mb-4 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-mono tracking-widest uppercase font-bold text-[#F5E19A]">
            {WEDDING_COUPLE.hashtag}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97724]"></span>
          <span className="text-stone-300 font-serif-luxury italic">A Celebration of Love &amp; Destiny</span>
        </div>

        {/* Honor to Parents Request */}
        <p className="text-stone-300 text-xs sm:text-sm md:text-base max-w-2xl font-serif-luxury italic tracking-wide mb-3 leading-relaxed">
          The families of <span className="text-[#F5E19A] font-semibold">Elder &amp; Deaconess B.J Falola</span> and{' '}
          <span className="text-[#F5E19A] font-semibold">Late Senior Apostle &amp; Mrs Joshua Adebiyi</span> joyfully request the honour of your presence at the Holy Matrimony of their beloved children
        </p>

        {/* Main Couple Names */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none my-2 drop-shadow-2xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E19A] to-[#D4AF37]">
            ENIOLA
          </span>
          <span className="block sm:inline font-script-luxury text-4xl sm:text-5xl md:text-6xl text-[#D97724] mx-3">
            &amp;
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5E19A] to-white">
            OLUWASEYI
          </span>
        </h1>

        {/* Full Formal Names */}
        <p className="text-[#EFE3D5] text-xs sm:text-sm tracking-widest uppercase font-mono font-medium mt-1 mb-6">
          Falola Abisola Eniola &amp; Adebiyi Peter Oluwaseyi
        </p>

        {/* Event Key Highlights Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-stone-200 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#D4AF37]/30 mb-8 shadow-2xl">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-semibold text-white">Saturday, 07 November 2026</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D97724]" />
            <span className="font-semibold text-white">11:00 AM Prompt</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C85023]" />
            <span className="text-stone-300">JJ &amp; Jaz Event Center, Ilorin, Kwara State</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="w-full max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] block mb-3 font-semibold">
            Counting Down to Forever
          </span>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#380A11]/90 to-[#240408]/90 border border-[#D4AF37]/40 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md"
              >
                <span className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-bold text-[#F5E19A] block leading-none">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-stone-300 mt-1 block">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: RSVP & Calendar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#rsvp"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold tracking-wide bg-gradient-to-r from-[#D4AF37] via-[#F5E19A] to-[#D97724] text-[#240408] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 shadow-2xl cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-[#240408]" />
            <span>RSVP &amp; Get VIP Gate Pass</span>
          </a>

          <button
            onClick={downloadCalendarFile}
            className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-medium border border-white/25 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#D4AF37]" />
            <span>Add to Calendar (.ics)</span>
          </button>
        </div>

        {/* Scroll prompt */}
        <div className="mt-12 text-stone-400 text-xs flex flex-col items-center gap-1 animate-bounce">
          <span className="tracking-widest uppercase text-[10px]">Explore Wedding Details</span>
          <ArrowDown className="w-4 h-4 text-[#D4AF37]" />
        </div>
      </div>
    </section>
  );
};
