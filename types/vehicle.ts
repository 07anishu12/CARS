// Relational Vehicle Architecture Types for KERB Platform

export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'MPV' | 'Luxury' | 'Electric' | 'Hybrid';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
export type TransmissionType = 'Manual' | 'Automatic' | 'DCT' | 'CVT' | 'AMT' | 'e-CVT';

export interface Make {
  id: string;
  name: string;
  slug: string;
  country: string;
  logoUrl: string;
  description: string;
  establishedYear: number;
}

export interface Generation {
  id: string;
  modelId: string;
  name: string;
  startYear: number;
  endYear: number | null;
  isCurrent: boolean;
}

export interface Variant {
  id: string;
  generationId: string;
  modelId: string;
  name: string;
  slug: string;
  exShowroomPrice: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  engineCc?: number;
  powerBhp: number;
  torqueNm: number;
  mileageKmpl?: number;
  rangeKm?: number;
  seating: number;
  airbags: number;
  sunroofType?: 'None' | 'Single Pane' | 'Panoramic';
  keyFeatures: string[];
  isRecommended: boolean;
  recommendationReason?: string;
  badge?: string; // e.g., 'Value For Money', 'Top Seller', 'Flagship Tech'
}

export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  tier: 1 | 2 | 3;
  rtoPercentage: number;
  defaultInsuranceEst: number;
}

export interface CityPrice {
  id: string;
  variantId: string;
  cityId: string;
  exShowroom: number;
  rtoTax: number;
  insurance: number;
  fastag: number;
  handlingCharges: number;
  onRoadPrice: number;
  effectiveFrom: string; // ISO Date string e.g. "2026-01-01"
  effectiveTo: string | null; // null indicates current
  lastVerifiedAt: string; // ISO Date e.g. "2026-03-15"
  source: string; // e.g. "Official OEM Dealer Bulletin"
  sourceUrl?: string;
  isCurrent: boolean;
}

export interface SpecificationItem {
  name: string;
  value: string;
  unit?: string;
}

export interface SpecificationCategory {
  title: string;
  items: SpecificationItem[];
}

export interface Feature {
  id: string;
  name: string;
  category: 'Safety' | 'Comfort' | 'Technology' | 'Exterior' | 'Interior';
  description?: string;
}

export interface VariantFeature {
  variantId: string;
  featureId: string;
  status: 'standard' | 'optional' | 'not_available';
}

export interface VehicleMedia {
  id: string;
  modelId: string;
  variantId?: string;
  type: 'image' | 'video' | '360';
  url: string;
  altText: string;
  width: number;
  height: number;
  isHero?: boolean;
  caption?: string;
  colorName?: string;
  colorHex?: string;
}

export interface Review {
  id: string;
  modelId: string;
  sourceName: string;
  author: string;
  rating: number; // 1 - 5
  title: string;
  body: string;
  pros: string[];
  cons: string[];
  verifiedOwner: boolean;
  date: string;
  mileageReported?: string;
}

export interface CarModel {
  id: string;
  makeId: string;
  name: string;
  slug: string;
  bodyType: BodyType;
  fuelTypes: FuelType[];
  transmissions: TransmissionType[];
  seatingCapacities: number[];
  heroImage: string;
  galleryImages: VehicleMedia[];
  priceRangeMin: number;
  priceRangeMax: number;
  pros: string[];
  cons: string[];
  kerbVerdict: string;
  safetyRating: {
    stars: number;
    agency: 'Global NCAP' | 'Bharat NCAP' | 'Euro NCAP';
    adultScore?: string;
    childScore?: string;
  };
  rating: number;
  reviewCount: number;
  isNewLaunch: boolean;
  isTrending: boolean;
  isEV: boolean;
  isHybrid: boolean;
  isLuxury: boolean;
  waitingPeriodWeeks: number;
  specifications: SpecificationCategory[];
  faqs: Array<{ question: string; answer: string }>;
  rivalSlugs: string[]; // Slugs of competing models
}

// Complete Populated Car Aggregate for Detail Pages and Showroom
export interface CarDetailAggregate {
  make: Make;
  model: CarModel;
  currentGeneration: Generation;
  variants: Variant[];
  selectedVariant: Variant;
  selectedCity: City;
  pricing: CityPrice;
  features: Array<{
    feature: Feature;
    status: 'standard' | 'optional' | 'not_available';
  }>;
  reviews: Review[];
  rivals: Array<{
    make: Make;
    model: CarModel;
    basePrice: number;
  }>;
}
