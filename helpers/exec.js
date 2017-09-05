//
let log = require('./log');
let singlelog = require('single-line-log').stdout;
let cursor = require('ansi')(process.stdout);
let rainbow = require('./ecriture').rainbow;
let write = require('./ecriture').write;
let w = require('./ecriture');
var readlineSync = require('readline-sync');
let exec2 = require('child_process').exec;

let fs = require('fs');
let controller = require('../generate/controller')
//
exports.home = function () {
    rainbow('████████████████████████████████████████████████████████████████████████████████████████');
    rainbow('_ _                           ');
    rainbow('| (_)                          ');
    rainbow('| |_  ___ ___ _ __ _ __   ___ ');
    rainbow('| | |/ __/ _ \| \'__| \'_ \ / _ \\');
    rainbow('| | | (_| (_) |  |  | | | |  __/');
    rainbow('|_|_|\___\___/|_|  |_| |_|\___|');
    log.ln();


    rainbow("Commands :");
    console.log();
    console.log("\t version");
    console.log("\t new [ project-name ]");
    console.log("\t generate [ controller | model ]");
    console.log();
    console.log();
    console.log();
    console.log();
}
//
exports.new = function (program) {
    //
    //
    // Variables
    let projectName;
    //
    //
    // Dowloading source and rename project directory 
    log.print("Creating a new project.");
    const { spawn } = require('child_process');
    const ls = spawn('git', ['clone', 'git@gitlab.com:dalvik/test-express.git']);
    log.print("Downloading source....");

    ls.stderr.on('close', (data) => {
        if (program.new === true) {
            projectName = readlineSync.question('Project\'s name :');
            exec2("mv ./test-express " + projectName);
        }
        else {
            exec2("mv ./test-express " + program.new);
            projectName = program.new;
        }
        let version = readlineSync.question('Version (1.0.0) :');
        if (version == "") { version = "1.0.0" }
        let description = readlineSync.question('Description (empty) :')
        let author = readlineSync.question('Author(s) (empty) :')
        //
        //
        // Changing composant with project's name
        fs.readFile("./" + projectName + "/package.json", 'utf8', function (err, data) {
            let jdata = JSON.parse(data);
            jdata.name = projectName.toLowerCase();
            jdata.version = version
            jdata.description = description
            jdata.author = author
            fs.appendFile("./" + projectName + "/package.json", JSON.stringify(jdata));
        });
    });
}

exports.generate = function (program) {
    if (fs.existsSync("./controllers/") && fs.existsSync("./package.json")) {
        if (program.generate === true) {
            log.error("What do you want to generate ?");
            log.printgray('Usage : licorne generate controller controllerName [action]');
        }
        else if (program.generate == "controller") {
            if (program.args.length == 0) {
                log.error("Controller's name is missing");
                log.printgray('Usage : licorne generate controller controllerName [action]');
            }
            let name = program.args[0];
            let arguments = [];
            for (var i = 1; i < program.args.length; i++) {
                arguments.push(program.args[i]);
            }
            // Verify if a file same named does not exist
            if (controller.generate(name, "./Controller/", false, arguments)) {
                log.print("Controller created successfully !");
            }
            else {
                log.error("A file with same name already exists");
                log.print("Do you want to overwrite this file anyway ?");
                let answer = readlineSync.question('Overwrite ? [y/N]');
                if (answer == "y" || answer == "yes") {
                    controller.generate(name, "./Controller/", true, arguments);
                    log.print("File overwrited");
                }
                else {
                    log.print("Nothing performed");
                }
            }
        }
        else {
            log.error("Invalid option");
            log.printgray("Valid options are : controller - model");
        }
    }
    else {
        log.error("You are not in the root path");
    }
}








/*

etInterval(function () {
        rgb = rainbow(x);
        for (var p = 0; p < 3; p++) {
            if (parseInt(rgb[p]) < 10) {
                couleur += "0" + rgb[p].toString(16);
            }
            else if (parseInt(rgb[p]) < 16) {
                couleur += "0" + rgb[p].toString(16);
            }
            else {
                couleur += rgb[p].toString(16);
            }
        }

        cursor
            .hex("#" + couleur)

        singlelog("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ \n       L.I.C.O.R.N.E \n░░░░░░░░░░░░░░░░░░░░░░░░░░░░░");
        couleur = ""
        x++;
    }, 1);



    */