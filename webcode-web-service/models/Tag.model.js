const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const TagSchema = new Schema(
  {
    tagName: {
      type: String,
      trim: true,
      required: true,
    },
    opening: {
      type: String,
      trim: true,
      required: true,
    },
    closing: {
      type: String,
      trim: true,
    },
    sintaxis: {
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Tag", TagSchema);
