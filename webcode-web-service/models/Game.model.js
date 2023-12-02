const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const GameSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    puntuation: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Game", GameSchema);
