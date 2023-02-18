const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'kwymjz',

  e2e: {

    baseUrl: 'https://barrigarest.wcaquino.me',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }



});
