var program = require('commander');
var colors = require('colors');
var log = require('./helpers/log');

let controller = require('./generate/controller');

let exec = require('./helpers/exec.js');

var readlineSync = require('readline-sync');

let fs = require('fs');
program
    .version(require('./package.json').version)
    .option('version', 'Displays current version')
    .option('new [project name]', 'Create a new project')
    .parse(process.argv);

// Check arguments count. If argument is known by the application, 
// it will stored as a property of "program". Else, it will be added 
// in args array
//
// Today, there is 13 properties without any argument
// 
// Check if a known propertie exists

let exec2 = require('child_process').exec;

if (program.args.length == 0) {
    if (program.new) {
        //
        //
        // Variables
        let projectName;
        //
        //
        // Dowloading source and rename project directory 
        log.print("Creating a new project.")
        const { spawn } = require('child_process');
        const ls = spawn('git', ['clone', 'git@gitlab.com:dalvik/test-express.git']);
        log.print("Downloading source....")

        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        ls.stderr.on('close', (data) => {
            console.log("point 1")
            if (program.new === true) {
                console.log("point 2")
                projectName = readlineSync.question('Project\'s name :');
                console.log('hi')
                //exec2("mv ./test-express " + projectName);
            }
            else {
                console.log("point 3")
                //exec2("mv ./test-express " + program.new);
                projectName = program.new;
            }
            console.log("point 4")
            let version = readlineSync.question('Version (1.0.0) :');
            if (version == "") { version = "1.0.0" }
            let description = readlineSync.question('Description (empty) :')
            let author = readlineSync.question('Author(s) (empty) :')
            //
            //
            console.log("botn")
            // Changing composant with project's name
            fs.readFile("./" + projectName + "/package.json", 'utf8', function (err, data) {
                let jdata = JSON.parse(data);
                jdata.name = projectName
                jdata.version = version
                jdata.description = description
                jdata.author = author
                fs.writeFileSync("./" + projectName + "/package.json", JSON.stringify(jdata));
            });
        });
    }
    else {
        exec.home();
    }
}
else {
    log.error("Unknow arguments");
}