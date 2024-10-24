// if you don't use https://render.com, you can delete this file

const { default: axios } = require("axios");
const ColorConsole = require("../../lib/color-console");
// const url = process.env.FRONTEND_URL; // Replace with your Render URL
const url = "https://y-social-fe.vercel.app"; // Replace with your Render URL
const interval = 30000; // Interval in milliseconds (30 seconds)

//Reloader Function
const reloadWebsite = async () => {
    try {
        ColorConsole.info(`Bắt đầu chặn server ngủ...`);
        await axios.get(url);
        ColorConsole.success(`Đã chặn server ngủ`);
    } catch (error) {
        ColorConsole.error(`Lỗi chặn server ngủ: ${error}`);
    }
}

setInterval(reloadWebsite, interval);
