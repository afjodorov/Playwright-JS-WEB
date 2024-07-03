const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.LoginPage = class LoginPage {

    constructor(page){
        this.page=page;
        this.url=process.env.LOGIN_URL;
        this.pageHeader=page.getByRole('heading', {name: 'Sign in'});

        this.emailInputLocator=page.locator('#input-email');
        this.pswInputLocator=page.locator('#input-password');
        this.loginBtnLocator=page.locator('#flow-form-submit');

        this.signUpBtnLocator=page.locator('[href*="/signup"]');

        this.wrongCredsAlertLocator=page.getByText('Wrong email or password');
        this.successLoadingLocator=page.getByText('Launching Supernova...', {exact: true});
    }
    // Assertions
    async verifyWrongCredsAlert(){
        await expect(this.wrongCredsAlertLocator).toBeVisible({timeout: 15000});
        await expect(this.successLoadingLocator).toBeHidden({timeout: 15000});
    }

    async verifySuccessLogging(){
        await expect(this.successLoadingLocator).toBeVisible({timeout: 25000});
        await expect(this.successLoadingLocator).toBeHidden({timeout: 25000});

        await elementVerification.verifyElementIsVisible(this.page.getByText('Documentation', { exact: true }).nth(1));
    }

    // Actions
    async goto(){
        await this.page.goto(this.url);
    }

    async enterCredentials(usr, psw){
        await expect(this.pageHeader).toBeVisible({timeout: 15000});

        await this.emailInputLocator.fill(usr);

        await this.pswInputLocator.fill(psw);
    }

    // For quick login
    async fullLogin(usr, psw){
        await this.goto();
        await this.enterCredentials(usr,psw);
        await elementActions.clickElement(this.loginBtnLocator);
        await this.verifySuccessLogging();

        await this.page.waitForLoadState('domcontentloaded');
        await elementVerification.verifyElementIsVisible(this.page.getByRole('button', { name: 'Publish' }));
        await this.page.waitForTimeout(1000);
    }
}

