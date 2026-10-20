import React from 'react';
import { Lock, ArrowUp, Share2 } from 'lucide-react';
import { COUPLE_DETAILS } from '../data/weddingData';

interface FooterProps {
  onOpenPlanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPlanner }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${COUPLE_DETAILS.groom} & ${COUPLE_DETAILS.bride} Royal Wedding`,
        text: `You are cordially invited to celebrate the union of ${COUPLE_DETAILS.groom} & ${COUPLE_DETAILS.bride}! #MELWED2026`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  return (
    <footer className="bg-emerald-950 text-white relative overflow-hidden border-t border-champagne-gold/30">
      {/* Decorative Traditional Accent */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-900 via-champagne-gold to-emerald-900" />

      {/* Background glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-champagne-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Monogram Crest */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-champagne-gold/60 bg-emerald-900/60 backdrop-blur-md text-champagne-gold font-serif text-2xl font-bold tracking-widest shadow-xl shadow-black/40 mb-6">
            M & C
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mb-2">
            Melvin & Chidimma
          </h2>

          <p className="font-serif italic text-champagne-gold text-base sm:text-lg mb-4">
            "What God has joined together, let no man put asunder." — Matthew 19:6
          </p>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg mx-auto font-light">
            Chukwu gozie unu nile na-abịa ime obi anyị ụtọ. We eagerly anticipate rejoicing, dancing, and breaking kola with you in Enugu!
          </p>

          {/* Social Hashtag Pill */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-champagne-gold/30">
            <span className="font-mono text-xs sm:text-sm text-champagne-gold font-bold tracking-wider">
              {COUPLE_DETAILS.hashtag}
            </span>
            <span className="text-stone-400 text-xs">•</span>
            <button
              onClick={handleShare}
              className="text-xs text-white hover:text-champagne-gold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Invite</span>
            </button>
          </div>
        </div>

        {/* Quick Links Navigation */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-stone-300 border-t border-b border-white/10 py-6 mb-8 font-medium">
          <a href="#story" className="hover:text-champagne-gold transition-colors">Love Story</a>
          <a href="#program" className="hover:text-champagne-gold transition-colors">Program of Events</a>
          <a href="#rsvp" className="hover:text-champagne-gold transition-colors">RSVP & Entry Pass</a>
          <a href="#registry" className="hover:text-champagne-gold transition-colors">Gifts & Accounts</a>
          <a href="#wishes" className="hover:text-champagne-gold transition-colors">Wishes & Prayers</a>
          <a href="#attendees" className="hover:text-champagne-gold transition-colors">Guest Registry</a>
          <a href="#party" className="hover:text-champagne-gold transition-colors">Bridal Train</a>
          <a href="#faq" className="hover:text-champagne-gold transition-colors">Guest FAQs</a>
        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>© 2026 #MELWED2026. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={onOpenPlanner}
              className="inline-flex items-center gap-1 text-champagne-gold hover:underline cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Planner Portal</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-300 hover:text-champagne-gold transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
