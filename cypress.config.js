const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/Website.html',
    specPattern: 'cypress/e2e/**/*.cy.js', // Adjust this pattern to match your test file names
    supportFile: false,
    defaultCommandTimeout: 10000,
    execTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 60000,
    responseTimeout: 60000
  }
});
