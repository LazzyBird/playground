import { test } from "@playwright/test";

export const setUp = test.extend({
  siteApp: async ({ browser }, use) => {
    let page, context;
    context = await browser.newContext();
    page = await context.newPage();
    await use(page);
    await page.close();
    await context.close();
  },
});
