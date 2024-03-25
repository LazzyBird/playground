import { test, expect } from "@playwright/test";
import Env from "@helpers/env"
import { buttons } from "@data_assets/dynamicControls"
import { clickAndWait } from "@datafactory/dynamicConstrols"
const taskURL = Env.URL + "dynamic_controls";
let page;

test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open Dynamic Controls URL", async ({ page }) => {
  await page.goto(taskURL);
});

test("Remove button functionality", async ({ page }) => {
  await clickAndWait(page, buttons.removeButton, buttons.addButton);
  const isCheckboxVisible = await page.getByRole("checkbox").isVisible();
  expect(isCheckboxVisible).toBe(false);
});

test("Add button functionality", async ({ page }) => {
  clickAndWait(page, buttons.removeButton, buttons.addButton);
  await page.waitForSelector(`button:visible:has-text("${buttons.addButton}")`);
  clickAndWait(page, buttons.addButton, buttons.removeButton);
  await page.waitForSelector(`button:visible:has-text("${buttons.removeButton}")`);
  const isCheckboxVisible = await page.getByRole("checkbox").isVisible();
  expect(isCheckboxVisible).toBe(true);
});

test("Enable button functionality", async ({ page }) => {
  await clickAndWait(page, buttons.enableButton, buttons.disableButton);
  const isTextboxDisabled = await page.getByRole("textbox").isDisabled();
  expect(isTextboxDisabled).toBe(false);
});

test("Disable button functionality", async ({ page }) => {
  clickAndWait(page, buttons.enableButton, buttons.disableButton, {
    timeout: 3000
  });
  await page.waitForSelector(
    `button:visible:has-text("${buttons.disableButton}")`
  );
  clickAndWait(page, buttons.disableButton, buttons.enableButton);
  await page.waitForSelector(
    `button:visible:has-text("${buttons.enableButton}")`
  );
  const isTextboxDisabled = await page.getByRole("textbox").isDisabled();
  expect(isTextboxDisabled).toBe(true);
});
