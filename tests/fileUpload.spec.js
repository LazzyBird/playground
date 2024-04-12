import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "upload";

test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
})
test('upload file with form', async ({ page }) => {
    await page.locator('#file-upload').setInputFiles(`./lib/data_assets/test_files/random_data.txt`);
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.locator('#uploaded-files')).toContainText(`random_data.txt`);
    await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
});
//* опщім ця хірня працює але ніфіга не абстрагована, конкретна така хірня, як гопник з Оболоні
test(`Upload with drag-and-drop`, async ({ page }) => {

 })