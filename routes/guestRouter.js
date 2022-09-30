const express = require("express");
const router = express.Router();

const guestController = require("../controllers/guestController.js");

router.get("/", guestController.showAllPublicPosts);

module.exports = router;
