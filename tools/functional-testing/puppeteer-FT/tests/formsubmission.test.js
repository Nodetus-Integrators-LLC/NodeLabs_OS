require('dotenv').config();
const puppeteer = require('puppeteer');

describe('Form Submission Functional Test', () => {
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

    test('should submit form successfully', async () => {
        await page.goto(process.env.FORM_URL);
        await page.type('#username', process.env.USERNAME);
        await page.type('#email', process.env.EMAIL);
        await page.type('#password', process.env.PASSWORD);
        await page.type('#firstname', process.env.FIRSTNAME);
        await page.type('#lastname', process.env.LASTNAME);
        await page.type('#address', process.env.ADDRESS);
        await page.type('#city', process.env.CITY);
        await page.type('#zip', process.env.ZIP);
        await page.type('#phonenumber', process.env.PHONENUMBER);
        await page.click('#submitButton');

        // Wait for navigation or a specific element that indicates a successful submission
        await page.waitForNavigation();
        const successMessage = await page.$eval('.success-message', element => element.textContent);

        expect(successMessage).toContain('Form submitted successfully');
    });
});
