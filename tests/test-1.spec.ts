import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('chrome-error://chromewebdata/');
  await page.goto('https://the-internet.herokuapp.com/download_secure');
  await expect(page.getByRole('heading', { name: 'Secure File Downloader' })).toBeVisible();
});