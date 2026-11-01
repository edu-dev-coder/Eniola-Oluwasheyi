import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Plane,
  Shield,
  Camera,
  Users,
  Palette,
  MapPin,
  Clock
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

const FAQS: FaqItem[] = [
  {
    category: 'Venue & Logistics',
    icon: <MapPin className="w-4 h-4 text-[#D4AF37]" />,
    question: 'Where is the venue and what is the landmark in Ilorin?',
    answer: 'The wedding will be held at JJ & Jaz Event Center, Taoheed Road, Basin, Ilorin, Kwara State. The venue is easily accessible from major junctions in Ilorin and features secure compound parking with professional security.'
  },
  {
    category: 'Time & Promptness',
    icon: <Clock className="w-4 h-4 text-[#D4AF37]" />,
    question: 'What time does the celebration begin?',
    answer: 'The ceremony begins promptly at 11:00 AM on Saturday, November 7, 2026. Guests are encouraged to arrive early to be seated comfortably before the bridal processional.'
  },
  {
    category: 'Wedding Colors & Attire',
    icon: <Palette className="w-4 h-4 text-[#D4AF37]" />,
    question: 'What are the official colors and recommended dress code?',
    answer: 'The official wedding colors are Chocolate Brown, Walnut Brown, Amber, Burnt Orange, and Beige. Dress code is Royal Elegance — bespoke Agbada, lace Gele & Iro, elegant tuxedos, or evening couture.'
  },
  {
    category: 'VIP Pass & Security Admission',
    icon: <Shield className="w-4 h-4 text-[#D4AF37]" />,
    question: 'How does the digital VIP Entry Pass work at the gate?',
    answer: 'When you submit your RSVP on this website, a personalized digital VIP Entry Pass with a verified QR code and unique DES-XXXX pass code is instantly generated. You can download the PDF or save it to your phone/WhatsApp for swift check-in at the security gate.'
  },
  {
    category: 'Attendance & Plus-Ones',
    icon: <Users className="w-4 h-4 text-[#D4AF37]" />,
    question: 'Can I bring a guest or spouse with me?',
    answer: 'Yes! Our RSVP form provides options for "Just Me" (1 Guest) or "Me and My Spouse" (2 Guests). To assist with table and banquet catering arrangements, please confirm your attendance online.'
  },
  {
    category: 'Travel & Accommodation',
    icon: <Plane className="w-4 h-4 text-[#D4AF37]" />,
    question: 'Traveling from out of town? Airport & Hotel options in Ilorin',
    answer: 'For guests traveling by air, Ilorin International Airport (ILR) provides direct flights from Lagos and Abuja. Quality hotels in the vicinity include Princess Luxury Hotels, Kwara Hotel, and Dabras Hotel along Fate/Basin Road.'
  },
  {
    category: 'Photography & Social Media',
    icon: <Camera className="w-4 h-4 text-[#D4AF37]" />,
    question: 'What is the wedding hashtag and can we share photos?',
    answer: 'Our official hashtag is #DesignersMeet. We encourage you to capture every joyful moment and tag us on Instagram, TikTok, and X!'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#380A11]/10 border border-[#D4AF37]/30 text-[#380A11] text-xs tracking-widest uppercase font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C85023]" />
            <span>Àwọn Ìbéèrè • Guest Information Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#380A11] mb-3 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about celebrating #DesignersMeet in Ilorin, Kwara State on Saturday, November 7, 2026.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-[#FAF7F2] border-[#D4AF37]/60 shadow-md'
                    : 'bg-white hover:bg-stone-50 border-stone-200'
                }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-[#380A11]/10 flex items-center justify-center shrink-0">
                      {faq.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#C85023] uppercase tracking-wider font-semibold block">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#380A11]">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#380A11] text-white' : 'bg-stone-100 text-stone-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 animate-fade-in pl-16">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
