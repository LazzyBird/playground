import { test, expect } from "@playwright/test";
import Env from "@helpers/env"

const taskURL = Env.URL + "dynamic_loading/";
let page;
const text = {
    wait: "Loading..",
    finish: "Hello World!"
};
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async () => {
    await page.close();
});
//! всі транзакціі станів схованих елементів перевіряються у правильному порядку 😃
//? той випадок коли багато assertions is gooooooood
test("Hidden text appears after clicking and waiting", async ({ page }) => {
    await page.goto(taskURL + "1");
    expect(page.getByText(text.wait)).not.toBeVisible();
    expect(page.getByText(text.wait)).toBeAttached();
    expect(page.getByText(text.finish)).not.toBeVisible();
    expect(page.getByText(text.finish)).toBeAttached();
    await page.getByRole("button", { name: "Start" }).click();
    expect(page.getByText(text.wait)).toBeVisible();
    await expect(page.getByText(text.finish)).toBeVisible();
    expect(page.getByText(text.wait)).not.toBeVisible();
});
test("Hidden element is rendered after clicking", async ({ page }) => {
    await page.goto(taskURL + "2");
    expect(page.getByText(text.finish)).not.toBeAttached();
    expect(page.getByText(text.wait)).not.toBeAttached();
    await page.getByRole("button", { name: "Start" }).click();
    expect(page.getByText(text.wait)).toBeAttached();
    expect(page.getByText(text.wait)).toBeVisible();
    await expect(page.getByText(text.finish)).toBeAttached();
    await expect(page.getByText(text.finish)).toBeVisible();
    expect(page.getByText(text.wait)).not.toBeVisible();
})