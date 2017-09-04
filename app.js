var program = require('commander');
var colors = require('colors');
var log = require('./helpers/log');

let controller = require('./generate/controller');

let exec = require('./helpers/exec.js');


program
    .version('1.0.0')
    .option('new [project name]', 'Create a new project')
    .parse(process.argv);


if (program.args.length == 0) {
    exec.home();
}
else if (program.new) {
    exec.new();
}







var http = require('http');


var opt = {
    headers: { 'User-Agent': 'Osef' }
}

/*
var request = require('request');
request('https://gitlab.com/api/v4/projects/4038613', opt, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        let data = JSON.parse(body)
        console.log(data) // Print the google web page.
    }
})
*/

//next();

function next() {
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

    var iv;
    t;


    var getSize = require('get-folder-size');
    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);

        iv = setInterval(function () {
            //bar.tick();
            size = spawn('du', ['-sh', './test-express']);
            size.stdout.on('data', function (data) {
                log('size: ' + data);
            });
        }, 100);
    });

    ls.on('close', (code) => {
        console.log(code)
        clearInterval(iv);
        console.log("\n");
        console.log("fini");
        size = spawn('du', ['-sh', './test-express']);
        size.stdout.on('data', function (data) {
            log('size: ' + data);
        });
    });
}