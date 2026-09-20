import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';
import { getAllModels, getAllMakes } from '../../lib/data/cars-db';
import { VehicleCard } from '../../components/design/Primitives';
export interface SearchPageProps { searchParams:{ q?:string; budget?:string; bodyType?:string; fuelType?:string; transmission?:string }; }
export async function generateMetadata({searchParams}:SearchPageProps):Promise<Metadata> {
  const query=searchParams.q||'';
  return {title:query?`Search results for “${query}” | KERB`:'Search cars | KERB',description:`Explore cars, prices, specifications and variants matching “${query}” on KERB.`,alternates:{canonical:'https://kerb.com/search'}};
}
export default function SearchPage({searchParams}:SearchPageProps) {
  const query=(searchParams.q||'').toLowerCase().trim(); const models=getAllModels(); const makes=getAllMakes();
  const budgetMatch=query.match(/(?:under|below|up to)\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lac|l)/i);
  const words=(budgetMatch?query.replace(budgetMatch[0],''):query).replace(/\b(cars?|in india)\b/g,'').trim().split(/\s+/).filter(Boolean);
  const results=models.filter(model=>{
    const make=makes.find(make=>make.id===model.makeId);
    const corpus=`${make?.name} ${model.name} ${model.bodyType} ${model.fuelTypes.join(' ')} ${model.transmissions.join(' ')} ${model.kerbVerdict}`.toLowerCase();
    if(budgetMatch && model.priceRangeMin>Number(budgetMatch[1])*100000)return false;
    if(searchParams.bodyType && model.bodyType.toLowerCase()!==searchParams.bodyType.toLowerCase())return false;
    if(searchParams.fuelType && !model.fuelTypes.some(fuel=>fuel.toLowerCase()===searchParams.fuelType?.toLowerCase()))return false;
    if(searchParams.transmission==='Manual' && !model.transmissions.includes('Manual'))return false;
    if(searchParams.transmission==='Automatic' && !model.transmissions.some(transmission=>transmission!=='Manual'))return false;
    if(searchParams.budget==='0-10' && model.priceRangeMin>1000000)return false;
    if(searchParams.budget==='10-20' && (model.priceRangeMax<1000000||model.priceRangeMin>2000000))return false;
    if(searchParams.budget==='20+' && model.priceRangeMax<2000000)return false;
    return words.every(word=>corpus.includes(word));
  });
  return <main><StickyNav/><div className="kerb-shell search-results"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Search</span></nav><header className="page-heading"><span className="eyebrow">Search the catalogue</span><h1>{query?`Results for “${searchParams.q}”`:'Explore the possibilities.'}</h1><p>{results.length} matching {results.length===1?'vehicle':'vehicles'}</p><form action="/search" className="home-search"><label htmlFor="results-search" className="sr-only">Search car, brand or budget</label><input id="results-search" name="q" defaultValue={searchParams.q} placeholder="Search car, brand or budget"/><button aria-label="Search cars">↗</button></form></header><section className="chapter"><div className="vehicle-grid">{results.map(model=><VehicleCard key={model.id} model={model} make={makes.find(make=>make.id===model.makeId)}/>)}</div>{!results.length && <div className="empty-results"><h2>No cars matched your search.</h2><p>Try a brand, model, body style, fuel type or budget such as “under 10 lakh”.</p><Link href="/cars" className="action secondary">Browse all cars →</Link></div>}</section></div><Footer/></main>;
}
