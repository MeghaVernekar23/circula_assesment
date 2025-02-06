import { createRequire } from "module";
const require = createRequire(import.meta.url);
const reporter = require('cucumber-html-reporter');
import fs from 'fs';

// Ensure `reports/` directory exists
if (!fs.existsSync('reports')) {
    fs.mkdirSync('reports', { recursive: true });
}

const options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',  
    output: 'reports/cucumber_report.html',   
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,  
    metadata: {
        "Test Environment": "QA",
        "Browser": process.env.BROWSER || "chromium",
        "Headless Mode": process.env.HEADLESS === 'true' ? "Yes" : "No",
        "Platform": process.platform,
        "Executed": "Automated"
    }
};


reporter.generate(options);