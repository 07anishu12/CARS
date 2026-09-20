# KERB Master Implementation Plan

## Executive Summary
This document establishes the implementation blueprint for the **KERB** automotive platform redesign, adhering to the master specification in `KERB_Master_Redesign_PRD_and_Codex_Prompt.md`. KERB is an intelligent, calm, trustworthy, data-driven Indian car discovery and buying-research platform designed mobile-first.

---

## 1. Existing Architecture & Baseline Assessment

### 1.1 Stack & Framework
- **Framework**: Next.js 14.2.35 (App Router)
- **Runtime & UI**: React 18.3.1, TypeScript 5.4.5, Framer Motion 12.42.2
- **Styling System**: CSS Custom Properties (`styles/globals.css`) with 3 themes (`dark` default, `light`, `luxury`), responsive typography scale (`--fs-hero`, `--fs-section-title`, `--fs-card-title`, etc.), spacing tokens (`--spacing-4` to `--spacing-96`), and radius tokens (`--radius-sm` to `--radius-full`).
- **Package Manager**: npm
- **Static Assets**: High-resolution automotive studio and exterior assets in `public/` (`creta.jpg`, `nexon.jpg`, `seltos.jpg`, `xuv700.jpg`, `vitara.jpg`, `hero-creta.jpg`, `hero-car.jpg`, `suv-electric.jpg`, `luxury-interior.jpg`).

### 1.2 Existing Routes
- `/`: Homepage (implemented with HeroSearch, AIEntry, ShopByNeed, Trending, Dashboard, GuidesRail, Testimonials, BrandsSection, PromoEV, Footer)
- `/cars/[brand]/[model]`: Wireframe placeholder ("Future Implementation")
- `/category/[slug]`: Wireframe placeholder
- `/calculators/emi`: Wireframe placeholder
- `/compare`: Compare route
- `/search`: Search route
- `/ai-advisor`: AI discovery entry
- `/guides`: Editorial guides route
- `/[...catchAll]`: Fallback route

### 1.3 Technical Debt & Deficiencies
1. **Mock Data Layer**: Flat `Car` interface with placeholder emoji images instead of real relational models and actual images in `public/`.
2. **Missing Relational Model**: Absence of `Make -> Model -> Generation -> Variant -> City -> City Price` hierarchy, missing historical price tracking (`effective_from`, `effective_to`, `source`).
3. **Detail Page Missing**: `/cars/[brand]/[model]` is an empty stub without vehicle gallery, variant breakdowns, on-road city price calculator, specs progressive disclosure, safety ratings, or reviews.
4. **Listing & Filter System Missing**: No `/cars` listing page with faceted filters (body type, price range, fuel, transmission, seating).
5. **Programmatic Category & Brand Routes**: Missing `/cars/[make]`, `/cars/suv`, `/cars/electric`, `/cars/under-10-lakh`, etc.
6. **City-Aware Pricing Route**: Missing `/cars/[make]/[model]/[city]`.
7. **EMI Calculator**: Missing full-page `/emi-calculator` with amortization schedule.
8. **AI Discovery**: Missing grounded domain service that parses queries without hallucination.
9. **SEO Infrastructure**: Missing Schema.org JSON-LD structured data (`Car`, `Product`, `FAQPage`, `BreadcrumbList`), dynamic `sitemap.ts`, `robots.ts`, image metadata.
10. **Privacy / GDPR**: Missing cookie consent banner, category controls, privacy policy, and user data rights flow.

---

## 2. Reusable Code & Existing Assets
- **`components/HeroSearch.tsx`**: Dynamic hero search with vehicle carousel, tab switching, and quick query pills.
- **`components/StickyNav.tsx`**: Mobile-responsive navigation with accessible hamburger drawer, keyboard navigation, theme switching, and wishlist counter.
- **`components/Trending.tsx` & `components/ShopByNeed.tsx`**: Card carousels and filter chips.
- **`components/Dashboard.tsx`**: Interactive multi-tab discovery vehicle grid.
- **`components/Footer.tsx`**: Comprehensive automotive footer with category links, city links, and brand navigation.
- **`lib/calculations/emi.ts`**: Accurate amortization math (`calculateEMI`, `calculateEMIDetails`).
- **`providers/ThemeProvider.tsx` & `providers/WishlistProvider.tsx`**: Context providers for themes and saved vehicles.

---

## 3. Database & Relational Data Architecture

### 3.1 Relational Schema (`lib/data/` and `types/vehicle.ts`)
The relational data layer implements:
- **Make**: `id, name, slug, country, logo_url, description`
- **Model**: `id, make_id, name, slug, body_type, fuel_types, transmissions, seating_capacities, hero_image, price_range_min, price_range_max, pros, cons, kerb_verdict, rating, review_count`
- **Generation**: `id, model_id, name, start_year, end_year, is_current`
- **Variant**: `id, generation_id, name, slug, ex_showroom_price, fuel_type, transmission, engine_cc, power_bhp, torque_nm, mileage_kmpl, range_km, seating, airbags, sunroof, key_features, is_recommended, recommendation_reason`
- **City**: `id, name, slug, state, tier, rto_percentage, default_insurance_est`
- **CityPrice**: `id, variant_id, city_id, ex_showroom, rto_tax, insurance, fastag, handling_charges, on_road_price, effective_from, effective_to, last_verified_at, source, source_url`
- **Specification**: Grouped into Engine & Performance, Dimensions, Transmission, Fuel Economy, Safety, Suspension & Brakes, Comfort, Infotainment, ADAS, Connectivity.
- **Feature & VariantFeature**: Standard, Optional, or Not Available per variant.
- **Media**: `type (image | video | 360), url, alt_text, width, height, is_hero, color_name`
- **Review**: `source_name, author, rating, title, pros, cons, verified_owner, date`
- **SeoMetadata**: `title, description, canonical, h1, schema_type`

---

## 4. Implementation Strategy by Phase

### Phase 1: Relational Data Layer & Seeding
- Implement full TypeScript interfaces (`types/vehicle.ts`).
- Create relational in-memory database service (`lib/data/cars-db.ts`) with queries:
  - `getAllModels()`, `getModelBySlug(make, model)`, `getVariantsByModel(modelId)`
  - `getCityPricing(variantId, citySlug)`, `getAllMakes()`, `getModelsByCategory(category)`
  - `getModelsByBudget(min, max)`, `searchCars(query, filters)`, `getComparison(modelSlugs)`
- Seed with realistic Indian car models:
  - Tata Nexon (Petrol, Diesel, EV)
  - Hyundai Creta (Petrol, Diesel)
  - Mahindra XUV700 (Petrol, Diesel, 5/7 Seater, ADAS)
  - Kia Seltos
  - Maruti Suzuki Grand Vitara (Hybrid)
  - MG Windsor EV
  - Mahindra Thar Roxx
  - BMW 3 Series Gran Limousine (Luxury)
- Include accurate variant pricing, city-specific RTO/on-road formulas for Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune.

### Phase 2: Homepage (`/`) Refactor & Polish
- Connect homepage components to the relational database service.
- Ensure all images use real photography from `public/` with descriptive alt tags and responsive sizes.
- Ensure sticky mobile navigation, accessible drawer, and bottom navigation where beneficial.
- Connect search and AI discovery directly to working routes.

### Phase 3: Product Detail Page (`/cars/[make]/[model]`)
- Digital Showroom architecture with progressive disclosure:
  1. **Breadcrumbs & Header**: Make > Model, Badge tags (Trending, EV, etc.)
  2. **Vehicle Gallery**: 3/4 Studio Hero, Exterior, Interior, Color switcher, Video embed preview.
  3. **Price Hero & City Switcher**: Live on-road breakdown (Ex-showroom + RTO + Insurance + Other), price update timestamp and verified source badge.
  4. **Variant Matrix & "Which Variant?" Decision Engine**: Recommended variant badges with explicit justification (e.g. "Value for Money", "Feature Packed").
  5. **Quick Specs Strip**: Engine, Transmission, Mileage/Range, Seating, Safety NCAP.
  6. **Deep Specifications Accordion**: Engine, Dimensions, Suspension, ADAS, Safety, Infotainment.
  7. **Key Features & Variant Comparison**: Matrix of standard vs missing features.
  8. **KERB Take & Verified Reviews**: Pros, Cons, Owner sentiment, Editorial rating.
  9. **Alternative Rivals Carousel**: Direct specs & price comparisons.
  10. **Interactive EMI Calculator Block**: Pre-populated with car price.
  11. **Frequently Asked Questions (FAQ)**: Automotive FAQ with Schema.org markup.
  12. **Sticky Mobile Action Bar**: Price display + "Compare" + "Check On-Road Price".

### Phase 4: Listing & Faceted Search (`/cars`)
- Full vehicle catalogue with multi-filter drawer on mobile, sticky sidebar on desktop:
  - Budget slider & presets (Under 10L, 10-15L, 15-20L, Above 20L)
  - Brands checkbox selector
  - Body Type pills (SUV, Sedan, Hatchback, MPV, EV)
  - Fuel Type (Petrol, Diesel, Electric, Hybrid, CNG)
  - Transmission (Manual, Automatic)
  - Seating (5 Seater, 7 Seater)
- Sorting: Price (Low to High / High to Low), Rating, Popularity.
- Car card with real image, price range, key specs, EMI preview, and "Compare" toggle.

### Phase 5: Category & Budget Landing Pages
- Clean App Router routing supporting:
  - Body Types: `/cars/suv`, `/cars/sedan`, `/cars/hatchback`, `/cars/electric`, `/cars/hybrid`, `/cars/automatic`, `/cars/7-seater`, `/cars/luxury`, `/cars/performance`
  - Budgets: `/cars/under-5-lakh`, `/cars/under-10-lakh`, `/cars/under-15-lakh`, `/cars/under-20-lakh`
- Curated editorial guidance explaining segment pros/cons, buying criteria, and filtered car lists.

### Phase 6: Brand & City-Aware Pricing Pages
- `/cars/[make]`: Brand overview, brand history, current line-up, price list.
- `/cars/[make]/[model]/[city]`: Dedicated city landing page with localized on-road breakdown, local RTO tax rate, waiting periods, and city dealer insights.

### Phase 7: EMI Calculator (`/emi-calculator`)
- Full-page interactive loan planner:
  - Inputs: Vehicle Price, Down Payment (₹ and %), Interest Rate (%), Loan Tenure (Months / Years).
  - Outputs: Monthly EMI, Total Interest, Total Amount Payable, Loan-to-Value Ratio.
  - Interactive Amortization Table: Month-by-month / Year-by-year principal vs interest breakdown.
  - Quick car selector to prefill price from database.

### Phase 8: AI Discovery Advisor (`/ai-advisor`)
- Grounded automotive decision assistant:
  - Natural language query parser (understands budgets, body styles, fuel preferences, use cases e.g. "safe 7 seater under 15 lakh", "best automatic car for city driving").
  - Deterministic DB matching filter — zero fabricated specs or prices.
  - Generates structured recommendations with rationale and direct links to model and variant pages.

### Phase 9: Compare Engine (`/compare`)
- Side-by-side vehicle comparison:
  - Multi-car selector (up to 3 cars).
  - Highlights differences across Price, Engine, Power, Mileage, Dimensions, Safety, and Features.

### Phase 10: SEO, Image Optimization & Structured Data
- Schema.org JSON-LD:
  - `Product` / `Car` with `offers` (price, currency, availability).
  - `BreadcrumbList` for navigation hierarchy.
  - `FAQPage` on model and guide pages.
  - `ImageObject` with semantic captions and dimensions.
- `app/sitemap.ts`: Dynamic sitemap covering all models, makes, categories, budgets, and cities.
- `app/robots.ts`: Crawl instructions and sitemap link.
- Open Graph and Twitter Card metadata on all dynamic routes.

### Phase 11: Accessibility (WCAG 2.2 AA)
- Skip-to-content anchor.
- Semantic HTML tags (`<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`, `<header>`).
- Keyboard navigation: Full focus rings, Escape key to dismiss modals/drawers, Tab focus trapping in menus.
- Contrast verification (> 4.5:1 for body, > 3:1 for large text).
- Screen-reader labels (`aria-label`, `aria-expanded`, `aria-controls`).
- `prefers-reduced-motion` compliance across all Framer Motion animations.

### Phase 12: GDPR & Privacy Management
- Consent banner with granular categories: Essential (always on), Analytics, Marketing.
- Privacy preferences modal (`components/privacy/CookieConsent.tsx`).
- `/privacy`: Comprehensive privacy policy.
- `/privacy/data-request`: Self-serve data export and deletion request interface.

### Phase 13: Testing & Verification
- `npm run build` production verification.
- `tsc --noEmit` TypeScript type check.
- Mobile responsiveness verification (320px, 375px, 414px, 768px, 1280px).
- Route integrity and empty/loading state testing.
