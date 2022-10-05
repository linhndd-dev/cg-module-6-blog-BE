const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/image-blog-dbb1d.appspot.com/o/files%2FMinimalist.png?alt=media&token=2eaaa696-d4cd-4775-85af-a1aa016ace58",
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserSchema);
