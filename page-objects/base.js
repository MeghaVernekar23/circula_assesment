
import dotenv from 'dotenv';

export default class Base {

    constructor(page) {
        if (!page) throw new Error("Page instance is required for Base class.");
        this.page = page;
        this.baseUrl = process.env.BASE_URL;
    }

    async click(object) {
        await this.getLocator(object).click();
    }

    async forceClick(object) {
        await this.getLocator(object).waitFor({ state: 'visible' });
        await this.getLocator(object).click({ force: true });
    }


    async type(object, text) {
        await this.getLocator(object).fill(text);
    }


    async getText(object) {
        const text = await this.getLocator(object).innerText();
        return text;
    }

    async visible(object) {
        const isVisible = await this.getLocator(object).isVisible();
        return isVisible;
    }

    async navigate(path = '') {
        await this.page.goto(`${this.baseUrl}${path}`);
    }


    async getAttribute(object, attribute) {
        const value = await this.getLocator(object).getAttribute(attribute);
        return value;
    }

    getLocator(object) {
        return this.page.locator(object["locator"]);
    }

}