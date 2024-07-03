const {test, expect} = require('../fixtures/base');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

test('Login with correct credentials', async ({loginPage}) => {
    await loginPage.goto();

    await loginPage.enterCredentials(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);

    await elementActions.clickElement(loginPage.loginBtnLocator);

    await loginPage.verifySuccessLogging();
})

test('Login with correct email but incorrect password', async ({loginPage}) => {
    await loginPage.goto();

    await loginPage.enterCredentials(process.env.CORRECT1_ACC_USERNAME, process.env.INCORRECT1_ACC_PSW);

    await elementActions.clickElement(loginPage.loginBtnLocator);

    await loginPage.verifyWrongCredsAlert();
})

test('Login with incorrect email but correct password', async ({loginPage}) => {
    await loginPage.goto();

    await loginPage.enterCredentials(process.env.INCORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);

    await elementActions.clickElement(loginPage.loginBtnLocator);;

    await loginPage.verifyWrongCredsAlert();
})

test('Login with empty fields', async ({loginPage}) => {
    await loginPage.goto();

    await elementActions.clickElement(loginPage.loginBtnLocator);

    await expect(loginPage.emailInputLocator).toHaveAttribute('required');
    await expect(loginPage.pswInputLocator).toHaveAttribute('required');
    await expect(loginPage.successLoadingLocator).toBeHidden();
})