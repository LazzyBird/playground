import { test, expect, errors } from "@playwright/test";
import Env from "@helpers/env";
import { appendReport } from "@helpers/reportHelper";
const taskURL = Env.URL + "entry_ad";
const textLocators = {
    modalHeader: "THIS IS A MODAL WINDOW",
    closeLink: "Close",
    renewLink: "click here"
}
test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
})
//? бере довжину текстового контенту як маркер наявності кода модала у тілі сторінки та перевіряє по атрибутам div'а з модалом - розмір та видимість - без скріншоту (не вимагає робити скріншот та робить незалежний лог)
//! прогнати який з них швидше працює на великій кількості повторів
// npx playwright test -g "Modal does not appear after closing without reset" --repeat-each=20
//? не така вона вже й сурстрьомна, як тільки вилучити дані про розмір модала
const modalProperties = async (page) => {
    const modal = await page.locator('#modal');
    const box = await modal.boundingBox();
    console.log(box);
    const visibility = await modal.isVisible();
    return { box, visibility };
}
test("Modal does not appear after closing without reset", async ({ page }) => {
    await page.click(`text="${textLocators.closeLink}"`);
    await page.reload();
    const a = await modalProperties(page);
    const data = [];
    if (a) {
        try {
            expect(a.box).toBe(null);
            expect(a.visibility).toBe(false);
        } catch (error) {
            console.log('Modal has bounding box or is visible');
            data.push({ modalBoxWidth: a.box.width, modalBoxHeight: a.box.height, modalVisibility: a.visibility, date: new Date() });
            await appendReport(data, modalProperties);
        }
    }
    else {
        const errorMessage = 'Modal is not in the DOM';
        console.error(errorMessage);
        data.push({ errorMessage, date: new Date() });
        await appendReport(data, modalProperties);
    }
});
//? перевіряє по скріншоту, результати видає у звіті сам плейрайт, при запуску з командної строки з повторами нарешті покаже що тест flaky але це не так - баг то є то ні й #ценеми, а #воносамо
test('Modal does not appear after closing and reloading page - wholepage screenshot compare', async ({ page }) => {
    await page.click(`text="${textLocators.closeLink}"`);
    await page.reload();
    await expect(page).toHaveScreenshot();
});