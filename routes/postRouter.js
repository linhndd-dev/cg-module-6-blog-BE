const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

router.get("/guest", postController.getAllPublicPosts);
router.get("/:userId", verifyToken, postController.getAllPostsByUserId);
router.get("/:id", postController.getMyPostsById);
router.post("/:userId", verifyToken, postController.createMyPost);
router.put("/:userId/:id", verifyToken, postController.editMyPost);
router.delete("/:userId/:id", verifyToken, postController.deleteMyPost);
router.get("/search",verifyToken,postController.getPostsBySearch)

module.exports = router;
