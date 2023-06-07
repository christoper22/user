const Sequelize = require('sequelize');
const connection = require('./sequelize');

class user extends Sequelize.Model {}
user.init(
  {
    id: {
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    first_name: {
      type: Sequelize.DataTypes.STRING,
    },
    last_name: {
      type: Sequelize.DataTypes.STRING,
    },
    birth_date: {
      type: Sequelize.DataTypes.DATEONLY,
    },
    location: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'user',
  }
);

module.exports = user;
