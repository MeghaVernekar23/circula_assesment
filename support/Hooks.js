import { setDefaultTimeout, BeforeAll, Before, After, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();

setDefaultTimeout(1000 * 60 * 2);

let browser;
let context;
let page;


function getBrowserType() {
    const browserType = (process.env.BROWSER || 'chromium').toLowerCase();
    switch (browserType.toLowerCase()) {
        case 'chromium':
            return chromium;
        case 'firefox':
            return firefox;
        case 'webkit':
            return webkit;
        default:
            console.warn(`Unsupported browser type "${browserType}". Falling back to Chromium.`);
            return chromium;
    }
}


BeforeAll(async function () {
    const selectedBrowser = getBrowserType();
    const isHeadless = process.env.HEADLESS === 'true';

    console.log(`Launching ${process.env.BROWSER} in ${isHeadless ? "headless" : "headed"} mode...`);

    browser = await selectedBrowser.launch({
        headless: isHeadless,
        args: ['--start-maximized']
    });
});


Before(async function () {
    context = await browser.newContext({
        viewport: null,
        javaScriptEnabled: true
    });

    page = await context.newPage();
    this.page = page;
});


After(async function (scenario) {
    if (scenario.result.status == Status.FAILED) {
        const img = await page.screenshot({ path: `./reports/${scenario.pickle.name}.png` });
        this.attach(img, 'image/png');
    }
    if (page) {
        await page.close();

    }
    if (context) {
        await context.close();

    }
});


AfterAll(async function () {
    if (browser) {
        await browser.close();

    }
});


export function getPage() {
    if (!page) throw new Error("Page is not initialized. Ensure Before() has run.");
    return page;
}
