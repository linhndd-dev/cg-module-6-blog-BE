const Post = require("../models/Post");

const postController = {
  // GET ALL
  getMyPosts: async (req, res) => {
    try {
      let userId = req.userId;
      let posts = await Post.find({ author: userId });
      res.status(200).json({
        success: true,
        posts,
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  createMyPost: async (req, res) => {
    //Check missing required input
    const { title, content } = req.body;
    if (!title) {
      return res.status(400).json({
        sucess: false,
        message: "Title is required.",
      });
    }
    if (!content) {
      return res.status(400).json({
        sucess: false,
        message: "Content is required.",
      });
    }
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
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  editMyPost: async (req, res) => {},
};

module.exports = postController;
