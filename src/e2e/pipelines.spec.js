const {test, expect} = require('../fixtures/base');
const elementVerification = require('../fixtures/elementVerification');
const elementActions = require('../fixtures/elementActions');

test.beforeEach('Authenticate and navigate to code automation page', async ({loginPage, sidebar, codeAutomationPage}) => {
    await loginPage.fullLogin(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);
    
    await elementActions.clickElement(sidebar.codeAutomationBtn);

    await elementVerification.verifyElementIsVisible(codeAutomationPage.pipelinesHeaderTxt);
});

test('Verify there is no pipelines yet view', async({codeAutomationPage}) => {
    await codeAutomationPage.deleteAllPipelines();

    await elementVerification.verifyElementIsVisible(codeAutomationPage.noPipelinesYetTxt);
    await elementVerification.verifyElementIsVisible(codeAutomationPage.newPipelineBtn);
});

test('Create new long named pipeline', async({codeAutomationPage}) => {
    await elementActions.clickElement(codeAutomationPage.newPipelineBtn);

    await codeAutomationPage.createNewPipelineFull(codeAutomationPage.pipelineLongNameTxt, true, false, codeAutomationPage.androidAssetsExporter, codeAutomationPage.sourceUpdatedComboOption2, null);
    
    await elementVerification.verifyScreenshot(codeAutomationPage.page, codeAutomationPage.pipelinesTableFirstCell, 'pipeline_table_long_truncated.png');
})

test('Create pipeline from exporter', async({codeAutomationPage}) => {
    // Navigate to creation of pipeline from exporter
    await elementActions.clickElement(codeAutomationPage.designTokensExporterBtn);
    await elementVerification.verifyElementIsVisible(codeAutomationPage.exportersHeaderTxt);
    await elementActions.clickElement(codeAutomationPage.CSSExporterCreateBtn);

    await codeAutomationPage.createNewPipelineFull(codeAutomationPage.pipelineFromExporterNameTxt, false, true, null, codeAutomationPage.sourceUpdatedComboOption2, null);
})

test('Create a new Azure pipeline', async({codeAutomationPage}) => {
    await elementActions.clickElement(codeAutomationPage.newPipelineBtn);

    await codeAutomationPage.createNewPipelineFull(codeAutomationPage.pipelineAzureNameTxt, false, false, codeAutomationPage.androidAssetsExporter, codeAutomationPage.sourceUpdatedComboOption1, codeAutomationPage.azureComboDeliveryOption);
})

test('Create a new Bitbucket pipeline', async({codeAutomationPage}) => {
    await elementActions.clickElement(codeAutomationPage.newPipelineBtn);

    await codeAutomationPage.createNewPipelineFull(codeAutomationPage.pipelineBitbucketeNameTxt, false, false, codeAutomationPage.androidAssetsExporter, codeAutomationPage.sourceUpdatedComboOption1, codeAutomationPage.bitbucketComboDeliveryOption);
})

test('Create a new Github pipeline', async({codeAutomationPage}) => {
    await elementActions.clickElement(codeAutomationPage.newPipelineBtn);

    await codeAutomationPage.createNewPipelineFull(codeAutomationPage.pipelineGithubNameTxt, false, false, codeAutomationPage.androidAssetsExporter, codeAutomationPage.sourceUpdatedComboOption1, codeAutomationPage.githubComboDeliveryOption);
})

test('Create a new Gitlab pipeline', async({codeAutomationPage}) => {
    await elementActions.clickElement(codeAutomationPage.newPipelineBtn);

    await codeAutomationPage.createNewPipelineFull(codeAutomationPage.pipelineGitlabNameTxt, false, false, codeAutomationPage.androidAssetsExporter, null, codeAutomationPage.gitlabComboDeliveryOption);
})

test('Pause & unpause pipeline', async({codeAutomationPage}) => {
    await codeAutomationPage.pauseFirstPipeline();

    await codeAutomationPage.unpauseFirstPipeline();
})

test('Delete all pipelines', async({codeAutomationPage})=>{
    await codeAutomationPage.deleteAllPipelines();
})