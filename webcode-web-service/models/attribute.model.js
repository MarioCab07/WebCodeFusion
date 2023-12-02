const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const AttSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    meaning: {
      type: String,
      trim: true,
      required: true,
    },
    example: {
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

module.exports = Mongoose.model("Attribute", AttSchema);
