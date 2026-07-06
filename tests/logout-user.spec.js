const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('User Login', () => {
  test('Logout user', async ({ page }) => {
    await allure.epic('User Management');
    await allure.feature('Logout');
    await allure.story('Logout after successful login');
    await allure.severity('critical');

    const email = `testuser_${Date.now()}@example.com`;
    const password = 'Password123';
    const username = 'testuser';

    await allure.step('Setup: Create user for logout test', async () => {
        test.setTimeout(60000); // Increase timeout for the setup
        await page.goto('/');
        await page.click('text=Signup / Login');
        await page.fill('input[data-qa="signup-name"]', username);
        await page.fill('input[data-qa="signup-email"]', email);
        await page.click('button[data-qa="signup-button"]');
        await page.fill('input[data-qa="password"]', password);
        await page.fill('input[data-qa="first_name"]', 'First');
        await page.fill('input[data-qa="last_name"]', 'Last');
        await page.fill('input[data-qa="address"]', 'Street 1');
        await page.selectOption('select[data-qa="country"]', 'United States');
        await page.fill('input[data-qa="state"]', 'State');
        await page.fill('input[data-qa="city"]', 'City');
        await page.fill('input[data-qa="zipcode"]', '12345');
        await page.fill('input[data-qa="mobile_number"]', '1234567890');
        await page.click('button[data-qa="create-account"]');
        await page.click('a[data-qa="continue-button"]');
        await page.click('text=Logout');
    });

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await allure.step('Click on "Signup / Login" button', async () => {
      await page.click('text=Signup / Login');
    });

    await allure.step('Verify "Login to your account" is visible', async () => {
      await expect(page.locator('.login-form h2')).toHaveText('Login to your account');
    });

    await allure.step('Enter correct email address and password', async () => {
      await page.fill('input[data-qa="login-email"]', email);
      await page.fill('input[data-qa="login-password"]', password);
    });

    await allure.step('Click "login" button', async () => {
      await page.click('button[data-qa="login-button"]');
    });

    await allure.step('Verify that "Logged in as username" is visible', async () => {
      await expect(page.locator('text=Logged in as')).toContainText(username);
    });

    await allure.step('Click "Logout" button', async () => {
      await page.click('text=Logout');
    });

    await allure.step('Verify that user is navigated to login page', async () => {
      await expect(page).toHaveURL(/.*login/);
      await expect(page.locator('.login-form h2')).toHaveText('Login to your account');
    });
  });
});
