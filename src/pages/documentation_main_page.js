const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.DocumentationPage = class DocumentationPage {
    constructor(page){
        this.page=page;

        // General
        this.settingsBtn=page.getByRole('button', { name: 'Settings' }).getByRole('link');

        this.addTabBtn=page.getByRole('button', { name: 'Add', exact: true });
        this.addNewPageBtn=page.getByRole('menuitem', { name: 'New page' });
        this.addNewGroupBtn=page.getByRole('menuitem', { name: 'New group' });

        this.addingNewPageModalHeading=page.getByRole('heading', { name: 'New page' });
        this.addingNewPageModalInput=page.getByLabel('Name');
        this.addingNewPageConfirmBtn=page.getByRole('button', { name: 'New page' });

        // Left side tree
        this.treeFirstItem=page.getByRole('treeitem').first();
        this.treeItemRole=page.getByRole('treeitem');
        this.treeItemHeaderHeightPage=page.getByRole('treeitem', { name: 'Page header height testing' });
  
        this.treeItemOptionsMenuRenameBtn=page.getByRole('menuitem', { name: 'Rename' });
        this.treeItemOptionsMenuRenameHeading=page.getByRole('heading', { name: 'Rename page' });
        this.treeItemOptionsMenuRenameInput=page.getByLabel('Name', { exact: true });
        this.treeItemOptionsMenuRenameConfirmBtn=page.getByRole('button', { name: 'Rename page' });

        this.treeItemOptionsMenuDeleteBtn=page.getByRole('menuitem', { name: 'Delete page' });
        this.treeItemOptionsMenuDeleteModalHeading=page.getByRole('heading', { name: 'Delete page' })
        this.treeItemOptionsMenuDeleteModalBtn=page.getByRole('button', { name: 'Delete page' });
        this.deletePageToast=page.getByText('Page deleted');

        // Right side options
        this.publishBtn=page.getByRole('button', { name: 'Publish' });
        
        this.pageHeaderHeightInput=page.locator('#page-headerHeight');
        this.pageHeaderHeightWarning=page.locator('div').filter({ hasText: /^Header heightpxBackground colorBackground imageAdd image$/ }).locator('svg').first();
        this.pageHeaderHeightWarningTxt='Header height value is too small.'
        
        // Document - header
        this.pageHeaderContentWrapper=page.locator('.group\\/editable-height-wrapper');
        this.pageHeaderNameInput=page.getByPlaceholder('Untitled page');
        this.pageHeaderDescInput=page.getByPlaceholder('Add description…');

        // Document - body
        this.dummyTxtLocator=page.getByText('Lorem Ipsum is simply dummy text');

        this.documentBodyLocator=page.locator('#tiptap-wrapper');
        this.documentParagraphLocator=this.documentBodyLocator.getByRole('paragraph').first();

        this.documentBodySlashDropdownMenuOption=page.getByRole('option').getByText('Divider', { exact: true });

        // Document body - floating options for txt
        this.floatingWrapperLocator=page.locator('#floating');
        this.floatingWrapperTxtStyleOption=this.floatingWrapperLocator.getByRole('button', { name: 'Text' });
        this.floatingWrapperTxtStyleOptionSearchInput=page.getByPlaceholder('Filter...');
        this.floatingWrapperTxtStyleListLocatore=page.getByRole('listbox', { name: 'Suggestions' });
        this.floatingWrapperTxtStyleOptionText=page.getByRole('listbox').locator('span').filter({ hasText: 'Text' });
        this.floatingWrapperTxtStyleOptionH1=page.getByRole('listbox').locator('span').filter({ hasText: 'Heading 1' });
        this.floatingWrapperTxtStyleOptionH2=page.getByRole('listbox').locator('span').filter({ hasText: 'Heading 2' });
        this.floatingWrapperTxtStyleOptionH3=page.getByRole('listbox').locator('span').filter({ hasText: 'Heading 3' });
        this.floatingWrapperTxtStyleOptionH4=page.getByRole('listbox').locator('span').filter({ hasText: 'Heading 4' });
        this.floatingWrapperTxtStyleOptionH5=page.getByRole('listbox').locator('span').filter({ hasText: 'Heading 5' });
        this.floatingWrapperTxtStyleOptionBulletList=page.getByRole('listbox').locator('span').filter({ hasText: 'Bulleted List' });
        this.floatingWrapperTxtStyleOptionNumberList=page.getByRole('listbox').locator('span').filter({ hasText: 'Numbered List' });
        this.floatingWrapperTxtStyleOptionBlockquote=page.getByRole('listbox').locator('span').filter({ hasText: 'Blockquote' });
        this.floatingWrapperTxtStyleOptionCallout=page.getByRole('listbox').locator('span').filter({ hasText: 'Callout' });

        // Variables
        this.firstPageName='First page'
        this.newPageName='Autotests new page';
        this.docPageHeaderName='Docs page header tests';
        this.updatedPageName='Autotests updated page';
        this.docBlocksPageName='Documentation blocks testing';

        this.testDummyTxt='What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }

    async docsLoaded(){
        await elementVerification.verifyElementIsVisible(this)
    }

    async createNewPage(name){
        await elementActions.clickElement(this.addTabBtn);

        await elementActions.clickElement(this.addNewPageBtn);

        await elementVerification.verifyElementIsVisible(this.addingNewPageModalHeading);

        await elementActions.writeToInput(this.addingNewPageModalInput, name);

        await elementActions.clickElement(this.addingNewPageConfirmBtn);
    }

    async deletePage(name){
        await elementActions.elementHover(this.treeItemRole.getByRole('link', { name: name }).first());

        await this.clickTreeItemMenuOptionsBtn(name);

        await elementActions.clickElement(this.treeItemOptionsMenuDeleteBtn);

        await elementVerification.verifyElementIsVisible(this.treeItemOptionsMenuDeleteModalHeading);

        await elementActions.clickElement(this.treeItemOptionsMenuDeleteModalBtn);

        await elementVerification.verifyElementAppearsAndDisappears(this.deletePageToast);
    }

    async clickTreeItem(treeItemName){
        await elementActions.clickElement(this.page.getByRole('link', { name: treeItemName }).first());

        await elementVerification.verifyTextShouldBe(this.pageHeaderNameInput, treeItemName);
    }

    async clickTreeItemMenuOptionsBtn(treeItemName){
        await elementActions.clickElement(this.page.getByRole('link', { name: treeItemName }).getByRole('button').first());
    }

    async verifyFloatingWrapperSearch(item){
        await elementActions.writeToInput(this.floatingWrapperTxtStyleOptionSearchInput, item);

        await elementVerification.verifyIfCountIs(await this.floatingWrapperLocator.count(), 1);
        
        await elementVerification.verifyElementIsVisible(this.page.getByRole('listbox').locator('span').filter({ hasText: item }));
    }
}