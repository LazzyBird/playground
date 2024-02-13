import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/dynamic_controls";
let page;
// here I can place some helper function щоб не заважали в інших місцях
{
    async function clickAndWait(page, buttonBefore, buttonAfter, confirmationText) {
        await page.getByRole("button", { name: buttonBefore }).click();
        await expect(page.locator(`text=${confirmationText}`)).toBeVisible();
        await page.waitForSelector(`button:visible:has-text(${buttonAfter})`);
    }
    
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
// first step-by-step solution: a lot of excessive repeating code here
test("Remove button functionality", async ({ page }) => {
  await page.getByRole("button", { name: "Remove" }).click();
  await expect(
    page.locator('text="Wait for it..."').first().isVisible()
  ).resolves.toBe(true);
  await page.waitForSelector('button:visible:has-text("Add")');
  await expect(page.locator('text="It\'s gone!"').isVisible()).resolves.toBe(
    true
  );
  await expect(page.getByRole("checkbox").isVisible()).resolves.toBe(false);
});

test("Add button functionality", async ({ page }) => {
  await page.getByRole("button", { name: "Remove" }).click();
  await page.waitForSelector('button:visible:has-text("Add")');
  await page.getByRole("button", { name: "Add" }).click();
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

/* This solution need to be rewritten - there is no need to perform steps to reach state of page to check assertions
async function clickButtonAndWaitForChanges(
  page,
  buttonLocator,
  assertionLocator,
  expectedVisibility
) {
  // Click the button
  const button = await page.getByRole("button", buttonLocator);
  console.log(`Clicking button: ${buttonLocator.name}`);
  await button.click();

  // Wait for changes
  console.log(`Waiting for changes: ${assertionLocator}`);

  await page.waitForSelector(assertionLocator, { state: "attached" });

  // Confirm assertion
  const isVisible = await page.locator(assertionLocator).isVisible();
  console.log(`Asserting visibility: ${isVisible}, Expected: ${expectedVisibility}`);
  expect(isVisible).toBe(expectedVisibility);
}

test("Remove button functionality", async ({ page }) => {
  await clickButtonAndWaitForChanges(
    page,
    { name: "Remove" },
    'text="Wait for it..."',
    true
  );
  await expect(page.getByRole("checkbox").isVisible()).resolves.toBe(false);
});

test("Add button functionality", async ({ page }) => {
  await clickButtonAndWaitForChanges(
    page,
    { name: "Remove" },
    'button:visible:has-text("Add")',
    true
  );
  await clickButtonAndWaitForChanges(
    page,
    { name: "Add" },
    'button:visible:has-text("Remove")',
    true
  );
  await expect(page.getByRole("checkbox").isVisible()).resolves.toBe(true);
});

test("Enable button functionality", async ({ page }) => {
  await clickButtonAndWaitForChanges(
    page,
    { name: "Enable" },
    'button:visible:has-text("Disable")',
    false
  );
  await expect(page.getByRole("textbox").isDisabled()).resolves.toBe(false);
});

test("Disable button functionality", async ({ page }) => {
  await clickButtonAndWaitForChanges(
    page,
    { name: "Enable" },
    'button:visible:has-text("Disable")',
    false
  );
  await clickButtonAndWaitForChanges(
    page,
    { name: "Disable" },
    'button:visible:has-text("Enable")',
    true
  );
  await expect(page.getByRole("textbox").isDisabled()).resolves.toBe(true);
});
*/