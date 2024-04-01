import Env from "@helpers/env";
import { putReport } from "@helpers/reportHelper";
const taskURL = Env.URL + "typos";
export const typoCounter = async (page, text, expectedText, maxAttempts) => {
    if (!page || !text || !expectedText || !maxAttempts) {
        throw new Error("Invalid arguments provided to typoCounter");
    }

    const attempts = Number(maxAttempts);
    const data = [];
    let typoCount = 0;

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            await page.goto(taskURL);
        } catch (err) {
            console.error(`Failed to navigate to ${taskURL} in attempt ${attempt}`);
            console.error(err);
            continue;
        }

        try {
            const obtainedText = await page.getByText(text).innerText();
            if (obtainedText !== expectedText) {
                typoCount++;
                data.push({ attempt, obtainedText, expectedText });
            }
        } catch (err) {
            console.error(`Failed to obtain text in attempt ${attempt}`);
            console.error(err);
        }
    }

    try {
        await putReport(data, typoCounter);
    } catch (err) {
        console.error("Failed to putReport");
        console.error(err);
    }

    console.log(`Number of typo appearances: ${typoCount} from ${maxAttempts} attempts`);
    return typoCount;
}
