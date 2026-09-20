# KERB Automotive Platform — Master Architectural Audit, Issues Log & AI Execution Roadmap

> **Document Version:** 2.0.0  
> **Target Framework:** Next.js 14 (App Router) &bull; TypeScript &bull; React 18 &bull; CSS Modules / Styled-JSX &bull; Framer Motion  
> **Project Root:** `/Users/anny/Desktop/cars/apps/web`  
> **Date:** September 20, 2026  
> **Objective:** Comprehensive technical audit of existing platform pages, components, layout bugs (including resolved and preventative header overlap rules), missing pages, and an actionable programmatic SEO blueprint for vehicle sub-routes (`specs`, `images`, `reviews`, `price`, `variants`, `mileage`, `safety`) to dominate Google search queries.

---

## Table of Contents
1. [Executive Summary & Current State of the Platform](#1-executive-summary--current-state-of-the-platform)
2. [Complete Inventory of Existing Pages & Components](#2-complete-inventory-of-existing-pages--components)
3. [Deep-Dive Problem & Gap Analysis](#3-deep-dive-problem--gap-analysis)
   - [3.1 Header Overlapping & Z-Index Collision (Root Cause & Permanent Fix)](#31-header-overlapping--z-index-collision-root-cause--permanent-fix)
   - [3.2 The Product Page Navigation & Sub-Page Fragmentation Gap](#32-the-product-page-navigation--sub-page-fragmentation-gap)
   - [3.3 Image Section & Interactive Visualizer Gaps](#33-image-section--interactive-visualizer-gaps)
   - [3.4 Missing Core Pages in Navigation Architecture](#34-missing-core-pages-in-navigation-architecture)
   - [3.5 Vehicle Relational Data Depth & Expansion Needs](#35-vehicle-relational-data-depth--expansion-needs)
4. [Google SEO Programmatic Architecture & Sub-Route Blueprint](#4-google-seo-programmatic-architecture--sub-route-blueprint)
   - [4.1 Sub-Route URL Scheme & Target Search Queries](#41-sub-route-url-scheme--target-search-queries)
   - [4.2 ModelSubNav: Persistent Sub-Navigation Specification](#42-modelsubnav-persistent-sub-navigation-specification)
   - [4.3 Schema.org Structured Data Specifications](#43-schemaorg-structured-data-specifications)
5. [Missing Pages Specification & Requirements](#5-missing-pages-specification--requirements)
6. [Step-by-Step AI Execution Prompt & Implementation Guide](#6-step-by-step-ai-execution-prompt--implementation-guide)

---

## 1. Executive Summary & Current State of the Platform

KERB is an automotive research, comparison, and price discovery platform engineered from first principles for Indian automotive consumers. The platform replaces cluttered, ad-heavy legacy portals (e.g., CarWale, CarDekho) with clean typography, calm dark aesthetics, grounded RTO-verified pricing, and deep technical transparency.

### Core Stack
- **Framework:** Next.js 14.2.35 (App Router with SSR and Static Generation).
- **Language:** TypeScript 5.4.5 with strict type checking.
- **Styling:** CSS variables, responsive fluid typography, `styled-jsx` for scoped component styles, Framer Motion 12 for micro-animations.
- **Data Engine:** Relational domain schema ([`types/vehicle.ts`](types/vehicle.ts)) featuring `Make -> Model -> Generation -> Variant -> City -> CityPrice`.
- **Calculations:** Deterministic financial formulas in [`lib/calculations/emi.ts`](lib/calculations/emi.ts) for reducing-balance amortized EMIs and city RTO tax calculations.

---

## 2. Complete Inventory of Existing Pages & Components

Below is the complete inventory of all routes currently active in the codebase, detailing the components rendered on each page, their current feature sets, state management, and user-facing capabilities:

| Route | Page File | Primary Components | Implemented Features & Content |
| :--- | :--- | :--- | :--- |
| `/` | [`app/page.tsx`](app/page.tsx) | `StickyNav`, `HeroSearch`, `AIEntry`, `ShopByNeed`, `Trending`, `Dashboard`, `GuidesRail`, `BrandsSection`, `PromoEV`, `Testimonials`, `FAQBlock`, `Footer`, `MobileBottomNav`, `CookieConsent` | Interactive vehicle search banner with budget & body selectors; quick AI query prompt; category tiles with responsive circle icons; trending cars carousel; live interactive comparison & SVG EMI visualizer; editorial guides; brand logos; EV spotlight; verified owner testimonials; accordion FAQs; sticky mobile navigation. |
| `/cars` | [`app/cars/page.tsx`](app/cars/page.tsx) | `StickyNav`, `CarListingView`, `Footer`, `MobileBottomNav` | Multi-faceted sidebar filter (Body Style, Budget, Fuel, Transmission, Seating, Brand multiselect); 4-way sorting (popularity, price low/high, rating); model cards with pricing, key pros, and direct CTAs; mobile slide-out filter drawer; popular head-to-head comparison cards; 2026 powertrain buying guide; car buyer FAQs. |
| `/new-cars` | [`app/new-cars/page.tsx`](app/new-cars/page.tsx) | `StickyNav`, `NewCarsView`, `Footer`, `MobileBottomNav` | 2026 New Launches showcase; 1-click filter pills by body style and budget; Upcoming 2026 Cars Radar (Curvv EV, BE.05, eVX, Creta EV) with "Notify Me" interactive alerts; Real-time Metro Delivery Waiting Period Tracker with city selector; Manufacturer discounts & benefits radar; Quick loan EMI estimator widget; 2026 buyer FAQs with Schema.org JSON-LD. |
| `/new-car` | [`app/new-car/page.tsx`](app/new-car/page.tsx) | Redirect handler | Automatically redirects to `/new-cars` to catch singular keyword typos. |
| `/explore` | [`app/explore/page.tsx`](app/explore/page.tsx) | Redirect handler | Automatically redirects legacy links to `/cars`. |
| `/used-cars` | [`app/used-cars/page.tsx`](app/used-cars/page.tsx) | Redirect handler | Automatically redirects to `/cars?condition=used`. |
| `/cars/[brand]` | [`app/cars/[brand]/page.tsx`](app/cars/[brand]/page.tsx) | `StickyNav`, `CategoryPageView` / Brand Dispatcher, `Footer` | Dynamic dispatcher: If slug matches a category (`suv`, `electric`, `hybrid`, `under-10-lakh`, etc.), renders editorial category hub with buying tips and pros/cons. If slug matches a make (`tata`, `hyundai`, `mahindra`), renders brand header, country/est year badges, brand description, and complete brand model lineup grid. |
| `/cars/[brand]/[model]` | [`app/cars/[brand]/[model]/page.tsx`](app/cars/[brand]/[model]/page.tsx) | `StickyNav`, `CarShowroom`, `Footer`, `MobileBottomNav` | **Exhaustive Digital Showroom:**<br>&bull; Breadcrumbs & Hero Title with NCAP safety pills & waiting period badges<br>&bull; **Sticky In-Page Jump Nav** (Overview, Colors, Highlights, Match, Variants, Specs, Safety, TCO, Real Mileage, EMI, Rivals, Verdict, Reviews, FAQs)<br>&bull; **Interactive Exterior Color Swatch Visualizer** with 7 paint swatches and 5 view angle chips<br>&bull; **Live On-Road Price Calculator** with city dropdown (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Pune), itemized tax breakdown (Ex-showroom, RTO, Insurance, FASTag), and 4 optional protection package toggles<br>&bull; **8-Point Key Performance & Space Scorecard** (0-100 km/h, Bharat NCAP Stars, Real Mileage vs ARAI, 208mm Ground Clearance, 382L Boot Space, 5 Seater Lounge, 3-Yr Warranty, Tank/Battery Capacity)<br>&bull; **Buyer Suitability Match Matrix** with progress bars for City, Highway, Family, and Bad Roads + Buy/Avoid takeaways<br>&bull; **Which Variant Should You Buy? Decision Engine** with trim cards and "KERB Recommended" badge<br>&bull; **Full Unrolled Technical Specifications** across Engine & Performance, Dimensions & Weight, Fuel Economy, and Safety & Security<br>&bull; **Bharat NCAP Safety & ADAS Level 2 Deep-Dive**<br>&bull; **5-Year Total Cost of Ownership (TCO) Projection** covering services at 10k-50k km, fuel bills, insurance renewals, and resale value depreciation forecast<br>&bull; **Real-World Commute & Fuel Calculator** with daily km slider<br>&bull; **Interactive Financing & Loan EMI Customizer** with down payment/tenure/interest sliders and yearly amortization schedule table<br>&bull; **Head-to-Head Segment Rival Comparison Table**<br>&bull; **The KERB Expert Verdict & Road Test Notes**<br>&bull; **Verified Owner Long-Term Reports**<br>&bull; **Frequently Asked Questions Accordion**<br>&bull; **Sticky Mobile Action Bar** with live city price and quick CTAs. |
| `/cars/[brand]/[model]/[city]` | [`app/cars/[brand]/[model]/[city]/page.tsx`](app/cars/[brand]/[model]/[city]/page.tsx) | `StickyNav`, `CarShowroom`, `Footer`, `MobileBottomNav` | City-specific digital showroom pre-selecting verified on-road pricing and local RTO registration rates for the requested city. |
| `/compare` | [`app/compare/page.tsx`](app/compare/page.tsx) | `StickyNav`, `VehicleCompareView`, `Footer`, `MobileBottomNav` | Side-by-side vehicle comparison tool with dual dropdown selectors; comparison matrix comparing prices, engine displacement, horsepower, torque, transmission, mileage, safety stars, boot space, ground clearance, and warranty. |
| `/emi-calculator` | [`app/emi-calculator/page.tsx`](app/emi-calculator/page.tsx) | `StickyNav`, `StandaloneEMICalculator`, `Footer`, `MobileBottomNav` | Full standalone car loan calculator with sliders for vehicle price, down payment, loan tenure (1-7 years), and interest rate; visual principal vs interest breakdown; full yearly amortization schedule table. |
| `/calculators/emi` | [`app/calculators/emi/page.tsx`](app/calculators/emi/page.tsx) | Redirect handler | Redirects to `/emi-calculator`. |
| `/ai-advisor` | [`app/ai-advisor/page.tsx`](app/ai-advisor/page.tsx) | `StickyNav`, `AIAdvisorInterface`, `Footer`, `MobileBottomNav` | Natural language conversational car recommender powered by deterministic keyword & intent parser; quick suggestion chips; vehicle recommendation cards with pricing and match reasons. |
| `/guides` | [`app/guides/page.tsx`](app/guides/page.tsx) | `StickyNav`, Editorial Hub, `Footer`, `MobileBottomNav` | Car buying guides, powertrain explainers, maintenance tips, and automotive industry news articles. |
| `/privacy` | [`app/privacy/page.tsx`](app/privacy/page.tsx) | `StickyNav`, Policy Content, `Footer`, `MobileBottomNav` | Plain-language privacy policy compliant with Indian Digital Personal Data Protection (DPDP) Act 2023 and GDPR; explains data collection, zero-telemarketing pledge, and cookie categories. |
| `/privacy/data-request` | [`app/privacy/data-request/page.tsx`](app/privacy/data-request/page.tsx) | `StickyNav`, Interactive Form, `Footer`, `MobileBottomNav` | Self-serve data subject request portal allowing users to request personal data export or immediate account and cookie deletion. |
| `/sitemap.xml` | [`app/sitemap.ts`](app/sitemap.ts) | Dynamic XML generator | Generates dynamic sitemap for search engine crawlers with priority rankings and update frequencies. |
| `/robots.txt` | [`app/robots.ts`](app/robots.ts) | Dynamic Robots handler | Defines crawler rules, Disallow paths, and sitemap URI for Googlebot. |

---

## 3. Deep-Dive Problem & Gap Analysis

### 3.1 Header Overlapping & Z-Index Collision (Root Cause & Permanent Fix)

#### The Problem
In earlier iterations, users experienced text overlapping on almost every page. Breadcrumbs, H1 headings, and top filters appeared directly underneath the navbar. 

#### Root Cause Analysis
1. In `components/StickyNav.tsx`, the `<motion.header>` element was styled with:
   ```tsx
   style={{ position: isScrolled ? 'fixed' : 'absolute', top: 0, left: 0, right: 0 }}
   ```
2. When an element has `position: absolute` or `position: fixed`, it is **completely removed from the normal document flow**. The browser renders the subsequent `<main>` container at viewport coordinate `y = 0`.
3. Because the header height (Trust Strip 32px + Navbar 68px = 100px) had no corresponding placeholder space, subpages (`/cars`, `/cars/[brand]`, `/cars/[brand]/[model]`, `/compare`, `/emi-calculator`) placed their H1 titles and breadcrumbs at `y = 0`, directly under the transparent navbar.
4. When scrolling began, `isScrolled` flipped the position to `fixed` with a dark background, creating an abrupt layout jump and covering text.

#### The Implemented Solution
1. Changed `StickyNav` to standard CSS sticky positioning:
   ```tsx
   style={{
     position: 'sticky',
     top: 0,
     left: 0,
     right: 0,
     zIndex: 990,
     backgroundColor: 'rgba(11, 15, 18, 0.98)',
     backdropFilter: 'blur(16px)',
     WebkitBackdropFilter: 'blur(16px)',
     borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
   }}
   ```
2. In normal document flow, `position: sticky` occupies its natural height (~96px) before scrolling. The subsequent page container begins naturally below it without overlapping.
3. Changed `HeroSearch.tsx` top padding from an artificial `148px` to `32px`, giving consistent clearance on the homepage as well.

#### Mandatory Rules for Future Page Development
- **NEVER** set `position: absolute` on global navigation headers.
- **NEVER** apply negative top margins (`margin-top: -XXpx`) on page root containers to pull content up behind headers.
- Maintain `z-index: 990` for `StickyNav`, `z-index: 900` for in-page secondary sticky sub-navbars, and `z-index: 998` for mobile bottom bars.

---

### 3.2 The Product Page Navigation & Sub-Page Fragmentation Gap

#### The Problem
Currently, the product showroom page ([`components/showroom/CarShowroom.tsx`](components/showroom/CarShowroom.tsx)) renders all vehicle information on a single URL (`/cars/[brand]/[model]`). While this provides a long-scrolling experience, it creates major usability and search ranking deficiencies:
1. **No Dedicated Google Indexing for High-Intent Queries:**
   - When users search for **"Tata Nexon specification"**, Google prefers a page dedicated entirely to specifications rather than a generic overview page.
   - When users search for **"Tata Nexon images"** or **"Tata Nexon interior photos"**, Google Image Search and web search rank dedicated photo gallery pages with `ImageGallery` schema.
   - When users search for **"Tata Nexon review"** or **"Tata Nexon user ratings"**, Google ranks dedicated review hubs featuring `Review` and `CriticReview` schema.
   - When users search for **"Tata Nexon price in Delhi"**, Google expects a localized price breakdown.
2. **Lack of a Dedicated Persistent Model Navigation Bar:**
   - There is no persistent Model Sub-Navbar (e.g., `Overview | Variants | Specs | Price | Images | Reviews | Mileage | Safety | Compare`) that allows a buyer to jump directly to dedicated pages.
   - While in-page anchor links (`#specs`, `#emi`, `#reviews`) exist, they do not provide distinct URLs that can be bookmarked, shared, or indexed independently by search crawlers.

#### The Architectural Solution Required
Transform each vehicle into a **Programmatic Multi-Route Silo**:
```
/cars/[brand]/[model]           -> Digital Showroom Overview
/cars/[brand]/[model]/specs     -> Dedicated Full Specifications Sheet
/cars/[brand]/[model]/images    -> Dedicated High-Resolution Gallery & 360 Spin
/cars/[brand]/[model]/price     -> Dedicated On-Road Price & Tax Breakdown (by City)
/cars/[brand]/[model]/reviews   -> Dedicated Expert Road Test & Owner Reviews Hub
/cars/[brand]/[model]/variants  -> Dedicated Trim Comparison & Variant Breakdown
/cars/[brand]/[model]/mileage   -> Dedicated Real-World Fuel Economy & Range Test
/cars/[brand]/[model]/safety    -> Dedicated Bharat NCAP Crash Test & ADAS Report
```

---

### 3.3 Image Section & Interactive Visualizer Gaps

#### Current Implementation
The current showroom page includes a single primary image frame with a row of 3 thumbnails and a color swatch selector.

#### What is Missing for Perfection
1. **Full-Bleed Media Gallery:**
   - Dedicated gallery tabs: *Exterior (12+ angles), Interior & Cockpit (8+ angles), Color Palette Visualizer (all paint codes with real studio photos), Boot & Practicality, and Night Lighting*.
2. **Interactive 360-Degree Vehicle Exterior Spin:**
   - Seamless dragging/swiping to rotate the car 360 degrees through 24 or 36 sequenced frames.
3. **Interior 360 Panorama / Hotspot Tour:**
   - Clickable interactive hotspots (e.g., "10.25-inch Touchscreen", "Ventilated Seats", "Wireless Charging Pad", "Sunroof Control") that open detailed inspection cards.
4. **Full-Screen Lightbox Mode:**
   - High-resolution zoomable gallery with keyboard arrow navigation and pinch-to-zoom on mobile.

---

### 3.4 Missing Core Pages in Navigation Architecture

The following pages are referenced or expected by automotive buyers but do not yet exist as dedicated routes in the project:

| Missing Route | Target Purpose & Required Content |
| :--- | :--- |
| `/brands` | Brand Directory: Alphabetical list of all 30+ manufacturers in India (Tata, Hyundai, Maruti Suzuki, Mahindra, Kia, Toyota, Honda, MG, Volkswagen, Skoda, BMW, Mercedes-Benz, Audi, etc.) with logo, market share, country of origin, and link to brand lineup. |
| `/used-cars` | Pre-Owned Marketplace: Dedicated used car search with filters for certification (KERB Assured), year of registration (2018–2025), ownership history (1st/2nd owner), mileage driven (<30k, <60k km), and city. |
| `/calculators/rto` | State-Wise RTO Road Tax Calculator: Interactive tool allowing users to calculate exact road tax across all 28 states and 8 union territories based on fuel type (EV vs Hybrid vs ICE), engine capacity (<1200cc, <1500cc, >1500cc), and vehicle cost. |
| `/calculators/scrappage` | Scrappage Policy Benefit Estimator: Computes state motor vehicle tax concessions (up to 25%), manufacturer discount vouchers (up to 5%), and scrap value for vehicles older than 15 years. |
| `/dealers` | Authorized Dealer & Service Center Locator: Filter by brand and city/pincode to find verified dealerships with phone numbers, Google Maps directions, and customer satisfaction ratings. |
| `/wishlist` | Saved Vehicles Hub: Interactive dashboard showing vehicles saved by the user with one-click side-by-side comparison. |
| `/account` / `/login` | User Authentication: OTP-based seamless phone login for saving vehicle configurations, price alerts, and pre-approved loan calculations without marketing spam. |

---

### 3.5 Vehicle Relational Data Depth & Expansion Needs

#### Current Database Status
[`lib/data/cars-db.ts`](lib/data/cars-db.ts) currently models 6 detailed flagship vehicles:
1. **Tata Nexon** (Subcompact SUV &bull; Petrol / Diesel / EV)
2. **Hyundai Creta** (Mid-Size SUV &bull; Petrol / Diesel)
3. **Mahindra XUV700** (Premium 7-Seater SUV &bull; Petrol / Diesel)
4. **Kia Seltos** (Mid-Size SUV &bull; Turbo Petrol / Diesel)
5. **Maruti Suzuki Grand Vitara** (Strong Hybrid / Petrol SUV)
6. **MG Windsor EV** (Electric Crossover / Lounge MPV)

#### Data Expansion Required
To compete directly with top automotive portals, the relational database must be expanded to include the top 25 selling cars in India:
- **Maruti Suzuki:** Swift, Baleno, Brezza, Fronx, Dzire, Ertiga.
- **Tata Motors:** Punch, Tiago, Altroz, Harrier, Safari, Curvv.
- **Hyundai:** Venue, Exter, Verna, Tucson.
- **Mahindra:** Thar (3-Door & Roxx), Scorpio-N, Scorpio Classic, Bolero.
- **Toyota:** Innova Crysta, Innova Hycross, Urban Cruiser Hyryder, Fortuner.
- **Honda:** Elevate, City, Amaze.
- **Volkswagen & Skoda:** Taigun, Virtus, Kushaq, Slavia.

---

## 4. Google SEO Programmatic Architecture & Sub-Route Blueprint

### 4.1 Sub-Route URL Scheme & Target Search Queries

To achieve page-one Google rankings for high-intent automotive queries, the platform must implement the following directory hierarchy under `app/cars/[brand]/[model]/`:

```
app/cars/[brand]/[model]/
├── page.tsx                    -> [Brand] [Model] Price, Specs, Reviews (Main Showroom)
├── layout.tsx                  -> Shared layout rendering <ModelSubNav />
├── specs/
│   └── page.tsx                -> Target: "[Brand] [Model] Specifications / Dimensions / Engine"
├── images/
│   └── page.tsx                -> Target: "[Brand] [Model] Images / Photos / Colors / Interior"
├── price/
│   └── page.tsx                -> Target: "[Brand] [Model] On Road Price / Price in [City]"
├── reviews/
│   └── page.tsx                -> Target: "[Brand] [Model] Review / Road Test / Owner Rating"
├── variants/
│   └── page.tsx                -> Target: "[Brand] [Model] Variants / Base vs Top Model"
├── mileage/
│   └── page.tsx                -> Target: "[Brand] [Model] Mileage / Real World Fuel Economy"
├── safety/
│   └── page.tsx                -> Target: "[Brand] [Model] Safety Rating / Bharat NCAP Stars"
└── [city]/
    └── page.tsx                -> Target: "[Brand] [Model] On Road Price in [City]"
```

#### Detailed Sub-Route Metadata Matrix

| Route | Canonical Pattern | Primary Target Keyword | Meta Title Template | Meta Description Template |
| :--- | :--- | :--- | :--- | :--- |
| `.../[model]` | `https://kerb.com/cars/[brand]/[model]` | `[Make] [Model]` | `[Make] [Model] Price 2026, Specs, Mileage, Images & Reviews \| KERB` | `Explore the 2026 [Make] [Model]. Check ex-showroom and on-road prices, Bharat NCAP safety rating, real mileage, specs, and expert review.` |
| `.../[model]/specs` | `https://kerb.com/cars/[brand]/[model]/specs` | `[Make] [Model] specifications` | `[Make] [Model] Specifications, Engine, Dimensions & Features (2026) \| KERB` | `Full technical specifications for [Make] [Model]: Engine displacement, horsepower, torque, dimensions, ground clearance, tyre size, boot space, and suspension.` |
| `.../[model]/images` | `https://kerb.com/cars/[brand]/[model]/images` | `[Make] [Model] images` | `[Make] [Model] Images, Exterior Photos, Interior & Colors (2026) \| KERB` | `View high-resolution [Make] [Model] exterior and interior photos. Explore all official color options, 360-degree view, dashboard, and seating gallery.` |
| `.../[model]/price` | `https://kerb.com/cars/[brand]/[model]/price` | `[Make] [Model] on road price` | `[Make] [Model] On-Road Price List 2026 (All Variants & Cities) \| KERB` | `Check 2026 [Make] [Model] on-road price across Delhi, Mumbai, Bangalore, and top cities. Variant-wise ex-showroom, RTO road tax, and insurance breakdown.` |
| `.../[model]/reviews` | `https://kerb.com/cars/[brand]/[model]/reviews` | `[Make] [Model] review` | `[Make] [Model] Expert Road Test Review & Verified Owner Ratings \| KERB` | `In-depth KERB expert road test of the [Make] [Model]. Pros and cons, highway ride quality, real-world fuel efficiency, cabin space, and owner ratings.` |
| `.../[model]/variants` | `https://kerb.com/cars/[brand]/[model]/variants` | `[Make] [Model] variants` | `[Make] [Model] Variants Explained: Which Trim Should You Buy? \| KERB` | `Compare all [Make] [Model] variants side-by-side. Feature additions by trim, price delta, and KERB's recommended value-for-money variant.` |
| `.../[model]/mileage` | `https://kerb.com/cars/[brand]/[model]/mileage` | `[Make] [Model] mileage` | `[Make] [Model] Real-World Mileage & Tank Range Tested (2026) \| KERB` | `Real-world city and highway fuel economy test for [Make] [Model]. ARAI claimed vs actual owner mileage, full tank driving range, and monthly fuel cost.` |
| `.../[model]/safety` | `https://kerb.com/cars/[brand]/[model]/safety` | `[Make] [Model] safety rating` | `[Make] [Model] Bharat NCAP Safety Rating & ADAS Equipment (2026) \| KERB` | `Discover [Make] [Model] crash test safety rating: Bharat NCAP adult and child protection scores, standard 6 airbags, ESP, and Level 2 ADAS features.` |

---

### 4.2 ModelSubNav: Persistent Sub-Navigation Specification

To link all sub-routes seamlessly for users and search engine bots, create a shared component [`components/showroom/ModelSubNav.tsx`](components/showroom/ModelSubNav.tsx) rendered in `app/cars/[brand]/[model]/layout.tsx`:

```tsx
// Desired Visual Specification:
// Pinned immediately beneath StickyNav (top: 88px)
// Horizontal scrolling pill links with active border-bottom indicator
[Overview] [Variants] [Specifications] [On-Road Price] [Images & 360] [Reviews] [Real Mileage] [Safety & NCAP]
```

#### Behavioral Requirements
1. **Server-Side Rendered:** Rendered as clean HTML `<nav aria-label="Model Sub Navigation">` with standard `<Link href="...">` tags so search engine crawlers can traverse the full cluster.
2. **Active State Highlight:** Matches `usePathname()` to apply an active green pill style (`#22C55E`) to the currently viewed sub-page.
3. **Mobile Smooth Scrolling:** Container has `overflow-x: auto; scrollbar-width: none;` allowing easy swiping on phones.
4. **No Content Overlap:** Uses `position: sticky; top: 88px; z-index: 900; background: rgba(11, 15, 18, 0.98); backdrop-filter: blur(16px);`.

---

### 4.3 Schema.org Structured Data Specifications

Each dedicated sub-page must output tailored JSON-LD schema via Next.js metadata or `<script type="application/ld+json">`:

1. **Overview Page (`/cars/[brand]/[model]`):**
   - `@type: "Car"`
   - `name`, `brand`, `model`, `bodyType`, `image`
   - `offers`: `@type: "Offer"`, `priceCurrency: "INR"`, `price`, `availability`
   - `aggregateRating`: `@type: "AggregateRating"`, `ratingValue`, `reviewCount`
   - `breadcrumb`: `@type: "BreadcrumbList"`
2. **Specs Page (`.../specs`):**
   - `@type: "Car"`
   - `vehicleEngine`: `@type: "EngineSpecification"`, `engineDisplacement`, `enginePower`
   - `fuelEfficiency`: `@type: "QuantitativeValue"`, `value`, `unitText: "km/l"`
   - `seatingCapacity`: `5`
3. **Images Page (`.../images`):**
   - `@type: "ImageGallery"`
   - `associatedMedia`: Array of `@type: "ImageObject"`, `contentUrl`, `caption`, `creditText`
4. **Reviews Page (`.../reviews`):**
   - `@type: "Review"`
   - `reviewBody`, `reviewRating`, `author`, `publisher: "KERB Automotive"`
   - `itemReviewed`: `@type: "Car"`
5. **Safety Page (`.../safety`):**
   - `@type: "Car"`
   - `award`: `"5-Star Bharat NCAP Safety Rating"`

---

## 5. Missing Pages Specification & Requirements

### 5.1 Car Brand Directory (`/brands`)
- **Route:** `app/brands/page.tsx`
- **Header:** "All Car Brands in India (2026 Price List & Models)"
- **Filters:** Alphabetical jump bar (A to Z) &bull; Origin filter (Indian, Japanese, Korean, European, American) &bull; Price segment (Budget, Mass Market, Luxury).
- **Cards:** Brand logo, country flag, established year, starting price, active model count, and link to `/cars/[brand]`.

### 5.2 Pre-Owned / Used Cars Marketplace (`/used-cars`)
- **Route:** `app/used-cars/page.tsx`
- **Header:** "Verified Pre-Owned & Used Cars in India"
- **Filters:** City (Delhi NCR, Mumbai, Bengaluru, etc.) &bull; Budget &bull; Body Style &bull; Registration Year (2018–2025) &bull; Kilometers Driven &bull; Certification (KERB Assured 180-Point Check).
- **Cards:** Actual car photo, odometer reading, fuel type, ownership count, verified inspection badge, estimated EMI, and test-drive booking CTA.

### 5.3 State-by-State RTO Road Tax Calculator (`/calculators/rto`)
- **Route:** `app/calculators/rto/page.tsx`
- **Header:** "India RTO Vehicle Road Tax & Registration Calculator 2026"
- **Inputs:** State/UT selector &bull; Vehicle Cost &bull; Fuel Type (Petrol, Diesel, Strong Hybrid, EV) &bull; Seating Capacity &bull; Registration Type (Individual vs Corporate).
- **Outputs:** Exact RTO Tax Amount &bull; Green Cess / Environmental Cess &bull; MCD Parking Fees &bull; Road Safety Cess &bull; State Subsidy / EV Exemption breakdown.

### 5.4 Vehicle Scrappage Policy Discount Calculator (`/calculators/scrappage`)
- **Route:** `app/calculators/scrappage/page.tsx`
- **Header:** "Vehicle Scrappage Policy Discount & Savings Estimator"
- **Inputs:** Age of old vehicle (>15 years) &bull; State &bull; Target new car price.
- **Outputs:** Estimated scrap value payout (4–6% of new car ex-showroom) &bull; OEM manufacturer discount voucher (up to 5%) &bull; State motor vehicle road tax concession (up to 25%) &bull; Waiver of new registration certificate fee.

### 5.5 Dealer Network Locator (`/dealers`)
- **Route:** `app/dealers/page.tsx`
- **Header:** "Authorized Car Dealerships & Showrooms Near You"
- **Inputs:** Brand selector &bull; City / Pincode search.
- **Results:** Dealer showroom name, full street address, verified phone number, operating hours, active discounts, and "Request Callback" CTA.

### 5.6 User Wishlist & Saved Cars Hub (`/wishlist`)
- **Route:** `app/wishlist/page.tsx`
- **Header:** "My Saved Cars & Shortlist"
- **Content:** Grid of saved cars stored in `localStorage` via [`providers/WishlistProvider.tsx`](providers/WishlistProvider.tsx); side-by-side comparison shortcut; price drop alerts.

---

## 6. Step-by-Step AI Execution Prompt & Implementation Guide

When providing this document to an AI coding agent or engineer, use the following structured prompt:

```text
You are an expert full-stack engineer and SEO architect tasked with enhancing the KERB automotive platform in `/Users/anny/Desktop/cars/apps/web`.

Review the master audit in `issues.md`. Your mission is to implement the Programmatic Vehicle Sub-Route Architecture and Missing Navigation Features:

PHASE 1: PERSISTENT MODEL SUB-NAVBAR
1. Create `components/showroom/ModelSubNav.tsx`.
2. It must receive `makeSlug`, `modelSlug`, `modelName`, and `activeTab`.
3. Provide SSR links to:
   - Overview: `/cars/[brand]/[model]`
   - Variants: `/cars/[brand]/[model]/variants`
   - Specifications: `/cars/[brand]/[model]/specs`
   - On-Road Price: `/cars/[brand]/[model]/price`
   - Images & Colors: `/cars/[brand]/[model]/images`
   - Expert & Owner Reviews: `/cars/[brand]/[model]/reviews`
   - Real Mileage: `/cars/[brand]/[model]/mileage`
   - Safety & NCAP: `/cars/[brand]/[model]/safety`
4. Position: sticky; top: 88px; zIndex: 900; dark blurred background; zero content overlap.

PHASE 2: PROGRAMMATIC SUB-ROUTES
Create dedicated page routes under `app/cars/[brand]/[model]/`:
1. `specs/page.tsx`:
   - Full unrolled technical specs (Engine, Dimensions, Suspension, Brakes, Fuel, Electricals).
   - Dynamic metadata targeting "[Brand] [Model] Specifications".
   - QuantitativeValue schema.
2. `images/page.tsx`:
   - Full-bleed image gallery with category tabs (Exterior, Interior, Cockpit, Colors).
   - Interactive exterior color swatch visualizer updating car images.
   - ImageGallery and ImageObject schema.
3. `reviews/page.tsx`:
   - In-depth KERB road test report + verified owner rating breakdown.
   - Pros/cons matrix.
   - Review and CriticReview schema.
4. `price/page.tsx`:
   - City-by-city on-road price comparison table (Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune).
   - Variant-by-variant price ladder with RTO tax and insurance breakdown.
5. `variants/page.tsx`:
   - Side-by-side variant equipment comparison table showing exact additions per trim.
   - KERB Recommended trim badge.
6. `mileage/page.tsx`:
   - Real-world measured city vs highway mileage report.
   - Interactive daily commute slider calculating monthly fuel bills.
7. `safety/page.tsx`:
   - Bharat NCAP crash test score breakdown (Adult & Child points).
   - Standard 6 airbags and Level 2 ADAS feature explainers.

PHASE 3: MISSING PAGES
Create:
1. `app/brands/page.tsx`: Comprehensive brand directory (Tata, Hyundai, Mahindra, Kia, Maruti, Toyota, Honda, MG, etc.).
2. `app/dealers/page.tsx`: Authorized dealer network locator with city filters.
3. `app/calculators/rto/page.tsx`: State-by-state vehicle road tax calculator.
4. `app/wishlist/page.tsx`: Saved vehicles view connected to WishlistProvider.

PHASE 4: VERIFICATION
1. Run `npm run lint` -> Must pass with 0 errors.
2. Run `npx tsc --noEmit` -> Must pass with 0 errors.
3. Run `npm run build` -> All static and dynamic routes must compile successfully.
4. Update `test-routes.mjs` and run it to verify all sub-routes return HTTP 200 with valid titles and canonicals.
5. Run `node test-mobile-responsiveness.mjs` to ensure zero horizontal overflow (320px to 1440px).
```

---

## 7. Verification & Testing Matrix

Every phase implemented according to this document must satisfy the following automated quality thresholds:

```
+-------------------------------------------------------------------------+
| Test Suite                        | Tool / Command         | Criterion  |
+-------------------------------------------------------------------------+
| Code Quality & Linter             | npm run lint           | 0 Errors   |
| Type Safety                       | npx tsc --noEmit       | 0 Errors   |
| Production Build                  | npm run build          | 0 Errors   |
| HTTP Status & Canonical Audit     | node test-routes.mjs   | 100% 200   |
| Viewport Responsiveness (10 VPs)  | Playwright test script | 0 Overflow |
+-------------------------------------------------------------------------+
```

---
*End of Master Architectural Audit & Issues Log (`issues.md`).*
