import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { brokenLinkCounter } from "@datafactory/fileDownload";
const loc = '#content > div > a';
const taskURL = Env.URL + "download";

test('stupid link clicks approach', async ({ page }) => {
    await page.goto(taskURL);
    const data = await brokenLinkCounter(page, loc);
    let index = data.fileNames.length;
    while (index--) {
        const downloadPromise = page.waitForEvent('download');
        await page.getByText(data.fileNames[index], { exact: true }).click();
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toBe(data.fileNames[index]);
    }

});
//TODO все ніби то ок але лог пишеться якогось біса в один рядок, хоча .join('\n') використовується в функції форматування даних
test('fetch approach', async ({ page }) => {
    await page.goto(taskURL);
    const result = await brokenLinkCounter(page, loc);
    expect(result.counter).toBe(result.counterTotal);
});
