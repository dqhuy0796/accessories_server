"use strict";

var Sequelize = require("sequelize");
var dotenv = require("dotenv");
dotenv.config();
var sequelize = new Sequelize(process.env.NODE_DATABASE_NAME, process.env.NODE_DATABASE_USERNAME, process.env.NODE_DATABASE_PASSWORD, {
  host: process.env.NODE_DATABASE_HOST,
  port: process.env.NODE_DATABASE_PORT,
  dialect: process.env.NODE_DATABASE_DIALECT
});
module.exports = sequelize;