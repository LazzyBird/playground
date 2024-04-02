import { test, expect } from "@playwright/test";
import { taskURL } from "@data_assets/shiftingContent";
import { menuItems } from "@data_assets/menuItems";

test("Random mode menu items", async ({ page }) => {
  await page.goto(taskURL.randomAndShift);
  let counter = 0;
  let errorCount = 0;
  while (counter < 10) {
    try {
      for (let i = 0; i < menuItems.length; i++) {
        const a = await expect(page.getByText(menuItems[i])).toHaveScreenshot(`menuItems${i}.png`);
        if (!a) {
          await page.getByText(menuItems[i]).screenshot({ path: `menuItems${i}_failed.png` });
          errorCount++;
        }
      }
    } catch (error) {
      console.log(error);
    }
    counter++;
    await page.reload();
  }
  expect(errorCount).toBe(0)
}
);

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
