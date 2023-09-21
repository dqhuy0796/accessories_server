"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _models = _interopRequireDefault(require("../models"));
var _database = _interopRequireDefault(require("../config/database"));
var _constant = require("../constant");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) { if (n.call(e, o)) return next.value = e[o], next.done = !1, next; } return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) { r.push(n); } return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) { "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); } }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = require("sequelize"),
  Op = _require.Op;
var handleGetRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(role_id) {
    var roles;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models["default"].Role.findAll({
              where: {
                id: _defineProperty({}, Op.gt, role_id !== null && role_id !== void 0 ? role_id : 5)
              }
            });
          case 3:
            roles = _context.sent;
            if (!(roles.length > 0)) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get roles successfully",
              result: roles
            });
          case 6:
            return _context.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get roles failure"
            });
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: _context.t0.message || _context.t0
            });
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function handleGetRoles(_x) {
    return _ref.apply(this, arguments);
  };
}();
var handleCountUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(role_id) {
    var roleId, countByRole;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            roleId = role_id && !_lodash["default"].isNaN(role_id) ? role_id : 2;
            _context2.next = 4;
            return _models["default"].CountRoleUserView.findAll({
              where: {
                id: _defineProperty({}, Op.gt, roleId)
              }
            });
          case 4:
            countByRole = _context2.sent;
            if (!countByRole) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get users count by role successfully",
              result: countByRole
            });
          case 7:
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get users count by role failure"
            });
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: _context2.t0.message || _context2.t0
            });
          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function handleCountUsers(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var handleGetUsers = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(role_id, slug, page) {
    var currentPage, _Number, _yield$db$UserView$fi, _count, _rows, roleId, _yield$db$UserView$fi2, count, rows;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            currentPage = page && !_lodash["default"].isNaN(page) ? page : 1;
            if (!(slug !== "all")) {
              _context3.next = 11;
              break;
            }
            _context3.next = 5;
            return _models["default"].UserView.findAndCountAll({
              where: {
                role_slug: slug,
                role_id: _defineProperty({}, Op.gt, (_Number = Number(role_id)) !== null && _Number !== void 0 ? _Number : 2)
              },
              attributes: {
                exclude: ["password", "role_slug"]
              },
              order: [["id", "DESC"]],
              limit: 12,
              offset: (currentPage - 1) * 12
            });
          case 5:
            _yield$db$UserView$fi = _context3.sent;
            _count = _yield$db$UserView$fi.count;
            _rows = _yield$db$UserView$fi.rows;
            if (!_rows) {
              _context3.next = 10;
              break;
            }
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Get user(s) successfully.",
              page: currentPage,
              total_pages: Math.ceil(_count / 12),
              total_results: _count,
              result: _rows
            });
          case 10:
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Get user(s) failure."
            });
          case 11:
            roleId = role_id && !_lodash["default"].isNaN(role_id) ? role_id : 2;
            _context3.next = 14;
            return _models["default"].UserView.findAndCountAll({
              where: {
                role_id: _defineProperty({}, Op.gt, roleId)
              },
              attributes: {
                exclude: ["password", "role_slug"]
              },
              order: [["id", "DESC"]],
              limit: 12,
              offset: (currentPage - 1) * 12
            });
          case 14:
            _yield$db$UserView$fi2 = _context3.sent;
            count = _yield$db$UserView$fi2.count;
            rows = _yield$db$UserView$fi2.rows;
            if (!rows) {
              _context3.next = 19;
              break;
            }
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Get user(s) successfully.",
              page: currentPage,
              total_pages: Math.ceil(count / 12),
              total_results: count,
              result: rows
            });
          case 19:
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Get user(s) failure."
            });
          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: _context3.t0.message || _context3.t0
            });
          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function handleGetUsers(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var handleGetUserByUsername = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(username) {
    var user, avatar;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models["default"].UserView.findOne({
              attributes: {
                exclude: ["avatar_url"]
              },
              where: _defineProperty({}, Op.or, [{
                phone_number: username
              }, {
                email: username
              }])
            });
          case 3:
            user = _context4.sent;
            if (!user) {
              _context4.next = 9;
              break;
            }
            _context4.next = 7;
            return _models["default"].Image.findOne({
              attributes: {
                exclude: ["id", "target_id", "target_type"]
              },
              where: {
                target_id: user.id,
                target_type: "avatar"
              }
            });
          case 7:
            avatar = _context4.sent;
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Get user successfully.",
              result: _objectSpread(_objectSpread({}, user), {}, {
                avatar: avatar
              })
            });
          case 9:
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid user."
            });
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: _context4.t0.message || _context4.t0
            });
          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return function handleGetUserByUsername(_x6) {
    return _ref4.apply(this, arguments);
  };
}();
var handleCreateUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(user) {
    var t, _user$name, _user$birth, _user$bio, _user$role_id, existedUser, hashedPassword, convertedAddress, createdUser;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            t = _database["default"].transaction();
            _context5.prev = 1;
            _context5.next = 4;
            return _models["default"].User.findOne({
              where: _defineProperty({}, Op.or, [{
                phone_number: user.phone_number
              }, {
                email: user.email
              }])
            });
          case 4:
            existedUser = _context5.sent;
            if (!existedUser) {
              _context5.next = 7;
              break;
            }
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Phone number or email already in use."
            });
          case 7:
            hashedPassword = hashPassword(user.password);
            convertedAddress = handleConvertAddressType(user.address);
            _context5.next = 11;
            return _models["default"].User.create({
              phone_number: user.phone_number,
              email: user.email,
              password: hashedPassword,
              name: (_user$name = user.name) !== null && _user$name !== void 0 ? _user$name : user.phone_number,
              birth: (_user$birth = user.birth) !== null && _user$birth !== void 0 ? _user$birth : null,
              bio: (_user$bio = user.bio) !== null && _user$bio !== void 0 ? _user$bio : null,
              address: convertedAddress,
              last_login: null,
              role_id: (_user$role_id = user.role_id) !== null && _user$role_id !== void 0 ? _user$role_id : 3
            });
          case 11:
            createdUser = _context5.sent;
            if (!createdUser) {
              _context5.next = 17;
              break;
            }
            if (!user.avatar) {
              _context5.next = 16;
              break;
            }
            _context5.next = 16;
            return _models["default"].Image.create({
              target_id: createdUser.id,
              target_type: "avatar",
              public_id: user.avatar.public_id,
              secure_url: user.avatar.secure_url,
              thumbnail_url: user.avatar.thumbnail_url
            });
          case 16:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create user successfully."
            });
          case 17:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Create user failure."
            });
          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: _context5.t0.message || _context5.t0
            });
          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 20]]);
  }));
  return function handleCreateUser(_x7) {
    return _ref5.apply(this, arguments);
  };
}();
var handleUpdateUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(user) {
    var t, existedUser, convertedAddress, _yield$db$Image$findO, _yield$db$Image$findO2, image, created;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _database["default"].transaction();
          case 2:
            t = _context6.sent;
            _context6.prev = 3;
            _context6.next = 6;
            return _models["default"].User.findOne({
              where: {
                phone_number: user.phone_number,
                email: user.email
              }
            });
          case 6:
            existedUser = _context6.sent;
            if (!existedUser) {
              _context6.next = 23;
              break;
            }
            convertedAddress = handleConvertAddressType(user.address);
            _models["default"].User.update({
              name: user.name,
              birth: user.birth,
              bio: user.bio,
              address: convertedAddress
            }, {
              where: {
                phone_number: user.phone_number,
                email: user.email
              },
              transaction: t
            });
            if (!user.avatar) {
              _context6.next = 20;
              break;
            }
            _context6.next = 13;
            return _models["default"].Image.findOrCreate({
              where: {
                target_id: existedUser.id,
                target_type: "avatar"
              },
              defaults: _objectSpread({
                target_id: existedUser.id,
                target_type: "avatar"
              }, user.avatar),
              transaction: t
            });
          case 13:
            _yield$db$Image$findO = _context6.sent;
            _yield$db$Image$findO2 = _slicedToArray(_yield$db$Image$findO, 2);
            image = _yield$db$Image$findO2[0];
            created = _yield$db$Image$findO2[1];
            if (created) {
              _context6.next = 20;
              break;
            }
            _context6.next = 20;
            return _models["default"].Image.update({
              public_id: user.avatar.public_id,
              secure_url: user.avatar.secure_url,
              thumbnail_url: user.avatar.thumbnail_url
            }, {
              where: {
                target_id: existedUser.id,
                target_type: "avatar"
              },
              transaction: t
            });
          case 20:
            _context6.next = 22;
            return t.commit();
          case 22:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update user successfully."
            });
          case 23:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid user account."
            });
          case 26:
            _context6.prev = 26;
            _context6.t0 = _context6["catch"](3);
            _context6.next = 30;
            return t.rollback();
          case 30:
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: _context6.t0.message || _context6.t0
            });
          case 32:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 26]]);
  }));
  return function handleUpdateUser(_x8) {
    return _ref6.apply(this, arguments);
  };
}();
var handleDeleteUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(user) {
    var existed;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _models["default"].User.findOne({
              where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email
              }
            });
          case 3:
            existed = _context7.sent;
            if (existed) {
              _context7.next = 6;
              break;
            }
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Invalid user account."
            });
          case 6:
            _context7.next = 8;
            return _models["default"].User.destroy({
              where: {
                id: user.id,
                phone_number: user.phone_number,
                email: user.email
              }
            });
          case 8:
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Delete user successfully."
            });
          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: _context7.t0.message || _context7.t0
            });
          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function handleDeleteUser(_x9) {
    return _ref7.apply(this, arguments);
  };
}();

/** SUPPORTER METHODS */

var isNumeric = function isNumeric(input) {
  return !isNaN(input);
};
var handleConvertAddressType = function handleConvertAddressType(address) {
  var values = [address.location, address.ward, address.district, address.province];
  return values.join(" - ");
};
var hashPassword = function hashPassword(password) {
  var salt = _bcryptjs["default"].genSaltSync(10);
  return _bcryptjs["default"].hashSync(password, salt);
};
module.exports = {
  handleGetRoles: handleGetRoles,
  handleCountUsers: handleCountUsers,
  handleGetUsers: handleGetUsers,
  handleGetUserByUsername: handleGetUserByUsername,
  handleCreateUser: handleCreateUser,
  handleUpdateUser: handleUpdateUser,
  handleDeleteUser: handleDeleteUser
};