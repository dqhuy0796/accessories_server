"use strict";

var _test, _production;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var dotenv = require("dotenv");
dotenv.config();
module.exports = {
  development: {
    username: process.env.NODE_DATABASE_USERNAME,
    password: process.env.NODE_DATABASE_PASSWORD,
    database: process.env.NODE_DATABASE_NAME,
    host: process.env.NODE_DATABASE_HOST,
    port: process.env.NODE_DATABASE_PORT,
    dialect: process.env.NODE_DATABASE_DIALECT,
    query: {
      raw: true
    },
    timezone: "+07:00"
  },
  test: (_test = {
    database: "database_test",
    username: process.env.NODE_DATABASE_USERNAME,
    password: process.env.NODE_DATABASE_PASSWORD
  }, _defineProperty(_test, "database", process.env.NODE_DATABASE_NAME), _defineProperty(_test, "host", process.env.NODE_DATABASE_HOST), _defineProperty(_test, "port", process.env.NODE_DATABASE_PORT), _defineProperty(_test, "dialect", process.env.NODE_DATABASE_DIALECT), _defineProperty(_test, "query", {
    raw: true
  }), _defineProperty(_test, "timezone", "+07:00"), _test),
  production: (_production = {
    database: "database_production",
    username: process.env.NODE_DATABASE_USERNAME,
    password: process.env.NODE_DATABASE_PASSWORD
  }, _defineProperty(_production, "database", process.env.NODE_DATABASE_NAME), _defineProperty(_production, "host", process.env.NODE_DATABASE_HOST), _defineProperty(_production, "port", process.env.NODE_DATABASE_PORT), _defineProperty(_production, "dialect", process.env.NODE_DATABASE_DIALECT), _defineProperty(_production, "query", {
    raw: true
  }), _defineProperty(_production, "timezone", "+07:00"), _production)
};