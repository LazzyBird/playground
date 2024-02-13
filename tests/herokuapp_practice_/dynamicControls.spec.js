import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/dynamic_controls";
let page;
// here I can place some helper function щоб не заважали в інших місцях
test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open Dynamic Controls URL", async ({ page }) => {
  await page.goto(`${taskURL}`, { timeout: 30000 });
});
// сторінка завантажується з чекбоксом та кнопокою "Прибрати"
// після кліку по неї чекбокс зникає, з'являється повідомлення "Очікуйте", потім напис "Воно зникло", напис на кнопці змінюється на "Додати"
// чи треба все робити в одному тесті як е2е
test("Remove button functionality", async ({ page }) => {
  await page.getByRole("button", { name: "Remove" }).click();
  await expect(
    page.locator('text="Wait for it..."').first().isVisible()
  ).resolves.toBe(true);
  await page.waitForSelector('button:visible:has-text("Add")');
  await expect(
    page.getByRole("button", { name: "Add" }).isVisible()
  ).resolves.toBe(true);
  await expect(page.locator('text="It\'s gone!"').isVisible()).resolves.toBe(
    true
  );
});
