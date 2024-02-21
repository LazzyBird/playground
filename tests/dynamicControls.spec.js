import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/dynamic_controls";
let page;
// here I can place some helper function щоб не заважали в інших місцях
{
  async function clickAndWait(
    page,
    buttonBefore,
    buttonAfter,
    confirmationText
  ) {
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