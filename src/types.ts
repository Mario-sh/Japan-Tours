export type Language = 'fr' | 'en';

export interface BookingRequest {
  id: string;
  name: string;
  phone: string;
  comment: string;
  departureCity: string;
  passengers: number;
  durationDays: number;
  accommodationClass: 'standard' | 'premium' | 'luxury';
  totalPrice: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'contacted';
}

export interface ItineraryDay {
  dayRange: string;
  city: string;
  description: string;
  images: string[];
  attractions: string[];
  mustEat: string;
}

export interface HeroCard {
  id: string;
  title: string;
  image: string;
  badge: string;
  description?: string;
}

export interface IncludedItem {
  id: string;
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  details: {
    en: string;
    fr: string;
  };
  icon: string;
}
