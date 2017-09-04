/*
 *   Write + endline
 */
exports.write = function (msg) {
    console.log(msg)
}

/*
 *   Simple endline
 */
exports.ln = function () {
    console.log("\n")
}

/*
 *  Rainbow writing
 */
exports.rainbow = function (msg) {
    let colors = require('colors');
    colors.setTheme({
        rainbow: 'rainbow',
    });
    console.log(colors.rainbow(msg));
};