import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { menuItems } from "@data_assets/menuItems";
import { getTextFromLocator, pageReload } from "@datafactory/getTextFromLocator";
const taskURL = Env.URL + "disappearing_elements";
let page;

test.beforeAll(async ({ browser }) => {
  let context = await browser.newContext();
  page = context.newPage();
});
test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
});
test.afterAll(async ({ browser }) => {
  await browser.close();
});
test("all menu items are visible", async ({ page }) => {
  //? такий собі варіант без репорта та на одній функції й без повторів спроб
  const a = await getTextFromLocator(page, 'li');
  expect(a).toEqual(menuItems);
});
test("test with page reload", async ({ page }) => {
  const errorCount = await pageReload(page, taskURL, 'li', menuItems, 20);
  expect(errorCount).toEqual(0);
})