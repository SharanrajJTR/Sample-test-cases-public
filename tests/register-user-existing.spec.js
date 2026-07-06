const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('User Registration', () => {
  test('Register user with existing email', async ({ page }) => {
    await allure.epic('User Management');
    await allure.feature('Registration');
    await allure.story('Register with already existing email');
    await allure.severity('normal');

    const email = 'existing_user@example.com';
    const username = 'existinguser';

    await allure.step('Setup: Ensure email exists', async () => {
        await page.goto('/');
        await page.click('text=Signup / Login');
        await page.fill('input[data-qa="signup-name"]', username);
        await page.fill('input[data-qa="signup-email"]', email);
        await page.click('button[data-qa="signup-button"]');
        // If it doesn't exist, it will go to account info page. If it exists, it stays and shows error.
        // We handle both cases to ensure pre-requisite.
        const error = page.locator('.signup-form p[style*="color: red"]');
        if (!(await error.isVisible())) {
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
            await page.click('a[data-qa="continue-button"]');
            await page.click('text=Logout');
        }
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

    await allure.step('Verify "New User Signup!" is visible', async () => {
      await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');
    });

    await allure.step('Enter name and already registered email address', async () => {
      await page.fill('input[data-qa="signup-name"]', username);
      await page.fill('input[data-qa="signup-email"]', email);
    });

    await allure.step('Click "Signup" button', async () => {
      await page.click('button[data-qa="signup-button"]');
    });

    await allure.step('Verify error "Email Address already exist!" is visible', async () => {
      await expect(page.locator('.signup-form p[style*="color: red"]')).toHaveText('Email Address already exist!');
    });
  });
});
