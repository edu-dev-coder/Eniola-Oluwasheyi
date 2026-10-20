import React, { useState } from 'react';
import { Users, Search, Music, CheckCircle, ShieldCheck } from 'lucide-react';
import type { GuestRSVP } from '../types/wedding';

interface GuestRegistryProps {
  rsvps: GuestRSVP[];
}

export const GuestRegistry: React.FC<GuestRegistryProps> = ({ rsvps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'both' | 'traditional' | 'white'>('all');

  const filteredGuests = rsvps
    .filter((g) => g.attending !== 'declined')
    .filter((g) => {
      if (filterType === 'all') return true;
      if (filterType === 'both') return g.attending === 'both';
      return g.attending === filterType;
    })
    .filter((g) => {
      const q = searchTerm.toLowerCase();
      return (
        g.name.toLowerCase().includes(q) ||
        (g.guestNames && g.guestNames.toLowerCase().includes(q)) ||
        g.passCode.toLowerCase().includes(q)
      );
    });

  const totalHeadcount = rsvps
    .filter((g) => g.attending !== 'declined')
    .reduce((sum, g) => sum + (g.partySize || 1), 0);

  const traditionalCount = rsvps
    .filter((g) => g.attending === 'both' || g.attending === 'traditional')
    .reduce((sum, g) => sum + (g.partySize || 1), 0);

  const whiteCount = rsvps
    .filter((g) => g.attending === 'both' || g.attending === 'white')
    .reduce((sum, g) => sum + (g.partySize || 1), 0);

  return (
    <section id="registry" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#2C2723]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#0A3824] bg-[#0A3824]/10 px-3.5 py-1.5 rounded-full mb-3">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Honored Attendees</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A3824] tracking-tight">
            Guest Attendance Registry
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-4"></div>
          <p className="text-stone-600 text-sm sm:text-base">
            See the distinguished elders, family members, colleagues, and cherished friends who have confirmed attendance to celebrate with Melvin &amp; Chidimma.
          </p>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A3824]/10 text-[#0A3824] flex items-center justify-center font-serif-luxury font-bold text-xl shrink-0">
              {totalHeadcount}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-bold block">
                Total Confirmed Guests
              </span>
              <span className="text-xs text-stone-600">Celebrating across both events</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E2583E]/10 text-[#E2583E] flex items-center justify-center font-serif-luxury font-bold text-xl shrink-0">
              {traditionalCount}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E2583E] font-bold block">
                Traditional Marriage (Igba Nkwu)
              </span>
              <span className="text-xs text-stone-600">Friday, Dec 18, 2026</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#AA771C] flex items-center justify-center font-serif-luxury font-bold text-xl shrink-0">
              {whiteCount}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#AA771C] font-bold block">
                Holy Matrimony &amp; Reception
              </span>
              <span className="text-xs text-stone-600">Sunday, Dec 20, 2026</span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guest or pass code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3824]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Attendees' },
              { id: 'both', label: 'Both Events' },
              { id: 'traditional', label: 'Traditional Only' },
              { id: 'white', label: 'White Wedding Only' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterType === tab.id
                    ? 'bg-[#0A3824] text-[#F9E498]'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuests.length > 0 ? (
            filteredGuests.map((guest) => (
              <div
                key={guest.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-[#D4AF37]/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#0A3824]/10 text-[#0A3824] font-bold text-xs flex items-center justify-center shrink-0">
                        {guest.name.charAt(0)}
                      </div>
                      <h4 className="font-serif-luxury font-bold text-base text-[#0A3824] leading-snug line-clamp-1">
                        {guest.name}
                      </h4>
                    </div>
                    <span className="shrink-0 text-[10px] font-mono font-bold bg-[#FAF7F2] text-[#E2583E] px-2 py-0.5 rounded border border-stone-200">
                      {guest.passCode}
                    </span>
                  </div>

                  {guest.guestNames && (
                    <p className="text-xs text-stone-500 mb-2 pl-10">
                      Plus: <span className="text-stone-700 font-medium">{guest.guestNames}</span>
                    </p>
                  )}

                  <div className="pl-10 space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#0A3824]" />
                      <span>
                        Attending:{' '}
                        <strong className="text-stone-800 uppercase text-[11px]">
                          {guest.attending === 'both' ? 'Traditional & White' : guest.attending}
                        </strong>
                      </span>
                    </div>

                    {guest.songRequest && (
                      <div className="flex items-center gap-1.5 text-stone-500">
                        <Music className="w-3.5 h-3.5 text-[#E2583E] shrink-0" />
                        <span className="italic line-clamp-1">"{guest.songRequest}"</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1 text-[#0A3824] font-medium">
                    <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                    <span>Verified Guest ({guest.partySize} Seat{guest.partySize > 1 ? 's' : ''})</span>
                  </span>
                  <span>{new Date(guest.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-stone-200">
              <Users className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="text-stone-600 text-sm font-medium">
                No matching attendees found in registry.
              </p>
              <a
                href="#rsvp"
                className="mt-3 inline-block text-xs font-bold text-[#0A3824] underline"
              >
                Be among the first to RSVP!
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
