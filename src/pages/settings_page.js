const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.SettingsPage = class SettingsPage {
    constructor(page){
        this.page=page;
        this.pageHeader=page.getByRole('heading', {name: 'General settings', exact: true});

        // Workspace - General
        this.generalHeading=page.getByRole('heading', { name: 'General settings' });
        this.deleteWSBtn=page.getByRole('button', { name: 'Delete workspace' });
        
        this.deleteModalHeading=page.getByRole('heading', { name: 'Delete workspace' });
        this.deleteModalInput=page.getByPlaceholder('DELETE');
        this.deleteConfirmationBtn=page.getByRole('button', { name: 'Delete workspace' });
        
        // Workspace - Billing
        this.billingBtn=page.getByRole('link', { name: 'Billing' });
        this.billingHeading=page.getByRole('heading', {name: 'Billing'});

        this.upgradeToEnterpriseTxt=page.getByText('Upgrade to Enterprise');
        this.viewAllPlansBtn=page.getByRole('button', { name: 'View all plans' });
        
        // Account - Profile
        this.profileBtn=page.getByRole('link', { name: 'Profile' });
        this.profileHeader=page.getByRole('heading', { name: 'Profile' });

        this.profileFullNameInput=page.getByLabel('Full name');

        this.privacyPolicyDocLink=page.getByRole('link', { name: 'Privacy Policy' });
        this.privacyPolicyUrl='https://www.supernova.io/privacy-policy';
        this.privacyPolicyTitle='Privacy Policy — Supernova.io';

        // Design system - General
        this.DSGeneralSettingBtn=page.getByRole('link', { name: 'General' }).nth(1);
        this.DSNameInput=page.getByLabel('Design system name');
        this.DSNewNameSaveBtn=page.getByRole('button', { name: 'Save' });

        this.DSDeleteBtn=page.getByRole('button', { name: 'Delete design system' });
        this.DSDeleteModalHeading=page.getByRole('heading', { name: 'Delete design system' });
        this.DSDeleteModalInput=page.getByPlaceholder('DELETE');
        this.DSDeleteConfirmBtn=page.getByRole('button', { name: 'Delete design system' });

        // Design system - Versions
        this.versionsBtn=page.getByRole('link', { name: 'Versions' });
        this.versionsHeader=page.getByRole('heading', { name: 'Versions' });
        this.newVersionBtn=page.getByRole('button', {name: 'New version'});

        this.versionsTable=page.locator('tbody');
        this.versionsFirstRowNum=page.locator('tbody').locator('tr').first().locator('td').first();
        this.versionFirstRowOptionsBtn=page.locator('tbody').locator('tr').first().getByRole('button');
        this.versionDeleteBtn=page.getByRole('menuitem', { name: 'Delete version' });

        this.versionDeleteTxtInput=page.getByPlaceholder('DELETE');
        this.versionDeleteConfirmButton=page.getByRole('button', { name: 'Delete version' });

    }

    async deleteAllVersions(){
        const rowCount = await this.versionsTable.locator('tr').count();

        for(var i = 0; i < rowCount; i++){
            const deletedVersionNum = await this.versionsFirstRowNum.innerText()    
            await elementActions.clickElement(this.versionFirstRowOptionsBtn);
            await elementActions.clickElement(this.versionDeleteBtn);

            await elementVerification.verifyElementIsDisabled(this.versionDeleteConfirmButton);
            await elementActions.writeToInput(this.versionDeleteTxtInput, 'DELETE');

            await elementVerification.verifyElementIsEnabled(this.page, this.versionDeleteConfirmButton);

            await elementActions.clickElement(this.versionDeleteConfirmButton);

            await elementVerification.verifyElementIsVisible(this.page.getByText('Version '+ deletedVersionNum +' deleted.'))
        }
    }
}