const { QueueNames, receiveMessageFromQueue } = require("../utils/queue");
const { QuizResult } = require("../models/QuizResult");
const { QuizResultAnalytics } = require("../models/QuizResultAnalytics");
const { ConnectionNames, sendMessage } = require("../utils/websocket");

// the queue receiver handler for UpdateQuizResultAnalytics channel
receiveMessageFromQueue(QueueNames.UpdateQuizResultAnalytics, async () => {
  console.log("Message Received..", QueueNames.UpdateQuizResultAnalytics);

  const currentDate = new Date().toISOString();
  const result = await QuizResult.getAnalytics();

  if (result) {
    const data = result.map((item) => ({
      average_score: item.average_score,
      total_score: item.total_score,
      lowest_score: item.lowest_score,
      highest_score: item.highest_score,
      quiz_id: item._id,
      timestamp: currentDate,
    }));

    await QuizResultAnalytics.insertMany(data);

    sendMessage(ConnectionNames.NewQuizResultAnalytics, data);
  }
});
