import { test, expect } from "@playwright/test";
import path from "path";
// import { setTimeout } from "timers";

// const screenshotsDir = path.join(__dirname, "screenshots");

// Arrays with const elements which have to be present
const locales = [
  "en-us",
  "en-gb",
  "es-mx",
  "pt-br",
  "de-de",
  "es-es",
  "fr-fr",
  "it-it",
  "ko-kr",
  "zh-tw",
];
const socialLinksTitle = [
  "Follow Warcraft",
  "Follow Warcraft",
  "Sigue a Warcraft",
  "Seguir Warcraft",
  "Warcraft folgen",
  "Seguir a Warcraft",
  "Suivez Warcraft",
  "Segui Warcraft",
  "워크래프트 팔로우하기",
  "加入社群網路",
];


let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

for (let i = 0; i < locales.length; i++) {
  let locale = locales[i];
  let linksTitle = socialLinksTitle[i];
  let url = `https://worldofwarcraft.blizzard.com/${locale}/`;

    test(`Page opens withoud redirections for ${locale}`, async () => {
      await page.goto(url, { timeout: 20000 });
      expect(page.url()).toBe(url);
    });

    test(`Footer Social links header for ${locale}`, async () => {
      await expect(
        page.locator('xpath=//*[@id="footer"]/div[2]/div[2]/div/div/div[1]')
      ).toMatchText(linksTitle);
    });

    test.afterAll(async () => {
      await page.close();
    });
  };
