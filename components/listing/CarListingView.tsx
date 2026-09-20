'use client';

import React, { useState, useMemo, useRef } from 'react';
import { SectionHeader, VehicleCard } from '../design/Primitives';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';

export interface CarListingViewProps {
  initialModels: CarModel[];
  allMakes: Make[];
  initialCategory?: string;
  initialBudget?: string;
  initialSeats?: number;
  initialFuel?: string;
}

export const CarListingView: React.FC<CarListingViewProps> = ({
  initialModels,
  allMakes,
  initialCategory,
  initialBudget,
  initialSeats,
  initialFuel
}) => {
  // Filters State
  const [selectedBodyType, setSelectedBodyType] = useState<string>(initialCategory || 'ALL');
  const [selectedBudget, setSelectedBudget] = useState<string>(initialBudget || 'ALL');
  const [selectedFuel, setSelectedFuel] = useState<string>(initialFuel || 'ALL');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('ALL');
  const [selectedSeating, setSelectedSeating] = useState<number | 'ALL'>(initialSeats || 'ALL');
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popularity' | 'price_asc' | 'price_desc' | 'rating'>('popularity');
  const filterDialog = useRef<HTMLDialogElement>(null);

  // Toggle brand selection
  const toggleMake = (makeId: string) => {
    if (selectedMakes.includes(makeId)) {
      setSelectedMakes(selectedMakes.filter((id) => id !== makeId));
    } else {
      setSelectedMakes([...selectedMakes, makeId]);
    }
  };

  const resetFilters = () => {
    setSelectedBodyType('ALL');
    setSelectedBudget('ALL');
    setSelectedFuel('ALL');
    setSelectedTransmission('ALL');
    setSelectedSeating('ALL');
    setSelectedMakes([]);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedBodyType !== 'ALL') count++;
    if (selectedBudget !== 'ALL') count++;
    if (selectedFuel !== 'ALL') count++;
    if (selectedTransmission !== 'ALL') count++;
    if (selectedSeating !== 'ALL') count++;
    count += selectedMakes.length;
    return count;
  }, [selectedBodyType, selectedBudget, selectedFuel, selectedTransmission, selectedSeating, selectedMakes]);

  // Filter and Sort logic
  const filteredModels = useMemo(() => {
    return initialModels
      .filter((model) => {
        // Body Type
        if (selectedBodyType !== 'ALL') {
          if (selectedBodyType === 'EV') {
            if (!model.isEV) return false;
          } else if (selectedBodyType.toUpperCase() === 'HYBRID') {
            if (!model.isHybrid) return false;
          } else if (model.bodyType.toUpperCase() !== selectedBodyType.toUpperCase()) {
            return false;
          }
        }

        // Budget
        if (selectedBudget !== 'ALL') {
          if (selectedBudget === 'UNDER_10L' && model.priceRangeMin > 1000000) return false;
          if (selectedBudget === '10L_15L' && (model.priceRangeMin > 1500000 || model.priceRangeMax < 1000000)) return false;
          if (selectedBudget === '15L_20L' && (model.priceRangeMin > 2000000 || model.priceRangeMax < 1500000)) return false;
          if (selectedBudget === 'ABOVE_20L' && model.priceRangeMax < 2000000) return false;
        }

        // Fuel
        if (selectedFuel !== 'ALL' && !model.fuelTypes.some((f) => f.toUpperCase() === selectedFuel.toUpperCase())) {
          return false;
        }

        // Transmission
        if (selectedTransmission !== 'ALL') {
          if (selectedTransmission === 'AUTOMATIC') {
            if (!model.transmissions.some((t) => t !== 'Manual')) return false;
          } else if (selectedTransmission === 'MANUAL') {
            if (!model.transmissions.includes('Manual')) return false;
          }
        }

        // Seating
        if (selectedSeating !== 'ALL' && !model.seatingCapacities.includes(selectedSeating)) {
          return false;
        }

        // Makes
        if (selectedMakes.length > 0 && !selectedMakes.includes(model.makeId)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.priceRangeMin - b.priceRangeMin;
        if (sortBy === 'price_desc') return b.priceRangeMin - a.priceRangeMin;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount; // Popularity default
      });
  }, [initialModels, selectedBodyType, selectedBudget, selectedFuel, selectedTransmission, selectedSeating, selectedMakes, sortBy]);

  const group = (title:string, options:{id:string;label:string}[], selected:string, change:(value:string)=>void, tone='financial') => <div className="filter-group" data-tone={tone}><h3>{title}</h3><div className="filter-options">{options.map(option=><button key={option.id} data-tone={title==='Fuel'?option.id:tone} className="filter-option" aria-pressed={selected.toUpperCase()===option.id.toUpperCase()} onClick={()=>change(option.id)}>{option.label}</button>)}</div></div>;
  const filters = <>
    {group('Body type',['ALL','SUV','Sedan','Hatchback','MPV','Luxury','Hybrid','EV'].map(id=>({id,label:id==='ALL'?'Any type':id})),selectedBodyType,setSelectedBodyType)}
    {group('Budget',[{id:'ALL',label:'Any budget'},{id:'UNDER_10L',label:'Under ₹10L'},{id:'10L_15L',label:'₹10–15L'},{id:'15L_20L',label:'₹15–20L'},{id:'ABOVE_20L',label:'₹20L+'}],selectedBudget,setSelectedBudget)}
    {group('Fuel',['ALL','Petrol','Diesel','Electric','Hybrid','CNG'].map(id=>({id,label:id==='ALL'?'Any fuel':id})),selectedFuel,setSelectedFuel)}
    {group('Transmission',['ALL','AUTOMATIC','MANUAL'].map(id=>({id,label:id==='ALL'?'Any':id==='MANUAL'?'Manual':'Automatic'})),selectedTransmission,setSelectedTransmission,'technical')}
    {group('Seats',['ALL','5','7'].map(id=>({id,label:id==='ALL'?'Any':`${id} seats`})),String(selectedSeating),value=>setSelectedSeating(value==='ALL'?'ALL':Number(value)),'technical')}
    <div className="filter-group"><h3>Brand</h3><div className="brand-filters">{allMakes.map(make=><label key={make.id}><input type="checkbox" checked={selectedMakes.includes(make.id)} onChange={()=>toggleMake(make.id)}/>{make.name}</label>)}</div></div>
  </>;
  return <div className="kerb-shell discovery-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Explore cars</span></nav><header className="page-heading"><span className="eyebrow">The KERB car finder</span><h1>Explore cars in India.</h1><p>Compare prices, specifications, safety ratings and ownership data. Find what matters to you.</p></header><div className="discovery-layout"><aside className="discovery-filters" aria-label="Vehicle filters"><div className="filter-title"><strong>Refine your search</strong><button onClick={resetFilters}>Reset{activeFilterCount?` (${activeFilterCount})`:''}</button></div>{filters}</aside><div className="discovery-results"><div className="results-toolbar"><span aria-live="polite"><strong>{filteredModels.length}</strong> cars to explore</span><button className="filter-trigger action secondary" onClick={()=>filterDialog.current?.showModal()}>Filters {activeFilterCount>0?`(${activeFilterCount})`:'＋'}</button><label><span className="sr-only">Sort cars</span><select value={sortBy} onChange={e=>setSortBy(e.target.value as typeof sortBy)}><option value="popularity">Popularity</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="rating">Highest rating</option></select></label></div>{filteredModels.length ? <div className="vehicle-grid">{filteredModels.map((model,index)=><VehicleCard key={model.id} model={model} make={allMakes.find(make=>make.id===model.makeId)} priority={index<2}/>)}</div> : <div className="empty-results"><h2>No cars match these filters.</h2><p>Try a wider budget or a different body type.</p><button className="action secondary" onClick={resetFilters}>Reset filters</button></div>}</div></div><section className="chapter"><SectionHeader label="Compare your shortlist" title="A clearer view, side by side." description="Bring price, dimensions, powertrains and safety together in one table."/><div className="comparison-links">{[['creta,seltos','Hyundai Creta / Kia Seltos'],['nexon,grand-vitara','Tata Nexon / Grand Vitara'],['xuv700,creta','Mahindra XUV700 / Hyundai Creta']].map(([slugs,title])=><Link key={slugs} href={`/compare?cars=${slugs}`}>{title}<span>Compare →</span></Link>)}</div></section><section className="chapter"><SectionHeader label="Buyer’s notebook" title="Start with the questions that matter." tone="editorial"/><div className="editorial-lists"><div><h3>Budget beyond the showroom</h3><p className="muted">Include registration, insurance, fuel and maintenance in your shortlist. The on-road price and EMI tools in every vehicle dossier help you plan.</p><Link href="/emi-calculator" className="text-link">Explore the finance calculator →</Link></div><div><h3>Choose for your everyday drive</h3><p className="muted">Compare seating, boot space, safety equipment and powertrain options against your routine. Review the selected variant’s equipment before deciding.</p><Link href="/guides" className="text-link">Read the buying guides →</Link></div></div></section><dialog ref={filterDialog} className="filter-dialog" aria-label="Filter vehicles"><div className="dialog-top"><h2>Find your car</h2><button className="action secondary" onClick={()=>filterDialog.current?.close()}>Close ×</button></div>{filters}<div className="filter-dialog-actions"><button className="action secondary" onClick={resetFilters}>Reset</button><button className="action" onClick={()=>filterDialog.current?.close()}>Show {filteredModels.length} cars</button></div></dialog></div>;
};
export default CarListingView;
