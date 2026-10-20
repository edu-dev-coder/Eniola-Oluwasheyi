import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Plane,
  Building,
  Shield,
  Camera,
  Users,
  Baby
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

const FAQS: FaqItem[] = [
  {
    category: 'Travel & Airport',
    icon: <Plane className="w-4 h-4 text-champagne-gold" />,
    question: 'Which airport should I fly into, and is transportation arranged?',
    answer: 'The closest commercial airport is Akanu Ibiam International Airport, Enugu (ENU), situated approximately 15 minutes from the Cathedral and Monarch Ballroom. Dedicated guest shuttle buses will be stationed at the airport on Friday Dec 18 and Saturday Dec 19 to transport confirmed attendees to our partner hotels.'
  },
  {
    category: 'Accommodations',
    icon: <Building className="w-4 h-4 text-champagne-gold" />,
    question: 'Where should guests stay? Are there discounted hotel rates?',
    answer: 'Yes! We have reserved rooms with special discounted rates at: (1) Golden Royale Hotel (Independence Layout), (2) The Monarch Hotel & Suites (Presidential Road), and (3) Nike Lake Resort (Abakpa). Mention code "MELWED2026" during booking or contact our logistics desk for concierge reservations.'
  },
  {
    category: 'RSVP & Plus-Ones',
    icon: <Users className="w-4 h-4 text-champagne-gold" />,
    question: 'Can I bring a plus-one or uninvited guest?',
    answer: 'Due to ballroom capacity restrictions and seated banquet catering, admission to The Monarch Grand Ballroom is strictly by confirmed RSVP. Please register everyone attending in your party through the RSVP form on this site so they receive their digital entry pass and personalized table allocation.'
  },
  {
    category: 'Dress Code',
    icon: <HelpCircle className="w-4 h-4 text-champagne-gold" />,
    question: 'What is the required dress code for each day?',
    answer: 'Traditional Wedding (Friday): Royal Igbo attire, George wrappers, Isiagu, Coral beads, and vibrant emerald or gold accents. White Wedding & Reception (Sunday): Formal Black Tie or Modern African Haute Couture. Colors: Champagne Gold, Forest Green, Ivory & Midnight Onyx.'
  },
  {
    category: 'Children Policy',
    icon: <Baby className="w-4 h-4 text-champagne-gold" />,
    question: 'Are children allowed to attend the ceremonies?',
    answer: 'Yes, children are welcome! For parents seeking peaceful dining during the formal dinner and speeches, a safe, fun, and fully supervised Children Play & Gaming Lounge with certified child-care attendants and children meals will be open inside The Monarch Ballroom complex.'
  },
  {
    category: 'Security & Parking',
    icon: <Shield className="w-4 h-4 text-champagne-gold" />,
    question: 'What are the security and parking arrangements?',
    answer: 'Both venues feature fortified private compounds with 24-hour private security personnel, armed escort checkpoints, and CCTV monitoring. Complimentary valet parking and secure designated driver parking are available at both locations.'
  },
  {
    category: 'Social Media & Photos',
    icon: <Camera className="w-4 h-4 text-champagne-gold" />,
    question: 'What is the wedding hashtag and can we take photos?',
    answer: 'Our official hashtag is #MELWED2026. Please tag us on Instagram, TikTok, and X! During the sacred church vows at the Cathedral, we kindly ask that guests remain seated and allow our professional media team to capture the altar moments. Free photo-booths and roaming video booths await you at the reception!'
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs tracking-widest uppercase font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-champagne-gold-dark" />
            <span>Ajuju Ndị A Na-ajụ Karịa • Guest Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-emerald-950 mb-3 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about traveling to Enugu, hotel bookings, attendance guidelines, and celebrating smoothly with us.
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
                    ? 'bg-warm-ivory/50 border-champagne-gold/50 shadow-sm'
                    : 'bg-stone-50/70 border-stone-200/70 hover:bg-stone-50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-5 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center flex-shrink-0 border border-stone-200">
                      {faq.icon}
                    </div>
                    <span className="font-serif font-semibold text-emerald-950 text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-900 bg-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/50 mt-1 pl-16">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Us Box */}
        <div className="mt-12 text-center p-6 rounded-3xl bg-stone-50 border border-stone-200">
          <p className="text-xs sm:text-sm text-stone-600 mb-2">
            Still have questions about flights, VIP tables, or special accommodations?
          </p>
          <div className="inline-flex items-center gap-4 text-xs font-semibold text-emerald-950">
            <span>Email: <a href="mailto:info@melwed2026.com" className="text-emerald-800 underline">info@melwed2026.com</a></span>
            <span>•</span>
            <span>Helpline: <a href="tel:+2348037194421" className="text-emerald-800 underline">+234 (0) 803 719 4421</a></span>
          </div>
        </div>
      </div>
    </section>
  );
};
