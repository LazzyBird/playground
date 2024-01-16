import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/digest_auth";
let page;

test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(`${taskURL}`, { timeout: 30000 });
});

// NB: handle with prompt dialog window, create test cases with cleaning up token to check auth result for valid and invalid credentials