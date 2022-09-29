const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
      type: String,
      require: true
    },
    summary: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      require: true
    },
    avatar: {
      type: String
    },
    accessModified: {
      type: String,
      default: "Public"
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  });

module.exports = mongoose.model("posts", PostSchema);
