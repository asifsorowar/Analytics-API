const { decodeToken } = require("../middleware/auth");
const { ROLE } = require("../utils/constant");

let io;

module.exports = (server) => {
  io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("new device connected");

    socket.on("disconnected", () => console.log("one device removed"));
  });

  io.use((socket, next) => {
    try {
      const auth = decodeToken(
        socket?.handshake?.headers?.authorization ??
          socket?.handshake?.headers?.Authorization
      );
      if (!auth) throw Error("Invalid token!");

      if (auth.role !== ROLE.ADMIN) throw Error("Access denied!");

      socket.auth = auth;

      next();
    } catch (error) {
      console.log("Error socket::", error.message);

      next(new Error("access denied!"));
    }
  });
};

const getClient = () => {
  return io;
};

module.exports.getClient = getClient;
