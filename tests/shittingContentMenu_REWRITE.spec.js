// @ts-check
import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

const shiftSuffix = "pixel_shift=100";
const modeSuffix = "mode=random";
const randomTaskURL = Env.URL +
  "?" + modeSuffix;
const shiftTaskURL = Env.URL + "?" + shiftSuffix;
const randomAndShiftTaskURL = randomTaskURL + "&" + shiftSuffix;



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
