const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

router.get("/guest", postController.getAllPublicPosts);
router.get("/", verifyToken, postController.getAllPostsByUserId);
router.get("/:id", postController.getMyPostsById);
router.post("/", verifyToken, postController.createMyPost);
router.put("/:id", verifyToken, postController.editMyPost);
router.delete("/:id", verifyToken, postController.deleteMyPost);
router.get("/search",verifyToken,postController.getPostsBySearch)

module.exports = router;
