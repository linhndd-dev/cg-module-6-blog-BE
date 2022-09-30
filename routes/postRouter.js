const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.use(auth);
router.get("/", postController.getMyPosts);
router.post("/", postController.createMyPost);

module.exports = router;
