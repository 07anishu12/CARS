'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';
import { getVariantsByModel } from '../../lib/data/cars-db';
import { calculateEMI } from '../../lib/calculations/emi';
import { lakh, currency, specValue } from '../design/Primitives';
export interface VehicleCompareViewProps { allModels:CarModel[]; allMakes:Make[]; initialSelectedSlugs:string[]; }
export const VehicleCompareView:React.FC<VehicleCompareViewProps> = ({allModels,allMakes,initialSelectedSlugs}) => {
  const [slugs,setSlugs] = useState(()=> { const valid = Array.from(new Set(initialSelectedSlugs.filter(slug=>allModels.some(model=>model.slug===slug)))); return valid.length?valid.slice(0,3):allModels.slice(0,2).map(model=>model.slug); });
  const [differencesOnly,setDifferencesOnly] = useState(false);
  const cars=slugs.map(slug=>allModels.find(model=>model.slug===slug)!);
  const rows:{group:string;label:string;values:string[]}[] = [
    {group:'Price / financial',label:'Starting ex-showroom',values:cars.map(car=>`${lakh(car.priceRangeMin)} Lakh`)},
    {group:'Price / financial',label:'Estimated EMI¹',values:cars.map(car=>`${currency(calculateEMI(car.priceRangeMin*.8,9.5,60))} / month`)},
    {group:'Safety',label:'Crash rating',values:cars.map(car=>`${car.safetyRating.stars}★ ${car.safetyRating.agency}`)},
    {group:'Safety',label:'Airbags / base variant',values:cars.map(car=>String(getVariantsByModel(car.id)[0]?.airbags??'Data unavailable'))},
    {group:'Engine & performance',label:'Fuel options',values:cars.map(car=>car.fuelTypes.join(', '))},
    {group:'Engine & performance',label:'Engine',values:cars.map(car=>specValue(car,/engine type|motor type/i))},
    {group:'Engine & performance',label:'Power / base variant',values:cars.map(car=>{const v=getVariantsByModel(car.id)[0];return v?`${v.powerBhp} bhp`:'Data unavailable';})},
    {group:'Engine & performance',label:'Torque / base variant',values:cars.map(car=>{const v=getVariantsByModel(car.id)[0];return v?`${v.torqueNm} Nm`:'Data unavailable';})},
    {group:'Engine & performance',label:'Transmissions',values:cars.map(car=>car.transmissions.join(', '))},
    {group:'Efficiency',label:'Claimed mileage / range²',values:cars.map(car=>{const v=getVariantsByModel(car.id)[0];return v?.mileageKmpl?`${v.mileageKmpl} km/l`:v?.rangeKm?`${v.rangeKm} km`:'Data unavailable';})},
    ...['Length','Width','Height','Wheelbase','Ground Clearance','Boot'].map(label=>({group:'Dimensions & space',label,values:cars.map(car=>specValue(car,new RegExp(label,'i')))})),
    {group:'Dimensions & space',label:'Seats',values:cars.map(car=>car.seatingCapacities.join(', '))},
    {group:'Equipment',label:'Base variant features',values:cars.map(car=>getVariantsByModel(car.id)[0]?.keyFeatures.join(' · ')||'Data unavailable')},
    {group:'Equipment',label:'Warranty',values:cars.map(car=>specValue(car,/warranty/i))},
    {group:'Editorial',label:'Listed rating',values:cars.map(car=>`${car.rating} / 5`)},
    {group:'Editorial',label:'KERB assessment',values:cars.map(car=>car.kerbVerdict)}
  ];
  const groups=Array.from(new Set(rows.map(row=>row.group)));
  return <div className="kerb-shell compare-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Compare</span></nav><header className="page-heading"><span className="eyebrow">The comparison desk</span><h1>Small differences.<br/>Big decisions.</h1><p>Compare up to three cars. Prices, specifications and editorial context, in one clear view.</p></header><div className="compare-toolbar"><label><input type="checkbox" checked={differencesOnly} onChange={e=>setDifferencesOnly(e.target.checked)}/> Show differences only</label><span className="difference-key">≠ Different values</span>{cars.length<3 && <button className="action secondary" onClick={()=>{const next=allModels.find(model=>!slugs.includes(model.slug));if(next)setSlugs([...slugs,next.slug]);}}>＋ Add vehicle</button>}</div><p className="scroll-hint">Scroll across to compare all vehicles →</p><div className="table-scroll comparison-scroll" tabIndex={0} role="region" aria-label="Vehicle comparison table"><table className="comparison-table" style={{minWidth:180+cars.length*270}}><caption className="sr-only">Vehicle prices, safety, specifications and reviews</caption><colgroup><col className="attribute-column"/>{cars.map(car=><col key={car.id} style={{width:`${100/cars.length}%`}}/>)}</colgroup><thead><tr><th className="fixed-attribute"><span className="eyebrow">Your shortlist</span><p>{cars.length} vehicles</p></th>{cars.map((car,index)=>{const make=allMakes.find(item=>item.id===car.makeId);return <th key={car.id} className="comparison-car"><div className="compare-select"><select aria-label={`Vehicle ${index+1}`} value={car.slug} onChange={e=>setSlugs(slugs.map((slug,i)=>i===index?e.target.value:slug))}>{allModels.map(model=><option key={model.id} value={model.slug} disabled={slugs.includes(model.slug)&&model.slug!==car.slug}>{model.name}</option>)}</select>{cars.length>1 && <button aria-label={`Remove ${car.name}`} onClick={()=>setSlugs(slugs.filter((_,i)=>i!==index))}>×</button>}</div><Link className="comparison-photo" href={`/cars/${make?.slug}/${car.slug}`}><Image src={car.heroImage} alt={`${make?.name} ${car.name}`} fill sizes="350px"/></Link><h2>{make?.name} {car.name}</h2><p>{lakh(car.priceRangeMin)}–{lakh(car.priceRangeMax)} Lakh</p><Link className="text-link" href={`/cars/${make?.slug}/${car.slug}`}>View dossier ↗</Link></th>;})}</tr></thead><tbody>{groups.map(group=>{const groupRows=rows.filter(row=>row.group===group && (!differencesOnly || new Set(row.values).size>1));if(!groupRows.length)return null;return <React.Fragment key={group}><tr className="comparison-category" data-tone={group==='Safety'?'safety':group==='Efficiency'?'efficiency':group.startsWith('Price')?'financial':group==='Editorial'?'editorial':'technical'}><th className="fixed-attribute" scope="row">{group}</th>{cars.map(car=><td key={car.id}/>)}</tr>{groupRows.map(row=>{const different=new Set(row.values).size>1;return <tr key={row.label} className={different?'different-values':''}><th className="fixed-attribute" scope="row">{row.label}{different && <span className="diff-mark" aria-label="Different values"> ≠</span>}</th>{row.values.map((value,index)=><td key={index}>{value}</td>)}</tr>;})}</React.Fragment>;})}</tbody></table></div><p className="data-note">¹ Estimated at 20% down payment, 9.5% annual interest and a 5-year term; excludes on-road charges. ² Base variant manufacturer claims. Different test protocols and powertrains may not be directly comparable.</p><p className="data-note">Differences are highlighted for inspection and do not imply a better or worse choice.</p></div>;
};
export default VehicleCompareView;
