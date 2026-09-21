const fs = require("fs");
const path = require('path');

// Deletes the node_modules/@netgrif/components-core directory/symlink (if it exists) to prevent an ENOENT / missing write access error during some builds

console.log("Checking if local NCC build exists...");

const buildLinkPath = path.join("dist", "netgrif-components-core");

if (!fs.existsSync(buildLinkPath)) {
    console.log("Build does not exist. Nothing to delete.");
    return;
}

console.log("Build exists. Cleaning...");
fs.rmSync(buildLinkPath, { recursive: true, force: true });
