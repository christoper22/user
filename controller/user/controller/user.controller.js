const { getuser } = require('../repo/user.repo');

exports.getUserData = async () => {
  const data = await getuser();
  return data;
};
