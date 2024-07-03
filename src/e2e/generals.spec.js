const {test, expect} = require('../fixtures/base');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

// Generals.spec collects the most generic test cases e.g Workspace, Design systems

test.beforeEach('Authenticate', async ({loginPage, sidebar}) => {
    await loginPage.fullLogin(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);
});

test('Persistent collapse state', async({sidebar}) => {
    // Persistent collapse
    await elementVerification.verifyElementIsVisible(sidebar.documentationBtn);

    await elementVerification.verifyScreenshot(sidebar.page, sidebar.sidebarLocator, 'sidebar_expanded.png');

    await elementActions.elementHover(sidebar.sidebarLocator);

    await elementActions.clickElement(sidebar.collapseBtn);
    
    await elementVerification.verifyScreenshot(sidebar.page, sidebar.sidebarLocator, 'sidebar_collapsed.png');
    
    await sidebar.page.reload();

    await elementVerification.verifyScreenshot(sidebar.page, sidebar.sidebarLocator, 'sidebar_collapsed.png');
    // Persistent expanded
    await elementActions.elementHover(sidebar.sidebarLocator);
    
    await elementActions.clickElement(sidebar.expandBtn);

    await elementVerification.verifyScreenshot(sidebar.page, sidebar.sidebarLocator, 'sidebar_expanded.png');

    await sidebar.page.reload();

    await elementVerification.verifyScreenshot(sidebar.page, sidebar.sidebarLocator, 'sidebar_expanded.png');
});

test('New Workspace name empty error', async({sidebar}) => {
    await elementActions.clickElement(sidebar.DSMainBtn);

    await elementActions.clickElement(sidebar.DSMyDesignSystemBtn);

    await elementActions.clickElement(sidebar.DSNewDesignSystemBtn);

    await elementVerification.verifyElementIsVisible(sidebar.DSNewDesignSystemModalHeading);

    await elementActions.clickElement(sidebar.DSNewDesignSystemModalCreateBtn);

    await elementVerification.verifyElementIsVisible(sidebar.DSNewDesignSystemModalErr);
})

test('Create new Workspace', async({sidebar}) => {
    await elementActions.clickElement(sidebar.WSMainBtn);

    await elementActions.clickElement(sidebar.WSLabel);

    await elementActions.clickElement(sidebar.WSNewWSBtn);

    await elementVerification.verifyElementIsVisible(sidebar.WSNewWSModalHeading);
    
    await elementActions.writeToInput(sidebar.WSNewWSNameInput, sidebar.WSNewName);

    await elementActions.clickElement(sidebar.WSNewWSCreateBtn);

    await elementVerification.verifyElementAppearsAndDisappears(sidebar.launchingSupernovaTxt);

    // Verification on new WS
    await elementActions.clickElement(sidebar.WSMainBtn);

    await elementVerification.verifyElementIsVisible(sidebar.WSNewWS);

    await sidebar.page.waitForTimeout(3000)
})

test('Upgrade new Workspace to Company plan', async({sidebar, settingsPage, selectPlanPage, billingPage}) => {
    await elementActions.clickElement(sidebar.settingsBtn);

    await elementActions.clickElement(settingsPage.billingBtn);

    await elementVerification.verifyElementIsVisible(settingsPage.billingHeading);

    await elementActions.clickElement(settingsPage.viewAllPlansBtn);
    
    await elementVerification.verifyElementIsVisible(selectPlanPage.selectPlanPageHeading);

    await elementActions.clickElement(selectPlanPage.changeToCompanyBtn);

    // Billing
    await elementVerification.verifyElementIsVisible(billingPage.subToCompanyPlanTxt);

    await elementActions.writeToInput(billingPage.emailInput, billingPage.emailVal);

    await elementActions.writeToInput(billingPage.CCNumInput, process.env.CC_NUM);

    await elementActions.writeToInput(billingPage.CCValidToInput, process.env.CC_VALID_TO);

    await elementActions.writeToInput(billingPage.CCCVCInput, process.env.CC_CVC);

    await elementActions.writeToInput(billingPage.CCNameInput, process.env.CC_NAME);

    await billingPage.selectCountyOfOrigin('US');

    await elementActions.writeToInput(billingPage.addressInput, billingPage.addressVal);

    await elementActions.writeToInput(billingPage.zipInput, billingPage.postalCodeVal);

    await elementActions.writeToInput(billingPage.cityInput, billingPage.cityVal);

    await elementActions.clickElement(billingPage.submitBtn);

    await elementVerification.verifyElementAppearsAndDisappears(billingPage.processingBtn);

    await elementVerification.verifyElementIsVisible(billingPage.thankYouHeading);

    await elementActions.clickElement(billingPage.goToWSBtn);

    await elementVerification.verifyElementIsVisible(settingsPage.upgradeToEnterpriseTxt);
})

test('Delete new Workspace', async({sidebar, settingsPage}) => {
    await elementActions.clickElement(sidebar.settingsBtn);

    await elementVerification.verifyElementIsVisible(settingsPage.generalHeading);
    
    await elementActions.clickElement(settingsPage.deleteWSBtn);

    await elementVerification.verifyElementIsVisible(settingsPage.deleteModalHeading);

    await elementActions.writeToInput(settingsPage.deleteModalInput, 'DELETE');
    
    await elementActions.clickElement(settingsPage.deleteConfirmationBtn);

    await elementVerification.verifyElementAppearsAndDisappears(sidebar.launchingSupernovaTxt);

    await sidebar.page.reload();

    await elementActions.clickElement(sidebar.WSMainBtn);

    await elementVerification.verifyTextShouldBe(sidebar.WSNameLbl, 'Automated Docs - Custom Domain Private');
})

test('New design system name empty error', async({sidebar}) => {
    await elementActions.clickElement(sidebar.DSMainBtn);

    await elementActions.clickElement(sidebar.DSMyDesignSystemBtn);

    await elementActions.clickElement(sidebar.DSNewDesignSystemBtn);

    await elementVerification.verifyElementIsVisible(sidebar.DSNewDesignSystemModalHeading);

    await elementActions.clickElement(sidebar.DSNewDesignSystemModalCreateBtn);

    await elementVerification.verifyElementIsVisible(sidebar.DSNewDesignSystemModalErr);
})

test('Create new design system', async({sidebar}) => {
    await elementActions.clickElement(sidebar.DSMainBtn);

    await elementActions.clickElement(sidebar.DSMyDesignSystemBtn);

    await elementActions.clickElement(sidebar.DSNewDesignSystemBtn);

    await elementVerification.verifyElementIsVisible(sidebar.DSNewDesignSystemModalHeading);

    await elementActions.writeToInput(sidebar.DSNewDesignSystemModalInput, sidebar.DSNewName);

    await elementActions.clickElement(sidebar.DSNewDesignSystemModalCreateBtn);

    await sidebar.verifyDSName(sidebar.DSNewName);
})

test('Rename design system', async({sidebar, settingsPage}) => {
    await sidebar.selectNewlyCreatedDS(sidebar.DSNewName);

    await elementActions.clickElement(sidebar.settingsBtn);

    await elementActions.clickElement(settingsPage.DSGeneralSettingBtn);
    
    await elementActions.writeToInput(settingsPage.DSNameInput, sidebar.DSNameUpdated);

    await elementActions.clickElement(settingsPage.DSNewNameSaveBtn);

    await sidebar.verifyDSName(sidebar.DSNameUpdated);
})

test('Delete design system', async({sidebar, settingsPage}) => {
    await sidebar.selectNewlyCreatedDS(sidebar.DSNameUpdated);

    await elementActions.clickElement(sidebar.settingsBtn);

    await elementActions.clickElement(settingsPage.DSGeneralSettingBtn);

    await elementActions.clickElement(settingsPage.DSDeleteBtn);

    await elementVerification.verifyElementIsVisible(settingsPage.DSDeleteModalHeading);

    await elementActions.writeToInput(settingsPage.DSDeleteModalInput, 'DELETE');

    await elementActions.clickElement(settingsPage.DSDeleteConfirmBtn);

    await sidebar.verifyDSName(sidebar.DSdefaultName);
})

test('Support FAQ link', async({sidebar}) => {
    await elementActions.clickElement(sidebar.helpBtn);

    await elementVerification.verifyLinkInNewTab(sidebar.page, sidebar.supportFAQBtn, sidebar.supportPageUrl);
})

test('Create new version', async({  sidebar}) => {
    await elementActions.clickElement(sidebar.versionsCombo);
    await sidebar.page.waitForTimeout(3000);
    const newVersion = await sidebar.getNextVersion();

    await sidebar.createNewVersion(newVersion);

    await sidebar.verifyNewVersionCreated(newVersion);
});

test('Create new version without entering version', async({sidebar}) => {
    await elementActions.clickElement(sidebar.versionsCombo);

    await elementActions.clickElement(sidebar.newVersionBtn);    

    await elementActions.clickElement(sidebar.createNewVersionBtn);

    await elementVerification.verifyElementIsVisible(sidebar.versionRequiredErr);
});

// BUGGED - RCT-1926
// test('Create new version with already existing version', async({sidebar}) => {
//     await elementActions.clickElement(sidebar.versionsCombo);

//     const currentVersion = await sidebar.getCurrentVersion();

//     await sidebar.createNewVersion(currentVersion);
//     await elementVerification.verifyElementIsVisible(sidebar.uniqueVersionErr);
//     await elementVerification.verifyElementIsHidden(sidebar.uniqueVersionErr);
// });

// test('Create new version with string value', async({sidebar}) => {
//     await elementActions.clickElement(sidebar.versionsCombo);

//     await sidebar.createNewVersion('a');

//     await elementVerification.verifyElementIsVisible(sidebar.versionSemanticErr);
//     await elementVerification.verifyElementIsHidden(sidebar.versionSemanticErr);
// });

test('Delete all versions', async({sidebar, settingsPage }) => {
    await elementActions.clickElement(sidebar.settingsBtn);

    await elementActions.clickElement(settingsPage.versionsBtn);

    await elementVerification.verifyElementIsVisible(settingsPage.versionsHeader);

    await settingsPage.page.waitForTimeout(3000);

    await settingsPage.deleteAllVersions();
});

test('Zendesk widget', async({sidebar}) => {
    // Zendesk via contact support
    await elementActions.clickElement(sidebar.helpBtn);

    await elementActions.clickElement(sidebar.contactSupportBtn);

    await elementVerification.verifyElementIsVisible(sidebar.zendeskWindowLocator);

    await elementActions.clickElement(sidebar.zendeskCloseBtn);

    await elementVerification.verifyElementIsHidden(sidebar.zendeskWindowLocator);

    // Zendesk via search
    await elementActions.clickElement(sidebar.searchBtn);

    await elementActions.writeToInput(sidebar.searchInput, sidebar.searchContactSupportTxt);

    await elementActions.clickElement(sidebar.contactSupportOption);

    await elementVerification.verifyElementIsVisible(sidebar.zendeskWindowLocator);

    await elementActions.clickElement(sidebar.zendeskCloseBtn);

    await elementVerification.verifyElementIsHidden(sidebar.zendeskWindowLocator);
})

test('Test run', async ({sidebar, settingsPage}) => {
    await elementActions.clickElement(sidebar.settingsBtn);

    await elementActions.clickElement(settingsPage.profileBtn);

    await elementVerification.verifyElementIsVisible(settingsPage.profileHeader);
}) 