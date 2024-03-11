import { test } from "@playwright/test";
// пробний варіант винести гачки в фікстуру, але він якийсь кострубатий. Але тести повністю ізольовані
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
export const template = text.extend({
  someName: async ({ page }, use) => {
    // щось що буде робитися перед кожним тестом
    await use(page);
    // щось що буде виконуватися після кожного тесту
    /*
    в цей до/після блок можна вставляти авторизацію, створення якихось сутностей(об'єктів), очистку бд додатку від створенних для тестування сутностей через API (не використовувати для цього UI, для нього окремі тести й налаштування). 
    */
  }
})