import Env from "@helpers/env";
import { putReport } from "@helpers/reportHelper";
const taskURL = Env.URL + "typos";
export const typoCounter = async (page, text, expectedText, maxAttempts) => {
    const attempts = maxAttempts;
    let typoCount = 0;
    let data = [];
    for (let attempt = 1; attempt <= attempts; attempt++) {
        await page.goto(taskURL);
        const obtainedText = await page.getByText(text).innerText();
        if (obtainedText !== expectedText) {
            typoCount++;
            data.push({ attempt, obtainedText, expectedText });
        }
    }
    await putReport(data, typoCounter);
    console.log(`Number of typo appearances: ${typoCount} from ${maxAttempts} attempts`);
    return typoCount;
}