import { mockCars } from './cars';

export const mockNewLaunches = mockCars.filter(car => car.isNewLaunch);
