import React from 'react';
import StickyNav from '../../../components/StickyNav';
import Footer from '../../../components/Footer';
import { VehicleCard } from '../../../components/design/Primitives';
import { getAllModels, getAllMakes, getVariantsByModel } from '../../../lib/data/cars-db';

export interface CategoryPageProps {
  params: { slug: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const models = getAllModels();
  const makes = getAllMakes();
  const slug = params.slug.toLowerCase();
  
  const filteredModels = models.filter(model => {
    if (slug === 'suvs' && model.bodyType === 'SUV') return true;
    if (slug === 'sedans' && model.bodyType === 'Sedan') return true;
    if (slug === 'hatchbacks' && model.bodyType === 'Hatchback') return true;
    if (slug === 'electric' && model.fuelTypes?.includes('Electric')) return true;
    if (slug === 'luxury' && model.isLuxury) return true;
    if (slug === 'under-10l' && model.priceRangeMax <= 1000000) return true;
    if (slug === '7-seaters' && model.seatingCapacities?.includes(7)) return true;
    if (slug === 'fuel-efficient') return true;
    if (model.bodyType.toLowerCase() === slug) return true;
    
    return false;
  });

  if (slug === 'fuel-efficient') {
    filteredModels.sort((a, b) => {
      const aMileage = Math.max(...getVariantsByModel(a.id).map(v => v.mileageKmpl || 0), 0);
      const bMileage = Math.max(...getVariantsByModel(b.id).map(v => v.mileageKmpl || 0), 0);
      return bMileage - aMileage;
    });
  }

  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StickyNav />
      <div className="kerb-shell" style={{ flex: 1, padding: '2rem 0' }}>
        <h1 className="page-heading" style={{ marginBottom: '2rem' }}>{categoryName} Cars</h1>
        <div className="vehicle-grid">
          {filteredModels.map(model => (
            <VehicleCard key={model.id} model={model} make={makes.find(m => m.id === model.makeId)} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
