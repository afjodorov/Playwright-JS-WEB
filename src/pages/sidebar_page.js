const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.Sidebar = class Sidebar {

    constructor(page){
        this.page=page;
        this.launchingSupernovaTxt=page.getByText('Launching Supernova...');

        this.sidebarLocator=page.locator('.group\\/app-left-panel');
        this.collapseBtn=page.getByLabel('Collapse sidebar')
        this.expandBtn=page.getByLabel('Expand sidebar')

        // Workspace
        this.WSMainBtn=page.getByRole('button', { name: 'AD My Design System AT' });
        this.WSLabel=page.getByText('Workspace', { exact: true });
        this.WSNameLbl=page.getByRole('menuitem').first().locator('.flex-1').locator('div').nth(1);
        this.WSNewWSBtn=page.getByRole('menuitem', { name: 'New workspace' });
        
        this.WSNewWSModalHeading=page.getByRole('heading', { name: 'New workspace' });
        this.WSNewWSNameInput=page.getByLabel('Workspace name');
        this.WSNewWSCreateBtn=page.getByRole('button', { name: 'Create workspace' });
        this.WSNewWS=page.getByRole('menuitem').getByText('auto d workspace');

        // Design system
        // TODO - better locator for DS
        this.DSMainBtn=page.getByRole('button', { name: 'AD My Design System AT' });
        this.DSMyDesignSystemBtn=page.getByRole('menuitem', { name: 'My Design system' })
        this.DSNewDesignSystemBtn=page.getByRole('menuitem', { name: 'New design system' })

        this.DSNewDesignSystemModalHeading=page.getByRole('heading', { name: 'New design system' })
        this.DSNewDesignSystemModalInput=page.getByLabel('Design system name')
        this.DSNewDesignSystemModalCreateBtn=page.getByRole('button', { name: 'Create design system' })
        
        this.DSNewDesignSystemModalErr=page.getByText('Design system name is required.');

        // Navigations
        this.documentationBtn=page.getByRole('link', { name: 'Documentation', exact: true });
        this.designTokenBtn=page.getByRole('link', { name: 'Design tokens' });
        this.componentsBtn=page.getByRole('link', { name: 'Components' });
        this.assetsBtn=page.locator('span').filter({ hasText: 'Assets' });
        this.designDataBtn=page.getByRole('link', { name: 'Design data', exact: true });
        this.codeAutomationBtn=page.getByRole('link', { name: 'Code automation', exact: true });
        
        // Versions
        this.versionsCombo=page.getByRole('button', { name: 'Current draft' });
        this.newVersionBtn=page.getByRole('menuitem', { name: 'New version' });

        // New versions modal
        this.versionPlaceholder=page.getByPlaceholder('e.g. 0.8.1');
        this.versionNamePlaceholder=page.getByPlaceholder('e.g Arctic fox');
        this.createNewVersionBtn=page.getByRole('button', { name: 'Create version' });
        
        this.versionRequiredErr=page.getByText('Version is required.');
        this.uniqueVersionErr=page.locator('div').filter({ hasText: 'Version must be unique within'}).nth(1);
        this.versionSemanticErr=page.locator('div').filter({ hasText: 'Version must match semantic versioning format'}).nth(1);
    
        // Search
        this.searchBtn=page.getByRole('button', { name: 'Search ⌘K' });
        this.searchInput=page.getByPlaceholder('Type a command or search');

        this.contactSupportOption=page.getByRole('option', { name: 'Contact Supernova support' });

        // Settings
        this.settingsBtn=page.getByRole('link', { name: 'Settings', exact: true }).first();

        // Help
        this.helpBtn=page.getByRole('button', { name: 'Help' });
        
        this.supportFAQBtn=page.getByRole('link', { name: 'Support FAQ' });
        this.supportPageUrl='https://supernova-help.zendesk.com/hc/en-us';

        this.contactSupportBtn=page.locator('a').filter({ hasText: 'Contact support' });

        // Zendesk widget
        
        this.zendeskWindowLocator=page.locator('iframe[name="Messaging window"]');
        this.zendeskCloseBtn=page.locator('iframe[id="launcher"]');

        // Variables
        this.WSNewName='auto d workspace';
        this.DSdefaultName='My design system';
        this.DSNewName='Qbsolutely new DS';
        this.DSNameUpdated='Qbsolutely new DS isUpdated';
        this.searchContactSupportTxt='Contact supernova support';
    }

    async createNewVersion(version, name=null){
        await elementActions.clickElement(this.newVersionBtn);
    
        await elementActions.writeToInput(this.versionPlaceholder, version);

        if(name != null){
            await elementActions.writeToInput(this.versionNamePlaceholder, name);
        }

        await elementActions.clickElement(this.createNewVersionBtn);
    }

    async getCurrentVersion(){
        const versionsList = await this.page.getByRole('menuitem').allTextContents();
        const versionsCount = await this.page.getByRole('menuitem').count();

        var lastVersionStr = versionsList[versionsCount - 2].replace('v', '');
        
        if(lastVersionStr == 'Current draft'){
            lastVersionStr = 1;
        }
        return lastVersionStr;
    }

    async getNextVersion(){
        const lastVersionStr = await this.getCurrentVersion();

        const lastVersionInt =+ lastVersionStr;

        const newVersionInt = lastVersionInt + 1;

        return newVersionInt.toString();
    }

    async verifyNewVersionCreated(version){
        const newVersionCreatedTxt = 'Version ' + version + ' created.'
        await elementVerification.verifyElementIsVisible(this.page.locator('div').filter({ hasText: newVersionCreatedTxt }).nth(1))
        await elementVerification.verifyElementIsHidden(this.page.locator('div').filter({ hasText: newVersionCreatedTxt }).nth(1))
    }

    async verifyDSName(DSname){
        await elementVerification.verifyElementIsVisible(this.page.getByRole('button', {name: 'AD ' + DSname + ' AT'}))
    }
    
    async selectNewlyCreatedDS(DSname){
        await elementActions.clickElement(this.page.getByRole('button', { name: 'AD ' + this.DSdefaultName + ' AT' }));

        await elementActions.clickElement(this.page.getByRole('menuitem', { name: this.DSdefaultName }));

        await elementActions.clickElement(this.page.getByRole('menuitem', { name: DSname }));

        await this.verifyDSName(DSname);
    }
}