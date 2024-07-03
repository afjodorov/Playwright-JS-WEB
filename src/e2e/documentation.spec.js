const {test, expect} = require('../fixtures/base');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

test.beforeEach('Authenticate', async ({loginPage}) => {
    await loginPage.fullLogin(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);
});

test('Edit page title & description', async({docsMainPage}) => {
    const newPageTitleName = await elementActions.generateRandStr(10);
    const newPageTitleDesc = await elementActions.generateRandStr(20);

    // Creating separate page since can not change header text on the Welcome! page
    await docsMainPage.createNewPage(docsMainPage.docPageHeaderName);
    await docsMainPage.clickTreeItem(docsMainPage.docPageHeaderName);

    await elementVerification.verifyElementIsVisible(docsMainPage.pageHeaderNameInput);
    
    await elementActions.writeToInput(docsMainPage.pageHeaderNameInput, newPageTitleName);
    await elementActions.writeToInput(docsMainPage.pageHeaderDescInput, newPageTitleDesc);

    await elementVerification.verifyElementIsVisible(docsMainPage.page.getByRole('link', { name: newPageTitleName }).first());

    await docsMainPage.page.reload();

    await elementVerification.verifyTextShouldBe(docsMainPage.pageHeaderNameInput, newPageTitleName);
    await elementVerification.verifyTextShouldBe(docsMainPage.pageHeaderDescInput, newPageTitleDesc);
    await elementVerification.verifyElementIsVisible(docsMainPage.page.getByRole('link', { name: newPageTitleName }).first());

    await docsMainPage.deletePage(newPageTitleName);
});

test('Edit page header height', async({docsMainPage}) => {
    await elementActions.clickElement(docsMainPage.treeItemHeaderHeightPage);

    await elementActions.writeToInput(docsMainPage.pageHeaderDescInput, '');

    await elementActions.writeToInput(docsMainPage.pageHeaderHeightInput, '300', docsMainPage.page, true);

    await elementVerification.verifyElementSize(docsMainPage.pageHeaderContentWrapper, 300);

    // Minimum size without description
    await elementActions.writeToInput(docsMainPage.pageHeaderHeightInput, '156', docsMainPage.page, true);

    await elementVerification.verifyElementSize(docsMainPage.pageHeaderContentWrapper, 156);

    // Minimum size without description - warning
    await elementActions.writeToInput(docsMainPage.pageHeaderHeightInput, '155', docsMainPage.page, true);
    
    await elementActions.elementHover(docsMainPage.pageHeaderHeightWarning);

    await elementVerification.verifyElementIsVisible(docsMainPage.page.getByText('Header height value is too small.'));

    await elementVerification.verifyPlaceholderValueEquals(docsMainPage.pageHeaderHeightInput, 'Auto');

    // Minimum size with description
    await elementActions.writeToInput(docsMainPage.pageHeaderDescInput, 'Checking page header height');

    await elementActions.writeToInput(docsMainPage.pageHeaderHeightInput, '214', docsMainPage.page, true);

    await elementVerification.verifyElementSize(docsMainPage.pageHeaderContentWrapper, 214);

    // Minimum size with description - warning
    await elementActions.writeToInput(docsMainPage.pageHeaderHeightInput, '213', docsMainPage.page, true);

    await elementActions.elementHover(docsMainPage.pageHeaderHeightWarning);

    await elementVerification.verifyElementIsVisible(docsMainPage.page.getByText(docsMainPage.pageHeaderHeightWarningTxt));

    await elementVerification.verifyPlaceholderValueEquals(docsMainPage.pageHeaderHeightInput, 'Auto');
});

test('Create page', async({docsMainPage}) => {
    await docsMainPage.createNewPage(docsMainPage.newPageName);

    await elementVerification.verifyElementIsVisible(docsMainPage.treeItemRole.getByRole('link', { name: docsMainPage.newPageName }).first());
    
    await elementVerification.verifyPlaceholderTxtEquals(docsMainPage.page, docsMainPage.pageHeaderNameInput, docsMainPage.newPageName);
});

test('Rename page', async({docsMainPage}) => {
    await docsMainPage.clickTreeItem(docsMainPage.newPageName);

    await elementActions.elementHover(docsMainPage.treeItemRole.getByRole('link', { name: 'Autotests new page' }).first());

    await docsMainPage.clickTreeItemMenuOptionsBtn(docsMainPage.newPageName);

    await elementActions.clickElement(docsMainPage.treeItemOptionsMenuRenameBtn);

    await elementVerification.verifyElementIsVisible(docsMainPage.treeItemOptionsMenuRenameHeading);

    await elementActions.writeToInput(docsMainPage.treeItemOptionsMenuRenameInput, docsMainPage.updatedPageName);
    
    await elementActions.clickElement(docsMainPage.treeItemOptionsMenuRenameConfirmBtn);

    // Rename verification
    await elementVerification.verifyElementIsVisible(docsMainPage.treeItemRole.getByRole('link', { name: docsMainPage.updatedPageName }).first());
});

test('Delete page', async({docsMainPage}) => {
    await docsMainPage.clickTreeItem(docsMainPage.updatedPageName);

    await elementVerification.verifyPlaceholderTxtEquals(docsMainPage.page, docsMainPage.pageHeaderNameInput, docsMainPage.updatedPageName);

    await elementActions.elementHover(docsMainPage.treeItemRole.getByRole('link', { name: docsMainPage.updatedPageName }).first());

    await docsMainPage.clickTreeItemMenuOptionsBtn(docsMainPage.updatedPageName);

    await elementActions.clickElement(docsMainPage.treeItemOptionsMenuDeleteBtn);

    await elementVerification.verifyElementIsVisible(docsMainPage.treeItemOptionsMenuDeleteModalHeading);

    await elementActions.clickElement(docsMainPage.treeItemOptionsMenuDeleteModalBtn);

    await elementVerification.verifyElementAppearsAndDisappears(docsMainPage.deletePageToast)

    await elementVerification.verifyPlaceholderTxtEquals(docsMainPage.page, docsMainPage.pageHeaderNameInput, 'Welcome!');
});

test('Display rich text floating overlay', async({docsMainPage}) => {
    await docsMainPage.clickTreeItem(docsMainPage.docBlocksPageName);

    await elementActions.clickElement(docsMainPage.dummyTxtLocator);

    await elementActions.dblClickElement(docsMainPage.dummyTxtLocator);

    await elementActions.clickElement(docsMainPage.floatingWrapperTxtStyleOption);

    // Verification of all floating wrapper text style options
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionText);
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionH1);
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionH2);
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionH3);
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionH4);
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionH5);
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionBulletList);
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionNumberList);
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionBlockquote);
    await elementVerification.verifyElementIsVisible(docsMainPage.floatingWrapperTxtStyleOptionCallout);

    // Verification of all floating wrapper text style searching bar options
    await docsMainPage.verifyFloatingWrapperSearch('Text');
    await docsMainPage.verifyFloatingWrapperSearch('Heading 1');
    await docsMainPage.verifyFloatingWrapperSearch('Heading 2');
    await docsMainPage.verifyFloatingWrapperSearch('Heading 3');
    await docsMainPage.verifyFloatingWrapperSearch('Heading 4');
    await docsMainPage.verifyFloatingWrapperSearch('Heading 5');
    await docsMainPage.verifyFloatingWrapperSearch('Bulleted List');
    await docsMainPage.verifyFloatingWrapperSearch('Numbered List');
    await docsMainPage.verifyFloatingWrapperSearch('Blockquote');
    await docsMainPage.verifyFloatingWrapperSearch('Callout');
});

test('Create divider block', async({docsMainPage}) => {
    await docsMainPage.clickTreeItem(docsMainPage.docBlocksPageName);

    await elementActions.clickElement(docsMainPage.documentParagraphLocator);

    await elementActions.writeToInput(docsMainPage.documentParagraphLocator, '');

    await elementActions.typeTxtToPage(docsMainPage.page, '/');

    await elementActions.typeTxtToPage(docsMainPage.page, 'divider');

    await elementActions.elementHover(docsMainPage.documentBodySlashDropdownMenuOption);
    // await elementVerification.verifyElementIsVisible(docsMainPage.documentBodySlashDropdownMenuOption)
    // await elementActions.dblClickElement(docsMainPage.documentBodySlashDropdownMenuOption);
    await elementActions.clickElement(docsMainPage.documentBodySlashDropdownMenuOption);

    await elementActions.dblClickElement(docsMainPage.documentParagraphLocator);
    
    var tst = await expect(docsMainPage.page.locator('#tiptap-content')).toHaveAttribute('definitionid', 'io.supernova.block.divider');
    // .toHaveAttribute('data-action', 'cancel');
    console.log(await tst);
    // page.getByRole('option', { name: 'Divider A section divider' }).locator('span')
    

    await docsMainPage.page.waitForTimeout(3000);
})