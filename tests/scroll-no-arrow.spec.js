const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('UI Tests', () => {
  test('Verify Scroll up without using Arrow button and scroll down functionality', async ({ page }) => {
    await allure.epic('UI Tests');
    await allure.feature('Scroll Functionality');
    await allure.severity('minor');

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await allure.step('Scroll down page to bottom', async () => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    });

    await allure.step('Verify "SUBSCRIPTION" is visible', async () => {
      await expect(page.locator('.single-widget h2')).toBeVisible();
    });

    await allure.step('Scroll up page to top', async () => {
      await page.evaluate(() => window.scrollTo(0, 0));
    });

    await allure.step('Verify that page is scrolled up and "Full-Fledged practice website for Automation Engineers" text is visible on screen', async () => {
      await expect(page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();
    });
  });
});
