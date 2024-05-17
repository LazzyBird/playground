import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

test('enter correct creds', async ({ page }) => {
    await page.goto(Env.URL + 'download_secure');
    /*  page.on('dialog', async (prompt) => {
         console.log(prompt.message());
      prompt.accept('Username': Env.ADMIN_NAME, 'Password': Env.ADMIN_PASSWORD);
     }); */
    page.on('dialog', dialog => {
        dialog.dismiss()
    });
    console.log(page.innerText());
    //expect(page.getByText('Secure File Downloader')).toBeVisible();
});