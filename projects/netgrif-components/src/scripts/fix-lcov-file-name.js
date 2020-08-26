const fs = require("fs");

const filePath = './coverage/netgrif-components/lcov.info';
let content = fs.readFileSync(filePath).toString().trim();
if (!content || content.length === 0)
    return;

const indexOfSF = content.indexOf("SF:");
if (indexOfSF !== -1) {
    console.log("Found SF segment");
    if (content.substring(indexOfSF + 3, indexOfSF + 11) !== "projects") {
        console.log("File path 'SF' does not start with 'projects'");
        const indexOfProject = content.indexOf("projects", indexOfSF);
        if (indexOfProject !== -1) {
            const unwanted = content.substring(indexOfSF + 3, indexOfProject);
            console.log("Removing string '" + unwanted + "'");
            content = content.replace(unwanted, "");
        }
    }
    console.log("Sanitizing path to Linux convention");
    content = content.replace(/\\/g, "/");

    console.log("Writing file");
    fs.writeFileSync(filePath, content);
}
