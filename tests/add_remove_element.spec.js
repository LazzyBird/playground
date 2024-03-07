import { test, expect } from '@playwright/test';
import Env from "@helpers/env";
const taskURL = Env.URL + "add_remove_elements/";
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
  await page.waitForLoadState('load');
});

test('page have add element button', async({ page }) => {
  await expect(page.getByText('Add Element')).toBeVisible();
});
test('element was created after clicking the button', async({ page }) => {
  await page.getByText('Add Element').click();
  await expect(page.getByText('Delete')).toBeVisible();
});
test('element was deleted after clicking the button', async({ page }) => {
  await page.getByText('Add Element').click();
  await page.getByText('Delete').click();
  await expect(page.getByText('Delete')).not.toBeInViewport();
});
