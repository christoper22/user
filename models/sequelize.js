const Sequelize = require('sequelize');
const config = require('../config/config');

require('dotenv').config();

// connect db
const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
    port: config.port,
    dialectOptions: {
      requestTimeout: 3000 * 60 * 60,
      options: {
        requestTimeout: 3600000,
      },
    },
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
    // ssl: true,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

module.exports = connection;
