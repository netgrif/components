// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// Used by the @angular/build:karma builder (angular.json). The builder sets basePath to its temporary build output
// and adds the compiled spec files itself, so every output path below has to be absolute.

const path = require('path');
const process = require('process');
if (!process.env.CI && !process.env.CHROME_BIN) {
    process.env.CHROME_BIN = require('puppeteer').executablePath();
}
require('events').EventEmitter.defaultMaxListeners = 20;

const outputDir = path.join(__dirname, '../../coverage/netgrif-example');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-firefox-launcher'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-mocha-reporter'),
            require('karma-nyan-reporter'),
            require('karma-junit-reporter'),
        ],

        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },

        coverageIstanbulReporter: {
            dir: outputDir,
            reports: ['html', 'text-summary', 'json-summary', 'lcov'],
        },
        nyanReporter: {
            suppressErrorReport: false, // default is false
            suppressErrorHighlighting: false, // default is false
            numberOfRainbowLines: 4, // default is 4
            renderOnRunCompleteOnly: true, // default is false
        },
        junitReporter: {
            outputDir, // results will be saved as $outputDir/$browserName.xml
            outputFile: 'JUNITX-test-report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {}, // key value pair of properties to add to the <properties> section of the report
            xmlVersion: null, // use '1' if reporting to be per SonarQube 6.2 XML format
        },

        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--disable-translate',
                    '--disable-extensions',
                    '--disable-dev-shm-usage'
                ]
            }
        },

        reporters: ['progress', 'kjhtml', 'coverage-istanbul', 'nyan', 'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        // run once headless by default (angular.json "watch": false), use `ng test netgrif-example --watch --browsers=Chrome` to debug
        browsers: ['ChromeHeadlessCI'],
        restartOnFileChange: true,
    });
};
