const mongoose = require("mongoose");

const QuizResultAnalyticsSchema = new mongoose.Schema({
  quiz_id: {
    type: String,
    required: true,
  },
  average_score: {
    type: Number,
  },
  total_score: {
    type: Number,
  },
  lowest_score: {
    type: Number,
  },
  highest_score: {
    type: Number,
  },
  total_submission: {
    type: Number,
  },
  timestamp: {
    type: Date,
  },
});

const QuizResultAnalytics = mongoose.model(
  "QuizResultAnalytic",
  QuizResultAnalyticsSchema
);

module.exports.QuizResultAnalytics = QuizResultAnalytics;
