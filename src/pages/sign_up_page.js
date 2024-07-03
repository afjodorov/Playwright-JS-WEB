const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.SignUpPage = class SignUpPage {
    constructor(page){
        // Registration page
        this.page=page;
        this.pageHeader=page.getByRole('heading', {name: 'Sign Up'});

        this.emailInputLocator=page.locator('#input-email');
        this.pswInputLocator=page.locator('#input-password');
        this.signUpBtnLocator=page.locator('#flow-form-submit');

        // Signup errors
        this.emailAlreadyRegisteredErr=page.getByRole('alert').getByText('Email is already registered.');

        // Onboarding form page 1
        this.onboard1Title=page.getByText("Hi! What’s your name?");

        this.onBoardNameInput=page.getByPlaceholder('Han Solo');

        this.onBoardAreaOfWork1=page.getByRole('radio', { name: 'Design' });
        this.onBoardAreaOfWork2=page.getByRole('radio', { name: 'Engineering' });
        this.onBoardAreaOfWork3=page.getByRole('radio', { name: 'Product' });
        this.onBoardAreaOfWork4=page.getByRole('radio', { name: 'Marketing and brand' });
        this.onBoardAreaOfWork5=page.getByRole('radio', { name: 'Other' });

        this.onBoardContinueBtn=page.getByRole('button', { name: 'Continue' });

        // Onboarding form page 2
        this.onboard2Title=page.getByText('Nice to meet you! What’s your role?');

        this.onBoardJobInput=page.getByPlaceholder('Job title');

        this.onBoardJobLvl1=page.getByRole('radio', { name: 'Individual contributor' });
        this.onBoardJobLvl2=page.getByRole('radio', { name: 'Manager' });
        this.onBoardJobLvl3=page.getByRole('radio', { name: 'Executive' });
        this.onBoardJobLvl4=page.getByRole('radio', { name: 'Other' });

        this.onBoardBackBtn=page.getByRole('button', { name: 'Back' });

        // Onboarding form page 3
        this.onBoard3Title=page.getByText('Which company are you working for?');

        this.onBoardCompanyInput=page.getByPlaceholder('Company name');

        this.onBoardManyPeopleOption1=page.getByText('Just me');
        this.onBoardManyPeopleOption2=page.getByText('2 - 49');
        this.onBoardManyPeopleOption3=page.getByText('50 - 249');
        this.onBoardManyPeopleOption4=page.getByText('250 - 999');
        this.onBoardManyPeopleOption5=page.getByText('1,000 - 4,999');
        this.onBoardManyPeopleOption6=page.getByText('5,000 - 9,999');
        this.onBoardManyPeopleOption7=page.getByText('10,000+');

        // Onboarding form page 4
        this.onBoard4Title=page.getByText('What’s your design system called?');
        
        this.onBoardDSNameInput=page.getByPlaceholder('Design system name');

        this.onBoardDSManyPeopleOption1=page.getByRole('radio', { name: 'Just me' });
        this.onBoardDSManyPeopleOption2=page.getByRole('radio', { name: '2 - 5' });
        this.onBoardDSManyPeopleOption3=page.getByRole('radio', { name: '6 - 10' });
        this.onBoardDSManyPeopleOption4=page.getByRole('radio', { name: '10+' });
    
        this.noDedicatedSystemCheck=page.getByText('We don\'t have a dedicated');

        // Onboarding form page 5
        this.onBoard5Title=page.getByText('Now, let’s import some design system data.');

        this.onBoardFigmaInput=page.getByPlaceholder('Figma file URL');

        this.onBoardSkipImportBtn=page.getByRole('button', { name: 'Skip Figma import' });
        this.onBoardImportDataBtn=page.getByRole('button', { name: 'Import data' });

        // Onboarding page 6
        this.onBoard6Title=page.getByText('Your workspace is ready!');

        this.onBoardExploreFirstOption1=page.getByRole('radio', { name: 'Design token manager' });
        this.onBoardExploreFirstOption2=page.getByRole('radio', { name: 'Documentation editor' });
        
        this.onBoardGoTokensBtn=page.getByRole('button', {name: 'Go to tokens' });

        // Onboarding errors
        this.onBoardFormNameErr=page.getByText('Your name is required.');
        this.onBoardFormCompanyNameErr=page.getByText('Company name is required.');

        this.onBoardDepartErr=page.getByText('Department is required.');
        this.onBoardJobTitleErr=page.getByText('Job title must be at least 2');
        this.onBoardJobLvlErr=page.getByText('Job level is required.');

        // Welcome screen
        this.welcomeTxt=page.getByText('Welcome to the new Supernova!');
        this.welcomeExploreBtn=page.getByRole('button', { name: 'Explore' });
    }

    async enterCredentials(usr, psw){
        await expect(this.pageHeader).toBeVisible({timeout: 10000});

        await this.emailInputLocator.fill(usr);

        await this.pswInputLocator.fill(psw);
    }

    async clickSignUp(){
        await this.signUpBtnLocator.click();
    }

    async fullSignup(){
        var randomEmail = await elementActions.generateTestEmail(7);

        await this.enterCredentials(randomEmail, process.env.CORRECT1_ACC_PSW);

        await elementActions.clickElement(this.signUpBtnLocator);
    }
}