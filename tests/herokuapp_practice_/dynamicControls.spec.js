import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/dynamic_content?";
let page;
// here I can place some helper function щоб не заважали в інших місцях
test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(`${taskURL}`, { timeout: 30000 });
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(`${taskURL}`, { timeout: 30000 });
});
