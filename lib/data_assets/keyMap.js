export const keys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '`', '-', '=', '\\', 'Backspace', 'Tab', 'Delete', 'Escape',
    'ArrowDown', 'End', 'Enter', 'Home', 'Insert', 'PageDown', 'PageUp', 'ArrowRight', 'ArrowUp',
    'Shift', 'Control', 'Alt', 'Meta', 'Win'
];
export const key = function () {
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const expectedValue = randomKey.toUpperCase();
    return { randomKey, expectedValue };
}
