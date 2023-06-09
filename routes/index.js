var express = require('express');
var router = express.Router();
var usersRouter = require('./users.router');
var {
  printstar,
  fibbonaci,
  countData,
  reverseArray,
  minmax,
} = require('../controller/star');
const {
  importRestourant,
  getAllRestourant,
  elasticSearch,
} = require('../controller/restourant');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-resto', async function (req, res, next) {
  try {
    const data = await importRestourant();
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/get-all-resto', async function (req, res, next) {
  try {
    const data = await getAllRestourant(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.get('/elastic', async function (req, res, next) {
  try {
    const data = await elasticSearch();
    res.status(200).json({ data: 'success' });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/star', function (req, res, next) {
  const data = printstar();
  console.log(data.stringA);
  console.log(data.stringB);
  console.log(data.stringC);
  console.log(data.stringD);
  res.send(data);
});
router.get('/fibbonaci', function (req, res, next) {
  const data = fibbonaci(10);
  console.log(data);
  res.send(data);
});

router.get('/reverse', function (req, res, next) {
  const data = [1, 2, 3, 4, 5];
  const newData = reverseArray(data);
  console.log(newData);
  res.send(newData);
});

router.get('/count', function (req, res, next) {
  const sampleArray = ['a', 'a', 'b', 'b', 'b', 'b', 'c'];
  const data = countData(sampleArray);
  res.send(data);
});

router.get('/min-max', (req, res, next) => {
  const numbers = [2, 4, 9, 2, 0, 16, 24];
  const data = minmax(numbers);

  console.log(data.smallestNumber, data.largestNumber);
  res.send({ smallest: data.smallestNumber, largest: data.largestNumber });
});

router.use('/user', usersRouter);

module.exports = router;
