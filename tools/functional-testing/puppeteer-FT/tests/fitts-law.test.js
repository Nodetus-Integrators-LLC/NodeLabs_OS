require('dotenv').config();
const puppeteer = require('puppeteer');

describe('Fitts Law Usability Test', () => {
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

    test('should measure time to click on target elements', async () => {
        await page.goto(process.env.TARGET_URL);

        const targets = [
            { selector: '#button1', name: 'Button 1' },
            { selector: '#link1', name: 'Link 1' },
            { selector: '#icon1', name: 'Icon 1' }
        ];

        for (let target of targets) {
            const startTime = performance.now();
            await page.click(target.selector);
            const endTime = performance.now();
            const timeTaken = endTime - startTime;
            console.log(`${target.name} click time: ${timeTaken.toFixed(2)} ms`);

            // Log the distance and size for Fitts' Law analysis
            const element = await page.$(target.selector);
            const boundingBox = await element.boundingBox();
            const distance = Math.sqrt(Math.pow(boundingBox.x, 2) + Math.pow(boundingBox.y, 2)); // Assuming start point is (0,0)
            const width = boundingBox.width;

            console.log(`${target.name} distance: ${distance.toFixed(2)} px`);
            console.log(`${target.name} width: ${width.toFixed(2)} px`);
        }
    });
});