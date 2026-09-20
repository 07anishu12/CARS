import React from 'react';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';
import { VehicleCard } from '../../components/design/Primitives';
import { getAllModels, getAllMakes } from '../../lib/data/cars-db';

export default function ExplorePage() {
  const models = getAllModels();
  const makes = getAllMakes();
  
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StickyNav />
      <div className="kerb-shell" style={{ flex: 1, padding: '2rem 0' }}>
        <h1 className="page-heading" style={{ marginBottom: '2rem' }}>Explore All Cars</h1>
        <div className="vehicle-grid">
          {models.map(model => (
            <VehicleCard key={model.id} model={model} make={makes.find(m => m.id === model.makeId)} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
