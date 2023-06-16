const Sequelize = require('sequelize');
const connection = require('./sequelize');

class restourant extends Sequelize.Model {}
restourant.init(
  {
    id: {
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    balance: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'restourant',
  }
);

module.exports = restourant;
