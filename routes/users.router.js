var express = require('express');
const {
  getUser,
  getAllUser,
  createUser,
  deleteUser,
} = require('../controller/user');
var router = express.Router();

/* GET users listing. */
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

module.exports = router;
