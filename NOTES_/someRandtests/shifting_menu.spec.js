import { test, expect } from "playwright/test";
let page;
test.beforeAll(async ({ browser }) => {
  let context = await browser.newContext();
  page = await context.newPage();
});
test.afterAll(async ({ browser }) => {
  await page.close();
  await browser.close();
});

test("every menu item is visible", async () => {
  await page.goto(
    "https://the-internet.herokuapp.com/shifting_content/menu?mode=random"
  );
  const menuItem = page.getByRole("listitem").filter({hasText: 'Portfolio'});
  await expect(menuItem).toBeVisible();
});
