import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Car, Sparkles, CheckCircle2, Shirt } from 'lucide-react';
import { WEDDING_EVENTS } from '../data/weddingData';

export const EventsProgram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'traditional' | 'white'>('traditional');

  const currentEvent = WEDDING_EVENTS.find((e) => e.id === activeTab) || WEDDING_EVENTS[0];

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-[#2C2723] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#0A3824] bg-[#0A3824]/10 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Itinerary &amp; Locations</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A3824] tracking-tight">
            Program of Events
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-4"></div>
          <p className="text-stone-600 text-sm sm:text-base">
            Detailed timelines and venues for both our Traditional Marriage (Igba Nkwu) and Holy Matrimony.
          </p>
        </div>

        {/* Tab Toggle Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#FAF7F2] p-1.5 rounded-full border border-[#D4AF37]/40 shadow-inner inline-flex max-w-full">
            <button
              onClick={() => setActiveTab('traditional')}
              className={`px-5 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                activeTab === 'traditional'
                  ? 'bg-[#0A3824] text-[#F9E498] shadow-md'
                  : 'text-stone-600 hover:text-[#0A3824]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#E2583E]"></span>
              <span>1. Traditional (Igba Nkwu)</span>
            </button>

            <button
              onClick={() => setActiveTab('white')}
              className={`px-5 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                activeTab === 'white'
                  ? 'bg-[#0A3824] text-[#F9E498] shadow-md'
                  : 'text-stone-600 hover:text-[#0A3824]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              <span>2. White Wedding &amp; Reception</span>
            </button>
          </div>
        </div>

        {/* Event Banner Card */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-xl mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Event Summary Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E2583E] block mb-1">
                  {currentEvent.nativeTitle}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#0A3824]">
                  {currentEvent.title}
                </h3>
              </div>

              {/* Date & Time Pills */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                  <div className="w-10 h-10 rounded-lg bg-[#0A3824]/10 text-[#0A3824] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#0A3824]" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider block">Date</span>
                    <span className="text-sm font-bold text-[#0A3824]">{currentEvent.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                  <div className="w-10 h-10 rounded-lg bg-[#0A3824]/10 text-[#0A3824] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#0A3824]" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider block">Time</span>
                    <span className="text-sm font-bold text-[#0A3824]">{currentEvent.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200">
                  <div className="w-10 h-10 rounded-lg bg-[#E2583E]/10 text-[#E2583E] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#E2583E]" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider block">Venue</span>
                    <span className="text-sm font-bold text-[#0A3824] block">{currentEvent.venueName}</span>
                    <span className="text-xs text-stone-600 block mt-0.5">{currentEvent.venueAddress}, {currentEvent.city}</span>
                  </div>
                </div>
              </div>

              {/* Dress Code & Palette */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3824] mb-2">
                  <Shirt className="w-4 h-4 text-[#D4AF37]" />
                  <span>Dress Code &amp; Colors</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed mb-3">
                  {currentEvent.dressCode}
                </p>
                <div className="flex items-center gap-2">
                  {currentEvent.colorPalette.map((col, idx) => (
                    <div key={idx} className="flex items-center gap-1.5" title={col.name}>
                      <span
                        className="w-5 h-5 rounded-full border border-stone-300 shadow-sm"
                        style={{ backgroundColor: col.hex }}
                      ></span>
                      <span className="text-[11px] text-stone-600 hidden sm:inline">{col.name}</span>
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
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#0A3824] text-[#F9E498] hover:bg-[#0D4A30] transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  href={`https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${encodeURIComponent(
                    currentEvent.venueName + ', ' + currentEvent.city
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl text-xs font-medium border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Car className="w-3.5 h-3.5 text-black" />
                  <span>Ride with Uber</span>
                </a>
              </div>
            </div>

            {/* Step-by-Step Cultural Itinerary */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
              <h4 className="font-serif-luxury text-xl font-bold text-[#0A3824] mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Ceremonial Schedule &amp; Order of Events</span>
              </h4>

              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {currentEvent.itinerary.map((item, idx) => (
                  <div key={idx} className="relative pl-10">
                    <span className="absolute left-2.5 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0A3824] border-2 border-white shadow flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E2583E] sm:w-24 shrink-0">
                        {item.time}
                      </span>
                      <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#0A3824]">
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
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                    Notice to Guests:
                  </span>
                  <ul className="space-y-1.5">
                    {currentEvent.importantNotes.map((note, idx) => (
                      <li key={idx} className="text-xs text-stone-600 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0A3824] shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Google Map Section */}
        <div id="venues" className="scroll-mt-24">
          <div className="text-center mb-6">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#0A3824]">
              Interactive Venue Map
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Find your way to Independence Layout &amp; Holy Ghost Cathedral, Enugu
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-stone-100 relative h-80 sm:h-96">
            <iframe
              title="Wedding Venue Google Maps"
              src={currentEvent.mapEmbedUrl}
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Overlay card for mobile map */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-xl flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#E2583E] font-bold block">
                  Current Selected Location
                </span>
                <span className="text-xs font-bold text-[#0A3824] line-clamp-1">
                  {currentEvent.venueName}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  {currentEvent.city}
                </span>
              </div>
              <a
                href={currentEvent.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1.5 rounded-lg bg-[#0A3824] text-[#F9E498] text-xs font-bold hover:bg-[#0D4A30] transition-colors"
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
