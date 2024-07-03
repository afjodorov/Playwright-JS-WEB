const {test, expect} = require('../fixtures/base');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

test('Sign up with already registered email', async ({loginPage, signupPage}) => {
    await loginPage.goto();

    await elementActions.clickElement(loginPage.signUpBtnLocator);

    await signupPage.enterCredentials(process.env.CORRECT1_ACC_USERNAME, process.env.INCORRECT1_ACC_PSW);

    await elementActions.clickElement(signupPage.signUpBtnLocator);

    await expect(signupPage.emailAlreadyRegisteredErr).toBeVisible();
})

test('Sign up and go through onboarding', async ({loginPage, signupPage, sidebar, settingsPage}) => {
    await loginPage.goto();

    await elementActions.clickElement(loginPage.signUpBtnLocator);
  
    await signupPage.fullSignup();

    // Onboarding page 1 error checking
    await elementVerification.verifyElementIsVisible(signupPage.onboard1Title);

    await elementVerification.verifyElementIsDisabled(signupPage.onBoardContinueBtn);

    // Onboarding - page 1 filling
    const fullName = 'Mr Automated Tester';

    await elementActions.writeToInput(signupPage.onBoardNameInput, fullName);

    await elementActions.clickElement(signupPage.onBoardAreaOfWork1);

    await elementVerification.verifyElementIsEnabled(signupPage.page, signupPage.onBoardContinueBtn);

    await signupPage.page.waitForTimeout(500);
    await elementActions.clickElement(signupPage.onBoardContinueBtn);
    // await elementActions.clickElement(signupPage.onBoardContinueBtn);

    // Onboarding page 2 error checking

    // Onboarding - page 2 filling
    await elementVerification.verifyElementIsVisible(signupPage.onboard2Title);
  
    await elementActions.writeToInput(signupPage.onBoardJobInput, 'QA');

    await elementActions.clickElement(signupPage.onBoardJobLvl1);

    await elementVerification.verifyElementIsEnabled(signupPage.page, signupPage.onBoardContinueBtn);

    await elementActions.clickElement(signupPage.onBoardContinueBtn);

    // Onboarding - page 3 filling
    await elementVerification.verifyElementIsVisible(signupPage.onBoard3Title);

    await elementActions.writeToInput(signupPage.onBoardCompanyInput, 'Supernova');

    await elementActions.clickElement(signupPage.onBoardManyPeopleOption1);

    await elementVerification.verifyElementIsEnabled(signupPage.page, signupPage.onBoardContinueBtn);

    await elementActions.clickElement(signupPage.onBoardContinueBtn);

    // Onboarding - page 4 filling
    await elementVerification.verifyElementIsVisible(signupPage.onBoard4Title);

    await elementActions.writeToInput(signupPage.onBoardDSNameInput, 'Supernova');

    await elementActions.clickElement(signupPage.onBoardDSManyPeopleOption1);

    await elementVerification.verifyElementIsEnabled(signupPage.page, signupPage.onBoardContinueBtn);

    await elementActions.clickElement(signupPage.onBoardContinueBtn);

    // Onboarding - page 5 filling
    await elementVerification.verifyElementIsVisible(signupPage.onBoard5Title);

    await elementVerification.verifyElementIsEnabled(signupPage.page, signupPage.onBoardSkipImportBtn);

    await elementActions.clickElement(signupPage.onBoardSkipImportBtn);

    // Onboarding - page 6 
    await elementVerification.verifyElementIsVisible(signupPage.onBoard6Title);

    await elementVerification.verifyElementIsEnabled(signupPage.page, signupPage.onBoardGoTokensBtn);

    await elementActions.clickElement(signupPage.onBoardGoTokensBtn);

    await elementVerification.verifyElementIsVisible(sidebar.documentationBtn);

    // After onboarding view
    await elementActions.clickElement(sidebar.settingsBtn);

    await elementActions.clickElement(settingsPage.profileBtn);

    await elementVerification.verifyByAttributeInputTxtEquals('value', settingsPage.profileFullNameInput, fullName);
})