require('dotenv').config();
const puppeteer = require('puppeteer');

describe('Navigation Functional Test', () => {
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

    test('should navigate to Home page and verify content', async () => {
        await page.goto(process.env.HOME_URL);
        const homeTitle = await page.title();
        expect(homeTitle).toBe('Home - Example'); // Adjust this to the expected title
        const homeHeader = await page.$eval('h1', element => element.textContent);
        expect(homeHeader).toContain('Welcome to Home'); // Adjust this to the expected header text
    });

    test('should navigate to About page and verify content', async () => {
        await page.goto(process.env.ABOUT_URL);
        const aboutTitle = await page.title();
        expect(aboutTitle).toBe('About Us - Example'); // Adjust this to the expected title
        const aboutHeader = await page.$eval('h1', element => element.textContent);
        expect(aboutHeader).toContain('About Us'); // Adjust this to the expected header text
    });

    test('should navigate to Contact page and verify content', async () => {
        await page.goto(process.env.CONTACT_URL);
        const contactTitle = await page.title();
        expect(contactTitle).toBe('Contact Us - Example'); // Adjust this to the expected title
        const contactHeader = await page.$eval('h1', element => element.textContent);
        expect(contactHeader).toContain('Contact Us'); // Adjust this to the expected header text
    });

    test('should navigate through the site using the navigation bar', async () => {
        await page.goto(process.env.HOME_URL);

        // Navigate to About page via navigation bar
        await page.click('a[href="/about"]'); // Adjust the selector for your navigation bar
        await page.waitForNavigation();
        const aboutTitleNav = await page.title();
        expect(aboutTitleNav).toBe('About Us - Example');

        // Navigate to Contact page via navigation bar
        await page.click('a[href="/contact"]'); // Adjust the selector for your navigation bar
        await page.waitForNavigation();
        const contactTitleNav = await page.title();
        expect(contactTitleNav).toBe
    });

        //Ask for a non-existent web-page i.e 404 Error
        test('should display 404 page for a non-existent page', async () => {
            await page.goto(process.env.HOME_URL + '/non-existent-page');
            const notFoundTitle = await page.title();
            expect(notFoundTitle).toBe('404 Not Found'); // Adjust this to the expected title of your 404 page
            const notFoundHeader = await page.$eval('h1', element => element.textContent);
            expect(notFoundHeader).toContain('Page Not Found'); // Adjust this to the expected header text of your 404 page
        });
