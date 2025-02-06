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

  Given('the user accepts the privacy settings',async function () {
    this.attach(" Checking for Privacy Settings popup.");
    await page.waitForSelector("div[data-testid='uc-footer']", { timeout: 5000 });
    const shadowRoot = await page.locator("#usercentrics-root").evaluateHandle(el => el.shadowRoot);   
    const acceptButton = await shadowRoot.evaluateHandle(root => 
      [...root.querySelectorAll('button')].find(btn => btn.textContent.includes('Accept All'))
  );
  if (acceptButton) await acceptButton.click();
    //signInPage.acceptPrivacySetting(page);
    
  this.attach(" Click on Accept All");

    
  });

  When('the user clicks on {string}',async function (string) {
    this.attach(` Checking if "${string}" button is visible...`);
    const signupBtn = await signInPage.isSignUpBtnVisisble();
    expect(signupBtn).to.be.true;
    this.attach("Sign up button is visible");
    await signInPage.clickSignUpBtn();
  });

  Then('the user should be redirected to the Sign-Up page',async function () {
    signUpPage = new SignUpPage(page,this.attach);
    this.attach("🔄 Waiting for Sign-Up page URL...");
    await page.waitForURL('https://circula-qa-challenge.vercel.app/users/sign_up');
    this.attach(" Checking if URL contains '/sign_up'...");
    expect(page.url()).to.include('/sign_up');
    this.attach(" Checking if Sign-Up Page is visible...");
    const isVisible = await signUpPage.isSignUpPageVisible();
    expect(isVisible).to.be.true;
    this.attach(" User is successfully on the Sign-Up page.");
  });



  Given('the user is on the Sign-Up page', async function () {
    page = getPage();
    signUpPage = new SignUpPage(page, this.attach);

    this.attach(" Navigating to Sign-Up Page...");
    await signUpPage.navigateToSignUpPage();

    this.attach(" Checking if Sign-Up Page is visible...");
    const isSignUpVisible = await signUpPage.isSignUpPageVisible();
    expect(isSignUpVisible).to.be.true;

    this.attach(" Sign-Up Page is visible.");
    this.attach(" Checking for Privacy Settings popup.");
    //await signUpPage.acceptPrivacySetting(page);
    await page.waitForSelector("div[data-testid='uc-footer']", { timeout: 5000 });
    const shadowRoot = await page.locator("#usercentrics-root").evaluateHandle(el => el.shadowRoot);   
    const acceptButton = await shadowRoot.evaluateHandle(root => 
      [...root.querySelectorAll('button')].find(btn => btn.textContent.includes('Accept All'))
    );
    if (acceptButton) await acceptButton.click();
    
    this.attach(" Click on Accept All");
  });


  When('the user enters a valid work email address {string}',async function (email) {
    
    this.attach(` Entering email: ${email}`);
    await signUpPage.enterEmail(email);
  });


  When('the user enters a valid password {string}',async function (password) {
    
    this.attach(" Entering password...");
    await signUpPage.enterPassword(password);
  });


  When('the user checks I agree to the Terms and Conditions and Privacy Policy',async function () {
    
    this.attach("✅ Checking Terms and Conditions...");
    await signUpPage.agreeToTerms();
  });


  When('the user checks Iam happy to get occasional product updates',async function () {
    
    this.attach("✅ Opting in for product updates...");
    await signUpPage.agreeToProductUpdates();
  });


  When('the user clicks Try for Free',async function () {
    
    this.attach("Clicking 'Try for Free' button...");
    await signUpPage.clickTryForFree();
  });


  When('the user enters First Name {string}',async function (firstName) {
    
    this.attach(` Entering First Name: ${firstName}`);
    await signUpPage.enterFirstName(firstName);
  });


  When('the user enters Last Name {string}',async function (lastName) {
    
    this.attach(`📝 Entering Last Name: ${lastName}`);
    await signUpPage.enterLastName(lastName);
  });


  When('the user enters Phone Number {string}',async function (phoneNumber) {
    
    this.attach(` Entering Phone Number: ${phoneNumber}`);
    await signUpPage.enterPhoneNumber(phoneNumber);
  });

  When('the user clicks on Next Step', async function () {
    
    this.attach(" Clicking 'Next Step' button...");
    await signUpPage.clickNextStep();
  });


  Then('the user should be successfully navigated to the Company Information page',async function () {
    
    this.attach(" Waiting for Company Information details to load...");
    const isCompanyInfoVisible = await signUpPage.isCompanyInfoDetailsVisible();
    expect(isCompanyInfoVisible).to.be.true;
    this.attach("🟢 Successfully navigated to Company Information details.");
  });
    

