const fs = require("fs");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const packageJson = ['package.json', 'projects/netgrif-application-engine/package.json', 'projects/netgrif-components/package.json']

function setVersion(version) {
    packageJson.forEach(path => {
        const pkg = JSON.parse(fs.readFileSync(path).toString());
        pkg.version = version;
        fs.writeFileSync(path, JSON.stringify(pkg, null, 4));
    });
}

readline.question("New NAE version: ", version => {
    setVersion(version);
    readline.close();
});



