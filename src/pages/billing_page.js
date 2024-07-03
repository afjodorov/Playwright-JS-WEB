const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.BillingPage = class BillingPage {
    constructor(page){
        this.subToCompanyPlanTxt=page.getByText('Subscribe to Company');

        this.emailInput=page.getByLabel('Email');

        this.CCNumInput=page.getByPlaceholder('1234 1234 1234');
        this.CCValidToInput=page.getByPlaceholder('MM / YY');
        this.CCCVCInput=page.getByPlaceholder('CVC');
        this.CCNameInput=page.getByPlaceholder('Full name on card');

        this.countryOfOriginInput=page.getByLabel('Country or region');
        this.addressInput=page.getByPlaceholder('Address').first();
        this.postalCodeInput=page.getByPlaceholder('Postal code');
        this.zipInput=page.getByPlaceholder('ZIP');
        this.cityInput=page.getByPlaceholder('City');

        this.submitBtn=page.getByTestId('hosted-payment-submit-button');
        this.processingBtn=page.getByRole('button', {name: 'Processing...'});

        // Finished upgrade
        this.thankYouHeading=page.getByRole('heading', { name: 'Thank you!' });
        this.goToWSBtn=page.getByRole('link', { name: 'Go to workspace' });

        // Variables
        this.emailVal='e2e-test-user1@supernova.dev';
        this.addressVal='Baker Street';
        this.postalCodeVal='13613';
        this.cityVal='Orgrimmar';
    }

    async selectCountyOfOrigin(country){
        await this.countryOfOriginInput.selectOption(country);
    }
}