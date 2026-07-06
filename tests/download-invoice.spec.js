const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Checkout Tests', () => {
  test('Download invoice after purchase order', async ({ page }) => {
    await allure.epic('Checkout');
    await allure.severity('critical');

    const username = `testuser_${Date.now()}`;
    const email = `testuser_${Date.now()}@example.com`;

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

    await allure.step('Click Proceed To Checkout', async () => {
      await page.click('text=Proceed To Checkout');
    });

    await allure.step('Click "Register / Login" button', async () => {
      await page.click('u:has-text("Register / Login")');
    });

    await allure.step('Fill all details in Signup and create account', async () => {
      await page.fill('input[data-qa="signup-name"]', username);
      await page.fill('input[data-qa="signup-email"]', email);
      await page.click('button[data-qa="signup-button"]');
      await page.fill('input[data-qa="password"]', 'Password123');
      await page.fill('input[data-qa="first_name"]', 'First');
      await page.fill('input[data-qa="last_name"]', 'Last');
      await page.fill('input[data-qa="address"]', 'Street 1');
      await page.selectOption('select[data-qa="country"]', 'United States');
      await page.fill('input[data-qa="state"]', 'State');
      await page.fill('input[data-qa="city"]', 'City');
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

    await allure.step('Click "Cart" button', async () => {
      await page.click('text=Cart');
    });

    await allure.step('Click "Proceed To Checkout" button', async () => {
      await page.click('text=Proceed To Checkout');
    });

    await allure.step('Verify Address Details and Review Your Order', async () => {
      await expect(page.getByText('Address Details')).toBeVisible();
      await expect(page.getByText('Review Your Order')).toBeVisible();
    });

    await allure.step('Enter description in comment text area and click "Place Order"', async () => {
      await page.fill('textarea[name="message"]', 'Test Order');
      await page.click('a[href="/payment"]');
    });

    await allure.step('Enter payment details: Name on Card, Card Number, CVC, Expiration date', async () => {
      await page.fill('input[data-qa="name-on-card"]', 'Test User');
      await page.fill('input[data-qa="card-number"]', '1234567890123456');
      await page.fill('input[data-qa="cvc"]', '123');
      await page.fill('input[data-qa="expiry-month"]', '12');
      await page.fill('input[data-qa="expiry-year"]', '2030');
    });

    await allure.step('Click "Pay and Confirm Order" button', async () => {
      await page.click('button[data-qa="pay-button"]');
    });

    await allure.step('Verify success message "Your order has been placed successfully!"', async () => {
      await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
    });

    await allure.step('Click "Download Invoice" button and verify invoice is downloaded successfully.', async () => {
      const downloadPromise = page.waitForEvent('download');
      await page.click('text=Download Invoice');
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toContain('invoice');
    });

    await allure.step('Click "Continue" button', async () => {
      await page.click('a[data-qa="continue-button"]');
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
