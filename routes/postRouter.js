const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const auth = require("../middlewares/auth")

router.use(auth);
router.get("/:id",postController.getPosstById);
router.post("/:id",postController.createPost);

module.exports = router;
