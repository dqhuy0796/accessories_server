"use strict";

var jwt = require("jsonwebtoken");
var _require = require("../constant"),
  ResponseCode = _require.ResponseCode;
var verifyRefreshToken = function verifyRefreshToken(req, res, next) {
  console.log("verifyRefreshToken");
  var token = req.body["x-refresh-token"];
  if (!token) {
    res.status(401).json({
      code: ResponseCode.AUTHORIZATION_ERROR,
      message: "Access denied. No token provided."
    });
  }
  jwt.verify(token, process.env.NODE_REFRESH_TOKEN_SECRET_KEY, function (err, data) {
    if (err) {
      res.status(403).json({
        code: ResponseCode.AUTHORIZATION_ERROR,
        message: "Forbidden. Invalid access token."
      });
    }
    next();
  });
};
module.exports = verifyRefreshToken;