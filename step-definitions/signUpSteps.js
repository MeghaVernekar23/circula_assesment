import { Given, When, Then , setDefaultTimeout , Before,After} from '@cucumber/cucumber';
import { expect } from 'chai';
import { getPage } from '../support/Hooks.js';
import SignUpPage from '../page-objects/signUpPage.js';
import SignInPage from '../page-objects/signInPage.js';

let page, signInPage , signUpPage ;
Given('the user is on the login page', async function () {
    page = getPage();
    signInPage = new SignInPage(page, this.attach);
    this.attach("Navigating to Sign In Page...");
    await signInPage.navigateToSignInPage();
    this.attach(" Checking if Sign In Page is visible...");
    const signinPageVisible = await signInPage.isSignInPageVisible();
    expect(signinPageVisible).to.be.true;
    this.attach(" Sign In Page is visible.");
});

When('the user clicks on {string}', async function (buttonText) {
    this.attach(` Checking if "${buttonText}" button is visible...`);
    const signupBtn = await signInPage.isSignUpBtnVisisble();
    expect(signupBtn).to.be.true;
    this.attach("Sign up button is visible");
    await signInPage.clickSignUpBtn();
    
});

Then('the user should be redirected to the Sign-Up page', async function () {
    signUpPage = new SignUpPage(page,this.attach);
    this.attach("🔄 Waiting for Sign-Up page URL...");
    await page.waitForURL('https://circula-qa-challenge.vercel.app/users/sign_up');
    this.attach("✅ Checking if URL contains '/sign_up'...");
    expect(page.url()).to.include('/sign_up');
    this.attach("🔎 Checking if Sign-Up Page is visible...");
    const isVisible = await signUpPage.isSignUpPageVisible();
    expect(isVisible).to.be.true;
    this.attach("🟢 User is successfully on the Sign-Up page.");
    
});

