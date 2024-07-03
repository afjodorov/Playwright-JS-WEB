const {test, expect} = require('../fixtures/base');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');


test.beforeEach('Authenticate and navigate to design data page', async ({loginPage, sidebar, designDataPage}) => {
    await loginPage.fullLogin(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);

    await elementActions.clickElement(sidebar.designDataBtn);

    await elementVerification.verifyElementIsVisible(designDataPage.pageHeader)
});

test('Multiple Figma design URL variants', async ({designDataPage}) => {
    test.slow();

    await designDataPage.importFigmaFile(process.env.TEST_FIGMA_FILE_URL_1);

    await designDataPage.deleteAllFigmaFiles();

    await designDataPage.importFigmaFile(process.env.TEST_FIGMA_FILE_URL_2);

    await designDataPage.deleteAllFigmaFiles();
})

test('Import Figma file into Supernova', async ({designDataPage}) => {
    await designDataPage.importFigmaFile(process.env.TEST_FIGMA_FILE_URL_GENERAL);

    // Imported Figma file summary
    await elementActions.clickElement(designDataPage.importedViewSummaryBtn);

    await elementVerification.verifyElementIsVisible(designDataPage.importedViewSummaryGeneralTxt);

    await elementActions.clickElement(designDataPage.importedViewSummaryCloseBtn);
});

test('Delete imported Figma file', async ({designDataPage}) => {
    await designDataPage.deleteAllFigmaFiles();
});

