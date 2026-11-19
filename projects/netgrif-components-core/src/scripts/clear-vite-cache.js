const fs = require('fs');
const path = require('path');

// Deletes the Vite prebundle caches of the applications (.angular/cache/<version>/<project>/vite).
// The dev server prebundles the locally built libraries (@netgrif/components-core, @netgrif/components) there
// and keeps serving the old code (or fails with NG0919) after a new local build.
// A running dev server keeps its prebundle in memory, restart it after a new local build.

const cacheRoot = path.join('.angular', 'cache');

if (!fs.existsSync(cacheRoot)) {
    console.log('Angular cache does not exist. Nothing to delete.');
    return;
}

let deleted = 0;
for (const version of fs.readdirSync(cacheRoot)) {
    const versionDir = path.join(cacheRoot, version);
    if (!fs.statSync(versionDir).isDirectory()) {
        continue;
    }
    for (const project of fs.readdirSync(versionDir)) {
        const viteDir = path.join(versionDir, project, 'vite');
        if (fs.existsSync(viteDir)) {
            fs.rmSync(viteDir, {recursive: true, force: true});
            console.log(`Deleted ${viteDir}`);
            deleted++;
        }
    }
}
if (deleted === 0) {
    console.log('No Vite cache to delete.');
}
