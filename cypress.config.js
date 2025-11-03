const { defineConfig } = require("cypress");

module.exports = defineConfig({
    video: true,
    e2e: {
        baseUrl: "https://the-internet.herokuapp.com",
        setupNodeEvents(on, config) {},
        retries: { runMode: 1, openMode: 0}
    },
    screenshotsFolder: "cypress/artifacts/screenshots",
    videosFolder: "cypress/artifacts/videos",
});