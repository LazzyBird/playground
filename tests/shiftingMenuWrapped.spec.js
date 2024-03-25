import { test, expect } from "@playwright/test";

const taskURL =
  "https://the-internet.herokuapp.com/shifting_content/menu?mode=random&pixel_shift=200";
let page;

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
});

test("Every menu item is according to layout ", async ({ page }) => {
  await page.waitForSelector("#content > div > ul");
  await expect(page.getByText("Home")).toHaveScreenshot();
  await expect(page.getByText("About")).toHaveScreenshot();
  await expect(page.getByText("Contact Us")).toHaveScreenshot();
  await expect(page.getByText("Portfolio")).toHaveScreenshot();
  await expect(page.getByText("Gallery")).toHaveScreenshot();
});

