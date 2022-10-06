const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const adminController = require("../controllers/adminController");

router.get("/posts/search", adminController.searchPostsByTitle);
router.get("/posts", adminController.getAllPosts);
router.delete("/posts/:id", adminController.deletePostById);
router.get("/users", adminController.getAllUsers);
router.put("/users/status/:id", adminController.setUserInactiveById);
router.get("/users/search", adminController.searchUsersByUsername);
router.get("/posts/:id", adminController.getPostById);

module.exports = router;
