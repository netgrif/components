const fs = require("fs");
const {exec} = require("child_process");
const ncp = require('ncp').ncp;
const path = require('path');

console.log("Building schematics ...");

// run the compiler
exec(path.join('node_modules', '.bin', 'tsc -p projects', 'netgrif-application-engine', 'tsconfig.schematics.json'), (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    // compilation successful

    copySchematicFiles();
});

function copySchematicFiles() {
    const sourcePrefix = path.join('projects', 'netgrif-application-engine', 'schematics');
    const destinationPrefix = path.join('dist', 'netgrif-application-engine', 'schematics');

    // copy schema.json
    copyFiles(sourcePrefix, destinationPrefix, 'schema.json');

    // copy all resources from files directories
    copyFiles(sourcePrefix, destinationPrefix, 'files');

    fs.copyFileSync(path.join(sourcePrefix, 'collection.json'), path.join(destinationPrefix, 'collection.json'));
}

function copyFiles(sourcePrefix, destinationPrefix, target, relativePath = '') {
    fs.readdir(path.join(sourcePrefix, relativePath), (error, files) => {
        if (error) {
            console.error('Unable to read directory: '+error);
            return;
        }

        files.forEach(file => {
            if(file === target) {
                const source = path.join(sourcePrefix, relativePath, file);
                const destination = path.join(destinationPrefix, relativePath, file);
                if(isDir(file)) {
                    // copy all content
                    ncp(source, destination, {stopOnErr: true}, (err) => {
                        if (err) {
                            return console.error(err);
                        }
                    });
                }
                else {
                    // copy just the file
                    fs.copyFileSync(source, destination);
                }
            }
            else if (isDir(file)) {
                // explore subdirectories
                copyFiles(sourcePrefix, destinationPrefix, target, path.join(relativePath, file));
            }
        });
    });
}

function isDir(name) {
    return !name.includes('.');
}
