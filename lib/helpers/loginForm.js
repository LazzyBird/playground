import {loginFormData} from "@data_assets/loginForm"; 
export const loginAction = async (page, username, password) => {
    await page.locator(loginFormData.userField).fill(username);
    await page.locator(loginFormData.passField).fill(password);
    await page.getByRole('button', { name: loginFormData.loginButton }).click();
    await page.waitForLoadState();
};