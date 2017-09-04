exports.rainbow = function (x) {
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
    return [r, g, b];
}