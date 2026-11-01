import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { EventsProgram } from './components/EventsProgram';
import { RsvpSection } from './components/RsvpSection';
import { GiftRegistry } from './components/GiftRegistry';
import { WishesPrayers } from './components/WishesPrayers';
import { WeddingParty } from './components/WeddingParty';
import { FaqSection } from './components/FaqSection';
import { PlannerModal } from './components/PlannerModal';
import { SecurityGateModal } from './components/SecurityGateModal';
import { Footer } from './components/Footer';

import type { GuestRSVP, WeddingWish } from './types/wedding';
import {
  getStoredRSVPs,
  saveRSVP,
  deleteRSVP,
  toggleCheckIn,
  getStoredWishes,
  saveWish,
  toggleWishReaction,
  syncRemoteWishes,
  syncRemoteRSVPs
} from './utils/storage';
import { supabase, isSupabaseConfigured } from './utils/supabase';

export function App() {
  const [rsvps, setRsvps] = useState<GuestRSVP[]>(() => getStoredRSVPs());
  const [wishes, setWishes] = useState<WeddingWish[]>(() => getStoredWishes());
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [securityGateCode, setSecurityGateCode] = useState<string | null>(null);
  const [isSecurityGateOpen, setIsSecurityGateOpen] = useState(false);

  useEffect(() => {
    // Check if bouncer or guest opened link with ?verify=PASSCODE or ?code=PASSCODE
    const params = new URLSearchParams(window.location.search);
    const verifyParam = params.get('verify') || params.get('code');
    if (verifyParam) {
      setSecurityGateCode(verifyParam.trim().toUpperCase());
      setIsSecurityGateOpen(true);
    }

    // Sync wishes & RSVPs from Supabase cloud database
    syncRemoteWishes().then(syncedWishes => {
      if (syncedWishes && syncedWishes.length > 0) {
        setWishes(syncedWishes);
      }
    });

    syncRemoteRSVPs().then(syncedRSVPs => {
      if (syncedRSVPs && syncedRSVPs.length > 0) {
        setRsvps(syncedRSVPs);
      }
    });

    // Realtime subscription if Supabase is active
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      const wishesChannel = client
        .channel('public:wishes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'wishes' },
          () => {
            syncRemoteWishes().then(synced => {
              if (synced) setWishes(synced);
            });
          }
        )
        .subscribe();

      const rsvpsChannel = client
        .channel('public:rsvps')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'rsvps' },
          () => {
            syncRemoteRSVPs().then(synced => {
              if (synced) setRsvps(synced);
            });
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(wishesChannel);
        client.removeChannel(rsvpsChannel);
      };
    }
  }, []);

  const handleRSVPSubmit = (newRsvp: GuestRSVP) => {
    const updated = saveRSVP(newRsvp);
    setRsvps(updated);
  };

  const handleDeleteRSVP = (id: string) => {
    const updated = deleteRSVP(id);
    setRsvps(updated);
  };

  const handleToggleCheckIn = (idOrPassCode: string) => {
    const { updatedList } = toggleCheckIn(idOrPassCode);
    setRsvps(updatedList);
  };

  const handleOpenSecurityGate = (code?: string) => {
    setSecurityGateCode(code ? code.trim().toUpperCase() : null);
    setIsSecurityGateOpen(true);
  };

  const handleAddWish = (wishData: Omit<WeddingWish, 'id' | 'createdAt' | 'reactions'>) => {
    const newWish: WeddingWish = {
      ...wishData,
      id: `wish-${Date.now()}`,
      createdAt: new Date().toISOString(),
      reactions: 1
    };
    const updated = saveWish(newWish);
    setWishes(updated);
  };

  const handleReactWish = (id: string) => {
    const updated = toggleWishReaction(id);
    setWishes(updated);
  };

  // Compute live head count
  const attendingHeadcount = rsvps
    .filter(r => r.attending !== 'declined')
    .reduce((sum, r) => sum + (r.partySize || 1), 0);

  return (
    <div className="min-h-screen bg-warm-ivory text-stone-900 font-sans selection:bg-champagne-gold selection:text-emerald-950">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenPlanner={() => setIsPlannerOpen(true)}
        onOpenSecurityGate={() => handleOpenSecurityGate()}
        guestCount={attendingHeadcount}
      />

      {/* Hero Section with Countdown & Audio Controller */}
      <main>
        <Hero />

        {/* Love Story & Bride Spotlight */}
        <Story />

        {/* Program of Events: Traditional & White Wedding */}
        <EventsProgram />

        {/* RSVP & Instant Digital Entry VIP Pass with PDF & QR Code */}
        <RsvpSection
          onRsvpAdded={handleRSVPSubmit}
          onOpenSecurityGate={handleOpenSecurityGate}
        />

        {/* Curated Registry Wishlist & Direct Bank Account Numbers */}
        <GiftRegistry />

        {/* Wishes & Prayers Guestbook */}
        <WishesPrayers
          wishes={wishes}
          onAddWish={handleAddWish}
          onReactWish={handleReactWish}
        />

        {/* Wedding Party, Parents & Aso-Ebi Details */}
        <WeddingParty />

        {/* Frequently Asked Questions (Hotels, Travel, Security) */}
        <FaqSection />
      </main>

      {/* Royal Footer */}
      <Footer
        onOpenPlanner={() => setIsPlannerOpen(true)}
        onOpenSecurityGate={() => handleOpenSecurityGate()}
      />

      {/* Wedding Planner & Catering Portal Modal */}
      <PlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        rsvps={rsvps}
        onDeleteRSVP={handleDeleteRSVP}
        onToggleCheckIn={handleToggleCheckIn}
      />

      {/* Security Gate QR Verification Terminal Modal */}
      <SecurityGateModal
        isOpen={isSecurityGateOpen}
        initialCode={securityGateCode}
        onClose={() => {
          setIsSecurityGateOpen(false);
          setSecurityGateCode(null);
        }}
        onCheckInChanged={() => setRsvps(getStoredRSVPs())}
      />
    </div>
  );
}

export default App;
