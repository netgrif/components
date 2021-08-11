// Original command
// sonar-scanner -Dsonar.projectKey=Modeler -Dsonar.sources=. -Dsonar.host.url=https://sonar.netgrif.com -Dsonar.login=e81d57cb61a670e6bfb54db6401a1d8639ccda71 -Dsonar.projectName="Builder - frontend"

const sonarqubeScanner = require('sonarqube-scanner');
const childProcess = require('child_process');
const fs = require('fs');

/* EDIT ONLY HERE */

const projectName = 'Application Engine - Frontend';
const projectKey = 'netgrif_nae-frontend';
const organization = 'netgrif';
const lcovPaths = ['coverage/netgrif-application-engine/lcov.info', 'coverage/netgrif-components/lcov.info'];
const sources = ['projects/netgrif-application-engine/src', 'projects/netgrif-application-engine/schematics', 'projects/netgrif-components/src', 'projects/netgrif-components/schematics'];
const exclusions = ['projects/netgrif-application-engine/src/**/*.spec.ts', 'projects/netgrif-application-engine/src/scripts', 'projects/netgrif-application-engine/src/assets',
    'projects/netgrif-components/src/**/*.spec.ts', 'projects/netgrif-components/src/scripts', 'projects/netgrif-components/src/assets'];

/* END OF EDIT ZONE */


/* DO NOT EDIT UNDER THIS LINE */

/* --------------------------- */
function fixLcovFileNames(lcovPath, sourcesPath) {
    try {
        let content = fs.readFileSync(lcovPath).toString().trim();
        if (!content || content.length === 0)
            return;
        console.log('Found valid lcov report file');

        const indexOfSF = content.indexOf('SF:');
        if (indexOfSF === -1)
            return;
        console.log('Found SF segment');

        console.log('Sanitizing path to Linux convention');
        content = content.replace(/\\/g, '/');

        if (content.substring(indexOfSF + 3, indexOfSF + (sourcesPath.length + 3)) !== sourcesPath) {
            console.log(`File path 'SF' does not start with '${sourcesPath}'`);
            const indexOfProject = content.indexOf(sourcesPath, indexOfSF);
            if (indexOfProject !== -1) {
                const unwanted = content.substring(indexOfSF + 3, indexOfProject);
                console.log(`Removing string ${unwanted}`);
                content = content.replace(new RegExp(unwanted, 'g'), '');
            }
        }

        console.log('Writing file');
        fs.writeFileSync(lcovPath, content);
    } catch (e) {
        console.log('Failed to open lcov file');
    }
}

fixLcovFileNames(lcovPaths[0],sources[0]);
fixLcovFileNames(lcovPaths[1],sources[2]);

const scannerOptions = {
    'sonar.projectKey': projectKey,
    'sonar.projectName': projectName,
    'sonar.projectDescription': process.env.npm_package_description,
    'sonar.organization': organization,
    'sonar.projectVersion': process.env.npm_package_version,
    'sonar.sources': sources.join(','),
    'sonar.exclusions': exclusions.join(','),
    'sonar.javascript.lcov.reportPaths': lcovPaths.join(',')
    //'sonar.typescript.tslint.reportPaths': ''
};
if (process.env.BRANCH_NAME && !process.env.CHANGE_ID) {
    // it is branch build
    scannerOptions['sonar.branch.name'] = process.env.BRANCH_NAME;
    if (process.env.BRANCH_NAME !== 'master')
        scannerOptions['sonar.branch.target'] = process.env.BRANCH_NAME;
} else if (process.env.CHANGE_ID) {
    // it is PR build
    scannerOptions['sonar.pullrequest.branch'] = process.env.BRANCH_NAME;
    scannerOptions['sonar.pullrequest.base'] = process.env.CHANGE_TARGET;
    scannerOptions['sonar.pullrequest.key'] = process.env.CHANGE_ID;
}
sonarqubeScanner(
    {
        serverUrl: 'https://sonarcloud.io',
        token: '519254f55277af7d1c5d071c7dadf50b03f307f3',
        options: scannerOptions
    },
    () => process.exit()
);
