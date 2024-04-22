import Chance from "chance";
const chance = new Chance;
export class InputHandler {
    constructor(page) {
        this.page = page;
    }

    async fillWithInteger(inputLocator) {
        const a = chance.integer();
        await this.page.locator(inputLocator).fill(a.toString());
        return a;
    }

    async fillWithFloating(inputLocator) {
        const a = chance.floating();
        await this.page.locator(inputLocator).fill(a.toString());
        return a;
    }

    async fillWithMixed(inputLocator) {
        const mixedValue = chance.string({ length: 10, alpha: true, numeric: true });
        await this.page.locator(inputLocator).fill(mixedValue);
        return mixedValue;
    }

    async getFieldValue(inputLocator) {
        return await this.page.locator(inputLocator).inputValue();
    }

    async clearField(inputLocator) {
        await this.page.locator(inputLocator).clear();
    }

    async parseInteger(value) {
        return parseInt(value);
    }

    async parseFloating(value) {
        return parseFloat(value);
    }

    async parseMixed(value) {
        // Видалення всіх нецифрових символів зі строки та повернення результуючого числа
        return value.replace(/[^\d.-]/g, '');
    }
}
