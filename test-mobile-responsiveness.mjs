import { chromium } from 'playwright';
import { spawn } from 'child_process';

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.KERB_TEST_URL || `http://localhost:${PORT}`;

const VIEWPORTS = [
  { width: 320, height: 568, name: '320px (iPhone SE 1st gen)' },
  { width: 360, height: 640, name: '360px (Android Small)' },
  { width: 375, height: 667, name: '375px (iPhone SE/6/7/8)' },
  { width: 390, height: 844, name: '390px (iPhone 12/13/14)' },
  { width: 414, height: 896, name: '414px (iPhone XR/11 Plus)' },
  { width: 430, height: 932, name: '430px (iPhone 14/15 Pro Max)' },
  { width: 768, height: 1024, name: '768px (iPad Mini/Tablet)' },
  { width: 1024, height: 768, name: '1024px (iPad Pro/Laptop)' },
  { width: 1280, height: 800, name: '1280px (MacBook 13")' },
  { width: 1440, height: 900, name: '1440px (Desktop Wide)' }
];

const URLS_TO_TEST = [
  '/',
  '/cars',
  '/new-cars',
  '/cars/tata/nexon',
  '/cars/tata/nexon/delhi',
  '/emi-calculator',
  '/ai-advisor',
  '/compare'
];

async function run() {
  console.log('Launching Playwright headless browser for mobile-first viewport audit on port 3001...');
  const browser = await chromium.launch({ headless: true });
  let overflowErrors = 0;

  try {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      console.log(`\nTesting Viewport: ${vp.name} [${vp.width}x${vp.height}]`);

      for (const path of URLS_TO_TEST) {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(300);

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          return {
            hasOverflow: docWidth > winWidth,
            docWidth,
            winWidth
          };
        });

        if (overflow.hasOverflow) {
          console.error(`  ✗ OVERFLOW DETECTED on ${path} at ${vp.width}px! (scrollWidth: ${overflow.docWidth}px, innerWidth: ${overflow.winWidth}px)`);
          overflowErrors++;
        } else {
          console.log(`  ✓ OK: ${path} (Width: ${overflow.winWidth}px, Scroll: ${overflow.docWidth}px)`);
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log('\n=============================================');
  if (overflowErrors === 0) {
    console.log('🎉 PASSED: Zero horizontal overflow across all 10 target viewports (320px to 1440px)!');
    process.exit(0);
  } else {
    console.error(`❌ FAILED: Found ${overflowErrors} overflow instances.`);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
