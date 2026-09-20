import { mockCars } from './cars';

export const mockTrendingCars = mockCars.filter(car => car.isTrending);
export const mockTrendingCategories = ['All', 'SUV', 'Sedan', 'Hatchback'];
