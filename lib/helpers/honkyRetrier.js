import Env from "@helpers/env";
import { putReport } from "@helpers/reportHelper";
const taskURL = Env.URL;
//? подумай як обробити якщо за локатором є декілька елементів та данні що є референсними є масивом або об'єктом - бо видасть помилку що strict й далі по тексту ВСЕЧЕРВОНЕЖАХВИПРАВЛЯЙ
export const honkyRetrier = async (page, suffix, locator, expectedItem, maxAttempts) => { 
    if (!page || !suffix || !locator || !expectedItem || !maxAttempts) {
        throw new Error('Missing required parameters');
    }

    const attempts = Number(maxAttempts);
    const data = [];

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            await page.goto(taskURL + suffix);
        } catch (error) {
            throw new Error(`Failed to navigate to ${taskURL}${suffix}: ${error}`);
        }

        try {
            const obtainedItem = await page.locator(locator).innerText();

            if (obtainedItem !== expectedItem) {
                data.push({ attempt, obtainedItem, expectedItem });
            }
        } catch (error) {
            throw new Error(`Failed to get text from locator ${locator}: ${error}`);
        }
    }

    await putReport(data, honkyRetrier);
    console.log(`Number of error appearances: ${data.length} from ${maxAttempts} attempts`);
    return data.length;
}
//! ця функція буде брати лише innerText() а якщо брати ще altText або ariaRole??? 