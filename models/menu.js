const Sequelize = require('sequelize');
const connection = require('./sequelize');

class menu extends Sequelize.Model {}
menu.init(
  {
    id: {
      type: Sequelize.DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    id_restourant: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'menu',
  }
);

module.exports = menu;
