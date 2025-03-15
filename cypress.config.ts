import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    }
  },
})