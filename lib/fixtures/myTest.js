import { test } from "@playwright/test";
// import Env from "@helpers/env";
export const mainFlow = test.extend({
  siteApp: async ({ browser }, use) => {
    let page, context;
    context = await browser.newContext();
    page = await context.newPage();
    // await page.goto(`${Env.URL}`);
    await use(page);
    await page.close();
    await context.close();
  },
});
