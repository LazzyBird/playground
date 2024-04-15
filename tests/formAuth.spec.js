import { test, expect } from '@playwright/test';
import Env from '@helpers/env';
import { loginFormData } from '@data_assets/loginForm';
import { loginAction } from '@helpers/loginForm';
import Chance from 'chance';
const chance = new Chance();

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + "login");
});
/* 
test('correct creds -> success message', async ({ page }) => {
    await loginAction(page, loginFormData.username, loginFormData.password);
    expect(page.getByText(loginFormData.successMessage)).toBeVisible();
}); */

test('empty creds -> error message', async ({ page }) => {
   await loginAction(page, '', '');
    expect(page.getByText(loginFormData.errorMessage)).toBeVisible();
});
//? якщо цей тест перевіряє як виконання входу з коректними даними, так ц вихід після цього, тo просто логін тест можна не запускати?
test('login&logout functionality', async ({ page }) => {
    await loginAction(page, loginFormData.username, loginFormData.password);
    expect(page.getByText(loginFormData.successMessage)).toBeVisible();
    await page.getByText(loginFormData.logoutButton, { exact: true }).click();
    await page.waitForLoadState();
    expect(page.getByText(loginFormData.logoutMessage)).toBeVisible();
});

test('random creds -> error message', async ({ page }) => {
    await loginAction(page, chance.name(), chance.word({ length: 12 }));
    //* chance дозволяє робити радномну довжину рядка? я тут 12 поставила чисто з-під дубу (лунає пісня ДахаБраха). Тоді цей тест заодно прокатить для перевірки реєстрації нового юзера, перевіряти які довжини паролю проходять верифікацію
    expect(page.getByText(loginFormData.errorMessage)).toBeVisible();
});