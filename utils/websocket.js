const { getClient } = require("../startup/socket-server");

const ConnectionNames = {
  NewQuizResult: "newQuizResult",
  NewQuizResultAnalytics: "newQuizResultAnalytics",
};

const sendMessage = (eventName, data = null, retried = 0) => {
  const io = getClient();

  if (!eventName) {
    console.log("eventName required!");

    return;
  }

  if (!io) {
    console.log("Websocket service not initialized!");

    if (retried < 3) {
      setTimeout(() => {
        sendMessage(eventName, data, retried + 1);
      }, 300);
    }

    return;
  }

  io.emit(eventName, data);
};

module.exports = { ConnectionNames, sendMessage };
