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
require("tchoupilog");
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
exports.home = function () {
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
    console.log("\t new [project-name]");
    console.log("\t start [dev|prod]");
    console.log("\t gen/generate [controller|model]");
    console.log();
    console.log();
};
//      S T A R T
exports.start = function (program) {
    // Keep the environnement
    let env = "";
    switch (program.start) {
        case "prod":
            env = "PROD";
            break;
        case "production":
            env = "PROD";
            break;
        case "dev":
            env = "DEV";
            break;
        case "developper":
            env = "DEV";
            break;
        default:
            env = "DEV";
            break;
    }
    // If no environnement is specified
    if (program.start === true) {
        console.info("No environnement specified, lauchning server by default")
        console.debug("Serveur running with environnement : " + env);
    }
    // Verifying the given environnement
    else {
        if (program.start === "prod" || program.start === "production" ||
            program.start === "dev" || program.start === "development") {
            console.debug("Serveur running with environnement : " + env);
        } else {
            // Stopping the program because of unknow env
            console.error("'" + program.start + "' is not an known environnement");
            process.exit();
        }
    }
    // Starting the serveur
    var spawn = require('child_process').spawn,
        serveur = spawn('node', ['server.js']);
    // Listen data on standard output
    serveur.stdout.on('data', function (data) {
        console.log(data.toString().substring(0, data.toString().length - 5))
    });
    // ... and on error output
    serveur.stderr.on('data', function (data) {
        console.log(data.toString().substring(0, data.toString().length - 5))
    });
    // Closing command when server crashed
    serveur.on('exit', function (code) {
        require("console-error");
        console.error("App crashed ...")
        process.exit();
    });
};
//
//
//      N E W
exports.new = function (program) {
    // Variables
    let projectName;
    // Dowloading source and rename project directory 
    console.info("Creating a new project");
    const { spawn } = require('child_process');
    const ls = spawn('git', ['clone', 'git@github.com:Tchoupinax/Pony.git']);
    console.info("Downloading source....");
    // When dowloading is finished
    ls.stderr.on('close', (data) => {
        // If there is no name specified
        if (program.new === true) {
            // Asking project's name to user
            projectName = readlineSync.question('Project\'s name :');
            while (projectName === "") {
                console.error("Project'name can't be empty. Please fill it");
                projectName = readlineSync.question('Project\'s name :');
            }
            // Changing project's name
            exec("mv ./Pony " + projectName);
        } else {
            // Changing project's name
            exec("mv ./Pony " + program.new);
            projectName = program.new;
        }
        // Asking some information
        let version = readlineSync.question('Version (1.0.0) :');
        while (!version.match("[0-9]*\\.[0-9]*\\.[0-9]")) {
            console.error("Version must seem like 1.0.0");
            version = readlineSync.question('Version (1.0.0) :');
        }
        if (version == "") { version = "1.0.0"; }
        let description = readlineSync.question('Description (empty) :');
        let author = readlineSync.question('Author(s) (empty) :');
        // Changing composant with project's name
        fs.readFile("./" + projectName + "/package.json", 'utf8', function (err, data) {
            let jdata = JSON.parse(data);
            jdata.name = projectName.toLowerCase();
            jdata.version = version
            jdata.description = description
            jdata.author = author
            fs.writeFileSync("./" + projectName + "/package.json", JSON.stringify(jdata, null, 4));
        });
        // Downloading Framework dependancies
        var spawn = require('child_process').spawn,
            serveur = spawn("cd ./" + projectName + " && npm install", {
                shell: true
            });
        serveur.stdout.on('data', function (data) {
            //console.log(data.toString().substring(0, data.toString().length - 5))
        });
        serveur.stderr.on('data', function (data) {
            //console.log(data.toString().substring(0, data.toString().length - 5))
        });
        serveur.on('exit', function (code) {
            console.info("Dependancies sucessfully downloaded");
        });
    });
};
//
//
//      G E N E R A T E
exports.generate = function (program) {
    if (fs.existsSync("./app/") && fs.existsSync("./server.js") && fs.existsSync("./package.json")) {
        if (program.generate === true) {
            console.error("What do you want to generate ?");
            console.info('Usage : licorne generate controller controllerName [action]');
        } else if (program.generate == "controller") {
            if (program.args.length == 0) {
                console.error("Controller's name is missing");
                console.info('Usage : licorne generate controller controllerName [action]');
            } else {
                let name = program.args[0];
                let arguments = [];
                for (var i = 1; i < program.args.length; i++) {
                    arguments.push(program.args[i]);
                }
                // Verify if a file same named does not exist
                if (controller.generate(name, "./app/controllers/", false, arguments)) {
                    console.info("Controller created successfully !");
                    console.info("It was automatically declared in route file")
                    addControllerToRouteFile(name);
                    process.exit();
                } else {
                    console.error("A file with same name already exists");
                    console.info("Do you want to overwrite this file anyway ?");
                    let answer = readlineSync.question('Overwrite ? [y/N]');
                    if (answer == "y" || answer == "yes") {
                        controller.generate(name, "./app/controllers/", true, arguments);
                        console.info("File overwrited");
                    } else {
                        console.info("Nothing performed");
                    }
                }
            }
        } else if (program.generate == "route") {
            if (program.args.length == 0) {
                console.error("Route's name is missing");
                console.info('Usage : licorne generate route routeName methode');
            } else {
                let name = program.args[0];
                let arguments = [];
                for (var i = 1; i < program.args.length; i++) {
                    arguments.push(program.args[i]);
                }
            }
        } else {
            console.error("Invalid option");
            console.info("Valid options are : controller - model");
        }
    } else {
        console.error("You are not in the root path");
    }
};
//
//
//      R O U T E
exports.route = function (program) {
    if (program.route === true) {
        console.error("Argument is missing");
        console.info('Usage : licorne route list');
    } else {
        if (program.route === "list") {
            // On require en se plaçant dans le chemin du projet
            const data = require(require("shelljs").pwd().stdout + "/config/routes");;
            // Call the function with "" for starting the tree
            routes = [];
            showRoute(data, "")
            displayRouteInArray(routes);
        } else {
            console.error("Invalid option");
            console.info("Valid options are : list");
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
    while (!data[index].includes("var")) {
        index++;
    }
    while (data[index].includes("var")) {
        index++;
    }
    data.splice(index, 0, "var " + nameController + "Controller = require('../app/controllers/" +
        nameController + "Controller');");
    let text = data.join("\n");
    fs.writeFileSync("./config/routes.js", text);
}

function displayRouteInArray(routes) {
    // Declare margin size
    let margin = 4;
    // Default headers
    let headers = [
        "Name",
        "Url",
        "Method",
        "Target"
    ];
    // Have to get manually routes's target from file because they are function...
    // ... and we want to get their names and not their contents !
    targetComplete = getCompleteTarget();
    // We'll save the bigges size of words to determine column size
    let columnSize = {
        Name: 0,
        Url: 0,
        Method: "Method".length, // By default, "Method" size is greatest than GET, POST, PUT, DELETE...
        Target: 0
    }
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].name.length > columnSize.Name) {
            columnSize.Name = routes[i].name.length;
        }
        if (routes[i].pattern.length > columnSize.Url) {
            columnSize.Url = routes[i].pattern.length;
        }
        if (targetComplete[i].length > columnSize.Target) {
            columnSize.Target = targetComplete[i].length;
        }
    }
    //
    // Draw top borderline
    let display = "";
    for (let i = 0; i < headers.length; i++) {
        display += "+".rainbow + getNthHyphen(columnSize[headers[i]] + margin);
    }
    display += "+".rainbow;
    display += "\n";
    //
    // Write headers
    for (let i = 0; i < headers.length; i++) {
        display += rainbowplusplus("|", i) + centerHeader(headers[i], columnSize[headers[i]] + margin);
    }
    display += rainbowplusplus("|", headers.length);
    display += "\n";
    //
    // Write header bottom borderline
    for (let i = 0; i < headers.length; i++) {
        display += "+".rainbow + getNthHyphen(columnSize[headers[i]] + margin);
    }
    display += "+".rainbow;
    display += "\n";
    //
    // Write array content
    for (let i = 0; i < routes.length; i++) {
        display += rainbowplusplus("|", i) +
            centerString(routes[i].name, columnSize[headers[0]] + margin, true, routes[i].method.toUpperCase()) +
            rainbowplusplus("|", i) +
            centerString(routes[i].pattern, columnSize[headers[1]] + margin, true, routes[i].method.toUpperCase()) +
            rainbowplusplus("|", i) +
            centerString(routes[i].method.toUpperCase(), columnSize[headers[2]] + margin, false, routes[i].method.toUpperCase()) +
            rainbowplusplus("|", i) +
            centerString(targetComplete[i], columnSize[headers[3]] + margin, true, routes[i].method.toUpperCase());
        display += rainbowplusplus("|", i);
        display += "\n";
    }
    //
    // Write bottom borderline
    for (let i = 0; i < headers.length; i++) {
        display += "+".rainbow + getNthHyphen(columnSize[headers[i]] + margin);
    }
    display += "+".rainbow;
    console.log(display);
    process.exit(0);
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

function centerHeader(string, size) {
    let space = " ";
    while (space.length + string.length <= size) {
        space += " ";
    }
    let s = space.substring(0, space.length / 2);
    if (s.length * 2 == space.length) {
        return s + string.rainbow + s.substring(1, s.length);
    }
    return s + string.rainbow + s;
}

function centerString(string, size, left, method) {
    if (left) {
        let returned = "  " + string;
        while (returned.length < size) {
            returned += " ";
        }
        if (method === "GET") {
            return returned.blue;
        } else if (method === "POST") {
            return returned.yellow;
        } else if (method === "PUT") {
            return returned.green;
        } else if (method === "DELETE") {
            return returned.red;
        } else if (method === "PATCH") {
            return returned.cyan
        }
    } else {
        let space = "";
        while (space.length + string.length < size) {
            space += " ";
        }
        let s = space.substring(0, space.length / 2);
        if (string.length % 2 != 0) {
            if (string === "GET") {
                return s + string.blue + s + " ";
            } else if (string === "PUT") {
                return s + string.green + s + " ";
            } else if (string === "PATCH") {
                return s + string.cyan + s + " ";
            } else {
                return s + string + s + " ";
            }
        } else {
            if (string === "POST") {
                return s + string.yellow + s;
            } else if (string === "DELETE") {
                return s + string.red + s;
            }
        }
    }
}