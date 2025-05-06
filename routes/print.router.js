var express = require("express");
const Joi = require("joi");

const {
  printData,
  dowloadFile,
} = require("../controller/print/controller/print.controller");
var router = express.Router();

// get all MsSales
router.get("/", printData);
router.get("/download", dowloadFile);

module.exports = router;
