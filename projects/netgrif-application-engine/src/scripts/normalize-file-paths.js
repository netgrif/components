const commander = require("commander");
const fs = require("fs");

function formatLog(str, color) {
    return "[" + (new Date()).toISOString() + "] " + (!!color ? color : "") + str + "\x1b[0m";
}

function log(str) {
    console.log(formatLog(str));
}

function info(str) {
    console.info(formatLog(str,"\x1b[36m"));
}

function error(str){
    console.info(formatLog(str,"\x1b[31m"))
}

commander
    .version("0.0.1", "-v, --version")
    .usage("[OPTIONS] <value>")
    .option("-f, --file", "Argument is json file")
    .option("-s, --split", "String to split path")
    .option("-r, --replace", "Replace string with another. Value '<what to replace>';'<replacement>'")
    .arguments("<value>")
    .action((value, options) => {
        const newObj = {};
        const json = JSON.parse(fs.readFileSync(value));

        log("Normalizing file " + value);
        Object.keys(json).forEach(key => {
            if (key === 'total') {
                info("Skipping attribute 'total'");
                newObj.total = json.total;
                return;
            }
            const splitIndex = key.lastIndexOf('projects');
            if (splitIndex > -1) {
                const newKey = key.substring((splitIndex)).replace(/\\/g, "/");
                info("Normalized: " + key + " --> " + newKey);
                newObj[newKey] = json[key];
                return;
            }
            newObj[key] = json[key];
        });
        log("Writing file");
        fs.writeFileSync(value, JSON.stringify(newObj));
    })
    .parse(process.argv);


if (process.argv.length <= 2) {
    console.log("Nothing to do here");
    process.exit(0);
}

