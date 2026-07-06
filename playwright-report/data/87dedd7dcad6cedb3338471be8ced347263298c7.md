# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-us.spec.js >> Functional Tests >> Contact us form
- Location: tests\contact-us.spec.js:7:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('.status.alert-success').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('.status.alert-success').first()
    23 × locator resolved to <div class="status alert alert-success"></div>
       - unexpected value "hidden"

```

```yaml
- banner:
  - link "Website for automation practice":
    - /url: /
    - img "Website for automation practice"
  - list:
    - listitem:
      - link " Home":
        - /url: /
    - listitem:
      - link " Products":
        - /url: /products
    - listitem:
      - link " Cart":
        - /url: /view_cart
    - listitem:
      - link " Signup / Login":
        - /url: /login
    - listitem:
      - link " Test Cases":
        - /url: /test_cases
    - listitem:
      - link " API Testing":
        - /url: /api_list
    - listitem:
      - link " Video Tutorials":
        - /url: https://www.youtube.com/c/AutomationExercise
    - listitem:
      - link " Contact us":
        - /url: /contact_us
- heading "Contact Us" [level=2]:
  - text: Contact
  - strong: Us
- insertion:
  - iframe
- text: "Note: Below contact form is for testing purpose."
- heading "Get In Touch" [level=2]
- textbox "Name"
- textbox "Email"
- textbox "Subject"
- textbox "Your Message Here"
- button "Choose File"
- button "Submit"
- heading "Feedback For Us" [level=2]
- paragraph: We really appreciate your response to our website.
- paragraph:
  - text: Kindly share your feedback with us at
  - link "feedback@automationexercise.com":
    - /url: mailto:feedback@automationexercise.com
  - text: .
- paragraph: If you have any suggestion areas or improvements, do let us know. We will definitely work on it.
- paragraph: Thank you
- insertion:
  - iframe
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
- insertion:
  - iframe
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { allure } = require('allure-playwright');
  3  | const path = require('path');
  4  | const fs = require('fs');
  5  | 
  6  | test.describe('Functional Tests', () => {
  7  |   test('Contact us form', async ({ page }) => {
  8  |     await allure.epic('Functional Tests');
  9  |     await allure.feature('Contact Us');
  10 |     await allure.severity('normal');
  11 | 
  12 |     await allure.step('Launch browser and navigate to url', async () => {
  13 |       await page.goto('/');
  14 |     });
  15 | 
  16 |     await allure.step('Verify that home page is visible successfully', async () => {
  17 |       await expect(page).toHaveTitle(/Automation Exercise/);
  18 |     });
  19 | 
  20 |     await allure.step('Click on "Contact Us" button', async () => {
  21 |       await page.click('text=Contact Us');
  22 |     });
  23 | 
  24 |     await allure.step('Verify "GET IN TOUCH" is visible', async () => {
  25 |       await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
  26 |     });
  27 | 
  28 |     await allure.step('Enter name, email, subject and message', async () => {
  29 |       await page.fill('input[data-qa="name"]', 'Test User');
  30 |       await page.fill('input[data-qa="email"]', 'testuser@example.com');
  31 |       await page.fill('input[data-qa="subject"]', 'Test Subject');
  32 |       await page.fill('textarea[data-qa="message"]', 'Test Message');
  33 |     });
  34 | 
  35 |     await allure.step('Upload file', async () => {
  36 |       const filePath = path.join(__dirname, 'test-file.txt');
  37 |       if (!fs.existsSync(filePath)) {
  38 |         fs.writeFileSync(filePath, 'test content');
  39 |       }
  40 |       await page.setInputFiles('input[name="upload_file"]', filePath);
  41 |     });
  42 | 
  43 |     await allure.step('Click "Submit" button', async () => {
  44 |       // Handle the dialog
  45 |       page.once('dialog', dialog => dialog.accept());
  46 |       const submitButton = page.locator('[data-qa="submit-button"]');
  47 |       await expect(submitButton).toBeVisible();
  48 |       await submitButton.scrollIntoViewIfNeeded();
  49 |       await submitButton.click();
  50 |     });
  51 | 
  52 |     await allure.step('Verify success message "Success! Your details have been submitted successfully." is visible', async () => {
  53 |       const successMessage = page.locator('.status.alert-success').first();
> 54 |       await expect(successMessage).toBeVisible({ timeout: 10000 });
     |                                    ^ Error: expect(locator).toBeVisible() failed
  55 |       await expect(successMessage).toContainText('Success! Your details have been submitted successfully.');
  56 |     });
  57 | 
  58 |     await allure.step('Click "Home" button and verify that landed to home page successfully', async () => {
  59 |       await page.click('#contact-page .btn-success');
  60 |       await expect(page).toHaveURL(/.*automationexercise\.com\/?/);
  61 |     });
  62 |   });
  63 | });
  64 | 
```