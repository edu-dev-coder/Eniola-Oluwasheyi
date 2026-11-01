import type { GuestRSVP, WeddingWish } from '../types/wedding';
import { INITIAL_RSVPS, INITIAL_PRAYERS } from '../data/weddingData';

const RSVP_STORAGE_KEY = 'designersmeet_rsvps_v2';
const WISHES_STORAGE_KEY = 'designersmeet_wishes_v2';

export function getStoredRSVPs(): GuestRSVP[] {
  try {
    const data = localStorage.getItem(RSVP_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(INITIAL_RSVPS));
      return INITIAL_RSVPS;
    }
    const parsed: GuestRSVP[] = JSON.parse(data);
    // Deduplicate in case of legacy test collisions
    const seen = new Set<string>();
    const unique = parsed.filter(item => {
      const key = item.id || item.passCode;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (unique.length !== parsed.length) {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(unique));
    }
    return unique;
  } catch {
    return INITIAL_RSVPS;
  }
}

export function saveRSVP(rsvp: GuestRSVP): GuestRSVP[] {
  try {
    const current = getStoredRSVPs();
    const filtered = current.filter(r => r.id !== rsvp.id && r.passCode !== rsvp.passCode);
    const updated = [rsvp, ...filtered];
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

export function findRSVPByPassCode(passCode: string): GuestRSVP | undefined {
  const normalized = passCode.trim().toUpperCase();
  const list = getStoredRSVPs();
  return list.find(r => r.passCode.toUpperCase() === normalized);
}

export function toggleCheckIn(passCodeOrId: string, status?: boolean): { updatedList: GuestRSVP[]; rsvp?: GuestRSVP } {
  try {
    const list = getStoredRSVPs();
    const query = passCodeOrId.trim().toUpperCase();
    let targetRSVP: GuestRSVP | undefined;

    const updatedList = list.map(r => {
      if (r.id === passCodeOrId || r.passCode.toUpperCase() === query) {
        const newStatus = status !== undefined ? status : !r.checkedIn;
        targetRSVP = {
          ...r,
          checkedIn: newStatus,
          checkedInAt: newStatus ? new Date().toISOString() : undefined,
        };
        return targetRSVP;
      }
      return r;
    });

    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updatedList));
    return { updatedList, rsvp: targetRSVP };
  } catch (err) {
    console.error('Failed to toggle check-in status', err);
    return { updatedList: getStoredRSVPs() };
  }
}
