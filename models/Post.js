const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      default: "need-user"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);