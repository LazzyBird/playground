//@ts-check
import { test, expect } from "@playwright/test";
let taskURL = "https://kitchen.applitools.com/ingredients/alert";
let alertCounter = 0;
let confirmationCounter = 0;
let promptCounter = 0;

test.describe("Alert", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
    await page.waitForLoadState("load");
    await expect(page.locator("#alert-count")).toContainText(`${alertCounter}`);
    await expect(page.locator("#confirm-count")).toContainText(
      `${confirmationCounter}`
    );
    await expect(page.locator("#prompt-count")).toContainText(
      `${promptCounter}`
    );
  });
  test("should trigger the alert with message", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Airfryers can make anything!");
      await dialog.dismiss();
    });
    await page.click("#alert-button");
  });
  test("should trigger a confirmation with a message", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Proceed with adding garlic?");
      await dialog.accept();
    });
    await page.click("#confirm-button");
    const $answer = await page.$("#confirm-answer");
    const answerText = await $answer.innerText();
    expect(answerText).toContain("Answer: Yes");
  });

  test("should trigger a confirmation with a message and cancel", async ({
    page
  }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Proceed with adding garlic?");
      await dialog.dismiss();
    });
    await page.click("#confirm-button");
    const $answer = await page.$("#confirm-answer");
    const answerText = await $answer.innerText();
    expect(answerText).toContain("Answer: No");
  });

  test("should trigger a prompt with a message", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("What is your favorite food?");
      await dialog.accept("Pizza!");
    });
    await page.click("#prompt-button");
    const $answer = await page.$("#prompt-answer");
    const answerText = await $answer.innerText();
    expect(answerText).toContain("Answer: Pizza!");
  });

  test("should trigger a prompt with a message and cancel", async ({
    page
  }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("What is your favorite food?");
      await dialog.dismiss();
    });
    await page.click("#prompt-button");
    const $answer = await page.$("#prompt-answer");
    const answerText = await $answer.innerText();
    expect(answerText).toContain("Answer: Cancelled");
  });

  test("Trigger alert with button increases the counter", async ({ page }) => {
    page.on("dialog", async (dialog) => {
        await dialog.accept();
    })
    for (let i = 0; i < 20; i++) {
      await page.click("#alert-button");
      alertCounter++;
    }
    await expect(page.locator("#alert-count")).toContainText(`${alertCounter}`);
  });

  test("Trigger confirmation with button increases the counter", async ({
    page
  }) => {
    page.on("dialog", async (dialog) => {
        await dialog.accept();
    })
    for (let i = 0; i < 20; i++) {
      await page.click("#confirm-button");
      confirmationCounter++;
    }
    await expect(page.locator("#confirm-count")).toContainText(
      `${confirmationCounter}`
    );
  });
});