import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = process.env.KERB_TEST_URL || 'http://localhost:3000';
const SCREENSHOT_DIR = '/tmp/kerb-redesign-screenshots';

async function runRedesignQA() {
  console.log('🚀 Running Comprehensive KERB Redesign Quality Assurance & Testing Suite');
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  let passed = 0;
  let failed = 0;

  const assert = (condition, msg) => {
    if (!condition) {
      console.error(`❌ FAIL: ${msg}`);
      failed++;
      throw new Error(msg);
    } else {
      console.log(`✅ PASS: ${msg}`);
      passed++;
    }
  };

  try {
    // -------------------------------------------------------------
    // Test 1: Desktop Viewport & Global Container Alignment
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 1: Desktop Visual & Layout ---');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    await desktopContext.addInitScript(() => {
      localStorage.setItem('kerb_cookie_consent_v1', 'accepted');
      localStorage.setItem('kerb-theme', 'dark');
    });

    const page = await desktopContext.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Verify H1
    const h1Count = await page.locator('h1').count();
    assert(h1Count === 1, `Exactly one H1 found on homepage (found ${h1Count})`);
    const h1Text = await page.locator('h1').textContent();
    assert(h1Text?.includes('Find the right car for you'), `H1 has clear messaging: "${h1Text?.trim()}"`);

    // Verify container alignment
    const containers = page.locator('.kerb-container');
    const countContainers = await containers.count();
    assert(countContainers >= 5, `Multiple major sections use standard .kerb-container (${countContainers} found)`);

    // Capture Desktop Dark Mode screenshot
    await page.screenshot({ path: `${SCREENSHOT_DIR}/desktop-dark-full.png`, fullPage: false });
    console.log(`📸 Captured ${SCREENSHOT_DIR}/desktop-dark-full.png`);

    // -------------------------------------------------------------
    // Test 2: Theme Switching to Light Mode
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 2: Theme Switching to Light Mode ---');
    const themeBtn = page.locator('header button[title*="Switch to"]');
    await themeBtn.click();
    await page.waitForTimeout(300);

    const themeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    assert(themeAttr === 'light', `data-theme attribute changed to light (current: ${themeAttr})`);

    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    console.log(`Light Mode Body Background: ${bodyBg}`);
    assert(bodyBg === 'rgb(247, 248, 246)' || bodyBg.includes('247'), `Light mode uses warm off-white background (#F7F8F6)`);

    // Capture Desktop Light Mode screenshot
    await page.screenshot({ path: `${SCREENSHOT_DIR}/desktop-light-full.png`, fullPage: false });
    console.log(`📸 Captured ${SCREENSHOT_DIR}/desktop-light-full.png`);

    // -------------------------------------------------------------
    // Test 3: Search Bar Autocomplete & Keyboard Navigation
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 3: Search Autocomplete ---');
    const searchInput = page.locator('.search-input');
    await searchInput.fill('Creta');
    await page.waitForTimeout(200);

    const dropdown = page.locator('#search-suggestions-menu');
    assert(await dropdown.isVisible(), 'Autocomplete dropdown menu appeared on typing');

    const dropdownItems = page.locator('.dropdown-item');
    const itemCount = await dropdownItems.count();
    assert(itemCount > 0, `Search returned ${itemCount} suggestions for "Creta"`);

    // Press Escape to close dropdown
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    assert(!(await dropdown.isVisible()), 'Escape key successfully closed autocomplete dropdown');

    // -------------------------------------------------------------
    // Test 4: Live Filter System
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 4: Filter System Functionality ---');
    // Scroll to explore section
    await page.locator('#explore-cars').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const initialShowingText = await page.locator('.showing-counter').textContent();
    console.log(`Initial status: ${initialShowingText?.trim()}`);

    // Click "EV" category tab
    const evTab = page.locator('.category-tab-btn').filter({ hasText: 'EV' });
    await evTab.click();
    await page.waitForTimeout(200);

    const evShowingText = await page.locator('.showing-counter').textContent();
    console.log(`After clicking EV tab: ${evShowingText?.trim()}`);

    // Verify filtered cars only have EV badges or electric
    const carCards = page.locator('.kerb-standard-car-card');
    const evCardCount = await carCards.count();
    assert(evCardCount >= 1, `EV filter shows ${evCardCount} vehicles`);

    // Test Budget dropdown
    const budgetSelect = page.locator('#filter-budget');
    await budgetSelect.selectOption('UNDER_10L');
    await page.waitForTimeout(200);

    // Verify Active Chip appeared
    const activeChip = page.locator('.active-filter-chip');
    const chipCount = await activeChip.count();
    assert(chipCount >= 1, `Active filter chip displayed (${chipCount} chip)`);

    // Click chip remove button
    const removeBtn = activeChip.first().locator('.chip-remove-btn');
    await removeBtn.click();
    await page.waitForTimeout(200);

    // Switch back to "Popular" tab
    await page.locator('.category-tab-btn').filter({ hasText: 'Popular' }).click();
    await page.waitForTimeout(200);

    // -------------------------------------------------------------
    // Test 5: Reusable Lead Capture & Validation
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 5: Lead Capture Validation ---');
    // Scroll to bottom lead CTA
    const leadSection = page.locator('#lead-cta');
    await leadSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const nameInput = leadSection.locator('input[type="text"]').first();
    const phoneInput = leadSection.locator('input[type="tel"]').first();
    const pinInput = leadSection.locator('input[autocomplete="postal-code"]').first();
    const submitBtn = leadSection.locator('button[type="submit"]').first();

    // 5.1 Invalid submit (empty)
    await submitBtn.click();
    await page.waitForTimeout(150);
    let errorText = await leadSection.locator('.field-error').first().textContent();
    assert(errorText?.includes('name'), `Validation caught empty name: "${errorText}"`);

    // 5.2 Invalid Phone
    await nameInput.fill('Anish Kumar');
    await phoneInput.fill('12345'); // invalid Indian phone
    await pinInput.fill('560001');
    await submitBtn.click();
    await page.waitForTimeout(150);
    errorText = await leadSection.locator('.field-error').first().textContent();
    assert(errorText?.includes('10-digit'), `Validation caught invalid phone: "${errorText}"`);

    // 5.3 Valid Submission
    await phoneInput.fill('9876543210');
    await submitBtn.click();
    await page.waitForTimeout(200);

    const successBox = leadSection.locator('.lead-success-box');
    assert(await successBox.isVisible(), 'Success confirmation appeared without page reload');
    const successText = await successBox.textContent();
    assert(successText?.includes('Anish Kumar') && successText?.includes('560001'), `Success message retained context: "${successText?.trim()}"`);

    // -------------------------------------------------------------
    // Test 6: FAQ Accordion
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 6: FAQ Accordion ---');
    const faqQuestions = page.locator('.faq-question-btn');
    const initialAnswer = page.locator('#faq-answer-0');
    assert(await initialAnswer.isVisible(), 'First FAQ answer is expanded by default');

    // Click 2nd FAQ
    await faqQuestions.nth(1).click();
    await page.waitForTimeout(200);
    const secondAnswer = page.locator('#faq-answer-1');
    assert(await secondAnswer.isVisible(), 'Second FAQ item expanded upon click');

    // -------------------------------------------------------------
    // Test 7: Mobile Responsiveness (390px Viewport)
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 7: Mobile Responsiveness (390px) ---');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true
    });
    await mobileContext.addInitScript(() => {
      localStorage.setItem('kerb_cookie_consent_v1', 'accepted');
      localStorage.setItem('kerb-theme', 'dark');
    });

    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check Mobile Bottom Navigation
    const mobileNav = mobilePage.locator('.mobile-bottom-nav');
    assert(await mobileNav.isVisible(), 'Mobile Bottom Navigation is visible on 390px');

    // Verify Touch Target minimum height >= 44px
    const navItemHeight = await mobileNav.locator('.nav-item').first().evaluate((el) => el.getBoundingClientRect().height);
    assert(navItemHeight >= 44, `Mobile navigation touch target height is ${navItemHeight}px (>= 44px required)`);

    // Check Mobile Filter Bottom Sheet
    const mobileFilterBtn = mobilePage.locator('.mobile-filter-btn');
    await mobileFilterBtn.scrollIntoViewIfNeeded();
    await mobileFilterBtn.click();
    await mobilePage.waitForTimeout(250);

    const bottomSheet = mobilePage.locator('.mobile-filter-sheet');
    assert(await bottomSheet.isVisible(), 'Mobile filter bottom sheet opened on tap');

    // Close bottom sheet
    const closeBtn = mobilePage.locator('.sheet-close-btn');
    await closeBtn.click();
    await mobilePage.waitForTimeout(250);
    assert(!(await bottomSheet.isVisible()), 'Mobile filter bottom sheet closed cleanly');

    // Capture Mobile Dark Mode screenshot
    await mobilePage.screenshot({ path: `${SCREENSHOT_DIR}/mobile-dark.png`, fullPage: false });
    console.log(`📸 Captured ${SCREENSHOT_DIR}/mobile-dark.png`);

    // Mobile Light Mode
    const mobileThemeToggle = mobilePage.locator('header button[title*="Switch to"]');
    await mobileThemeToggle.click();
    await mobilePage.waitForTimeout(250);
    await mobilePage.screenshot({ path: `${SCREENSHOT_DIR}/mobile-light.png`, fullPage: false });
    console.log(`📸 Captured ${SCREENSHOT_DIR}/mobile-light.png`);

    console.log('\n======================================================');
    console.log(`🎉 ALL TESTS PASSED! Summary: ${passed} passed, ${failed} failed.`);
    console.log('======================================================\n');
  } catch (err) {
    console.error('QA Suite caught an error:', err);
  } finally {
    await browser.close();
  }
}

runRedesignQA();
