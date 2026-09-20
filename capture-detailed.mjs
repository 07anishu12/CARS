import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = '/tmp/kerb-mobile-screens';

async function captureDetailed() {
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
  await page.waitForTimeout(500);

  // 1. Budget Explorer + Brands
  const budgetEl = page.locator('#budget-explorer-title');
  if (await budgetEl.isVisible()) {
    await budgetEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/detail-budget-brands-compare.png` });
  }

  // 2. Research + Road tests + Lead capture
  const researchEl = page.locator('#research-title');
  if (await researchEl.isVisible()) {
    await researchEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/detail-research-roadtests-lead.png` });
  }

  // 3. Why KERB + Launches + Newsletter
  const whyKerbEl = page.locator('.why-kerb-section');
  if (await whyKerbEl.isVisible()) {
    await whyKerbEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/detail-whykerb-launches-newsletter.png` });
  }

  // 4. Quick nav list + App store + Footer
  const appDownloadEl = page.locator('.quick-nav-section');
  if (await appDownloadEl.isVisible()) {
    await appDownloadEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/detail-quicknav-appdownload-footer.png` });
  }

  await browser.close();
  console.log('Detailed captures saved!');
}

captureDetailed().catch(console.error);
