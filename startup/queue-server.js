const amqplib = require("amqplib");

let connection = null;
let channel = null;

const connectToRabbitMQ = async () => {
  try {
    connection = await amqplib.connect(process.env.QUEUE_SERVER);
    channel = await connection.createChannel();

    console.log("Connected to RabbitMQ and channel created...");
  } catch (error) {
    console.error(
      "Could not connect to RabbitMQ or create channel:",
      error.message
    );
    if (connection) {
      await connection.close();
    }

    connection = null;
    channel = null;
  }
};

connectToRabbitMQ();

const getClient = () => {
  return [connection, channel];
};

module.exports = {
  getClient,
};
