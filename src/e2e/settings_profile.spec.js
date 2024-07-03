const {test, expect} = require('../fixtures/base');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');


test.beforeEach('Authenticate and navigate to settings profile page', async ({loginPage, sidebar, settingsPage}) => {
    await loginPage.fullLogin(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);

    await elementActions.clickElement(sidebar.settingsBtn);
    
    await elementVerification.verifyElementIsVisible(settingsPage.pageHeader);

    await elementActions.clickElement(settingsPage.profileBtn);

    await elementVerification.verifyElementIsVisible(settingsPage.profileHeader);
});

test('Verify Privacy policy link', async({settingsPage}) => {
    await elementActions.clickElement(settingsPage.privacyPolicyDocLink); 

    // TODO update to elementVerification
    await expect(settingsPage.page).toHaveURL(settingsPage.privacyPolicyUrl);
    await expect(settingsPage.page).toHaveTitle(settingsPage.privacyPolicyTitle);
});