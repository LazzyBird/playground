import { test, expect } from "@playwright/test";
import Env from "@helpers/env"
import { buttons, texts } from "@data_assets/dynamicControls"
const taskURL = Env.URL + "dynamic_controls"; let page;

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
});

test("Remove button functionality", async ({ page }) => {
  await page.getByRole("button", { name: `${buttons.removeButton}` }).click();
  await expect(
    page.locator(`text=${texts.waitText}`).first().isVisible()
  ).resolves.toBe(true);
  await page.waitForSelector(`button:visible:has-text(${buttons.addButton})`);
  await expect(page.locator(`text=${confirmationText.removeConfirmation}`).isVisible()).resolves.toBe(
    true
  );
  await expect(page.getByRole("checkbox").isVisible()).resolves.toBe(false);
});

test("Add button functionality", async ({ page }) => {
  await page.getByRole("button", `${buttons.removeButton}`).click();
  await page.waitForSelector('button:visible:has-text("Add")');
  await page.getByRole("button", { name: `${buttons.addButton}` }).click();
  await page.waitForSelector('button:visible:has-text("Remove")');
  await expect(page.getByRole("checkbox").isVisible()).resolves.toBe(true);
});

test("Enable button functionality", async ({ page }) => {
  await page.getByRole("button", { name: "Enable" }).click();
  await page.waitForSelector('button:visible:has-text("Disable")');
  await expect(page.getByRole("textbox").isDisabled()).resolves.toBe(false);
});

test("Disable button functionality", async ({ page }) => {
  await page.getByRole("button", { name: "Enable" }).click();
  await page.waitForSelector('button:visible:has-text("Disable")');
  await page.getByRole("button", { name: "Disable" }).click();
  await page.waitForSelector('button:visible:has-text("Enable")');
  await expect(page.getByRole("textbox").isDisabled()).resolves.toBe(true);
});