export async function clickAndWait(page, buttonBefore, buttonAfter) {
    const beforeButtonLocator = { name: buttonBefore };
    const afterButtonLocator = { name: buttonAfter };

    await page.getByRole("button", { name: buttonBefore }).click();
    const afterButton = await page.waitForSelector(
        `button:visible:has-text("${buttonAfter}")`
    );
    await afterButton.evaluate((button) => button);

    return {
        beforeButtonLocator,
        afterButtonLocator,
        afterButton
    };
}