import { checkNotificationText } from '@helpers/no'; // Assuming the function is in 'your-file-path'

describe('checkNotificationText', () => {
    it('should return true when notificationText is found in sampleText', () => {

        const notificationText = "Action successful";

        const result = checkNotificationText(notificationText, sampleText);
        expect(result).toBe(true);
    });

    it('should return false when notificationText is not found in sampleText', () => {
        const sampleText = {
            success: "Action successful",
            retry: "Action unsuccesful, please try again"
        };
        const notificationText = "Action failed";

        const result = checkNotificationText(notificationText, sampleText);
        expect(result).toBe(false);
    });
});
