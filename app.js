var program = require('commander');
var colors = require('colors');
var log = require('./helpers/log');

let controller = require('./generate/controller');

program
    .version('1.0.0')
    .option('new [project name]', 'eee')
    .parse(process.argv);




controller.generate("home", ["index", "up"]);