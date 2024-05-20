import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const text = {
    h1: 'Simple template',
    first: `Let's have some different text!`,
    second: `In a list!`
}
test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'shadowdom')
});

test('whole page section by text', async ({ page }) => {
    expect(page.locator('h1')).toContainText(text.h1);
    expect(page.getByText(text.first).first()).toBeVisible();
    expect(page.getByText(text.second)).toBeVisible();
    expect(page.getByText(text.first).nth(1)).toBeVisible();
    expect(page.locator('ul')).toContainText(text.first);
    expect(page.locator('li').first()).toContainText(text.first);
    expect(page.locator('li').nth(1)).toContainText(text.second);
});