import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import Chance from "chance";
const chance = new Chance;
const loc = '#result'
test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + "javascript_alerts");
});
const data = {
    alert: {
        buttonText: "Click for JS Alert",
        dialogText: "I am a JS Alert",
        confirmText: "You successfully clicked an alert"
    },
    confirm: {
        buttonText: "Click for JS Confirm",
        dialogText: "I am a JS Confirm",
        confirmText: { ok: "You clicked: Ok", cancel: "You clicked: Cancel" }
    },
    prompt: {
        buttonText: "Click for JS Prompt",
        dialogText: "I am a JS prompt",
        confirmText: "You entered:"
    }
};

//? чи навмисно промпт діалог текст містить одрук?
test("Clicking for Alert calls alert dialog", async ({ page }) => {
    const a = data.alert;
    await page.getByRole("button", { name: a.buttonText }).click();
    page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain(a.dialogText)
        await dialog.accept();
    });
    await expect(page.locator(loc)).toContainText(a.confirmText);
});
test.describe('Confirm suite', () => {
    test("Clicking for Confirm calls Confirm dialog, click ok then - correct text appears", async ({ page }) => {
        const a = data.confirm;
        const handleDialog = async (dialog) => {
            expect(dialog.message()).toContain(a.dialogText);
            await dialog.accept();
        };
        page.on("dialog", handleDialog);
        await page.getByRole('button', { name: a.buttonText }).click();
        await expect(page.locator(loc)).toContainText(a.confirmText.ok);
    });
    test("Clicking for Confirm calls Confirm dialog, click Cancel then - correct text appears", async ({ page }) => {
        const a = data.confirm;
        const handleDialog = async (dialog) => {
            expect(dialog.message()).toContain(a.dialogText);
            await dialog.dismiss();
        };
        page.on("dialog", handleDialog);
        await page.getByRole('button', { name: a.buttonText }).click();
        await expect(page.locator(loc)).toContainText(a.confirmText.cancel);
    });
})
//! так як для кожного обробника діалогу, як ok так й cancel, в кожен блок describe треба розмістити обидва, то прийнято рішення залишити як є, щоб не ускладнити все до зарозумілого та нечитабельного коду. Все, амба.
test.describe('Prompt suite', () => {
    test("Clicking for prompt calls prompt dialog, click ok without fill input field", async ({ page }) => {
        const a = data.prompt;
        const handleDialog = async (dialog) => {
            expect(dialog.message()).toContain(a.dialogText);
            await dialog.accept();
        };
        page.on("dialog", handleDialog);
        await page.getByRole('button', { name: a.buttonText }).click();
        await expect(page.locator(loc)).toContainText(a.confirmText);
    });
    test("Clicking for prompt calls prompt dialog, click cancel", async ({ page }) => {
        const a = data.prompt;
        const handleDialog = async (dialog) => {
            expect(dialog.message()).toContain(a.dialogText);
            await dialog.dismiss();
        };
        page.on("dialog", handleDialog);
        await page.getByRole('button', { name: a.buttonText }).click();
        await expect(page.locator(loc)).toContainText(a.confirmText + ' null');
    });
    test("Clicking for prompt calls prompt dialog, click ok with fill input field", async ({ page }) => {
        const text = chance.string();
        const a = data.prompt;
        const handleDialog = async (dialog) => {
            expect(dialog.message()).toContain(a.dialogText);
            await dialog.accept(text);
        };
        page.on("dialog", handleDialog);
        await page.getByRole('button', { name: a.buttonText }).click();
        expect(page.locator(loc)).toContainText(text);
    });
})

test("does body contain hidden text?", async ({ page }) => {
    //* чисто щоб бути впевненою що confirmText не запхано у сторінку наперед
    const confirmText = data.confirmText;
    let totalCount = 0;

    for (const key in confirmText) {
        if (Object.hasOwnProperty.call(confirmText, key)) {
            totalCount += await page.locator(`text=${confirmText[key]}`).count();
        }
    }

    expect(totalCount).toEqual(0);
})
