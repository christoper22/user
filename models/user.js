const Sequelize = require('sequelize');
const connection = require('./sequelize');

class User extends Sequelize.Model {}
User.init(
  {
    id: {
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    user_name: {
      type: Sequelize.DataTypes.STRING,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'user',
  }
);

module.exports = User;
