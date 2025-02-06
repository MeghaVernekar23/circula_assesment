module.exports = {
    use: {
      headless: false, // Run tests in a visible browser
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      video: 'on-first-retry',
    }
  };