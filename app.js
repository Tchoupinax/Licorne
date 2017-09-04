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
    .option('generate [whatToGenerate], generate')
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

if (program.new) {
    exec.new();
}
else if (program.generate) {
    exec.generate();
}
else {
    exec.home();
}
