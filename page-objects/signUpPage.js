import Base from "../page-objects/base.js";
import signUpLocators from "../locators/SignUpPage.json" assert { type: "json" }; 

class SignUpPage extends Base {
    constructor(page, logFunction) {
        super(page, logFunction);
        this.locators = signUpLocators;
    }

    async isSignUpPageVisible() {
        return await this.visible(this.locators.signUpHeader);
    }

    async clickSignUpBtn() {
        await this.click(this.locators.signUpHeader);
    }

    async navigateToSignUpPage() {
        await this.navigate('/users/sign_up');
        await this.page.waitForLoadState('load');
    }

    async enterEmail(email) {
        await this.type(this.locators.emailInput, email);
    }

    async enterPassword(password) {
        await this.type(this.locators.passwordInput, password);
    }

    async agreeToTerms() {
        await this.forceClick(this.locators.termsCheckbox);
    }

    async agreeToProductUpdates() {
        await this.forceClick(this.locators.productUpdatesCheckbox);
    }

    async clickTryForFree() {
        await this.forceClick(this.locators.tryForFreeButton);
    }

    async enterFirstName(firstName) {
        await this.type(this.locators.firstNameInput, firstName);
    }

    async enterLastName(lastName) {
        await this.type(this.locators.lastNameInput, lastName);
    }

    async enterPhoneNumber(phoneNumber) {
        await this.type(this.locators.phoneNumberInput, phoneNumber);
    }

    async clickNextStep() {
        await this.click(this.locators.nextStepButton);
    }

    async isCompanyInfoDetailsVisible() {
        return await this.visible(this.locators.companyInfoHeader);
    }

    async acceptPrivacySetting(page) {
        const shadowRoot = await page.locator("#usercentrics-root").evaluateHandle(el => el.shadowRoot);

    // Find the button that contains the text "Accept All"
    const acceptButton = await shadowRoot.evaluateHandle(root => 
        [...root.querySelectorAll('button')].find(btn => btn.textContent.includes('Accept All'))
    );

    if (acceptButton) await acceptButton.click();
    }

}

export default SignUpPage;