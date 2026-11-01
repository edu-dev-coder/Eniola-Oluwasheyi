import React, { useState } from 'react';
import { Sparkles, Heart, ZoomIn, X, Crown, Scissors, Palette } from 'lucide-react';
import { WEDDING_COUPLE, GALLERY_PORTRAITS } from '../data/weddingData';

export const Story: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="union" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#2C2723] relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97724]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#380A11]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#380A11] bg-[#380A11]/10 px-4 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D97724]" />
            <span>#DesignersMeet • The Covenant</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#380A11] tracking-tight">
            Two Creative Souls, One Divine Destiny
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#380A11] via-[#D97724] to-[#D4AF37] mx-auto my-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base font-serif-luxury italic">
            "Every good gift and every perfect gift is from above, coming down from the Father of lights." — James 1:17
          </p>
        </div>

        {/* Feature Split: Official Invitation Flyer & Couple Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          {/* Left: The Official Invitation Flyer Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onClick={() => setSelectedImage('./photos/invitation-card.jpeg')}
              className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37] max-w-sm w-full bg-[#380A11] transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src="./photos/invitation-card.jpeg"
                alt="Eniola & Oluwaseyi Wedding Invitation Card"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                <span className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#240408] text-xs font-bold flex items-center gap-2 shadow-lg">
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to Expand Invitation</span>
                </span>
              </div>
            </div>
            <span className="text-xs text-stone-500 font-mono mt-3 uppercase tracking-wider">
              Official Printed Invitation Card
            </span>
          </div>

          {/* Right: The Designers Spotlight & Proclamation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D97724] font-bold mb-2">
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span>The Visionary Union</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#380A11]">
                Where Love Meets Master Craftsmanship
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed mt-3">
                In fashion and design, true beauty is found in balance, harmony, and thoughtful detail. When God brought 
                <span className="font-semibold text-stone-900"> Falola Abisola Eniola </span> and 
                <span className="font-semibold text-stone-900"> Adebiyi Peter Oluwaseyi </span> together, He orchestrated a seamless pattern of mutual respect, shared passion, and unwavering Christian faith.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-100">
                {/* Bride Pill */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D97724]/20">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#C85023] mb-1">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>The Bride</span>
                  </div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#380A11]">
                    {WEDDING_COUPLE.bride.fullName}
                  </h4>
                  <p className="text-xs text-stone-500 italic mt-0.5">
                    Daughter of {WEDDING_COUPLE.bride.parents}
                  </p>
                  <p className="text-xs text-stone-600 italic mt-2">
                    "{WEDDING_COUPLE.bride.quote}"
                  </p>
                </div>

                {/* Groom Pill */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D97724]/20">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#D97724] mb-1">
                    <Palette className="w-3.5 h-3.5" />
                    <span>The Groom</span>
                  </div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#380A11]">
                    {WEDDING_COUPLE.groom.fullName}
                  </h4>
                  <p className="text-xs text-stone-500 italic mt-0.5">
                    Son of {WEDDING_COUPLE.groom.parents}
                  </p>
                  <p className="text-xs text-stone-600 italic mt-2">
                    "{WEDDING_COUPLE.groom.quote}"
                  </p>
                </div>
              </div>

              {/* Invitation Callout */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#380A11] to-[#240408] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono text-[#F5E19A] uppercase tracking-wider block font-bold">
                    Official VIP Invitation
                  </span>
                  <p className="text-xs text-stone-200 mt-0.5">
                    Please confirm attendance below to receive your personalized VIP pass with scannable gate QR code.
                  </p>
                </div>
                <a
                  href="#rsvp"
                  className="shrink-0 px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#F5E19A] text-[#240408] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#240408]" />
                  <span>RSVP Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div id="gallery" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest uppercase text-[#D97724] block mb-1">
              Visual Narrative
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#380A11]">
              The #DesignersMeet Portrait Gallery
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Moments of grace, tailored elegance, and quiet joy captured on our journey to forever.
            </p>
          </div>

          {/* Grid of Pre-wedding Photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY_PORTRAITS.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img.src)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden aspect-[3/4] shadow-md border border-stone-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-stone-100"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 sm:p-4 flex flex-col justify-end text-white">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#F5E19A] font-semibold">
                    {img.tag}
                  </span>
                  <span className="font-serif-luxury text-xs sm:text-sm font-bold line-clamp-1">
                    {img.title}
                  </span>
                  <span className="text-[10px] text-stone-300 line-clamp-2 mt-0.5 hidden sm:block">
                    {img.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full-Screen Image Viewing */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Eniola & Oluwaseyi Wedding Preview"
              className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-2xl border-2 border-[#D4AF37] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-[#D4AF37] hover:text-[#240408] transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
