import { createClient } from '@supabase/supabase-js';
import type { GuestRSVP, WeddingWish } from '../types/wedding';
import { SUPABASE_CONFIG } from '../config/supabaseConfig';

// Get Supabase credentials
const supabaseUrl = SUPABASE_CONFIG.url.trim();
const supabaseAnonKey = SUPABASE_CONFIG.anonKey.trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('YOUR_SUPABASE_URL')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all wishes from Supabase cloud database
 */
export async function fetchRemoteWishes(): Promise<WeddingWish[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch wishes error:', error.message);
      return null;
    }

    if (!data) return [];

    return data.map((item) => ({
      id: String(item.id),
      name: item.name || 'Anonymous',
      relationship: item.relationship || 'Well Wisher',
      message: item.message || '',
      prayer: item.prayer || undefined,
      reactions: typeof item.reactions === 'number' ? item.reactions : 0,
      createdAt: item.created_at || new Date().toISOString(),
    }));
  } catch (err) {
    console.warn('Network error fetching wishes from Supabase:', err);
    return null;
  }
}

/**
 * Insert a new wish to Supabase
 */
export async function insertRemoteWish(wish: WeddingWish): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('wishes').insert([
      {
        id: wish.id,
        name: wish.name,
        relationship: wish.relationship,
        message: wish.message,
        prayer: wish.prayer || null,
        reactions: wish.reactions,
        created_at: wish.createdAt,
      },
    ]);

    if (error) {
      console.warn('Supabase insert wish error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Network error inserting wish to Supabase:', err);
    return false;
  }
}

/**
 * React to a wish in Supabase
 */
export async function incrementRemoteWishReaction(wishId: string, newTotal: number): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('wishes')
      .update({ reactions: newTotal })
      .eq('id', wishId);

    if (error) {
      console.warn('Supabase reaction error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Network error updating reaction in Supabase:', err);
    return false;
  }
}

/**
 * Fetch all RSVPs from Supabase
 */
export async function fetchRemoteRSVPs(): Promise<GuestRSVP[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch rsvps error:', error.message);
      return null;
    }

    if (!data) return [];

    return data.map((item) => ({
      id: String(item.id),
      passCode: item.pass_code,
      name: item.name,
      phone: item.phone,
      email: item.email || '',
      attending: item.attending as GuestRSVP['attending'],
      partySize: Number(item.party_size) || 1,
      guestNames: item.guest_names || undefined,
      mealPreference: item.meal_preference || '',
      songRequest: item.song_request || undefined,
      createdAt: item.created_at || new Date().toISOString(),
      checkedIn: Boolean(item.checked_in),
      checkedInAt: item.checked_in_at || undefined,
    }));
  } catch (err) {
    console.warn('Network error fetching rsvps from Supabase:', err);
    return null;
  }
}

/**
 * Insert or update an RSVP in Supabase
 */
export async function insertRemoteRSVP(rsvp: GuestRSVP): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('rsvps').upsert([
      {
        id: rsvp.id,
        pass_code: rsvp.passCode,
        name: rsvp.name,
        phone: rsvp.phone,
        email: rsvp.email,
        attending: rsvp.attending,
        party_size: rsvp.partySize,
        guest_names: rsvp.guestNames || null,
        meal_preference: rsvp.mealPreference,
        song_request: rsvp.songRequest || null,
        created_at: rsvp.createdAt,
        checked_in: Boolean(rsvp.checkedIn),
        checked_in_at: rsvp.checkedInAt || null,
      },
    ]);

    if (error) {
      console.warn('Supabase insert rsvp error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Network error inserting rsvp to Supabase:', err);
    return false;
  }
}

/**
 * Update check-in status in Supabase
 */
export async function updateRemoteCheckIn(id: string, checkedIn: boolean, checkedInAt?: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('rsvps')
      .update({
        checked_in: checkedIn,
        checked_in_at: checkedInAt || null,
      })
      .eq('id', id);
    return !error;
  } catch (err) {
    console.warn('Network error updating check-in in Supabase:', err);
    return false;
  }
}

/**
 * Delete RSVP in Supabase
 */
export async function deleteRemoteRSVP(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('rsvps').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.warn('Network error deleting rsvp in Supabase:', err);
    return false;
  }
}
