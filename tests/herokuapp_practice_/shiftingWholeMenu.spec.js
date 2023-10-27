const { test, expect } = require("@playwright/test");

const taskURL =
  "https://the-internet.herokuapp.com/shifting_content/menu?mode=random&pixel_shift=100";
let page;
/* const menuItems = ["Home", "About", "Contact Us", "Portfolio", "Gallery"];
//  const delayBetweenScreenshots = 300;
const maxRetries = 3;
let retries = 0;
let screenshotTaken = false;
let failedScreenshotCount = 0;*/

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(taskURL);
  await page.waitForLoadState("load");
});
/* це не працює, сторінка закривається раніше ніж отримується скріншот
test.afterAll(async () => {
  await page.close();
});
test("Menu is according to layout", async ({ page }) => {
  await page.waitForSelector("#content > div > ul");
  await expect(page.locator("#content > div > ul")).toHaveScreenshot();
}); 
test('Every menu item is according to layout ', async ({ page }) => {for (const menuItem of menuItems) {
  await expect(page.getByText(menuItem)).toHaveScreenshot();
  await page.waitForTimeout(delayBetweenScreenshots);
};})
test('menu items are according to layout ', async ({ page }) => {
  for(const menuItem of menuItems) {
    while (!screenshotTaken && retries < maxRetries) {
      try {
        await expect(page.getByText(menuItem)).toHaveScreenshot();
        screenshotTaken = true;
      } catch (error) {
        retries++;
        // Add a delay between retries if needed
      }
    }
    
    if (!screenshotTaken) {
      failedScreenshotCount++;
console.log(`Retries: ${retries}`);
console.log('screenshot not taken for ' + menuItem + '. Retrying...');
console.log(`Retries left: ${maxRetries - retries}`);
console.log(`Total of failed screenshots: ${failedScreenshotCount}`) }
}}); */
