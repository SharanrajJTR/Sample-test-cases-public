const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Functional Tests', () => {
  test('Search product', async ({ page }) => {
    await allure.epic('Functional Tests');
    await allure.feature('Search');
    await allure.severity('normal');

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await allure.step('Click on "Products" button', async () => {
      await page.click('text=Products');
    });

    await allure.step('Verify user is navigated to ALL PRODUCTS page successfully', async () => {
      await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    });

    await allure.step('Enter product name in search input and click search button', async () => {
      await page.fill('#search_product', 'Tshirt');
      await page.click('#submit_search');
    });

    await allure.step('Verify "SEARCHED PRODUCTS" is visible', async () => {
      await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
    });

    await allure.step('Verify all the products related to search are visible', async () => {
      const products = page.locator('.product-image-wrapper');
      await expect(products.first()).toBeVisible();
      const count = await products.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
