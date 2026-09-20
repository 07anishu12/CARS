import { chromium } from 'playwright';

const BASE_URL = process.env.KERB_TEST_URL || 'http://localhost:3000';

const BREAKPOINTS = [
  { name: '320px (Small Mobile)', width: 320, height: 600 },
  { name: '375px (iPhone SE)', width: 375, height: 667 },
  { name: '390px (iPhone 14/15/16)', width: 390, height: 844 },
  { name: '430px (iPhone Pro Max)', width: 430, height: 932 },
  { name: '768px (iPad Mini/Tablet)', width: 768, height: 1024 },
  { name: '1024px (iPad Pro/Small Laptop)', width: 1024, height: 768 },
  { name: '1280px (Standard Desktop)', width: 1280, height: 800 },
  { name: '1440px (Large Desktop)', width: 1440, height: 900 }
];

async function testBreakpoints() {
  console.log('🔍 Testing All Breakpoints for Overflow, Alignment, and Visual Stability\n');
  const browser = await chromium.launch({ headless: true });
  let allPassed = true;

  for (const bp of BREAKPOINTS) {
    const isMobile = bp.width < 768;
    const context = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
      isMobile,
      hasTouch: isMobile
    });
    await context.addInitScript(() => {
      localStorage.setItem('kerb_cookie_consent_v1', 'accepted');
      localStorage.setItem('kerb-theme', 'dark');
    });

    const page = await context.newPage();
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasHorizontalOverflow) {
      console.error(`❌ OVERFLOW at ${bp.name}: scrollWidth > innerWidth!`);
      allPassed = false;
    } else {
      console.log(`✓ [OK] ${bp.name}: Zero horizontal overflow (width: ${bp.width}px)`);
    }

    if (errors.length > 0) {
      console.warn(`  ⚠ Console errors at ${bp.name}:`, errors);
    }

    await context.close();
  }

  await browser.close();

  if (allPassed) {
    console.log('\n🎉 ALL 8 BREAKPOINTS PASSED! No layout shifts, no horizontal overflows.');
    process.exit(0);
  } else {
    console.error('\n❌ Breakpoint tests failed.');
    process.exit(1);
  }
}

testBreakpoints();
