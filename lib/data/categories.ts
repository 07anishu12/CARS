export interface CategoryDefinition {
  slug: string;
  type: 'category' | 'budget';
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  editorialGuide: string;
  pros: string[];
  buyingTips: string[];
  filter: {
    bodyType?: string;
    isEV?: boolean;
    isHybrid?: boolean;
    transmission?: string;
    seating?: number;
    maxBudget?: number;
    minBudget?: number;
    isLuxury?: boolean;
  };
}

export const CATEGORIES_DATA: Record<string, CategoryDefinition> = {
  suv: {
    slug: 'suv',
    type: 'category',
    title: 'SUVs in India',
    metaTitle: 'Best SUVs in India 2026: Prices, NCAP Safety Ratings & Specs | KERB',
    metaDescription: 'Compare the best compact, midsize, and 7-seater SUVs in India. Check real on-road pricing, tested fuel economy, 5-star crash safety ratings, and expert road test verdicts.',
    headline: 'Commanding road presence, generous 200mm+ ground clearance, and compliant suspension built for Indian tarmac.',
    editorialGuide: 'Sport Utility Vehicles dominate the Indian market because of their capability over broken monsoon roads, high seating position that aids traffic visibility, and versatile boot capacity. When choosing an SUV, balance ground clearance with suspension tuning: stiffer setups resist highway body roll, while softer dampers absorb sharp city potholes.',
    pros: ['High ground clearance to navigate broken roads and waterlogging', 'Upright seating gives excellent traffic visibility', 'Generous boot space for family touring'],
    buyingTips: ['Ensure child and adult NCAP crash ratings are verified', 'Choose torque-converter or dual-clutch over AMT for seamless stop-and-go driving'],
    filter: { bodyType: 'SUV' }
  },
  sedan: {
    slug: 'sedan',
    type: 'category',
    title: 'Sedans in India',
    metaTitle: 'Best Sedans in India 2026: High-Speed Stability & Cabin Comfort | KERB',
    metaDescription: 'Explore the top sedans in India for executive chauffeur comfort, boot capacity, and high-speed highway composure.',
    headline: 'Low center of gravity, refined acoustic insulation, and unmatched high-speed aerodynamic stability.',
    editorialGuide: 'Sedans remain the undisputed kings of passenger ride comfort. Because of their lower center of gravity and aerodynamic silhouette, sedans exhibit significantly less high-speed highway body pitch than tall SUVs, making them the preferred vehicle for long cross-country interstate cruising.',
    pros: ['Exceptional highway handling and reduced crosswind vulnerability', 'Plush rear seat recline angles and under-thigh support', 'Quiet cabins with lower wind and road noise'],
    buyingTips: ['Check ground clearance figures if navigating unusually tall speed breakers', 'Look for rear AC vents and sunblinds for hot climates'],
    filter: { bodyType: 'Sedan' }
  },
  electric: {
    slug: 'electric',
    type: 'category',
    title: 'Electric Cars (EVs) in India',
    metaTitle: 'Electric Cars in India 2026: Real-World Range & On-Road Prices | KERB',
    metaDescription: 'Find the best electric cars in India. Verified tested battery range, DC fast-charging duration, battery warranty details, and running costs under ₹1.5/km.',
    headline: 'Zero tailpipe emissions, instant electric acceleration, whisper-quiet cabin operation, and minimal running costs.',
    editorialGuide: 'Modern electric cars in India have moved past range anxiety into daily practicality. With battery packs exceeding 38-60 kWh, real-world ranges now reliably span 250 to 450 km. With public DC fast chargers installed every 50 km along major expressways and home AC chargers, running costs remain under ₹1.50 per km compared to ₹8.00 per km for petrol.',
    pros: ['Negligible running cost compared to internal combustion engines', 'Instant torque from 0 rpm makes overtaking effortless', 'Very low routine maintenance costs with fewer moving parts'],
    buyingTips: ['Verify home parking electricity load approval for 7.2 kW AC wallbox', 'Consider battery chemistry (LFP cells offer exceptional thermal durability in Indian heat)'],
    filter: { isEV: true }
  },
  hybrid: {
    slug: 'hybrid',
    type: 'category',
    title: 'Strong Hybrid Cars in India',
    metaTitle: 'Best Hybrid Cars in India 2026: 25+ km/l Real-World Fuel Economy | KERB',
    metaDescription: 'Discover the most fuel-efficient strong hybrid cars in India. Self-charging electric motors delivering 25+ km/l in dense city traffic without plug-in hassle.',
    headline: 'Self-charging dual motors generating 25+ km/l in stop-and-go traffic with zero charging cables required.',
    editorialGuide: 'Strong hybrids combine an efficient Atkinson-cycle petrol engine with an electric motor and self-charging battery pack. During stop-and-go city traffic, the car automatically operates in silent EV mode without consuming fuel. When accelerating or cruising on highways, both powertrains seamlessly blend.',
    pros: ['Outstanding 24 - 28 km/l real-world mileage in dense city congestion', 'No need to plug into wall chargers or install external charging infrastructure', 'Silent, refined operation during low-speed maneuvers'],
    buyingTips: ['Hybrids deliver maximum financial payback for drivers covering over 1,500 km per month', 'Note battery packaging in boot area when assessing luggage needs'],
    filter: { isHybrid: true }
  },
  automatic: {
    slug: 'automatic',
    type: 'category',
    title: 'Best Automatic Cars in India',
    metaTitle: 'Best Automatic Cars in India 2026: DCT, CVT, Torque Converter & AMT | KERB',
    metaDescription: 'Browse the best automatic transmission cars in India across budgets. Compare CVT, DCT, and Torque Converter gearboxes for stress-free commuting.',
    headline: 'Clutchless driving comfort for effortless daily navigation through dense Indian metropolitan traffic.',
    editorialGuide: 'An automatic transmission is no longer a luxury in Indian cities—it is essential for reducing driver fatigue. Choose a CVT or IVT for silky urban smoothness, a Torque Converter for bulletproof long-term durability and highway overtaking, or a DCT for rapid paddle-shift engagement.',
    pros: ['Eliminates left leg knee fatigue during bumper-to-bumper gridlock', 'Hill-hold assist prevents dangerous rollbacks on inclines', 'Modern gearboxes match or exceed manual fuel economy on highways'],
    buyingTips: ['Avoid AMTs if seeking seamless gear changes without perceptible pauses', 'Prioritize cars with paddle shifters for manual control during highway overtaking'],
    filter: { transmission: 'Automatic' }
  },
  '7-seater': {
    slug: '7-seater',
    type: 'category',
    title: 'Best 7-Seater Cars in India',
    metaTitle: 'Best 7 Seater Cars in India 2026: Family Touring & Space | KERB',
    metaDescription: 'Compare 7-seater cars and SUVs in India. Third-row comfort, boot capacity with all seats up, 5-star crash safety, and verified on-road pricing.',
    headline: 'Spacious three-row seating configured for joint families, touring comfort, and versatile cargo volume.',
    editorialGuide: 'Selecting a 7-seater vehicle requires evaluating true third-row usability versus occasional child seating. Vehicles with sliding second-row captain seats maximize knee room, while flat-folding rear seats allow seamless conversion into massive 600+ litre cargo bays for road trips.',
    pros: ['Transports 6 to 7 occupants comfortably in a single vehicle', 'Flexible seating arrangements for luggage and pets', 'Robust suspension calibrated for heavier payloads'],
    buyingTips: ['Check dedicated third-row AC blowers and charging ports', 'Verify whether side curtain airbags extend fully to the third row'],
    filter: { seating: 7 }
  },
  luxury: {
    slug: 'luxury',
    type: 'category',
    title: 'Luxury Cars in India',
    metaTitle: 'Best Luxury Cars in India 2026: Executive Sedans & Flagship SUVs | KERB',
    metaDescription: 'Explore the finest luxury automotive models in India. High-fidelity acoustic cabins, adaptive air suspension, active noise cancellation, and bespoke materials.',
    headline: 'Acoustic sanctuary, active air suspension, bespoke leather craftsmanship, and prestigious road presence.',
    editorialGuide: 'True luxury lies in effortless composure and tactile indulgence. From adaptive damping that reads road surface irregularities ahead to active noise-canceling headliners that mute diesel and road noise, modern luxury automobiles isolate occupants from external stress.',
    pros: ['First-class cabin materials, open-pore woods, and Nappa leatherette', 'Advanced Level 2+ driver assistance and surround camera composites', 'Superior highway cruising tranquility'],
    buyingTips: ['Factor in annual comprehensive zero-depreciation insurance packages', 'Opt for extended warranty and service inclusive packages up to 5-7 years'],
    filter: { isLuxury: true }
  },
  'under-10-lakh': {
    slug: 'under-10-lakh',
    type: 'budget',
    title: 'Best Cars Under ₹10 Lakh',
    metaTitle: 'Best Cars Under ₹10 Lakh in India 2026: On-Road Prices & Mileage | KERB',
    metaDescription: 'Find the best cars under 10 lakh in India. Check ex-showroom and on-road prices, NCAP safety scores, real-world mileage, and top value-for-money variants.',
    headline: 'High-value compact SUVs and premium hatchbacks delivering modern tech, 6 airbags, and exceptional fuel economy.',
    editorialGuide: 'The under ₹10 lakh bracket represents the entry point for quality sub-4m SUVs and feature-loaded hatchbacks. Buyers can expect essential safety equipment like 6 airbags, electronic stability control, touchscreen infotainment with wireless smartphone projection, and fuel economy exceeding 17-20 km/l.',
    pros: ['Affordable monthly EMI and accessible down payments', 'Low road tax and insurance premiums', 'High fuel economy and low depreciation'],
    buyingTips: ['Prioritize safety (6 airbags and ESP) over aftermarket accessories', 'Calculate on-road price with state RTO, as road tax adds 8-14%'],
    filter: { maxBudget: 1000000 }
  },
  'under-15-lakh': {
    slug: 'under-15-lakh',
    type: 'budget',
    title: 'Best Cars Under ₹15 Lakh',
    metaTitle: 'Best Cars Under ₹15 Lakh in India 2026: Top Value Automatic SUVs | KERB',
    metaDescription: 'Compare the best cars under 15 lakh in India. Subcompact and midsize SUVs with automatic transmissions, sunroofs, and 5-star Bharat NCAP safety.',
    headline: 'The sweet spot of the Indian car market: punchy turbo engines, automatic transmissions, and voice-operated sunroofs.',
    editorialGuide: 'Between ₹10 and ₹15 lakh sits the most fiercely competitive segment in the Indian automotive landscape. Here, buyers obtain top-spec compact SUVs or well-equipped mid-size SUVs with dual 10.25-inch cockpits, 360-degree cameras, ventilated seats, and refined automatic transmissions.',
    pros: ['Access to responsive turbo petrol and frugal diesel engines', 'High feature density including 360 cameras, sunroofs, and wireless CarPlay', 'Outstanding resale demand across secondary markets'],
    buyingTips: ['The mid-range automatic variants frequently represent the highest value-for-money sweet spot', 'Compare diesel vs petrol if driving more than 1,200 km per month'],
    filter: { maxBudget: 1500000 }
  },
  'under-20-lakh': {
    slug: 'under-20-lakh',
    type: 'budget',
    title: 'Best Cars Under ₹20 Lakh',
    metaTitle: 'Best Cars Under ₹20 Lakh in India 2026: Midsize SUVs & ADAS | KERB',
    metaDescription: 'Explore the best cars under 20 lakh in India. Midsize SUVs, strong hybrids, Level 2 ADAS active safety, and panoramic sunroofs.',
    headline: 'Flagship midsize SUVs and strong hybrids equipped with Level 2 ADAS active safety and panoramic skyroofs.',
    editorialGuide: 'In the ₹15 to ₹20 lakh segment, vehicles offer genuine executive road presence and flagship capabilities. Expect Level 2 ADAS with autonomous emergency braking, panoramic acoustic sunroofs, 8-speaker branded sound systems, and self-charging hybrid technology delivering over 25 km/l.',
    pros: ['Autonomous Level 2 active safety aids (Lane Keep, Collision Avoidance)', 'Expansive panoramic glass roofs and multi-stage seat ventilation', 'Substantial cabin room for 5 adults plus weekend luggage'],
    buyingTips: ['Test-drive both automatic and hybrid variants back-to-back to choose your preferred drivetrain characteristic', 'Verify ADAS camera and radar calibration during scheduled dealership maintenance'],
    filter: { maxBudget: 2000000 }
  }
};

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES_DATA[slug.toLowerCase()];
}
