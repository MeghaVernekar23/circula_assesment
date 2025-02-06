
import dotenv from 'dotenv';

export default class Base {

    constructor(page, logFunction) {
        if (!page) throw new Error("Page instance is required for Base class.");
        this.page = page;
        this.baseUrl = process.env.BASE_URL;
        this.log = logFunction; 
    }

    async click(object) {
        await this.getLocator(object).click();
        this.log(`Clicked on the "${object["description"]}" button`);
    }

    async forceClick(object) {
        await this.getLocator(object).waitFor({ state: 'visible' });
        await this.getLocator(object).click({ force: true });
        this.log(`Clicked on the "${object["description"]}" button`);
    }

    
    async type(object, text) {
        await this.getLocator(object).fill(text);
        this.log(`Entered value "${text}" on "${object["description"]}"`);
    }

    
    async getText(object) {
        const text = await this.getLocator(object).innerText();
        this.log(`Extracted text "${text}" from "${object["description"]}"`);
        return text;
    }

    async visible(object) {
        const isVisible = await this.getLocator(object).isVisible();
        this.log(`"${object["description"]}" is ${isVisible ? "visible" : "not visible"}`);
        return isVisible;
    }

    async navigate(path = '') {
        await this.page.goto(`${this.baseUrl}${path}`);
        this.log(`Navigated to: ${this.baseUrl}${path}`);
    }

    
    async getAttribute(object, attribute) {
        const value = await this.getLocator(object).getAttribute(attribute);
        this.log(`Extracted '${attribute}' value: "${value}" from '${object["description"]}'`);
        return value;
    }

    getLocator(object) {
        return this.page.locator(object["locator"]);
    }

}