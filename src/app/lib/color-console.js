const clc = require("cli-color");

const badges = {
    error: {
        badge: clc.red.bold,
        text: clc.red,
    },
    info: {
        badge: clc.yellow.bold,
        text: clc.yellow,
    },
    success: {
        badge: clc.green.bold,
        text: clc.green,
    },
};

const ColorConsole = (type, message) => {
    const { badge, text } = badges[type] || badges.info;
    console.log(badge(`[ ${type.toUpperCase()} ]:`), text(message));
};

ColorConsole.error = (message) => ColorConsole('error', message);
ColorConsole.info = (message) => ColorConsole('info', message);
ColorConsole.success = (message) => ColorConsole('success', message);

module.exports = ColorConsole;
