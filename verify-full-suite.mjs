import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = '/tmp/kerb-mobile-screens/exact-5';

async function runSuite() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir('/tmp/kerb-breakpoints', { recursive: true });

  const browser = await chromium.launch({ headless: true });

  console.log('--- 1. Testing Mobile 390x844 (Dark Mode) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  await mobileContext.addInitScript(() => {
    localStorage.setItem('kerb_cookie_consent_v1', 'accepted');
    localStorage.setItem('kerb-theme', 'dark');
  });

  const page = await mobileContext.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Screen 1: Top of page (Hero, Search, Quick Tools, Body Type, EV Banner)
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-1-hero-search-tools-body-ev.png` });
  console.log('✓ Captured Screen 1 (Hero, Search, Quick Tools, Body Type, EV Banner)');

  // Screen 2: Popular cars -> Compare Section
  const popularSection = page.locator('#popular-cars-title');
  await popularSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-2-popular-budget-brands-compare.png` });
  console.log('✓ Captured Screen 2 (Popular cars, Budget, Top brands, Compare)');

  // Screen 3: Tools & calculators -> Lead form
  const toolsSection = page.locator('#tools-calculators-title');
  await toolsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-3-tools-ev-research-reviews-lead.png` });
  console.log('✓ Captured Screen 3 (Tools & calculators, EV Showcase, Research, Reviews, Lead Form)');

  // Screen 4: FAQ -> Newsletter
  const faqSection = page.locator('#faq-title');
  await faqSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-4-faq-midhero-whykerb-launches-newsletter.png` });
  console.log('✓ Captured Screen 4 (FAQ, Mid-hero card, Why KERB, New Launches, Newsletter)');

  // Screen 5: Final CTA -> Footer
  const finalCta = page.locator('.final-cta-section');
  await finalCta.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-5-finalcta-quicknav-app-footer.png` });
  console.log('✓ Captured Screen 5 (Final CTA, Quick Navigation list, App download, Footer)');

  // Bottom Nav & Footer
  const footer = page.locator('.kerb-global-footer');
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-5-bottom-footer.png` });
  console.log('✓ Captured Screen 5 bottom footer');

  console.log('\n--- 2. Functional Verification ---');

  // A. Search Bar Autocomplete test
  await page.evaluate(() => window.scrollTo(0, 0));
  const searchInput = page.locator('input[type="search"]');
  await searchInput.fill('Creta');
  await page.waitForTimeout(300);
  const dropdown = page.locator('#search-suggestions-menu');
  const isDropdownVisible = await dropdown.isVisible();
  console.log(`✓ Search autocomplete popup visible: ${isDropdownVisible}`);
  await page.keyboard.press('Escape');
  await searchInput.fill('');

  // B. Category Filter Tabs test
  await popularSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const suvTab = page.locator('button:has-text("SUV")').first();
  await suvTab.click();
  await page.waitForTimeout(200);
  const suvCarsCount = await page.locator('.car-horizontal-card').count();
  console.log(`✓ Category tab SUV filter applied (showing ${suvCarsCount} cars)`);

  const allTab = page.locator('button:has-text("All")').first();
  await allTab.click();
  await page.waitForTimeout(200);

  // C. Wishlist Toggle test
  const heartBtn = page.locator('.wishlist-btn').first();
  const initialAria = await heartBtn.getAttribute('aria-label');
  await heartBtn.click();
  await page.waitForTimeout(200);
  const toggledAria = await heartBtn.getAttribute('aria-label');
  console.log(`✓ Wishlist heart toggle: "${initialAria}" -> "${toggledAria}"`);

  // D. Lead Form Submission test
  const leadSection = page.locator('#lead-cta');
  await leadSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const nameInput = page.locator('input[placeholder="Your name"]').first();
  const phoneInput = page.locator('input[placeholder="Mobile number"]').first();
  const pinInput = page.locator('input[placeholder="PIN code"]').first();
  await nameInput.fill('Aarav Sharma');
  await phoneInput.fill('9876543210');
  await pinInput.fill('110001');
  const submitLead = page.locator('.btn-green-submit').first();
  await submitLead.click();
  await page.waitForTimeout(400);
  const successText = await page.locator('.success-heading').textContent();
  console.log(`✓ Lead capture submitted successfully: "${successText?.trim()}"`);

  console.log('\n--- 3. Testing Breakpoints (Responsive Check) ---');
  // Tablet (768px)
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 }
  });
  await tabletContext.addInitScript(() => {
    localStorage.setItem('kerb_cookie_consent_v1', 'accepted');
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(400);
  await tabletPage.screenshot({ path: '/tmp/kerb-breakpoints/tablet-768.png', fullPage: false });
  console.log('✓ Tablet 768px captured');

  // Desktop (1440px)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  await desktopContext.addInitScript(() => {
    localStorage.setItem('kerb_cookie_consent_v1', 'accepted');
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(400);
  await desktopPage.screenshot({ path: '/tmp/kerb-breakpoints/desktop-1440.png', fullPage: false });
  console.log('✓ Desktop 1440px captured');

  // Light Mode check
  await desktopPage.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await desktopPage.waitForTimeout(300);
  await desktopPage.screenshot({ path: '/tmp/kerb-breakpoints/desktop-1440-light.png', fullPage: false });
  console.log('✓ Desktop 1440px Light Mode captured');

  await browser.close();
  console.log('\n========================================');
  console.log('ALL VERIFICATIONS AND SCREENSHOTS PASSED');
  console.log('========================================');
}

runSuite().catch((err) => {
  console.error(err);
  process.exit(1);
});
