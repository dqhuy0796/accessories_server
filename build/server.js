"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _connectdb = _interopRequireDefault(require("./config/connectdb.js"));
var _web = _interopRequireDefault(require("./routes/web.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: true
}));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
(0, _web["default"])(app);
(0, _connectdb["default"])();
var port = process.env.NODE_SERVER_PORT || 9876;
app.listen(port);