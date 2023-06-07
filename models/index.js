const messages = require('./message');
const connection = require('./sequelize');
const user = require('./user');

module.exports = {
  connection,
  user,
  messages,
};
