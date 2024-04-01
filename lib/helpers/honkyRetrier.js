import Env from "@helpers/env";
import { putReport } from "@helpers/reportHelper";
const taskURL = Env.URL;
//? подумай як обробити якщо за локатором є декілька елементів та данні що є референсними є масивом або об'єктом - бо видасть помилку що strict й далі по тексту ВСЕЧЕРВОНЕЖАХВИПРАВЛЯЙ
export const honkyRetrier = async (page, suffix, locator, expectedItem, maxAttempts) => {
    const attempts = maxAttempts;
    let data = [];
    let errorCounter = 0;
    for (let attempt = 1; attempt <= attempts; attempt++) {
        await page.goto(taskURL+suffix);
        const obtainedItem = await page.locator(locator).innerText();
        if (obtainedItem !== expectedItem) {
            errorCounter++;
            data.push({ attempt, obtainedItem, expectedItem });
        }
    }
    await putReport(data, honkyRetrier);
    console.log(`Number of error appearances: ${errorCounter} from ${maxAttempts} attempts`);
    return errorCounter;
}