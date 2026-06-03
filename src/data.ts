import { ItineraryDay, HeroCard, IncludedItem } from './types';

export const HERO_CARDS: HeroCard[] = [
  {
    id: '1',
    title: '3 cities in Japan',
    badge: 'Cities',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600',
    description: 'Explore Tokyo, Kyoto, and Osaka.'
  },
  {
    id: '2',
    title: '10 days',
    badge: 'Duration',
    image: 'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&q=80&w=600',
    description: 'Curated balanced daily itinerary.'
  },
  {
    id: '3',
    title: 'Gigabytes of photos',
    badge: 'Memories',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600',
    description: 'Stunning temples, neon, and Mt Fuji.'
  },
  {
    id: '4',
    title: 'Eat ramen',
    badge: 'Gastronomy',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600',
    description: 'Michelin ramen, sushi, and street food.'
  },
  {
    id: '5',
    title: 'Enjoy the vibe',
    badge: 'Experience',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600',
    description: 'Slow tea ceremonies & dynamic nightlife.'
  }
];

export const ITINERARY: ItineraryDay[] = [
  {
    dayRange: 'Days 1–3',
    city: 'Osaka',
    description: 'Welcome to Japan\'s capital of food and commerce. Dive into the neon jungle of Dotonbori, discover Osaka Castle, and taste the world\'s best takoyaki. We schedule special access tours to high-vantage observation decks and local culinary alleyways.',
    images: [
      'https://images.unsplash.com/photo-1526481280693-3bfa756120f1?auto=format&fit=crop&q=80&w=600', // Osaka castle night
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600'  // Osaka/Tokyo dynamic neon streets
    ],
    attractions: ['Dotonbori Neon Street', 'Osaka Castle Grounds', 'Shinsekai retro district', 'Umeda Sky Building'],
    mustEat: 'Authentic Crispy Takoyaki & Savory Okonomiyaki pancakes'
  },
  {
    dayRange: 'Days 4–6',
    city: 'Kyoto',
    description: 'Step back in time to the cultural heart of Japan. Walk quiet pathways under golden maples and pink cherry blossoms, observe Geisha in the historic Gion quarters, and seek peace inside Zen gardens. We arrange a premium traditional tea ceremony guided by a certified master.',
    images: [
      'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&q=80&w=600', // Arashiyama Bamboo forest
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=600'  // Fushimi Inari
    ],
    attractions: ['Fushimi Inari Torii Paths', 'Arashiyama Bamboo Forest', 'Kinkaku-ji (Golden Pavilion)', 'Historic Gion alleys'],
    mustEat: 'Elegant Kaiseki seasonal course banquet & Matcha tea treats'
  },
  {
    dayRange: 'Days 7–10',
    city: 'Tokyo',
    description: 'Conclude your journey in the world\'s most advanced metropolis. From the historic Senso-ji Temple in Asakusa to the ultra-modern towers of Shinjuku and the famous hyper-trafficked Shibuya crossing. High-speed bullet train transfer included directly from Kyoto.',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=600', // Shibuya
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600'  // Pagoda view or streets
    ],
    attractions: ['Shibuya Crossing view', 'Senso-ji Ancient Temple', 'TeamLab Planets Digital Exhibition', 'Shinjuku skyscraper observation deck'],
    mustEat: 'Tsukiji Hand-rolled Sushi & Rich Tonkotsu Shio Ramen'
  }
];

export const INCLUSIONS: IncludedItem[] = [
  {
    id: 'guides',
    title: {
      en: 'Guides',
      fr: 'Guides'
    },
    description: {
      en: '2 awesome guides who know everything about Japan!',
      fr: '2 guides exceptionnels qui connaissent le Japon sur le bout des doigts !'
    },
    details: {
      en: 'Bilingual certified historical guides who accompany your group to show secret culinary spots and avoid crowds.',
      fr: 'Guides historiques certifiés et bilingues qui vous accompagnent pour éviter la foule et dénicher des pépites culinaires.'
    },
    icon: 'Compass'
  },
  {
    id: 'flights',
    title: {
      en: 'Flights',
      fr: 'Vols'
    },
    description: {
      en: 'Routes: Moscow – Osaka, Tokyo – Moscow',
      fr: 'Liaisons : Paris – Osaka, Tokyo – Paris'
    },
    details: {
      en: 'Premium economy flight tickets. Departures can be customized dynamically above to match your local hub.',
      fr: 'Billets d\'avion en classe économie premium. Ville de départ personnalisable ci-dessus selon vos besoins.'
    },
    icon: 'Plane'
  },
  {
    id: 'transfers',
    title: {
      en: 'Transfers',
      fr: 'Transferts'
    },
    description: {
      en: 'From the airport to the hotels',
      fr: 'Navettes gratuites aéroport - hôtels'
    },
    details: {
      en: 'Private high-end shuttle bus upon arrival, plus full-access Japan Rail Pass for high-speed Shinkansen train journeys.',
      fr: 'Navette privée haut de gamme dès votre arrivée et carte Japan Rail Pass illimitée pour tous les Shinkansen.'
    },
    icon: 'Car'
  },
  {
    id: 'hotels',
    title: {
      en: 'Hotels',
      fr: 'Hébergements'
    },
    description: {
      en: 'Comfortable accommodation, 2 people per room (breakfasts included)',
      fr: 'Hôtel chic 4★ ou Ryokan typique (2 pers / chambre, petits-déjeuners inclus)'
    },
    details: {
      en: 'Handpicked traditional Ryokans with outdoor hot spring (onsen) baths and award-winning boutique inner-city design hotels.',
      fr: 'Ryokans traditionnels avec bains de source chaude extérieurs (onsen) et hôtels-boutiques modernes de standing.'
    },
    icon: 'Hotel'
  }
];

export const DEPARTURE_CITIES = [
  { value: 'Paris', label: 'Paris (CDG)', priceOffset: 0 },
  { value: 'Moscow', label: 'Moscow (SVO)', priceOffset: -120 },
  { value: 'New York', label: 'New York (JFK)', priceOffset: 150 },
  { value: 'London', label: 'London (LHR)', priceOffset: 80 },
  { value: 'Montreal', label: 'Montreal (YUL)', priceOffset: 220 },
  { value: 'Tokyo Local', label: 'No Flights (Land package only)', priceOffset: -750 }
];

export const ACCOMMODATIONS = [
  { value: 'standard', label: { en: 'Standard Authentic (3-4★)', fr: 'Standard Authentique (3-4★)' }, multiplier: 1.0, description: { en: 'Cozy design hotels and comfortable family guesthouses.', fr: 'Hôtels design confortables et pensions de charme familiales.' } },
  { value: 'premium', label: { en: 'Premium Heritage (4-5★)', fr: 'Premium Héritage (4-4.5★)' }, multiplier: 1.35, description: { en: 'Boutique hotels & traditional Ryokans with private hot spring pools.', fr: 'Hôtels-boutiques & Ryokans avec bains thermaux privatifs.' } },
  { value: 'luxury', label: { en: 'Ultra Luxury Imperial (5★+)', fr: 'Impérial Grand Luxe (5★+)' }, multiplier: 1.9, description: { en: 'The most prestigious ryokans (Aman, Hoshinoya) and sweeping skyscraper suites.', fr: 'Ryokans ultra-prestigieux (Aman, Hoshinoya) et suites panoramiques.' } }
];

export const TRANSLATIONS = {
  fr: {
    navAbout: 'À propos',
    navIncluded: 'Ce qui est inclus',
    navContacts: 'Contacts',
    bookBtn: 'Réserver',
    heroTitle: 'JAPON',
    heroSubtitle: 'Circuit de Rêve',
    heroMainBtn: 'Explorer le Circuit',
    aboutTitle: 'À PROPOS DU CIRCUIT',
    aboutParagraph1: 'Nous avons conçu un itinéraire de 10 jours simple, fluide et parfaitement rythmé pour votre premier voyage au Japon. Vous visiterez les trois joyaux légendaires de l\'archipel :',
    aboutParagraph2: 'Osaka, Kyoto et Tokyo.',
    aboutParagraph3: 'Nul besoin de vous soucier des trajets complexes, de la barrière de la langue ou des réservations d\'hôtels : chaque détail est méticuleusement organisé pour vous. Nous vous indiquons où vous détendre, que voir et où déguster les mets locaux, afin que vous puissiez savourer pleinement votre voyage.',
    timelineTitle: 'Parcours jour par jour',
    includedHeading: 'CE QUI EST INCLUS',
    formHeading: 'Prêt à partir ? Une question ?',
    formSubtitle: 'Laissez-nous une demande d\'information',
    labelName: 'Votre nom',
    labelPhone: 'Numéro de téléphone',
    labelComment: 'Des précisions ? (Optionnel)',
    btnSend: 'Envoyer ma demande',
    customizerTitle: 'Simulateur de Voyage Personnel',
    customizerIntro: 'Configurez vos dates et options pour calculer instantanément votre budget prévisionnel de groupe.',
    departureLabel: 'Ville de départ',
    durationLabel: 'Durée du séjour',
    accommodationLabel: 'Formule d\'hébergement',
    passengersLabel: 'Nombre de participants',
    pricePerPerson: 'Prix par voyageur',
    totalPriceLabel: 'Budget total estimé',
    successTitle: 'Demande enregistrée !',
    successMsg: 'Arigatou Gozaimasu ! Un de nos guides spécialistes du Japon va vous recontacter par téléphone sous 24h pour valider votre itinéraire personnalisé.',
    viewRequests: 'Voir les demandes reçues',
    hideRequests: 'Masquer l\'administration',
    dbRequestsTitle: 'Portail des demandes reçues (Stockage Local)',
    requestsEmpty: 'Aucune demande enregistrée pour le moment. Remplissez le formulaire en bas de page !',
    searchPlaceholder: 'Filtrer par nom ou téléphone...',
    contactDetails: 'Détails des vols exclusifs & d\'hôtels inclus pré-sélectionnés.'
  },
  en: {
    navAbout: 'About',
    navIncluded: 'Included',
    navContacts: 'Contacts',
    bookBtn: 'Book',
    heroTitle: 'JAPAN',
    heroSubtitle: 'Premium Experience',
    heroMainBtn: 'Explore the Tour',
    aboutTitle: 'ABOUT THE TOUR',
    aboutParagraph1: 'We\'ve planned a simple and convenient 10-day itinerary for your trip to Japan. You\'ll visit three spectacular cities:',
    aboutParagraph2: 'Osaka, Kyoto, and Tokyo.',
    aboutParagraph3: 'No need to worry about routes, schedules, or finding places — everything is already organized. We\'ll show you where to go, what to see, and where to eat, so you can simply enjoy the journey.',
    timelineTitle: 'Day-by-Day Journey',
    includedHeading: 'WHAT\'S INCLUDED',
    formHeading: 'Want to join us, but still have questions?',
    formSubtitle: 'Leave a request',
    labelName: 'Your name',
    labelPhone: 'Phone number',
    labelComment: 'Comment',
    btnSend: 'Send request',
    customizerTitle: 'Custom Trip Planner',
    customizerIntro: 'Customize departure hubs and hotel preferences to instantly simulate a price match.',
    departureLabel: 'Departure Hub',
    durationLabel: 'Tour Duration',
    accommodationLabel: 'Accommodation Class',
    passengersLabel: 'Number of Travelers',
    pricePerPerson: 'Price per traveler',
    totalPriceLabel: 'Total Estimated Budget',
    successTitle: 'Request Sent Successfully!',
    successMsg: 'Arigatou Gozaimasu! One of our travel experts will phone you within 24 hours to customize and freeze your itinerary price.',
    viewRequests: 'View Submitted Requests',
    hideRequests: 'Hide Admin Dashboard',
    dbRequestsTitle: 'Received Client Requests Portal (Local Storage)',
    requestsEmpty: 'No booking requests have been received yet. Try filling out the booking form below!',
    searchPlaceholder: 'Search requests by name or phone...',
    contactDetails: 'Airport direct transfers and pre-screened partner hotels.'
  }
};
