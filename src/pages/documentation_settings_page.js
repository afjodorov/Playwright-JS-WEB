const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.DocumentationSettingsPage = class DocumentationSettingsPage {
    constructor(page){
        this.page = page;

        // Layout change
        // TODO - Dynamic Locator should be changed
        this.documentationLayoutChangeBtn=page.locator('[id="radix-\\:r76\\:"]');
        this.sideOnlyLayoutOption=page.getByRole('menuitem', { name: 'Side only Entire navigation' });
        this.topAndSideLayoutOption=page.getByRole('menuitem', { name: 'Top and side Primary' });

        this.sideOnlySavingToast=page.getByText('Side navigation only enabled');
        this.topSavingToast=page.getByText('Top and side navigation enabled');

        // Side menu
        // Side menu - General
        this.domainAndPrivacyBtn=page.getByRole('link', { name: 'Domain & privacy' });
        this.storyBookNpmBtn=page.getByRole('link', { name: 'Storybook & npm' });
        this.privateNpmRegistryBtn=page.getByRole('link', { name: 'Private npm registry' });
        this.advancedBtn=page.getByRole('link', { name: 'Advanced' });

        // Side menu - Customization
        this.lookAndFeelBtn=page.getByRole('link', { name: 'Look & feel' });
        this.layoutBtn=page.getByRole('link', { name: 'Layout' });
        this.topNavBtn=page.getByRole('link', { name: 'Top navigation' });
        this.sideNavBtn=page.getByRole('link', { name: 'Side navigation' });
        this.homepageBtn=page.getByRole('link', { name: 'Homepage' });
        this.pagesBtn=page.getByRole('link', { name: 'Pages' }).nth(1);
        this.blocksBtn=page.getByRole('link', { name: 'Blocks' });
        this.footerBtn=page.getByRole('link', { name: 'Footer' });
        this.searchEnginesBtn=page.getByRole('link', { name: 'Search engines' });
        this.analyticsBtn=page.getByRole('link', { name: 'Analytics' });
        this.codeSnippetsBtn=page.getByRole('link', { name: 'Code snippets' });
        this.otherBtn=page.getByRole('link', { name: 'Other' });

        // Storybook & NPM
        this.storybookAndNPMHeading=page.getByRole('heading', { name: 'Storybook & npm' });
        this.learnMoreBtn=page.getByRole('link', { name: 'Learn more' });

        this.strorybookErrMsgHeading=page.getByRole('heading', { name: 'Storybook error message' });
        this.storybookErrMsgInput=page.getByPlaceholder('e.g. Storybook failed to load');
    
        this.storybookMsgSavedToast=page.getByText('Storybook error message settings saved.');
        this.storybookMsgSavedToastPublishBtn=page.getByRole('listitem').getByRole('button', { name: 'Publish' });
        this.docsPublishedToast=page.getByText('Documentation published.');

        this.newErrMsgTxt='Auto test msg';
        this.newErrMsgTxt2='msg test Auto';
    }
}