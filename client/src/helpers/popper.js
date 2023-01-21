//Puppeteer library
// import puppeteer from 'puppeteer-core';
export const selectorId = async () => {
    //launch browser in headless mode
    const browser = await puppeteer.launch()
    //browser new page
    const page = await browser.newPage();
    //launch URL
    await page.keyboard.type("the text");
}