'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader, VehicleCard, InteractiveSlider, currency } from '../design/Primitives';
import { CarModel, Make, City } from '../../types/vehicle';

export interface NewCarsViewProps {
  models: CarModel[];
  makes: Make[];
  cities: City[];
}

export const NewCarsView: React.FC<NewCarsViewProps> = ({ models, makes, cities }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedBudget, setSelectedBudget] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState<City>(cities[0] || {
    id: 'city-delhi',
    name: 'New Delhi',
    slug: 'delhi',
    state: 'Delhi',
    tier: 1,
    rtoPercentage: 8.5,
    defaultInsuranceEst: 38000
  });
  const [loanBudgetLakh, setLoanBudgetLakh] = useState<number>(15);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);
  const [alertSubscribed, setAlertSubscribed] = useState<Record<string, boolean>>({});

  const formatPriceLakh = (price: number) => `₹${(price / 100000).toFixed(2)} Lakh`;

  // Filtered 2026 cars
  const filteredCars = useMemo(() => {
    return models.filter((car) => {
      if (selectedCategory === 'EV' && !car.isEV) return false;
      if (selectedCategory === 'HYBRID' && !car.isHybrid) return false;
      if (selectedCategory === 'SUV' && car.bodyType !== 'SUV') return false;
      if (selectedCategory === 'SEDAN' && car.bodyType !== 'Sedan') return false;
      if (selectedCategory === '7SEATER' && !car.seatingCapacities.includes(7)) return false;

      if (selectedBudget === 'UNDER_10L' && car.priceRangeMin > 1000000) return false;
      if (selectedBudget === '10L_15L' && (car.priceRangeMin > 1500000 || car.priceRangeMax < 1000000)) return false;
      if (selectedBudget === '15L_20L' && (car.priceRangeMin > 2000000 || car.priceRangeMax < 1500000)) return false;
      if (selectedBudget === 'ABOVE_20L' && car.priceRangeMax < 2000000) return false;

      return true;
    });
  }, [models, selectedCategory, selectedBudget]);

  // Upcoming 2026 Launches
  const upcomingCars = [
    {
      name: 'Tata Curvv EV',
      brand: 'Tata',
      expectedPrice: '₹17.50 - 22.00 Lakh',
      expectedLaunch: 'Q2 2026',
      bodyType: 'SUV Coupe',
      powertrain: 'Pure Electric (500 km range)',
      usp: 'Segment-first SUV coupe profile with Level 2 ADAS and V2L charging.',
      image: '/suv-electric.jpg'
    },
    {
      name: 'Mahindra BE.05',
      brand: 'Mahindra',
      expectedPrice: '₹21.00 - 26.00 Lakh',
      expectedLaunch: 'Q3 2026',
      bodyType: 'Sport Electric SUV',
      powertrain: 'Dual Motor AWD (79 kWh)',
      usp: 'INGLO skateboard architecture with 175 kW ultra-fast charging.',
      image: '/hero-car.jpg'
    },
    {
      name: 'Maruti Suzuki eVX',
      brand: 'Maruti Suzuki',
      expectedPrice: '₹18.00 - 24.00 Lakh',
      expectedLaunch: 'Q3 2026',
      bodyType: 'Electric SUV',
      powertrain: '60 kWh Battery (550 km range)',
      usp: 'First dedicated global EV from Suzuki with Blade Battery technology.',
      image: '/nexon.jpg'
    },
    {
      name: 'Hyundai Creta EV',
      brand: 'Hyundai',
      expectedPrice: '₹19.50 - 25.00 Lakh',
      expectedLaunch: 'Q4 2026',
      bodyType: 'Electric SUV',
      powertrain: '45 kWh Battery (450 km range)',
      usp: 'India’s favorite mid-size SUV reborn with zero emissions and V2V power.',
      image: '/hero-creta.jpg'
    }
  ];

  // 2026 Manufacturer Offers
  const currentOffers = [
    {
      brand: 'Tata Motors',
      offer: 'Up to ₹45,000 Exchange Bonus + Free 3-Year Extended Warranty on Nexon Petrol',
      validTill: 'End of Month',
      tag: 'Best Seller'
    },
    {
      brand: 'Hyundai India',
      offer: 'Complimentary 5-Year Shield of Trust Maintenance Package on Creta SX(O)',
      validTill: 'Limited Period',
      tag: 'Zero Maintenance'
    },
    {
      brand: 'Mahindra',
      offer: 'Subsidized 7.99% Annual Interest Rate on XUV700 through Mahindra Finance',
      validTill: 'Special Scheme',
      tag: 'Finance Deal'
    },
    {
      brand: 'Maruti Suzuki',
      offer: '₹50,000 Scrappage Incentive on Grand Vitara Strong Hybrid variants',
      validTill: 'Government Tied',
      tag: 'Hybrid Subsidy'
    }
  ];

  // Quick EMI calculation
  const calculateQuickEMI = (principalLakh: number, tenureYears: number, ratePercent: number = 9.5) => {
    const p = principalLakh * 100000;
    const r = ratePercent / 12 / 100;
    const n = tenureYears * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateQuickEMI(loanBudgetLakh * 0.8, loanTenureYears);

  // Toggle launch alert
  const toggleAlert = (carName: string) => {
    setAlertSubscribed((prev) => ({
      ...prev,
      [carName]: !prev[carName]
    }));
  };

  return <div className="kerb-shell new-cars-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>New cars</span></nav><header className="new-cars-hero"><div><span className="eyebrow">The new car edition / 2026</span><h1>What’s next.<br/>What’s worth a look.</h1><p>New launches, upcoming models and the numbers behind your next move.</p><a href="#latest-launches" className="text-link">Explore the latest cars ↓</a></div><div className="new-hero-photo"><Image src={models.find(model=>model.isNewLaunch)?.heroImage || models[0].heroImage} alt="Explore the new car collection" fill priority sizes="(max-width:800px) 100vw, 55vw"/></div></header>
    <section id="latest-launches" className="chapter"><SectionHeader label="01 / In the showroom" title="The current collection." description="Explore the models in our new-car catalogue. Filter by body style and budget."/><div className="launch-filters"><div className="filter-options">{[{label:'All cars',id:'ALL'},{label:'Electric',id:'EV'},{label:'SUV',id:'SUV'},{label:'Hybrid',id:'HYBRID'},{label:'Sedan',id:'SEDAN'},{label:'7 seats',id:'7SEATER'}].map(item=><button key={item.id} className="filter-option" data-tone={item.id} aria-pressed={selectedCategory===item.id} onClick={()=>setSelectedCategory(item.id)}>{item.label}</button>)}</div><label><span className="sr-only">Budget</span><select value={selectedBudget} onChange={e=>setSelectedBudget(e.target.value)}><option value="ALL">Any budget</option><option value="UNDER_10L">Under ₹10L</option><option value="10L_15L">₹10–15L</option><option value="15L_20L">₹15–20L</option><option value="ABOVE_20L">₹20L+</option></select></label></div><div className="vehicle-grid">{filteredCars.map(car=><VehicleCard key={car.id} model={car} make={makes.find(make=>make.id===car.makeId)}/>)}</div>{!filteredCars.length && <p className="data-note">No cars match these filters. Try another category or budget.</p>}</section>
    <section className="chapter"><SectionHeader label="02 / On the horizon" title="The launch watchlist." description="Existing catalogue estimates, pending verification. Timing, specifications and prices are not confirmed launch information."/><div className="launch-timeline">{upcomingCars.map(car=><article key={car.name}><div className="timeline-date"><span className="eyebrow">Listed estimate</span><strong>{car.expectedLaunch}</strong></div><div><span className="eyebrow">{car.brand} / {car.bodyType}</span><h3>{car.name}</h3><p>{car.usp}</p><p className="data-note">Listed powertrain: {car.powertrain} · Unverified</p></div><div><strong className="timeline-price">{car.expectedPrice}</strong><p className="data-note">Estimated price · unverified</p><button className="action secondary" aria-pressed={!!alertSubscribed[car.name]} onClick={()=>toggleAlert(car.name)}>{alertSubscribed[car.name]?'✓ Saved for this visit':'＋ Save to watchlist'}</button></div></article>)}</div></section>
    <section className="chapter"><SectionHeader label="03 / Your starting point" title="Follow your priorities."/><div className="browse-routes"><div><h3 className="eyebrow">By budget</h3>{[['UNDER_10L','Under ₹10 lakh'],['10L_15L','₹10–15 lakh'],['15L_20L','₹15–20 lakh'],['ABOVE_20L','₹20 lakh and above']].map(([id,label])=><Link key={id} href={`/cars?budget=${id}`}>{label}<span>↗</span></Link>)}</div><div><h3 className="eyebrow">By powertrain</h3>{[['Petrol','Petrol'],['Diesel','Diesel'],['HYBRID','Hybrid'],['EV','Electric']].map(([id,label])=><Link key={id} href={id==='EV'||id==='HYBRID'?`/cars?body=${id}`:`/cars?fuel=${label}`}>{label}<span>↗</span></Link>)}</div></div></section>
    <section className="chapter"><div className="section-with-control"><SectionHeader label="04 / Planning delivery" title="The waiting game." description="Model-wide estimates from the catalogue. City-specific dealer timelines are unavailable."/><label>City<select aria-label="Waiting period city" value={selectedCity.slug} onChange={e=>setSelectedCity(cities.find(city=>city.slug===e.target.value)!)}>{cities.map(city=><option value={city.slug} key={city.id}>{city.name}</option>)}</select></label></div><div className="table-scroll"><table className="data-table"><thead><tr><th>Model</th><th>Catalogue estimate</th><th>{selectedCity.name} dealer data</th><th>Research</th></tr></thead><tbody>{models.map(car=><tr key={car.id}><th scope="row">{car.name}</th><td>{car.waitingPeriodWeeks} weeks · estimated</td><td>Data unavailable</td><td><Link href={`/cars/${makes.find(make=>make.id===car.makeId)?.slug}/${car.slug}`}>View variants ↗</Link></td></tr>)}</tbody></table></div></section>
    <section className="chapter" data-tone="editorial"><SectionHeader label="05 / Buyer’s notebook" title="Before you sign." tone="editorial" description="Compare the total cost, the exact variant and the delivery commitment before choosing a car."/><div className="offer-notes">{currentOffers.map(offer=><article key={offer.brand}><span className="eyebrow">{offer.brand}</span><h3>Listed catalogue offer</h3><p>{offer.offer}</p><small>Unverified offer · confirm availability and terms with the dealer</small></article>)}</div><Link href="/guides" className="text-link">Read the buying guides →</Link></section>
    <section className="chapter" data-tone="financial"><SectionHeader label="06 / Finance" title="Put a monthly figure on it." tone="financial" description="Estimate a loan with 20% down payment and 9.5% annual interest."/><div className="split-analysis"><div><InteractiveSlider id="new-car-budget" label="On-road budget" value={loanBudgetLakh} display={`₹${loanBudgetLakh} lakh`} min={6} max={45} onChange={setLoanBudgetLakh}/><InteractiveSlider id="new-car-tenure" label="Loan tenure" value={loanTenureYears} display={`${loanTenureYears} years`} min={1} max={7} onChange={setLoanTenureYears}/></div><div className="finance-result"><span className="eyebrow">Estimated monthly EMI</span><div className="big-number" aria-live="polite">{currency(monthlyEMI)}</div><p className="data-note">Principal: {currency(loanBudgetLakh*.8*100000)}</p><Link className="text-link" href={`/emi-calculator?price=${loanBudgetLakh*100000}`}>Full repayment schedule →</Link></div></div></section>
    <section className="chapter"><SectionHeader label="07 / Questions, answered" title="Buying a new car." tone="editorial"/>{[{q:'How should I compare on-road prices?',a:'Choose the same variant and city, then compare the ex-showroom price, registration, insurance and optional extras separately. KERB shows an itemised estimate in each vehicle dossier.'},{q:'Are the waiting periods city-specific?',a:'The catalogue contains model-wide estimates. City-specific dealer delivery data is unavailable; confirm a delivery commitment with your chosen dealer.'},{q:'What is included in the EMI estimate?',a:'The estimate uses your selected budget and tenure, 20% down payment and 9.5% annual interest. Actual lending rates and fees depend on your lender.'},{q:'Are upcoming launch dates confirmed?',a:'The watchlist contains unverified catalogue estimates. Confirm launch dates, final specifications and booking availability with the manufacturer.'}].map(faq=><div className="faq-row" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</section>
  </div>;
};
