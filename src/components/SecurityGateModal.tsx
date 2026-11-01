import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Users,
  Utensils,
  X,
  Clock,
  QrCode
} from 'lucide-react';
import type { GuestRSVP } from '../types/wedding';
import { findRSVPByPassCode, toggleCheckIn, getStoredRSVPs } from '../utils/storage';

interface SecurityGateModalProps {
  initialCode?: string | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckInChanged?: () => void;
}

export const SecurityGateModal: React.FC<SecurityGateModalProps> = ({
  initialCode,
  isOpen,
  onClose,
  onCheckInChanged
}) => {
  const [searchCode, setSearchCode] = useState(initialCode || '');
  const [currentGuest, setCurrentGuest] = useState<GuestRSVP | null>(null);
  const [searched, setSearched] = useState(false);
  const [recentCheckIns, setRecentCheckIns] = useState<GuestRSVP[]>([]);

  useEffect(() => {
    if (initialCode) {
      setSearchCode(initialCode);
      verifyCode(initialCode);
    }
  }, [initialCode]);

  useEffect(() => {
    if (isOpen) {
      refreshRecent();
    }
  }, [isOpen]);

  const refreshRecent = () => {
    const all = getStoredRSVPs();
    const checked = all.filter(r => r.checkedIn);
    setRecentCheckIns(checked.slice(0, 5));
  };

  const verifyCode = (code: string) => {
    const clean = code.trim();
    if (!clean) {
      setCurrentGuest(null);
      setSearched(false);
      return;
    }
    const found = findRSVPByPassCode(clean);
    setCurrentGuest(found || null);
    setSearched(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(searchCode);
  };

  const handleToggleEntry = () => {
    if (!currentGuest) return;
    const { rsvp } = toggleCheckIn(currentGuest.passCode);
    if (rsvp) {
      setCurrentGuest(rsvp);
      refreshRecent();
      if (onCheckInChanged) onCheckInChanged();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="bg-[#1C0509] border-2 border-[#D4AF37] rounded-3xl max-w-xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2A060C] via-[#380A11] to-[#2A060C] px-6 py-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#F9E498] uppercase font-bold">
                  #DesignersMeet 2026
                </span>
                <span className="bg-[#C85023]/80 text-white text-[9px] px-2 py-0.5 rounded-full font-bold border border-[#D4AF37]/40 uppercase">
                  Gate Security
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                VIP Pass Verification Terminal • JJ &amp; Jaz Center, Ilorin
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick Search / Scan Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <QrCode className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              <input
                type="text"
                placeholder="Scan QR or enter Pass Code (e.g. DES-7142)..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-11 pr-24 py-3 rounded-2xl bg-white/10 border border-[#D4AF37]/40 text-white placeholder-stone-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#D4AF37] uppercase tracking-wider"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-[#D4AF37] text-[#380A11] font-bold text-xs hover:bg-[#F9E498] transition-colors"
              >
                Verify
              </button>
            </div>
          </form>

          {/* Verification Result */}
          {searched && (
            <div>
              {currentGuest ? (
                <div className="bg-gradient-to-b from-[#2A060C] to-[#1C0509] rounded-2xl border-2 border-[#D4AF37] p-5 shadow-inner space-y-4">
                  {/* Status Banner */}
                  {currentGuest.checkedIn ? (
                    <div className="bg-amber-500/20 border border-amber-500/50 rounded-xl p-3 flex items-start gap-3 text-amber-200">
                      <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-bold text-sm text-amber-300 block">
                          ALREADY CHECKED IN
                        </span>
                        <span>This pass was scanned &amp; admitted earlier</span>
                        {currentGuest.checkedInAt && (
                          <span className="block text-[11px] text-amber-300/80 mt-0.5 font-mono">
                            Time: {new Date(currentGuest.checkedInAt).toLocaleTimeString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-3 flex items-center gap-3 text-emerald-200">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold text-sm text-emerald-300 block">
                          GENUINE VIP ENTRY PASS CONFIRMED
                        </span>
                        <span className="text-xs">Guest is verified on Eniola &amp; Oluwaseyi's official registry</span>
                      </div>
                    </div>
                  )}

                  {/* Guest Info Card */}
                  <div className="bg-white text-[#2C2723] rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-bold">
                          VIP GUEST
                        </span>
                        <h3 className="font-serif text-xl font-bold text-[#380A11]">
                          {currentGuest.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-bold">
                          PASS CODE
                        </span>
                        <span className="font-mono text-base font-extrabold text-[#C85023]">
                          {currentGuest.passCode}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Party Allowance</span>
                        <span className="font-extrabold text-stone-800 text-sm flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#380A11]" />
                          Admit {currentGuest.partySize} Person(s)
                        </span>
                      </div>
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Ceremony Access</span>
                        <span className="font-bold text-[#380A11] uppercase text-[11px] block mt-0.5">
                          {currentGuest.attending === 'both' ? 'Engagement & Reception' : currentGuest.attending}
                        </span>
                      </div>
                    </div>

                    {currentGuest.guestNames && (
                      <div className="text-xs text-stone-600 bg-amber-50/60 p-2 rounded-lg border border-amber-200/50">
                        <span className="font-bold text-stone-700 block text-[10px] uppercase">Additional Entourage:</span>
                        {currentGuest.guestNames}
                      </div>
                    )}

                    <div className="text-xs text-stone-600 flex items-center justify-between pt-1">
                      <span className="flex items-center gap-1 text-[11px] text-[#380A11] font-medium">
                        <Utensils className="w-3 h-3 text-[#D4AF37]" />
                        {currentGuest.mealPreference}
                      </span>
                      {currentGuest.phone && (
                        <span className="text-[11px] font-mono text-stone-400">
                          {currentGuest.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Security Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleToggleEntry}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                        currentGuest.checkedIn
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-[#C85023] hover:bg-[#b0431b] text-white'
                      }`}
                    >
                      {currentGuest.checkedIn ? (
                        <>
                          <Clock className="w-4 h-4" />
                          <span>Revoke / Mark Unchecked</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>✓ Admit &amp; Check In Guest ({currentGuest.partySize})</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSearchCode('');
                        setCurrentGuest(null);
                        setSearched(false);
                      }}
                      className="py-3 px-4 rounded-xl text-xs font-medium border border-white/20 text-stone-300 hover:bg-white/10"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-950/40 border-2 border-rose-500/50 rounded-2xl p-6 text-center space-y-2">
                  <XCircle className="w-12 h-12 text-rose-500 mx-auto" />
                  <h4 className="font-bold text-base text-rose-200">
                    PASS NOT RECOGNIZED
                  </h4>
                  <p className="text-xs text-stone-300 max-w-sm mx-auto">
                    No RSVP record exists matching code{' '}
                    <span className="font-mono text-rose-300 font-bold">"{searchCode}"</span>.
                    Please verify the guest's name with the wedding planner or coordinators (Queen / Bode).
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Recent Check-Ins at Gate */}
          {recentCheckIns.length > 0 && (
            <div className="border-t border-white/10 pt-4">
              <span className="text-[11px] text-stone-400 font-mono uppercase tracking-wider block mb-2">
                Recent Gate Entries ({recentCheckIns.length})
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {recentCheckIns.map(g => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-medium text-stone-200">{g.name}</span>
                      <span className="font-mono text-[10px] text-stone-400">({g.passCode})</span>
                    </div>
                    <span className="text-[11px] text-[#D4AF37] font-semibold">
                      Admitted ({g.partySize})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#140205] px-6 py-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
          <span>Security Protocol: Confirm Pass Code &amp; Entourage count at gate</span>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white underline font-medium cursor-pointer"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
