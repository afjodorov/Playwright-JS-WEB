# Playwright-JS-WEB
End to End testing suite template using:

 + Playwright
 + Javascript

## Pages

For the suite template I chose to follow the PageObjects pattern in order to encapsulate each pages internal structure and responsibilities inside its own highly cohesive class file.

That means that for each page we would define a new Page object for our needs. We should not confuse the Page objects we create with actual pages in the application. We can think of Pages as a lightweight concept of a **view**, which is the set of cohesive elements living under a known browser location

## Keyword-driven tests

For the test description methodology I have used keyword-driven approach, where relevant stakeholders can easily understand what each test step does from understanding which interaction 
and which element is utilized. 

```
test('Login with correct credentials', async ({loginPage}) => {
    await loginPage.goto();

    await loginPage.enterCredentials(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);

    await elementActions.clickElement(loginPage.loginBtnLocator);

    await loginPage.verifySuccessLogging();
})
```

Definition of single test step is described as fixtures of either **elementActions** or **elementVerification** 
that keep all relevant functions performed over single element. 

```
await elementActions.clickElement({element_locator})
# OR
await elementVerification.verifyElementIsVisible({element_locator})
```

For repeated test steps more complex functions are described in the page file.

```
test.beforeEach('Authenticate', async ({loginPage, sidebar}) => {
    await loginPage.fullLogin(process.env.CORRECT1_ACC_USERNAME, process.env.CORRECT1_ACC_PSW);
});
```
