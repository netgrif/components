const fs = require('fs');
const path = require('path');

function find(dir, fileToFind, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(null, err);
        let pending = list.length;
        if (!pending) return done(results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    find(file, fileToFind, function (res, err) {
                        results = results.concat(res);
                        if (!--pending) done(results);
                    });
                } else {
                    if (stat.isFile() && file.endsWith(fileToFind)) {
                        results.push(file);
                    }
                    if (!--pending) done(results);
                }
            });
        });
    });
}

function writeVersion(version, destination) {
    const pkg = JSON.parse(fs.readFileSync(destination).toString());
    pkg.version = version;
    fs.writeFileSync(destination, JSON.stringify(pkg, null, 4));
}

find('projects', path.sep + 'package.json', (result, error) => {
    if (error) {
        console.error(error);
        return;
    }
    const version = JSON.parse(fs.readFileSync('package.json').toString()).version;
    result.forEach(pkg => {
        console.log('Writing version ' + version + ' to ' + pkg);
        writeVersion(version, pkg);
    });
})
