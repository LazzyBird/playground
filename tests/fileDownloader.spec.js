import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { appendReport } from "@helpers/reportHelper"
const loc = '#content > div > a';
const taskURL = Env.URL + "download";

//! список файлів кожен раз інший🧐
test('stupid link clicks approach', async ({ page }) => {
    await page.goto(taskURL);
    const data = await grabDownloadLinks(page);
    let index = data.fileNames.length;
    while (index--) {
        const downloadPromise = page.waitForEvent('download');
        await page.getByText(data.fileNames[index], { exact: true }).click();
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toBe(data.fileNames[index]);
    }

});
test('fetch approach', async ({ page }) => {
    await page.goto(taskURL);
    const data = await grabDownloadLinks(page);
    let index = data.fileNames.length;
    while (index--) {
        const response = await fetch(Env.URL + data.links[index]);
        try {
            if (response.ok) {
                continue;
            } else {
                const date = new Date();
                const corruptedFile = { URL: `${Env.URL}+ ${data.links[index]}`, "response status text": `${response.statusText}`, "response status code": `${response.status}`, date: `${date}` };
                appendReport(corruptedFile, grabDownloadLinks);
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
})
const grabDownloadLinks = async (page) => {
    let links = [];
    let fileNames = [];

    const allLinks = await page.locator(`${loc}`).all();

    for (const link of allLinks) {
        const href = await link.getAttribute("href");

        if (href) {
            const fileName = href.split('/').pop();

            if (fileName) {
                links.push(href);
                fileNames.push(fileName);
            } else {
                console.error(`Invalid href or fileName: ${href}`);
            }
        } else {
            console.error(`No href attribute for link`);
        }
    };

    return { links, fileNames };
}