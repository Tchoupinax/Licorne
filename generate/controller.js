let write = require('../helpers/ecriture').write;
let ln = require('../helpers/ecriture').ln;

/*
 * ===============================================================
 * ==== P U B L I C  =============================================
 * ===============================================================
 */
// Export the method which allow to create a model of controller
// in the specified file
exports.generate = function(name, file, force, nomMethodes) {
    var content = "";

    content = head(name);
    for (nameFonction in nomMethodes) {
        content += writeMethod(nomMethodes[nameFonction])
    }

    content += write("}")
    content += write("module.exports = " + name + "Controller")

    let fs = require('fs');
    let fileName = file + name + "Controller.js";
    // Check if file already exists, in this case we 
    // need use approval to overwrite it
    if (fs.existsSync(fileName)) {
        if (force) {
            fs.writeFileSync(fileName, content);
            return true;
        }
        return false;
    } else {
        fs.writeFileSync(fileName, content);
        return true;
    }
}

/*
 * ===============================================================
 * ==== P R I V A T E ============================================
 * ===============================================================
 */
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