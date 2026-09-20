// Domain Types for Kerb

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  fullName: string;
  exShowroomPrice: number;
  priceRange: string;
  rating: number;
  reviewCount: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  imagePlaceholder: string;
  isNewLaunch: boolean;
  isTrending: boolean;
  seats: number;
}

export interface Article {
  title: string;
  author: string;
  category: string;
  excerpt: string;
  readingTime: string;
  slug: string;
  imagePlaceholder?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ShopNeedChip {
  id: string;
  label: string;
  slug: string;
  icon?: string;
}
