module.exports = {
  default: {
      paths: ["features/*.feature"],
      import: ["./step-definitions/*.js"], 
      format: [
          "@cucumber/pretty-formatter", 
          "json:reports/cucumber_report.json",
          "html:reports/cucumber_report.html"  
      ]
  }
};
