const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Checkout Tests', () => {
  test('Verify Address details in checkout page', async ({ page }) => {
    await allure.epic('Checkout');
    await allure.severity('critical');

    const username = `testuser_${Date.now()}`;
    const email = `testuser_${Date.now()}@example.com`;
    const address = 'Street 1, Apt 2';
    const city = 'Test City';

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await allure.step('Click "Signup / Login" button', async () => {
      await page.click('text=Signup / Login');
    });

    await allure.step('Fill all details in Signup and create account', async () => {
      await page.fill('input[data-qa="signup-name"]', username);
      await page.fill('input[data-qa="signup-email"]', email);
      await page.click('button[data-qa="signup-button"]');
      await page.fill('input[data-qa="password"]', 'Password123');
      await page.fill('input[data-qa="first_name"]', 'First');
      await page.fill('input[data-qa="last_name"]', 'Last');
      await page.fill('input[data-qa="address"]', address);
      await page.selectOption('select[data-qa="country"]', 'United States');
      await page.fill('input[data-qa="state"]', 'State');
      await page.fill('input[data-qa="city"]', city);
      await page.fill('input[data-qa="zipcode"]', '12345');
      await page.fill('input[data-qa="mobile_number"]', '1234567890');
      await page.click('button[data-qa="create-account"]');
    });

    await allure.step('Verify "ACCOUNT CREATED!" and click "Continue" button', async () => {
      await expect(page.locator('h2[data-qa="account-created"]')).toBeVisible();
      await page.click('a[data-qa="continue-button"]');
    });

    await allure.step('Verify " Logged in as username" at top', async () => {
      await expect(page.locator('text=Logged in as')).toContainText(username);
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

    await allure.step('Click Proceed To Checkout', async () => {
      await page.click('text=Proceed To Checkout');
    });

    await allure.step('Verify that the delivery address is same address filled at the time registration of account', async () => {
      await expect(page.locator('#address_delivery .address_address1').nth(1)).toHaveText(address);
      await expect(page.locator('#address_delivery .address_city')).toContainText(city);
    });

    await allure.step('Verify that the billing address is same address filled at the time registration of account', async () => {
      await expect(page.locator('#address_invoice .address_address1').nth(1)).toHaveText(address);
      await expect(page.locator('#address_invoice .address_city')).toContainText(city);
    });

    await allure.step('Click "Delete Account" button', async () => {
      await page.click('a[href="/delete_account"]');
    });

    await allure.step('Verify "ACCOUNT DELETED!" and click "Continue" button', async () => {
      await expect(page.locator('h2[data-qa="account-deleted"]')).toBeVisible();
      await page.click('a[data-qa="continue-button"]');
    });
  });
});
