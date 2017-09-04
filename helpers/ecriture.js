/*
 *   Write + endline
 */
exports.write = function (msg) {
    return (msg + "\n")
}

/*
 *   Simple endline
 */
exports.ln = function () {
    return ("\n")
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