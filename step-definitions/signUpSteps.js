import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { getPage } from '../support/Hooks.js';
import SignUpPage from '../page-objects/signUpPage.js';
import SignInPage from '../page-objects/signInPage.js';

let page, signInPage, signUpPage;

Given('the user is on the login page', async function () {
  page = getPage();
  signInPage = new SignInPage(page, this.attach);
  this.attach(" Navigating to Sign In Page...");
  await signInPage.navigateToSignInPage();
  this.attach(" Navigated to Sign In Page.");
  this.attach(" Checking if Sign In Page is visible...");
  const signinPageVisible = await signInPage.isSignInPageVisible();
  expect(signinPageVisible).to.be.true;
  this.attach(" Sign In Page is visible.Verified Header 'Sign in to your account.'");

});

Given('the user accepts the privacy settings', async function () {
  this.attach(" Checking for Privacy Settings popup...");
  await signInPage.acceptPrivacySetting(page);
  this.attach(" Click on Accept All.");
  this.attach(" Privacy Settings popup is closed.");
});

Then('the user clicks on {string}', async function (string) {
  this.attach(` Checking if "${string}" button is visible...`);
  const signupBtn = await signInPage.isSignUpBtnVisisble();
  expect(signupBtn).to.be.true;
  this.attach(` "${string}" button is visible.`);
  this.attach(` Clicking on "${string}" button...`);
  await signInPage.clickSignUpBtn();
  this.attach(` Clicked on "${string}" button.`);
});

Then('the user should be redirected to the Sign-Up page', async function () {
  signUpPage = new SignUpPage(page, this.attach);
  this.attach(" Waiting for Sign-Up page URL...");
  await page.waitForURL('https://circula-qa-challenge.vercel.app/users/sign_up');
  this.attach(" Navigated to Sign-Up page URL.");
  this.attach(" Checking if URL contains '/sign_up'...");
  expect(page.url()).to.include('/sign_up');
  this.attach(" URL contains '/sign_up'.");
  this.attach(" Checking if Sign-Up Page is visible...");
  const isVisible = await signUpPage.isSignUpPageVisible();
  expect(isVisible).to.be.true;
  this.attach(" Sign-Up Page is visible.");
  this.attach(" User is successfully on the Sign-Up page.");
});



Given('the user is on the Sign-Up page', async function () {
  page = getPage();
  signUpPage = new SignUpPage(page, this.attach);

  this.attach(" Navigating to Sign-Up Page...");
  await signUpPage.navigateToSignUpPage();
  this.attach(" Navigated to Sign-Up Page.");

  this.attach(" Checking if Sign-Up Page is visible...");
  const isSignUpVisible = await signUpPage.isSignUpPageVisible();
  expect(isSignUpVisible).to.be.true;
  this.attach(" Sign-Up Page is visible.");

  this.attach(" Checking for Privacy Settings popup...");
  await signUpPage.acceptPrivacySetting(page);
  this.attach(" Click on Accept All");
  this.attach(" Privacy Settings popup is closed.");
});


Then('the user enters a valid work email address {string}', async function (email) {
  this.attach(` Entering email: ${email}...`);
  await signUpPage.enterEmail(email);
  this.attach(` Entered email`);
});


Then('the user enters a valid password {string}', async function (password) {
  this.attach(" Entering password...");
  await signUpPage.enterPassword(password);
  this.attach(" Entered password.");
});


Then('the user checks I agree to the Terms and Conditions and Privacy Policy', async function () {
  this.attach(" Checking Terms and Conditions...");
  await signUpPage.agreeToTerms();
  this.attach(" Checked Terms and Conditions.");
});


Then('the user checks Iam happy to get occasional product updates', async function () {
  this.attach(" Opting in for product updates(Iam happy to get occasional product updates)...");
  await signUpPage.agreeToProductUpdates();
  this.attach(" Opted in for product updates(Iam happy to get occasional product updates).");
});


Then('the user clicks Try for Free', async function () {
  this.attach(" Clicking 'Try for Free' button...");
  await signUpPage.clickTryForFree();
  this.attach(" Clicked 'Try for Free' button.");
});


Then('the user enters First Name {string}', async function (firstName) {
  this.attach(" Successfully naviagted to Contact Details.");
  this.attach(` Entering First Name: ${firstName}...`);
  await signUpPage.enterFirstName(firstName);
  this.attach(` Entered First Name.`);
});


Then('the user enters Last Name {string}', async function (lastName) {

  this.attach(` Entering Last Name: ${lastName}...`);
  await signUpPage.enterLastName(lastName);
  this.attach(` Entered Last Name.`);

});


Then('the user enters Phone Number {string}', async function (phoneNumber) {
  this.attach(` Entering Phone Number: ${phoneNumber}...`);
  await signUpPage.enterPhoneNumber(phoneNumber);
  this.attach(` Entered Phone Number.`);
});

Then('the user clicks on Next Step', async function () {

  this.attach(" Clicking 'Next Step' button...");
  await signUpPage.clickNextStep();
  this.attach(" Clicked 'Next Step' button...");
});


Then('the user should be successfully navigated to the Company Information page', async function () {

  this.attach(" Waiting for Company Information details to load...");
  const isCompanyInfoVisible = await signUpPage.isCompanyInfoDetailsVisible();
  expect(isCompanyInfoVisible).to.be.true;
  this.attach(" Successfully navigated to Company Information details.");
});



When('the user enters email address {string} password {string} First Name {string} Last Name {string} Phone Number {string}',
  async function (email, password, firstName, lastName, phoneNumber) {
    this.attach(` Entering email: ${email}...`);
    await signUpPage.enterEmail(email);
    this.attach(" Entering password...");
    await signUpPage.enterPassword(password);
    this.attach(" Checking Terms and Conditions...");
    await signUpPage.agreeToTerms();
    this.attach(" Opting in for product updates...");
    await signUpPage.agreeToProductUpdates();
    this.attach(" Clicking 'Try for Free' button...");
    await signUpPage.clickTryForFree();
    this.attach(` Entering First Name: ${firstName}...`);
    await signUpPage.enterFirstName(firstName);
    this.attach(` Entering Last Name: ${lastName}...`);
    await signUpPage.enterLastName(lastName);
    this.attach(` Entering Phone Number: ${phoneNumber}...`);
    await signUpPage.enterPhoneNumber(phoneNumber);
  });


Then('the user enters the company name {string}', async function (companyName) {
  this.attach(` Entering Company Name: ${companyName}...`);
  await signUpPage.enterCompanyName(companyName);
  this.attach(` Entered Company Name.`);
});

Then('the user selects a reason {string} from How did you hear about us?', async function (reason) {
  this.attach(` Selecting Reason: ${reason} from 'How did you hear about us?'...`);
  await signUpPage.selectReason(reason);
  this.attach(` Selected Reason.`);
});

Then('country {string} should be pre-selected in the Where is your company registered? dropdown', async function (expectedCountry) {
  this.attach(" Verifying pre-selected country in the dropdown 'Where is your company registered? dropdown'...");
  const selectedCountry = await signUpPage.getPreSelectedCountry();
  expect(selectedCountry).to.equal(expectedCountry);
  this.attach(`Country pre-selected correctly: ${selectedCountry}`);
});

Then('the user enters the company name {string} selects a reason {string} from How did you hear about us?',
  async function (companyName, reason) {
    this.attach(` Entering Company Name: ${companyName}...`);
    await signUpPage.enterCompanyName(companyName);
    this.attach(` Selecting Reason: ${reason}...`);
    await signUpPage.selectReason(reason);
  });

Then('country {string} should be present in dropdown list of Where is your company registered? dropdown',
  async function (country) {
    this.attach(` Checking if country "${country}" is available in the dropdown list...`);
    const isCountryPresent = await signUpPage.isCountryInDropdown(country);
    expect(isCountryPresent).to.be.true;
    this.attach(` Country "${country}" is available in the dropdown list.`);
  });

Then('the user selects country {string} from the dropdown list', async function (country) {
  this.attach(` Selecting country "${country}" from the dropdown list...`);
  await signUpPage.selectCountryFromDropdown(country);
  this.attach(` Country "${country}" selected successfully.`);
});

Then('selected country {string} should be displayed in the Where is your company registered? dropdown',
  async function (expectedCountry) {
    this.attach(` Verifying the selected country "${expectedCountry}" in the dropdown...`);
    const selectedCountry = await signUpPage.getSelectedCountry();
    expect(selectedCountry).to.equal(expectedCountry);
    this.attach(` Selected country is displayed correctly.`);
  });

