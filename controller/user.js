const { user, connection, messages } = require('../models');
const { message } = require('./schedule_message');

exports.getAllUser = async () => {
  const data = await user.findAll();
  return data;
};
exports.getUser = async (id) => {
  const data = await user.findOne({ where: { id } });
  return data;
};

exports.deleteUser = async (id) => {
  console.log(id);
  const data = await user.findOne({ where: { id } });
  await user.destroy({ where: { id } });
  return data;
};
exports.updateUser = async (id, body) => {
  const data = await user.findOne({ where: { id } });
  await data.update({ ...body });
  return data;
};

exports.createUser = async (body) => {
  const data = await user.create(body);
  return data;
};
exports.userBirthday = async () => {
  const data = await user.findAll();

  await Promise.all(
    data.map(async (user) => {
      await message(user);
    })
  );
};
exports.receiveMessage = async (bodies) => {
  const data = await messages.create({ message: bodies.message });
  return data;
};
