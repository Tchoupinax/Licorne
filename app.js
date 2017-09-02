var program = require('commander');
var colors = require('colors');
var log = require('./helpers/log');

let controller = require('./generate/controller');

program
    .version('1.0.0')
    .option('new [project name]', 'eee')
    .parse(process.argv);




let v = controller.generate("home", "./", true, ["index", "up"]);
console.log(v)