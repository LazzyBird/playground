import { test, expect } from "@playwright/test";
import { taskURL } from "@data_assets/shiftingContent";

test("Random mode menu items", async ({ page }) => {
  await page.goto(taskURL.random);
//? дописати
});
test("Shift mode menu items", async ({ page }) => {
  await page.goto(taskURL.shift);
  //? дописати
});
test("Both modes menu items", async ({ page }) => {
  await page.goto(taskURL.randomAndShift);
  //? дописати
});

 /* //? кандидат на випиляння
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
 */
