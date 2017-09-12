#!/usr/bin/env node

/*
 * ===============================================================
 * ==== D E P E N D A N C I E S ==================================
 * ===============================================================
 */
var program = require('commander');
var colors = require('colors');
let fs = require('fs');
/*
 * ===============================================================
 * ==== I N C L U D E S ==========================================
 * ===============================================================
 */
var log = require('./helpers/log');
let controller = require('./generate/controller');
let exec = require('./helpers/exec.js');
/*
 * ===============================================================
 * ==== A R G U R M E N T S   M A N A G E R ======================
 * ===============================================================
 */
program
    .version(require('./package.json').version)
    .option('version', 'Displays current version')
    .option('new [project name]', 'Create a new project')
    .option('start [environnement]', 'launch a project')
    .option('generate [whatToGenerate], generate')
    .option('route [list]', 'allows to list route')
    .parse(process.argv);
/*
 * ===============================================================
 * ==== B O D Y ==================================================
 * ===============================================================
 */
if (program.new) {
    exec.new(program);
}
// Checking if we are at the good location
else if (program.generate || program.route || program.start) {
    if (fs.existsSync("./app/") && fs.existsSync("./server.js") && fs.existsSync("./package.json")) {
        if (program.generate) {
            exec.generate(program);
        } else if (program.route) {
            exec.route(program);
        } else if (program.start) {
            exec.start(program);
        } else {
            exec.home();
        }
    } else {
        log.error("You are not in the root path");
    }
} else {
    exec.home();
}