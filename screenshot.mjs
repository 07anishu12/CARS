import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = '/Users/anny/.gemini/antigravity/brain/e7a09b54-3436-47df-814b-a0cb772e4886';
const SCREENSHOT_PATH = path.join(ARTIFACT_DIR, 'current_state.png');

async function run() {
  console.log('Launching headless browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
  } catch (e) {
    console.log('Network idle wait timed out, continuing anyway...', e.message);
  }
  
  await page.waitForTimeout(2000); // Allow skeletons to settle
  
  console.log('Setting viewport size to 1440x900...');
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Scrolling down to trigger reveal animations...');
  // Scroll down incrementally
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 0; i < scrollHeight; i += 300) {
    await page.evaluate((y) => window.scrollTo(0, y), i);
    await page.waitForTimeout(100);
  }
  
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000); // Let transitions finish

  console.log(`Taking full-page screenshot to ${SCREENSHOT_PATH}...`);
  await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });

  console.log('Done!');
  await browser.close();
}

run().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
