const { User } = require('../../../models');

exports.getuser = async () => {
  return await User.findAll();
};
