import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "checkboxes";
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

test("there are two checkboxes", async ({ page }) => {
  await expect(page.getByRole("checkbox")).toHaveCount(2);
});
test("checkboxes are in the viewport", async ({ page }) => {
  await expect(page.getByRole("checkbox").nth(0)).toBeInViewport();
  await expect(page.getByRole("checkbox").nth(1)).toBeInViewport();
});
test("on page load secont checkbox is checked", async ({ page }) => {
  await expect(page.getByRole("checkbox").nth(1)).toBeChecked();
});
test("the first checkbox can be checked", async ({ page }) => {
  await page.getByRole("checkbox").nth(0).check();
  await expect(page.getByRole("checkbox").nth(0)).toBeChecked();
});
test("the first checkbox can be unchecked", async ({ page }) => {
  await page.getByRole("checkbox").nth(0).uncheck();
  await expect(page.getByRole("checkbox").nth(0)).not.toBeChecked();
});
test("the second checkbox can be checked", async ({ page }) => {
  await page.getByRole("checkbox").nth(1).check();
  await expect(page.getByRole("checkbox").nth(1)).toBeChecked();
});
test("second checkbox can be unchecked", async ({ page }) => {
  await page.getByRole("checkbox").nth(1).uncheck();
  await expect(page.getByRole("checkbox").nth(1)).not.toBeChecked();
});
test("both checkboxes can be checked", async ({ page }) => {
  await page.getByRole("checkbox").nth(0).check();
  await page.getByRole("checkbox").nth(1).check();
  await expect(page.getByRole("checkbox").nth(0)).toBeChecked();
  await expect(page.getByRole("checkbox").nth(1)).toBeChecked();
});
test("both checkboxes can be unchecked", async ({ page }) => {
  await page.getByRole("checkbox").nth(0).uncheck();
  await page.getByRole("checkbox").nth(1).uncheck();
  await expect(page.getByRole("checkbox").nth(0)).not.toBeChecked();
  await expect(page.getByRole("checkbox").nth(1)).not.toBeChecked();
});
