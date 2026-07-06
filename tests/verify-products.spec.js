const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Functional Tests', () => {
  test('Verify all products and product details page', async ({ page }) => {
    await allure.epic('Functional Tests');
    await allure.feature('Product Catalog');
    await allure.severity('critical');

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
      await expect(page).toHaveURL(/.*products/);
      await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    });

    await allure.step('The products list is visible', async () => {
      await expect(page.locator('.features_items')).toBeVisible();
    });

    await allure.step('Click on "View Product" of first product', async () => {
      await page.click('.choose a:has-text("View Product") >> nth=0');
    });

    await allure.step('User is landed to product detail page', async () => {
      await expect(page).toHaveURL(/.*product_details/);
    });

    await allure.step('Verify that detail is visible: product name, category, price, availability, condition, brand', async () => {
      await expect(page.locator('.product-information h2')).toBeVisible();
      await expect(page.locator('.product-information p:has-text("Category")')).toBeVisible();
      await expect(page.locator('.product-information span span')).toBeVisible();
      await expect(page.locator('.product-information p:has-text("Availability")')).toBeVisible();
      await expect(page.locator('.product-information p:has-text("Condition")')).toBeVisible();
      await expect(page.locator('.product-information p:has-text("Brand")')).toBeVisible();
    });
  });
});
