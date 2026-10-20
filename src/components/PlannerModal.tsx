import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Download,
  Trash2,
  Search,
  X,
  Users,
  Utensils,
  Music,
  BarChart3,
  CalendarCheck,
  Phone,
  Mail
} from 'lucide-react';
import type { GuestRSVP } from '../types/wedding';
import { exportRSVPToCSV } from '../utils/storage';

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvps: GuestRSVP[];
  onDeleteRSVP: (id: string) => void;
}

export const PlannerModal: React.FC<PlannerModalProps> = ({
  isOpen,
  onClose,
  rsvps,
  onDeleteRSVP
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'guests' | 'catering' | 'music'>('guests');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1994 (Year of birth / classic pin) or 2026
    if (pin === '2026' || pin === '1994' || pin === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect Wedding Planner PIN. (Hint: 2026)');
    }
  };

  // Metrics
  const attendingGuests = rsvps.filter(r => r.attending !== 'declined');
  const totalHeadcount = attendingGuests.reduce((acc, r) => acc + (r.partySize || 1), 0);
  const bothCount = rsvps.filter(r => r.attending === 'both').length;
  const tradOnlyCount = rsvps.filter(r => r.attending === 'traditional').length;
  const whiteOnlyCount = rsvps.filter(r => r.attending === 'white').length;
  const declinedCount = rsvps.filter(r => r.attending === 'declined').length;

  // Meal breakdown
  const mealCounts: Record<string, number> = {};
  attendingGuests.forEach(g => {
    const meal = g.mealPreference || 'Chef Special Assorted';
    mealCounts[meal] = (mealCounts[meal] || 0) + (g.partySize || 1);
  });

  // Song requests
  const songRequests = rsvps.filter(r => r.songRequest && r.songRequest.trim() !== '');

  const filteredGuests = rsvps.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    (g.phone && g.phone.toLowerCase().includes(search.toLowerCase())) ||
    (g.passCode && g.passCode.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-champagne-gold/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 px-6 py-4.5 text-white flex items-center justify-between border-b border-champagne-gold/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              {isAuthenticated ? (
                <Unlock className="w-5 h-5 text-champagne-gold" />
              ) : (
                <Lock className="w-5 h-5 text-champagne-gold" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-champagne-gold uppercase font-semibold">
                MELWED2026 Management Portal
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Wedding Planner & Caterer Dashboard
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Screen if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-emerald-800" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-2">
              Planner Authentication Required
            </h3>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              This dashboard contains private guest contact details, caterer meal orders, and protocol table assignments.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  placeholder="Enter Planner Access PIN (2026)"
                  className="w-full text-center tracking-widest px-4 py-3 rounded-xl border border-stone-300 text-stone-900 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold"
                  autoFocus
                />
                {errorMsg && (
                  <p className="text-xs text-rose-600 font-medium mt-1.5">{errorMsg}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-champagne-gold font-medium text-xs tracking-wider uppercase border border-champagne-gold/40 shadow-md transition-all cursor-pointer"
              >
                Unlock Dashboard
              </button>

              <p className="text-[11px] text-stone-400">
                Default Planner Demo PIN: <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-emerald-900">2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* KPI Metric Summary Strip */}
            <div className="bg-stone-50 border-b border-stone-200 p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-medium uppercase tracking-wider mb-1">
                  <Users className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Total Confirmed</span>
                </div>
                <div className="text-2xl font-bold text-emerald-950 font-serif">
                  {totalHeadcount} <span className="text-xs font-normal text-stone-500">Heads</span>
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  Across {attendingGuests.length} parties
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-medium uppercase tracking-wider mb-1">
                  <CalendarCheck className="w-3.5 h-3.5 text-champagne-gold" />
                  <span>Both Events</span>
                </div>
                <div className="text-2xl font-bold text-emerald-900 font-serif">
                  {bothCount}
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  Full weekend guests
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-medium uppercase tracking-wider mb-1">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Single Ceremony</span>
                </div>
                <div className="text-2xl font-bold text-stone-800 font-serif">
                  {tradOnlyCount + whiteOnlyCount}
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  Trad ({tradOnlyCount}) • White ({whiteOnlyCount})
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-medium uppercase tracking-wider mb-1">
                  <Download className="w-3.5 h-3.5 text-coral-red" />
                  <span>Export Report</span>
                </div>
                <button
                  onClick={() => exportRSVPToCSV(rsvps)}
                  className="w-full mt-1 py-1.5 px-2 rounded-xl bg-emerald-950 text-champagne-gold text-xs font-semibold hover:bg-emerald-900 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 pt-3 border-b border-stone-200 flex gap-4">
              <button
                onClick={() => setActiveTab('guests')}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'guests'
                    ? 'border-emerald-900 text-emerald-950'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Guest Protocol List ({filteredGuests.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('catering')}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'catering'
                    ? 'border-emerald-900 text-emerald-950'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Caterer Food Totals</span>
              </button>

              <button
                onClick={() => setActiveTab('music')}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'music'
                    ? 'border-emerald-900 text-emerald-950'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>DJ Song Requests ({songRequests.length})</span>
              </button>
            </div>

            {/* Tab 1: Guest List */}
            {activeTab === 'guests' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search by guest name, phone, or Pass Code..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                    />
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    Declined: {declinedCount}
                  </span>
                </div>

                <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200 overflow-hidden bg-white">
                  {filteredGuests.length === 0 ? (
                    <div className="p-8 text-center text-xs text-stone-500">
                      No guests match your search.
                    </div>
                  ) : (
                    filteredGuests.map(guest => (
                      <div
                        key={guest.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/80 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-stone-900 text-sm">
                              {guest.name}
                            </h4>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-100 text-emerald-950 font-bold border border-stone-200">
                              {guest.passCode || 'VIP'}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              guest.attending === 'both' ? 'bg-emerald-100 text-emerald-800' :
                              guest.attending === 'declined' ? 'bg-rose-100 text-rose-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {guest.attending === 'both' ? 'Both Events' :
                               guest.attending === 'traditional' ? 'Traditional Only' :
                               guest.attending === 'white' ? 'White Wedding Only' : 'Regretfully Cannot Attend'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                            {guest.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-stone-400" />
                                {guest.phone}
                              </span>
                            )}
                            {guest.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-stone-400" />
                                {guest.email}
                              </span>
                            )}
                            <span className="font-medium text-stone-700">
                              Party Size: {guest.partySize || 1}
                            </span>
                          </div>

                          {guest.mealPreference && (
                            <div className="text-[11px] text-emerald-900 font-medium">
                              Meal: {guest.mealPreference}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              if (confirm(`Remove ${guest.name} from attendee list?`)) {
                                onDeleteRSVP(guest.id);
                              }
                            }}
                            className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete RSVP"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Catering Meal Summary */}
            {activeTab === 'catering' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-emerald-950 text-base">
                      Catering Quantity Totals for Banquet Chefs
                    </h4>
                    <p className="text-xs text-stone-500">
                      Calculated automatically from confirmed party sizes
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(mealCounts).map(([dish, count]) => (
                    <div
                      key={dish}
                      className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                          <Utensils className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                            {dish}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            Portion estimate with 10% banquet buffer: {Math.ceil(count * 1.1)} plates
                          </div>
                        </div>
                      </div>

                      <div className="text-xl font-bold font-mono text-emerald-950">
                        {count} <span className="text-[10px] font-normal text-stone-500">plates</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Song Requests for DJ */}
            {activeTab === 'music' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div>
                  <h4 className="font-serif font-bold text-emerald-950 text-base">
                    Guest Dance Floor Requests
                  </h4>
                  <p className="text-xs text-stone-500">
                    Hand this playlist cue sheet to DJ & Bandleader before the grand reception
                  </p>
                </div>

                <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200 overflow-hidden bg-white">
                  {songRequests.length === 0 ? (
                    <div className="p-8 text-center text-xs text-stone-500">
                      No song requests entered yet.
                    </div>
                  ) : (
                    songRequests.map((g, i) => (
                      <div key={i} className="p-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-champagne-gold/20 text-emerald-950 flex items-center justify-center font-mono text-xs font-bold">
                            {i + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                              "{g.songRequest}"
                            </div>
                            <div className="text-[10px] text-stone-400">
                              Requested by {g.name} ({g.attending === 'both' ? 'Both' : g.attending})
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-900">
                          Afrobeats / Highlife
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
