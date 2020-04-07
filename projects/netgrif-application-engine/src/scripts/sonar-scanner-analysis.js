const sonarqubeScanner = require('sonarqube-scanner');
const childProcess = require('child_process');
const fs = require('fs');

/* EDIT ONLY HERE */

const projectName = 'NETGRIF Application Engine - Frontend';
const projectKey = 'Engine-frontend';
const lcovPath = 'coverage/netgrif-application-engine/lcov.info';
const sources = 'projects/netgrif-application-engine';
const exclusions = 'projects/netgrif-application-engine/**/*.spec.ts,./projects/netgrif-application-engine/src/scripts';

/* END OF EDIT ZONE */


/* DO NOT EDIT UNDER THIS LINE */

/* --------------------------- */

function getCurrentBranch() {
    const command = 'git branch --show-current';
    return childProcess.execSync(command).toString().trim();
}

function fixLcovFileNames() {
    const filePath = lcovPath;
    try {
        let content = fs.readFileSync(filePath).toString().trim();
        if (!content || content.length === 0)
            return;
        console.log('Found valid lcov report file');

        const indexOfSF = content.indexOf('SF:');
        if (indexOfSF === -1)
            return;
        console.log('Found SF segment');

        console.log('Sanitizing path to Linux convention');
        content = content.replace(/\\/g, '/');

        if (content.substring(indexOfSF + 3, indexOfSF + (sources.length + 3)) !== sources) {
            console.log(`File path 'SF' does not start with '${sources}'`);
            const indexOfProject = content.indexOf(sources, indexOfSF);
            if (indexOfProject !== -1) {
                const unwanted = content.substring(indexOfSF + 3, indexOfProject);
                console.log(`Removing string ${unwanted}`);
                content = content.replace(new RegExp(unwanted, 'g'), '');
            }
        }

        console.log('Writing file');
        fs.writeFileSync(filePath, content);
    } catch (e) {
        console.log('Failed to open lcov file');
    }
}

fixLcovFileNames();
sonarqubeScanner(
    {
        serverUrl: 'https://sonar.netgrif.com',
        token: 'a77040433bc2c05b8139a35fcf696b362cefa908',
        options: {
            'sonar.projectKey': projectKey,
            'sonar.projectName': projectName,
            'sonar.projectDescription': process.env.npm_package_description,
            'sonar.sources': sources,
            'sonar.exclusions': exclusions,
            'sonar.javascript.lcov.reportPaths': lcovPath
            //'sonar.branch.name': getCurrentBranch() //this feature is only in Developer Edition (which is paid)
        }
    },
    () => process.exit()
);
