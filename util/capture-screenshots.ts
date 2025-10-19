#!/usr/bin/env tsx

/**
 * Automated Screenshot Capture for Component Catalog
 *
 * This script uses Playwright to automatically capture screenshots of all components
 * from Storybook and save them to docs/screenshots/ directory.
 *
 * Prerequisites:
 * - Storybook must be running on http://localhost:6006
 * - Run: npm run storybook
 *
 * Usage:
 * - npx tsx util/capture-screenshots.ts
 */

import {chromium, type Browser, type Page} from 'playwright';
import {mkdir} from 'node:fs/promises';
import {join} from 'node:path';

// Component mapping: kebab-case name -> Storybook story path
const COMPONENT_MAP: Record<string, string> = {
  // Layout & Navigation
  'fancyheader': 'parts-fancyheader--normal',
  'submenu': 'parts-menu--normal',

  // Content Display
  'article': 'parts-article--normal',
  'book': 'parts-card--book',
  'event': 'parts-event--normal',
  'faq': 'parts-faq--normal',
  'imageblock': 'parts-imageblock--normal',
  'introblock': 'parts-introblock--normal',
  'quote': 'parts-textblock--quote',
  'textblock': 'parts-textblock--normal',
  'titleblock': 'parts-titleblock--normal',

  // Lists & Collections
  'articlelist': 'shared-articlelistitem--normal',
  'booklist': 'parts-booklist--normal',
  'budgetcutlist': 'parts-budgetcutlist--normal',
  'candidatelist': 'parts-candidatelist--normal',
  'eventlist': 'shared-eventlistitem--normal',
  'faqlist': 'parts-faqlist--normal',
  'localbranches': 'parts-localbranchesblock--normal',
  'pagelist': 'parts-menu--normal',
  'personlist': 'parts-group--normal',
  'programmepart': 'parts-programmemain--normal',

  // Interactive
  'button': 'parts-button--normal',
  'join': 'parts-join--normal',
  'map': 'parts-imageblock--normal',

  // Special Purpose
  'board': 'parts-board--normal',
  'boardpresentation': 'parts-boardpresentation--normal',
  'candidateblock': 'parts-lbcandidateblock--normal',
  'candidatepage': 'parts-candidatepage--normal',
  'candidatepresentation': 'parts-candidatepresentationlist--normal',
  'group': 'parts-group--normal',
  'localblock': 'parts-localbranchesblock--single',
  'localbranch': 'parts-localbranchesblock--single',
  'missionsblock': 'parts-missionsblock--normal',
  'organizational-position': 'parts-boardpresentation--normal',
  'person': 'parts-person--normal',
  'programme-main': 'parts-programmemain--normal',
  'programme-section': 'parts-programmemain--section',
  'test': 'parts-article--normal'
};

const STORYBOOK_URL = 'http://localhost:6006';
const SCREENSHOTS_DIR = join(process.cwd(), 'docs', 'screenshots');
const VIEWPORT = {width: 1200, height: 800};
const WAIT_FOR_RENDER = 3000; // ms to wait for component to render
const PAGE_TIMEOUT = 60000; // ms timeout for page load

async function captureScreenshot(
  page: Page,
  componentName: string,
  storyPath: string
): Promise<void> {
  const url = `${STORYBOOK_URL}/iframe.html?id=${storyPath}&viewMode=story`;

  console.log(`📸 Capturing ${componentName}...`);
  console.log(`   URL: ${url}`);

  try {
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: PAGE_TIMEOUT
    });
    await page.waitForTimeout(WAIT_FOR_RENDER);

    const screenshotPath = join(SCREENSHOTS_DIR, `${componentName}.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: false
    });

    console.log(`   ✅ Saved to: ${screenshotPath}`);
  } catch (error) {
    console.error(`   ❌ Failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function main(): Promise<void> {
  console.log('🎬 Starting screenshot capture...\n');

  // Ensure screenshots directory exists
  await mkdir(SCREENSHOTS_DIR, {recursive: true});
  console.log(`📁 Screenshots directory: ${SCREENSHOTS_DIR}\n`);

  // Launch browser
  console.log('🌐 Launching browser...');
  const browser: Browser = await chromium.launch({headless: true});
  const context = await browser.newContext({viewport: VIEWPORT});
  const page: Page = await context.newPage();

  // Check if Storybook is running
  console.log(`🔍 Checking Storybook at ${STORYBOOK_URL}...`);
  try {
    await page.goto(STORYBOOK_URL, {timeout: 5000});
    console.log('✅ Storybook is running\n');
  } catch {
    console.error('❌ Error: Storybook is not running!');
    console.error('   Please start Storybook first: npm run storybook\n');
    await browser.close();
    process.exit(1);
  }

  // Capture screenshots
  const totalComponents = Object.keys(COMPONENT_MAP).length;
  console.log(`📷 Capturing ${totalComponents} component screenshots...\n`);

  let successCount = 0;
  const failureCount = 0;

  for (const [componentName, storyPath] of Object.entries(COMPONENT_MAP)) {
    await captureScreenshot(page, componentName, storyPath);
    successCount++;
    await page.waitForTimeout(500); // Brief pause between captures
  }

  // Cleanup
  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Screenshot Capture Summary');
  console.log('='.repeat(60));
  console.log(`Total components: ${totalComponents}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${failureCount}`);
  console.log(`Output directory: ${SCREENSHOTS_DIR}`);
  console.log('='.repeat(60));
  console.log('\n✨ Done!');
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
