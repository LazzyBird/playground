const { test, expect } = require('@playwright/test');

const taskURL = "https://the-internet.herokuapp.com/add_remove_elements/";
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
  await page.waitForLoadState('load');
});