const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const problemModel = new Schema(
  {
    level: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    difficulty: {
      type: String,
      trim: true,
      required: true,
    },
    tag: {
      type: String,
      trim: true,
      required: true,
    },
    functioning: {
      type: String,
      trim: true,
      required: true,
    },
    example: {
      type: String,
      trim: true,
      required: true,
    },
    sintaxis: {
      type: String,
      trim: true,
      required: true,
    },
    problem: {
      type: String,
      trim: true,
      required: true,
    },
    posibleSolutions: {
      type: String,
      trim: true,
      required: true,
    },
    correctSolution: {
      type: String,
      trim: true,
      required: true,
    },
    explanation: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("problem", problemModel);
