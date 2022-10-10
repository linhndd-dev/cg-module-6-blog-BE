const express = require("express");
const tagController = require("../controllers/tagController");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

router.get("/", tagController.getAllTags);
router.put("/add/:postId", verifyToken, tagController.addNewTagToPost);
router.delete(
  "/remove/:postId/:tagId",
  verifyToken,
  tagController.removeTagFromPost
);

module.exports = router;
