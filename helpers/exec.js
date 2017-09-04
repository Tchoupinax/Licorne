//
let log = require('./log');
var singlelog = require('single-line-log').stdout;


//
exports.home = function () {
    let cursor = require('ansi')(process.stdout);

    let x = 0;
    let r = 0;
    let g = 0;
    let b = 0;
    let rgb;
    let couleur = "";
    setInterval(function () {
        x++;
        if (x < 255) {
            r = 255;
            g = x;
            b = 0;
        } else if (x > 255 && x < 510) {
            r = 510 - x;
            g = 255;
            b = 0;
        } else if (x > 510 && x < 765) {
            r = 0;
            g = 255;
            b = x - 510;
        } else if (x > 765 && x < 1020) {
            r = 0;
            g = 1020 - x;
            b = 255;
        } else if (x > 1020 && x < 1275) {
            r = x - 1020;
            g = 0;
            b = 255;
        } else if (x > 1275 && x < 1530) {
            r = 255;
            g = 0;
            b = 1530 - x;
        } else if (x > 1530) {
            x = 0;
        }
        rgb = [r, g, b];
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
    }, 5);
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