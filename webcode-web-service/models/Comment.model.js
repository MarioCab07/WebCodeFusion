const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
//Modelo generado con ChatGPt
const CommentSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    responses: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

// Marcamos todo el arreglo de respuestas como no obligatorio
CommentSchema.path("responses").required(false);

module.exports = Mongoose.model("Comment", CommentSchema);
