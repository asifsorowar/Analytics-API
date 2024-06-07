const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

require("./startup/config");
require("./startup/queue-server");
require("./startup/db");
require("./startup/socket-server")(server);
require("./startup/router")(app);
require("./startup/doc-swagger")(app);

port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log(
    `${process.env.NAME} - ${process.env.NODE_ENV}:` +
      ` is running on port ${port}.....`
  )
);

module.exports = server;
