import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import Chance from "chance";
const chance = new Chance;

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'large');
});
// тут все гамузом, весь тектсовий контент діва порівнюється зі згенерованим масивом
test('siblings test', async ({ page }) => {
    const ref = siblRef();
    const siblings = await page.locator('#siblings').allInnerTexts();
    const cleanedData = siblings.join('\n').split('\n').filter(item => item !== '');
    expect(cleanedData.length).toBe(ref.length);
    expect(cleanedData).toEqual(ref);
})
function siblRef() {
    const siblingsReference = [];
    for (let i = 1; i < 51; i++) {
        const item = `${i}.`;
        for (let k = 1; k < 4; k++) {
            siblingsReference.push(item + k);
        }
    }
    return siblingsReference;
};


{ //* вкладені елементи з 1 по 50, в кожного 1-3 підпункти
    //* таблиця стовпці та рядки з 1 по 50, рядки заповнюються номерРядка.номерСтовпчика окрім <th> 
}