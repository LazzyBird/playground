import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/context_menu";
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

test(" Right-click on the div id=hot-spot calls alert dialog", async({page}) => {
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator("#hot-spot").click({
      button: "right"
    });
})