import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/disappearing_elements";
const menuItems = ["Home", "About", "Contact Us", "Portfolio", "Gallery"];
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

test("there are 5 items in the menu", async ({ page }) => {
  await expect(page.getByRole("listitem")).toHaveCount(5);
});

test("there are all text items", async ({ page }) => {
  await expect(page.getByRole("list")).toContainText(`${menuItems}`);
});

test("Home menu item is present", async ({ page }) => {
  await expect(page.getByRole("listitem").nth(1)).toHaveText(`${menuItems[0]}`);
});

test("About menu item is present", async ({ page }) => {
  await expect(page.getByRole("listitem").nth(2)).toHaveText(`${menuItems[1]}`);
});

test("Contact menu item is present", async ({ page }) => {
  await expect(page.getByRole("listitem").nth(3)).toHaveText(`${menuItems[2]}`);
});

test("Portfolio menu item is present", async ({ page }) => {
  await expect(page.getByRole("listitem").nth(4)).toHaveText(`${menuItems[3]}`);
});

test("Gallery menu item is present", async ({ page }) => {
  await expect(page.getByRole("listitem").nth(5)).toHaveText(`${menuItems[4]}`);
});
