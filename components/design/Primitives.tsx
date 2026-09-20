import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CarModel, Make, SpecificationItem } from '../../types/vehicle';

export const currency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
export const lakh = (value: number) => `₹${(value / 100000).toFixed(2)}`;
export const specValue = (model: CarModel, pattern: RegExp) => {
  const item = model.specifications.flatMap(group => group.items).find(item => pattern.test(item.name));
  return item ? `${item.value}${item.unit ? ` ${item.unit}` : ''}` : 'Data unavailable';
};
export function SectionHeader({ index, label, title, description, id, tone = 'technical' }: { index?: string; label: string; title: string; description?: string; id?: string; tone?: string }) {
  return <header className="chapter-heading" data-tone={tone}><div className="eyebrow">{index && <span>{index} / </span>}{label}</div><h2 id={id}>{title}</h2>{description && <p>{description}</p>}</header>;
}
export function MetricStrip({ items }: { items: { label: string; value: React.ReactNode; tone?: string; note?: string }[] }) {
  return <dl className="metric-strip">{items.map(item => <div key={item.label} data-tone={item.tone || 'technical'}><dt>{item.label}</dt><dd>{item.value}</dd>{item.note && <small>{item.note}</small>}</div>)}</dl>;
}
export function SpecTable({ title, items }: { title: string; items: SpecificationItem[] }) {
  return <div className="spec-group"><h3><span aria-hidden="true">⌖</span> {title}</h3><table className="datasheet"><caption className="sr-only">{title}</caption><tbody>{items.map(item => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.value || 'Data unavailable'}{item.unit && ` ${item.unit}`}</td></tr>)}</tbody></table></div>;
}
export function InteractiveSlider({ id, label, value, display, min, max, step = 1, onChange }: { id: string; label: string; value: number; display: string; min: number; max: number; step?: number; onChange: (value: number) => void }) {
  return <div className="slider-field"><label htmlFor={id}>{label}<output htmlFor={id}>{display}</output></label><input id={id} type="range" value={value} min={min} max={max} step={step} onChange={e => onChange(Number(e.target.value))} /></div>;
}
export function VehicleCard({ model, make, priority = false }: { model: CarModel; make?: Make; priority?: boolean }) {
  const href = `/cars/${make?.slug}/${model.slug}`;
  return <article className="vehicle-preview"><Link href={href} className="vehicle-photo"><Image src={model.heroImage} alt={`${make?.name || ''} ${model.name}`} fill priority={priority} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 420px" /></Link><div className="vehicle-meta"><span className="eyebrow">{model.bodyType} / {model.fuelTypes.join(' · ')}</span><div className="vehicle-name"><h3><Link href={href}>{make?.name} {model.name}</Link></h3><span className="rating">★ {model.rating}</span></div><div className="vehicle-price">{lakh(model.priceRangeMin)}–{lakh(model.priceRangeMax)} <small>Lakh</small></div><small className="muted">Ex-showroom</small><div className="vehicle-facts"><span>{model.safetyRating.stars}★ {model.safetyRating.agency}</span><span>{model.seatingCapacities.join('/')} seats</span></div><div className="vehicle-actions"><Link href={href}>View details <span>↗</span></Link><Link href={`/compare?cars=${model.slug}`}>＋ Compare</Link></div></div></article>;
}
