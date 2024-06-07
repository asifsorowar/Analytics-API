const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const { QuizResult, validate } = require("../models/QuizResult");
const { QuizResultAnalytics } = require("../models/QuizResultAnalytics");

const { ConnectionNames, sendMessage } = require("../utils/websocket");
const {
  QueueNames,
  sendToQueue,
  receiveMessageFromQueue,
} = require("../utils/queue");
const cron = require("node-cron");

// the queue receiver handler for UpdateQuizResultAnalytics channel
receiveMessageFromQueue(QueueNames.UpdateQuizResultAnalytics, async () => {
  console.log("Message Received..");

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

/**
 * @swagger
 * /api/quiz-results:
 *   get:
 *    tag:
 *      -get-quiz-results
 *    summary: get all quiz results. Admin access required.
 */
router.get("/", [auth, admin], async (req, res) => {
  let { offset, limit } = req.query;
  offset = parseInt(offset) ? parseInt(offset) : 0;
  limit = parseInt(limit) ? parseInt(limit) : 100;

  let quizResults = await QuizResult.find()
    .skip(offset)
    .limit(limit)
    .sort("createdAt");

  console.log("The results:", quizResults);

  return res.status(200).send(quizResults);
});

router.post("/", [auth], async (req, res) => {
  const { error, value } = validate({ ...req.body, user_id: req.auth._id });
  if (error) return res.status(400).send(error.details[0].message);

  let quizResult = await QuizResult.findOne({
    user_id: value.user_id,
    quiz_id: value.quiz_id,
  });
  if (quizResult) return res.status(400).send("already submitted!");

  quizResult = new QuizResult(value);
  await quizResult.save();

  sendMessage(ConnectionNames.NewQuizResult, quizResult);

  return res.status(201).send(quizResult);
});

router.get("/analytics", [auth, admin], async (req, res) => {
  const result = await QuizResultAnalytics.find();

  return res.status(200).send(result);
});

// the cron for updating analytics
// will run the task every ten minute
cron.schedule("* 10 * * * *", () => {
  sendToQueue(
    QueueNames.UpdateQuizResultAnalytics,
    JSON.stringify("update-quiz-result-analytics")
  );
});

module.exports = router;
