import React, { useState } from 'react';
import { Heart, Sparkles, Send, Quote, Search, Filter, MessageCircleHeart } from 'lucide-react';
import type { WeddingWish } from '../types/wedding';
import confetti from 'canvas-confetti';

interface WishesPrayersProps {
  wishes: WeddingWish[];
  onAddWish: (wish: Omit<WeddingWish, 'id' | 'createdAt' | 'reactions'>) => void;
  onReactWish: (id: string) => void;
}

const RELATIONSHIP_OPTIONS = [
  "Bride's Family",
  "Groom's Family",
  "Chief Bridesmaid / Groomsman",
  "Bride's Friend",
  "Groom's Friend",
  "Family Friend",
  "Church / Fellowship",
  "Well Wisher / Diaspora"
];

export const WishesPrayers: React.FC<WishesPrayersProps> = ({
  wishes,
  onAddWish,
  onReactWish
}) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState(RELATIONSHIP_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [prayer, setPrayer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [userReacted, setUserReacted] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#C85023', '#3D1E16', '#380A11']
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      onAddWish({
        name: name.trim(),
        relationship,
        message: message.trim(),
        prayer: prayer.trim() || undefined
      });

      setName('');
      setMessage('');
      setPrayer('');
      setIsSubmitting(false);
      setSubmittedToast(true);

      setTimeout(() => setSubmittedToast(false), 5000);
    }, 400);
  };

  const handleReactionClick = (id: string) => {
    if (userReacted[id]) return; // prevent spamming
    setUserReacted(prev => ({ ...prev, [id]: true }));
    onReactWish(id);

    try {
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#E2583E', '#D4AF37']
      });
    } catch {
      // safe fallback
    }
  };

  const filteredWishes = wishes.filter(w => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.prayer && w.prayer.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = selectedFilter === 'all' || w.relationship === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="wishes" className="py-20 bg-gradient-to-b from-[#380A11]/5 via-[#FAF7F2] to-[#3D1E16]/10 relative overflow-hidden">
      {/* Decorative Gold Accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#380A11]/10 border border-[#D4AF37]/30 text-[#380A11] text-xs tracking-widest uppercase font-medium mb-3">
            <Heart className="w-3.5 h-3.5 text-[#C85023] fill-[#C85023]" />
            <span>Àdúrà Àti Ìre • Blessings &amp; Well Wishes for #DesignersMeet</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#380A11] mb-3 tracking-tight">
            Drop a Blessing for the Couple
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Your heartfelt words, sincere prayers, and warm greetings mean the world to Eniola &amp; Oluwaseyi.
            Leave a permanent imprint of your love as we begin our holy marital journey.
          </p>
        </div>

        {/* 2-Column Layout: Form on Left, Live Feed on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 border border-[#D4AF37]/30 relative">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-[#380A11]">
                <MessageCircleHeart className="w-5 h-5 text-[#380A11]" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#380A11] font-semibold">Write Your Wish &amp; Prayer</h3>
                <p className="text-xs text-stone-500">Every message is preserved in our digital guestbook</p>
              </div>
            </div>

            {submittedToast && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-[#380A11] flex items-center gap-3 animate-fade-in">
                <Sparkles className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <p className="text-xs sm:text-sm font-medium">
                  E ṣe púpọ̀! Thank you for your warm prayer and wish. It is now published below!
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-[#C85023]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Pastor &amp; Mrs. Funsho Adeyemi"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Relationship to Couple
                </label>
                <select
                  value={relationship}
                  onChange={e => setRelationship(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                >
                  {RELATIONSHIP_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Congratulations / Note of Joy <span className="text-[#C85023]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Share your warm thoughts and joyful memories with Eniola &amp; Oluwaseyi (#DesignersMeet)..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#380A11] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Special Prayer or Scripture (Optional)</span>
                  <span className="text-[10px] text-[#C85023] lowercase italic font-normal">Yoruba / English blessings welcome</span>
                </label>
                <textarea
                  rows={3}
                  value={prayer}
                  onChange={e => setPrayer(e.target.value)}
                  placeholder="Speak fruitfulness, peace, long life, and divine harmony into their marriage..."
                  className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/40 bg-[#FAF7F2] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#380A11] via-[#3D1E16] to-[#380A11] text-[#D4AF37] font-medium text-sm tracking-wide shadow-lg shadow-[#380A11]/30 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-[#D4AF37]/40 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Your Blessing...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish Blessing &amp; Love Note</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Live Wishes Feed (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Search and Filter Bar */}
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search prayers & names..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <Filter className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                <select
                  value={selectedFilter}
                  onChange={e => setSelectedFilter(e.target.value)}
                  className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-none"
                >
                  <option value="all">All Relationships ({wishes.length})</option>
                  {RELATIONSHIP_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* List of Wishes */}
            {filteredWishes.length === 0 ? (
              <div className="text-center py-12 bg-white/60 rounded-3xl border border-dashed border-stone-200 p-8">
                <p className="text-stone-500 text-sm">No blessings match your search filter.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
                  className="mt-2 text-xs text-emerald-800 underline font-medium cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
                {filteredWishes.map((item) => {
                  const initials = item.name
                    .split(' ')
                    .map(n => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

                  const hasUserReacted = !!userReacted[item.id];

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-stone-100 transition-all group relative"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#380A11] to-[#3D1E16] text-[#D4AF37] font-serif text-sm font-semibold flex items-center justify-center border border-[#D4AF37]/40 shadow-inner flex-shrink-0">
                            {initials || 'W'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-stone-900 text-sm sm:text-base leading-tight">
                              {item.name}
                            </h4>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-[#380A11]/10 text-[#380A11] text-[11px] font-medium border border-[#380A11]/20 mt-0.5">
                              {item.relationship}
                            </span>
                          </div>
                        </div>

                        {/* Reaction Button */}
                        <button
                          onClick={() => handleReactionClick(item.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            hasUserReacted
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : 'bg-stone-50 text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-200'
                          }`}
                          title="Say Amen & Send Love"
                        >
                          <Heart className={`w-3.5 h-3.5 ${hasUserReacted ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                          <span>Amen ({item.reactions})</span>
                        </button>
                      </div>

                      {/* Main Message */}
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-3">
                        "{item.message}"
                      </p>

                      {/* Prayer Highlight Box if present */}
                      {item.prayer && (
                        <div className="p-3.5 rounded-xl bg-warm-ivory/70 border-l-3 border-champagne-gold text-stone-800 relative">
                          <div className="flex items-center gap-1.5 text-[11px] text-emerald-950 font-semibold mb-1 uppercase tracking-wider">
                            <Quote className="w-3 h-3 text-champagne-gold" />
                            <span>Prayer of Blessing</span>
                          </div>
                          <p className="text-xs sm:text-sm italic text-stone-800 leading-relaxed font-serif">
                            "{item.prayer}"
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
