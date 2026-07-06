const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Subscription Tests', () => {
  test('Verify subscription in home page', async ({ page }) => {
    await allure.epic('Subscription');
    await allure.severity('minor');

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await allure.step('Scroll down to footer', async () => {
      await page.locator('#footer').scrollIntoViewIfNeeded();
    });

    await allure.step('Verify text "SUBSCRIPTION"', async () => {
      await expect(page.locator('.single-widget h2')).toHaveText('Subscription');
    });

    await allure.step('Enter email address in input and click arrow button', async () => {
      await page.fill('#susbscribe_email', 'testuser@example.com');
      await page.click('#subscribe');
    });

    await allure.step('Verify success message "You have been successfully subscribed!" is visible', async () => {
      await expect(page.locator('.alert-success')).toHaveText('You have been successfully subscribed!');
    });
  });
});
