import { test, expect } from '@playwright/test';
let taskURL =
    "https://the-internet.herokuapp.com/basic_auth";


test('response status code is 401 until authenticated', async ({ request }) => {
    let response = await request.get(taskURL);
    await expect(response.status()).toBe(401);
})
/*
test('Valid credentials', async ({ page }) => {
  page.on('dialog', async (dialog) => {
    await dialog.accept({ username: 'admin', password: 'admin' });
  })
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('p')).toHaveText('Congratulations! You must have the proper credentials.');
});

test('Dismiss dialog', async ({ page }) => {
  page.on('dialog', async (dialog) => {
    await dialog.dismiss();
  })
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(response.statusCode().toBe(401));
  await expect(response.body().toContainText('unauthorized'));
})
*/