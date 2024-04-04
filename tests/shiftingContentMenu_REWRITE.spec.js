import { test, expect } from "@playwright/test";
import { taskURL } from "@data_assets/shiftingContent";
import { menuItems } from "@data_assets/menuItems";
let page;
test.beforeAll(async ({ browser }) => {
  let context = await browser.newContext();
  page = context.newPage();
});
test.beforeEach(async ({ page }) => {
  await page.goto(taskURL.randomAndShift);
});
test.afterAll(async ({ browser }) => {
  await browser.close();
});
test.describe("Every menu item is according to layout ", () => {
  test("Home menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText(menuItems[0])).toHaveScreenshot();
  });

  test("About menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText(menuItems[1])).toHaveScreenshot();
  });

  test("Contact Us menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText(menuItems[2])).toHaveScreenshot();
  });

  test("Portfolio menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText(menuItems[3])).toHaveScreenshot();
  });

  test("Gallery menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText(menuItems[4])).toHaveScreenshot();
  });
});
