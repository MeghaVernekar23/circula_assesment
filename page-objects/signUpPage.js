import Base from "../page-objects/base.js";
import signUpLocators from "../locators/signUpPage.json" assert { type: "json" }; 

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
        await this.forceClick(this.locators.nextStepButton);
    }

    async isCompanyInfoDetailsVisible() {
        return await this.visible(this.locators.companyInfoHeader);
    }

    async acceptPrivacySetting(page) {
        await page.waitForSelector("div[data-testid='uc-footer']", { timeout: 5000 });
        const shadowRoot = await page.locator("#usercentrics-root").evaluateHandle(el => el.shadowRoot);   
        const acceptButton = await shadowRoot.evaluateHandle(root => 
          [...root.querySelectorAll('button')].find(btn => btn.textContent.includes('Accept All'))
      );
      
      if (acceptButton) await acceptButton.click();
    }

    async enterCompanyName(companyName) {
        await this.type(this.locators.companyNameInput, companyName);
    }

    async selectReason(reason) {
        await this.click(this.locators.reasonDropdown);
        const selectReason = this.page.locator(this.locators.selectreason.locator.replace("{reason}", reason));
        await selectReason.waitFor({ state: 'visible' });
        await selectReason.hover();
        await this.page.evaluate(el => el.click(), await selectReason.elementHandle());
    }

    async getPreSelectedCountry() {
        return await this.getAttribute(this.locators.countryDropdown, "value");
    }

    async isCountryInDropdown(countryName) {
        await this.click(this.locators.countryDropdown);
        const countryOptions = await this.page.locator(this.locators.countryDropdownOptions.locator).allTextContents();
        return countryOptions.includes(countryName);
    }

    
    async selectCountryFromDropdown(countryName) {
        const countryOption = this.page.locator(this.locators.countrySelected.locator.replace("{country}", countryName));
        await countryOption.waitFor({ state: 'visible' });
        await countryOption.hover();
        await this.page.evaluate(el => el.click(), await countryOption.elementHandle());
        
    }

    
    async getSelectedCountry() {
        return await this.getAttribute(this.locators.countryDropdown, "value");
    }

}

export default SignUpPage;