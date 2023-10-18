//@ts-check
const { test, expect, chromium } = require("@playwright/test");

let page, browser, context;

test.beforeEach(async () => {
  browser = await chromium.launch();

  context = await browser.newContext();

  page = await context.newPage();
});

const locales = ["en-us", "en-gb", "es-mx", "pt-br", "zh-tw"];

const contentByLocale = [
  "Dragonflight Season 2 Now Live!",

  "Dragonflight Season 2 Now Live!",

  "¡Temporada 2 de Dragonflight ya disponible!",

  "Série 2 de Dragonflight já disponível!",

  "《巨龍崛起》第 2 季現已上線！",
];

for (let i = 0; i < locales.length; i++) {
  let locale = locales[i];

  let content = contentByLocale[i];

  let url = `https://worldofwarcraft.blizzard.com/${locale}/`;

  test(`Test for locale ${locale}`, async () => {
    await page.goto(url);

    // Perform actions and assertions specific to each URL and content

    await expect(page.locator("h1")).toHaveText(content);

    await browser.close();
  });
}
