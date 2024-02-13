import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/dynamic_controls";
let page;
// data section
const buttons = {
  removeButton: "Remove",
  addButton: "Add",
  enableButton: "Enable",
  disableButton: "Disable"
};
// helper function
async function clickAndWait(page, buttonBefore, buttonAfter) {
  const beforeButtonLocator = { name: buttonBefore };
  const afterButtonLocator = { name: buttonAfter };

  await page.getByRole("button", { name: buttonBefore }).click();
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
