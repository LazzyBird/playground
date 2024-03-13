import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "context_menu";
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

test(" Right-click on the div id=hot-spot calls alert dialog", async ({ page }) => {
  page.once("dialog", (dialog) => {
    const text = dialog.message();
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
    expect(text).toEqual("You selected a context menu");
  });
  await page.locator("#hot-spot").click({
    button: "right",
  });
});
