const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.SelectPlanPage = class SelectPlanPage {
    constructor(page){
        this.selectPlanPageHeading=page.getByRole('heading', {name: 'Select a plan'});

        // Company
        this.changeToCompanyBtn=page.getByRole('button', { name: 'Change to Company' });
    }
}