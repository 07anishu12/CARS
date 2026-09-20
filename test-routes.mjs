import http from 'http';

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.KERB_TEST_URL || `http://localhost:${PORT}`;

const routesToTest = [
  { path: '/', expected: 200, name: 'Homepage' },
  { path: '/cars', expected: 200, name: 'All Cars Listing' },
  { path: '/cars/tata', expected: 200, name: 'Brand Page (Tata)' },
  { path: '/cars/tata/nexon', expected: 200, name: 'Showroom Detail Page (Tata Nexon)' },
  { path: '/cars/tata/nexon/delhi', expected: 200, name: 'City Pricing Page (Delhi)' },
  { path: '/cars/hyundai/creta', expected: 200, name: 'Showroom Detail Page (Hyundai Creta)' },
  { path: '/cars/hyundai/creta/mumbai', expected: 200, name: 'City Pricing Page (Mumbai)' },
  { path: '/cars/suv', expected: 200, name: 'Category Page (SUV)' },
  { path: '/cars/electric', expected: 200, name: 'Category Page (Electric)' },
  { path: '/cars/hybrid', expected: 200, name: 'Category Page (Hybrid)' },
  { path: '/cars/under-10-lakh', expected: 200, name: 'Budget Page (Under 10 Lakh)' },
  { path: '/compare', expected: 200, name: 'Compare Tool' },
  { path: '/compare?cars=nexon,creta', expected: 200, name: 'Compare Cars' },
  { path: '/emi-calculator', expected: 200, name: 'EMI Calculator' },
  { path: '/ai-advisor', expected: 200, name: 'AI Advisor' },
  { path: '/guides', expected: 200, name: 'Guides Hub' },
  { path: '/search?q=creta', expected: 200, name: 'Search Query' },
  { path: '/new-cars', expected: 200, name: 'New Cars Hub' },
  { path: '/privacy', expected: 200, name: 'Privacy Policy' },
  { path: '/privacy/data-request', expected: 200, name: 'Data Request Self-Serve' },
  { path: '/sitemap.xml', expected: 200, name: 'Dynamic XML Sitemap' },
  { path: '/robots.txt', expected: 200, name: 'Robots.txt' },
];

function fetchRoute(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('--- Starting KERB Route & SEO Verification Suite ---');
  let passed = 0;
  let failed = 0;

  for (const route of routesToTest) {
    try {
      const res = await fetchRoute(route.path);
      if (res.statusCode === route.expected) {
        console.log(`✓ [${res.statusCode}] ${route.name} -> ${route.path}`);
        
        // Basic SEO verification for HTML pages
        if (route.path.endsWith('.xml') || route.path.endsWith('.txt')) {
          // OK
        } else {
          const hasTitle = res.body.includes('<title>');
          const hasCanonical = res.body.includes('rel="canonical"');
          const hasMobileNav = res.body.includes('aria-label="Mobile Navigation Bar"');
          
          if (!hasTitle) console.warn(`  ⚠ Warning: Missing <title> on ${route.path}`);
          if (!hasCanonical) console.warn(`  ⚠ Warning: Missing canonical tag on ${route.path}`);
        }
        passed++;
      } else {
        console.error(`✗ [${res.statusCode} != ${route.expected}] ${route.name} -> ${route.path}`);
        failed++;
      }
    } catch (err) {
      console.error(`✗ ERROR on ${route.path}:`, err.message);
      failed++;
    }
  }

  console.log('----------------------------------------------------');
  console.log(`Verification Complete: ${passed} passed, ${failed} failed.`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

// Wait 1 second before starting to ensure server is ready
setTimeout(runTests, 1000);
