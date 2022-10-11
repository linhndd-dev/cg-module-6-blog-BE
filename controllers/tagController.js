const Tag = require("../models/Tag");
const Post = require("../models/Post");

const tagController = {
  deleteTagIfZero: async (req, res) => {
    try {
      const tags = Tag.deleteMany({ postArray: [] });

      console.log("deleteTagIfZero", tags);
      return res.json({
        success: true,
        deletedTagsIfZero: tags,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  getAllTags: async (req, res) => {
    try {
      this.deleteTagIfZero;

      const tags = await Tag.find();

      console.log("getAllTags", tags);
      return res.json({
        success: true,
        tags,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  getAllPostsByTagId: async (req, res) => {
    try {
      const { id } = req.params;
      const tag = await Tag.findOne({ _id: id });
      console.log("getAllPostsByTagId", tag);
      return res.json({
        success: true,
        postArray: tag.postArray,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  addNewTagToPost: async (req, res) => {
    const { postId } = req.params;
    const { newTagName } = req.body;
    try {
      let tag = await Tag.findOne({ title: newTagName });

      if (tag) {
        return res.json({
          success: true,
          message: "Tag already exists.",
        });
      }

      const newTag = new Tag({
        title: newTagName,
      });
      await newTag.save();
      tag = newTag;

      const newPostArray = tag.postArray;
      const checkExistedPost = newPostArray.find((id) => id == postId);
      if (!checkExistedPost) {
        newPostArray.push(postId);
      }
      await Tag.updateOne({ title: newTagName }, { postArray: newPostArray });

      const post = await Post.findOne({ _id: postId });
      const newTagArray = post.tagArray;
      const checkExistedTag = newTagArray.find((id) => id == tag._id);
      if (!checkExistedTag) {
        newTagArray.push(tag._id);
      }
      await Post.updateOne({ _id: postId }, { tagArray: newTagArray });

      return res.json({
        success: true,
        message: "Tag added successfully.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  },

  removeTagFromPost: async (req, res) => {
    const { postId, tagId } = req.params;

    try {
      const post = await Post.findOne({ _id: postId });
      let newTagArray = post.tagArray;

      const checkExistedTag = newTagArray.find((id) => id == tagId);
      if (checkExistedTag) {
        newTagArray = newTagArray.filter((tag) => tag != tagId);
      }
      await Post.updateOne(
        { _id: postId },
        { tagArray: newTagArray },
        { new: true }
      );

      const tag = await Tag.findOne({ _id: tagId });
      let newPostArray = tag.postArray;
      const checkExistedPost = newPostArray.find((id) => id == postId);
      if (checkExistedPost) {
        newPostArray = newPostArray.filter((tag) => tag != postId);
      }
      await Tag.updateOne(
        { _id: tagId },
        { postArray: newPostArray },
        { new: true }
      );

      return res.json({
        success: true,
        message: "Tag removed successfully.",
        post,
        tag,
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

module.exports = tagController;
