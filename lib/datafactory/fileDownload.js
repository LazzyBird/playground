import { appendReport } from "@helpers/reportHelper";
import Env from "@helpers/env";

const grabDownloadLinks = async (page, loc) => {
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
};
export const brokenLinkCounter = async (page, loc) => {
    const links = await grabDownloadLinks(page, loc);
    const counterTotal = links.links.length;
    let counter = 0;
    for (const link of links.links) {
        const url = Env.URL + link;
        const response = await fetch(url);
        if (response.ok) {
            counter++;
        } else {
            const corruptedFile = { "response status text": `${response.statusText}`, "response status code": `${response.status}`, date: `${new Date()}`, URL: `${url}` };
            await appendReport([corruptedFile], grabDownloadLinks);
        }
    };
    return { counter, counterTotal };
}