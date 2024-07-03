const config = {
  
  globalSetup: './utils/globalSetup.js',
  testDir: './src/e2e',
  snapshotDir: './src/screenshots',

  /* Maximum time one test can run for. timeout: 90 * 1000,*/
  timeout: 90 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30000,
  },
  /* tests in parallel */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'output_run' }]],
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
};

module.exports = config;