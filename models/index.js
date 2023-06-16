const menu = require('./menu');
const messages = require('./message');
const restourant = require('./restourant');
const connection = require('./sequelize');
const user = require('./user');

restourant.hasMany(menu, { as: 'menu', foreignKey: 'id_restourant' });
module.exports = {
  connection,
  restourant,
  menu,
  user,
  messages,
};
