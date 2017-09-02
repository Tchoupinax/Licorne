/*
 *   Standard print
 */
exports.p = function(msg) {
    console.log("info : ".green + msg)
}

/*
 *   debug print
 */
exports.d = function(msg) {
    console.l("debug : ".blue + msg)
}

/*
 *   Standard print with gray message
 */
exports.pg = function(msg) {
    console.log("info : ".green + msg.gray)
}

/*
 *   Debug print with gray message
 */
exports.dg = function(msg) {
    console.log("debug : ".blue + msg.gray)
}

/*
 *   Print empty line
 */
exports.ln = function(msg) {
    console.log("\n")
}