const fs = require("fs");
const {exec} = require("child_process");
const ncp = require('ncp').ncp;
const path = require('path');

console.log("Building NC schematics ...");

// run the compiler
exec(path.join('node_modules', '.bin', 'tsc -p projects', 'netgrif-components', 'tsconfig.schematics.json'), (error, stdout, stderr) => {
    if (stdout) {
        console.log(stdout);
    }
    if (error) {
        throw new Error(`Schematic compilation failed. Look above for compilation output. Caused by: ${error.message}`);
    }
    if (stderr) {
        throw new Error(`Schematic compilation failed. Look above for compilation output. Caused by: ${stderr}`);
    }
    // compilation successful

    copySchematicFiles();
});

function copySchematicFiles() {
    const sourcePrefix = path.join('projects', 'netgrif-components', 'schematics');
    const destinationPrefix = path.join('dist', 'netgrif-components', 'schematics');

    // copy schema*.json
    copyFiles(sourcePrefix, destinationPrefix, {prefix: 'schema', suffix:".json"});

    // copy all resources from files directories
    copyFiles(sourcePrefix, destinationPrefix, {exact: 'files'});

    fs.copyFileSync(path.join(sourcePrefix, 'collection.json'), path.join(destinationPrefix, 'collection.json'));
    fs.copyFileSync(path.join(sourcePrefix, 'migrations.json'), path.join(destinationPrefix, 'migrations.json'));
}

function copyFiles(sourcePrefix, destinationPrefix, target, relativePath = '') {
    fs.readdir(path.join(sourcePrefix, relativePath), (error, files) => {
        if (error) {
            throw new Error(`Reading directory failed. Caused by: ${error}`);
        }

        files.forEach(file => {
            const source = path.join(sourcePrefix, relativePath, file);
            if(
                ((!!target.exact && file === target.exact) || !target.exact)
                && ((!!target.prefix && file.startsWith(target.prefix)) || !target.prefix)
                && ((!!target.suffix && file.endsWith(target.suffix)) || !target.suffix)
            ) {
                const destination = path.join(destinationPrefix, relativePath, file);
                if(isDir(source)) {
                    // copy all content
                    ncp(source, destination, {stopOnErr: true}, (err) => {
                        if (err) {
                            throw new Error(`Recursive subdirectory copy failed. Caused by: ${err}`);
                        }
                    });
                }
                else {
                    // copy just the file
                    fs.copyFileSync(source, destination);
                }
            }
            else if (isDir(source)) {
                // explore subdirectories
                copyFiles(sourcePrefix, destinationPrefix, target, path.join(relativePath, file));
            }
        });
    });
}

function isDir(pathos) {
    return fs.lstatSync(pathos).isDirectory();
}
