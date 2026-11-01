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
  CalendarCheck,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Copy,
  Check,
  Plus,
  Radio,
  Sparkles,
  Disc3,
  Volume2,
  CheckCircle
} from 'lucide-react';
import type { GuestRSVP } from '../types/wedding';
import { exportRSVPToCSV } from '../utils/storage';

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvps: GuestRSVP[];
  onDeleteRSVP: (id: string) => void;
  onToggleCheckIn?: (idOrPassCode: string) => void;
}

interface CeremonialTrack {
  id: string;
  moment: string;
  ceremony: 'traditional' | 'white' | 'both';
  title: string;
  artist: string;
  genre: string;
  description: string;
  tempo: string;
  recommendedCue: string;
}

interface CustomTrackRequest {
  id: string;
  title: string;
  artist: string;
  requestedBy: string;
  ceremony: 'traditional' | 'white' | 'both';
  notes?: string;
}

const CEREMONIAL_PLAYLIST: CeremonialTrack[] = [
  // Traditional & Engagement Rites
  {
    id: 'cue-trad-1',
    moment: '1. Groom & Groomsmen Grand Arrival',
    ceremony: 'traditional',
    title: 'Orente / Sunshine Romance',
    artist: 'Adekunle Gold / King Sunny Ade Medley',
    genre: 'Yoruba Highlife & Afrobeats Fusion',
    description: "Adebiyi Peter Oluwaseyi and his distinguished squad make a majestic entrance into JJ & Jaz Center.",
    tempo: 'High Energy & Regal',
    recommendedCue: 'Fade in as the groom and family arrive; increase volume to celebrate his presence.'
  },
  {
    id: 'cue-trad-2',
    moment: "2. Bride's Radiant Entrance (Greeting In-Laws & Parents)",
    ceremony: 'traditional',
    title: 'Iyawo Mi / Joromi',
    artist: 'Timi Dakolo / Simi',
    genre: 'Afro-Soul Romance',
    description: "Falola Abisola Eniola's dazzling entrance in custom designer bridal attire with her bridal squad.",
    tempo: 'Celebratory & Joyful',
    recommendedCue: 'Cue as the double doors open for Eniola; encourage joyful cheering and songs.'
  },
  {
    id: 'cue-trad-3',
    moment: "3. Nuptial Vows & Ring Exchange",
    ceremony: 'white',
    title: 'The Vow / Running (To You)',
    artist: 'Timi Dakolo / Chike ft. Simi',
    genre: 'Soulful Marital Ballad',
    description: "Solemn exchange of vows, blessing of rings, and holy declaration as husband and wife.",
    tempo: 'Soulful & Romantic',
    recommendedCue: 'Play softly under the pastor’s altar declaration and the couple’s ring exchange.'
  },
  {
    id: 'cue-trad-4',
    moment: "4. Couple's First Dance as Husband & Wife",
    ceremony: 'white',
    title: 'Promise / Complete',
    artist: 'Adekunle Gold & Simi',
    genre: 'Intimate Afropop Romance',
    description: "Eniola and Oluwaseyi's romantic first dance surrounded by low-fog dry ice and warm golden spotlights.",
    tempo: 'Gentle Romance',
    recommendedCue: 'Dim ballroom lights to warm gold; couple solo on dance floor.'
  },
  {
    id: 'cue-trad-5',
    moment: "5. Cutting of the Couture Wedding Cake",
    ceremony: 'both',
    title: 'No One Like You / Duduke',
    artist: 'P-Square / Simi',
    genre: 'Joyful Afropop Melody',
    description: "Toast with champagne flutes and slicing the designer multi-tier gold & chocolate cake.",
    tempo: 'Mid-tempo Celebration',
    recommendedCue: 'Play under the MC toast and family cheering.'
  },
  {
    id: 'cue-trad-6',
    moment: "6. Parental Honors Dance (Elder Falola & Mrs. Adebiyi)",
    ceremony: 'both',
    title: 'Sweet Mother / Awa Dupe Funfun',
    artist: 'Prince Nico Mbarga / King Sunny Ade',
    genre: 'Timeless African Classic',
    description: "Eniola dances with her parents, Oluwaseyi honors his mother and late father's memory.",
    tempo: 'Nostalgic Highlife',
    recommendedCue: 'Open floor for parents, elders, and family dignitaries to spray love and blessings.'
  },
  {
    id: 'cue-trad-7',
    moment: "7. Designers' Grand Turn Up & Money Spraying",
    ceremony: 'both',
    title: 'Buga / Lonely At The Top / Unavailable',
    artist: 'Kizz Daniel / Asake / Davido',
    genre: 'Peak Afrobeats Explosion',
    description: "Peak celebratory dance floor takeover; friends, designers, and guests shower the couple with naira.",
    tempo: 'Maximum Turn-Up',
    recommendedCue: 'Bass boost, strobe lighting active, money guns ready.'
  }
];

export const PlannerModal: React.FC<PlannerModalProps> = ({
  isOpen,
  onClose,
  rsvps,
  onDeleteRSVP,
  onToggleCheckIn
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'guests' | 'catering' | 'music'>('guests');
  const [search, setSearch] = useState('');

  // Music Tab State
  const [musicCategory, setMusicCategory] = useState<'all' | 'ceremonial' | 'requests'>('all');
  const [musicCeremonyFilter, setMusicCeremonyFilter] = useState<'all' | 'traditional' | 'white'>('all');
  const [musicSearch, setMusicSearch] = useState('');
  const [copiedDJText, setCopiedDJText] = useState(false);
  const [copiedSongId, setCopiedSongId] = useState<string | null>(null);
  const [playedTracks, setPlayedTracks] = useState<string[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomTrackRequest[]>([]);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongRequester, setNewSongRequester] = useState('');
  const [newSongCeremony, setNewSongCeremony] = useState<'traditional' | 'white' | 'both'>('both');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2026' || pin === 'designers2026' || pin === 'melwed2026' || pin === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect Wedding Planner PIN. (Hint: 2026 or designers2026)');
    }
  };

  // Metrics
  const attendingGuests = rsvps.filter(r => r.attending !== 'declined');
  const totalHeadcount = attendingGuests.reduce((acc, r) => acc + (r.partySize || 1), 0);
  const checkedInGuests = attendingGuests.filter(r => r.checkedIn);
  const checkedInHeadcount = checkedInGuests.reduce((acc, r) => acc + (r.partySize || 1), 0);
  const checkedInCount = checkedInGuests.length;
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

  // Song requests from RSVPs
  const guestRequests = rsvps
    .filter(r => r.songRequest && r.songRequest.trim() !== '')
    .map(r => ({
      id: `guest-${r.id}`,
      title: r.songRequest!,
      artist: 'Guest Favorite',
      requestedBy: r.name,
      partySize: r.partySize || 1,
      ceremony: r.attending,
      isCustom: false
    }));

  const allRequests = [
    ...guestRequests,
    ...customRequests.map(c => ({
      id: c.id,
      title: c.title,
      artist: c.artist || 'Special Request',
      requestedBy: c.requestedBy || 'Wedding Coordinator',
      partySize: 1,
      ceremony: c.ceremony,
      isCustom: true
    }))
  ];

  const filteredGuests = rsvps.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    (g.phone && g.phone.toLowerCase().includes(search.toLowerCase())) ||
    (g.passCode && g.passCode.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleTrackPlayed = (id: string) => {
    setPlayedTracks(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleCopyTrack = (trackText: string, id: string) => {
    navigator.clipboard.writeText(trackText);
    setCopiedSongId(id);
    setTimeout(() => setCopiedSongId(null), 2000);
  };

  const handleAddCustomSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSongTitle.trim()) return;

    const newTrack: CustomTrackRequest = {
      id: `custom-${Date.now()}`,
      title: newSongTitle.trim(),
      artist: newSongArtist.trim() || 'Custom Track',
      requestedBy: newSongRequester.trim() || 'VIP Guest',
      ceremony: newSongCeremony
    };

    setCustomRequests(prev => [newTrack, ...prev]);
    setNewSongTitle('');
    setNewSongArtist('');
    setNewSongRequester('');
    setIsAddingSong(false);
  };

  const handleCopyDJCueSheet = () => {
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    let text = `🎧 *#DesignersMeet WEDDING DJ & BANDLEADER CUE SHEET* 🎧\n`;
    text += `Couple: Falola Abisola Eniola & Adebiyi Peter Oluwaseyi\n`;
    text += `Venue: JJ & Jaz Event Center, Taoheed Road, Basin, Ilorin, Kwara State\n`;
    text += `Date: Saturday, November 7, 2026 @ 11:00 AM Prompt\n`;
    text += `Generated: ${dateStr}\n\n`;

    text += `═══════════════════════════════════════\n`;
    text += `✨ *CEREMONIAL & RECEPTION ORDER OF MUSIC*\n`;
    text += `Saturday, Nov 07, 2026 • JJ & Jaz Event Center, Ilorin\n`;
    text += `═══════════════════════════════════════\n`;
    CEREMONIAL_PLAYLIST.forEach(t => {
      text += `\n▶ *${t.moment}*\n`;
      text += `   🎵 Track: ${t.title} - ${t.artist}\n`;
      text += `   🏷 Genre: ${t.genre} (${t.tempo})\n`;
      text += `   💡 Cue Note: ${t.recommendedCue}\n`;
    });

    text += `\n═══════════════════════════════════════\n`;
    text += `👥 *GUEST DANCE FLOOR REQUESTS (${allRequests.length} Total)*\n`;
    text += `═══════════════════════════════════════\n`;
    allRequests.forEach((req, idx) => {
      text += `${idx + 1}. "${req.title}" — Requested by ${req.requestedBy}\n`;
    });

    text += `\n✨ Celebrating Eniola & Oluwaseyi • Two Designers Becoming One! #DesignersMeet ✨\n`;

    navigator.clipboard.writeText(text);
    setCopiedDJText(true);
    setTimeout(() => setCopiedDJText(false), 3500);
  };

  // Filter ceremonial tracks
  const filteredCeremonial = CEREMONIAL_PLAYLIST.filter(t => {
    const matchesCeremony =
      musicCeremonyFilter === 'all' ||
      t.ceremony === musicCeremonyFilter ||
      t.ceremony === 'both';

    const matchesSearch =
      t.title.toLowerCase().includes(musicSearch.toLowerCase()) ||
      t.artist.toLowerCase().includes(musicSearch.toLowerCase()) ||
      t.moment.toLowerCase().includes(musicSearch.toLowerCase()) ||
      t.genre.toLowerCase().includes(musicSearch.toLowerCase());

    return matchesCeremony && matchesSearch;
  });

  // Filter requests
  const filteredRequests = allRequests.filter(r => {
    const matchesCeremony =
      musicCeremonyFilter === 'all' ||
      r.ceremony === musicCeremonyFilter ||
      r.ceremony === 'both';

    const matchesSearch =
      r.title.toLowerCase().includes(musicSearch.toLowerCase()) ||
      r.artist.toLowerCase().includes(musicSearch.toLowerCase()) ||
      r.requestedBy.toLowerCase().includes(musicSearch.toLowerCase());

    return matchesCeremony && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-champagne-gold/40 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-[#2A060C] via-[#380A11] to-[#2A060C] px-6 py-4.5 text-white flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              {isAuthenticated ? (
                <Unlock className="w-5 h-5 text-[#D4AF37]" />
              ) : (
                <Lock className="w-5 h-5 text-[#D4AF37]" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#F9E498] uppercase font-semibold">
                #DesignersMeet Management Portal • Eniola &amp; Oluwaseyi
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Wedding Planner, Catering &amp; Music Hub
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
            <div className="bg-stone-50 border-b border-stone-200 p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
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
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Gate Checked-In</span>
                </div>
                <div className="text-2xl font-bold text-emerald-900 font-serif">
                  {checkedInHeadcount} <span className="text-xs font-normal text-stone-500">/ {totalHeadcount}</span>
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  {checkedInCount} of {attendingGuests.length} parties arrived
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
                  Trad: {tradOnlyCount} • White: {whiteOnlyCount}
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-medium uppercase tracking-wider mb-1">
                  <Music className="w-3.5 h-3.5 text-purple-700" />
                  <span>Music Tracks</span>
                </div>
                <div className="text-2xl font-bold text-stone-800 font-serif">
                  {CEREMONIAL_PLAYLIST.length + allRequests.length}
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  {CEREMONIAL_PLAYLIST.length} Cues • {allRequests.length} Requests
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs col-span-2 sm:col-span-1">
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
            <div className="px-6 pt-3 border-b border-stone-200 flex gap-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab('guests')}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'guests'
                    ? 'border-emerald-900 text-emerald-950'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Guest Attendance Registry ({filteredGuests.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('catering')}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
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
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap relative ${
                  activeTab === 'music'
                    ? 'border-emerald-900 text-emerald-950'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Music className="w-4 h-4 text-purple-700" />
                <span>Music List &amp; DJ Playlist ({CEREMONIAL_PLAYLIST.length + allRequests.length})</span>
                <span className="w-2 h-2 rounded-full bg-champagne-gold animate-pulse"></span>
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
                          <div className="flex items-center gap-2 flex-wrap">
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

                            {guest.checkedIn ? (
                              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-700 text-white flex items-center gap-1 shadow-xs">
                                <CheckCircle2 className="w-3 h-3 text-emerald-200" />
                                <span>Checked In</span>
                                {guest.checkedInAt && (
                                  <span className="opacity-80 text-[9px] font-mono">
                                    ({new Date(guest.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                                  </span>
                                )}
                              </span>
                            ) : guest.attending !== 'declined' ? (
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-stone-100 text-stone-600 border border-stone-200">
                                Awaiting Arrival
                              </span>
                            ) : null}
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

                          {guest.songRequest && (
                            <div className="text-[11px] text-purple-900 font-medium flex items-center gap-1">
                              <Music className="w-3 h-3 text-purple-600" />
                              <span>Song: "{guest.songRequest}"</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {onToggleCheckIn && guest.attending !== 'declined' && (
                            <button
                              onClick={() => onToggleCheckIn(guest.id)}
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                                guest.checkedIn
                                  ? 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
                                  : 'bg-emerald-950 text-champagne-gold hover:bg-emerald-900 border border-champagne-gold/40 shadow-xs'
                              }`}
                              title={guest.checkedIn ? 'Undo gate check-in' : 'Admit guest at gate'}
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>{guest.checkedIn ? 'Undo Check-In' : 'Admit Guest'}</span>
                            </button>
                          )}

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

            {/* Tab 3: Dedicated Music List & DJ Cue Sheet */}
            {activeTab === 'music' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
                {/* Header Action Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0A3824] via-[#082F1E] to-[#142D21] text-white border border-[#D4AF37]/30 shadow-md">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold px-2 py-0.5 rounded bg-black/40 border border-[#D4AF37]/30">
                          SOUND ENGINEER &amp; DJ HUB
                        </span>
                        <span className="text-xs text-stone-300">#MELWED2026</span>
                      </div>
                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                        Ceremonial Music Cues &amp; Guest Dancefloor Requests
                      </h3>
                      <p className="text-xs text-stone-300 max-w-xl mt-1 leading-relaxed">
                        Curated traditional Igbo highlife entrances, cathedral sacred music, and guest Afrobeats requests. Hand this cue sheet to the MC and DJ before sound check.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                      <button
                        onClick={handleCopyDJCueSheet}
                        className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                          copiedDJText
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#D4AF37] hover:bg-[#c49f2b] text-emerald-950 font-semibold'
                        }`}
                      >
                        {copiedDJText ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>Cue Sheet Copied! (WhatsApp Ready)</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy DJ Cue Sheet (WhatsApp)</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setIsAddingSong(true)}
                        className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-[#D4AF37]" />
                        <span>Add Song</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Stat Counter */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <div className="text-stone-400 text-[10px] uppercase tracking-wider">Ceremonial Cues</div>
                      <div className="font-serif text-lg font-bold text-white">{CEREMONIAL_PLAYLIST.length} Tracks</div>
                    </div>
                    <div>
                      <div className="text-stone-400 text-[10px] uppercase tracking-wider">Guest Requests</div>
                      <div className="font-serif text-lg font-bold text-[#F9E498]">{allRequests.length} Tracks</div>
                    </div>
                    <div>
                      <div className="text-stone-400 text-[10px] uppercase tracking-wider">Tracks Played</div>
                      <div className="font-serif text-lg font-bold text-emerald-400">{playedTracks.length} / {CEREMONIAL_PLAYLIST.length + allRequests.length}</div>
                    </div>
                    <div>
                      <div className="text-stone-400 text-[10px] uppercase tracking-wider">Primary Genres</div>
                      <div className="font-medium text-stone-200">Igbo Highlife &amp; Afrobeats</div>
                    </div>
                  </div>
                </div>

                {/* Inline Add Song Form */}
                {isAddingSong && (
                  <form onSubmit={handleAddCustomSong} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <h5 className="font-semibold text-xs uppercase tracking-wider text-emerald-950">Add Custom Song Request</h5>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAddingSong(false)}
                        className="text-stone-400 hover:text-stone-600 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Song Title *</label>
                        <input
                          type="text"
                          required
                          value={newSongTitle}
                          onChange={e => setNewSongTitle(e.target.value)}
                          placeholder="e.g. Asake - Lonely At The Top"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Artist / Ensemble</label>
                        <input
                          type="text"
                          value={newSongArtist}
                          onChange={e => setNewSongArtist(e.target.value)}
                          placeholder="e.g. Asake"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Requested By</label>
                        <input
                          type="text"
                          value={newSongRequester}
                          onChange={e => setNewSongRequester(e.target.value)}
                          placeholder="e.g. Groom's Brother / VIP Table 4"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-stone-500">Event:</span>
                        <select
                          value={newSongCeremony}
                          onChange={e => setNewSongCeremony(e.target.value as any)}
                          className="px-2 py-1 text-xs rounded-lg border border-stone-300 bg-white text-stone-900"
                        >
                          <option value="both">Both Events</option>
                          <option value="traditional">Traditional (Igba Nkwu)</option>
                          <option value="white">White Wedding Reception</option>
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingSong(false)}
                          className="px-3 py-1 text-xs font-medium text-stone-600 hover:text-stone-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded-lg bg-emerald-950 text-champagne-gold text-xs font-bold shadow-xs hover:bg-emerald-900"
                        >
                          Save Track
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Filter and Search Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                  {/* Category Filter */}
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    <button
                      onClick={() => setMusicCategory('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        musicCategory === 'all'
                          ? 'bg-emerald-950 text-champagne-gold shadow-xs'
                          : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                      }`}
                    >
                      All Tracks ({CEREMONIAL_PLAYLIST.length + allRequests.length})
                    </button>
                    <button
                      onClick={() => setMusicCategory('ceremonial')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        musicCategory === 'ceremonial'
                          ? 'bg-emerald-950 text-champagne-gold shadow-xs'
                          : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                      }`}
                    >
                      <Radio className="w-3 h-3 text-champagne-gold" />
                      <span>Ceremonial Cues ({CEREMONIAL_PLAYLIST.length})</span>
                    </button>
                    <button
                      onClick={() => setMusicCategory('requests')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        musicCategory === 'requests'
                          ? 'bg-emerald-950 text-champagne-gold shadow-xs'
                          : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                      }`}
                    >
                      <Disc3 className="w-3 h-3 text-purple-600" />
                      <span>Guest Requests ({allRequests.length})</span>
                    </button>
                  </div>

                  {/* Ceremony Filter & Search */}
                  <div className="flex items-center gap-2">
                    <select
                      value={musicCeremonyFilter}
                      onChange={e => setMusicCeremonyFilter(e.target.value as any)}
                      className="px-2.5 py-1.5 text-xs rounded-xl border border-stone-200 bg-white text-stone-700 focus:outline-none"
                    >
                      <option value="all">All Ceremonies</option>
                      <option value="traditional">Traditional (Igba Nkwu)</option>
                      <option value="white">White Wedding</option>
                    </select>

                    <div className="relative flex-1 sm:w-48">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Search song, artist..."
                        value={musicSearch}
                        onChange={e => setMusicSearch(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section A: Ceremonial Entrance Cues */}
                {(musicCategory === 'all' || musicCategory === 'ceremonial') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-champagne-gold"></span>
                        <h4 className="font-serif-luxury text-base font-bold text-emerald-950">
                          Curated Couple Ceremonial Cues (Traditional &amp; Reception)
                        </h4>
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {filteredCeremonial.length} official moments
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {filteredCeremonial.length === 0 ? (
                        <div className="p-6 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
                          No ceremonial cues match the current search filters.
                        </div>
                      ) : (
                        filteredCeremonial.map((track) => {
                          const isPlayed = playedTracks.includes(track.id);
                          return (
                            <div
                              key={track.id}
                              className={`p-4 rounded-2xl border transition-all ${
                                isPlayed
                                  ? 'bg-stone-50/70 border-stone-200 opacity-60'
                                  : 'bg-white border-stone-200/90 hover:border-champagne-gold/60 shadow-xs'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                <div className="space-y-1 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-xs text-emerald-950 font-serif">
                                      {track.moment}
                                    </span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                      track.ceremony === 'traditional'
                                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                        : 'bg-stone-100 text-stone-800 border border-stone-200'
                                    }`}>
                                      {track.ceremony === 'traditional' ? 'Traditional Igba Nkwu' : 'White Wedding'}
                                    </span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-100 font-medium">
                                      {track.tempo}
                                    </span>
                                  </div>

                                  <div className="flex items-baseline gap-2">
                                    <h5 className="font-semibold text-stone-900 text-sm flex items-center gap-1.5">
                                      <Volume2 className="w-3.5 h-3.5 text-champagne-gold shrink-0" />
                                      <span>"{track.title}"</span>
                                    </h5>
                                    <span className="text-xs text-stone-500">
                                      — {track.artist}
                                    </span>
                                  </div>

                                  <p className="text-xs text-stone-600 leading-relaxed">
                                    {track.description}
                                  </p>

                                  <div className="text-[11px] text-emerald-900 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-100/70 inline-block">
                                    <strong className="font-semibold">DJ Cue:</strong> {track.recommendedCue}
                                  </div>
                                </div>

                                {/* Right Controls */}
                                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                                  <button
                                    onClick={() => handleCopyTrack(`${track.title} - ${track.artist}`, track.id)}
                                    className="p-2 text-stone-400 hover:text-emerald-950 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                                    title="Copy track name"
                                  >
                                    {copiedSongId === track.id ? (
                                      <Check className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </button>

                                  <button
                                    onClick={() => toggleTrackPlayed(track.id)}
                                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                                      isPlayed
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                                    }`}
                                  >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>{isPlayed ? 'Played' : 'Mark Played'}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                {/* Section B: Guest Dance Floor Requests */}
                {(musicCategory === 'all' || musicCategory === 'requests') && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                        <h4 className="font-serif-luxury text-base font-bold text-emerald-950">
                          Guest Dance Floor Requests &amp; Party Anthems
                        </h4>
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {filteredRequests.length} requested songs
                      </span>
                    </div>

                    <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-xs">
                      {filteredRequests.length === 0 ? (
                        <div className="p-8 text-center text-xs text-stone-500">
                          No guest song requests match the current filters.
                        </div>
                      ) : (
                        filteredRequests.map((req, i) => {
                          const isPlayed = playedTracks.includes(req.id);
                          return (
                            <div
                              key={req.id}
                              className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                                isPlayed ? 'bg-stone-50/70 opacity-60' : 'hover:bg-stone-50/80'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-champagne-gold/20 text-emerald-950 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                                  {i + 1}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                                      "{req.title}"
                                    </span>
                                    {req.isCustom && (
                                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                                        Planner Added
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-stone-500">
                                    Requested by <strong className="text-stone-700">{req.requestedBy}</strong> ({req.ceremony === 'both' ? 'Both Events' : req.ceremony})
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 hidden sm:inline-block">
                                  Afrobeats / Highlife
                                </span>

                                <button
                                  onClick={() => handleCopyTrack(req.title, req.id)}
                                  className="p-1.5 text-stone-400 hover:text-emerald-950 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                                  title="Copy track title"
                                >
                                  {copiedSongId === req.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>

                                <button
                                  onClick={() => toggleTrackPlayed(req.id)}
                                  className={`px-2 py-1 rounded-xl text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                                    isPlayed
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                  }`}
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>{isPlayed ? 'Played' : 'Queued'}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
