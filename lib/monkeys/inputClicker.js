/* The `randomUpDownKeys` function is a helper function that simulates pressing the
two alt keys on a specified input field multiple times.
Parameters: loc - PW locator, maxRep - upper limit for reps random, key1&key2 - alt keyboard keys to press */
import Chance from "chance";
const chance = new Chance;
export async function randomUpDownKeys(page, loc, maxRep, key1, key2) {
    await page.locator(loc).focus();
    let repeat = chance.integer({ min: 50, max: maxRep }), upN = 0, downN = 0, result = 0;
    console.info('N of keypresses: ', repeat);
    while (repeat) {
        const whichKey = chance.bool();
        if (whichKey) {
            await page.keyboard.press(key1);
            result++;
            upN++;
        } else {
            await page.keyboard.press(key2);
            result--;
            downN++;
        }
        repeat--;
    };
    const total = upN + downN;
    const difference = upN - downN;
    console.info(`Up pressed ${upN} times, Down pressed ${downN} times, total ${total}, difference ${difference}`);
    return result;
};