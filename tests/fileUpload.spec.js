import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "upload";
import * as fs from 'fs';
test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
});

//* опщім ця хірня працює але ніфіга не абстрагована, конкретна така хірня, як гопник з Оболоні
test('upload file with form', async ({ page }) => {
    await page.locator('#file-upload').setInputFiles(`./lib/data_assets/test_files/random_data.txt`);
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.locator('#uploaded-files')).toContainText(`random_data.txt`);
    await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
});

//? а чи варто тут длубатися з драг-н-дропом? воно ж це робить з вікна системи, не браузера ---- fахаххахах воно робиться через buffer
test(`Upload with drag-and-drop`, async ({ page }) => {
    // Read your file into a buffer.
    const buffer = fs.readFileSync('./lib/data_assets/test_files/random_data.txt');
    // Create the DataTransfer and File
    const dataTransfer = await page.evaluateHandle((data) => {
        const dt = new DataTransfer();
        // Convert the buffer to a hex array
        const file = new File([data.toString('hex')], 'random_data.txt', { type: 'text/plain' });
        dt.items.add(file);
        return dt;
    }, buffer);
    // Now dispatch
    await page.dispatchEvent('YOUR_TARGET_SELECTOR', 'drop', { dataTransfer });
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.locator('#uploaded-files')).toContainText(`random_data.txt`);
    await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
});