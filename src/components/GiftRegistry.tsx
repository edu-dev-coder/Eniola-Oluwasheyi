import React, { useState } from 'react';
import {
  Gift,
  Copy,
  Check,
  Building2,
  Globe,
  Plane,
  Home,
  UtensilsCrossed,
  ChefHat,
  HeartHandshake,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import { BANK_ACCOUNTS, GIFT_ITEMS } from '../data/weddingData';
import type { GiftItem } from '../types/wedding';
import confetti from 'canvas-confetti';

interface GiftRegistryProps {
  onNotifyContribution?: (giftTitle: string, amount: number) => void;
}

export const GiftRegistry: React.FC<GiftRegistryProps> = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('50000');
  const [contributionSent, setContributionSent] = useState(false);

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    setTimeout(() => setCopiedAccount(null), 3000);

    try {
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#0A3824']
      });
    } catch {
      // safe fallback
    }
  };

  const getGiftIcon = (name: string) => {
    switch (name) {
      case 'Plane':
        return <Plane className="w-5 h-5 text-champagne-gold" />;
      case 'ChefHat':
        return <ChefHat className="w-5 h-5 text-champagne-gold" />;
      case 'Home':
        return <Home className="w-5 h-5 text-champagne-gold" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-champagne-gold" />;
      default:
        return <Gift className="w-5 h-5 text-champagne-gold" />;
    }
  };

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleConfirmPledge = () => {
    setContributionSent(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E2583E']
      });
    } catch {
      // safe fallback
    }
    setTimeout(() => {
      setContributionSent(false);
      setSelectedGift(null);
    }, 4000);
  };

  return (
    <section id="registry" className="py-20 bg-warm-ivory/60 relative overflow-hidden">
      {/* Subtle traditional motif decoration */}
      <div className="absolute inset-0 opacity-[0.03] bg-repeat pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0A3824 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-gold/20 border border-champagne-gold/40 text-emerald-950 text-xs tracking-widest uppercase font-medium mb-3">
            <Gift className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Ihe Onyinye • Wedding Registry & Blessings</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-emerald-950 mb-3 tracking-tight">
            Gifts & Cash Blessings
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Your loving presence and prayers are our true greatest gifts! For family and friends who have kindly asked to bless our new home or contribute toward our newlywed milestones, we offer these convenient options below.
          </p>
        </div>

        {/* Section 1: Bank Transfer Cards (High Emphasis) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-emerald-950 font-bold">
                Direct Bank Accounts (1-Click Copy)
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Safe, immediate electronic transfer directly to the couple's dedicated wedding account
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-800 font-medium bg-emerald-100/50 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Accounts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BANK_ACCOUNTS.map((bank, index) => {
              const isCopied = copiedAccount === bank.accountNumber;
              const isNaira = bank.currency.includes('NGN');

              return (
                <div
                  key={index}
                  className={`relative rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 border ${
                    isNaira
                      ? 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white border-champagne-gold/40 shadow-emerald-950/20'
                      : 'bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white border-stone-700 shadow-stone-900/20'
                  }`}
                >
                  {/* Decorative badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        {isNaira ? (
                          <Building2 className="w-6 h-6 text-champagne-gold" />
                        ) : (
                          <Globe className="w-6 h-6 text-champagne-gold" />
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono tracking-widest text-champagne-gold uppercase font-semibold">
                          {isNaira ? 'Local Nigerian Transfer' : 'International / Diaspora Wire'}
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
                          {bank.bankName}
                        </h4>
                      </div>
                    </div>

                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-stone-200 font-mono">
                      {isNaira ? 'NGN ₦' : 'USD $'}
                    </span>
                  </div>

                  {/* Account Number Box */}
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 mb-5 border border-white/10">
                    <div className="text-[11px] uppercase tracking-wider text-stone-400 mb-1 font-medium">
                      Account Number
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl font-mono font-bold tracking-wider text-champagne-gold">
                        {bank.accountNumber}
                      </span>

                      <button
                        onClick={() => handleCopy(bank.accountNumber)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-champagne-gold text-emerald-950 hover:bg-champagne-gold-light'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Account Name & Details */}
                  <div className="space-y-1.5 text-xs text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Account Name:</span>
                      <span className="font-semibold text-white text-right">{bank.accountName}</span>
                    </div>

                    {bank.swiftCode && (
                      <div className="flex justify-between">
                        <span className="text-stone-400">SWIFT / BIC Code:</span>
                        <span className="font-mono text-champagne-gold">{bank.swiftCode}</span>
                      </div>
                    )}

                    <p className="pt-2 text-[11px] text-stone-400 italic border-t border-white/10">
                      💡 {bank.diasporaNote}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Curated Wishlist Items */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-emerald-950 font-bold">
                Curated Newlywed Wishlist & Experiences
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                You can sponsor or partially contribute to any of these special milestones
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GIFT_ITEMS.map((gift) => {
              const percent = Math.min(100, Math.round((gift.currentAmount / gift.targetAmount) * 100));

              return (
                <div
                  key={gift.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-stone-200/80 transition-all duration-300 flex flex-col group"
                >
                  {/* Image Header */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={gift.image}
                      alt={gift.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-emerald-950/80 backdrop-blur-md flex items-center justify-center border border-white/20">
                      {getGiftIcon(gift.iconName)}
                    </div>
                    <span className="absolute bottom-3 left-3 text-xs font-semibold text-white uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {gift.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-emerald-950 text-base leading-snug mb-2">
                        {gift.title}
                      </h4>
                      <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed mb-4">
                        {gift.description}
                      </p>
                    </div>

                    <div>
                      {/* Progress Bar */}
                      <div className="space-y-1.5 mb-4">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-emerald-900 font-bold">{formatNaira(gift.currentAmount)}</span>
                          <span className="text-stone-400">Target: {formatNaira(gift.targetAmount)}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-champagne-gold to-emerald-800 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="text-right text-[11px] text-stone-500 font-mono">
                          {percent}% gifted
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => setSelectedGift(gift)}
                        className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 font-medium text-xs flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors cursor-pointer"
                      >
                        <HeartHandshake className="w-3.5 h-3.5 text-champagne-gold-dark" />
                        <span>Contribute to this Gift</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Physical Gifts Info Note */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-stone-200/80 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-champagne-gold/20 flex items-center justify-center flex-shrink-0 text-emerald-950">
            <Gift className="w-6 h-6 text-champagne-gold" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-emerald-950 text-base">
              Bringing a Physical Gift to the Wedding?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-0.5">
              A designated royal gift receiving desk with registered attendants will be positioned at the entrance of both the Traditional Wedding venue in Oji River and The Monarch Palace Ballroom in Enugu.
            </p>
          </div>
          <a
            href="#program"
            className="text-xs font-semibold text-emerald-900 hover:text-champagne-gold-dark flex items-center gap-1 whitespace-nowrap"
          >
            <span>View Venues & Times</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Modal: Contribute to Selected Wishlist Item */}
      {selectedGift && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-champagne-gold/30">
            <button
              onClick={() => setSelectedGift(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {contributionSent ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-emerald-950">
                  Thank You for Your Generous Heart!
                </h3>
                <p className="text-sm text-stone-600 max-w-sm mx-auto">
                  Please proceed with the bank transfer using the account details copied. Melvin & Chidimma are deeply grateful for your love!
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-champagne-gold/20 flex items-center justify-center">
                    {getGiftIcon(selectedGift.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-800 font-semibold">
                      Gift Contribution
                    </span>
                    <h3 className="font-serif text-xl font-bold text-emerald-950">
                      {selectedGift.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mb-5 leading-relaxed">
                  Select or enter the amount you wish to gift toward this milestone, then use the couple's dedicated account to complete your transfer.
                </p>

                {/* Preset Chips */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {['10000', '25000', '50000', '100000'].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCustomAmount(amt)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        customAmount === amt
                          ? 'bg-emerald-950 text-champagne-gold border border-champagne-gold'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      ₦{Number(amt).toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="mb-5">
                  <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
                    Or Enter Custom Amount (₦)
                  </label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={e => setCustomAmount(e.target.value)}
                    placeholder="Enter amount in Naira"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-champagne-gold"
                  />
                </div>

                {/* Bank Details Snippet */}
                <div className="p-4 rounded-2xl bg-emerald-950 text-white mb-6 space-y-2 border border-champagne-gold/30">
                  <div className="text-[11px] text-champagne-gold font-mono uppercase tracking-wider">
                    Bank Transfer Details:
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-300">Bank:</span>
                    <span className="font-bold text-white">Zenith Bank PLC</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-300">Account No:</span>
                    <span className="font-mono text-champagne-gold font-bold text-sm">1018894235</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-300">Account Name:</span>
                    <span className="text-white">Melvin Okafor & Chidimma Eze</span>
                  </div>
                  <div className="text-[10px] text-stone-400 italic pt-1 border-t border-white/10">
                    Kindly use narration reference: "{selectedGift.title.slice(0, 15)} - [Your Name]"
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleCopy('1018894235');
                      handleConfirmPledge();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 text-champagne-gold font-medium text-xs tracking-wider uppercase border border-champagne-gold/40 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    Copy Account & Confirm Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGift(null)}
                    className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
