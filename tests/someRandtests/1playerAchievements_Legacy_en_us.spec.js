import { test, page, browser } from '@playwright/test';
import { createURL, getCardNumber } from './1testHelper_playerAchievements_en_us';
let totalCards

test.beforeAll(async () => {
    const context = await browser.newContext();
    page = await context.newPage();
    pageURL = createURL();
    await page.goto(pageURL); // Assuming pageURL is defined
    const totalCards = await getCardNumber(); // Call the getCardNumber function here
    // Now you have the total number of cards and can proceed with your tests
  });
  test.beforeEach(async () => {
    if (totalCards === 0){
        console.log(`${pageURL} has no cards`)
    }
    // You can use the global.totalCards value to loop through each card element
    for (let i = 2; i <= totalCards; i++) {
      const cardObject = `#character-profile-mount > div > div > div.Pane-content > div > div:nth-child(2) > div > div:nth-child(4) > div > div > div > div:nth-child(${i})`;
      
    }
  });
/*
test('Test header property', async ({ page }) => {
  // Your test logic to check the header property on the page
});

test('Test description property', async ({ page }) => {
  // Your test logic to check the description property on the page
});
test('Test image property', async ({ page }) => {
  // Your test logic to check the image property on the page
});

// Add more test functions for other card properties and tabs
*/