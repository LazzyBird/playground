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
})

//? перевіряє по атрибутам div'а з модалом - розмір та видимість - без скріншоту (не вимагає робити скріншот та робить незалежний лог)
//! прогнати який з них швидше працює на великій кількості повторів
// npx playwright test -g "Modal does not appear after closing without reset" --repeat-each=20
test("Modal does not appear after closing without reset", async ({ page }) => {
    await page.click(`text="${textLocators.closeLink}"`);
    await page.reload();
    const data = await getModalProperties(page);
    expect(data).toHaveLength(0);
});
//? перевіряє по скріншоту, результати видає у звіті сам плейрайт, при запуску з командної строки з повторами нарешті покаже що тест flaky але це не так - баг то є то ні й #ценеми, а #воносамо
test('Modal does not appear after closing and reloading page - wholepage screenshot compare', async ({ page }) => {
    await page.click(`text="${textLocators.closeLink}"`);
    await page.reload();
    await expect(page).toHaveScreenshot();
});