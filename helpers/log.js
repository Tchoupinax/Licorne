/*
 *   Standard print
 */
exports.print = function (msg) {
    console.log("info : ".green + msg);
};

/*
 *   debug print
 */
exports.debug = function (msg) {
    console.log("debug : ".blue + msg);
};

/*
 *   debug print
 */
exports.error = function (msg) {
    console.log("error : ".red + msg);
};

/*
 *   Standard print with gray message
 */
exports.printgray = function (msg) {
    console.log("info : ".green + msg.gray);
};

/*
 *   Debug print with gray message
 */
exports.debuggray = function (msg) {
    console.log("debug : ".blue + msg.gray);
};

/*
 *   Print empty line
 */
exports.ln = function (msg) {
    console.log("\n");
};