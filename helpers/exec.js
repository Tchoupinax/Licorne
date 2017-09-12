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
 * ==== I N C L U D E S ==========================================
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
//      S T A R T
exports.start = function(program) {
    if (program.start === true) {

    } else {
        if (program.start === "prod" || program.start === "production") {


            var spawn = require('child_process').spawn,
                serveur = spawn('node', ['server.js']);

            serveur.stdout.on('data', function(data) {
                console.log(data.toString().substring(0, data.toString().length - 5))
            });

            serveur.stderr.on('data', function(data) {
                require("../../Tchoupilog/index");
                console.log(data.toString().substring(0, data.toString().length - 5))
            });

            serveur.on('exit', function(code) {
                console.error("App crashed ...")
            })

        } else if (program.start === "dev" || program.start === "development") {
            //exec("NODE_ENV='development' node server.js");
        } else {
            log.error(program.start + " is not an accepted environnement")
        }
    }
};
//
//
//      N E W
exports.new = function(program) {
    // Variables
    let projectName;
    // Dowloading source and rename project directory 
    log.print("Creating a new project.");
    const { spawn } = require('child_process');
    const ls = spawn('git', ['clone', 'git@gitlab.com:dalvik/test-express.git']);
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
        if (version == "") { version = "1.0.0" }
        let description = readlineSync.question('Description (empty) :')
        let author = readlineSync.question('Author(s) (empty) :')
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
    if (fs.existsSync("./app/") && fs.existsSync("./server.js") && fs.existsSync("./package.json")) {
        if (program.generate === true) {
            log.error("What do you want to generate ?");
            log.printgray('Usage : licorne generate controller controllerName [action]');
        } else if (program.generate == "controller") {
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
                if (controller.generate(name, "./app/controllers/", false, arguments)) {
                    log.print("Controller created successfully !");
                    log.print("It was automatically declared in route file")
                    addControllerToRouteFile(name);
                } else {
                    log.error("A file with same name already exists");
                    log.print("Do you want to overwrite this file anyway ?");
                    let answer = readlineSync.question('Overwrite ? [y/N]');
                    if (answer == "y" || answer == "yes") {
                        controller.generate(name, "./app/controllers/", true, arguments);
                        log.print("File overwrited");
                    } else {
                        log.print("Nothing performed");
                    }
                }
            }
        } else if (program.generate == "route") {
            if (program.args.length == 0) {
                log.error("Route's name is missing");
                log.printgray('Usage : licorne generate route routeName methode');
            } else {
                let name = program.args[0];
                let arguments = [];
                for (var i = 1; i < program.args.length; i++) {
                    arguments.push(program.args[i]);
                }
            }
        } else {
            log.error("Invalid option");
            log.printgray("Valid options are : controller - model");
        }
    } else {
        log.error("You are not in the root path");
    }
};
//
//
//      R O U T E
exports.route = function(program) {
    if (program.route === true) {
        log.error("Argument is missing");
        log.printgray('Usage : licorne route list');
    } else {
        if (program.route === "list") {
            // On require en se plaçant dans le chemin du projet
            const data = require(require("shelljs").pwd().stdout + "/config/routes");;
            // Call the function with "" for starting the tree
            routes = [];
            showRoute(data, "")
            displayRouteInArray(routes);
        } else {
            log.error("Invalid option");
            log.printgray("Valid options are : list");
        }
    }
};
//
//
//
/*
 * ===============================================================
 * ==== P R I V A T E ============================================
 * ===============================================================
 */
function addControllerToRouteFile(nameController) {
    nameController = nameController.toLowerCase();
    let data = fs.readFileSync("./config/routes.js", 'utf8').toString().split("\n");
    let index = 0;
    while (data[index] !== "") {
        index++;
    }
    if (data[index] === "" && data[index + 1].includes("var")) {
        data[index] = "var " + nameController + "= require('../app/controllers/" + nameController + "Controller'";
    } else {
        data.splice(index, 0, "var " + nameController + " = require('../app/controllers/" + nameController + "Controller')");
    }
    let text = data.join("\n");
    fs.writeFile("./config/routes.js", text, function(err) {
        if (err) {
            return console.log(err);
        }
    });
}

function displayRouteInArray(routes) {
    // Getting complete target from file
    targetComplete = getCompleteTarget();



    let columnSize = {
        Name: 0,
        Url: 0,
        Method: "Methode".length,
        Target: 0
    };
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].name.length > columnSize.Name) {
            columnSize.Name = routes[i].name.length;
        }
        if (routes[i].pattern.length > columnSize.Url) {
            columnSize.Url = routes[i].pattern.length + 1;
        }
        if (targetComplete[i].length > columnSize.Target) {
            columnSize.Target = targetComplete[i].length + 3;
        }
    }
    let headers = [
        "Name",
        "Url",
        "Method",
        "Target"
    ];
    //
    // Draw top borderline
    let display = "";
    for (let i = 0; i < headers.length; i++) {
        display += "+".rainbow + getNthHyphen(columnSize[headers[i]] + 4);
    }
    display += "+".rainbow;
    display += "\n";
    //
    // Write headers
    for (let i = 0; i < headers.length; i++) {
        display += rainbowplusplus("|", i) + centerHeader(headers[i], columnSize[headers[i]]);
    }
    display += rainbowplusplus("|", headers.length);
    display += "\n";
    //
    // Write header bottom borderline
    for (let i = 0; i < headers.length; i++) {
        display += "+".rainbow + getNthHyphen(columnSize[headers[i]] + 4);
    }
    display += "+".rainbow;
    display += "\n";
    //
    // Write array content
    for (let i = 0; i < routes.length; i++) {

        display += rainbowplusplus("|", i) + centerString(routes[i].name, columnSize[headers[0]]) + rainbowplusplus("|", i) +
            centerString(routes[i].pattern, columnSize[headers[1]], true) + rainbowplusplus("|", i) +
            centerString(routes[i].method.toUpperCase(), columnSize[headers[2]]) + rainbowplusplus("|", i) +
            centerString(targetComplete[i], columnSize[headers[3]], true);
        display += rainbowplusplus("|", i);
        display += "\n";
    }
    //
    // Write bottom borderline
    for (let i = 0; i < headers.length; i++) {
        display += "+".rainbow + getNthHyphen(columnSize[headers[i]] + 4);
    }
    display += "+".rainbow;
    console.log(display);
}

function getNthHyphen(n) {
    s = "";
    for (let i = 0; i < n; i++) {
        s += "-"
    }
    return s.rainbow;
}

function showRoute(parent, path) {
    for (child in parent) {
        if (isNaN(child)) {
            if (child === "*") { showRoute(parent[child], ""); } else { showRoute(parent[child], path + "/" + child); }
        } else {
            parent[child].pattern = path + parent[child].pattern
            routes.push(parent[child])
        }
    }
}

function centerHeader(string, size) {
    size -= string.length;
    size += 4;
    if (string.length % 2 == 0) {
        let space = "";
        for (let i = 0; i < size / 2; i++) {
            space += " ";
        }
        return space + string.rainbow + space.substring(1, space.length);
    } else {
        let space = "";
        for (let i = 0; i < size / 2; i++) {
            space += " ";
        }
        return space + string.rainbow + space;
    }
}

function centerString(string, size, left) {
    if (left !== true) {
        size -= string.length;
        size += 4;
        if (string.length % 2 == 0) {
            let space = "";
            for (let i = 0; i < size / 2; i++) {
                space += " ";
            }
            if (string === "POST") { string = string.yellow }

            return space + string + space.substring(1, space.length);
        } else {
            let space = "";
            for (let i = 0; i < size / 2; i++) {
                space += " ";
            }
            if (string === "GET") { string = string.magenta }
            return space + string + space;
        }
    } else {
        size += 4;
        let returned = "  ";
        returned += string
        while (returned.length < size) {
            returned += " ";
        }
        return returned;
    }
}

function rainbowplusplus(char, index) {
    let string = "";
    for (let i = 0; i < index; i++) {
        string += " ";
    }
    string += char;
    string = string.rainbow;
    return string.substring(index, string.length);
}

function getCompleteTarget() {
    let file = fs.readFileSync('./config/routes.js', 'utf8');
    let array = file.split("view: ");
    let target = [];
    for (let i = 1; i < array.length; i++) {
        target.push(file.split("view: ")[i].split(" }")[0])
    }
    return target;
}