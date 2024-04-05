import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/entry_ad');
  await page.getByText('Close', { exact: true }).click();
  await page.goto('https://the-internet.herokuapp.com/entry_ad');
  await page.goto('https://the-internet.herokuapp.com/entry_ad');
  await page.getByRole('link', { name: 'click here' }).click();
  await page.goto('https://the-internet.herokuapp.com/entry_ad');
  await page.getByText('Close', { exact: true }).click();
});