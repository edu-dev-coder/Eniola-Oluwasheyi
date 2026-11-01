import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Car, Sparkles, CheckCircle2, Shirt, Palette } from 'lucide-react';
import { WEDDING_EVENTS, WEDDING_COLORS } from '../data/weddingData';

export const EventsProgram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'traditional' | 'white'>('traditional');

  const currentEvent = WEDDING_EVENTS.find((e) => e.id === activeTab) || WEDDING_EVENTS[0];

  return (
    <section id="events" className="py-24 px-4 sm:px-6 lg:px-8 bg-white text-[#2C2723] relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#380A11] bg-[#380A11]/10 px-4 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D97724]" />
            <span>Itinerary &amp; Locations</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#380A11] tracking-tight">
            Order of Events &amp; Celebration
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#380A11] via-[#D97724] to-[#D4AF37] mx-auto my-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base">
            Join us on <span className="font-semibold text-stone-900">Saturday, November 7, 2026</span> at the JJ &amp; Jaz Event Center, Ilorin, Kwara State.
          </p>
        </div>

        {/* Tab Toggle Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#FAF7F2] p-1.5 rounded-full border border-[#D4AF37]/40 shadow-inner inline-flex max-w-full">
            <button
              onClick={() => setActiveTab('traditional')}
              className={`px-5 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'traditional'
                  ? 'bg-[#380A11] text-[#F5E19A] shadow-md'
                  : 'text-stone-600 hover:text-[#380A11]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#D97724]"></span>
              <span>1. Engagement &amp; Solemnization (11:00 AM)</span>
            </button>

            <button
              onClick={() => setActiveTab('white')}
              className={`px-5 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'white'
                  ? 'bg-[#380A11] text-[#F5E19A] shadow-md'
                  : 'text-stone-600 hover:text-[#380A11]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#C85023]"></span>
              <span>2. Reception &amp; Party (03:30 PM)</span>
            </button>
          </div>
        </div>

        {/* Event Banner Card */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-xl mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Event Summary Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D97724] block mb-1 font-mono">
                  {currentEvent.nativeTitle}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#380A11]">
                  {currentEvent.title}
                </h3>
              </div>

              {/* Date & Time Pills */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#380A11]/10 text-[#380A11] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#380A11]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-semibold">Date</span>
                    <span className="text-sm font-bold text-[#380A11]">{currentEvent.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#D97724]/10 text-[#D97724] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#D97724]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-semibold">Time</span>
                    <span className="text-sm font-bold text-[#380A11]">{currentEvent.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#C85023]/10 text-[#C85023] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#C85023]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-semibold">Venue</span>
                    <span className="text-sm font-bold text-[#380A11] block">{currentEvent.venueName}</span>
                    <span className="text-xs text-stone-600 block mt-0.5">{currentEvent.venueAddress}, {currentEvent.city}</span>
                  </div>
                </div>
              </div>

              {/* Dress Code & Palette */}
              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#380A11] mb-2 font-mono">
                  <Shirt className="w-4 h-4 text-[#D97724]" />
                  <span>Dress Code &amp; Guest Attire</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed mb-4">
                  {currentEvent.dressCode}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {WEDDING_COLORS.map((col, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200" title={col.name}>
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                        style={{ backgroundColor: col.hex }}
                      ></span>
                      <span className="text-[10px] font-medium text-stone-700">{col.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue Quick Actions */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href={currentEvent.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-[#380A11] text-[#F5E19A] hover:bg-[#52131D] transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Google Maps Directions</span>
                </a>

                <a
                  href={`https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${encodeURIComponent(
                    'JJ & Jaz event center taoheed road, Basin Ilorin, Kwara State'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-xs font-medium border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Car className="w-3.5 h-3.5 text-black" />
                  <span>Ride to Venue</span>
                </a>
              </div>
            </div>

            {/* Step-by-Step Schedule */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
              <h4 className="font-serif-luxury text-xl font-bold text-[#380A11] mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D97724]" />
                <span>Ceremonial Schedule &amp; Order of Events</span>
              </h4>

              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {currentEvent.itinerary.map((item, idx) => (
                  <div key={idx} className="relative pl-10">
                    <span className="absolute left-2.5 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-[#380A11] border-2 border-white shadow flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C85023] sm:w-24 shrink-0 font-mono">
                        {item.time}
                      </span>
                      <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#380A11]">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed sm:pl-24">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Important Notes */}
              {currentEvent.importantNotes && (
                <div className="mt-8 pt-6 border-t border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2 font-mono">
                    Important Notice to Guests:
                  </span>
                  <ul className="space-y-2">
                    {currentEvent.importantNotes.map((note, idx) => (
                      <li key={idx} className="text-xs text-stone-600 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#380A11] shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wedding Colors Visual Showcase */}
        <div id="colors" className="my-16 bg-gradient-to-br from-[#380A11] via-[#240408] to-[#1a0205] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/40 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97724]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#F5E19A] bg-white/10 px-4 py-1.5 rounded-full mb-3">
              <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Official Wedding Colors</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5E19A]">
              The #DesignersMeet Color Palette
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2">
              Our celebration is styled in five rich, warm, and royal tones. We warmly welcome our guests to celebrate with us in any combination of these shades:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {WEDDING_COLORS.map((col, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col items-center text-center hover:scale-105 transition-transform"
              >
                <div
                  className="w-16 h-16 rounded-2xl shadow-xl border-2 border-white/40 mb-3"
                  style={{ backgroundColor: col.hex }}
                ></div>
                <h4 className="font-serif-luxury text-lg font-bold text-white mb-1">
                  {col.name}
                </h4>
                <span className="font-mono text-xs text-[#F5E19A] uppercase mb-2">
                  {col.hex}
                </span>
                <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                  {col.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Venue & Map Details */}
        <div id="venues" className="scroll-mt-24">
          <div className="text-center mb-6">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#380A11]">
              Venue &amp; Location Guide
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              JJ &amp; Jaz Event Center, Taoheed Road, Basin, Ilorin, Kwara State
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-stone-100 relative h-80 sm:h-96">
            <iframe
              title="Wedding Venue Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.52293452281!2d4.5510!3d8.4850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10364d1234567890%3A0x123456789abcdef!2sBasin%2C%20Ilorin%2C%20Kwara!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Overlay card for mobile map */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-xl flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C85023] font-bold block font-mono">
                  Ceremony &amp; Reception Venue
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#380A11] line-clamp-1">
                  JJ &amp; Jaz Event Center
                </span>
                <span className="text-[11px] text-stone-600 block">
                  Taoheed Road, Basin, Ilorin, Kwara State
                </span>
              </div>
              <a
                href={currentEvent.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3.5 py-2 rounded-xl bg-[#380A11] text-[#F5E19A] text-xs font-bold hover:bg-[#52131D] transition-colors shadow"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
