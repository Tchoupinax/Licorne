var program = require('commander');
var colors = require('colors');
var log = require('./helpers/log');

let controller = require('./generate/controller');

let exec = require('./helpers/exec.js');



let fs = require('fs');
program
    .version(require('./package.json').version)
    .option('version', 'Displays current version')
    .option('generate [whatToGenerate], generate')
    .option('route [list]', 'allows to list route')
    .option('new [project name]', 'Create a new project')
    .parse(process.argv);

// Check arguments count. If argument is known by the application, 
// it will stored as a property of "program". Else, it will be added 
// in args array
//
// Today, there is 13 properties without any argument
// 
// Check if a known propertie exists



if (program.new) {
    exec.new(program);
} else if (program.generate) {
    exec.generate(program);
} else if (program.route) {
    exec.route(program);
} else {
    exec.home();
}