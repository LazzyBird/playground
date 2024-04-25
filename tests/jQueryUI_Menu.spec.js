import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + "jqueryui/menu");
});
//? підозріло просто так не може бути
test('click and download pdf', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Enabled' }).click();
    await page.getByRole('link', { name: 'Downloads' }).click();
    await page.getByRole('link', { name: 'PDF' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('menu.pdf')
});
test('Click Back.. in the menu should lead to  ', async ({ page }) => {
    await page.getByRole('link', { name: 'Enabled' }).click();
    await page.getByRole('link', { name: 'Back to JQuery UI' }).click();
    await page.waitForLoadState();
    expect(page.url()).toBe(Env.URL + 'jqueryui')
})
//? можливо для цього типу тестів можна створити клас меню, де будуть методи генерування назв та посилань, як взаємодіяти з цим елементом меню - клік ховер натискання кнопки, які івенти очікувати після виконання цих дій, а потім просто брати файли даних з текстовими значеннями та локалізаціями для генерування об'єктів для різних тест-кейсів? Це якось непрозоро й черезсрачно у JS, де є купа способів наваляти об'єктів окрім створення класу
//! це взагалі нормально відчувати екзистенційну кризу під час вивчення JS? Але ж цейво веб сторінки й вебаплікації найпростіше тестувати згодовуючи JS через девтулз протокол браузера 🪦бо можна тут же вручну відкрити браузер й перевірити тим самим js що там відбувається