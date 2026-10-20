import React, { useState } from 'react';
import { Users, Crown, Sparkles, Shirt, Phone, Check, Copy } from 'lucide-react';

interface PartyMember {
  name: string;
  role: string;
  relationship: string;
  image?: string;
}

const BRIDAL_PARTY: PartyMember[] = [
  {
    name: 'Adaora Nwosu',
    role: 'Chief Bridesmaid (Maid of Honor)',
    relationship: 'Chidimma\'s Childhood Sister-Friend',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Dr. Obinna Anyaoku',
    role: 'Best Man',
    relationship: 'Melvin\'s University Brother & Confidant',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Nneka Eze',
    role: 'Bridesmaid',
    relationship: 'Bride\'s Dearest Cousin',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Kenechukwu Okafor',
    role: 'Groomsman',
    relationship: 'Groom\'s Younger Brother',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Chioma Okoli',
    role: 'Bridesmaid',
    relationship: 'Longtime Bestie & Confidante',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Emeka Umeh',
    role: 'Groomsman',
    relationship: 'Engineering Colleague & Buddy',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80'
  }
];

export const WeddingParty: React.FC = () => {
  const [copiedFabric, setCopiedFabric] = useState(false);

  const copyContact = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedFabric(true);
    setTimeout(() => setCopiedFabric(false), 2500);
  };

  return (
    <section id="party" className="py-20 bg-stone-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-800/20 text-emerald-950 text-xs tracking-widest uppercase font-medium mb-3">
            <Users className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Ndi Ezi Na Ulo • Bridal Train & Aso-Ebi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-emerald-950 mb-3 tracking-tight">
            The Wedding Party & Aso-Ebi
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Meet the cherished souls standing beside Melvin & Chidimma on their royal day, plus full details for our family and friends securing the celebration fabrics.
          </p>
        </div>

        {/* Parents of the Couple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Bride Parents */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-champagne-gold/30 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-champagne-gold/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-champagne-gold-dark font-semibold mb-2">
              <Crown className="w-4 h-4 text-champagne-gold" />
              <span>Parents of the Bride</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-emerald-950 mb-1">
              Mazi & Lolo Kenneth Eze
            </h3>
            <p className="text-xs text-stone-500 mb-3">Of Umueze Village, Oji River, Enugu State</p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
              "With immense thanksgiving to God Almighty, we joyfully present our daughter, Chidimma Precious, into this blessed covenant of holy matrimony."
            </p>
          </div>

          {/* Groom Parents */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-champagne-gold/30 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-900/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold mb-2">
              <Crown className="w-4 h-4 text-emerald-800" />
              <span>Parents of the Groom</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-emerald-950 mb-1">
              Chief & Lolo Fidelis Okafor
            </h3>
            <p className="text-xs text-stone-500 mb-3">Of Umuokoro Royal Clan, Enugu</p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
              "We welcome our royal daughter Chidimma with open arms and boundless love into the Okafor dynasty. May peace and fruitfulness abound!"
            </p>
          </div>
        </div>

        {/* Bridal Squad Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl text-emerald-950 font-bold mb-1">
              The Bridal Squad & Groomsmen
            </h3>
            <p className="text-xs text-stone-500">The pillar of love, laughter, and support</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {BRIDAL_PARTY.map((person, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-200/80 text-center flex flex-col group"
              >
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 inset-x-2 text-[10px] font-semibold text-champagne-gold uppercase tracking-wider truncate">
                    {person.role.split('(')[0]}
                  </span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h4 className="font-serif font-bold text-emerald-950 text-xs sm:text-sm leading-snug">
                    {person.name}
                  </h4>
                  <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">
                    {person.relationship}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aso-Ebi & Fabric Details Banner */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-champagne-gold/40 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-champagne-gold/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-champagne-gold text-xs font-mono uppercase tracking-wider">
                <Shirt className="w-3.5 h-3.5" />
                <span>Official Wedding Fabric (Aso-Ebi)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Celebrate in Royal Emerald & Champagne Gold
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                We invite all our esteemed guests to radiate Igbo royalty! Exclusive high-quality George fabric, French lace, and caps/Gele bundles are available through our official Aso-Ebi coordinator.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-champagne-gold font-mono uppercase tracking-wider font-semibold block mb-0.5">
                    Traditional Ceremony
                  </span>
                  <p className="text-xs text-stone-200">
                    Emerald Green George wrapper + Coral bead accents + Gold Gele / Fila.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-champagne-gold font-mono uppercase tracking-wider font-semibold block mb-0.5">
                    White Wedding Reception
                  </span>
                  <p className="text-xs text-stone-200">
                    Black Tie Glamour / Champagne Gold & Forest Green African Couture.
                  </p>
                </div>
              </div>
            </div>

            {/* Coordinator Card on Right */}
            <div className="lg:col-span-5 bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center sm:text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-champagne-gold uppercase tracking-wider font-semibold mb-2">
                <Sparkles className="w-4 h-4 text-champagne-gold" />
                <span>Aso-Ebi Inquiries & Dispatch</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-white mb-1">
                Lolo Ngozi (Fabric Coordinator)
              </h4>
              <p className="text-xs text-stone-400 mb-4">
                Available for delivery across Lagos, Abuja, Enugu, Port Harcourt, and UK/US diaspora shipments.
              </p>

              <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono font-bold text-champagne-gold">
                  +234 803 719 4421
                </span>
                <button
                  onClick={() => copyContact('+234 803 719 4421')}
                  className="px-2.5 py-1 rounded-lg bg-champagne-gold text-emerald-950 text-[11px] font-semibold flex items-center gap-1 hover:bg-champagne-gold-light transition-colors cursor-pointer"
                >
                  {copiedFabric ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="https://wa.me/2348037194421?text=Hello%20Lolo%20Ngozi,%20I%20would%20like%20to%20order%20the%20official%20Aso-Ebi%20for%20%23MELWED2026"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp to Secure Fabric</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
