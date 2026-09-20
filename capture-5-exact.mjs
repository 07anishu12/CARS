import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = '/tmp/kerb-mobile-screens/exact-5';

async function capture5Exact() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });

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
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Screen 1: Top of page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-1-hero-search-tools-body-ev.png` });
  console.log('Saved col-1-hero-search-tools-body-ev.png');

  // Screen 2: Popular cars -> Compare section
  const popularSection = page.locator('#popular-cars-title');
  await popularSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-2-popular-budget-brands-compare.png` });
  console.log('Saved col-2-popular-budget-brands-compare.png');

  // Screen 3: Tools & calculators -> Lead form
  const toolsSection = page.locator('#tools-calculators-title');
  await toolsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-3-tools-ev-research-reviews-lead.png` });
  console.log('Saved col-3-tools-ev-research-reviews-lead.png');

  // Screen 4: FAQs -> Newsletter
  const faqSection = page.locator('#faq-title');
  await faqSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-4-faq-midhero-whykerb-launches-newsletter.png` });
  console.log('Saved col-4-faq-midhero-whykerb-launches-newsletter.png');

  // Screen 5: Final CTA -> Footer
  const finalCta = page.locator('.final-cta-section');
  await finalCta.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-5-finalcta-quicknav-app-footer.png` });
  console.log('Saved col-5-finalcta-quicknav-app-footer.png');

  // Also capture scrolled to bottom for full footer
  const footer = page.locator('.kerb-global-footer');
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/col-5-bottom-footer.png` });
  console.log('Saved col-5-bottom-footer.png');

  await browser.close();
  console.log('All 5 column screenshots successfully captured!');
}

capture5Exact().catch((e) => {
  console.error(e);
  process.exit(1);
});
