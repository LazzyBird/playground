//@ts-check
import { test, expect } from "@playwright/test";
let taskURL = 'https://kitchen.applitools.com/ingredients/alert';
let page; 

test.beforeAll(async () => {
    await page.goto(taskURL);
});


