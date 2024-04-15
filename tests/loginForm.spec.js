import { test, expect } from '@playwright/test';
import Env from '@helpers/env';
import { loginFormData } from '@data_assets/loginForm';
import { loginAction } from '@helpers/loginForm';
import Chance from 'chance';
const chance = new Chance();

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + "login");
});

test('correct creds -> success message', async ({ page }) => {
    await loginAction(page, loginFormData.username, loginFormData.password);
    expect(page.getByText(loginFormData.successMessage)).toBeVisible();
});

test('empty creds -> error message', async ({ page }) => {
   await loginAction(page, '', '');
    expect(page.getByText(loginFormData.errorMessage)).toBeVisible();
});

test('logout functionality', async ({ page }) => {
    await loginAction(page, loginFormData.username, loginFormData.password);
    expect(page.getByText(loginFormData.successMessage)).toBeVisible();
    await page.getByText(loginFormData.logoutButton, { exact: true }).click();
    await page.waitForLoadState();
    expect(page.getByText(loginFormData.logoutMessage)).toBeVisible();
});

test('random creds -> error message', async ({ page }) => {
   await loginAction(page, chance.name(), chance.word({ length: 12 }));
    expect(page.getByText('Your username is invalid!')).toBeVisible();
});