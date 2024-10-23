const clc = require("cli-color");
const { formatDateTime } = require("../utils/format-date");

const badges = {
  error: {
    badge: clc.red.bold,
    text: clc.red,
    icon: '!'
  },
  info: {
    badge: clc.yellow.bold,
    text: clc.yellow,
    icon: 'i'
  },
  success: {
    badge: clc.green.bold,
    text: clc.green,
    icon: '✓',
  },
};

const ColorConsole = (type, message) => {
  const { badge, text, icon } = badges[type] || badges.info;
  console.log(badge(`${formatDateTime(new Date)} [${icon}]`), text(message));
};

ColorConsole.error = (message) => ColorConsole("error", message);
ColorConsole.info = (message) => ColorConsole("info", message);
ColorConsole.success = (message) => ColorConsole("success", message);

module.exports = ColorConsole;
