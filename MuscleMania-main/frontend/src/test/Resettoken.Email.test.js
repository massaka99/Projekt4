import sendEmail from "../utils/sendEmail";
import sendToken from "../utils/sendResetEmail";
import emailjs from 'emailjs-com';

jest.mock('emailjs-com', () => ({
    send: jest.fn()
}));

describe('Email Sending Functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test 1: Test if sendEmail sends an email correctly
    test('sendEmail sends email correctly', async () => {
        const mockResponse = {
            status: 200,
            text: 'Email sent successfully'
        };

        emailjs.send.mockResolvedValue(mockResponse);

        const response = await sendEmail('John', 'MuscleMania', 'john@example.com', 'Hello from MuscleMania');

        expect(emailjs.send).toHaveBeenCalledWith('service_l5u4dzd', 'template_k76teyg', {
            to_name: 'John',
            from_name: 'MuscleMania',
            to_email: 'john@example.com',
            message: 'Hello from MuscleMania'
        }, 'iH8mVPL7nCR00QAU_');

        expect(response).toEqual(mockResponse);
    });

    // Test 2: Test if sendToken sends a reset token email correctly
    test('sendToken sends reset token email correctly', async () => {
        const mockResponse = {
            status: 200,
            text: 'Reset token email sent successfully'
        };

        emailjs.send.mockResolvedValue(mockResponse);

        await sendToken('john@example.com', 'mockToken');

        expect(emailjs.send).toHaveBeenCalledWith('service_l5u4dzd', 'template_y9a72no', {
            to_email: 'john@example.com',
            token: 'mockToken',
            from_name: 'MuscleMania'
        }, 'iH8mVPL7nCR00QAU_');
    });

    // Test 3: Test if sendEmail throws an error when email sending fails
    test('sendEmail throws an error when email sending fails', async () => {
        const mockError = new Error('Email sending failed');
        emailjs.send.mockRejectedValueOnce(mockError);

        await expect(sendEmail('John', 'MuscleMania', 'john@example.com', 'Hello from MuscleMania')).rejects.toThrow(mockError);
    });

    // Test 4: Test if sendToken throws an error when email sending fails
    test('sendToken throws an error when email sending fails', async () => {
        // Mock the rejected value of emailjs.send to throw an error
        const mockError = new Error('Email sending failed');
        emailjs.send.mockRejectedValueOnce(mockError);

        // Call sendToken function and expect it to throw an error
        await expect(sendToken('test@example.com', 'mockToken')).rejects.toThrow('Email sending failed');
    });
});
