import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = '/tmp/kerb-mobile-screens';

async function capture() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  // Mobile viewport matching iPhone 14 / 15 Pro (390 x 844)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  await context.addInitScript(() => {
    localStorage.setItem('kerb_cookie_consent_v1', 'accepted');
    localStorage.setItem('kerb-theme', 'dark');
  });

  const page = await context.newPage();
  console.log('Navigating to', BASE_URL);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Full page screenshot
  await page.screenshot({ path: `${OUT_DIR}/full-mobile-page.png`, fullPage: true });
  console.log('Saved full-mobile-page.png');

  // Screen 1: Top of page (0 to 844px)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/screen-1-hero-tools.png` });
  console.log('Saved screen-1-hero-tools.png');

  // Screen 2: Popular cars & brands (~800px)
  const popularSection = page.locator('#popular-cars-title');
  if (await popularSection.isVisible()) {
    await popularSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT_DIR}/screen-2-popular-budget-brands.png` });
    console.log('Saved screen-2-popular-budget-brands.png');
  }

  // Screen 3: Tools & calculators (~1600px)
  const toolsSection = page.locator('#tools-calculators-title');
  if (await toolsSection.isVisible()) {
    await toolsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT_DIR}/screen-3-tools-research-lead.png` });
    console.log('Saved screen-3-tools-research-lead.png');
  }

  // Screen 4: FAQs & Why KERB
  const faqSection = page.locator('#faq-title');
  if (await faqSection.isVisible()) {
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT_DIR}/screen-4-faq-whykerb-launches.png` });
    console.log('Saved screen-4-faq-whykerb-launches.png');
  }

  // Screen 5: Pre-footer & Footer
  const finalCta = page.locator('.final-cta-section');
  if (await finalCta.isVisible()) {
    await finalCta.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT_DIR}/screen-5-finalcta-nav-footer.png` });
    console.log('Saved screen-5-finalcta-nav-footer.png');
  }

  await browser.close();
  console.log('Done capturing screenshots!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
