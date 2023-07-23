var express = require('express');
const Joi = require('joi');

const {
  getUserData,
} = require('../controller/user/controller/user.controller');
var router = express.Router();

// get all MsSales
router.get('/', getUserData);

module.exports = router;
