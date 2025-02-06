
import Base from "../page-objects/base.js";
import signInLocators from "../locators/signInPage.json" assert { type: "json" }; 

class SignInPage extends Base {
    constructor(page, logFunction) {
        super(page, logFunction);
        this.locators = signInLocators;
    }

    async navigateToSignInPage() {
        await this.navigate('/users/sign_in');
        await this.page.waitForLoadState('load');
        
    }

    async isSignInPageVisible() {
        return await this.visible(this.locators.signInHeader);
    }

    async isSignUpBtnVisisble() {
        return await this.visible(this.locators.signUpButton); 
    }
    

    async clickSignUpBtn() {
        await this.click(this.locators.signUpButton);
    }

    async acceptPrivacySetting(page) {
      
      const shadowRoot = await page.locator("#usercentrics-root").evaluateHandle(el => el.shadowRoot);

      // Click the "Accept All" button by directly locating it before clicking
      await shadowRoot.evaluate(root => {
          const acceptButton = [...root.querySelectorAll('button')]
              .find(btn => btn.textContent.includes('Accept All'));
          if (acceptButton) acceptButton.click();
      });
    }

}

export default SignInPage;