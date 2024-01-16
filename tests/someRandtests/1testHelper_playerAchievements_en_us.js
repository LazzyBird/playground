
const Player = "/us/frostmane/bloodgorged"  //change manually to check other player - region-realm-name

const Legacy = { "Global": "",
"Professions": "professions",
"Dungeons": "dungeons",
"Raids": "raids",
"Player vs. Player": "player-vs-player",
"Currencies": "currencies",
"Expansion Features": "expansion-features",
"World Events": "world-events",
"Quests": "quests",
"Character": "character",};

const getCardNumber = async (page) => {
  // Use Playwright functions to obtain the card locators
  const cardNumber = await page.$$('.Achievement-container');
  return cardNumber.length;
}

// create object constructor to fill it with data grabbed from page's card
const achievementCard = {
 
}
// create sample object with expected properties 
const expectedCardProperties = {
 
}

function createURL(baseURL, tab){
  const baseURL = "https://worldofwarcraft.blizzard.com/";
const tabValue = Legacy[tab];
return pageURL =`${baseURL}'en-us/character'${Player}'/achievements/legacy/'${tabValue}`;
}



export default {
  createURL, getCardNumber, expectedCardProperties
}