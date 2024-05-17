import { checkNotificationText } from "@helpers/notification";
const mockNotifications = {
    success: "Action successful",
    failure: "Action failed",
};
describe('checkNotificationText', () => {
    it('should return true when notificationText is found in sampleText', () => {
        const notificationText = "Action successful";
        const result = checkNotificationText(notificationText, mockNotifications);
        expect(result).toBe(true);
    });

    it('should return false when notificationText is not found in sampleText', () => {
        const notificationText = "Action not found";
        const result = checkNotificationText(notificationText, mockNotifications);
        expect(result).toBe(false);
    });
});
