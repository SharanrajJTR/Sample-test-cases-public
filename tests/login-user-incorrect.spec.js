const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('User Login', () => {
  test('Login User with incorrect email address', async ({ page }) => {
    await allure.epic('User Management');
    await allure.feature('Login');
    await allure.story('Login with incorrect credentials');
    await allure.severity('normal');

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

    await allure.step('Enter incorrect email address and password', async () => {
      await page.fill('input[data-qa="login-email"]', 'incorrect_email@example.com');
      await page.fill('input[data-qa="login-password"]', 'wrongpassword');
    });

    await allure.step('Click "login" button', async () => {
      await page.click('button[data-qa="login-button"]');
    });

    await allure.step('Verify error "Your email or password is incorrect!" is visible', async () => {
      await expect(page.locator('.login-form p[style*="color: red"]')).toHaveText('Your email or password is incorrect!');
    });
  });
});
