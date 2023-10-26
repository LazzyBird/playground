const { test, expect } = require("@playwright/test");

const taskURL =
  "https://the-internet.herokuapp.com/shifting_content/menu?mode=random&pixel_shift=200";
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
  await page.waitForLoadState("load");
});

test("Every menu item is according to layout ", async ({ page }) => {
  await expect(page.getByText("Home")).toHaveScreenshot();
  await expect(page.getByText("About")).toHaveScreenshot();
  await expect(page.getByText("Contact Us")).toHaveScreenshot();
  await expect(page.getByText("Portfolio")).toHaveScreenshot();
  await expect(page.getByText("Gallery")).toHaveScreenshot();
});

