const Post = require("../models/Post");

const guestController = {
  // GET ALL PUBLIC POST
  showAllPublicPosts: async (req, res) => {
    try {
      let posts = await Post.find({ accessModified: "Public" });
      return res.status(200).json({
        success: true,
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
};

module.exports = guestController;
