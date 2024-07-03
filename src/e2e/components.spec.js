const {test, expect} = require('../fixtures/base');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

test.beforeEach('Authenticate and navigate to the components page', async ({loginPage, sidebar, componentsPage}) => {

    await loginPage.fullLogin(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);
    
    await elementActions.clickElement(sidebar.componentsBtn);

    await elementVerification.verifyElementIsVisible(componentsPage.pageHeader);  
});

test('Reimport Figma file in case it will be deleted by other TC', async ({ sidebar, designDataPage }) => {
    await elementActions.clickElement(sidebar.designDataBtn);

    await designDataPage.importFigmaFile(process.env.TEST_FIGMA_FILE_URL_GENERAL);
})


test('Open Learn more about components', async ({componentsPage}) => {
    if(await componentsPage.verifyIfPageHasComponents()){
        await componentsPage.deleteAllAddedComponents();
    }

    await elementVerification.verifyLinkInNewTab(componentsPage.page, componentsPage.learnMoreLink, componentsPage.documentationUrl);
})

test('Search components in component adding modal', async ({componentsPage}) => {
    await elementActions.clickElement(componentsPage.newComponentBtn);
    await elementActions.clickElement(componentsPage.selectFigmaComponentBtn);
    
    // TODO Search for some item
    await elementActions.writeToInput(componentsPage.componentAddingSearchBarLocator, 'test');
})

test('Search table for component when page has no added components', async ({componentsPage}) => {
    await elementVerification.verifyElementIsVisible(componentsPage.noComponentsYetLbl); 

    await elementActions.writeToInput(componentsPage.tableSearchBarLocator, componentsPage.testComponentName1);

    await elementVerification.verifyElementIsVisible(componentsPage.noComponentsYetLbl); 
})

test('Add new components to the table', async ({componentsPage}) => {
    await componentsPage.addNewComponent(componentsPage.testComponentName1, componentsPage.pageFigmaComponent);
    await componentsPage.verifyNewComponentIsAdded(componentsPage.testComponentName1);

    await componentsPage.addNewComponent(componentsPage.testComponentName2, componentsPage.burgerFigmaComponent);
    await componentsPage.verifyNewComponentIsAdded(componentsPage.testComponentName2);
})

test('Search table for component that does not exist in components table', async ({componentsPage}) => {
    await elementActions.writeToInput(componentsPage.tableSearchBarLocator, componentsPage.testComponentNameNonExist);

    await elementVerification.verifyElementIsVisible(componentsPage.noMatchingComponentsFoundHeading); 
})

test('Search table for component name', async({componentsPage})=>{
    await elementActions.writeToInput(componentsPage.tableSearchBarLocator, componentsPage.testComponentName1);
    await componentsPage.compareTableName(componentsPage.testComponentName1, true);
})

test('Search table for component that is sharing similar name with other component', async({componentsPage}) => {
    await elementActions.writeToInput(componentsPage.tableSearchBarLocator, componentsPage.testComponentNameSoft);
    await componentsPage.compareTableName(componentsPage.testComponentNameSoft, false);
})

test('Search table for component that was deleted', async({componentsPage}) => {
    await componentsPage.deleteAllAddedComponents();

    await elementActions.writeToInput(componentsPage.tableSearchBarLocator, componentsPage.testComponentName1);
    
    await elementVerification.verifyElementIsVisible(componentsPage.noComponentsYetLbl); 
})

