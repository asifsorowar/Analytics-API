const cron = require("node-cron");
const { QueueNames, sendToQueue } = require("../utils/queue");

// the cron for updating analytics
// will run the task every ten minute
cron.schedule("* 10 * * * *", () => {
  sendToQueue(
    QueueNames.UpdateQuizResultAnalytics,
    JSON.stringify("update-quiz-result-analytics")
  );
});
