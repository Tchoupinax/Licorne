var program = require('commander');
var colors = require('colors');
var log = require('./helpers/log');

program
    .version('1.0.0')
    .option('new [project name]', 'eee')
    .parse(process.argv);