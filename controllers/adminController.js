const User = require("../models/User");
const Post = require("../models/Post");

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        success: true,
        users: users,
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

module.exports = adminController;
