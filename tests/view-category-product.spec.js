const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test.describe('Functional Tests', () => {
  test('View category product', async ({ page }) => {
    await allure.epic('Functional Tests');
    await allure.feature('Category Navigation');
    await allure.severity('normal');

    await allure.step('Launch browser and navigate to url', async () => {
      await page.goto('/');
    });

    await allure.step('Verify that categories are visible on left side bar', async () => {
      await expect(page.locator('.left-sidebar')).toBeVisible();
      await expect(page.locator('#accordian')).toBeVisible();
    });

    await allure.step('Click on "Women" category', async () => {
      await page.click('a[href="#Women"]');
    });

    await allure.step('Click on any category link under "Women" category, for example: Dress', async () => {
      const dressCategory = page.locator('a[href="/category_products/1"]');
      await dressCategory.waitFor({ state: 'visible' });
      await dressCategory.click();
    });

    await allure.step('Verify that category page is displayed and confirm text "WOMEN - TOPS PRODUCTS"', async () => {
      await expect(page.locator('.title.text-center')).toContainText(/Women - .* Products/i);
    });

    await allure.step('On left side bar, click on any sub-category link of "Men" category', async () => {
      await page.click('a[href="#Men"]');
      await page.click('a[href="/category_products/3"]'); // Tshirts
    });

    await allure.step('Verify that user is navigated to that category page', async () => {
      await expect(page.locator('.title.text-center')).toContainText('Men - Tshirts Products', { ignoreCase: true });
    });
  });
});
