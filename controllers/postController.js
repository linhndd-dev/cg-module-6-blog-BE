const Post = require("../models/Post");

const postController = {
  getMyPosts: async (req, res) => {
    try {
      let id = req.userId;
      let posts = await Post.find({ author: id });
      res.status(200).json({
        success: true,
        message: "Post retrieved successfully.",
        posts,
      });
    } catch {
      res.status(404).json({
        success: false,
        message: "Cannot find post.",
      });
    }
  },

  createMyPost: async (req, res) => {
    try {
      let post = req.body;
      let userId = req.userId;
      post.author = userId;
      await Post.create(post);
      res.status(200).json({
        success: true,
        message: "Post created successfully.",
        post,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Cannot find post.",
      });
    }
  },
};

module.exports = postController;
