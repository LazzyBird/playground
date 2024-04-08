import { test, expect, errors } from "@playwright/test";
import Env from "@helpers/env";
import { putReport } from "@helpers/reportHelper";
const taskURL = Env.URL + "entry_ad";
const textLocators = {
    modalHeader: "THIS IS A MODAL WINDOW",
    closeLink: "Close",
    renewLink: "click here"
}
test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
})
test("Modal does not appear after closing without reset", async ({ page }) => {
    //? перевіряє по атрибутам div'а з модалом - розмір та видимість - без скріншоту (не вимагає робити скріншот та робить незалежний лог)
    //! прогнати який з них швидше працює на великій кількості повторів
    await page.click(`text="${textLocators.closeLink}"`);
    await page.reload();
    let text = await page.locator('#modal').textContent();
    text = text.length;
    const data = [];
    if (text) {
        try {
            const a = await modalProperties(page);
            expect(a.box).toBe(null);
            expect(a.visibility).toBe(false);
        } catch (error) {
            console.log('Modal has bounding box or is visible');
            data.push({ a.box, a.visibility });
        }
    }
    else {
        throw new Error('Modal is not in the DOM 🛸')
    }
});
//? перевіряє по скріншоту, рещультати видає у ззвіті сам плейрайт, при запуску з командної строки з повторами нарешті покаже що тест flaky але це не так - баг то є то ні #ценеми
test('Modal does not appear after closing and reloading page - wholepage screenshot compare', async ({ page }) => {
    await page.click(`text="${textLocators.closeLink}"`);
    await page.reload();
    await expect(page).toHaveScreenshot();
});

//! така само сурстрьомна функція, ну її потім видалю, якесь прокляття
const modalProperties = async (page) => {
    const modal = await page.locator('#modal');
    const box = await modal.boundingBox();
    const visibility = await modal.isVisible();
    return { box, visibility };
}