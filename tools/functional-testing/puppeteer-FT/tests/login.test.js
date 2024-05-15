require('dotenv').config();
const puppeteer = require('puppeteer');

describe('Login Functional Test', () => {
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

    test('should log in successfully', async () => {
        await page.goto(process.env.LOGIN_URL);
        await page.type('#username', process.env.USERNAME);
        await page.type('#password', process.env.PASSWORD);
        await page.click('#loginButton');

        // Wait for navigation or a specific element that indicates a successful login
        await page.waitForNavigation();
        const loggedInText = await page.$eval('.welcome-message', element => element.textContent);

        expect(loggedInText).toContain('Welcome');
    });
});
