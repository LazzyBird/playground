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
    } else {
        console.log('Modal has no bounding box');
    }
    return data;
}

function addVisibilityData(data, visibility) {
    if (visibility === true) {
        data.push({ modalVisibility: visibility, date: new Date() });
    } else {
        console.log('Modal is not visible');
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

/* export async function getModalProperties(page) {
    const a = await modalProperties(page);
    const data = [];
    if (a) {
        try {
            expect(a.box).toBe(null) &&
                expect(a.visibility).toBe(false);
        } catch (error) {
            console.log('Modal has bounding box or isVisible');
            data.push({ modalBoxWidth: a.box.width || 0, modalBoxHeight: a.box.height || 0, modalVisibility: a.visibility, date: new Date() });
        }
    }
    else {
        const errorMessage = 'Modal is not in the DOM';
        console.error(errorMessage);
        data.push({ errorMessage, date: new Date() });
    };
    await appendReport(data, modalProperties);
    return data;
} */
/* async function getModalProperties(page) {
    const a = await modalProperties(page);
    const data = [];
    try {
        a.box != null ? data.push({ modalBoxWidth: a.box.width, modalBoxHeight: a.box.height, date: new Date() }) : console.log('Modal has no bounding box');
        a.visibility === true ? data.push({ modalVisibility: a.visibility, date: new Date() }) : console.log('Modal is not visible');

    } catch (error) {
        const errorMessage = 'Modal is not in the DOM';
        console.error(errorMessage);
        data.push({ errorMessage, date: new Date() });
    }
    await appendReport(data, modalProperties);
    return data;
} */
