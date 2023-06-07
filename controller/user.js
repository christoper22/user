const { user, connection } = require('../models');

exports.getUser = async () => {
  //   try {
  //     await connection.authenticate();
  //     console.log('Connection has been established successfully.');
  //   } catch (error) {
  //     console.error('Unable to connect to the database:', error);
  //   }
  const data = await user.findAll();
  return data;
};
