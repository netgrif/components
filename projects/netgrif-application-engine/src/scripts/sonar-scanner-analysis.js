const sonarqubeScanner = require('sonarqube-scanner');
const childProcess = require('child_process');

function getCurrentBranch() {
    const command = 'git branch --show-current';
    return childProcess.execSync(command).toString().trim();
}

sonarqubeScanner(
    {
        serverUrl: 'https://sonar.netgrif.com',
        token: "a77040433bc2c05b8139a35fcf696b362cefa908",
        options: {
            'sonar.projectKey': 'Engine-frontend',
            'sonar.projectName':'NETGRIF Application Engine - Frontend',
            'sonar.projectDescription':process.env.npm_package_description,
            'sonar.sources': 'projects/netgrif-application-engine',
            'sonar.exclusions':'projects/netgrif-application-engine/**/*.spec.ts,./projects/netgrif-application-engine/src/scripts',
            'sonar.javascript.lcov.reportPaths':'coverage/netgrif-application-engine/lcov.info'
            //'sonar.branch.name': getCurrentBranch() //this feature is only in Developer Edition (which is paid)
        }
    },
    () => process.exit()
);
