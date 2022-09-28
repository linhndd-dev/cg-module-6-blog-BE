const express = require("express");
const router = express();

const authRouter = require("./authRouter");

router.use("/auth", authRouter);

module.exports = router;
