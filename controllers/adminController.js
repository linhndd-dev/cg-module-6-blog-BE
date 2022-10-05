const User = require("../models/User");
const Post = require("../models/Post");

const adminController = {
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
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
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
  searchUsersByUsername: async (req,res) => {
    const {searchQuery} = req.query;
    console.log(searchQuery);
    try {
      const username = new RegExp(searchQuery, "i");
      let users = await User.find({username}).sort({ createdAt: -1 })
      res.json({
        users: users
      });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  }
};

module.exports = adminController;
