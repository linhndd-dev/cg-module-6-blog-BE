const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const adminController = require("../controllers/adminController");

router.get("/posts", verifyToken, adminController.getAllPosts);
router.delete("/posts/:id", verifyToken, adminController.deletePostById);
router.get("/users", verifyToken, adminController.getAllUsers);
router.get("/users/search", verifyToken, adminController.searchUsersByUsername);

module.exports = router;
