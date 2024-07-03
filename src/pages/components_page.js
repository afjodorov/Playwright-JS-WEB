const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.ComponentsPage = class ComponentsPage {
    constructor(page){
        this.page=page;
        this.pageHeader=page.getByRole('heading', {name: 'Components'});

        this.tableSearchBarLocator=page.getByPlaceholder('Search in components...');
        this.noMatchingComponentsFoundHeading=page.getByText('No matching components found');

        this.newComponentBtn=page.locator('div').filter({ hasText: /^New component$/ }).getByRole('button');
        this.closeNewComponentBtn=page.getByLabel('New component').getByRole('button').nth(3);
        this.noComponentsYetLbl=page.getByText('No components yet');
        this.learnMoreLink=page.locator('a:has-text("Learn more about components")');
        this.documentationUrl='https://learn.supernova.io/latest/design-systems/components/working-with-components-uFbB6LfI';
        this.documentationPageTitle='Working with components | Made with Supernova';

        this.componentTableLocator=page.locator('tbody');
        this.tableItemOptionsBtnLocator=page.getByRole('table').locator('tr').locator('td').getByRole('button');
        this.tableItemDeleteBtnLocator=page.getByRole('group').getByRole('menuitem', {name: 'Delete component'});
        this.componentDeleteConfirmationBtn=page.getByRole('button', { name: 'Delete component' })
        // New component modal
        this.componentModalLocator=page.getByRole('dialog'); 
        this.selectFigmaComponentBtn=page.getByRole('button', {name: '+ Select Figma component'});
        this.componentAddingSearchBarLocator=page.getByPlaceholder('Search in Figma component…'); 
        this.newComponentName=page.getByPlaceholder('Add component name…');
        this.figmaComponentLbl=page.getByLabel('New component').getByText('Figma component', { exact: true })
        // this.figmaComponentCombobox=page.getByRole('combobox').first();
        this.figmaComponentCombobox=page.getByRole('button', {name: 'Select Figma component', exact: true});
        this.createNewComponentBtn=page.getByRole('button', { name: 'Create component' });

        // Variables for component names
        this.pageFigmaComponent=page.getByRole('option', { name: 'Page', exact: true }).locator('div').first();
        this.newPageFigmaComponent=page.getByRole('option', { name: 'New Page', exact: true }).locator('div').first();
        this.burgerFigmaComponent=page.getByRole('option', { name: 'Burger', exact: true }).locator('div').first();
        this.deleteFigmaComponent=page.getByRole('option', { name: 'Delete', exact: true }).locator('div').first();
        this.pickerFigmaComponent=page.getByRole('option', { name: 'Picker', exact: true }).locator('div').first();

        this.testComponentName1 = 'New component to search';
        this.testComponentName2 = 'Another component to search';
        this.testComponentNameSoft = 'component to search';
        this.testComponentNameNonExist = 'There is no';
    }

    async verifyIfPageHasComponents(){
        const isHaving = await this.componentTableLocator.isVisible();
        return isHaving;
    }

    async verifyFigmaComponentLblLoaded(){
        // Small sleep because lbl is loaded faster than empty 'Figma Component' placeholder 
        await this.page.waitForTimeout(2000)
        await expect(this.figmaComponentLbl).toBeVisible();
    }

    async verifyNewComponentIsAdded(componentName){
        await expect(this.componentTableLocator).toContainText(componentName)
    }

    async getTableComponentNames(){
        await elementVerification.verifyElementIsVisible(this.componentTableLocator);
        
        const rowCount = await this.componentTableLocator.locator('tr').count();
        const componentNames = [];

        expect(rowCount).not.toBe(0);
        for(var i = 0; i < rowCount; i++){
            const currentRow = await this.componentTableLocator.locator('tr').nth(i)
            // for some reason innerText() fails. Using allInnerTexts() which returns array
            const componentNameList = await currentRow.locator('td').nth(0).allInnerTexts(); 
            const componentName = componentNameList[0];
            componentNames.push(componentName);
        }
        return componentNames;
    }

     // bool isStrict for strict/non-strict comparison of search match
    async compareTableName(name, isStrict){
        var tableNames = await this.getTableComponentNames();    
        for(var i = 0; i < tableNames.length; i++){
            if(isStrict){
                await expect(tableNames[i]).toStrictEqual(name)
            }
            else{
                await expect(tableNames[i]).toContain(name);
            }
        }
    }

    async addNewComponent(componentName, component){
        await elementActions.clickElement(this.newComponentBtn);
        await elementActions.writeToInput(this.newComponentName, componentName);
        await this.verifyFigmaComponentLblLoaded();
        await elementActions.clickElement(this.figmaComponentCombobox);
        await elementActions.clickElement(component);
        await elementActions.clickElement(this.createNewComponentBtn);
        await elementVerification.verifyElementIsHidden(this.componentModalLocator)
    }

    async deleteAllAddedComponents(){
        await elementVerification.verifyElementIsVisible(this.componentTableLocator);

        const rowCount = await this.componentTableLocator.locator('tr').count();
        
        expect(rowCount).not.toBe(0);
        for(var i = 0; i < rowCount; i++){   
            await this.componentTableLocator.locator('tr').first().locator('td').first().hover();
            await elementActions.clickElement(this.tableItemOptionsBtnLocator);
            await elementActions.clickElement(this.tableItemDeleteBtnLocator);
            await elementActions.clickElement(this.componentDeleteConfirmationBtn);
        }
    }
}