module.exports = {
  launch: {
    headless: true,
    product: 'chrome',
  },
  server: {
    command: 'npm start',
    launchTimeout: 10000,
    port: 8081,
    debug: true,
  },
  browserContext: 'default',
};
