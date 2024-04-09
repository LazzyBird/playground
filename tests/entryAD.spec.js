import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { getModalProperties } from "@datafactory/entryAD";

const taskURL = Env.URL + "entry_ad";

const textLocators = {
    modalHeader: "THIS IS A MODAL WINDOW",
    closeLink: "Close",
    renewLink: "click here"
}

test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
    await page.click(`text="${textLocators.closeLink}"`);
    await page.reload();
})

//DONE перевіряє по атрибутам div'а з модалом - розмір та видимість - без скріншоту та робить незалежний лог
//* невідомо якого біса я так складно тут навертіла але мені подобається як воно виконується, всі бігають суєтяться
//! прогнати який з них швидше працює на великій кількості повторів
test("Modal does not appear after closing without reset", async ({ page }) => {
    const data = await getModalProperties(page);
    expect(data).toHaveLength(0);
});
//DONE перевіряє по скріншоту, результати видає у звіті сам плейрайт, при запуску з командної строки з повторами нарешті покаже що тест flaky але це не так - баг то є то ні й #ценеми, а #воносамо
test('Modal does not appear after closing and reloading page - wholepage screenshot compare', async ({ page }) => {
    await expect(page).toHaveScreenshot();
});
//* перевіряє по атрибуту заголовка
test('Modal appears after clicking on renew link', async ({ page }) => {
    await page.click(`text="${textLocators.renewLink}"`);
    await expect(page.getByText(textLocators.modalHeader)).toBeVisible();
});
//* перевіряє по скріншоту
test('Modal appears after ckicking on renew link II', async ({ page }) => {
    await page.click(`text="${textLocators.renewLink}"`);
    await expect(page).toHaveScreenshot();
});
// npx playwright test -g "Modal does not appear after closing without reset" --repeat-each=20