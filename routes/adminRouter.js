const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/users", adminController.getAllUsers);
router.get("/posts", adminController.getAllPosts);

module.exports = router;
