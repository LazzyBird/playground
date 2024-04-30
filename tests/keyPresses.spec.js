import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { key } from "@data_assets/keyMap"
test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + "key_presses");
});
//+ зробив більш менш відповідаючу дійсності мапу, keyMap.js
test('pressed key name appeared after it was pressed', async ({ page }) => {
    await page.focus('#target');
    const a = key();
    await page.keyboard.press(a.randomKey);
    const actualValue = await page.locator('#result').allTextContents();
    expect(actualValue).toContain(`You entered: ${a.expectedValue}`);
});
//! проблема цієї сторінки що вона використовує методи які більше не підтримуються, отож маємо насправді 1) баг використання застарілого методу, 2) мапа клавіатури, яка використовується в скрипті на сайті вона взагалі ліва, там є значення які не знає плейрайт. Чисто гипотетично девелопери можуть впертися й продовжувати використовувати цей метод.
//* якось протестовано, який скрипт такий й тест 