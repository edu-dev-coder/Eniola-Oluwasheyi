import React, { useState } from 'react';
import { Heart, Sparkles, MapPin, X, ZoomIn } from 'lucide-react';
import { LOVE_STORY, WEDDING_COUPLE } from '../data/weddingData';

export const Story: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: '/images/igbo-bride.jpg',
      title: 'Chidimma, The Radiant Bride',
      subtitle: 'Adorned in royal coral beads (Iyin) & emerald green lace',
    },
    {
      src: '/images/igbo-couple-igbankwu.jpg',
      title: 'Traditional Igba Nkwu Ceremony',
      subtitle: 'The sacred moment of wine carrying & ancestral blessing',
    },
    {
      src: '/images/white-wedding-couple.jpg',
      title: 'Melvin & Chidimma • Forever Matrimony',
      subtitle: 'Bespoke elegance & holy vows sealed in love',
    },
  ];

  return (
    <section id="story" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#2C2723] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#0A3824] bg-[#0A3824]/10 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>How God Wove Our Hearts</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A3824] tracking-tight">
            Our Journey to Forever
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-4"></div>
          <p className="text-stone-600 text-sm sm:text-base font-serif-luxury italic">
            "He who finds a wife finds a good thing and obtains favor from the Lord." — Proverbs 18:22
          </p>
        </div>

        {/* Featured Portraits Spotlight: The Bride & The Groom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* The Bride Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D4AF37]/30 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E2583E]/10 rounded-full blur-2xl"></div>
            <div className="relative mb-6">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl p-1 bg-white">
                <img
                  src="/images/igbo-bride.jpg"
                  alt={WEDDING_COUPLE.bride.fullName}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="absolute bottom-2 right-2 bg-[#0A3824] text-[#D4AF37] p-2 rounded-full shadow-lg border border-[#D4AF37]/50">
                <Heart className="w-4 h-4 fill-[#D4AF37]" />
              </span>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#E2583E] font-bold">
              The Bride
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#0A3824] mt-1 mb-2">
              {WEDDING_COUPLE.bride.fullName}
            </h3>
            <p className="text-xs text-stone-500 mb-4 font-serif-luxury italic">
              Daughter of {WEDDING_COUPLE.bride.parents}
            </p>
            <p className="text-stone-600 text-sm leading-relaxed max-w-md">
              "{WEDDING_COUPLE.bride.bio}"
            </p>
            <div className="mt-6 pt-4 border-t border-stone-100 w-full text-xs text-[#0A3824] font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Adaeze of Mel's Heart</span>
            </div>
          </div>

          {/* The Groom Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D4AF37]/30 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A3824]/10 rounded-full blur-2xl"></div>
            <div className="relative mb-6">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl p-1 bg-white">
                <img
                  src="/images/white-wedding-couple.jpg"
                  alt={WEDDING_COUPLE.groom.fullName}
                  className="w-full h-full object-cover object-top rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="absolute bottom-2 right-2 bg-[#0A3824] text-[#D4AF37] p-2 rounded-full shadow-lg border border-[#D4AF37]/50">
                <Heart className="w-4 h-4 fill-[#D4AF37]" />
              </span>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              The Groom
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#0A3824] mt-1 mb-2">
              {WEDDING_COUPLE.groom.fullName}
            </h3>
            <p className="text-xs text-stone-500 mb-4 font-serif-luxury italic">
              Son of {WEDDING_COUPLE.groom.parents}
            </p>
            <p className="text-stone-600 text-sm leading-relaxed max-w-md">
              "{WEDDING_COUPLE.groom.bio}"
            </p>
            <div className="mt-6 pt-4 border-t border-stone-100 w-full text-xs text-[#0A3824] font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Beloved of Chidimma</span>
            </div>
          </div>
        </div>

        {/* Story Milestones Timeline */}
        <div className="relative mb-20">
          <div className="text-center mb-10">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#0A3824]">
              Our Chapters
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mt-1">
              From Lagos to Enugu • A Tapestry of Love
            </p>
          </div>

          <div className="relative border-l-2 border-[#D4AF37]/40 ml-4 sm:ml-32 md:ml-48 space-y-12">
            {LOVE_STORY.map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-10 group">
                {/* Timeline node icon */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0A3824] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md group-hover:scale-110 transition-transform">
                  <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
                </div>

                {/* Date marker for larger screens */}
                <div className="hidden sm:block absolute -left-48 top-2 text-right w-36">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#0A3824] block">
                    {item.year}
                  </span>
                  <span className="text-[11px] text-stone-500 flex items-center justify-end gap-1">
                    <MapPin className="w-3 h-3 text-[#E2583E]" />
                    {item.location}
                  </span>
                </div>

                {/* Milestone Content Box */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-md hover:shadow-lg transition-all">
                  <div className="sm:hidden flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-bold text-[#0A3824]">{item.year}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E2583E]" />
                      {item.location}
                    </span>
                  </div>
                  <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#0A3824] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                  {item.caption && (
                    <p className="mt-3 text-xs text-[#D4AF37] font-serif-luxury italic font-medium">
                      ~ {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tentative Photo Gallery */}
        <div className="bg-[#0A3824] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 igbo-pattern opacity-30"></div>
          <div className="relative z-10">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                Moments of Splendor
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F9E498] mt-1">
                Tentative Wedding Gallery
              </h3>
              <p className="text-xs text-stone-300 mt-2">
                A glimpse into our authentic Igbo attire, coral beads royalty, and celebration moments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img.src)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-[#D4AF37]/30 bg-black/40 aspect-[4/5]"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <span className="text-white font-serif-luxury text-lg font-bold">
                      {img.title}
                    </span>
                    <span className="text-[#F3E5AB] text-xs mt-1">
                      {img.subtitle}
                    </span>
                    <div className="mt-2 flex items-center gap-1 text-[11px] text-[#D4AF37] font-medium">
                      <ZoomIn className="w-3 h-3" />
                      <span>Click to view full photo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-[#D4AF37] p-2 rounded-full bg-black/50 border border-white/20"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Enlarged celebration view"
              className="w-full h-full object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
};
