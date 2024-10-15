/* eslint-disable no-undef */
require("dotenv").config();

const MongoDB = require("./src/app/utils/mongodb.utils");
const socket = require("./socket");
const ColorConsole = require("./src/app/lib/color-console");

const startServer = async () => {
  try {
    await MongoDB.connect(process.env.MONGODB_URI);
    ColorConsole.success("Connected to database successfully :)");

    const SOCKET_PORT = process.env.SOCKET_PORT;

    socket.listen(SOCKET_PORT, () => {
      ColorConsole.success(
        `Socket connected successfully on port ${SOCKET_PORT}`,
      );
      ColorConsole.success(
        `Swagger is running on: "http://localhost:${SOCKET_PORT}/api/v1/swagger"`,
      );
    });
  } catch (error) {
    ColorConsole.error(`Cannot connect to db :< ${error}`);
    process.exit(1);
  }
};

startServer();
