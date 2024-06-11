const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const errors = require("../middleware/errors");

const auth = require("../routers/auth");
const users = require("../routers/users");
const quizResults = require("../routers/quizResults");

//initialize the queue handlers
require("../schedule-jobs/index");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/quiz-results", quizResults);

  app.use(errors);
};
