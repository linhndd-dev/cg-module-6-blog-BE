const express = require("express");
const router = express();

const authRouter = require("./authRouter");
const postRouter = require("./postRouter");
const adminRouter = require("./adminRouter");

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/admin", adminRouter);

module.exports = router;
