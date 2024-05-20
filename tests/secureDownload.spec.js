import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + 'download_secure';
const credentials = {
    username: Env.ADMIN_NAME,
    password: Env.ADMIN_PASSWORD,
};
test("unauthorized get request returns 401", async ({ request }) => {
    let response = await request.get(taskURL);
    expect(response.status()).toBe(401);
});
test('dismiss dialog', async ({ page }) => {
    page.on('dialog', dialog => dialog.dismiss());
    await page.goto(taskURL);
    expect(page.getByText('Not Authorized')).toBeVisible();
});
test("secure download with httpCreds added to context", async ({ browser }) => {
    const context = await browser.newContext({
        httpCredentials: credentials,
    });
    const page = await context.newPage();
    await page.goto(taskURL);
    await expect(page.getByText('Secure File Downloader')).toBeVisible();
});
//+ сюди можна нанести тести з даунлоадера, але по суті це комбо з basic auth та download - так що не парюся. поки що невловимий цей промпт.
/* test('enter correct creds II', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // Встановлюємо обробку діалогу перед переходом на сторінку
    const dialogPromise = new Promise(resolve => {
        page.on('dialog', async dialog => {
            await dialog.accept(credentials);
            resolve();
        });
    });
    // Переходимо на сторінку та чекаємо на обробку діалогу одночасно
    await Promise.all([
        dialogPromise,
        page.goto(Env.URL + 'download_secure')
    ]);
    console.log(page.locator('body'))
    //await expect(page.getByText('Secure File Downloader')).toBeVisible();
    await context.close();
});
 */