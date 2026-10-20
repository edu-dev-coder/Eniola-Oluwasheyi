import type { WeddingEvent, LoveStoryMilestone, GiftItem, BankAccountDetails, WeddingWish, GuestRSVP } from '../types/wedding';

export const WEDDING_COUPLE = {
  groom: {
    fullName: "Melvin Chukwudi Okafor",
    shortName: "Melvin",
    title: "The Groom",
    parents: "Mr. & Mrs. Kenneth Okafor of Umunze, Anambra State",
    bio: "An architect with a passion for creative design, jazz, and traditional highlife music. Captured by Chidimma's radiant grace.",
  },
  bride: {
    fullName: "Chidimma Precious Eze",
    shortName: "Chidimma",
    title: "The Bride",
    parents: "Chief & Lolo Emmanuel Eze (Nwannedinamba 1 of Enugwu-Ukwu)",
    bio: "A healthcare professional and culinary enthusiast who lights up every room she steps into with her radiant warmth and faith.",
  },
  hashtag: "#MELWED2026",
  monogram: "M & C",
  dateSummary: "December 18 & 20, 2026",
  countdownTarget: "2026-12-18T10:00:00",
  welcomeMessage: "Nnoo nu! Igbo Kwenu! We warmly invite you to share in the joyful union of our hearts and families as we become one under God's grace and ancestral blessing.",
};

export const COUPLE_DETAILS = {
  groom: WEDDING_COUPLE.groom.shortName,
  bride: WEDDING_COUPLE.bride.shortName,
  hashtag: WEDDING_COUPLE.hashtag,
  monogram: WEDDING_COUPLE.monogram,
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'traditional',
    title: 'Traditional Wedding Ceremony',
    nativeTitle: 'Igba Nkwu Nwanyi (Wine Carrying Ceremony)',
    date: 'Friday, December 18, 2026',
    formattedDate: 'Dec 18, 2026',
    time: '12:00 PM Prompt',
    venueName: "Chief Eze's Royal Ancestral Estate",
    venueAddress: 'Plot 14 Chief Emmanuel Eze Crescent, Off Bisalla Road, Independence Layout',
    city: 'Enugu, Nigeria',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126868.58619623725!2d7.420658469857943!3d6.444265147822989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a3d6f1bf811d%3A0xb563038676bf03be!2sIndependence%20Layout%2C%20Enugu!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng',
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=Independence+Layout+Enugu+Nigeria',
    dressCode: 'Royal Igbo Regal Splendor: Emerald Green George or Lace, accented with Rich Coral Beads (Iyin) and Gold Gele/Cap.',
    colorPalette: [
      { name: 'Emerald Velvet', hex: '#0A3824' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Coral Regal', hex: '#E2583E' },
      { name: 'Warm Ivory', hex: '#FDFBF7' }
    ],
    itinerary: [
      {
        time: '12:00 PM',
        title: 'Arrival of Guests & Ogene Highlife Melodies',
        description: 'Warm welcome of in-laws, elders, and cherished friends with traditional palm wine and flute sounds.'
      },
      {
        time: '01:00 PM',
        title: 'Iwa Oji (Blessing & Breaking of Kola Nut)',
        description: 'The cultural foundation of Igbo hospitality: prayers for long life, prosperity, and peace from the elders.'
      },
      {
        time: '02:00 PM',
        title: 'First Outing of the Bride',
        description: 'Chidimma makes her dazzling maiden entrance accompanied by her Ada-Ukwu maidens to greet the in-laws.'
      },
      {
        time: '03:15 PM',
        title: 'Igba Nkwu (The Sacred Wine Carrying)',
        description: 'Her father gives her a cup of fresh palm wine to search the crowd, find Melvin, offer him the cup, and seal the union!'
      },
      {
        time: '04:30 PM',
        title: 'Nuptial Dance & Celebration of Love',
        description: 'Royal couple dance, celebratory showers of blessings, authentic Igbo delicacies, and live highlife band.'
      }
    ],
    importantNotes: [
      'Valet parking and security personnel on site.',
      'Aso-Ebi pickup booth is open near the main foyer.',
      'Cash spray etiquette: Currency exchange booth available at the reception entrance.'
    ]
  },
  {
    id: 'white',
    title: 'Holy Matrimony & Grand Reception',
    nativeTitle: 'Church Blessing & Royal Banquet',
    date: 'Sunday, December 20, 2026',
    formattedDate: 'Dec 20, 2026',
    time: '10:00 AM Prompt (Church) | 01:30 PM (Reception)',
    venueName: 'Holy Ghost Cathedral & The Monarch Grand Ballroom',
    venueAddress: 'Cathedral: Ogui Road | Reception: The Monarch Palace Ballroom, Presidential Road',
    city: 'Enugu, Nigeria',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63434.29321743818!2d7.473539821679687!3d6.444265100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a3e74b2fb41f%3A0xe54ef5f6f89ef7dc!2sHoly%20Ghost%20Cathedral%2C%20Enugu!5e0!3m2!1sen!2sng!4v1700000000001!5m2!1sen!2sng',
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=Holy+Ghost+Cathedral+Enugu+Nigeria',
    dressCode: 'Black Tie Glamour / Modern African Haute Couture. Colors: Champagne Gold, Forest Emerald & Pearls.',
    colorPalette: [
      { name: 'Royal Gold', hex: '#D4AF37' },
      { name: 'Forest Green', hex: '#0D4A30' },
      { name: 'Pure Pearl', hex: '#FFFFFF' },
      { name: 'Midnight Onyx', hex: '#1A1A1A' }
    ],
    itinerary: [
      {
        time: '10:00 AM',
        title: 'Solemnization of Holy Matrimony',
        description: 'Exchange of sacred marital vows and rings at the Cathedral altar in the presence of God and witnesses.'
      },
      {
        time: '12:30 PM',
        title: 'Couple & Family Photo Session',
        description: 'Scenic garden photography session with the bridal train and parents.'
      },
      {
        time: '01:30 PM',
        title: 'Cocktail Hour & Red Carpet',
        description: 'Signature mocktails, small chops, and photo-booth moments at the Monarch Ballroom lobby.'
      },
      {
        time: '02:30 PM',
        title: 'Grand Entrance of the Newlyweds',
        description: 'Melvin and Chidimma step into the ballroom for their first entrance as Mr. & Mrs. Okafor!'
      },
      {
        time: '03:45 PM',
        title: 'Cutting of the 7-Tier Cake & Toast',
        description: 'Sweet celebration toasts led by the Best Man and Chief Bridesmaid.'
      },
      {
        time: '05:00 PM - Late',
        title: 'After-Party & Endless Dance',
        description: 'Live DJ set, Afrobeat anthems, special performances, and joyous celebration till the night unfolds.'
      }
    ],
    importantNotes: [
      'Please be seated in the Church 15 minutes before 10:00 AM.',
      'Strictly RSVP entry for the Reception Ballroom to ensure seamless table seating.',
      'Children play zone with certified attendants available at the venue.'
    ]
  }
];

export const LOVE_STORY: LoveStoryMilestone[] = [
  {
    year: 'December 2021',
    title: 'A Chance Glance Across the Canopy',
    location: 'Lagos, Nigeria',
    description: "It was at a mutual friend's traditional wedding in Victoria Island. Melvin was captivated by the lady in the shimmering green George wrapper who smiled so genuinely at everyone. A shared conversation about Igbo history and favorite roasted plantain (Boli) turned into a 3-hour laughter that neither wanted to end.",
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    caption: 'Where two worlds gently intertwined'
  },
  {
    year: 'August 2022',
    title: 'The Miles That Drew Us Closer',
    location: 'Abuja & Enugu',
    description: 'Despite living in different cities for eight months while working on landmark projects, our nightly phone calls, surprise flower deliveries, and weekend road trips made distance feel completely powerless against our growing bond.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    caption: 'Miles conquered by faith and devotion'
  },
  {
    year: 'December 2024',
    title: 'The Sunset Proposal on Milken Hill',
    location: 'Enugu Pine Forest Ridge',
    description: 'Overlooking the gentle hills of the Coal City at golden hour, surrounded by fairy lights and gentle strings playing "Ada Ada", Melvin knelt on one knee with tears of joy, asking Chidimma to build forever with him. Her "A thousand times YES!" echoed into the sunset.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    caption: 'She said YES on the hills of Enugu'
  },
  {
    year: 'December 2026',
    title: 'Two Hearts, One Covenant',
    location: 'Enugu, Nigeria',
    description: 'Surrounded by our beloved parents, elders, siblings, and dearest friends, we step forward to give glory to God and celebrate our union in royal cultural elegance. Forever begins now!',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    caption: 'Our Forever journey begins'
  }
];

export const GIFT_ITEMS: GiftItem[] = [
  {
    id: 'gift-1',
    title: 'Zanzibar & Seychelles Honeymoon Getaway',
    category: 'honeymoon',
    description: 'Help fund our dream romantic escape to the turquoise beaches of Zanzibar and serene sunsets of Seychelles.',
    targetAmount: 3500000,
    currentAmount: 2150000,
    iconName: 'Plane',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gift-2',
    title: 'New Home Culinary & Kitchen Suite',
    category: 'home',
    description: 'Contributions toward our kitchen essentials: smart blender, double-door refrigerator, and cast iron cookware for Sunday feasts.',
    targetAmount: 1800000,
    currentAmount: 1200000,
    iconName: 'ChefHat',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gift-3',
    title: 'Cozy Living Room & Library Setup',
    category: 'home',
    description: 'Helping us curate a peaceful sanctuary of books, comfortable seating, and warm lighting for our family devotions.',
    targetAmount: 1500000,
    currentAmount: 950000,
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gift-4',
    title: 'First Year Romantic Date Night Fund',
    category: 'experience',
    description: 'Supporting sweet monthly dinner dates, theater outings, and weekend staycations during our blessed first year of marriage.',
    targetAmount: 750000,
    currentAmount: 580000,
    iconName: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
  }
];

export const BANK_ACCOUNTS: BankAccountDetails[] = [
  {
    bankName: 'Zenith Bank PLC',
    accountNumber: '1018894235',
    accountName: 'Melvin Chukwudi Okafor & Chidimma Eze',
    currency: 'NGN (Nigerian Naira)',
    diasporaNote: 'For local Nigerian transfers or USSD banking'
  },
  {
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0234589112',
    accountName: 'Melvin Chukwudi Okafor',
    currency: 'USD / Domiciliary Transfer',
    swiftCode: 'GTBINGLA',
    diasporaNote: 'Ideal for friends and family sending love from the UK, USA, Canada, and Diaspora'
  }
];

export const INITIAL_PRAYERS: WeddingWish[] = [
  {
    id: 'wish-1',
    name: 'Uncle Emeka & Aunty Nkiru',
    relationship: "Bride's Family",
    message: 'Chidimma our precious jewel, and Melvin our fine in-law! We are overjoyed. Your union is ordained in heaven.',
    prayer: 'May your home be surrounded by laughter, divine health, peace like a river, and sweet harmony that only deepens with age. Chukwu gozie unu nile!',
    reactions: 34,
    createdAt: '2026-10-15T09:30:00Z'
  },
  {
    id: 'wish-2',
    name: 'Dr. Obinna Anyaoku',
    relationship: "Groom's Friend",
    message: 'Mel, my brother from UNILAG days! Seeing you meet your queen Chidimma has been the most beautiful journey to witness.',
    prayer: 'May your love be stronger than iron, sweet like fresh palm wine, and may your children flourish like cedar trees on Mount Lebanon. Cheers to #MELWED2026!',
    reactions: 27,
    createdAt: '2026-10-16T14:15:00Z'
  },
  {
    id: 'wish-3',
    name: 'Adaora Nwosu',
    relationship: "Chief Bridesmaid",
    message: 'Chidi my sister of life! From secondary school desks to picking out your royal George fabric today, God has been faithful!',
    prayer: 'May Melvin cherish you every single morning. May wisdom guide your decisions, and may peace reign in your dwelling forever.',
    reactions: 42,
    createdAt: '2026-10-17T11:00:00Z'
  },
  {
    id: 'wish-4',
    name: 'Engr. & Mrs. Kenechukwu Mbah',
    relationship: 'Family Friends',
    message: 'Hearty congratulations to the Okafor and Eze families! This union brings two great houses together in love and unity.',
    prayer: 'The grace of the Lord shall be your canopy. In times of abundance you shall be humble, in all times you shall remain united as one cord.',
    reactions: 19,
    createdAt: '2026-10-18T16:45:00Z'
  }
];

export const INITIAL_RSVPS: GuestRSVP[] = [
  {
    id: 'rsvp-1',
    name: 'Sir Patrick Okonkwo & Lady Ifeoma',
    phone: '+234 803 555 0192',
    email: 'patrick.okonkwo@example.com',
    attending: 'both',
    partySize: 2,
    guestNames: 'Lady Ifeoma Okonkwo',
    mealPreference: 'Pounded Yam with Ofe Oha & Fresh Fish',
    songRequest: 'Osadebe - Osondi Owendi',
    passCode: 'MEL-8291',
    createdAt: '2026-10-14T10:12:00Z'
  },
  {
    id: 'rsvp-2',
    name: 'Kamsi Igwe',
    phone: '+234 802 444 8812',
    email: 'kamsi.igwe@example.com',
    attending: 'both',
    partySize: 1,
    mealPreference: 'Jollof Rice with Crispy Fried Chicken & Plantain',
    songRequest: 'Flavour - Ada Ada',
    passCode: 'MEL-4402',
    createdAt: '2026-10-15T15:30:00Z'
  },
  {
    id: 'rsvp-3',
    name: 'Chinedu & Somadina Nnamdi',
    phone: '+234 810 998 1234',
    email: 'somadina@example.com',
    attending: 'traditional',
    partySize: 2,
    guestNames: 'Somadina Nnamdi',
    mealPreference: 'Abacha (African Salad) with Ugba & Fried Fish',
    songRequest: 'Umu Obiligbo - Culture',
    passCode: 'MEL-9031',
    createdAt: '2026-10-16T12:00:00Z'
  }
];
