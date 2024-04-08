import { appendReport } from "@helpers/reportHelper";
import { expect } from "playwright/test";
const loc = '#modal';
const modalProperties = async (page) => {
    //вердикт - нормальна така функція, все там в тому boundingBox об'єкті є й норм пишеться в лог
    const modal = await page.locator(loc);
    const box = await modal.boundingBox();
    console.log(box);
    const visibility = await modal.isVisible();
    return { box, visibility };
}
export async function getModalProperties(page) {
    const a = await modalProperties(page);
    const data = [];
    if (a) {
        try {
            expect(a.box).toBe(null);
            expect(a.visibility).toBe(false);
        } catch (error) {
            console.log('Modal has bounding box or is visible');
            data.push({ modalBoxWidth: a.box.width, modalBoxHeight: a.box.height, modalVisibility: a.visibility, date: new Date() });
            await appendReport(data, modalProperties);
        }
    }
    else {
        const errorMessage = 'Modal is not in the DOM';
        console.error(errorMessage);
        data.push({ errorMessage, date: new Date() });
        await appendReport(data, modalProperties);
    };
    return data;
}
