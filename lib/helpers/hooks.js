import { test } from "@playwright/test";
/*
а чи можна сюди винести кастомні beforeAll та beforeEach, щоб кожного разу не писати з кожним тестом
*/
export async function browserSetup({ page }) {
  test.beforeAll(async ({ browser }) => {
    let context = await browser.newContext();
    let page = context.newPage();
  });
}
// але щось воно не робе як думалося