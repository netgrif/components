// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

process = require('process');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "@angular-devkit/build-angular"],
        plugins: [
            require("karma-jasmine"),
            require("karma-firefox-launcher"),
            require("karma-chrome-launcher"),
            require("karma-jasmine-html-reporter"),
            require("karma-coverage-istanbul-reporter"),
            require("karma-mocha-reporter"),
            require("karma-nyan-reporter"),
            require("karma-junit-reporter"),
            require("karma-sonarqube-unit-reporter"),
            require("@angular-devkit/build-angular/plugins/karma"),
        ],

        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                timeoutInterval: 30000
            }
        },

        coverageIstanbulReporter: {
            dir: require("path").join(__dirname, "../../coverage/netgrif-components"),
            reports: ["html", "text-summary", "json-summary", "lcov"],
            fixWebpackSourcePaths: true
        },
        nyanReporter: {
            suppressErrorReport: false, // default is false
            suppressErrorHighlighting: false, // default is false
            numberOfRainbowLines: 4, // default is 4
            renderOnRunCompleteOnly: true, // default is false
        },
        junitReporter: {
            outputDir: "../../coverage/netgrif-components/", // results will be saved as $outputDir/$browserName.xml
            outputFile: "JUNITX-test-report.xml", // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: "", // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {}, // key value pair of properties to add to the <properties> section of the report
            xmlVersion: null, // use '1' if reporting to be per SonarQube 6.2 XML format
        },
        sonarQubeUnitReporter: {
            sonarQubeVersion: 'LATEST',
            outputFile: '../../coverage/netgrif-components/sonarqube-unit-report.xml',
            useBrowserName: false,
            overrideTestDescription: true,
            testPaths: ['projects/netgrif-components/src/lib']
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

        reporters: ["progress", "kjhtml", "coverage-istanbul", "nyan", "junit", "sonarqubeUnit"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadlessCI'],
        // browsers: ['Chrome'],
        singleRun: true,
        restartOnFileChange: true,
    });
};
