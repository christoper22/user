var express = require('express');
const { getUser } = require('../controller/user');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    try {
      await connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    const data = await getUser();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
