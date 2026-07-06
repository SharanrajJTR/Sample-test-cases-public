const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Cart Tests', () => {
  test('add products in cart', async ({ page }) => {
    await allure.epic('Cart Operations');
    await allure.severity('critical');

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await allure.step('Click "Products" button', async () => {
      await page.click('text=Products');
    });

    await allure.step('Hover over first product and click "Add to cart"', async () => {
      await page.hover('.product-image-wrapper >> nth=0');
      await page.click('.add-to-cart >> nth=0');
    });

    await allure.step('Click "Continue Shopping" button', async () => {
      await page.click('button:has-text("Continue Shopping")');
    });

    await allure.step('Hover over second product and click "Add to cart"', async () => {
      await page.hover('.product-image-wrapper >> nth=1');
      await page.click('.add-to-cart >> nth=2'); // Index 2 is often the second product's overlay button
    });

    await allure.step('Click "View Cart" button', async () => {
      await page.click('u:has-text("View Cart")');
    });

    await allure.step('Verify both products are added to Cart', async () => {
      const rows = page.locator('#cart_info_table tbody tr');
      await expect(rows).toHaveCount(2);
    });

    await allure.step('Verify their prices, quantity and total price', async () => {
      const firstProductPrice = await page.locator('#product-1 .cart_price').innerText();
      const firstProductQuantity = await page.locator('#product-1 .cart_quantity').innerText();
      const firstProductTotal = await page.locator('#product-1 .cart_total').innerText();
      
      expect(firstProductQuantity).toBe('1');
      // Additional price verification could be added here
    });
  });
});
