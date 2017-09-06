/*
 * ===============================================================
 * ==== D E P E N D A N C I E S ==================================
 * ===============================================================
 */
const fs = require('fs'); // Manage files
const log = require('./log'); // Custom logging system
const cursor = require('ansi')(process.stdout); // Allow to custom cursor color
const readlineSync = require('readline-sync'); // Questionning user
const exec = require('child_process').exec; // Perform bash operation
/*
 * ===============================================================
 * ==== I N C L U D E S =========================================+
 * ===============================================================
 */
const rainbow = require('./ecriture').rainbow; // Write rainbow
const controller = require('../generate/controller'); // Controller generator
//
//
//
//-----------------------------------------------------------------
//                   o         _        _            _ 
//        _o        /\_      _ \\o     (_)\__/o     (_)
//      _< \_      _>(_)    (_)/<_       \_| \      _|/' \/
//     (_)>(_)    (_)           (_)      (_)       (_)'  _\o_
//-----------------------------------------------------------------
//
//
//
/*
 * ===============================================================
 * ==== P U B L I C ==============================================
 * ===============================================================
 */
//
// 
//      H O M E
// Display welcome screen with command helper
exports.home = function() {
    rainbow('████████████████████████████████████████████████████████████████████████████████████████');
    console.log();
    rainbow('                    E');
    rainbow('            |\   | RN');
    rainbow('           _| \-/CO');
    rainbow('          /    LI \\');
    rainbow('        //    ~ + \\          L . I . C . O . R . N . E');
    rainbow('       //         |');
    rainbow('      //    \      \\');
    rainbow('     |||     | .  .|');
    rainbow('    ///     / \___/');
    console.log();
    rainbow("Commands :");
    console.log();
    console.log("\t version");
    console.log("\t new [ project-name ]");
    console.log("\t generate [ controller | model ]");
    console.log();
    console.log();
    console.log();
    console.log();
};
//
//
//      N E W
exports.new = function(program) {
    // Variables
    let projectName;
    // Dowloading source and rename project directory 
    log.print("Creating a new project.");
    const ls = exec('git', ['clone', 'git@gitlab.com:dalvik/test-express.git']);
    log.print("Downloading source....");
    // When dowloading is finished
    ls.stderr.on('close', (data) => {
        // If there is no name specified
        if (program.new === true) {
            // Asking project's name to user
            projectName = readlineSync.question('Project\'s name :');
            // Changing project's name
            exec("mv ./test-express " + projectName);
        } else {
            // Changing project's name
            exec("mv ./test-express " + program.new);
            projectName = program.new;
        }
        // Asking some information
        let version = readlineSync.question('Version (1.0.0) :');
        if (version == "") { version = "1.0.0" };
        let description = readlineSync.question('Description (empty) :');
        let author = readlineSync.question('Author(s) (empty) :');
        //
        //
        // Changing composant with project's name
        fs.readFile("./" + projectName + "/package.json", 'utf8', function(err, data) {
            let jdata = JSON.parse(data);
            jdata.name = projectName.toLowerCase();
            jdata.version = version
            jdata.description = description
            jdata.author = author
            fs.appendFile("./" + projectName + "/package.json", JSON.stringify(jdata));
        });
    });
};
//
//
//      G E N E R A T E
exports.generate = function(program) {
    if (fs.existsSync("./controllers/") && fs.existsSync("./package.json")) {
        if (program.generate === true) {
            log.error("What do you want to generate ?");
            log.printgray('Usage : licorne generate controller controllerName [action]');
        } else if (program.generate == "controller") {
            log.debug(program.args.length);
            if (program.args.length == 0) {
                log.error("Controller's name is missing");
                log.printgray('Usage : licorne generate controller controllerName [action]');
            } else {
                let name = program.args[0];
                let arguments = [];
                for (var i = 1; i < program.args.length; i++) {
                    arguments.push(program.args[i]);
                }
                // Verify if a file same named does not exist
                if (controller.generate(name, "./controllers/", false, arguments)) {
                    log.print("Controller created successfully !");
                } else {
                    log.error("A file with same name already exists");
                    log.print("Do you want to overwrite this file anyway ?");
                    let answer = readlineSync.question('Overwrite ? [y/N]');
                    if (answer == "y" || answer == "yes") {
                        controller.generate(name, "./controllers/", true, arguments);
                        log.print("File overwrited");
                    } else {
                        log.print("Nothing performed");
                    }
                }
            }
        } else {
            log.error("Invalid option");
            log.printgray("Valid options are : controller - model");
        }
    } else {
        log.error("You are not in the root path");
    }
}