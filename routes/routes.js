const express = require("express");
const router = express();

const authRouter = require("./authRouter");
const postRouter = require("./postRouter");

router.use("/auth", authRouter);
router.use('/post', postRouter)
module.exports = router;
