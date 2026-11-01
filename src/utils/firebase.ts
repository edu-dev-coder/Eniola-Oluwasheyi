import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  increment,
  type Unsubscribe,
} from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../config/firebaseConfig';
import type { GuestRSVP, WeddingWish } from '../types/wedding';

// Check if Firebase is configured with real credentials
export const isFirebaseConfigured = Boolean(
  FIREBASE_CONFIG.apiKey &&
  FIREBASE_CONFIG.projectId &&
  !FIREBASE_CONFIG.apiKey.includes('YOUR_') &&
  !FIREBASE_CONFIG.projectId.includes('YOUR_')
);

const app = isFirebaseConfigured
  ? (getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp())
  : null;

export const db = app ? getFirestore(app) : null;

const WISHES_COLLECTION = 'wishes';
const RSVPS_COLLECTION = 'rsvps';

/**
 * Fetch all wishes from Cloud Firestore
 */
export async function fetchFirestoreWishes(): Promise<WeddingWish[] | null> {
  if (!db) return null;
  try {
    const q = query(collection(db, WISHES_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const results: WeddingWish[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      results.push({
        id: docSnap.id,
        name: data.name || 'Anonymous',
        relationship: data.relationship || 'Well Wisher',
        message: data.message || '',
        prayer: data.prayer || undefined,
        reactions: typeof data.reactions === 'number' ? data.reactions : 1,
        createdAt: data.createdAt || new Date().toISOString(),
      });
    });
    return results;
  } catch (err) {
    console.warn('Firestore fetch wishes error:', err);
    return null;
  }
}

/**
 * Save or update a wish in Cloud Firestore
 */
export async function insertFirestoreWish(wish: WeddingWish): Promise<boolean> {
  if (!db) return false;
  try {
    const ref = doc(db, WISHES_COLLECTION, wish.id);
    await setDoc(ref, {
      id: wish.id,
      name: wish.name,
      relationship: wish.relationship,
      message: wish.message,
      prayer: wish.prayer || null,
      reactions: wish.reactions,
      createdAt: wish.createdAt,
    });
    return true;
  } catch (err) {
    console.warn('Firestore insert wish error:', err);
    return false;
  }
}

/**
 * Increment reaction count on a wish in Cloud Firestore
 */
export async function incrementFirestoreWishReaction(wishId: string): Promise<boolean> {
  if (!db) return false;
  try {
    const ref = doc(db, WISHES_COLLECTION, wishId);
    await updateDoc(ref, {
      reactions: increment(1),
    });
    return true;
  } catch (err) {
    console.warn('Firestore reaction error:', err);
    return false;
  }
}

/**
 * Real-time listener for wishes
 */
export function subscribeToFirestoreWishes(
  onUpdate: (wishes: WeddingWish[]) => void
): Unsubscribe | null {
  if (!db) return null;
  try {
    const q = query(collection(db, WISHES_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const list: WeddingWish[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          name: data.name || 'Anonymous',
          relationship: data.relationship || 'Well Wisher',
          message: data.message || '',
          prayer: data.prayer || undefined,
          reactions: typeof data.reactions === 'number' ? data.reactions : 1,
          createdAt: data.createdAt || new Date().toISOString(),
        });
      });
      onUpdate(list);
    });
  } catch (err) {
    console.warn('Firestore wishes subscription error:', err);
    return null;
  }
}

/**
 * Fetch all RSVPs from Cloud Firestore
 */
export async function fetchFirestoreRSVPs(): Promise<GuestRSVP[] | null> {
  if (!db) return null;
  try {
    const q = query(collection(db, RSVPS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const results: GuestRSVP[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      results.push({
        id: docSnap.id,
        passCode: data.passCode || '',
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
        attending: data.attending || 'both',
        partySize: Number(data.partySize) || 1,
        guestNames: data.guestNames || undefined,
        mealPreference: data.mealPreference || '',
        songRequest: data.songRequest || undefined,
        createdAt: data.createdAt || new Date().toISOString(),
        checkedIn: Boolean(data.checkedIn),
        checkedInAt: data.checkedInAt || undefined,
      });
    });
    return results;
  } catch (err) {
    console.warn('Firestore fetch RSVPs error:', err);
    return null;
  }
}

/**
 * Save or update an RSVP in Cloud Firestore
 */
export async function insertFirestoreRSVP(rsvp: GuestRSVP): Promise<boolean> {
  if (!db) return false;
  try {
    const ref = doc(db, RSVPS_COLLECTION, rsvp.id);
    await setDoc(ref, {
      id: rsvp.id,
      passCode: rsvp.passCode,
      name: rsvp.name,
      phone: rsvp.phone,
      email: rsvp.email,
      attending: rsvp.attending,
      partySize: rsvp.partySize,
      guestNames: rsvp.guestNames || null,
      mealPreference: rsvp.mealPreference,
      songRequest: rsvp.songRequest || null,
      createdAt: rsvp.createdAt,
      checkedIn: Boolean(rsvp.checkedIn),
      checkedInAt: rsvp.checkedInAt || null,
    });
    return true;
  } catch (err) {
    console.warn('Firestore insert RSVP error:', err);
    return false;
  }
}

/**
 * Update check-in status in Cloud Firestore
 */
export async function updateFirestoreCheckIn(
  id: string,
  checkedIn: boolean,
  checkedInAt?: string
): Promise<boolean> {
  if (!db) return false;
  try {
    const ref = doc(db, RSVPS_COLLECTION, id);
    await updateDoc(ref, {
      checkedIn,
      checkedInAt: checkedInAt || null,
    });
    return true;
  } catch (err) {
    console.warn('Firestore check-in update error:', err);
    return false;
  }
}

/**
 * Delete RSVP in Cloud Firestore
 */
export async function deleteFirestoreRSVP(id: string): Promise<boolean> {
  if (!db) return false;
  try {
    const ref = doc(db, RSVPS_COLLECTION, id);
    await deleteDoc(ref);
    return true;
  } catch (err) {
    console.warn('Firestore delete RSVP error:', err);
    return false;
  }
}

/**
 * Real-time listener for RSVPs
 */
export function subscribeToFirestoreRSVPs(
  onUpdate: (rsvps: GuestRSVP[]) => void
): Unsubscribe | null {
  if (!db) return null;
  try {
    const q = query(collection(db, RSVPS_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const list: GuestRSVP[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          passCode: data.passCode || '',
          name: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          attending: data.attending || 'both',
          partySize: Number(data.partySize) || 1,
          guestNames: data.guestNames || undefined,
          mealPreference: data.mealPreference || '',
          songRequest: data.songRequest || undefined,
          createdAt: data.createdAt || new Date().toISOString(),
          checkedIn: Boolean(data.checkedIn),
          checkedInAt: data.checkedInAt || undefined,
        });
      });
      onUpdate(list);
    });
  } catch (err) {
    console.warn('Firestore RSVPs subscription error:', err);
    return null;
  }
}

const GIFTS_COLLECTION = 'gift_contributions';

/**
 * Fetch total contributions for each gift item
 */
export async function fetchFirestoreGiftTotals(): Promise<Record<string, number> | null> {
  if (!db) return null;
  try {
    const snapshot = await getDocs(collection(db, GIFTS_COLLECTION));
    const totals: Record<string, number> = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const giftId = data.giftId;
      const amount = Number(data.amount) || 0;
      if (giftId) {
        totals[giftId] = (totals[giftId] || 0) + amount;
      }
    });
    return totals;
  } catch (err) {
    console.warn('Firestore fetch gift totals error:', err);
    return null;
  }
}

/**
 * Record a new gift pledge/contribution in Cloud Firestore
 */
export async function recordFirestoreGiftContribution(
  giftId: string,
  amount: number,
  contributorName?: string
): Promise<boolean> {
  if (!db) return false;
  try {
    const ref = doc(collection(db, GIFTS_COLLECTION));
    await setDoc(ref, {
      giftId,
      amount,
      contributorName: contributorName || 'Anonymous Well-Wisher',
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.warn('Firestore record gift contribution error:', err);
    return false;
  }
}

/**
 * Real-time listener for gift contributions
 */
export function subscribeToFirestoreGiftContributions(
  onUpdate: (totals: Record<string, number>) => void
): Unsubscribe | null {
  if (!db) return null;
  try {
    return onSnapshot(collection(db, GIFTS_COLLECTION), (snapshot) => {
      const totals: Record<string, number> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const giftId = data.giftId;
        const amount = Number(data.amount) || 0;
        if (giftId) {
          totals[giftId] = (totals[giftId] || 0) + amount;
        }
      });
      onUpdate(totals);
    });
  } catch (err) {
    console.warn('Firestore gift contributions subscription error:', err);
    return null;
  }
}
