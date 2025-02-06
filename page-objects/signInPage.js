
import Base from "../page-objects/base.js";
import signInLocators from "../locators/SignInPage.json" assert { type: "json" }; 

class SignInPage extends Base {
    constructor(page, logFunction) {
        super(page, logFunction);
        this.locators = signInLocators;
    }

    async navigateToSignInPage() {
        await this.navigate('/users/sign_in');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('networkidle');
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

}

export default SignInPage;