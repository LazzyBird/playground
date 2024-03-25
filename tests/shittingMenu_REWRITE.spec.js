// @ts-check
import { test, expect } from "@playwright/test";
///! Удолі цей позор й напиши нормально
const taskURL =
  "https://the-internet.herokuapp.com/shifting_content/menu?mode=random&pixel_shift=200";

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
});

test.describe("Every menu item is according to layout ", () => {
  test("Home menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText("Home")).toHaveScreenshot();
  });

  test("About menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText("About")).toHaveScreenshot();
  });

  test("Contact Us menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText("Contact Us")).toHaveScreenshot();
  });

  test("Portfolio menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText("Portfolio")).toHaveScreenshot();
  });

  test("Gallery menu item is according to layout ", async ({ page }) => {
    await expect(page.getByText("Gallery")).toHaveScreenshot();
  });
});
