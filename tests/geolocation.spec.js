import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

import Chance from "chance";
import { link } from "node:fs";
const chance = new Chance();


test.use({
    geolocation: {
        longitude: Number(chance.floating({ min: -180, max: 180, fixed: 6 })),
        latitude: Number(chance.floating({ min: -90, max: 90, fixed: 6 }))
    },
    permissions: ['geolocation'],
}
);

test("Geolocation", async ({ page }) => {
    await page.goto(Env.URL + "geolocation");
    await page.getByText('Where am I?').click();
    await expect(page.locator("body")).toContainText('Longitude');
    await expect(page.locator("body")).toContainText('Latitude');
    expect(page.getByText('See it on Google')).toBeVisible()
});
