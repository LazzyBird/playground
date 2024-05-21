import { test, expect } from "@playwright/test";
import { screenShoter } from "@datafactory/screenShoter";
import Env from "@helpers/env";
const columns = [
    'Last Name', 'First Name', 'Email', 'Due', 'Web Site'
]
test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'tables');
});
// чисто подивитися чи змінює щось клік по назві стовпчику
test.describe('table 1', async () => {
    test('clicking on each column header changes sorting', async ({ page }) => {
        const before = await screenShoter(page, '#table1', false);
        for (let i = 0; i < columns.length; i++) {
            await page.locator('#table1').getByText(columns[i]).click();
            const after = await screenShoter(page, '#table1', false);
            expect(after).not.toBe(before);
        };
    })
});
//? там у другій таблиці проставлені id та класи але мені в принціпі пофігу бо я просто беру page.locator('#table2').getByText(..) й все. 