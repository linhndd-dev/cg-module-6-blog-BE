const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

router.get("/", verifyToken, postController.getMyPosts);
router.post("/", verifyToken, postController.createMyPost);
router.put("/:id", verifyToken, postController.editMyPost);
router.delete("/:id", verifyToken, postController.deleteMyPost);

module.exports = router;
