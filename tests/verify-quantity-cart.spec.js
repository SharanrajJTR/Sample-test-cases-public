const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Cart Tests', () => {
  test('verify product quantity in cart', async ({ page }) => {
    await allure.epic('Cart Operations');
    await allure.severity('normal');

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await allure.step('Click "View Product" for any product on home page', async () => {
      await page.click('.choose a:has-text("View Product") >> nth=0');
    });

    await allure.step('Verify product detail is opened', async () => {
      await expect(page).toHaveURL(/.*product_details/);
    });

    await allure.step('Increase quantity to 4', async () => {
      await page.fill('#quantity', '4');
    });

    await allure.step('Click "Add to cart" button', async () => {
      await page.click('button:has-text("Add to cart")');
    });

    await allure.step('Click "View Cart" button', async () => {
      await page.click('u:has-text("View Cart")');
    });

    await allure.step('Verify that product is displayed in cart page with exact quantity', async () => {
      const quantity = await page.locator('.cart_quantity button').innerText();
      expect(quantity).toBe('4');
    });
  });
});
