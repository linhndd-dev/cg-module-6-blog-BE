const User = require("../models/User");
const Post = require("../models/Post");

const adminController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("author", ["username"]);
      return res.status(200).json({
        success: true,
        posts: posts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error. " + error.message,
      });
    }
  },

  getPostById: async (req, res) => {
    try {
      let id = req.params.id;
      let post = await Post.find({ _id: id }).populate("author", ["username"]);
      if (post) {
        res.status(200).json({
          post: post,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Post not found.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        users: users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error." + error.message,
      });
    }
  },
};

module.exports = adminController;
