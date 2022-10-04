const Post = require("../models/Post");

const postController = {
  // LẤY POST GÁN PUBLIC MÀ KHÔNG CÓ TOKEN
  getAllPublicPosts: async (req, res) => {
    try {
      let posts = await Post.find({ accessModified: "Public" })
        .sort({ createdAt: -1 })
      return res.status(200).json({
        posts: posts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error.",
      });
    }
  },
  // LẤY POST CỦA 1 USER CÓ ID
  getAllPostsByUserId: async (req, res) => {
    try {
      let userId = req.userId;
      let posts = await Post.find({ author: userId })
        .sort({ createdAt: -1 })
      res.status(200).json({
        posts: posts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  // CREATE A POST
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
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  // EDIT A POST
  editMyPost: async (req, res) => {
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
      let updatedPost = req.body;

      // Check for permission to update
      const postUpdateCondition = { _id: req.params.id, author: req.userId };

      updatedPost = await Post.findByIdAndUpdate(
        postUpdateCondition,
        updatedPost,
        { new: true }
      );

      // User not authorised to update post or post not found
      if (!updatedPost) {
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised.",
        });
      }
      res.json({
        success: true,
        message: "Post updated successfully.",
        post: updatedPost,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  // DELETE A POST
  deleteMyPost: async (req, res) => {
    try {
      const postDeleteCondition = { _id: req.params.id, author: req.userId };
      const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

      // User not authorised to update post or post not found
      if (!deletedPost) {
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised.",
        });
      }

      res.json({
        success: true,
        message: "Post deleted successfully.",
        post: deletedPost,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },
  getMyPostsById: async (req, res) => {
    try {
      let id = req.params.id;
      let posts = await Post.find({ _id: id }).populate("author");
      res.status(200).json({
        posts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },
  getPostsBySearch: async (req, res) => {
    const { searchQuery } = req.query;
    try {
      const title = new RegExp(searchQuery, "i");
      const posts = await Post.find({ title });
      res.json({
        posts,
      });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  },
};

module.exports = postController;
