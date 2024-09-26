const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
    },
    baseUrl: "http://lojaebac.ebaconline.art.br/rest-api/schema",
    env: {
      auth_token: "Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy"
    },
    
  },
});
