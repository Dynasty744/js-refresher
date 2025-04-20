import { test, expect } from '@playwright/test';
import { Browser, Page } from 'playwright';
import { chromium } from 'playwright';

let page: Page;

// Handling multiple async operations
async function verifyAllElementsVisible(selectors: string[]) {
  const visibilityResults = await Promise.all(
    selectors.map(selector => page.isVisible(selector))
  );
  return visibilityResults.every(isVisible => isVisible)
}

test('handles network errors gracefully', async () => {
  try {
    await page.click('#unstable-button');
    await page.waitForResponse('**/api/data');
  } catch (error) {
    console.log('Expected network failure occurred', error.message);
    expect(await page.isVisible('.error-message')).toBeTruthy();
  }
})