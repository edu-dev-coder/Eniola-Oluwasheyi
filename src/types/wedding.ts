export interface WeddingEvent {
  id: 'traditional' | 'white';
  title: string;
  nativeTitle?: string;
  date: string;
  formattedDate: string;
  time: string;
  venueName: string;
  venueAddress: string;
  city: string;
  mapEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  dressCode: string;
  colorPalette: { name: string; hex: string }[];
  itinerary: { time: string; title: string; description: string }[];
  importantNotes?: string[];
}

export interface LoveStoryMilestone {
  year: string;
  title: string;
  location: string;
  description: string;
  image: string;
  caption?: string;
}

export interface GuestRSVP {
  id: string;
  name: string;
  phone: string;
  email: string;
  attending: 'both' | 'traditional' | 'white' | 'declined';
  partySize: number;
  guestNames?: string;
  mealPreference: string;
  songRequest?: string;
  passCode: string;
  createdAt: string;
  checkedIn?: boolean;
  checkedInAt?: string;
}

export interface WeddingWish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  prayer?: string;
  reactions: number;
  createdAt: string;
}

export interface GiftItem {
  id: string;
  title: string;
  category: 'honeymoon' | 'home' | 'experience' | 'lifestyle';
  description: string;
  targetAmount: number;
  currentAmount: number;
  iconName: string;
  image: string;
}

export interface BankAccountDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  currency: string;
  swiftCode?: string;
  diasporaNote?: string;
}
