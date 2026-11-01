import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Check,
  QrCode,
  Music,
  Utensils,
  Download,
  Send,
  Loader2,
  ShieldCheck,
  Phone
} from 'lucide-react';
import QRCode from 'qrcode';
import type { GuestRSVP } from '../types/wedding';
import { WEDDING_COUPLE } from '../data/weddingData';
import {
  generatePassPDF,
  downloadBlobAsFile,
  sharePDFToWhatsApp
} from '../utils/pdfGenerator';

interface RsvpSectionProps {
  onRsvpAdded: (newRsvp: GuestRSVP) => void;
  onOpenSecurityGate?: (code?: string) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onRsvpAdded, onOpenSecurityGate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    attending: 'both' as 'both' | 'traditional' | 'white' | 'declined',
    partySize: 1,
    guestNames: '',
    mealPreference: 'Amala with Abula (Gbegiri & Ewedu) + Assorted Goat Meat',
    songRequest: '',
  });

  const [submittedPass, setSubmittedPass] = useState<GuestRSVP | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfActionStatus, setPdfActionStatus] = useState<string | null>(null);

  const passCardRef = useRef<HTMLDivElement>(null);

  // Generate QR code whenever a pass is confirmed
  useEffect(() => {
    if (submittedPass) {
      const verifyUrl = `${window.location.origin}${window.location.pathname}?verify=${submittedPass.passCode}`;
      QRCode.toDataURL(verifyUrl, {
        width: 300,
        margin: 1,
        color: {
          dark: '#240408',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Failed to generate pass QR code', err));
    }
  }, [submittedPass]);

  const mealOptions = [
    'Amala with Abula (Gbegiri & Ewedu) + Assorted Goat Meat',
    'Jollof Rice & Fried Rice with Crispy Chicken, Plantain & Fresh Salad',
    'Pounded Yam with Rich Egusi Soup & Fresh Fish / Beef',
    'Fried Rice with Peppered Gizzard & Sautéed Prawns',
    'Special Diet / Continental / Vegetarian Delicacy'
  ];

  const triggerCelebration = () => {
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#D97724', '#380A11', '#C85023', '#F5E19A']
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate unique pass code
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const passCode = `DES-${randomNum}`;

      const newRsvp: GuestRSVP = {
        id: `rsvp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
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

      onRsvpAdded(newRsvp);
      setSubmittedPass(newRsvp);
      setIsSubmitting(false);

      if (formData.attending !== 'declined') {
        triggerCelebration();
      }
    }, 600);
  };

  const handleSendToWhatsApp = async () => {
    if (!passCardRef.current || !submittedPass) return;

    try {
      setIsGeneratingPdf(true);
      setPdfActionStatus('Rendering VIP Pass PDF...');

      const result = await sharePDFToWhatsApp({
        element: passCardRef.current,
        passCode: submittedPass.passCode,
        guestName: submittedPass.name,
        partySize: submittedPass.partySize,
        attending: submittedPass.attending,
      });

      if (!result.sharedViaNative) {
        setPdfActionStatus('Pass downloaded to your device & WhatsApp opened!');
        setTimeout(() => setPdfActionStatus(null), 5000);
      } else {
        setPdfActionStatus(null);
      }
    } catch (err) {
      console.error('Failed to send PDF to WhatsApp', err);
      alert('Unable to generate PDF automatically. You may screenshot this pass or try downloading directly.');
      setPdfActionStatus(null);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!passCardRef.current || !submittedPass) return;

    try {
      setIsGeneratingPdf(true);
      setPdfActionStatus('Preparing High-Res PDF Pass...');

      const { blob } = await generatePassPDF(
        passCardRef.current,
        submittedPass.passCode,
        submittedPass.name
      );

      const filename = `DesignersMeet-VIP-Pass-${submittedPass.passCode}.pdf`;
      downloadBlobAsFile(blob, filename);

      setPdfActionStatus('VIP Pass downloaded successfully!');
      setTimeout(() => setPdfActionStatus(null), 4000);
    } catch (err) {
      console.error('Failed to download PDF pass', err);
      alert('Could not download PDF. Please take a screenshot of your pass.');
      setPdfActionStatus(null);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#240408] text-white relative overflow-hidden">
      {/* Background Image Texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="./photos/studio-suit-shoulders.jpg"
          alt="Studio Background"
          className="w-full h-full object-cover object-center opacity-15 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#240408] via-[#380A11]/90 to-[#240408]"></div>
        <div className="absolute inset-0 wine-pattern opacity-30 mix-blend-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#F5E19A] bg-[#380A11] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 mb-3 shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>VIP Guest Admission Protocol</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5E19A] tracking-tight">
            Register for Your VIP Pass
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] via-[#D97724] to-[#C85023] mx-auto my-4 rounded-full"></div>
          <p className="text-stone-300 text-sm sm:text-base">
            Kindly register your attendance to receive your official digital pass. Present your pass at the security gate at JJ &amp; Jaz Event Center, Basin, Ilorin.
          </p>

          {/* Direct RSVP Coordinators Call Pill */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-300 font-mono">
            <span>RSVP Inquiries:</span>
            {WEDDING_COUPLE.rsvpContacts.map((contact, i) => (
              <a
                key={i}
                href={`tel:${contact.tel}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#F5E19A] transition-colors"
              >
                <Phone className="w-3 h-3 text-[#D97724]" />
                <span>{contact.name}: {contact.phone}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Successful Confirmation Pass Card */}
        {submittedPass ? (
          <div className="bg-gradient-to-b from-[#380A11] to-[#1e0205] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-[0_15px_50px_rgba(0,0,0,0.8)] text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37] mb-4">
              <Check className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#D97724] block font-mono">
              Reservation Confirmed
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
              Welcome, {submittedPass.name}!
            </h3>
            <p className="text-xs text-stone-300 mt-2 mb-6">
              Your royal seat has been confirmed for <span className="text-[#F5E19A] font-semibold">#DesignersMeet</span>. Below is your official digital entry pass with security verification QR code:
            </p>

            {/* Luxury Digital Ticket Pass (Captured for PDF export) */}
            <div
              ref={passCardRef}
              className="bg-white text-[#2C2723] rounded-2xl p-5 shadow-2xl border-4 border-[#D4AF37] text-left relative overflow-hidden"
            >
              {/* Top VIP Badge */}
              <div className="absolute top-0 right-0 bg-[#380A11] text-[#F5E19A] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-bl-xl border-b border-l border-[#D4AF37]/50 font-mono">
                VIP ADMISSION PASS
              </div>

              {/* Event Title Header */}
              <div className="border-b border-stone-200 pb-3 mb-3">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold font-mono">
                  Holy Matrimony &amp; Engagement • Saturday, Nov 07, 2026
                </span>
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#380A11] block">
                  Eniola &amp; Oluwaseyi #DesignersMeet
                </span>
                <span className="text-[11px] text-[#D97724] font-medium block">
                  JJ &amp; Jaz Event Center, Taoheed Rd, Basin, Ilorin, Kwara State
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold font-mono">Guest Name</span>
                  <span className="font-bold text-stone-800 line-clamp-1">{submittedPass.name}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold font-mono">Party Allowance</span>
                  <span className="font-bold text-stone-800">
                    {submittedPass.partySize === 2 ? 'Me & My Spouse (2 Persons)' : 'Just Me (1 Person)'}
                  </span>
                  {submittedPass.partySize === 2 && submittedPass.guestNames && (
                    <span className="text-[10px] text-stone-500 block truncate">
                      Spouse: {submittedPass.guestNames}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold font-mono">Ceremony Access</span>
                  <span className="font-bold text-[#380A11] uppercase text-[11px]">
                    {submittedPass.attending === 'both' ? 'Engagement & Reception' : submittedPass.attending}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold font-mono">Pass Code</span>
                  <span className="font-mono font-bold text-[#C85023] tracking-wider text-sm">
                    {submittedPass.passCode}
                  </span>
                </div>
              </div>

              {/* Scannable Gate Verification Section */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block font-mono">
                    Security Gate Protocol
                  </span>
                  <span className="text-[11px] text-stone-600 block leading-tight mt-0.5">
                    Scan with any mobile camera at the venue gate for instant guest registry verification.
                  </span>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-[#380A11]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D97724]" />
                    <span>Admit at Ilorin Event Center Gate</span>
                  </div>
                </div>

                {/* Scannable Real 2D QR Code */}
                <div className="shrink-0 text-center">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`QR Pass for ${submittedPass.passCode}`}
                      className="w-20 h-20 sm:w-22 sm:h-22 rounded-lg border-2 border-[#D4AF37] bg-white p-1 shadow-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-stone-100 rounded-lg flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-stone-400 animate-pulse" />
                    </div>
                  )}
                  <span className="text-[9px] font-mono font-bold text-stone-500 block mt-0.5">
                    {submittedPass.passCode}
                  </span>
                </div>
              </div>

              {/* Meal Preference */}
              <div className="mt-2.5 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-600">
                <span className="text-[10px] text-stone-400 uppercase font-bold font-mono">Reserved Delicacy:</span>
                <span className="font-medium text-[#380A11] line-clamp-1 max-w-[240px]">
                  {submittedPass.mealPreference}
                </span>
              </div>
            </div>

            {/* Status Feedback Banner */}
            {pdfActionStatus && (
              <div className="mt-4 p-2.5 rounded-xl bg-[#52131D] border border-[#D4AF37]/50 text-xs text-[#F5E19A] font-medium animate-fade-in">
                {pdfActionStatus}
              </div>
            )}

            {/* Pass Actions: WhatsApp PDF & Direct PDF Download */}
            <div className="mt-6 flex flex-col gap-2.5">
              {/* Send PDF to WhatsApp Button */}
              <button
                onClick={handleSendToWhatsApp}
                disabled={isGeneratingPdf}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isGeneratingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send VIP Pass (PDF) to WhatsApp</span>
              </button>

              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* Download PDF Pass */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPdf}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-[#D4AF37] text-[#240408] hover:bg-[#F5E19A] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 font-mono"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Pass PDF</span>
                </button>

                {/* Simulate Gate Scan / Verification */}
                <button
                  onClick={() => onOpenSecurityGate && onOpenSecurityGate(submittedPass.passCode)}
                  className="py-3 px-4 rounded-xl text-xs font-bold bg-[#380A11] border border-[#D4AF37]/50 text-[#F5E19A] hover:bg-[#52131D] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Test scan this pass at the gate"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D97724]" />
                  <span>Test Gate Scan</span>
                </button>
              </div>

              {/* Register Another Guest */}
              <button
                onClick={() => {
                  setSubmittedPass(null);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    attending: 'both',
                    partySize: 1,
                    guestNames: '',
                    mealPreference: 'Amala with Abula (Gbegiri & Ewedu) + Assorted Goat Meat',
                    songRequest: '',
                  });
                }}
                className="mt-2 py-2 text-xs font-medium text-stone-300 hover:text-white transition-colors cursor-pointer"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-[#380A11] mb-2 font-mono">
                  Full Name / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief & Mrs. Oladipo Johnson / Dr. Bukola Adeleke"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#380A11] text-sm bg-white"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#380A11] mb-2 font-mono">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 803 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#380A11] text-sm bg-white"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#380A11] mb-2 font-mono">
                  Email Address (For Confirmation)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#380A11] text-sm bg-white"
                />
              </div>

              {/* Attendance Choice */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#380A11] mb-2 font-mono">
                  Will You Be Attending? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'both', label: 'Attending Engagement & Reception' },
                    { id: 'traditional', label: 'Engagement Ceremony Only (11:00 AM)' },
                    { id: 'white', label: 'Grand Reception Only (03:30 PM)' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-3.5 rounded-xl border cursor-pointer text-xs font-medium flex items-center gap-2 transition-all ${
                        formData.attending === opt.id
                          ? 'border-[#380A11] bg-[#380A11]/10 text-[#380A11] font-bold shadow-sm'
                          : 'border-stone-200 hover:border-stone-400 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={opt.id}
                        checked={formData.attending === opt.id}
                        onChange={() => setFormData({ ...formData, attending: opt.id as any })}
                        className="text-[#380A11] focus:ring-[#380A11]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Party Size (strictly Just Me or Me & My Spouse) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#380A11] mb-2 font-mono">
                  Guest Registration Type *
                </label>
                <select
                  value={formData.partySize}
                  onChange={(e) => {
                    const newSize = Number(e.target.value);
                    setFormData({
                      ...formData,
                      partySize: newSize,
                      guestNames: newSize === 1 ? '' : formData.guestNames,
                    });
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#380A11] text-sm bg-white font-medium"
                >
                  <option value={1}>Just Me</option>
                  <option value={2}>Me and My Spouse</option>
                </select>
              </div>

              {/* Accompanying Spouse Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#380A11] mb-2 font-mono">
                  {formData.partySize === 2 ? "Spouse's Full Name (Optional)" : "Accompanying Spouse"}
                </label>
                <input
                  type="text"
                  disabled={formData.partySize === 1}
                  placeholder={
                    formData.partySize === 2
                      ? "e.g. Mrs. Folashade Adebiyi"
                      : "Select 'Me and My Spouse' above to include spouse"
                  }
                  value={formData.partySize === 1 ? '' : formData.guestNames}
                  onChange={(e) => setFormData({ ...formData, guestNames: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#380A11] text-sm bg-white disabled:bg-stone-100 disabled:text-stone-400 disabled:cursor-not-allowed"
                />
              </div>

              {/* Meal Preference */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#380A11] mb-2 flex items-center gap-1.5 font-mono">
                  <Utensils className="w-3.5 h-3.5 text-[#D97724]" />
                  <span>Preferred Reception Delicacy</span>
                </label>
                <select
                  value={formData.mealPreference}
                  onChange={(e) => setFormData({ ...formData, mealPreference: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#380A11] text-sm bg-white"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-[#380A11] mb-2 flex items-center gap-1.5 font-mono">
                  <Music className="w-3.5 h-3.5 text-[#C85023]" />
                  <span>Song You Want to Dance to at the Reception (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. King Sunny Ade, Ebenezer Obey, Asake, Burna Boy, Nathaniel Bassey"
                  value={formData.songRequest}
                  onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#380A11] text-sm bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#D4AF37] via-[#D97724] to-[#C85023] hover:from-[#F5E19A] hover:to-[#D97724] text-white transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Heart className="w-5 h-5 fill-white" />
                )}
                <span>Generate Official VIP Entry Pass</span>
              </button>
              <p className="text-[11px] text-stone-500 text-center mt-3">
                Strictly RSVP admission. Your generated pass code and QR code are instantly registered for verification at the gate.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
