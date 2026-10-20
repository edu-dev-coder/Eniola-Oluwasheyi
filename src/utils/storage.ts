import type { GuestRSVP, WeddingWish } from '../types/wedding';
import { INITIAL_RSVPS, INITIAL_PRAYERS } from '../data/weddingData';

const RSVP_STORAGE_KEY = 'melwed_rsvps_v1';
const WISHES_STORAGE_KEY = 'melwed_wishes_v1';

export function getStoredRSVPs(): GuestRSVP[] {
  try {
    const data = localStorage.getItem(RSVP_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(INITIAL_RSVPS));
      return INITIAL_RSVPS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_RSVPS;
  }
}

export function saveRSVP(rsvp: GuestRSVP): GuestRSVP[] {
  try {
    const current = getStoredRSVPs();
    const updated = [rsvp, ...current];
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save RSVP to localStorage', err);
    return [rsvp, ...INITIAL_RSVPS];
  }
}

export function deleteRSVP(id: string): GuestRSVP[] {
  try {
    const current = getStoredRSVPs();
    const updated = current.filter(r => r.id !== id);
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete RSVP from localStorage', err);
    return getStoredRSVPs();
  }
}

export function getStoredWishes(): WeddingWish[] {
  try {
    const data = localStorage.getItem(WISHES_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(INITIAL_PRAYERS));
      return INITIAL_PRAYERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_PRAYERS;
  }
}

export function saveWish(wish: WeddingWish): WeddingWish[] {
  try {
    const current = getStoredWishes();
    const updated = [wish, ...current];
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save wish to localStorage', err);
    return [wish, ...INITIAL_PRAYERS];
  }
}

export function toggleWishReaction(wishId: string): WeddingWish[] {
  try {
    const current = getStoredWishes();
    const updated = current.map((w) =>
      w.id === wishId ? { ...w, reactions: w.reactions + 1 } : w
    );
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getStoredWishes();
  }
}

export function exportRSVPToCSV(rsvps: GuestRSVP[]): void {
  const headers = ['PassCode', 'Full Name', 'Phone', 'Email', 'Events Attending', 'Party Size', 'Guest Names', 'Meal Preference', 'Song Request', 'Registration Date'];
  const rows = rsvps.map(r => [
    `"${r.passCode}"`,
    `"${r.name.replace(/"/g, '""')}"`,
    `"${r.phone}"`,
    `"${r.email}"`,
    `"${r.attending}"`,
    r.partySize,
    `"${(r.guestNames || '').replace(/"/g, '""')}"`,
    `"${r.mealPreference.replace(/"/g, '""')}"`,
    `"${(r.songRequest || '').replace(/"/g, '""')}"`,
    `"${new Date(r.createdAt).toLocaleString()}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `MELWED_Guest_Registry_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
