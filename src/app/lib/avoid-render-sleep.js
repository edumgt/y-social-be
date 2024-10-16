/* eslint-disable no-undef */
const { default: axios } = require("axios");

const url = process.env.FRONTEND_URL; // Replace with your Render URL
const interval = 30000; // Interval in milliseconds (30 seconds)

//Reloader Function
function reloadWebsite() {
    axios
        .get(url)
        .then((response) => {
            console.log(
                `Reloaded at ${new Date().toISOString()}: Status Code ${response.status
                }`
            );
        })
        .catch((error) => {
            console.error(
                `Error reloading at ${new Date().toISOString()}:`,
                error.message
            );
        });
}

setInterval(reloadWebsite, interval);
