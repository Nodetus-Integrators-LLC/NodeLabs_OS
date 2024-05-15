const puppeteer = require('puppeteer');

describe('Fitts Law Usability Test', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should measure time to click on target elements', async () => {
        await page.goto('https://example.com'); // Replace with your site URL

        const targets = [
            { selector: '#button1', name: 'Button 1' },
            { selector: '#link1', name: 'Link 1' },
            { selector: '#icon1', name: 'Icon 1' }
        ];

        for (let target of targets) {
            const startTime = performance.now();
            await page.click(target.selector);
            const endTime = performance.now();
            console.log(`${target.name} click time: ${(endTime - startTime).toFixed(2)} ms`);
            await page.waitForTimeout(500); // Wait for any potential animations or page loads
        }
    });
});
