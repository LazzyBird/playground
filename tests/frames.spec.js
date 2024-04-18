import { test, expect } from '@playwright/test';
import Env from '@helpers/env';
import exp from 'constants';

const nestedFramesURL = Env.URL + "nested_frames";
const iframeURL = Env.URL + "iframe";
const nestedFrames = {
    frame_left: "LEFT",
    frame_middle: "MIDDLE",
    frame_right: "RIGHT",
    frame_bottom: "BOTTOM"
};
const f_url = Object.keys(nestedFrames);
//? мама мія хір уі го егейн май май хау кен ай резіст ю
//? що тут перевіряти?
test('Nested Frames all 4 are visible by screenshot', async ({ page }) => {
    await page.goto(nestedFramesURL);
    await page.waitForLoadState();
    await expect(page).toHaveScreenshot();
});
//TODO працює та коректно повертає текст з фрейма, можна винести у функцію але наразі влом
test('frame by its urls', async ({ page }) => {
    for (const key of f_url) {
        await page.goto(Env.URL + key);
        await page.waitForLoadState();
        //const text = await page.locator('body').innerText();
        await expect(page.locator('body')).toHaveText(nestedFrames[`${key}`]);
        // console.log(text);
    }
});

//* тут плейрайт норм взаємодіє з елементами редактора (робила перевірку взяти дефортний текст з поля тексту - текст було повернено у консоль), поле для введення очищується, перевірка по скриншоту. Така собі базова перевірка, більше напридумую у відповідному сьюті
test(`iFrame with TinyMCE editor`, async ({ page }) => {
    await page.goto(iframeURL);
    const a = await page.screenshot();
    await page.getByText('File').click();
    await expect(page.getByText('New document')).toBeVisible();
    await page.getByText('New document').click();
    expect(page.screenshot()).not.toBe(a);
});