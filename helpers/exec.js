//
let log = require('./log');
let singlelog = require('single-line-log').stdout;
let cursor = require('ansi')(process.stdout);
let rainbow = require('./ecriture').rainbow;
let write = require('./ecriture').write;
let w = require('./ecriture');

//
exports.home = function () {

    rainbow('████████████████████████████████████████████████████████████████████████████████████████');
    rainbow('_ _                           ');
    rainbow('| (_)                          ');
    rainbow('| |_  ___ ___ _ __ _ __   ___ ');
    rainbow('| | |/ __/ _ \| \'__| \'_ \ / _ \\');
    rainbow('| | | (_| (_) |  |  | | | |  __/');
    rainbow('|_|_|\___\___/|_|  |_| |_|\___|');
    log.ln();


    rainbow("Commands :");
    w.ln();
    write("\t version");
    write("\t new [project-name]");
}
//
exports.new = function () {
    let size = 40;
    let direction = true;
    log.p("Création d'un nouveau project en cours ...")
    let left = "╢";
    let right = "╟";
    let empty = ' ';
    let middle = '░';
    let filled = '█';
    let display = [left];
    for (var i = 0; i < size; i++) {
        display.push(empty);
    }
    display.push(right);
    let string = "LICORNE"
    let j = 1
    display[1] = filled;

}








/*

etInterval(function () {
        rgb = rainbow(x);
        for (var p = 0; p < 3; p++) {
            if (parseInt(rgb[p]) < 10) {
                couleur += "0" + rgb[p].toString(16);
            }
            else if (parseInt(rgb[p]) < 16) {
                couleur += "0" + rgb[p].toString(16);
            }
            else {
                couleur += rgb[p].toString(16);
            }
        }

        cursor
            .hex("#" + couleur)

        singlelog("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ \n       L.I.C.O.R.N.E \n░░░░░░░░░░░░░░░░░░░░░░░░░░░░░");
        couleur = ""
        x++;
    }, 1);



    */