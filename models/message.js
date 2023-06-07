const Sequelize = require('sequelize');
const connection = require('./sequelize');

class message extends Sequelize.Model {}
message.init(
  {
    id: {
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    message: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'message',
  }
);

module.exports = message;
