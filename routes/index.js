const express = require("express");
const router = express.Router();
const print = require("./print.router");

router.use("/print", print);

module.exports = router;
