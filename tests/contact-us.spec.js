const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const path = require('path');
const fs = require('fs');

test.describe('Functional Tests', () => {
  test('Contact us form', async ({ page }) => {
    await allure.epic('Functional Tests');
    await allure.feature('Contact Us');
    await allure.severity('normal');

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that home page is visible successfully', async () => {
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await allure.step('Click on "Contact Us" button', async () => {
      await page.click('text=Contact Us');
    });

    await allure.step('Verify "GET IN TOUCH" is visible', async () => {
      await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
    });

    await allure.step('Enter name, email, subject and message', async () => {
      await page.fill('input[data-qa="name"]', 'Test User');
      await page.fill('input[data-qa="email"]', 'testuser@example.com');
      await page.fill('input[data-qa="subject"]', 'Test Subject');
      await page.fill('textarea[data-qa="message"]', 'Test Message');
    });

    await allure.step('Upload file', async () => {
      const filePath = path.join(__dirname, 'test-file.txt');
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, 'test content');
      }
      await page.setInputFiles('input[name="upload_file"]', filePath);
    });

    await allure.step('Click "Submit" button', async () => {
      // Handle the dialog
      page.once('dialog', dialog => dialog.accept());
      const submitButton = page.locator('[data-qa="submit-button"]');
      await expect(submitButton).toBeVisible();
      await submitButton.scrollIntoViewIfNeeded();
      await submitButton.click();
    });

    await allure.step('Verify success message "Success! Your details have been submitted successfully." is visible', async () => {
      const successMessage = page.locator('.status.alert-success').first();
      await expect(successMessage).toBeVisible({ timeout: 10000 });
      await expect(successMessage).toContainText('Success! Your details have been submitted successfully.');
    });

    await allure.step('Click "Home" button and verify that landed to home page successfully', async () => {
      await page.click('#contact-page .btn-success');
      await expect(page).toHaveURL(/.*automationexercise\.com\/?/);
    });
  });
});
