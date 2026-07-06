const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Cart Tests', () => {
  test('remove product from cart', async ({ page }) => {
    await allure.epic('Cart Operations');
    await allure.severity('normal');

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await allure.step('Add products to cart', async () => {
      await page.click('.add-to-cart >> nth=0');
      await page.click('button:has-text("Continue Shopping")');
    });

    await allure.step('Click "Cart" button', async () => {
      await page.click('text=Cart');
    });

    await allure.step('Verify that cart page is displayed', async () => {
      await expect(page).toHaveURL(/.*view_cart/);
    });

    await allure.step('Click "X" button corresponding to particular product', async () => {
      await page.click('.cart_quantity_delete');
    });

    await allure.step('Verify that product is removed from the cart', async () => {
      // Waiting for the product to be removed (disappear from the list)
      await expect(page.locator('.cart_quantity_delete')).toHaveCount(0);
      await expect(page.locator('#empty_cart')).toBeVisible();
    });
  });
});
