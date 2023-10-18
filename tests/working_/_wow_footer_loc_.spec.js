import { test, expect } from '@playwright/test';
import path from 'path';

const screenshotsDir = path.join(__dirname, "screenshots");

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
const SocialLinksTitle = [
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

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
});

for (let i = 0; i < locales.length; i++) {
  let locale = locales[i];
  let LinksTitle = SocialLinksTitle[i];
  let url = `https://worldofwarcraft.blizzard.com/${locale}/`;

  test.describe(`Footer tests for ${locale}`, () => {
    test.beforeEach(async () => {
      await page.goto(url);
    });

    test(`Footer Social links header for ${locale}`, async () => {
      // Social Links Title check
      await expect(
        page.locator('xpath=//*[@id="footer"]/div[2]/div[2]/div/div/div[1]')
      ).toMatchText(LinksTitle);
    });
    });
  };

test.afterAll(async () => {
  await page.close();
});
