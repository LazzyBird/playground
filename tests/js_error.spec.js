import { test, expect } from '@playwright/test';
import Env from '@helpers/env';
const taskURL = Env.URL + 'javascript_error'

test('read console message', async ({ page }) => {
    const logs = [], errors = [];
    page.on('console', (message) => {
        logs.push({ message, type: message.type() })
    });
    page.on('pageerror', (exception) => {
        errors.push(exception);
    })
    await page.goto(taskURL);
    expect.soft(logs.length).toBe(0);
    console.log(logs, errors);
    expect(errors.length).toBe(0);
});
/* 
test('fetch url', async () => {
    const response = await fetch(taskURL);
    expect(response.statusText).toBe("OK");
});
test('get text', async ({ page }) => {
    await page.goto(taskURL);
    const text = await page.locator('p').allInnerTexts();
    console.log(text);
})
 */