const {test, expect} = require('../fixtures/base');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

test.beforeEach('Authenticate', async ({loginPage}) => {
    await loginPage.fullLogin(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);
});

// TODO - Dynamic Locator should be changed
// test('Change documentation page layout style', async({docsSettingsPage}) => {
//     await elementActions.clickElement(docsSettingsPage.documentationLayoutChangeBtn);

//     await elementActions.clickElement(docsSettingsPage.topAndSideLayoutOption);

//     await elementVerification.verifyElementAppearsAndDisappears(docsSettingsPage.topSavingToast);
    
//     await elementActions.clickElement(docsSettingsPage.topAndSideLayoutOption);

//     await elementVerification.verifyElementAppearsAndDisappears(docsSettingsPage.sideOnlySavingToast);
// });

test('Access documentation settings', async({docsMainPage, docsSettingsPage}) => {
    await elementActions.clickElement(docsMainPage.settingsBtn);

    // Side menu - General
    await elementVerification.verifyElementIsVisible(docsSettingsPage.domainAndPrivacyBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.storyBookNpmBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.privateNpmRegistryBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.advancedBtn);

    // Side menu - Customization
    await elementVerification.verifyElementIsVisible(docsSettingsPage.lookAndFeelBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.layoutBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.topNavBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.sideNavBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.homepageBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.pagesBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.blocksBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.footerBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.searchEnginesBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.analyticsBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.codeSnippetsBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.otherBtn);
});

test('Documentation settings save toast', async({docsMainPage, docsSettingsPage}) => {
    await elementActions.clickElement(docsMainPage.settingsBtn);

    await elementActions.clickElement(docsSettingsPage.storyBookNpmBtn);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.storybookAndNPMHeading);

    await elementVerification.verifyElementIsVisible(docsSettingsPage.strorybookErrMsgHeading);

    var randomErrorMsgTxt = await elementActions.generateRandStr(15);

    await elementActions.writeToInput(docsSettingsPage.storybookErrMsgInput, randomErrorMsgTxt);

    await elementVerification.verifyElementAppearsAndDisappears(docsSettingsPage.storybookMsgSavedToast);
});