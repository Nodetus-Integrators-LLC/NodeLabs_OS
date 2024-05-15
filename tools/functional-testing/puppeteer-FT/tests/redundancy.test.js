require('dotenv').config();
const puppeteer = require('puppeteer');

describe('Redundancy Navigation Test', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should navigate to Contact page and verify redundant navigation elements to go back to Home page', async () => {
        await page.goto(process.env.CONTACT_URL);

        // Define the selectors for redundant navigation elements
        const backSelectors = [
            'a[href="/home"]', // Link to Home
            'button#homeButton', // Button to Home
            'div.backToHome' // Div with click handler to Home
        ];

        for (const selector of backSelectors) {
            const elementExists = await page.$(selector) !== null;
            if (elementExists) {
                console.log(`Element ${selector} exists`);
            } else {
                console.log(`Element ${selector} does not exist`);
            }
        }

        // Click each redundant navigation element and verify it navigates back to Home page
        for (const selector of backSelectors) {
            if (await page.$(selector) !== null) {
                await page.click(selector);
                await page.waitForNavigation();
                const homeTitle = await page.title();
                expect(homeTitle).toBe('Home - Example'); // Adjust this to the expected title of the Home page

                // Navigate back to the Contact page for the next iteration
                await page.goto(process.env.CONTACT_URL);
            }
        }
    });
});
``
