import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = process.env.KERB_TEST_URL || 'http://localhost:3000';
const dir = '/tmp/kerb-audit-shots';

async function runAudit() {
  await fs.mkdir(dir, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  // 1. Mobile 390px Hero area
  const mContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  await mContext.addInitScript(() => {
    localStorage.setItem('kerb_cookie_consent_v1', 'accepted');
    localStorage.setItem('kerb-theme', 'dark');
  });
  const mPage = await mContext.newPage();
  await mPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mPage.screenshot({ path: `${dir}/mobile-top-hero.png`, clip: { x: 0, y: 0, width: 390, height: 844 } });

  // 2. Desktop full page screenshots in Dark and Light modes
  const dContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await dContext.addInitScript(() => {
    localStorage.setItem('kerb_cookie_consent_v1', 'accepted');
    localStorage.setItem('kerb-theme', 'dark');
  });
  const dPage = await dContext.newPage();
  await dPage.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Full page dark
  await dPage.screenshot({ path: `${dir}/desktop-dark-fullpage.png`, fullPage: true });

  // Switch to light
  await dPage.locator('header button[title*="Switch to"]').click();
  await dPage.waitForTimeout(300);
  await dPage.screenshot({ path: `${dir}/desktop-light-fullpage.png`, fullPage: true });

  console.log('Audits captured in', dir);
  await browser.close();
}

runAudit();
