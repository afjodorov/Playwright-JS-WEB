const { expect} = require('@playwright/test');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

exports.CodeAutomationPage = class CodeAutomationPage{
    constructor(page){
        this.page = page;

        // Pipelines
        this.pipelinesHeaderTxt=page.getByRole('heading', {name: 'Pipelines', exact: true});
        this.noPipelinesYetTxt=page.getByText('No pipelines yet');

        // Pipeline home
        // TODO :: Better locator
        // this.newPipelineBtn=page.getByRole('button', {name: 'New pipeline'});
        this.newPipelineBtn=page.locator('div').filter({ hasText: /^New pipeline$/ }).getByRole('button')

        // Pipeline table
        this.pipelinesTable=page.locator('tbody');
        this.buildSuccessfulLbl=page.getByText('Build successful').first();
        this.pipelinesTableFirstCell=page.locator('tbody').locator('tr').first().locator('td').first().locator('div').first();
        this.pipelinesOptionsMenu=page.locator('tr').nth(1).getByRole('button').nth(1);
        
        // Pipeline options menu
        this.pausePipelineOption=page.getByRole('menuitem', {name: 'Pause routine'});
        this.unpausePipelineOption=page.getByRole('menuitem', {name: 'Resume routine'});
        this.deletePipelineOption=page.getByRole('menuitem', {name: 'Delete pipeline'});
        this.deletePipelineBtn=page.getByRole('button', {name: 'Delete pipeline'});

        // New pipeline - Exporter
        this.selectExporterLbl=page.locator('.text-title-3:has-text("Select exporter")');
        this.exporterBoxName=page.getByRole('link', { name: 'Exporter' });
        this.pipelineNameInput=page.getByLabel('Pipeline name');
        this.defaultSelectExportersCombo=page.getByRole('button', { name: 'Select exporter...' });
        this.CSSSelectExportersCombo=page.getByRole('button', { name: 'CSS' });
        this.exportersComboSearch=page.getByPlaceholder('Search in exporters...');

        //Exporters combo options
        this.androidAssetsExporter=page.getByRole('option', {name: 'Android Assets'});

        // New pipeline - Event 
        this.selectEventLbl=page.locator('.text-title-3:has-text("Select event")');
        this.sourceUpdatedComboOption1=page.getByRole('option', {name: 'Source updated'});
        this.sourceUpdatedComboOption2=page.getByRole('option', {name: 'No event (manual)'});
        
        // New pipeline - Delivery
        this.selectDeliveryMethodLbl=page.locator('.text-title-3:has-text("Select a delivery method")');
        this.buildOnlyComboOption=page.getByRole('option', {name: 'Build only'});
        this.azureComboDeliveryOption=page.getByRole('option', {name: 'Azure pull request'});
        this.bitbucketComboDeliveryOption=page.getByRole('option', {name: 'Bitbucket pull request'});
        this.githubComboDeliveryOption=page.getByRole('option', {name: 'GitHub pull request'});
        this.gitlabComboDeliveryOption=page.getByRole('option', {name: 'GitLab merge request'});

        this.optionsSelectCombo=page.getByRole('button', { name: 'Select' }).first();
        this.azureList=[
            // page.getByRole('menuitem', { name: process.env.AZURE_CONNECTION }),
            page.getByRole('menuitem', { name: process.env.AZURE_GROUP }).first(),
            page.getByRole('option', { name: process.env.AZURE_PROJECT, exact: true }),
            page.getByRole('option', { name: process.env.AZURE_REPOSITORY }),
            page.getByRole('option', { name: process.env.AZURE_BRANCH }).locator('span')    
        ]
        this.bitbucketList=[
            // page.getByRole('menuitem', { name: process.env.BITBUCKET_CONNECTION }),
            page.getByRole('menuitem', { name: process.env.BITBUCKET_WORKSPACE }),
            page.getByRole('option', { name: process.env.BITBUCKET_PROJECT }),
            page.getByRole('option', { name: process.env.BITBUCKET_REPOSITORY }),
            page.getByRole('option', { name: process.env.BITBUCKET_BRANCH }).locator('span')    
        ]
        this.githubList=[
            // page.getByRole('menuitem', { name: process.env.GITHUB_CONNECTION }),
            page.getByRole('menuitem', { name: process.env.GITHUB_ORGANIZATION }),
            page.getByRole('option', { name: process.env.GITHUB_REPOSITORY }),
            page.getByRole('option', { name: process.env.GITHUB_BRANCH })    
        ]
        this.gitLabList=[
            // page.getByRole('menuitem', { name: process.env.GITLAB_CONNECTION }),
            page.getByRole('menuitem', { name: process.env.GITLAB_GROUP, exact: true }),
            page.getByRole('option', { name: process.env.GITLAB_REPOSITORY }),
            page.getByRole('option', { name: process.env.GITLAB_BRANCH }).locator('span')
        ]
        
        // page.getByRole('listbox', { name: 'Suggestions' }).locator('span')
        this.createAndRunBtn=page.getByRole('button', {name: 'Create and run'});

        // Exporters
        this.exportersHeaderTxt=page.getByRole('heading', {name: 'Exporters', exact: true})
        this.designTokensExporterBtn=page.getByRole('button', { name: 'Design tokens' });

        // Design tokens exporter
        this.CSSExporterCreateBtn=page.getByRole('heading').filter({hasText: 'CSS', exact: true}).locator("..").locator("..").locator("..").locator("..").getByRole('button', {name: 'Create pipeline'}).first();

        this.combobox=page.getByRole('combobox')
        this.nextBtn=page.getByRole('button', {name: 'Next'});
        this.cancelBtn=page.getByRole('button', {name: 'Cancel'});

        // Toasts
        this.pipelineCreatedToast=page.getByText('Pipeline created.')
        this.deleteConfirmationToast=page.getByText('Pipeline deleted.');

        this.pipelineStartedToast=page.getByText('Pipeline run started.')
        this.pipelineRunCompleteToast=page.getByText('Pipeline run complete.')

        this.pipelinePausedToast=page.getByText('Pipeline routine paused.');
        this.pipelineUnpausedToast=page.getByText('Pipeline routine resumed.');

        // Variables
        this.pipelineLongNameTxt='HelloThisIsVerySuperLongExporterDescriptionThatOverflows';
        this.pipelineFromExporterNameTxt='I am made from exporter';
        this.pipelineAzureNameTxt='Azure pipeline';
        this.pipelineBitbucketeNameTxt='Bitbucket pipeline';
        this.pipelineGithubNameTxt='Github pipeline';
        this.pipelineGitlabNameTxt='Gitlab pipeline';
    }

    async createNewPipelineFull(pipelineName, isScreenshot, isPipelineFromExporter, exporter, event, delivery){
        await elementVerification.verifyElementIsVisible(this.selectExporterLbl);

        await elementActions.writeToInput(this.pipelineNameInput, pipelineName);

        if(isScreenshot){
            await elementVerification.verifyScreenshot(this.page, this.exporterBoxName, 'exporter_name_truncated.png');
        }
        
        // Check if pipeline is created from scratch or through selected exporter with pipelineFromExporter bool
        if(isPipelineFromExporter){
            await elementVerification.verifyElementIsVisible(this.CSSSelectExportersCombo);
        }
        else{
            await elementActions.clickElement(this.defaultSelectExportersCombo);

            await elementActions.clickElement(exporter);
        } 

        await elementActions.clickElement(this.nextBtn);

        await elementVerification.verifyElementIsVisible(this.selectEventLbl);

        if(event != null){
            await elementActions.clickElement(this.combobox);

            await elementActions.clickElement(event);
        }

        await elementActions.clickElement(this.nextBtn);

        await elementVerification.verifyElementIsVisible(this.selectDeliveryMethodLbl);

        if(delivery != null){
            await elementActions.clickElement(this.combobox);

            await elementActions.clickElement(delivery);  
            
            await this.fillPullRequestDeliveryMethod(await this.combobox.textContent());
        }

        await elementActions.clickElement(this.createAndRunBtn); 

        await elementVerification.verifyElementIsVisible(this.pipelineStartedToast);

        await elementVerification.verifyElementIsVisible(this.buildSuccessfulLbl);

        await elementVerification.verifyElementIsVisible(this.pipelineRunCompleteToast);
    }

    async fillPullRequestDeliveryMethod(option){
        var deliveryFillList = [];

        if(option == 'Azure pull request'){
            deliveryFillList = this.azureList.slice();
        }
        else if(option == 'Bitbucket pull request'){
            deliveryFillList = this.bitbucketList.slice();
        }
        else if(option == 'GitHub pull request'){
            deliveryFillList = this.githubList.slice();
        }
        else if(option == 'GitLab merge request'){
            deliveryFillList = this.gitLabList.slice();
        }

        for(var i = 0; i < deliveryFillList.length; i++){
            await elementActions.clickElement(this.optionsSelectCombo);
            await elementActions.clickElement(deliveryFillList[i]);
        }
    }

    // Pipeline options
    async pauseFirstPipeline(){
        await elementActions.clickElement(this.pipelinesOptionsMenu);
        await elementActions.clickElement(this.pausePipelineOption);

        await elementVerification.verifyElementAppearsAndDisappears(this.pipelinePausedToast);
    }

    async unpauseFirstPipeline(){
        await elementActions.clickElement(this.pipelinesOptionsMenu);
        await elementActions.clickElement(this.unpausePipelineOption);

        await elementVerification.verifyElementAppearsAndDisappears(this.pipelineUnpausedToast);
    }

    async deleteAllPipelines(){
        /* 
            Since table loads longer, check for condition whether it is visible or not (boolean) fails. 
            Thus leaving sleep, which could be flaky
        */
        await this.page.waitForTimeout(2000);
        if(await elementVerification.verifyIfElementIsVisible(this.pipelinesTable)){    
            const rowCount = await this.page.locator('tr').count();

            expect(rowCount).not.toBe(0);
            for(var i = 1; i < rowCount; i++){   
                await this.page.locator('tr').nth(1).hover();
                await elementActions.clickElement(this.pipelinesOptionsMenu);
                await elementActions.clickElement(this.deletePipelineOption);
                await elementActions.clickElement(this.deletePipelineBtn);
                await elementVerification.verifyElementAppearsAndDisappears(this.deleteConfirmationToast);
            }
        }
    }
}