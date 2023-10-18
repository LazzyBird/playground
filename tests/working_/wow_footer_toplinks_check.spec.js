import { test, expect } from "@playwright/test";

// Define constants for social link titles and top links text and URLs
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

const socialLinksHeader = [
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

const topLinksTexts = [
  ["Careers", "About", "Support", "Contact Us", "Press", "API"],
  ["Careers", "About", "Support", "Contact Us", "Press", "API"],
  ["Empleos", "Información", "Soporte", "Contacto", "Prensa", "API"],
  ["Carreiras", "Sobre", "Suporte", "Contato", "Imprensa", "API"],
  ["Karriere", "Impressum", "Kundendienst", "Kontakt", "Presse", "API"],
  ["Empleo", "Información", "Asistencia", "Contacto", "Prensa", "API"],
  [
    "Offres d’emploi",
    "À propos de nous",
    "Assistance",
    "Nous contacter",
    "Presse",
    "API",
  ],
  ["Impieghi", "La società", "Assistenza", "Contattaci", "Stampa", "API"],
  ["인재 채용", "회사 소개", "고객지원", "문의 등록", "보도 자료", "API"],
  ["工作機會", "關於", "客服支援", "聯繫我們", "媒體報導", "API"],
];

const expectedLinksUrls = [
  "https://careers.blizzard.com/",
  "https://www.blizzard.com/company/about/",
  "https://www.battle.net/support/",
  "https://blizzard.com/company/about/contact.html",
  "https://blizzard.gamespress.com/",
  "https://develop.battle.net/",
];

//  global variables
let page, context;

// beforeEach step to create a new page on each test
test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
});

// Loop through each locale and test suite for each locale's footer text and links
for (let k = 0; k < locales.length; k++) {
  let locale = locales[k]; // get locale suffix for url
  let headertext = socialLinksHeader[k]; // get header text
  let url = `https://worldofwarcraft.blizzard.com/${locale}/`; //base url - can be replaced for dragonflight

  // test suite for the current locale's footer
  test.describe(`Footer tests for ${locale}`, () => {
    // beforeEach step to go to the URL for each test
    test.beforeEach(async () => {
      await page.goto(url, { timeout: 30000 });
      await page.waitForLoadState();
    });

    // check that the page opens without redirections
    test(`Page opens without redirections for ${locale}`, async () => {
      expect(page.url()).toBe(url);
    });

    // check the social links header
    test(`Footer Social links header for ${locale}`, async () => {
      await expect(page.locator('xpath=//*[@id="footer"]/div[2]/div[2]/div/div/div[1]')).toMatchText(
        headertext,
        { timeout: 10000 }
      );
    });

    // check the top links text and URLs
    test(`Footer top-links text and links for ${locale}`, async () => {

      for (let j = 0; j < topLinksTexts[k].length; j++) {
        const expectedLinkText = topLinksTexts[k][j]; // get text from texts locale's array
        const expectedUrl = expectedLinksUrls[j]; // get url from array of links


        const links = await page.$$("#top-links a");
        let link;
        for (const element of links) {
            const text = await element.innerText();
            if (text.trim().toLowerCase() === expectedLinkText.toLowerCase()) {
              link = element;
              break;
            }
          }

        if (!link) {
          throw new Error(`Link not found: ${expectedLinkText}`);
        }

        const isVisible = await link.isVisible();
        if (!isVisible) {
          throw new Error(`Link is not visible: ${expectedLinkText}`);
        }

        const linkUrl = await link.getAttribute("href");

        console.log(`Expected URL for ${expectedLinkText}: ${expectedUrl}`);
        console.log(`Actual URL for ${expectedLinkText}: ${linkUrl}`);

        if (linkUrl !== expectedUrl) {
            console.error(`Invalid URL for link ${expectedLinkText}: ${linkUrl}`);
            throw new Error(`Invalid URL for link ${expectedLinkText}: ${linkUrl}`);
          }
      }
    });
  });
}

test.afterAll(async () => {
  await context.close();
});
