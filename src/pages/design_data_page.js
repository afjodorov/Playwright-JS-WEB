const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.DesignDataPage = class DesignDataPage {

    constructor(page){
        this.page=page;
        this.pageHeader=page.getByText('Design data').nth(1);
        // Figma
        this.connectFigmaFileBtn=page.getByRole('button', { name: 'Connect new file' });

        this.importFigmaFileHeader=page.getByRole('heading', { name: 'Import from Figma' });
        this.importFigmaFileUrlInput=page.getByPlaceholder('https://figma.com/file/');
        this.importFigmaFileTokenImportsToggle=page.getByLabel('Off');

        this.importFigmaFileBtn=page.getByRole('button', { name: 'Import' });
        this.cancelImportFigmaFileBtn=page.getByRole('button', { name: 'Cancel' });

        this.importSuccessfulToast=page.getByText('Import completed.');
        this.importStatus=page.getByText('Import succesfull');

        // Figma - table
        this.importedFigmaTableFirstCell=page.locator('tbody').locator('tr').first().locator('td').first();

        this.importedViewSummaryBtn=page.locator('tbody').getByRole('button', { name: 'View summary' });
        
        this.importedViewSummaryGeneralTxt=page.getByText('General 280 frames, 26');
        this.importedViewSummaryTokensTxt=page.getByText('design tokens168 created');
        this.importedViewSummaryCloseBtn=page.getByLabel('Import summary').getByRole('button').nth(1);

        this.importedFigmaThreeDotMenuBtn=page.locator('tbody').getByRole('button').nth(2);
        this.importedFigmaDeleteOption=page.getByRole('menuitem', { name: 'Remove Figma file' });

        this.importedFigmaDeleteModalHeading=page.getByRole('heading', { name: 'Remove Figma file' });
        this.importedFigmaDeleteModalConfirmationBtn=page.getByRole('button', { name: 'Remove file' });
        this.deletedFigmaSuccessToast=page.getByText('Source removed — tokens are');

        // Figma variables

        // Tokens studio
    }

    async importFigmaFile(url){
        await elementVerification.verifyElementIsVisible(this.pageHeader)

        await elementActions.clickElement(this.connectFigmaFileBtn);

        await elementVerification.verifyElementIsVisible(this.importFigmaFileHeader);

        await elementActions.writeToInput(this.importFigmaFileUrlInput, url);

        await elementActions.clickElement(this.importFigmaFileTokenImportsToggle);

        await elementActions.clickElement(this.importFigmaFileBtn);

        await elementVerification.verifyUploadingElement(this.importSuccessfulToast, 150000);

        await elementVerification.verifyElementAppearsAndDisappears(this.importSuccessfulToast);
    }

    async deleteAllFigmaFiles(){
        if(await elementVerification.verifyIfElementIsVisible(this.importedFigmaTableFirstCell)){    
            const rowCount = await this.page.locator('tr').count();

            expect(rowCount).not.toBe(0);
            for(var i = 1; i < rowCount; i++){   
                await this.page.locator('tr').nth(1).hover();
                await elementActions.clickElement(this.importedFigmaThreeDotMenuBtn);
                await elementActions.clickElement(this.importedFigmaDeleteOption);
                await elementActions.clickElement(this.importedFigmaDeleteModalConfirmationBtn);
    
                await elementVerification.verifyElementIsVisible(this.deletedFigmaSuccessToast);
            }
        }
    }
}