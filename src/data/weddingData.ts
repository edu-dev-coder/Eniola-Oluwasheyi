import type { WeddingEvent, GiftItem, BankAccountDetails, WeddingWish, GuestRSVP } from '../types/wedding';

export const WEDDING_COUPLE = {
  groom: {
    fullName: "Adebiyi Peter Oluwaseyi",
    shortName: "Oluwaseyi",
    title: "The Groom",
    parents: "Late Senior Apostle & Mrs Joshua Adebiyi",
    profession: "Creative Fashion & Lifestyle Designer",
    quote: "Finding Eniola is finding the masterstroke that completed my life's canvas.",
  },
  bride: {
    fullName: "Falola Abisola Eniola",
    shortName: "Eniola",
    title: "The Bride",
    parents: "Elder & Deaconess B.J Falola",
    profession: "Couture Fashion & Brand Designer",
    quote: "With Oluwaseyi, love feels intentional, beautifully tailored, and divinely ordained.",
  },
  hashtag: "#DesignersMeet",
  monogram: "E & O",
  dateSummary: "Saturday, November 7, 2026",
  countdownTarget: "2026-11-07T11:00:00",
  ceremonyTime: "11:00 AM Prompt",
  venueName: "JJ & Jaz Event Center",
  venueAddress: "Taoheed Road, Basin",
  venueCity: "Ilorin, Kwara State",
  welcomeMessage: "E kaabo! Together with our families, Elder & Deaconess B.J Falola and Late Senior Apostle & Mrs Joshua Adebiyi, we joyfully invite you to witness our holy matrimony and celebrate the union of two visionary designers becoming one in Christ.",
  rsvpContacts: [
    { name: "Queen", phone: "08163186020", tel: "+2348163186020" },
    { name: "Bode", phone: "08176498609", tel: "+2348176498609" }
  ]
};

export const COUPLE_DETAILS = {
  groom: WEDDING_COUPLE.groom.shortName,
  bride: WEDDING_COUPLE.bride.shortName,
  hashtag: WEDDING_COUPLE.hashtag,
  monogram: WEDDING_COUPLE.monogram,
};

export const WEDDING_COLORS = [
  { name: 'Chocolate Brown', hex: '#3D1E16', description: 'Rich, grounding elegance for bespoke suits and velvet accents.' },
  { name: 'Walnut Brown', hex: '#5C3322', description: 'Earthy warmth reflecting heritage, strength, and classic tradition.' },
  { name: 'Amber', hex: '#D97724', description: 'Luminous sunset golden-orange symbolizing joy, warmth, and vitality.' },
  { name: 'Burnt Orange', hex: '#C85023', description: 'Vibrant celebratory energy representing passion and royalty.' },
  { name: 'Beige', hex: '#EFE3D5', description: 'Refined neutral champagne-cream tying the warm autumn palette together.' }
];

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'traditional',
    title: 'Engagement Ceremony & Holy Matrimony',
    nativeTitle: 'Alaga Ijoko & Alaga Iduro Nuptial Rites',
    date: 'Saturday, November 7, 2026',
    formattedDate: 'Nov 07, 2026',
    time: '11:00 AM Prompt',
    venueName: 'JJ & Jaz Event Center',
    venueAddress: 'Taoheed Road, Basin',
    city: 'Ilorin, Kwara State',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0!2d4.55!3d8.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjgnNDguMCJOIDTCsDMzJzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng',
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=JJ+and+Jaz+Event+Center+Taoheed+Road+Basin+Ilorin+Kwara+State',
    dressCode: 'Royal Elegance: Chocolate Brown, Walnut Brown, Amber, Burnt Orange, or Warm Beige. Aso-Ebi & native couture highly celebrated.',
    colorPalette: WEDDING_COLORS,
    itinerary: [
      {
        time: '11:00 AM',
        title: 'Arrival of Distinguished Guests & Classical Strings',
        description: 'Warm welcome of elders, in-laws, colleagues, and esteemed guests with chilled refreshments and red carpet entry.'
      },
      {
        time: '11:30 AM',
        title: 'Welcome Address & Traditional Opening Prayers',
        description: 'Opening prayers giving reverence to God Almighty for the union of the Falola and Adebiyi families.'
      },
      {
        time: '12:15 PM',
        title: 'Presentation of Proposal & Acceptance Letters',
        description: 'The ancient cultural dialogue between Alaga Ijoko and Alaga Iduro, presenting the official letter of marriage.'
      },
      {
        time: '01:00 PM',
        title: 'The Dazzling Entrance of the Bride (Eniola)',
        description: 'Abisola Eniola steps in with her radiant bridal squad, paying homage to her parents and in-laws.'
      },
      {
        time: '01:45 PM',
        title: 'Engagement Rites & Nuptial Blessing',
        description: 'Presentation of symbolic gifts, holy bible, honey, and kola nut signifying sweet and fruitful living.'
      },
      {
        time: '02:30 PM',
        title: 'Grand Entrance of the Groom (Oluwaseyi)',
        description: 'Adebiyi Peter Oluwaseyi makes his grand entrance flanked by his sharp groomsmen to claim his queen.'
      },
      {
        time: '03:15 PM',
        title: 'Unveiling, Exchange of Rings & Marital Vows',
        description: 'Lifting the bridal veil, sealing promises, and joint declaration as husband and wife.'
      },
      {
        time: '04:00 PM - Late',
        title: 'Grand Reception Banquet & #DesignersMeet After-Party',
        description: 'Cutting of the master-crafted cake, couple dance, sumptuous buffet, and music by top Afrobeats & live band.'
      }
    ],
    importantNotes: [
      'Admission is strictly with your Digital VIP Pass QR Code.',
      'Valet parking and uniform security personnel stationed at the gate.',
      'Color Palette: Chocolate Brown, Walnut Brown, Amber, Burnt Orange, Beige.'
    ]
  },
  {
    id: 'white',
    title: 'Grand Reception & Celebration Dinner',
    nativeTitle: 'Royal Banquet & Designers Celebration',
    date: 'Saturday, November 7, 2026',
    formattedDate: 'Nov 07, 2026',
    time: '03:30 PM Prompt',
    venueName: 'JJ & Jaz Event Center Ballroom',
    venueAddress: 'Taoheed Road, Basin',
    city: 'Ilorin, Kwara State',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0!2d4.55!3d8.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjgnNDguMCJOIDTCsDMzJzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng',
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=JJ+and+Jaz+Event+Center+Taoheed+Road+Basin+Ilorin+Kwara+State',
    dressCode: 'Black Tie Glamour / Haute Couture Native. Accentuated in Amber, Walnut Brown, & Warm Beige.',
    colorPalette: WEDDING_COLORS,
    itinerary: [
      {
        time: '03:30 PM',
        title: 'Red Carpet & Cocktail Hour',
        description: 'Signature mocktails, gourmet small chops, and luxury 360 photo booth experience for all attendees.'
      },
      {
        time: '04:15 PM',
        title: 'Newlyweds Grand First Dance',
        description: 'Eniola & Oluwaseyi step onto the illuminated dancefloor for their celebratory royal dance.'
      },
      {
        time: '05:00 PM',
        title: 'Royal Toast & Banquet Delicacies',
        description: 'Champagne toast by the Best Man and Maid of Honor followed by the grand feast of local & continental dishes.'
      },
      {
        time: '06:30 PM - Late',
        title: 'Music, Spraying & Endless Grooves',
        description: 'Uninterrupted music grooves celebrating the #DesignersMeet love story.'
      }
    ],
    importantNotes: [
      'VIP table reservations mapped by RSVP pass codes.',
      'Professional security team handling gate access.'
    ]
  }
];

export const GALLERY_PORTRAITS = [
  {
    src: './photos/outdoor-umbrella.jpg',
    title: 'The Royal Nigerian Heritage',
    subtitle: 'Eniola in regal black lace with parasol & Oluwaseyi with ceremonial staff',
    tag: 'Traditional Regalia'
  },
  {
    src: './photos/studio-suit-full.jpg',
    title: '#DesignersMeet Signature Tailoring',
    subtitle: 'Custom tailored beige double-breasted suit & chocolate brown ensemble',
    tag: 'Designer Series'
  },
  {
    src: './photos/outdoor-walking.jpg',
    title: 'Joyful Walk of Destiny',
    subtitle: 'Smiling together hand-in-hand beneath the lush canopies of Ilorin',
    tag: 'Love in Motion'
  },
  {
    src: './photos/studio-suit-hands.jpg',
    title: 'Intertwined by Craft & Covenant',
    subtitle: 'Geometric designer hand clasp representing unbroken unity',
    tag: 'The Covenant'
  },
  {
    src: './photos/outdoor-close.jpg',
    title: 'My Sanctuary & My Home',
    subtitle: 'Eniola resting gracefully upon Oluwaseyi\'s shoulder',
    tag: 'Intimate Romance'
  },
  {
    src: './photos/bw-intimate.jpg',
    title: 'Timeless Monochromatic Grace',
    subtitle: 'A quiet, heartfelt gaze before the journey into eternity',
    tag: 'Fine Art'
  },
  {
    src: './photos/studio-suit-shades.jpg',
    title: 'Visionaries in Harmony',
    subtitle: 'High-fashion editorial profile of two creative souls',
    tag: 'Editorial'
  },
  {
    src: './photos/outdoor-laughing.jpg',
    title: 'Laughter, Light & Forever',
    subtitle: 'Pure uninhibited laughter that fills our home with peace',
    tag: 'Pure Joy'
  }
];

export const GIFT_ITEMS: GiftItem[] = [
  {
    id: 'gift-1',
    title: 'Designers Creative Atelier & Tech Suite',
    category: 'home',
    description: 'Contributing towards cutting-edge design workstations, fabric plotters, and studio equipment for our creative venture.',
    targetAmount: 3000000,
    currentAmount: 0,
    iconName: 'ChefHat',
    image: './photos/studio-suit-standing.jpg'
  },
  {
    id: 'gift-2',
    title: 'Maldives / Zanzibar Romantic Honeymoon Fund',
    category: 'honeymoon',
    description: 'Help send the newlyweds on a peaceful tropical beach retreat to unwind and celebrate after the wedding festivities.',
    targetAmount: 4000000,
    currentAmount: 0,
    iconName: 'Plane',
    image: './photos/outdoor-walking.jpg'
  },
  {
    id: 'gift-3',
    title: 'Dream Home Interior & Furnishing',
    category: 'home',
    description: 'Assisting the couple in curating a serene, designer-curated home sanctuary in which to begin marital bliss.',
    targetAmount: 2500000,
    currentAmount: 0,
    iconName: 'Home',
    image: './photos/studio-suit-full.jpg'
  },
  {
    id: 'gift-4',
    title: 'First Year Romantic Getaways & Date Nights',
    category: 'experience',
    description: 'Sponsoring romantic candlelit dinners, theater visits, and peaceful weekend getaways throughout our first year.',
    targetAmount: 1000000,
    currentAmount: 0,
    iconName: 'UtensilsCrossed',
    image: './photos/outdoor-close.jpg'
  }
];

export const BANK_ACCOUNTS: BankAccountDetails[] = [
  {
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0126183282',
    accountName: 'Falola Abisola Eniola',
    currency: 'NGN (Nigerian Naira)',
    diasporaNote: "Bride's Direct Gift Account (USSD / Local Transfer)"
  },
  {
    bankName: 'First Bank of Nigeria',
    accountNumber: '3081170123',
    accountName: 'Adebiyi Peter Oluwaseyi',
    currency: 'NGN (Nigerian Naira)',
    diasporaNote: "Groom's Direct Gift Account (USSD / Local Transfer)"
  }
];

export const INITIAL_PRAYERS: WeddingWish[] = [
  {
    id: 'wish-1',
    name: 'Elder & Deaconess B.J Falola',
    relationship: "Parents of the Bride",
    message: 'Abisola, our precious jewel! You have been a source of unceasing joy to us. Seeing you unite with Oluwaseyi fills our hearts with praise.',
    prayer: 'May the Lord establish your home on the solid rock of Christ. May your peace flow like an endless river and may God crown your union with honor and divine favor!',
    reactions: 48,
    createdAt: '2026-10-25T09:30:00Z'
  },
  {
    id: 'wish-2',
    name: 'Mrs. Joshua Adebiyi & Family',
    relationship: "Family of the Groom",
    message: 'Oluwaseyi my son, your late father Senior Apostle Joshua Adebiyi would have been immensely proud today. You chose a woman of virtue and wisdom in Eniola.',
    prayer: 'May God’s grace be your eternal shield. What God has joined together, no man shall put asunder. You will both flourish in love, good health, and abundance!',
    reactions: 52,
    createdAt: '2026-10-26T14:15:00Z'
  },
  {
    id: 'wish-3',
    name: 'Queen (RSVP Coordinator)',
    relationship: "Bridal Committee",
    message: 'Two creative titans, two pure souls! Working with you on #DesignersMeet has been magical. Can’t wait to celebrate in Ilorin!',
    prayer: 'May your creativity continue to shape nations and may your love story be told for generations. Congratulations Eniola & Peter!',
    reactions: 35,
    createdAt: '2026-10-28T11:00:00Z'
  },
  {
    id: 'wish-4',
    name: 'Bode (RSVP Coordinator)',
    relationship: "Groom's Confidant",
    message: 'P-Square! My brother Peter Oluwaseyi! You have found your crown in Eniola. Welcome to forever.',
    prayer: 'May God grant you supernatural wisdom to lead your home. May your laughter never cease and your table always overflow with blessings.',
    reactions: 39,
    createdAt: '2026-10-29T16:45:00Z'
  }
];

export const INITIAL_RSVPS: GuestRSVP[] = [
  {
    id: 'rsvp-1',
    name: 'Chief & Dr. (Mrs.) Tunde Balogun',
    phone: '+234 803 555 0192',
    email: 'tunde.balogun@example.com',
    attending: 'both',
    partySize: 2,
    guestNames: 'Dr. (Mrs.) Kemi Balogun',
    mealPreference: 'Amala with Abula (Gbegiri & Ewedu) + Assorted Goat Meat',
    songRequest: 'KSA - Synchrony System / Ebenezer Obey',
    passCode: 'DES-8291',
    createdAt: '2026-10-24T10:12:00Z',
    checkedIn: false
  },
  {
    id: 'rsvp-2',
    name: 'Arc. Femi Adeleke',
    phone: '+234 802 444 8812',
    email: 'femi.adeleke@example.com',
    attending: 'both',
    partySize: 1,
    mealPreference: 'Jollof Rice with Fried Chicken, Plantain & Salad',
    songRequest: 'Asake - Only Me / Burna Boy',
    passCode: 'DES-4402',
    createdAt: '2026-10-25T15:30:00Z',
    checkedIn: false
  },
  {
    id: 'rsvp-3',
    name: 'Pastor & Deaconess Segun Olatunji',
    phone: '+234 810 998 1234',
    email: 'segun.olatunji@example.com',
    attending: 'traditional',
    partySize: 2,
    guestNames: 'Deaconess Folashade Olatunji',
    mealPreference: 'Pounded Yam with Egusi Soup & Fresh Catfish',
    songRequest: 'Nathaniel Bassey - Tobechukwu',
    passCode: 'DES-9031',
    createdAt: '2026-10-26T12:00:00Z',
    checkedIn: false
  }
];
