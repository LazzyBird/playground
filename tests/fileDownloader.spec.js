import { test, expect } from "@playwright/test";
import * as fs from "fs";
import Env from "@helpers/env";
const loc = '#content > div > a';
const taskURL = Env.URL + "download";

test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
});
//! список посилань сьогодні не той що вчора 🧐
test('123', async ({ page }) => {
    const l = await grabDownloadLinks(page);
    console.log(l);
});
const grabDownloadLinks = async (page) => {
    let links = [];
    const allLinks = await page.locator(`${loc}`).all();
    for (const link of allLinks) {
        const href = await link.getAttribute("href");
        if (href) {
            links.push(href);
        }
    }
    return links;
}
