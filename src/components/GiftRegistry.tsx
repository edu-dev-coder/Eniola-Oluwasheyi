import React, { useState } from 'react';
import {
  Gift,
  Copy,
  Check,
  Building2,
  Plane,
  Home,
  UtensilsCrossed,
  ChefHat,
  ShieldCheck,
  Sparkles
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
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#D97724', '#380A11']
      });
    } catch {
      // safe fallback
    }
  };

  const getGiftIcon = (name: string) => {
    switch (name) {
      case 'Plane':
        return <Plane className="w-5 h-5 text-[#D4AF37]" />;
      case 'ChefHat':
        return <ChefHat className="w-5 h-5 text-[#D4AF37]" />;
      case 'Home':
        return <Home className="w-5 h-5 text-[#D4AF37]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <Gift className="w-5 h-5 text-[#D4AF37]" />;
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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#D97724', '#C85023']
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
    <section id="registry" className="py-24 bg-[#FAF7F2] text-[#2C2723] relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97724]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#380A11]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#380A11]/10 border border-[#380A11]/20 text-[#380A11] text-xs tracking-widest uppercase font-medium mb-3">
            <Gift className="w-3.5 h-3.5 text-[#D97724]" />
            <span>Love Tokens &amp; Blessings</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#380A11] mb-3 tracking-tight font-bold">
            Gifts &amp; Cash Blessings
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#380A11] via-[#D97724] to-[#D4AF37] mx-auto my-4 rounded-full"></div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Your heartfelt prayers and esteemed presence are our greatest joy! For family, colleagues, and cherished friends wishing to honor our union with wedding gifts, please find our verified bank accounts and milestone registry below.
          </p>
        </div>

        {/* Section 1: Official Bank Transfer Cards (High Prominence) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
            <div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#380A11] font-bold">
                Official Bank Accounts (1-Click Copy)
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Direct transfers for local Nigerian banking and USSD transfers
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#380A11] font-medium bg-[#380A11]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D97724]" />
              Verified Official Accounts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BANK_ACCOUNTS.map((bank, index) => {
              const isCopied = copiedAccount === bank.accountNumber;
              const isBride = bank.accountName.toLowerCase().includes('eniola');

              return (
                <div
                  key={index}
                  className={`relative rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 border-2 ${
                    isBride
                      ? 'bg-gradient-to-br from-[#380A11] via-[#240408] to-[#1a0205] text-white border-[#D4AF37]/50'
                      : 'bg-gradient-to-br from-[#3D1E16] via-[#2B140E] to-[#1e0a05] text-white border-[#D97724]/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Building2 className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5E19A] block font-bold">
                          {isBride ? "Bride's Direct Gift Account" : "Groom's Direct Gift Account"}
                        </span>
                        <h4 className="font-serif-luxury text-xl font-bold text-white">
                          {bank.bankName}
                        </h4>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/10 text-[#F5E19A] border border-white/15">
                      {bank.currency}
                    </span>
                  </div>

                  {/* Account Number Box */}
                  <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/15 mb-4 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                        Account Number
                      </span>
                      <span className="text-2xl sm:text-3xl font-mono font-bold tracking-widest text-[#F5E19A] block">
                        {bank.accountNumber}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(bank.accountNumber)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg ${
                        isCopied
                          ? 'bg-[#25D366] text-white scale-105'
                          : 'bg-[#D4AF37] hover:bg-[#F5E19A] text-[#240408]'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Account Name */}
                  <div className="text-xs text-stone-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Account Name:</span>
                      <span className="font-semibold text-white">{bank.accountName}</span>
                    </div>
                    {bank.diasporaNote && (
                      <p className="text-[11px] text-[#F5E19A] italic pt-1 border-t border-white/10">
                        {bank.diasporaNote}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Milestone & Creative Venture Registry */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D97724] block mb-1">
              Newlywed Projects
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#380A11]">
              The #DesignersMeet Milestone Fund
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              You may also pledge support toward our creative studio workshop, honeymoon journey, or dream home setup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GIFT_ITEMS.map((gift) => {
              const progress = Math.min(100, Math.round((gift.currentAmount / gift.targetAmount) * 100));

              return (
                <div
                  key={gift.id}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden bg-stone-100">
                    <img
                      src={gift.image}
                      alt={gift.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#380A11]/90 backdrop-blur-md p-2 rounded-xl text-[#F5E19A] border border-[#D4AF37]/40 shadow">
                      {getGiftIcon(gift.iconName)}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-luxury text-base font-bold text-[#380A11] mb-1.5 leading-snug">
                        {gift.title}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                        {gift.description}
                      </p>
                    </div>

                    <div>
                      {/* Progress Bar */}
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#D97724] rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-[11px] font-mono mb-4 text-stone-500">
                        <span>Pledged: {formatNaira(gift.currentAmount)}</span>
                        <span className="font-bold text-[#380A11]">{progress}%</span>
                      </div>

                      <button
                        onClick={() => setSelectedGift(gift)}
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#FAF7F2] hover:bg-[#380A11] text-[#380A11] hover:text-[#F5E19A] border border-[#380A11]/20 hover:border-[#380A11] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D97724]" />
                        <span>Contribute to this Gift</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for Contribution / Instructions */}
      {selectedGift && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedGift(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-[#D4AF37] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif-luxury text-2xl font-bold text-[#380A11] mb-1">
              Contribute to {selectedGift.title}
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Kindly make a direct transfer to either of the couple's bank accounts below using your banking app:
            </p>

            <div className="space-y-3 mb-6">
              {BANK_ACCOUNTS.map((bank, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-mono block">
                      {bank.bankName}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#380A11]">
                      {bank.accountNumber} ({bank.accountName})
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(bank.accountNumber)}
                    className="px-3 py-1.5 rounded-lg bg-[#380A11] text-[#F5E19A] text-xs font-bold hover:bg-[#52131D] cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold uppercase text-[#380A11] mb-1 font-mono">
                Amount Pledged (NGN)
              </label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-mono focus:ring-2 focus:ring-[#380A11] outline-none"
                placeholder="50000"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleConfirmPledge}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#D97724] text-[#240408] text-xs font-bold hover:opacity-95 cursor-pointer shadow-md"
              >
                {contributionSent ? 'Transfer Notified! Daalu / E se gan!' : 'I Have Sent This Gift'}
              </button>
              <button
                onClick={() => setSelectedGift(null)}
                className="px-4 py-3 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
