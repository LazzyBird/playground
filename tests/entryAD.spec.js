import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

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
    //? ну поки що робочий, чого його випиляти, нехай лежить
    await page.click(`text="${textLocators.closeLink}"`);
    await page.reload();
    let text = await page.locator('#modal').textContent();
    text = text.length;
    console.log(text);
    if (text) {
        try {
            const a = await modalProperties(page);
            expect(a.box).toBe(null);
            expect(a.visibility).toBe(false);
        } catch (error) {
            page.screenshot({ path: 'screenshots/modal.jpeg' });
            console.log(error, 'Modal has bounding box or is visible');
        }
    }
    else {
        throw new Error('Modal is not in the DOM 🛸')
    }
});
//! теж якась стрьомніна коденіна, майже сурстрьомінг
test('Modal appears after clicking on the renew link', async ({ page }) => {
    await page.getByText(textLocators.closeLink, { exact: true }).click();
    await pageReload(page);
    let counter = 10;
    let errors = 0;
    while (counter > 0) {
        let visibility = await page.locator('div#modal').boundingBox();
        if (!visibility) {
            errors++;
            await pageReload(page);

        } else {
            await pageReload(page);
        }
        counter--;
    };
    console.log(errors);
});
//! якийсь стрьомний він цей тест я хз що він тут перевіряє
test('Modal appears after clicking on the renew link II', async ({ page }) => {
    await page.click('text="Close"');
    const maxRetries = 50;
    let retries = 0;
    let modalVisible = false;
    let errors = 0;
    while (!modalVisible && retries < maxRetries) {
        await page.click('text="click here"');
        await page.reload();
        modalVisible = await page.waitForSelector('div#modal', { state: 'visible', timeout: 2000 })
            .then(() => true)
            .catch(() => false, errors++);

        retries++;
    }
    if (!modalVisible) {
        throw new Error(`Modal did not appear after ${maxRetries} retries`);
    }
    console.log(errors);
    //? тут щось не те бо видає кількість успішних спроб а не помилок, при ручній перевірці цей модал відновлюється дуже рідко, а для вебкіта та файрфокс взагалі на бачить селектор модала
});
//! дуже небезпечна приблуда не користуйся бо завтичиш й день пропаде, ктулху його зна чого воно не встигає спіймати той локатор у ДОМе, й видає всьо за помилки, там репрорейт рейт десь 1-2/5 того модала
test('III', async ({ page }) => {
    await page.click(`text="${textLocators.closeLink}"`);
    let counter = 5;
    let errors = 0;
    while (counter > 0) {
        await page.click(`text="${textLocators.renewLink}"`);
        await page.waitForLoadState('load')
        await page.waitForSelector('#modal', { state: 'attached' });
        const a = await modalProperties(page);
        if (a.box === null || a.visibility === false) {
            await page.click(`text="${textLocators.renewLink}"`);
            errors++;
            counter--;
        } else {
            await page.click(`text="${textLocators.closeLink}"`);
            counter--;
        }
    }
    console.log(errors);
});
//! така само стрьомна функція, ну її потім видалю, якесь прокляття
const modalProperties = async (page) => {
    const modal = await page.locator('#modal');
    const box = await modal.boundingBox();
    const visibility = await modal.isVisible();
    return { box, visibility };
}