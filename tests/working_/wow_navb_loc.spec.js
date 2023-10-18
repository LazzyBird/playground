import { test, expect } from "@playwright/test";
// import exp from "constants";
import * as path from "path";
 const screeshotsDir = path.join(__dirname, "screenshots");

test.describe.configure({ mode: 'serial' });

let page;

test.beforeAll( async ({ browser }) => {
     page = await browser.newPage();

});

test('runs first', async () => {
    await page.goto("https://worldofwarcraft.blizzard.com/en-gb/");
});
  
test("blizzard logo check", async ({ page }) => {
        await page
      .locator(
        "#blizzard-logo-dropdown > .nav-link-content > blz-nav-icon > .analytics-wrapper > svg"
      )
      .first()
      .screenshot({ path: "/screenshots/blizzard_logo.png" });
      });
          
test('Check main link URL', async ({ page }) => {
  
  // Wait for the #main-link element to be present
  const mainLink = page.getByLabel('#blizzard-logo-dropdown');

  // Get the text content of the element
  const linkText = await mainLink.textContent();

  // Get the value of the "href" attribute of the <a> tag
  const linkUrl = await mainLink.getAttribute('href');

  // Check if the link URL is right
   expect(linkUrl).toBe('https://www.blizzard.com/en-us');
   expect(linkText).toBe('Vizit blizzard.com');
});


test.afterAll(async () => {
  await page.close();
});