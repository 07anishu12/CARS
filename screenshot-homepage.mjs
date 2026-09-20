import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = process.env.KERB_TEST_URL || 'http://localhost:3000';
const dir = '/tmp/kerb-visual-qa';

async function capture() {
  await fs.mkdir(dir, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    await context.addInitScript(() => localStorage.setItem('kerb_cookie_consent_v1', 'accepted'));
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Capture Hero area
    await page.screenshot({ path: `${dir}/${vp.name}-hero.png`, clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) } });
    console.log(`Captured ${dir}/${vp.name}-hero.png`);
  }

  await browser.close();
}

capture();
