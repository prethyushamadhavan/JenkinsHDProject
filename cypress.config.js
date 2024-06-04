const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.js', // Ensure this pattern matches your test files
    baseUrl: 'http://localhost:8081/Website.html', // Optional but useful for relative paths in tests
    supportFile: false, // Disable support file if not needed
    defaultCommandTimeout: 10000, // Set default command timeout to 10 seconds
    execTimeout: 60000, // Set execution timeout to 60 seconds
    pageLoadTimeout: 60000, // Set page load timeout to 60 seconds
    requestTimeout: 60000, // Set request timeout to 60 seconds
    responseTimeout: 60000, // Set response timeout to 60 seconds
  },
});
