const { user, connection } = require('../models');

exports.getAllUser = async () => {
  const data = await user.findAll();
  return data;
};
exports.getUser = async (id) => {
  const data = await user.findOne({ where: { id } });
  return data;
};

exports.deleteUser = async (id) => {
  const data = await user.destroy({ where: { id } });
  return data;
};
exports.updateUser = async (id, body) => {
  const data = await user.update({ ...body }, { where: { id } });
  return data;
};

exports.createUser = async (body) => {
  const data = await user.create(body);
  return data;
};
