import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Check, QrCode, Share2, Music, Utensils } from 'lucide-react';
import type { GuestRSVP } from '../types/wedding';
import { saveRSVP } from '../utils/storage';

interface RsvpSectionProps {
  onRsvpAdded: (newRsvp: GuestRSVP) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onRsvpAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    attending: 'both' as 'both' | 'traditional' | 'white' | 'declined',
    partySize: 1,
    guestNames: '',
    mealPreference: 'Pounded Yam with Ofe Oha & Fresh Fish',
    songRequest: '',
  });

  const [submittedPass, setSubmittedPass] = useState<GuestRSVP | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mealOptions = [
    'Pounded Yam with Ofe Oha & Fresh Fish',
    'Jollof Rice with Fried Plantain & Crispy Chicken',
    'Egusi Soup with Semovita & Goat Meat',
    'Abacha (Igbo African Salad) with Ugba & Smoked Fish',
    'Vegetarian Delicacy / Special Diet'
  ];

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#0A3824', '#E2583E', '#F9E498']
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate unique pass code
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const passCode = `MEL-${randomNum}`;

      const newRsvp: GuestRSVP = {
        id: 'rsvp-' + Date.now(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        attending: formData.attending,
        partySize: Number(formData.partySize) || 1,
        guestNames: formData.guestNames.trim(),
        mealPreference: formData.mealPreference,
        songRequest: formData.songRequest.trim(),
        passCode,
        createdAt: new Date().toISOString(),
      };

      saveRSVP(newRsvp);
      onRsvpAdded(newRsvp);
      setSubmittedPass(newRsvp);
      setIsSubmitting(false);

      if (formData.attending !== 'declined') {
        triggerCelebration();
      }
    }, 600);
  };

  const handleSharePass = () => {
    if (navigator.share && submittedPass) {
      navigator.share({
        title: `Wedding Pass: Melvin & Chidimma (#MELWED2026)`,
        text: `I'm attending Melvin & Chidimma's wedding! My pass code is ${submittedPass.passCode}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`Pass Code: ${submittedPass?.passCode} for ${submittedPass?.name}. Kindly screenshot this pass!`);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#072519] text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 igbo-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#F9E498] bg-[#0A3824] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 mb-3 shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Honored Guest Registration</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F9E498] tracking-tight">
            Kindly RSVP to Attend
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-4"></div>
          <p className="text-stone-300 text-sm sm:text-base">
            Please register your attendance so our wedding planning committee and caterers can reserve your royal seat and reception delicacies.
          </p>
        </div>

        {/* Successful Confirmation Pass Card */}
        {submittedPass ? (
          <div className="bg-gradient-to-b from-[#0A3824] to-[#041B12] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-[0_10px_40px_rgba(0,0,0,0.6)] text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37] mb-4">
              <Check className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#E2583E] block">
              Registration Confirmed
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
              Daalu Rinnne, {submittedPass.name}!
            </h3>
            <p className="text-xs text-stone-300 mt-2 mb-6">
              Your seat has been reserved for the celebration of Melvin &amp; Chidimma. Here is your official digital entry pass:
            </p>

            {/* Luxury Digital Ticket Pass */}
            <div className="bg-white text-[#2C2723] rounded-2xl p-5 shadow-2xl border-4 border-[#D4AF37] text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#0A3824] text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-bl-xl">
                VIP GUEST
              </div>

              <div className="border-b border-stone-200 pb-3 mb-3">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                  Wedding Celebration • Dec 18 &amp; 20, 2026
                </span>
                <span className="font-serif-luxury text-xl font-bold text-[#0A3824] block">
                  Melvin &amp; Chidimma #MELWED2026
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Guest Name</span>
                  <span className="font-bold text-stone-800 line-clamp-1">{submittedPass.name}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Party Count</span>
                  <span className="font-bold text-stone-800">{submittedPass.partySize} Person(s)</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Attending</span>
                  <span className="font-bold text-[#0A3824] uppercase text-[11px]">
                    {submittedPass.attending === 'both' ? 'Traditional & White' : submittedPass.attending}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Pass Code</span>
                  <span className="font-mono font-bold text-[#E2583E] tracking-wider">
                    {submittedPass.passCode}
                  </span>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block">Selected Delicacy</span>
                  <span className="text-xs font-semibold text-[#0A3824] line-clamp-1">
                    {submittedPass.mealPreference}
                  </span>
                </div>
                <QrCode className="w-8 h-8 text-[#0A3824] shrink-0" />
              </div>
            </div>

            {/* Pass Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSharePass}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-[#D4AF37] text-[#0A3824] hover:bg-[#ECC867] transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Save / Share Pass</span>
              </button>
              <button
                onClick={() => setSubmittedPass(null)}
                className="py-3 px-4 rounded-xl text-xs font-medium border border-white/20 text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Register Another Guest
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/40 shadow-2xl text-[#2C2723]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3824] mb-2">
                  Full Name / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief & Lolo Emeka Okafor / Dr. Ngozi Eze"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0A3824] text-sm bg-white"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3824] mb-2">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 803 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0A3824] text-sm bg-white"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3824] mb-2">
                  Email Address (For Confirmation)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0A3824] text-sm bg-white"
                />
              </div>

              {/* Attendance Choice */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3824] mb-2">
                  Will You Be Attending? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'both', label: 'Joyfully Attending Both (Traditional & White)' },
                    { id: 'traditional', label: 'Traditional Wedding Only (Dec 18)' },
                    { id: 'white', label: 'White Wedding & Reception (Dec 20)' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-3.5 rounded-xl border cursor-pointer text-xs font-medium flex items-center gap-2 transition-all ${
                        formData.attending === opt.id
                          ? 'border-[#0A3824] bg-[#0A3824]/10 text-[#0A3824] font-bold shadow-sm'
                          : 'border-stone-200 hover:border-stone-400 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={opt.id}
                        checked={formData.attending === opt.id}
                        onChange={() => setFormData({ ...formData, attending: opt.id as any })}
                        className="text-[#0A3824] focus:ring-[#0A3824]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Party Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3824] mb-2">
                  Number of Guests in Your Party
                </label>
                <select
                  value={formData.partySize}
                  onChange={(e) => setFormData({ ...formData, partySize: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0A3824] text-sm bg-white"
                >
                  <option value={1}>Just Me (1 Person)</option>
                  <option value={2}>2 Persons (Me &amp; Spouse / Plus One)</option>
                  <option value={3}>3 Persons (Family)</option>
                  <option value={4}>4 Persons (Family)</option>
                  <option value={5}>5 Persons (Family delegation)</option>
                </select>
              </div>

              {/* Additional Guest Names if party size > 1 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3824] mb-2">
                  Names of Accompanying Guests
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mrs. Blessing Okafor, Master Kamsi"
                  value={formData.guestNames}
                  onChange={(e) => setFormData({ ...formData, guestNames: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0A3824] text-sm bg-white"
                />
              </div>

              {/* Meal Preference */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3824] mb-2 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Preferred Reception Delicacy</span>
                </label>
                <select
                  value={formData.mealPreference}
                  onChange={(e) => setFormData({ ...formData, mealPreference: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0A3824] text-sm bg-white"
                >
                  {mealOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Song request */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3824] mb-2 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-[#E2583E]" />
                  <span>Song You Want to Dance to at the Reception (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flavour - Ada Ada, Umu Obiligbo, or Burna Boy"
                  value={formData.songRequest}
                  onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0A3824] text-sm bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-base font-bold tracking-wide bg-gradient-to-r from-[#D4AF37] via-[#ECC867] to-[#AA771C] text-[#0A3824] hover:shadow-[0_4px_25px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Your Seat...</span>
                ) : (
                  <>
                    <Heart className="w-5 h-5 fill-[#0A3824]" />
                    <span>Confirm My Attendance &amp; Generate Digital Pass</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-stone-500 mt-3">
                Strictly by RSVP. Your digital pass will be required for seamless seating at the reception ballroom.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
