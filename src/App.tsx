import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { EventsProgram } from './components/EventsProgram';
import { RsvpSection } from './components/RsvpSection';
import { GuestRegistry } from './components/GuestRegistry';
import { GiftRegistry } from './components/GiftRegistry';
import { WishesPrayers } from './components/WishesPrayers';
import { WeddingParty } from './components/WeddingParty';
import { FaqSection } from './components/FaqSection';
import { PlannerModal } from './components/PlannerModal';
import { Footer } from './components/Footer';

import type { GuestRSVP, WeddingWish } from './types/wedding';
import {
  getStoredRSVPs,
  saveRSVP,
  deleteRSVP,
  getStoredWishes,
  saveWish,
  toggleWishReaction
} from './utils/storage';

export function App() {
  const [rsvps, setRsvps] = useState<GuestRSVP[]>(() => getStoredRSVPs());
  const [wishes, setWishes] = useState<WeddingWish[]>(() => getStoredWishes());
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  const handleRSVPSubmit = (newRsvp: GuestRSVP) => {
    const updated = saveRSVP(newRsvp);
    setRsvps(updated);
  };

  const handleDeleteRSVP = (id: string) => {
    const updated = deleteRSVP(id);
    setRsvps(updated);
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
        guestCount={attendingHeadcount}
      />

      {/* Hero Section with Countdown & Audio Controller */}
      <main>
        <Hero />

        {/* Love Story & Bride Spotlight */}
        <Story />

        {/* Program of Events: Traditional & White Wedding */}
        <EventsProgram />

        {/* RSVP & Instant Digital Entry VIP Pass */}
        <RsvpSection onRsvpAdded={handleRSVPSubmit} />

        {/* Digital Guest Registry of Confirmed Attendees */}
        <GuestRegistry rsvps={rsvps} />

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
      <Footer onOpenPlanner={() => setIsPlannerOpen(true)} />

      {/* Wedding Planner & Catering Portal Modal */}
      <PlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        rsvps={rsvps}
        onDeleteRSVP={handleDeleteRSVP}
      />
    </div>
  );
}

export default App;
