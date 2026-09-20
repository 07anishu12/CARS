'use client';

import { useState, useMemo } from 'react';
import { Car } from '../types';

export const useCompare = (cars: Car[] = []) => {
  const [carASlug, setCarASlug] = useState<string>('');
  const [carBSlug, setCarBSlug] = useState<string>('');

  const carA = useMemo(() => cars.find(c => c.slug === carASlug) || null, [cars, carASlug]);
  const carB = useMemo(() => cars.find(c => c.slug === carBSlug) || null, [cars, carBSlug]);

  const setCarA = (slug: string) => {
    if (slug && slug === carBSlug) {
      setCarBSlug(''); // Prevent duplicate selections
    }
    setCarASlug(slug);
  };

  const setCarB = (slug: string) => {
    if (slug && slug === carASlug) {
      setCarASlug(''); // Prevent duplicate selections
    }
    setCarBSlug(slug);
  };

  const canCompare = useMemo(() => !!(carA && carB), [carA, carB]);

  const resetCompare = () => {
    setCarASlug('');
    setCarBSlug('');
  };

  return {
    carASlug,
    carBSlug,
    carA,
    carB,
    setCarA,
    setCarB,
    canCompare,
    resetCompare
  };
};

export default useCompare;
