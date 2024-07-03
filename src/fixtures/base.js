const base = require('@playwright/test');
const { LoginPage } = require('../pages/login_page');
const { SignUpPage } = require('../pages/sign_up_page');
const { Sidebar } = require('../pages/sidebar_page');
const { ComponentsPage } = require('../pages/components_page');
const { DesignDataPage } = require('../pages/design_data_page');
const { CodeAutomationPage } = require('../pages/code_automation_page');
const { SettingsPage } = require('../pages/settings_page');
const { SelectPlanPage } = require('../pages/select_plan_page');
const { BillingPage } = require('../pages/billing_page');
const { DocumentationPage } = require('../pages/documentation_main_page');
const { DocumentationSettingsPage } = require('../pages/documentation_settings_page');

exports.test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    sidebar: async ({ page }, use) => {
        await use(new Sidebar(page));
    },
    componentsPage: async ({ page }, use) => {
        await use(new ComponentsPage(page));
    },
    signupPage: async ({ page }, use) => {
        await use (new SignUpPage(page));
    },
    designDataPage: async ({page}, use) =>{
        await use(new DesignDataPage(page))
    },
    codeAutomationPage: async ({page}, use) =>{
        await use (new CodeAutomationPage(page));
    },
    settingsPage: async ({page}, use) =>{
        await use (new SettingsPage(page));
    },
    selectPlanPage: async ({page}, use) =>{
        await use (new SelectPlanPage(page));
    },
    billingPage: async ({page}, use) =>{
        await use (new BillingPage(page));
    },
    docsMainPage: async ({page}, use) =>{
        await use (new DocumentationPage(page));
    },
    docsSettingsPage: async ({page}, use) =>{
        await use (new DocumentationSettingsPage(page));
    }
});
exports.expect = base.expect;