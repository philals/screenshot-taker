const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer');

async function getScreenshot(url) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        // headless: true
    });

    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(2000);
    const file = await page.screenshot({ type: 'png', fullPage: true });
    await browser.close();
    return file;
}

module.exports = { getScreenshot };