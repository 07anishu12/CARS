import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/Users/anny/.gemini/antigravity-cli/brain/db8d90ec-1f4e-45b0-9546-09fe4e13fcab';

async function runQA() {
  console.log('QA: Launching headless browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('QA: Navigating to local site...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Allow skeletons to settle and load initial chunks

  // Page starts in default (Dark Theme)
  console.log('QA: Capturing Default (Dark) Viewport...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_dark.png'), fullPage: true });

  // Cycle once: Dark -> Luxury
  console.log('QA: Cycling theme to Luxury...');
  await page.click('button[aria-label="Cycle theme colors"]');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_luxury.png'), fullPage: true });

  // Cycle twice: Luxury -> Light
  console.log('QA: Cycling theme to Light...');
  await page.click('button[aria-label="Cycle theme colors"]');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_light.png'), fullPage: true });

  // Reset to default (Dark) by cycling once more
  console.log('QA: Cycling theme back to Dark...');
  await page.click('button[aria-label="Cycle theme colors"]');
  await page.waitForTimeout(600);

  // 4. Scroll Nav morph test
  console.log('QA: Testing Sticky Nav Morph...');
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(1000); // Let morph transition complete
  const headerHeight = await page.$eval('header', el => el.clientHeight);
  console.log(`QA: Scrolled header height resolved to: ${headerHeight}px`);
  
  // Scroll back
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // 5. Test tablet viewport
  console.log('QA: Capturing Tablet viewport...');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'tablet_light.png'), fullPage: true });

  // 6. Test mobile viewport
  console.log('QA: Capturing Mobile viewport...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_light.png'), fullPage: true });

  // 7. Interactive components validation with SCROLL/HYDRATION checks
  console.log('QA: Scrolling to FAQ block to trigger lazy load...');
  await page.locator('#faq-title').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500); // Wait for FAQ component to load and hydrate

  console.log('QA: Testing FAQ accordion button...');
  await page.click('#faq-summary-0');
  await page.waitForTimeout(800);
  const isFAQExpanded = await page.$eval('#faq-summary-0', el => el.getAttribute('aria-expanded'));
  console.log(`QA: FAQ Accordion 1 Expanded status: ${isFAQExpanded}`);

  console.log('QA: Scrolling to Dashboard to trigger lazy load...');
  await page.locator('h2:has-text("Your Automotive Dashboard")').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500); // Wait for Dashboard component to load and hydrate

  console.log('QA: Testing Compare selections inside Dashboard...');
  // Choose Tata Nexon & Hyundai Creta by value (slugs)
  await page.selectOption('#dash-compare-a', 'tata-nexon');
  await page.selectOption('#dash-compare-b', 'hyundai-creta');
  await page.waitForTimeout(800);
  
  const isCompareReady = await page.isVisible('text=A: Tata Nexon');
  console.log(`QA: Compare text results visible inside Compare Card: ${isCompareReady}`);

  console.log('QA: Execution verification pass finished successfully.');
  await browser.close();
}

runQA().catch(err => {
  console.error('QA: Verification loop encountered error:', err);
  process.exit(1);
});
