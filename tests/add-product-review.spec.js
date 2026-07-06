const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Functional Tests', () => {
  test('Add review for the product', async ({ page }) => {
    await allure.epic('Functional Tests');
    await allure.feature('Product Reviews');
    await allure.severity('normal');

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Click on "Products" button', async () => {
      await page.click('text=Products');
    });

    await allure.step('Verify user is navigated to ALL PRODUCTS page successfully', async () => {
      await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    });

    await allure.step('Click on "View Product" button', async () => {
      await page.click('.choose a:has-text("View Product") >> nth=0');
    });

    await allure.step('Verify "Write Your Review" is visible', async () => {
      await expect(page.locator('a[href="#reviews"]')).toHaveText('Write Your Review');
    });

    await allure.step('Enter name, email and review', async () => {
      await page.fill('#name', 'Test Reviewer');
      await page.fill('#email', 'reviewer@example.com');
      await page.fill('#review', 'This is a great product!');
    });

    await allure.step('Click "Submit" button', async () => {
      await page.click('#button-review');
    });

    await allure.step('Verify success message "Thank you for your review."', async () => {
      await expect(page.getByText('Thank you for your review.')).toBeVisible();
    });
  });
});
