const mongoose = require("mongoose");
const Joi = require("joi");

const QuizResultSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quiz_id: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

QuizResultSchema.statics.getAnalytics = async function () {
  let result = await this.aggregate([
    {
      $group: {
        _id: "$quiz_id",
        average_score: { $avg: "$score" },
        total_score: { $sum: "$score" },
        lowest_score: { $min: "$score" },
        highest_score: { $max: "$score" },
        total_submission: { $sum: 1 },
      },
    },
  ]);

  console.log("The Analytics results:", result);

  return result;
};

const QuizResult = mongoose.model("QuizResult", QuizResultSchema);

const validate = (quizResult) => {
  const schema = Joi.object({
    user_id: Joi.string().required().min(5),
    quiz_id: Joi.string().required().min(5),
    score: Joi.number().required().min(0).max(100),
  });

  return schema.validate(quizResult);
};

module.exports.validate = validate;
module.exports.QuizResult = QuizResult;
