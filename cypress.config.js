const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'kwymjz',

  secrets: {
    CYPRESS_RECORD_KEY:'105a9675-a503-406b-93c8-0c8ab7fa39c6'
  },

  e2e: {

    baseUrl: 'https://barrigarest.wcaquino.me',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }



});
