import { MetadataRoute } from 'next';
import { getAllModels, getAllMakes, getAllCities } from '../lib/data/cars-db';
import { CATEGORIES_DATA } from '../lib/data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kerb.com';
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/emi-calculator`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-advisor`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const makes = getAllMakes();
  const models = getAllModels();
  const cities = getAllCities();

  // Brands / Makes
  for (const make of makes) {
    entries.push({
      url: `${baseUrl}/cars/${make.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Categories & Budgets
  for (const catSlug of Object.keys(CATEGORIES_DATA)) {
    entries.push({
      url: `${baseUrl}/cars/${catSlug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Models (Digital Showrooms) & City-specific pricing pages
  for (const model of models) {
    const make = makes.find((m) => m.id === model.makeId);
    if (!make) continue;

    entries.push({
      url: `${baseUrl}/cars/${make.slug}/${model.slug}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    for (const topic of ['specs','images','price','reviews','variants','mileage','safety']) {
      entries.push({ url:`${baseUrl}/cars/${make.slug}/${model.slug}/${topic}`,lastModified,changeFrequency:'weekly',priority:0.8 });
    }
    for (const city of cities) {
      entries.push({
        url: `${baseUrl}/cars/${make.slug}/${model.slug}/${city.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
