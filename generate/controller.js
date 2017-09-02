let write = require('../helpers/ecriture').write;
let ln = require('../helpers/ecriture').ln;

exports.generate = function(name, nomMethodes) {
    var fs = require('fs');
    var content = "";

    content = head(name);
    for (nameFonction in nomMethodes) {
        content += writeMethod(nomMethodes[nameFonction])
    }

    content += write("}")
    content += write("module.exports = " + name + "Controller")

    fs.writeFile("./" + name + "Controller.js", content, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

function head(name) {
    //
    var s = "";
    var numberStart = 3;
    //
    s += write("/*");
    for (var i = 0; i < numberStart / 2 - 1; i++) {
        s += write(" *");
    }
    s += " *    "
    var title = name + " controller"
    for (var j = 0; j < title.length; j++) {
        if (title[j + 1] == " ") {
            s += title[j].toUpperCase();
        } else if (title[j] == " ") {
            s += "\n *    ";
        } else {
            if (j == title.length - 1) {
                s += title[j].toUpperCase() + "\n"
            } else {
                s += title[j].toUpperCase() + "."
            }
        }
    }
    for (var i = numberStart / 2 + 1; i < numberStart; i++) {
        s += write(" *");
    }
    s += write(" */");
    s += write("class " + name + "Controller {");
    return s;
}

function writeMethod(name) {
    var s = "";
    let sautLigneAvant = 0;
    for (var i = 0; i < sautLigneAvant; i++) {
        s += ln()

    }
    s += write("    // ***********************")
    s += write("    // ***********************")
    s += write("    static " + name + "(req, res) {")
    s += write("         // What to do ... ?")
    s += write("    }")
    return s
}