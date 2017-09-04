var program = require('commander');
var colors = require('colors');
var log = require('./helpers/log');

let controller = require('./generate/controller');

program
    .version('1.0.0')
    .option('new [project name]', 'eee')
    .parse(process.argv);




//let v = controller.generate("home", "./", true, ["index", "up"]);
//console.log(v)
var ProgressBar = require('ascii-progress');

const { spawn } = require('child_process');
const ls = spawn('git', ['clone', 'git@gitlab.com:dalvik/test-express.git']);

var bar = new ProgressBar({
    schema: '╢:bar╟ :percent :elapseds',
    blank: '░',
    filled: '█'
});

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    var iv = setInterval(function() {
        bar.tick();
        if (bar.completed) {
            clearInterval(iv);
        }
    }, 100);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});