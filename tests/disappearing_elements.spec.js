import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { menuItems } from "@data_assets/disappearing_elements";
import { getMenuItems } from "@datafactory/disappearing_elements";
const taskURL = Env.URL + "disappearing_elements";

test.beforeAll(async ({ browser }) => {
  let context = await browser.newContext();
  let page = context.newPage();
});
test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
});
test.afterAll(async ({ browser }) => {
  await browser.close();
});

test("Home menu item leads to Homepage", async ({ page }) => {
  await page.getByText("Home").click();
  await page.waitForEvent("domcontentloaded");
  expect(page.url()).toBe(Env.URL);
});

test("there are all 5 menu items (text content doesn't matter)", async ({ page }) => {
  await expect(page.getByRole("listitem")).toHaveCount(5);
});

test("the menu is in viewport - якщо деви накуролесили й воно зникло", async ({ page }) => {
  await expect(page.locator(`#content > div > ul`)).toBeInViewport();
});

test.describe(`separate check for each menu item`, async () => {
  test("Home menu item is present", async ({ page }) => {
    await expect(page.getByRole("listitem").nth(0)).toHaveText(`${menuItems[0]}`);
  });

  test("About menu item is present", async ({ page }) => {
    await expect(page.getByRole("listitem").nth(1)).toHaveText(`${menuItems[1]}`);
  });

  test("Contact menu item is present", async ({ page }) => {
    await expect(page.getByRole("listitem").nth(2)).toHaveText(`${menuItems[2]}`);
  });

  test("Portfolio menu item is present", async ({ page }) => {
    await expect(page.getByRole("listitem").nth(3)).toHaveText(`${menuItems[3]}`);
  });

  test("Gallery menu item is present", async ({ page }) => {
    await expect(page.getByRole("listitem").nth(4)).toHaveText(`${menuItems[4]}`);
  });
});
test(`each expected menu item is present, no matter the order`, async ({ page }) => {
  const siteAppMenuItems = await getMenuItems(page);
  menuItems.forEach((item) => {
    expect(siteAppMenuItems).toContain(item);
  });
});
