export function cleanText(text) {
    text = text.trim();
    const arrayFromText = text.split('\n');
    const output = arrayFromText[0].toString();
    return output;
}
export function checkNotificationText(notificationText, sampleText) {
    return Object.values(sampleText).includes(notificationText);
};