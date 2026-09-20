# KERB — Master Product, UX, SEO, AI & Data Architecture Prompt

## Role

You are a **Principal Product Designer + Senior Frontend Architect + SEO Architect + Automotive Data Architect**.

You are redesigning and extending **KERB**, a modern Indian car discovery and buying-research platform.

The current homepage screenshot is provided as the visual reference for the existing implementation. Treat the current design as the **starting point, not the final design**.

Your job is to redesign the experience so that KERB feels like a **premium automotive research and decision platform**, not a conventional Indian automotive portal.

Do not copy the visual language, information architecture, layout, wording, or interaction patterns of:
- 91Wheels
- CarDekho
- BikeDekho
- CarWale
- BikeWale
- ZigWheels
- similar legacy automotive portals

Study the problem space, but create an original design system and information architecture.

---

# 1. PRODUCT VISION

KERB should help a user move through this journey:

**Discover → Explore → Compare → Understand → Shortlist → Calculate → Decide**

The product must answer questions such as:

- Which cars are available?
- Which cars fit my budget?
- Which car is best for my use case?
- What is the exact price in my city?
- What variants exist?
- What is included in each variant?
- Which variant should I consider?
- What is the on-road price?
- What will the EMI be?
- How does the car compare with alternatives?
- What are the real specifications?
- What are the dimensions?
- What mileage/range can I expect?
- What are the safety features?
- What are the pros and cons?
- What do owners/reviewers say?
- What images and videos are available?
- What are the latest updates?
- Which cars are relevant to my budget/use case?

The site should feel like a **digital car showroom + automotive research engine + decision assistant**.

---

# 2. PRIMARY DESIGN PRINCIPLE

## Mobile first. Desktop second.

Priority:

1. Smartphone
2. Tablet
3. Laptop
4. Large desktop

Do NOT design desktop first and merely shrink it.

Every major component must be intentionally designed for a small screen.

Target mobile widths:

- 320px
- 360px
- 375px
- 390px
- 414px
- 430px

Then support:

- 768px
- 1024px
- 1280px
- 1440px
- 1600px+

The UI must remain usable without horizontal scrolling.

---

# 3. CORE UX REQUIREMENT

The website must never feel like an information dump.

Automotive websites traditionally contain:

- too many cards
- too many banners
- too many competing CTAs
- excessive navigation
- dense specification tables
- repetitive SEO text
- intrusive ads
- poor mobile layouts

KERB should instead use:

**progressive disclosure**

Show the most important information first.

Allow the user to expand deeper information when needed.

Example:

Mobile vehicle page:

1. Car identity
2. Price
3. City
4. Key specifications
5. Variant selector
6. EMI
7. Why this car?
8. Variant comparison
9. Full specifications
10. Images
11. Videos
12. Reviews
13. Alternatives
14. FAQs

Do not force the user to scroll through 50 specifications before reaching useful information.

---

# 4. VISUAL DIRECTION

Use the current screenshot only as a reference for the existing KERB identity.

Preserve:

- dark premium automotive feeling
- green KERB accent
- clean white content surfaces
- strong vehicle photography
- restrained typography
- premium spacing

But significantly improve:

- mobile hierarchy
- typography
- card density
- visual rhythm
- navigation
- content grouping
- CTA hierarchy
- accessibility
- loading states
- image presentation
- filtering
- information architecture

## Brand personality

KERB should feel:

- premium
- intelligent
- calm
- trustworthy
- modern
- data-driven
- useful
- automotive
- confident
- non-salesy

Avoid:

- aggressive red/yellow dealership aesthetics
- excessive gradients
- excessive glassmorphism
- excessive animations
- giant text everywhere
- fake urgency
- clutter
- advertisement-heavy layouts
- copied competitor UI

---

# 5. DESIGN SYSTEM

Create a reusable KERB design system.

## Colors

Primary:

- KERB Green
- Deep Charcoal
- Off-white
- White
- Neutral Gray scale

Use semantic tokens rather than hardcoded colors.

Example:

```css
--color-primary
--color-primary-hover
--color-bg
--color-surface
--color-surface-elevated
--color-text
--color-text-muted
--color-border
--color-success
--color-warning
--color-danger
```

Support:

- light mode
- dark mode
- premium/luxury mode if already implemented

Do not make the interface visually noisy.

---

# 6. TYPOGRAPHY

Use a modern highly readable font system.

Priorities:

1. readability
2. hierarchy
3. compact mobile rendering
4. consistent line height

Create explicit typography tokens:

- Display
- H1
- H2
- H3
- H4
- Body
- Body Small
- Caption
- Label
- Price
- Specification value
- Specification label

Avoid tiny text.

Minimum practical body size on mobile: approximately 14–16px.

---

# 7. RESPONSIVE NAVIGATION

## Mobile

Do not simply collapse desktop navigation.

Create a dedicated mobile navigation system.

Header:

- KERB logo
- search
- profile/menu

Sticky bottom navigation can contain:

- Home
- Explore
- Compare
- Saved
- Menu

Only use bottom navigation if it improves usability.

## Desktop

Use:

- KERB logo
- Explore
- New Cars
- Used Cars
- Compare
- EMI Calculator
- AI Advisor
- Guides
- More
- Wishlist
- Sign in

Keep navigation compact.

Do not allow the header to dominate the screen.

---

# 8. HOMEPAGE REDESIGN

Route:

`/`

The homepage should not simply be a collection of sections.

It should function as a **car discovery engine**.

## Section 1 — Hero

Mobile-first hero.

Primary headline should communicate:

**research, compare and buy with confidence**

Do not use generic marketing language.

Hero should contain:

- strong automotive image
- concise headline
- short supporting text
- primary search interface
- secondary AI discovery action

Example search intent:

> Search cars, brands, budgets or features

Search should understand:

- Tata Nexon
- cars under 10 lakh
- best EV under 20 lakh
- automatic cars
- highest mileage cars
- 7 seater cars
- luxury cars
- cars for city driving

The search interface should be capable of evolving into semantic/AI search.

---

# 9. HOMEPAGE — TRUST STRIP

Immediately below hero:

- Cars & variants
- Brands
- Cities
- Verified/structured pricing
- Expert reviews
- Last updated information

Do not make unsupported claims.

Every trust metric must come from real database values.

---

# 10. HOMEPAGE — DISCOVERY BY NEED

Replace generic circular icon clutter with a highly usable discovery module.

Examples:

- Under ₹5 Lakh
- Under ₹10 Lakh
- Under ₹15 Lakh
- Best Mileage
- Electric Cars
- Family Cars
- Automatic Cars
- 7-Seaters
- Luxury Cars
- Performance Cars
- Compact SUVs
- Best City Cars
- Best Highway Cars
- New Launches

Mobile:

Use horizontally scrollable chips/cards.

Desktop:

Use responsive grid.

Every category must have a crawlable URL.

Example:

`/cars/under-5-lakh`

`/cars/under-10-lakh`

`/cars/electric`

`/cars/automatic`

`/cars/7-seater`

`/cars/luxury`

---

# 11. TRENDING CARS

Create a modern vehicle card.

Card must include:

- vehicle image
- brand
- model
- price range
- city context
- fuel type
- transmission
- mileage/range
- rating if available
- popularity/trending signal only if backed by real data
- View Details
- Compare
- Save

Do not overcrowd cards.

Mobile cards should use horizontal scrolling.

Desktop can use 4–5 cards depending on viewport.

---

# 12. AI CAR DISCOVERY

Create a dedicated AI discovery component.

Example:

> Tell KERB what you're looking for.

User:

> I need a family car under ₹12 lakh, mostly city driving, automatic preferred.

AI returns structured results.

The AI must not invent:

- prices
- specifications
- variants
- availability
- mileage
- safety ratings
- reviews

AI responses must be grounded in the KERB vehicle database.

Every AI recommendation should link directly to the relevant vehicle/category pages.

---

# 13. COMPARE MODULE

Homepage should contain a compact compare module.

User can select:

- Car A
- Car B
- optionally Car C

Comparison should include:

- price
- engine
- power
- torque
- mileage/range
- transmission
- dimensions
- boot space
- safety
- features
- warranty where available

CTA:

**Compare cars**

Route:

`/compare`

---

# 14. EMI MODULE

Homepage EMI calculator should be compact.

Inputs:

- car price
- down payment
- interest rate
- loan tenure

Output:

- monthly EMI
- total interest
- total repayment

CTA:

**View detailed EMI breakdown**

Route:

`/emi-calculator`

The calculation logic should be shared with the full EMI page.

---

# 15. CONTENT / GUIDES

Homepage should include useful editorial content.

Examples:

- Best cars under ₹10 lakh
- Best automatic cars
- EV buying guide
- Petrol vs hybrid vs EV
- Car maintenance guide
- How to calculate on-road price

Do not create thin SEO articles.

Content must genuinely answer user questions.

---

# 16. REVIEWS

Create review cards.

Each review should indicate:

- review type
- reviewer/source
- date
- car
- rating
- summary

Avoid fake reviews.

Use clearly separated:

- expert reviews
- owner reviews
- editorial guides

---

# 17. CITY DISCOVERY

Cars have different on-road prices by city.

Build city-aware discovery.

Example:

> Cars in Delhi

> Cars in Mumbai

> Cars in Bangalore

> Cars in Hyderabad

etc.

City selection should be persistent but user-controllable.

URL strategy:

`/cars/delhi`

`/cars/mumbai`

`/cars/bangalore`

For vehicle pages:

`/cars/tata/nexon`

City-specific pricing:

`/cars/tata/nexon/delhi`

or use a canonical product URL with city as a query/state mechanism where appropriate.

Do not generate thousands of low-value duplicate pages.

Only index city pages that contain meaningful unique data.

---

# 18. CAR PRODUCT PAGE

Route example:

`/cars/tata/nexon`

This is one of the most important pages in KERB.

It should feel like a digital showroom.

---

# 19. PRODUCT PAGE — ABOVE THE FOLD

Desktop:

Two-column layout.

Left:

- large vehicle image
- image gallery
- video
- thumbnails

Right:

- brand
- model
- current price range
- city selector
- rating
- key highlights
- Save
- Compare
- Calculate EMI

Mobile:

Use:

- image carousel
- vehicle name
- price
- city selector
- primary CTA
- compact specification strip

Do not place a giant desktop gallery above all useful information on mobile.

---

# 20. PRODUCT PAGE — PRICE

Show:

**Ex-showroom price**

**RTO charges**

**Insurance**

**Other applicable charges**

**On-road price**

Example:

```text
Ex-showroom       ₹X
RTO                ₹X
Insurance          ₹X
Other charges      ₹X
----------------------
On-road price      ₹X
```

Clearly state:

- city
- date/last updated
- whether the value is estimated
- source where appropriate

Never present estimated values as official values.

---

# 21. PRODUCT PAGE — CITY PRICING

Create city selector.

Example:

Delhi
Mumbai
Bangalore
Hyderabad
Chennai
Pune
Kolkata
Ahmedabad
Jaipur
Lucknow
Chandigarh
Gurugram
Noida

The city list must come from the database.

For each city:

- variant
- ex-showroom
- RTO
- insurance
- other charges
- on-road price

---

# 22. PRODUCT PAGE — VARIANTS

Create a variant selector/table.

Each variant should show:

- variant name
- fuel
- transmission
- engine
- power
- mileage/range
- price
- major added features

Provide:

**Compare variants**

---

# 23. PRODUCT PAGE — WHICH VARIANT?

Create an intelligent variant explanation.

Example:

### Which variant should you consider?

Use rule-based/AI-assisted explanation based on:

- budget
- desired features
- transmission
- fuel
- usage
- price difference

The system should explain the tradeoff.

Example:

> Variant X adds automatic transmission and ADAS features for approximately ₹Y more.

Do not blindly call one variant "best".

Present reasoning based on the user's criteria.

---

# 24. PRODUCT PAGE — QUICK SPECS

Create a visual specification grid.

Examples:

- Engine
- Power
- Torque
- Transmission
- Fuel
- Mileage
- Range
- Seating
- Boot Space
- Ground Clearance
- Length
- Width
- Height
- Wheelbase
- Kerb Weight
- Airbags

Mobile should use 2-column cards.

Desktop can use 3–4 columns.

---

# 25. PRODUCT PAGE — FULL SPECIFICATIONS

Use categories:

### Engine & Performance

### Dimensions

### Transmission

### Fuel Economy

### Suspension

### Brakes

### Wheels & Tyres

### Safety

### Comfort

### Infotainment

### Exterior

### Interior

### ADAS

### Connectivity

Use accessible accordions on mobile.

Avoid massive always-expanded tables.

---

# 26. PRODUCT PAGE — FEATURES

Create:

**Features available**

Group into:

- Safety
- Comfort
- Convenience
- Infotainment
- Connectivity
- Exterior
- Interior

Use clear feature comparison across variants.

---

# 27. PRODUCT PAGE — IMAGES

Build a dedicated gallery.

Image SEO requirements:

- descriptive filenames
- descriptive alt text
- width/height
- responsive `srcset`
- WebP/AVIF where supported
- lazy loading below fold
- eager loading for LCP image
- image sitemap
- ImageObject structured data where appropriate

Examples of useful filenames:

`2026-tata-nexon-front.jpg`

`2026-tata-nexon-interior-dashboard.jpg`

`2026-tata-nexon-rear.jpg`

Do not use:

`IMG_23882.jpg`

---

# 28. PRODUCT PAGE — VIDEO

Support:

- exterior walkaround
- interior
- review
- variant explanation
- launch video

Use VideoObject structured data where eligible.

Do not autoplay videos with sound.

---

# 29. PRODUCT PAGE — REVIEWS

Separate:

### Expert Reviews

### Owner Reviews

### Ratings

### Pros

### Cons

### Common complaints/themes

Clearly label source and date.

Do not fabricate review data.

---

# 30. PRODUCT PAGE — ALTERNATIVES

Show alternatives based on measurable similarity.

Examples:

- Similar price
- Similar body type
- Similar size
- Similar power
- Similar use case

Avoid claiming a universal "best alternative".

---

# 31. PRODUCT PAGE — FAQ

Generate structured FAQs from actual content.

Examples:

- What is the price?
- What is the on-road price in Delhi?
- What mileage does it offer?
- Which variants are available?
- Which transmission options are available?
- What is the boot space?
- What are the safety features?

Use FAQPage structured data only when the visible page content genuinely contains the same FAQs and the structured-data eligibility rules are satisfied.

---

# 32. LISTING PAGE

Examples:

`/cars`

`/cars/under-10-lakh`

`/cars/electric`

`/cars/suv`

`/cars/automatic`

The listing page must have:

- SEO-friendly heading
- short useful introduction
- filters
- sorting
- result count
- car cards
- pagination or crawlable pagination
- breadcrumbs
- FAQ where useful

---

# 33. FILTER SYSTEM

Filters:

- budget
- brand
- body type
- fuel
- transmission
- seating
- mileage
- range
- engine
- power
- price
- safety
- features

Mobile:

Open filters in a bottom sheet/full-screen drawer.

Desktop:

Sidebar or top filter bar.

Do not reload the entire page unnecessarily.

Use shareable URLs for meaningful filters.

Example:

`/cars?fuel=electric&body=suv`

Do not create indexable pages for every possible filter combination.

---

# 34. CATEGORY PAGES

Create category landing pages.

Examples:

`/cars/suv`

`/cars/sedan`

`/cars/hatchback`

`/cars/electric`

`/cars/hybrid`

`/cars/automatic`

`/cars/7-seater`

`/cars/luxury`

`/cars/performance`

Each page should have:

- unique introduction
- relevant cars
- filters
- useful specifications
- comparison
- FAQs
- internal links
- related guides

---

# 35. BUDGET PAGES

Examples:

`/cars/under-5-lakh`

`/cars/under-10-lakh`

`/cars/under-15-lakh`

`/cars/under-20-lakh`

The page should dynamically calculate which vehicles qualify based on current structured pricing.

Do not hardcode lists.

---

# 36. BRAND PAGES

Example:

`/cars/tata`

`/cars/hyundai`

`/cars/maruti-suzuki`

Brand page should contain:

- brand overview
- current models
- body types
- price ranges
- fuel options
- popular models
- new launches
- discontinued models where useful
- related guides

---

# 37. CITY PAGES

Example:

`/cars/delhi`

Include:

- cars available
- city-specific price context
- popular segments
- price ranges
- relevant local information
- internal links

Do not create thin location pages merely for SEO.

---

# 38. EMI CALCULATOR PAGE

Route:

`/emi-calculator`

Features:

- vehicle price
- down payment
- interest rate
- loan tenure
- monthly EMI
- principal
- interest
- total repayment
- amortization table

Allow URL parameters so users can share calculations.

Example:

`/emi-calculator?price=1200000&downpayment=200000&rate=8.5&tenure=60`

---

# 39. FINANCE PAGE

Create finance education pages around:

- car loan basics
- down payment
- interest rates
- EMI
- loan tenure
- total interest
- affordability

Do not make unsupported financial promises.

---

# 40. SEARCH ARCHITECTURE

Search must support:

### Exact search

"Tata Nexon"

### Natural language

"best automatic car under 12 lakh"

### Attribute search

"7 seater automatic"

### Fuel

"electric cars"

### Budget

"cars under 8 lakh"

### Combined

"automatic SUV under 15 lakh with good mileage"

Search should return structured filters/results.

---

# 41. AI ARCHITECTURE

AI should sit on top of the structured KERB database.

Do not let the model be the source of truth for automotive facts.

Source of truth:

**Database**

AI:

**Reasoning + explanation + discovery layer**

AI should cite/link to the relevant KERB pages used for factual answers.

---

# 42. DATABASE DESIGN

Use a normalized relational model.

Core hierarchy:

```text
Make
  ↓
Model
  ↓
Generation
  ↓
Variant
```

Do not collapse everything into one table.

---

# 43. CORE TABLES

Create tables approximately like:

```text
makes
models
generations
variants
variant_features
features
specifications
prices
city_prices
cities
fuel_types
transmissions
body_types
images
videos
reviews
review_sources
comparisons
users
saved_cars
guides
faqs
seo_metadata
```

---

# 44. MAKE

```text
makes
-----
id
name
slug
logo_url
country
description
status
created_at
updated_at
```

Unique:

`slug`

---

# 45. MODEL

```text
models
------
id
make_id
name
slug
description
body_type_id
launch_date
status
created_at
updated_at
```

Foreign key:

`make_id → makes.id`

---

# 46. GENERATION

```text
generations
-----------
id
model_id
name
generation_code
start_year
end_year
status
created_at
updated_at
```

This is important because a model can have multiple generations.

---

# 47. VARIANT

```text
variants
--------
id
generation_id
name
slug
fuel_type_id
transmission_id
engine_cc
power_bhp
torque_nm
seating_capacity
mileage_claimed
range_claimed
status
created_at
updated_at
```

---

# 48. CITY

```text
cities
------
id
name
slug
state
state_code
rto_code
latitude
longitude
status
```

Do not store city names repeatedly inside pricing records.

Use foreign keys.

---

# 49. CITY PRICE

```text
city_prices
-----------
id
variant_id
city_id
ex_showroom_price
rto_charge
insurance_charge
other_charges
on_road_price
currency
effective_from
effective_to
source
source_url
last_verified_at
status
```

This allows historical pricing.

Never overwrite historical pricing blindly.

---

# 50. PRICE VERSIONING

Pricing changes.

Therefore use:

```text
effective_from
effective_to
last_verified_at
source
```

Current price should be calculated from the active record.

---

# 51. SPECIFICATIONS

Do not create an enormous table with hundreds of nullable columns if specifications are expected to evolve frequently.

Use a structured specification model.

Possible approach:

```text
specifications
-------------
id
variant_id
category
key
value
unit
display_order
```

For critical high-query fields, keep indexed typed columns.

Use JSON only where flexible nested data is genuinely useful.

---

# 52. FEATURES

```text
features
--------
id
name
category
description
```

Mapping:

```text
variant_features
----------------
variant_id
feature_id
availability
```

Availability can represent:

- standard
- optional
- unavailable

---

# 53. MEDIA

```text
images
------
id
variant_id
model_id
url
alt_text
caption
type
width
height
sort_order
is_primary
created_at
```

Types:

- exterior
- interior
- dashboard
- side
- rear
- front
- wheels
- feature
- lifestyle

---

# 54. VIDEO

```text
videos
------
id
model_id
variant_id
title
description
url
thumbnail_url
duration
source
published_at
```

---

# 55. REVIEW MODEL

```text
reviews
-------
id
model_id
variant_id
review_type
source
author
rating
title
summary
content
published_at
updated_at
```

Review types:

- expert
- owner
- editorial

---

# 56. SEO DATA MODEL

Create:

```text
seo_metadata
------------
id
entity_type
entity_id
title
meta_description
canonical_url
robots
og_title
og_description
og_image
schema_type
```

Do not duplicate metadata manually across hundreds of pages.

Use templates plus overrides.

---

# 57. URL ARCHITECTURE

Keep URLs short and predictable.

Examples:

```text
/
 /cars
 /cars/tata
 /cars/tata/nexon
 /cars/tata/nexon/variants
 /cars/tata/nexon/delhi
 /cars/under-10-lakh
 /cars/electric
 /cars/suv
 /compare
 /emi-calculator
 /guides
 /reviews
```

Avoid:

```text
/product?id=12345
/car-detail-page-final-v2
/newcars.php?model=123
```

Use lowercase slugs.

Avoid unnecessary URL depth.

---

# 58. SEO STRATEGY

SEO must be built into the architecture, not added after development.

Use:

- semantic HTML
- server-side rendering/static generation where appropriate
- crawlable links
- canonical URLs
- XML sitemap
- image sitemap
- robots.txt
- structured data
- breadcrumbs
- descriptive URLs
- unique titles
- unique meta descriptions
- Open Graph
- Twitter/X cards
- internal linking
- clean pagination
- meaningful content

Do not generate thousands of thin pages.

---

# 59. STRUCTURED DATA

Implement schema.org structured data where appropriate.

Potential schemas:

- WebSite
- Organization
- BreadcrumbList
- Car
- Product where applicable
- Offer where applicable
- Review
- AggregateRating only when data meets requirements
- ImageObject
- VideoObject
- FAQPage only when eligible
- Article for editorial guides

Validate generated structured data.

Never fabricate ratings, reviews, prices, or offers.

---

# 60. GOOGLE / DISCOVERY / AI-FRIENDLY CONTENT

Make important information accessible in normal HTML.

Do not hide critical SEO content exclusively inside client-side interactions.

Important:

- vehicle name
- price
- specifications
- variants
- city pricing
- category
- breadcrumbs
- review summaries
- FAQs
- image metadata

must be discoverable without requiring JavaScript interactions.

Create clean internal linking.

AI/search systems should be able to understand:

**what the page is → what entity it represents → what facts are present → how it relates to other pages.**

---

# 61. IMAGE SEO

Create:

- image sitemap
- descriptive image URLs
- descriptive filenames
- alt text
- captions
- ImageObject schema where appropriate
- responsive images
- WebP/AVIF
- correct intrinsic dimensions
- lazy loading below fold
- preload/LCP optimization

Do not lazy-load the primary hero/LCP image.

---

# 62. INTERNAL LINKING

Every vehicle page should link to:

- brand
- body type
- fuel type
- price category
- related cars
- alternatives
- reviews
- guides
- city pages
- comparison pages

Example:

Tata Nexon:

```text
Tata Cars
→ SUV Cars
→ Cars under ₹15 lakh
→ Automatic Cars
→ Electric Cars
→ Tata Nexon Review
→ Tata Nexon vs Hyundai Venue
→ Tata Nexon EMI
```

Use contextual anchors.

Avoid excessive exact-match anchor spam.

---

# 63. ACCESSIBILITY

Target WCAG 2.2 AA.

Requirements:

- keyboard navigation
- visible focus states
- semantic landmarks
- accessible labels
- sufficient contrast
- reduced-motion support
- accessible dialogs
- accessible accordions
- accessible carousels
- screen-reader-friendly controls
- no color-only meaning
- proper heading hierarchy

---

# 64. PERFORMANCE

Target:

- LCP < 2.5s
- CLS < 0.1
- INP < 200ms where practical

Use:

- optimized images
- responsive image sizes
- code splitting
- lazy loading
- route-level loading
- skeleton states
- server rendering where beneficial
- caching
- minimal JavaScript
- avoid unnecessary animation libraries

Do not sacrifice usability for animation.

---

# 65. GDPR / PRIVACY

Build privacy into the architecture.

Requirements:

- consent management
- cookie categories
- necessary cookies
- analytics cookies
- marketing cookies
- preference storage
- privacy policy
- cookie policy
- data deletion request flow
- data access/export request flow
- consent withdrawal
- clear consent language

Do not load non-essential tracking before required consent where applicable.

Do not make the UI manipulative.

No:

- pre-checked marketing consent
- dark-pattern consent buttons
- hidden rejection options
- misleading wording

Store only the personal data required for the feature.

---

# 66. SECURITY

Implement:

- input validation
- output encoding
- CSRF protection where relevant
- secure cookies
- rate limiting
- authorization checks
- API validation
- SQL injection protection
- XSS protection
- secret management
- audit logging for sensitive operations

Never expose database credentials client-side.

---

# 67. API ARCHITECTURE

Create clean APIs around entities.

Example:

```text
GET /api/makes
GET /api/makes/:slug
GET /api/models/:slug
GET /api/models/:slug/variants
GET /api/models/:slug/specifications
GET /api/models/:slug/images
GET /api/models/:slug/reviews
GET /api/models/:slug/prices
GET /api/models/:slug/prices/:city
GET /api/cars
GET /api/cities
GET /api/compare
GET /api/search
POST /api/ai/search
POST /api/emi/calculate
```

Do not create one giant API response for every page.

Return only required data.

---

# 68. CACHING

Cache relatively stable data:

- makes
- models
- variants
- specifications
- images
- guides

Pricing should have shorter cache duration.

AI responses should not become the source of truth.

---

# 69. DATA QUALITY

Create validation rules.

Examples:

- variant must belong to a generation
- generation must belong to model
- model must belong to make
- city price must belong to valid city
- on-road price must not be lower than ex-showroom unless explicitly explained by data rules
- effective date must be valid
- price must be non-negative
- seating must be sensible
- units must be normalized

Create data freshness indicators.

Example:

> Price verified 12 Sep 2026

---

# 70. ADMIN / DATA INGESTION

The architecture should allow future ingestion from trusted sources.

Create an ingestion pipeline capable of:

1. fetching data
2. normalizing data
3. validating data
4. detecting changes
5. versioning prices/specs
6. flagging conflicts
7. publishing approved data

Never silently overwrite conflicting data.

---

# 71. MOBILE UX DETAILS

On mobile:

Use sticky actions where appropriate:

- Compare
- Save
- Calculate EMI

Do not let sticky bars cover content.

Vehicle image:

- swipe
- pinch/zoom where useful
- thumbnail strip only if space permits

Specifications:

- accordion
- 2-column compact layout

Tables:

- horizontal scroll only when unavoidable
- preferably convert comparison tables into stacked cards on very narrow screens

---

# 72. DESKTOP UX

Desktop should take advantage of screen width.

Use:

- max-width container
- balanced columns
- sticky specification/CTA panels where appropriate
- comparison tables
- large image gallery
- multi-column content

Avoid stretching content across the entire 1920px screen.

---

# 73. MICRO-INTERACTIONS

Use subtle animation.

Examples:

- card hover
- button feedback
- accordion transition
- navigation morph
- image transition
- skeleton shimmer

Avoid:

- excessive parallax
- large page transitions
- distracting car animations
- autoplay motion

Respect:

```css
prefers-reduced-motion
```

---

# 74. COMPONENT ARCHITECTURE

Create reusable components.

Suggested structure:

```text
components/
  navigation/
  hero/
  search/
  car/
  pricing/
  variants/
  specifications/
  comparison/
  reviews/
  media/
  filters/
  emi/
  guides/
  seo/
  accessibility/
  privacy/
```

Vehicle components should be reusable across:

- homepage
- listing pages
- brand pages
- category pages
- search results
- comparison
- recommendations

---

# 75. DATA LAYER

Create a clean separation:

```text
UI
 ↓
Server/API
 ↓
Domain services
 ↓
Database
```

AI should interact through domain services.

Do not allow UI components to directly manipulate database queries.

---

# 76. HOMEPAGE COMPONENT TREE

Use approximately:

```text
HomePage
├── Header
├── HeroSearch
├── TrustSignals
├── ExploreByNeed
├── TrendingCars
├── AIAdvisor
├── CompareCars
├── EMICalculator
├── LatestGuides
├── Reviews
├── PopularBrands
├── EVFeature
└── Footer
```

But improve the visual order if user research suggests a better flow.

---

# 77. PRODUCT PAGE COMPONENT TREE

```text
CarPage
├── Breadcrumbs
├── CarHero
│   ├── ImageGallery
│   ├── CarSummary
│   ├── CitySelector
│   ├── PriceBreakdown
│   └── PrimaryActions
├── QuickSpecs
├── VariantSelector
├── VariantAdvisor
├── PriceByCity
├── Features
├── Specifications
├── Images
├── Videos
├── ExpertReviews
├── OwnerReviews
├── Alternatives
├── Comparisons
├── EMI
├── FAQs
└── RelatedGuides
```

---

# 78. LISTING COMPONENT TREE

```text
ListingPage
├── Breadcrumbs
├── SEOIntro
├── Search
├── FilterBar
├── ActiveFilters
├── Sort
├── ResultsSummary
├── VehicleGrid
├── Pagination
├── FAQ
└── RelatedGuides
```

---

# 79. CATEGORY COMPONENT TREE

```text
CategoryPage
├── Breadcrumbs
├── CategoryHero
├── KeyStats
├── FeaturedCars
├── SubCategories
├── Filters
├── CarGrid
├── Comparison
├── BuyingGuide
├── FAQs
└── RelatedCategories
```

---

# 80. FILE / ROUTE ORGANIZATION

Use a scalable route architecture.

If using Next.js App Router, structure approximately:

```text
app/
  page.tsx
  cars/
    page.tsx
    [make]/
      page.tsx
      [model]/
        page.tsx
        reviews/
        variants/
        images/
        [city]/
    under-[budget]/
    electric/
    suv/
    automatic/
  compare/
  emi-calculator/
  guides/
  reviews/
  search/
  api/
```

Adapt this to the existing repository rather than blindly replacing the current architecture.

---

# 81. SEO PAGE GENERATION

Use database-driven metadata.

For a vehicle:

```text
<title>
Tata Nexon Price in Delhi, Variants, Specs & On-Road Price | KERB
</title>
```

But avoid repetitive template spam.

Generate metadata from:

- make
- model
- city
- page type
- actual unique information

---

# 82. CANONICALIZATION

Prevent duplicate content from:

- tracking parameters
- sort parameters
- filter combinations
- duplicate city URLs
- pagination
- session parameters

Use canonical URLs intentionally.

Do not canonicalize all pages to the homepage.

---

# 83. SITEMAPS

Create separate sitemaps where scale requires:

```text
sitemap.xml
sitemap-cars.xml
sitemap-cities.xml
sitemap-categories.xml
sitemap-guides.xml
sitemap-images.xml
```

Only include indexable, canonical, meaningful URLs.

---

# 84. ROBOTS

Allow search engines to crawl useful pages.

Block:

- internal admin routes
- private user routes
- temporary URLs
- internal APIs where appropriate
- unnecessary parameter combinations

Do not use robots.txt as a substitute for canonicalization.

---

# 85. AI / MACHINE-READABLE DATA

Expose structured APIs for internal AI.

Potential:

```text
/api/ai/cars
/api/ai/models/:slug
/api/ai/compare
/api/ai/search
```

Responses should be strongly typed.

Example:

```json
{
  "make": "Tata",
  "model": "Nexon",
  "variants": [],
  "price": {},
  "specifications": {},
  "cities": [],
  "sources": []
}
```

The AI layer should always know:

- source
- timestamp
- city
- variant
- data freshness

---

# 86. DO NOT OVERPROMISE AI SEO

Do not implement fake claims such as:

> "This guarantees ranking in AI search."

Instead optimize for:

- clear entities
- structured data
- accessible content
- authoritative internal linking
- accurate data
- strong page experience
- crawlability

---

# 87. CONTENT STRATEGY

Build a content graph.

Vehicle:

```text
Vehicle
→ Brand
→ Category
→ Budget
→ Fuel
→ Transmission
→ City
→ Review
→ Guide
→ Comparison
```

This creates strong internal linking.

---

# 88. COMPARISON PAGES

Support:

`/compare/tata-nexon-vs-hyundai-creta`

Comparison should contain:

- price
- dimensions
- engine
- power
- torque
- mileage
- safety
- features
- variants
- city pricing
- EMI

Do not automatically generate every possible pair.

Only generate meaningful combinations based on usage/data.

---

# 89. USER PERSONALIZATION

If users log in:

Allow:

- saved cars
- saved comparisons
- saved searches
- city preference
- budget preference

Respect consent and privacy.

---

# 90. ERROR / EMPTY STATES

Design:

- no search results
- no city price
- unavailable variant
- image loading failure
- API failure
- AI unavailable
- no reviews
- no comparison data

Do not leave blank areas.

---

# 91. LOADING STATES

Create skeletons for:

- vehicle cards
- hero
- price
- specifications
- comparison
- reviews
- image gallery

Avoid layout shifts.

---

# 92. ANALYTICS

Track useful product events while respecting consent:

```text
search
car_view
image_view
video_play
compare_add
compare_remove
save_car
city_change
variant_change
emi_calculation
filter_apply
guide_open
review_open
ai_query
```

Do not collect unnecessary personal data.

---

# 93. DESIGN OUTPUT EXPECTATION

When implementing the redesign:

1. Inspect the existing codebase.
2. Reuse existing working infrastructure where possible.
3. Do not destroy working functionality.
4. Identify current components.
5. Identify current routes.
6. Identify current styling system.
7. Identify current data layer.
8. Refactor only where necessary.
9. Build mobile-first.
10. Validate desktop afterward.
11. Test all major routes.
12. Test accessibility.
13. Test performance.
14. Test SEO output.
15. Test structured data.

---

# 94. IMPLEMENTATION PRIORITY

Implement in this order:

## Phase 1

Homepage redesign.

## Phase 2

Vehicle product page.

## Phase 3

Database schema + seed data.

## Phase 4

Listing pages.

## Phase 5

Category pages.

## Phase 6

Brand pages.

## Phase 7

City pricing.

## Phase 8

Comparison.

## Phase 9

EMI calculator.

## Phase 10

Reviews and guides.

## Phase 11

AI search/advisor.

## Phase 12

Privacy/GDPR.

## Phase 13

SEO infrastructure.

## Phase 14

Performance optimization.

---

# 95. FIRST TASK — HOMEPAGE

Before building everything:

### Redesign the existing homepage.

Do not immediately create all other pages.

First make `/` production-quality.

Requirements:

- mobile-first
- premium automotive UI
- responsive
- fast
- accessible
- SEO-friendly
- structured-data-ready
- AI-readable
- visually original
- clean
- modern
- low clutter

After completing homepage:

- test 320px
- test 375px
- test 390px
- test 430px
- test 768px
- test 1024px
- test 1280px
- test 1440px

Fix layout problems before continuing.

---

# 96. SECOND TASK — PRODUCT PAGE

Then create:

`/cars/[make]/[model]`

Build the complete digital showroom experience.

It must connect to the database.

Use real structured data instead of hardcoded repeated content.

---

# 97. THIRD TASK — LISTING PAGE

Build:

`/cars`

Then create reusable filtered listing infrastructure.

---

# 98. FOURTH TASK — CATEGORY SYSTEM

Implement:

- budget
- fuel
- body type
- transmission
- seating
- EV
- luxury
- performance

---

# 99. FIFTH TASK — CITY PRICING

Create:

```text
cities
city_prices
```

Connect vehicle → variant → city → price.

---

# 100. SIXTH TASK — COMPARISON

Create reusable comparison infrastructure.

---

# 101. SEVENTH TASK — EMI

Build reusable EMI calculation logic.

---

# 102. FINAL QUALITY CHECKLIST

Before considering the implementation complete:

## UI

- [ ] Original design
- [ ] Premium visual hierarchy
- [ ] No unnecessary clutter
- [ ] Excellent mobile UX
- [ ] Excellent desktop UX
- [ ] Consistent design system

## Data

- [ ] Make → Model → Generation → Variant
- [ ] City pricing
- [ ] Variant pricing
- [ ] Price history
- [ ] Specifications
- [ ] Features
- [ ] Images
- [ ] Videos
- [ ] Reviews

## SEO

- [ ] Semantic HTML
- [ ] Metadata
- [ ] Canonicals
- [ ] Sitemaps
- [ ] Image SEO
- [ ] Breadcrumbs
- [ ] Structured data
- [ ] Internal links
- [ ] Crawlable URLs
- [ ] No thin duplicate pages

## AI

- [ ] Structured source data
- [ ] Grounded recommendations
- [ ] Search intent handling
- [ ] Explainable recommendations
- [ ] Links back to source pages
- [ ] No hallucinated vehicle data

## GDPR

- [ ] Consent
- [ ] Cookie preferences
- [ ] Privacy controls
- [ ] Data deletion
- [ ] Data access/export
- [ ] Consent withdrawal
- [ ] No dark patterns

## Accessibility

- [ ] Keyboard navigation
- [ ] Screen reader labels
- [ ] Focus states
- [ ] Contrast
- [ ] Reduced motion
- [ ] Semantic headings
- [ ] Accessible forms

## Performance

- [ ] Fast LCP
- [ ] Low CLS
- [ ] Responsive images
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Minimal JS
- [ ] No unnecessary dependencies

---

# 103. IMPORTANT PRODUCT RULE

KERB should never feel like:

> "Here are 200 cars. Good luck."

It should feel like:

> "Tell me what you need. I'll organize the market so you can make a decision."

The product must reduce cognitive load.

Every page should answer:

**What is this?**

**How much does it cost?**

**What do I get?**

**What are the alternatives?**

**What does it cost in my city?**

**Which variant fits my needs?**

**What should I investigate next?**

---

# 104. FINAL IMPLEMENTATION INSTRUCTION

Start by inspecting the existing repository.

Do not assume the current screenshot represents the final architecture.

Do not rebuild the entire application blindly.

First produce a short internal implementation plan covering:

1. current architecture
2. current routes
3. reusable components
4. existing database/data model
5. current styling system
6. what can be reused
7. what must be refactored
8. homepage implementation plan
9. product page implementation plan

Then implement **Phase 1: Homepage**.

Once the homepage is stable and responsive, implement **Phase 2: Product Page**.

Then progressively implement the remaining architecture.

The result should be a **production-grade KERB automotive platform**, not a static mockup.

Every feature must be connected to reusable data structures.

Every important piece of information must be accessible on mobile.

Every important page must be crawlable.

Every important vehicle entity must have a canonical URL.

Every important image must be optimized and semantically described.

Every recommendation must be grounded in structured data.

The final experience should feel like a modern automotive product built for 2026 — clean, intelligent, fast, accessible, data-rich, and distinctly KERB.
