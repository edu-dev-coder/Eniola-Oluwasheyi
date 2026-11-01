import type { GuestRSVP, WeddingWish } from '../types/wedding';
import { INITIAL_RSVPS, INITIAL_PRAYERS } from '../data/weddingData';
import {
  isSupabaseConfigured,
  fetchRemoteWishes,
  insertRemoteWish,
  incrementRemoteWishReaction,
  fetchRemoteRSVPs,
  insertRemoteRSVP,
  updateRemoteCheckIn,
  deleteRemoteRSVP,
} from './supabase';

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
    const seen = new Set<string>();
    const unique = parsed.filter((item) => {
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
    const filtered = current.filter((r) => r.id !== rsvp.id && r.passCode !== rsvp.passCode);
    const updated = [rsvp, ...filtered];
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updated));

    // Asynchronously push to Supabase cloud
    if (isSupabaseConfigured) {
      insertRemoteRSVP(rsvp).catch((err) =>
        console.warn('Background Supabase RSVP sync error:', err)
      );
    }

    return updated;
  } catch (err) {
    console.error('Failed to save RSVP to localStorage', err);
    return [rsvp, ...INITIAL_RSVPS];
  }
}

export function deleteRSVP(id: string): GuestRSVP[] {
  try {
    const current = getStoredRSVPs();
    const updated = current.filter((r) => r.id !== id);
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured) {
      deleteRemoteRSVP(id).catch((err) =>
        console.warn('Background Supabase RSVP delete error:', err)
      );
    }

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

    // Asynchronously push to Supabase cloud
    if (isSupabaseConfigured) {
      insertRemoteWish(wish).catch((err) =>
        console.warn('Background Supabase wish sync error:', err)
      );
    }

    return updated;
  } catch (err) {
    console.error('Failed to save wish to localStorage', err);
    return [wish, ...INITIAL_PRAYERS];
  }
}

export function toggleWishReaction(wishId: string): WeddingWish[] {
  try {
    const current = getStoredWishes();
    let newReactions = 1;
    const updated = current.map((w) => {
      if (w.id === wishId) {
        newReactions = (w.reactions || 0) + 1;
        return { ...w, reactions: newReactions };
      }
      return w;
    });
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured) {
      incrementRemoteWishReaction(wishId, newReactions).catch((err) =>
        console.warn('Background Supabase reaction sync error:', err)
      );
    }

    return updated;
  } catch {
    return getStoredWishes();
  }
}

/**
 * Sync wishes from Supabase cloud database, merging with local storage
 */
export async function syncRemoteWishes(): Promise<WeddingWish[]> {
  const local = getStoredWishes();
  if (!isSupabaseConfigured) return local;

  const remote = await fetchRemoteWishes();
  if (!remote || remote.length === 0) {
    // If remote is empty, seed remote with local wishes
    if (local.length > 0) {
      for (const wish of local) {
        insertRemoteWish(wish).catch(() => {});
      }
    }
    return local;
  }

  // Merge remote and local (remote takes precedence by id)
  const remoteIds = new Set(remote.map((r) => r.id));
  const unpushedLocal = local.filter((l) => !remoteIds.has(l.id));

  // Push unpushed local to remote
  for (const item of unpushedLocal) {
    insertRemoteWish(item).catch(() => {});
  }

  const merged = [...remote, ...unpushedLocal];
  localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

/**
 * Sync RSVPs from Supabase cloud database, merging with local storage
 */
export async function syncRemoteRSVPs(): Promise<GuestRSVP[]> {
  const local = getStoredRSVPs();
  if (!isSupabaseConfigured) return local;

  const remote = await fetchRemoteRSVPs();
  if (!remote || remote.length === 0) {
    if (local.length > 0) {
      for (const r of local) {
        insertRemoteRSVP(r).catch(() => {});
      }
    }
    return local;
  }

  const remoteCodes = new Set(remote.map((r) => r.passCode.toUpperCase()));
  const unpushedLocal = local.filter((l) => !remoteCodes.has(l.passCode.toUpperCase()));

  for (const item of unpushedLocal) {
    insertRemoteRSVP(item).catch(() => {});
  }

  const merged = [...remote, ...unpushedLocal];
  localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

export function exportRSVPToCSV(rsvps: GuestRSVP[]): void {
  const headers = ['PassCode', 'Full Name', 'Phone', 'Email', 'Events Attending', 'Party Size', 'Guest Names', 'Meal Preference', 'Song Request', 'Registration Date'];
  const rows = rsvps.map((r) => [
    `"${r.passCode}"`,
    `"${r.name.replace(/"/g, '""')}"`,
    `"${r.phone}"`,
    `"${r.email}"`,
    `"${r.attending}"`,
    r.partySize,
    `"${(r.guestNames || '').replace(/"/g, '""')}"`,
    `"${r.mealPreference.replace(/"/g, '""')}"`,
    `"${(r.songRequest || '').replace(/"/g, '""')}"`,
    `"${new Date(r.createdAt).toLocaleString()}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
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
  return list.find((r) => r.passCode.toUpperCase() === normalized);
}

export function toggleCheckIn(
  passCodeOrId: string,
  status?: boolean
): { updatedList: GuestRSVP[]; rsvp?: GuestRSVP } {
  try {
    const list = getStoredRSVPs();
    const query = passCodeOrId.trim().toUpperCase();
    let targetRSVP: GuestRSVP | undefined;

    const updatedList = list.map((r) => {
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

    if (isSupabaseConfigured && targetRSVP) {
      updateRemoteCheckIn((targetRSVP as GuestRSVP).id, Boolean((targetRSVP as GuestRSVP).checkedIn), (targetRSVP as GuestRSVP).checkedInAt).catch((err) =>
        console.warn('Background Supabase check-in error:', err)
      );
    }

    return { updatedList, rsvp: targetRSVP };
  } catch (err) {
    console.error('Failed to toggle check-in status', err);
    return { updatedList: getStoredRSVPs() };
  }
}
