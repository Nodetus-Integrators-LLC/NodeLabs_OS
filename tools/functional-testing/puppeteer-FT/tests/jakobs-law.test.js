require('dotenv').config();
const puppeteer = require('puppeteer');

describe("Jakob's Law Usability Test", () => {
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

    test('should have a visible and working navigation bar', async () => {
        await page.goto(process.env.HOME_URL);
        const navBarExists = await page.$('nav') !== null;
        expect(navBarExists).toBe(true);

        const navLinks = await page.$$eval('nav a', links => links.length);
        expect(navLinks).toBeGreaterThan(0);
    });

    test('should have a visible and clickable logo that returns to home page', async () => {
        await page.goto(process.env.CONTACT_URL);
        const logoExists = await page.$('a.logo') !== null;
        expect(logoExists).toBe(true);

        await page.click('a.logo');
        await page.waitForNavigation();
        const homeTitle = await page.title();
        expect(homeTitle).toBe('Home - Example'); // Adjust this to the expected title of the Home page
    });

    test('should have consistent button styles and behavior', async () => {
        await page.goto(process.env.ABOUT_URL);
        const buttons = await page.$$('button');
        expect(buttons.length).toBeGreaterThan(0);

        for (const button of buttons) {
            const buttonStyle = await button.evaluate(node => window.getComputedStyle(node).getPropertyValue('background-color'));
            expect(buttonStyle).toBe('rgb(0, 123, 255)'); // Example: Bootstrap primary button color

            const buttonDisabled = await button.evaluate(node => node.disabled);
            if (!buttonDisabled) {
                await button.click();
                // Verify expected behavior after clicking the button (e.g., navigation, modal popup)
            }
        }
    });

    test('should have familiar form input elements', async () => {
        await page.goto(process.env.CONTACT_URL);
        const formExists = await page.$('form') !== null;
        expect(formExists).toBe(true);

        const inputTypes = ['text', 'email', 'password', 'submit'];
        for (const type of inputTypes) {
            const inputExists = await page.$(`input[type="${type}"]`) !== null;
            expect(inputExists).toBe(true);
        }
    });
});
