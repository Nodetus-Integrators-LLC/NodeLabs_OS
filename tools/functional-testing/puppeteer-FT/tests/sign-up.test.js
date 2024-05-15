require('dotenv').config();
const puppeteer = require('puppeteer');

describe('Sign-Up Functional Test', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            // executablePath: 'C:/path/to/your/chromium' // Optional: use a custom Chromium path
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should sign up successfully', async () => {
        await page.goto(process.env.SIGNUP_URL);
        await page.type('#username', process.env.USERNAME);
        await page.type('#email', process.env.EMAIL);
        await page.type('#password', process.env.PASSWORD);
        await page.click('#signUpButton');

        // Wait for navigation or a specific element that indicates a successful sign-up
        await page.waitForNavigation();
        const successMessage = await page.$eval('.success-message', element => element.textContent);

        expect(successMessage).toContain('Welcome');
    });
});
