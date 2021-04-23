const fs = require("fs");
const path = require('path');

// Deletes the node_modules/@netgrif/components directory/symlink (if it exists) to prevent an ENOENT / missing write access error during some builds

console.log("Checking if local NC build link exists...");

const buildLinkPath = path.join("node_modules", "@netgrif", "components");

if (!fs.existsSync(buildLinkPath)) {
    console.log("Build link does not exist. Nothing to delete.");
    return;
}

console.log("Build link exists. Cleaning...");

fs.unlinkSync(buildLinkPath);
