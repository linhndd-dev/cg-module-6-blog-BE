const express = require("express");
const router = express();

const authRouter = require("./authRouter");
const postRouter = require("./postRouter");
const guestRouter = require("./guestRouter");

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/guest", guestRouter);
module.exports = router;
