import { expect } from "@playwright/test";
import Env from "@helpers/env";
import { menuItems } from "@data_assets/disappearing_elements";
import { getMenuItems } from "@datafactory/disappearing_elements";
import { setUp as test } from "@fixtures/myTest";
const taskURL = Env.URL + 'disappearing_elements'

test("Home menu item leads to Homepage", async ({ siteApp }) => {
  await siteApp.goto(taskURL);
  await siteApp.getByText("Home").click();
  await siteApp.waitForEvent("domcontentloaded");
  expect(siteApp.url()).toBe(Env.URL);
});

test("there are all 5 menu items (text content doesn't matter)", async ({ siteApp }) => {
  await expect(siteApp.getByRole("listitem")).toHaveCount(5);
});

test("the menu is in viewport", async ({ siteApp }) => {
  await expect(siteApp.locator(`#content > div > ul`)).toBeInViewport();
});

test.describe(`separate check for each menu item`, async () => {
  test("Home menu item is present", async ({ siteApp }) => {
    await expect(siteApp.getByRole("listitem").nth(0)).toHaveText(`${menuItems[0]}`);
  });

  test("About menu item is present", async ({ siteApp }) => {
    await expect(siteApp.getByRole("listitem").nth(1)).toHaveText(`${menuItems[1]}`);
  });

  test("Contact menu item is present", async ({ siteApp }) => {
    await expect(siteApp.getByRole("listitem").nth(2)).toHaveText(`${menuItems[2]}`);
  });

  test("Portfolio menu item is present", async ({ siteApp }) => {
    await expect(siteApp.getByRole("listitem").nth(3)).toHaveText(`${menuItems[3]}`);
  });

  test("Gallery menu item is present", async ({ siteApp }) => {
    await expect(siteApp.getByRole("listitem").nth(4)).toHaveText(`${menuItems[4]}`);
  });
});
test(`each expected menu item is present, no matter the order`, async ({ siteApp }) => {
  const siteAppMenuItems = await getMenuItems(siteApp);
  menuItems.forEach((item) => {
    expect(siteAppMenuItems).toContain(item);
  });
});
