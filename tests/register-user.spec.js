const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('User Registration', () => {
  test('Register User', async ({ page }) => {
    await allure.epic('User Management');
    await allure.feature('Registration');
    await allure.story('Register a new user');
    await allure.severity('critical');

    const username = `testuser_${Date.now()}`;
    const email = `testuser_${Date.now()}@example.com`;

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
      await expect(page.locator('.logo img')).toBeVisible();
    });

    await allure.step('Click on "Signup / Login" button', async () => {
      await page.click('text=Signup / Login');
    });

    await allure.step('Verify "New User Signup!" is visible', async () => {
      await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');
    });

    await allure.step('Enter name and email address', async () => {
      await page.fill('input[data-qa="signup-name"]', username);
      await page.fill('input[data-qa="signup-email"]', email);
    });

    await allure.step('Click "Signup" button', async () => {
      await page.click('button[data-qa="signup-button"]');
    });

    await allure.step('Verify that "ENTER ACCOUNT INFORMATION" is visible', async () => {
      await expect(page.locator('.login-form h2 b').first()).toHaveText('Enter Account Information');
    });

    await allure.step('Fill details: Title, Name, Email, Password, Date of birth', async () => {
      await page.check('#id_gender1');
      await page.fill('input[data-qa="password"]', 'Password123');
      await page.selectOption('select[data-qa="days"]', '1');
      await page.selectOption('select[data-qa="months"]', 'January');
      await page.selectOption('select[data-qa="years"]', '1990');
    });

    await allure.step('Select checkbox "Sign up for our newsletter!"', async () => {
      await page.check('#newsletter');
    });

    await allure.step('Select checkbox "Receive special offers from our partners!"', async () => {
      await page.check('#optin');
    });

    await allure.step('Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async () => {
      await page.fill('input[data-qa="first_name"]', 'First');
      await page.fill('input[data-qa="last_name"]', 'Last');
      await page.fill('input[data-qa="company"]', 'Company Inc');
      await page.fill('input[data-qa="address"]', 'Street 1');
      await page.fill('input[data-qa="address2"]', 'Suite 2');
      await page.selectOption('select[data-qa="country"]', 'United States');
      await page.fill('input[data-qa="state"]', 'State');
      await page.fill('input[data-qa="city"]', 'City');
      await page.fill('input[data-qa="zipcode"]', '12345');
      await page.fill('input[data-qa="mobile_number"]', '1234567890');
    });

    await allure.step('Click "Create Account button"', async () => {
      await page.click('button[data-qa="create-account"]');
    });

    await allure.step('Verify that "ACCOUNT CREATED!" is visible', async () => {
      await expect(page.locator('h2[data-qa="account-created"]')).toHaveText('Account Created!');
    });

    await allure.step('Click "Continue" button', async () => {
      await page.click('a[data-qa="continue-button"]');
    });

    await allure.step('Verify that "Logged in as username" is visible', async () => {
      await expect(page.locator('text=Logged in as')).toContainText(username);
    });

    await allure.step('Click "Delete Account" button', async () => {
      await page.click('a[href="/delete_account"]');
    });

    await allure.step('Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
      await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText('Account Deleted!');
      await page.click('a[data-qa="continue-button"]');
    });
  });
});
