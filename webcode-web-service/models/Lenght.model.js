const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const LenthSchema = new Schema(
  {
    length: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("length", LenthSchema);
