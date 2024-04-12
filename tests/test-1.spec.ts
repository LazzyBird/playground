import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  await page.locator('#file-upload').click();
  await page.locator('#file-upload').setInputFiles('random_data - Copy.txt');
  await page.getByRole('button', { name: 'Upload' }).click();
  await expect(page.getByRole('heading')).toContainText('File Uploaded!');
  await expect(page.locator('#uploaded-files')).toContainText('random_data - Copy.txt');
});