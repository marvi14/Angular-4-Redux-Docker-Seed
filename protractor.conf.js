// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 1800000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  getPageTimeout: 120000,
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': [
        '--no-sandbox',
        '--disable-gpu'
      ]
    }
  },
  useAllAngular2AppRoots: true,
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 120000,
    print: function () { }
  },
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
