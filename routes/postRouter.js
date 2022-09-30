const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const auth = require("../middlewares/auth")

router.use(auth);
router.get("/:idUser",postController.getAllPostByIdUser);
router.post("/:idUser",postController.createPost);

module.exports = router;
