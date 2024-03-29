import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { dropdownOptions } from "@data_assets/dropdownOptions"
const taskURL = Env.URL + "dropdown";
let page;

test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(taskURL);
});

test("Dropdown list is loaded", async ({ page }) => {
  await expect(page.locator("select")).toHaveCount(1);
  await expect(page.locator("select")).toBeVisible();
});

test("Dropdown list is loaded with proper placeholder", async ({ page }) => {
  let a = page.getByPlaceholder(dropdownOptions[0]);
  expect(a).toBeTruthy();
});

test("Dropdown list has proper options", async ({ page }) => {
  await expect(page.locator("select")).toHaveValues(dropdownOptions);
});

test("Dropdown expands on click", async ({ page }) => {
  await page.locator("select").click();
  expect;
});

test("Dropdown list item 1 can be selected", async ({ page }) => {
  await page.selectOption("select", "1");
  await expect(page.locator("select")).toHaveText("Option 1");
  await expect(page.locator('option[value="1"]')).toHaveAttribute("selected");
  await expect(page.locator('option[value="2"]')).not.toHaveAttribute("selected");
  await expect(page.getByText("Please select an option")).toHaveAttribute("disabled");
});

test("Dropdown list item 2 can be selected", async ({ page }) => {
  await page.selectOption("select", "2");
  await expect(page.locator("select")).toHaveValue("2");
  await expect(page.locator('option[value="2"]')).toHaveAttribute("selected");
});
