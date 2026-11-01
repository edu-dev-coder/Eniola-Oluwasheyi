import React from 'react';
import { Lock, ArrowUp, Share2, ShieldCheck, Phone, Mail, Sparkles, Send, ExternalLink } from 'lucide-react';
import { COUPLE_DETAILS } from '../data/weddingData';

interface FooterProps {
  onOpenPlanner: () => void;
  onOpenSecurityGate?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPlanner, onOpenSecurityGate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${COUPLE_DETAILS.bride} & ${COUPLE_DETAILS.groom} • #DesignersMeet Royal Wedding`,
        text: `You are cordially invited to celebrate the union of ${COUPLE_DETAILS.bride} & ${COUPLE_DETAILS.groom}! #DesignersMeet`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  return (
    <footer className="bg-[#2A060C] text-white relative overflow-hidden border-t-2 border-[#D4AF37]/40">
      {/* Decorative Gold Accent */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#3D1E16] via-[#D4AF37] to-[#3D1E16]" />

      {/* Background glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Monogram Crest */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#D4AF37]/80 bg-[#380A11]/80 backdrop-blur-md text-[#D4AF37] font-serif text-2xl font-bold tracking-widest shadow-xl shadow-black/50 mb-6">
            E &amp; O
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mb-2">
            Eniola &amp; Oluwaseyi
          </h2>

          <p className="font-serif italic text-[#F9E498] text-base sm:text-lg mb-4">
            "What God has joined together, let no man put asunder." — Matthew 19:6
          </p>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg mx-auto font-light">
            Ẹ kú oríire, àwọn ènìyàn wa ọ̀wọ́n! We eagerly look forward to rejoicing, dancing, and celebrating with you in Ilorin, Kwara State on Saturday, Nov 7, 2026.
          </p>

          {/* Social Hashtag Pill */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-[#D4AF37]/40">
            <span className="font-mono text-xs sm:text-sm text-[#F9E498] font-bold tracking-wider">
              {COUPLE_DETAILS.hashtag}
            </span>
            <span className="text-stone-400 text-xs">•</span>
            <button
              onClick={handleShare}
              className="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Invite</span>
            </button>
          </div>
        </div>

        {/* Quick Links Navigation */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-stone-300 border-t border-b border-white/10 py-6 mb-8 font-medium">
          <a href="#story" className="hover:text-[#D4AF37] transition-colors">Our Covenant</a>
          <a href="#program" className="hover:text-[#D4AF37] transition-colors">Itinerary &amp; Venue</a>
          <a href="#rsvp" className="hover:text-[#D4AF37] transition-colors">RSVP &amp; VIP Pass</a>
          <a href="#registry" className="hover:text-[#D4AF37] transition-colors">Gifts &amp; Accounts</a>
          <a href="#wishes" className="hover:text-[#D4AF37] transition-colors">Wishes &amp; Prayers</a>
          <a href="#party" className="hover:text-[#D4AF37] transition-colors">Parental Honors &amp; Colors</a>
          <a href="#faq" className="hover:text-[#D4AF37] transition-colors">Guest FAQs</a>
        </div>

        {/* PROMINENT NEXUSFLOW DIGITAL ADVERTISEMENT SECTION */}
        <div className="my-10 bg-gradient-to-br from-[#0c3924] via-[#072418] to-[#04150e] rounded-3xl border-2 border-[#D4AF37]/50 p-6 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Subtle gold radial background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Column: Brand Identity & Services */}
            <div className="text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#F9E498] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Engineered &amp; Powered by NexusFlow Digital</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4">
                <img
                  src="./nexusflow/logo-amber.png"
                  alt="NexusFlow Digital Logo"
                  className="h-12 sm:h-14 w-auto object-contain drop-shadow-md"
                />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    NEXUSFLOW DIGITAL
                  </h3>
                  <span className="text-xs text-[#D4AF37] font-mono tracking-wider">
                    Official Web &amp; Experience Studio
                  </span>
                </div>
              </div>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-5">
                Loved this royal wedding website? We build bespoke, breathtaking digital experiences: 
                <span className="text-white font-semibold"> Luxury Wedding Invitations</span> with live RSVP &amp; WhatsApp gate passes, 
                <span className="text-white font-semibold"> Graduation &amp; Milestone Celebration Portals</span>, and 
                <span className="text-[#F9E498] font-semibold"> World-Class SaaS Products &amp; Web Applications</span>.
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-stone-200">
                  💍 Wedding Invites &amp; VIP Passes
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-stone-200">
                  🎓 Graduation &amp; Celebration Sites
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-stone-200">
                  ⚡ High-Performance SaaS Products
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F9E498] font-semibold">
                  🛡️ QR Code Gate Admission Systems
                </span>
              </div>
            </div>

            {/* Right Column: Instant Contact & CTA */}
            <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0 min-w-[280px]">
              <a
                href="https://wa.me/2347087870723?text=Hello%20NexusFlow%20Digital%2C%20I%20saw%20the%20Eniola%20%26%20Oluwaseyi%20wedding%20website%20(%23DesignersMeet)%20and%20I%20would%20love%20to%20create%20a%20website%20with%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold shadow-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Send className="w-4 h-4" />
                <span>Chat on WhatsApp: +234 708 787 0723</span>
              </a>

              <a
                href="tel:+2347087870723"
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-stone-100 border border-white/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Us: +234 708 787 0723</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href="mailto:contact@doxadigital.com"
                  className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                  title="Official Inquiries"
                >
                  <Mail className="w-3 h-3 text-[#D4AF37]" />
                  <span className="truncate">contact@doxadigital.com</span>
                </a>
                <a
                  href="mailto:hello@nexusflowdigital.com"
                  className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                  title="Direct Support"
                >
                  <Mail className="w-3 h-3 text-[#D4AF37]" />
                  <span className="truncate">hello@nexusflowdigital.com</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-4 pt-1 text-xs text-stone-400">
                <a
                  href="https://www.facebook.com/nexusflowdigital1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Facebook</span>
                </a>
                <span>•</span>
                <a
                  href="https://www.linkedin.com/company/146366982/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>© 2026 #DesignersMeet (Eniola &amp; Oluwaseyi). All rights reserved.</span>
            <span>•</span>
            <button
              onClick={onOpenPlanner}
              className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Planner Portal</span>
            </button>
            {onOpenSecurityGate && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenSecurityGate}
                  className="inline-flex items-center gap-1 text-[#F9E498] hover:underline cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  <span>Gate Security</span>
                </button>
              </>
            )}
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
