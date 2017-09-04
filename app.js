var program = require('commander');
var colors = require('colors');
var log = require('./helpers/log');

let controller = require('./generate/controller');

let exec = require('./helpers/exec.js');

program
    .version(require('./package.json').version)
    .option('version', 'Displays current version')
    .option('new [project name]', 'Create a new project')
    .parse(process.argv);

// Check arguments count. If argument is known by the application, 
// it will stored as a property of "program". Else, it will be added 
// in args array
//
// Today, there is 13 properties without any argument
// 
// Check if a known propertie exists


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let projectName = "banana";
let exec2 = require('child_process').exec;

if (program.args.length == 0) {
    if (program.new) {
        log.print("Creating a new project.")
        const { spawn } = require('child_process');
        const ls = spawn('git', ['clone', 'git@gitlab.com:dalvik/test-express.git']);
        log.print("Downloading source....")
        ls.stderr.on('close', (data) => {
            if (program.new === true) {
                rl.question('Project\'s name ? ', (answer) => {
                    projectName = answer;
                    exec2("mv ./test-express " + projectName, function (err, stdout, stderr) {
                        console.log(stdout);
                        console.log(err);
                    });
                    rl.close();
                })
            }
            else {
                exec2("mv ./test-express " + projectName, function (err, stdout, stderr) {
                    console.log(stdout);
                    console.log(err);
                });
            }
        });
    }
    else {
        exec.home();
    }
}
else {
    log.error("Unknow arguments");
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