const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/posts", adminController.getAllPosts);
router.get("/posts/:id", adminController.getPostById);
router.get("/users", adminController.getAllUsers);

module.exports = router;
