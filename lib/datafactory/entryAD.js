import { appendReport } from "@helpers/reportHelper";
const loc = '#modal';
const modalProperties = async (page) => {
    const modal = await page.locator(loc);
    const box = await modal.boundingBox();
    const visibility = await modal.isVisible();
    return { box, visibility };
};
function addBoxData(data, box) {
    if (box != null) {
        data.push({ modalBoxWidth: box.width, modalBoxHeight: box.height, date: new Date() });
    }
    return data;
}

function addVisibilityData(data, visibility) {
    if (visibility === true) {
        data.push({ modalVisibility: visibility, date: new Date() });
    }
    return data;
}

export async function getModalProperties(page) {
    const a = await modalProperties(page);
    const data = [];
    try {
        addBoxData(data, a.box);
        addVisibilityData(data, a.visibility);
    } catch (error) {
        const errorMessage = 'Modal is not in the DOM';
        console.error(errorMessage);
        data.push({ errorMessage, date: new Date() });
    }
    if (data.length > 0) {
        await appendReport(data, modalProperties);
    };
    return data;
}
