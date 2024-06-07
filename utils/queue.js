const { getClient } = require("../startup/queue-server");

const QueueNames = {
  UpdateQuizResultAnalytics: "update_quiz_result_analytics",
};

const sendToQueue = (queueName, message) => {
  const [connection, channel] = getClient();

  if (!message || typeof message !== "string") {
    console.log("message required and must be string...");
    return;
  }

  if (!connection) {
    console.log("Queue service not initialized!");
    return;
  }

  channel.assertQueue(queueName, {
    durable: false,
  });
  channel.sendToQueue(queueName, Buffer.from(message));
};

const receiveMessageFromQueue = async (
  queueName,
  cb = () => null,
  retried = 0
) => {
  const [connection, channel] = getClient();

  if (!connection) {
    console.log("Queue service not initialized!");

    if (retried < 3) {
      setTimeout(() => {
        receiveMessageFromQueue(queueName, cb, retried + 1);
      }, 300);
    }

    return;
  }

  console.log(`Queue receiver service initialized for ${queueName}....`);

  channel.assertQueue(queueName, {
    durable: false,
  });

  channel.consume(queueName, (message) => {
    channel.ack(message);

    cb(message.content.toString());
  });
};

module.exports = { QueueNames, sendToQueue, receiveMessageFromQueue };
