import React, { useState } from 'react';
import { Crown, Sparkles, Shirt, Phone, Check, Copy, Palette, HeartHandshake } from 'lucide-react';
import { WEDDING_COLORS } from '../data/weddingData';

interface Coordinator {
  name: string;
  role: string;
  phone: string;
  tel: string;
  notes: string;
}

const COORDINATORS: Coordinator[] = [
  {
    name: 'Queen',
    role: 'Chief Protocol & RSVP Coordinator',
    phone: '08163186020',
    tel: '+2348163186020',
    notes: 'Inquiries on guest registry, table allocations, VIP reception seating & VIP gate access.'
  },
  {
    name: 'Bode',
    role: 'Logistics & RSVP Coordinator',
    phone: '08176498609',
    tel: '+2348176498609',
    notes: 'Inquiries on directions to JJ & Jaz Event Center, parking reservations, and guest arrivals.'
  }
];

export const WeddingParty: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const copyContact = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedPhone(num);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  return (
    <section id="party" className="py-20 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#380A11]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#380A11]/10 border border-[#D4AF37]/40 text-[#380A11] text-xs tracking-widest uppercase font-medium mb-3">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Family Honors, Royal Colors &amp; Protocol</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#380A11] mb-3 tracking-tight">
            Parental Honors &amp; Dress Code
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Honoring the esteemed parents whose prayers paved the way, the distinguished wedding colors,
            and our official RSVP coordinators for #DesignersMeet.
          </p>
        </div>

        {/* Parents of the Couple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Bride's Parents */}
          <div className="bg-gradient-to-br from-white to-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/40 shadow-xl shadow-stone-200/50 relative overflow-hidden group hover:border-[#D4AF37] transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C85023] font-bold mb-3">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>Parents of the Bride</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#380A11] mb-1">
              Elder &amp; Deaconess B.J Falola
            </h3>
            <p className="text-xs text-stone-500 mb-4 font-mono">The Falola Family</p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic bg-white/70 p-4 rounded-2xl border border-stone-100">
              "With hearts filled with joy and gratitude to God Almighty, we proudly present our beloved daughter, Falola Abisola Eniola, into holy matrimony. May their home be blessed with peace, abundance, and divine favor."
            </p>
          </div>

          {/* Groom's Parents */}
          <div className="bg-gradient-to-br from-white to-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/40 shadow-xl shadow-stone-200/50 relative overflow-hidden group hover:border-[#D4AF37] transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#380A11]/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5C3322] font-bold mb-3">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>Parents of the Groom</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#380A11] mb-1">
              Late Senior Apostle &amp; Mrs Joshua Adebiyi
            </h3>
            <p className="text-xs text-stone-500 mb-4 font-mono">The Adebiyi Family</p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic bg-white/70 p-4 rounded-2xl border border-stone-100">
              "Remembering with fond reverence our patriarch, Senior Apostle Joshua Adebiyi, we rejoice exceedingly as our son, Adebiyi Peter Oluwaseyi, takes his bride Eniola. May God’s eternal covenant rest upon their union."
            </p>
          </div>
        </div>

        {/* Wedding Colors Spotlight Banner */}
        <div className="mb-16 bg-[#380A11] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border-2 border-[#D4AF37]/40 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-60 h-60 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F9E498] text-xs font-mono uppercase tracking-wider mb-2">
                <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Wedding Colors of the Day</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                The Designers' Palette
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                As two creative fashion designers, Eniola &amp; Oluwaseyi have carefully curated a warm, regal, autumn-inspired color symphony.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
                Dress Code:
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20">
                Bespoke African Couture / Formal
              </span>
            </div>
          </div>

          {/* Color Swatches Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {WEDDING_COLORS.map((col, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col items-center text-center hover:scale-105 transition-all duration-300 group"
              >
                <div
                  className="w-16 h-16 rounded-full mb-3 shadow-lg border-2 border-white/40 group-hover:scale-110 transition-transform flex items-center justify-center"
                  style={{ backgroundColor: col.hex }}
                >
                  <span className="text-[10px] font-mono font-bold text-white drop-shadow">
                    {col.hex}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-white text-sm mb-1">{col.name}</h4>
                <p className="text-[11px] text-stone-300 leading-tight">{col.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs text-stone-200">
            <div className="flex items-start gap-2.5 bg-black/20 p-3.5 rounded-2xl border border-white/10">
              <Shirt className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#F9E498] block mb-0.5 font-sans">For the Distinguished Ladies:</strong>
                Gele, Iro &amp; Buba, luxurious lace, and elegant evening gowns in any combination of Amber, Burnt Orange, Chocolate, or Beige.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-black/20 p-3.5 rounded-2xl border border-white/10">
              <Shirt className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#F9E498] block mb-0.5 font-sans">For the Distinguished Gentlemen:</strong>
                Tailored Agbada, Senator outfits, or bespoke two-piece suits in Chocolate Brown, Walnut, or crisp Beige with Amber accents.
              </div>
            </div>
          </div>
        </div>

        {/* Official RSVP Contacts Section */}
        <div className="bg-gradient-to-br from-white to-[#FAF7F2] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#380A11]/10 text-[#380A11] text-xs font-mono uppercase tracking-wider mb-2">
              <HeartHandshake className="w-3.5 h-3.5 text-[#C85023]" />
              <span>Official RSVP Coordinators</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#380A11]">
              Need Assistance with Your Attendance?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              For VIP reservations, venue navigation to JJ &amp; Jaz Event Center Ilorin, or special accommodations, reach out to our dedicated coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COORDINATORS.map((coord, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C85023]">
                      {coord.role}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#380A11] mb-2">{coord.name}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">{coord.notes}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between bg-stone-50 px-3 py-2 rounded-xl border border-stone-200">
                    <span className="text-xs font-mono font-bold text-[#380A11]">{coord.phone}</span>
                    <button
                      onClick={() => copyContact(coord.phone)}
                      className="text-xs font-semibold text-[#5C3322] hover:text-[#C85023] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPhone === coord.phone ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${coord.tel}`}
                      className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#380A11]" />
                      <span>Direct Call</span>
                    </a>
                    <a
                      href={`https://wa.me/234${coord.phone.replace(/^0/, '')}?text=Hello%20${encodeURIComponent(coord.name)},%20I%20am%20reaching%20out%20regarding%20the%20wedding%20of%20Eniola%20and%20Oluwaseyi%20(%23DesignersMeet)`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
