const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PropertySchema = new Schema(
  {
    property: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    values: {
      type: String,
      trim: true,
      required: true,
    },
    sintaxis: {
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

module.exports = Mongoose.model("property", PropertySchema);
