import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/dynamic_controls";
let page;
// here I can place some helper function щоб не заважали в інших місцях
async function clickAndWait(page, buttonBefore, buttonAfter, confirmationText) {
  const beforeButtonLocator = { name: buttonBefore };
  const afterButtonLocator = { name: buttonAfter };

  await page.getByRole("button", { name: buttonBefore }).click();
  await expect(page.locator(`text=${confirmationText}`).first()).toBeVisible();
  const afterButton = await page.waitForSelector(
    `button:visible:has-text("${buttonAfter}")`
  );
  await afterButton.evaluate((button) => button);

  return {
    beforeButtonLocator,
    afterButtonLocator,
    afterButton
  };
}
//
//
test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open Dynamic Controls URL", async ({ page }) => {
  await page.goto(`${taskURL}`, { timeout: 30000 });
});

test("Remove button functionality", async ({ page }) => {
  await clickAndWait(page, "Remove", "Add", "Wait for it...");
  const isCheckboxVisible = await page.getByRole("checkbox").isVisible();
  expect(isCheckboxVisible).toBe(false);
});

test("Add button functionality", async ({ page }) => {
  clickAndWait(page, "Remove", "Add", "It's gone!");
  await page.waitForSelector('button:visible:has-text("Add")');
  clickAndWait(page, "Add", "Remove", "Wait for it...");
  await page.waitForSelector('button:visible:has-text("Remove")');
  const isCheckboxVisible = await page.getByRole("checkbox").isVisible();
  expect(isCheckboxVisible).toBe(true);
});

test("Enable button functionality", async ({ page }) => {
  await clickAndWait(page, "Enable", "Disable", "It's enabled!");
  const isTextboxDisabled = await page.getByRole("textbox").isDisabled();
  expect(isTextboxDisabled).toBe(false);
});

test("Disable button functionality", async ({ page }) => {
  clickAndWait(page, "Enable", "Disable", "It's enabled!", { timeout: 3000 });
  await page.waitForSelector('button:visible:has-text("Disable")');
  clickAndWait(page, "Disable", "Enable", "It's disabled!");
  await page.waitForSelector('button:visible:has-text("Enable")');
  const isTextboxDisabled = await page.getByRole("textbox").isDisabled();
  expect(isTextboxDisabled).toBe(true);
});
