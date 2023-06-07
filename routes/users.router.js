var express = require('express');
const {
  getUser,
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
  receiveMessage,
} = require('../controller/user');
var router = express.Router();

// get all user
router.get('/', async function (req, res, next) {
  try {
    const data = await getAllUser();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// get user
router.get('/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const data = await getUser(id);
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// create user
router.post('/', async function (req, res, next) {
  try {
    const bodies = req.body;
    console.log(bodies);
    const data = await createUser(bodies);
    console.log(data);
    res.send({
      message: 'success create user',
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// delete user
router.delete('/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);
    console.log(data);
    res.send({
      message: 'success delete user',
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// update user
router.put('/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const bodies = req.body;
    const data = await updateUser(id, bodies);

    console.log(data);
    res.send({
      message: 'success update user',
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/message', async function (req, res, next) {
  try {
    const bodies = req.body;
    const data = receiveMessage(bodies);
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
