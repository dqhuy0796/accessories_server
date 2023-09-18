"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _constant = require("../constant");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) { if (n.call(e, o)) return next.value = e[o], next.done = !1, next; } return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) { r.push(n); } return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) { "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); } }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/** CUSTOMER */

var handleLogin = function handleLogin(phoneNumber, password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var result, isValidPassword, defaultDeliveryAddress, accessToken, refreshToken, code, message;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].Customer.findOne({
                where: {
                  phoneNumber: phoneNumber
                },
                raw: true
              });
            case 3:
              result = _context.sent;
              if (!result) {
                resolve({
                  code: _constant.ResponseCode.AUTHENTICATION_ERROR,
                  message: "Incorrect phone number or password"
                });
              }
              isValidPassword = _bcryptjs["default"].compareSync(password, result.password);
              if (!isValidPassword) {
                resolve({
                  code: _constant.ResponseCode.AUTHENTICATION_ERROR,
                  message: "Incorrect phone number or password"
                });
              }
              delete result.password;
              _context.next = 10;
              return _models["default"].DeliveryAddress.findOne({
                where: {
                  customerId: result.id,
                  isDefault: true
                }
              });
            case 10:
              defaultDeliveryAddress = _context.sent;
              result.defaultDeliveryAddress = defaultDeliveryAddress;
              _context.next = 14;
              return handleGenerateAccessToken(result.id, result.phoneNumber);
            case 14:
              accessToken = _context.sent;
              _context.next = 17;
              return handleGenerateRefreshToken(result.id, result.phoneNumber);
            case 17:
              refreshToken = _context.sent;
              code = _constant.ResponseCode.SUCCESS;
              message = "Authenticate successfully. Welcome!";
              resolve({
                code: code,
                message: message,
                result: result,
                accessToken: accessToken,
                refreshToken: refreshToken
              });
              _context.next = 26;
              break;
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);
            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 23]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var handleRegister = function handleRegister(customer) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var isExistCustomer, hashedPassword;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return isExistPhone(customer.phoneNumber);
            case 3:
              isExistCustomer = _context2.sent;
              if (!isExistCustomer) {
                _context2.next = 8;
                break;
              }
              resolve({
                code: _constant.ResponseCode.DATABASE_ERROR,
                message: "Phone number already in use."
              });
              _context2.next = 12;
              break;
            case 8:
              hashedPassword = hashPassword(customer.password);
              _context2.next = 11;
              return _models["default"].Customer.create({
                password: hashedPassword,
                name: customer.name,
                birth: null,
                avatarUrl: null,
                phoneNumber: customer.phoneNumber,
                email: customer.email
              });
            case 11:
              resolve({
                code: _constant.ResponseCode.SUCCESS,
                message: "Register successfully. Welcome!"
              });
            case 12:
              _context2.next = 17;
              break;
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);
            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 14]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var handleChangePassword = function handleChangePassword(phoneNumber, password, newPassword) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var isExist, customer, isValidPassword, hashedPassword;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return isExistPhone(phoneNumber);
            case 3:
              isExist = _context3.sent;
              if (!isExist) {
                resolve({
                  code: _constant.ResponseCode.AUTHENTICATION_ERROR,
                  message: "Incorrect phone number or password"
                });
              }
              _context3.next = 7;
              return _models["default"].Customer.findOne({
                where: {
                  phoneNumber: phoneNumber
                },
                raw: true
              });
            case 7:
              customer = _context3.sent;
              if (!customer) {
                resolve({
                  code: _constant.ResponseCode.AUTHENTICATION_ERROR,
                  message: "Incorrect phone number or password"
                });
              }
              isValidPassword = _bcryptjs["default"].compareSync(password, customer.password);
              if (isValidPassword) {
                _context3.next = 14;
                break;
              }
              resolve({
                code: _constant.ResponseCode.AUTHENTICATION_ERROR,
                message: "Incorrect phone number or password"
              });
              _context3.next = 18;
              break;
            case 14:
              hashedPassword = hashPassword(newPassword);
              _context3.next = 17;
              return _models["default"].Customer.update({
                password: hashedPassword
              }, {
                where: {
                  phoneNumber: phoneNumber
                }
              });
            case 17:
              resolve({
                code: _constant.ResponseCode.SUCCESS,
                message: "Password has been changed."
              });
            case 18:
              _context3.next = 23;
              break;
            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](0);
              reject(_context3.t0);
            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 20]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var handleUpdateProfile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(customer) {
    var existedCustomer, updatedCustomer;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models["default"].Customer.findOne({
              where: {
                email: customer.email,
                phoneNumber: customer.phoneNumber
              }
            });
          case 3:
            existedCustomer = _context4.sent;
            if (existedCustomer) {
              _context4.next = 6;
              break;
            }
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "Invalid customer. Check again!"
            });
          case 6:
            _context4.next = 8;
            return _models["default"].Customer.update({
              name: customer.name,
              birth: customer.birth
            }, {
              where: {
                email: customer.email,
                phoneNumber: customer.phoneNumber
              }
            });
          case 8:
            _context4.next = 10;
            return _models["default"].Customer.findOne({
              attributes: {
                exclude: ["password"]
              },
              where: {
                email: customer.email,
                phoneNumber: customer.phoneNumber
              }
            });
          case 10:
            updatedCustomer = _context4.sent;
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Update customer successfully.",
              result: updatedCustomer
            });
          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;
          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function handleUpdateProfile(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

/** TOKEN */
var handleVerifyRefreshToken = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(refreshToken) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              _jsonwebtoken["default"].verify(refreshToken, process.env.NODE_REFRESH_TOKEN_SECRET_KEY, /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(err, data) {
                  var existedRefreshToken;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if (err) {
                            resolve({
                              code: _constant.ResponseCode.AUTHORIZATION_ERROR,
                              message: "Forbidden. Invalid refresh token."
                            });
                          }
                          _context5.next = 3;
                          return _models["default"].RefreshToken.findOne({
                            where: {
                              username: data.phoneNumber
                            }
                          });
                        case 3:
                          existedRefreshToken = _context5.sent;
                          if (!existedRefreshToken || refreshToken !== existedRefreshToken.token) {
                            resolve({
                              code: _constant.ResponseCode.AUTHORIZATION_ERROR,
                              message: "Forbidden. Invalid refresh token."
                            });
                          }
                          resolve({
                            code: _constant.ResponseCode.SUCCESS,
                            message: "Valid refresh token."
                          });
                        case 6:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));
                return function (_x9, _x10) {
                  return _ref6.apply(this, arguments);
                };
              }());
            }));
          case 4:
            _context6.prev = 4;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "An error occurred."
            });
          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 4]]);
  }));
  return function handleVerifyRefreshToken(_x8) {
    return _ref5.apply(this, arguments);
  };
}();
var handleRefreshTokens = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(refreshToken) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            return _context8.abrupt("return", new Promise(function (resolve, reject) {
              _jsonwebtoken["default"].verify(refreshToken, process.env.NODE_REFRESH_TOKEN_SECRET_KEY, /*#__PURE__*/function () {
                var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(err, data) {
                  var existedRefreshToken, newAccessToken, newRefreshToken, code, message;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          if (err) {
                            console.log(err, data);
                            resolve({
                              code: _constant.ResponseCode.AUTHORIZATION_ERROR,
                              message: "Forbidden. Invalid refresh token."
                            });
                          }
                          _context7.next = 3;
                          return _models["default"].RefreshToken.findOne({
                            where: {
                              username: data.phoneNumber
                            }
                          });
                        case 3:
                          existedRefreshToken = _context7.sent;
                          if (!existedRefreshToken || refreshToken !== existedRefreshToken.token) {
                            resolve({
                              code: _constant.ResponseCode.AUTHORIZATION_ERROR,
                              message: "Forbidden. Invalid refresh token.",
                              existedRefreshToken: existedRefreshToken
                            });
                          }
                          _context7.next = 7;
                          return handleGenerateAccessToken(data.id, data.phoneNumber);
                        case 7:
                          newAccessToken = _context7.sent;
                          _context7.next = 10;
                          return handleGenerateRefreshToken(data.id, data.phoneNumber);
                        case 10:
                          newRefreshToken = _context7.sent;
                          code = _constant.ResponseCode.SUCCESS;
                          message = "Authenticate successfully. Welcome!";
                          resolve({
                            code: code,
                            message: message,
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken
                          });
                        case 14:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));
                return function (_x12, _x13) {
                  return _ref8.apply(this, arguments);
                };
              }());
            }));
          case 4:
            _context8.prev = 4;
            _context8.t0 = _context8["catch"](0);
            console.error(_context8.t0);
            return _context8.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "An error occurred."
            });
          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 4]]);
  }));
  return function handleRefreshTokens(_x11) {
    return _ref7.apply(this, arguments);
  };
}();
var handleGenerateRefreshToken = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(id, phoneNumber) {
    var newRefreshToken, expirationDate, existedRefreshToken;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            newRefreshToken = _jsonwebtoken["default"].sign({
              time: Date(),
              id: id,
              phoneNumber: phoneNumber
            }, process.env.NODE_REFRESH_TOKEN_SECRET_KEY, {
              expiresIn: process.env.NODE_REFRESH_TOKEN_EXPIRES_IN
            });
            expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            _context9.next = 5;
            return _models["default"].RefreshToken.findOne({
              where: {
                username: phoneNumber
              }
            });
          case 5:
            existedRefreshToken = _context9.sent;
            if (existedRefreshToken) {
              _context9.next = 11;
              break;
            }
            _context9.next = 9;
            return _models["default"].RefreshToken.create({
              username: phoneNumber,
              token: newRefreshToken,
              expirationDate: expirationDate
            });
          case 9:
            _context9.next = 13;
            break;
          case 11:
            _context9.next = 13;
            return _models["default"].RefreshToken.update({
              token: newRefreshToken,
              expirationDate: expirationDate
            }, {
              where: {
                username: phoneNumber
              }
            });
          case 13:
            return _context9.abrupt("return", newRefreshToken);
          case 16:
            _context9.prev = 16;
            _context9.t0 = _context9["catch"](0);
            console.error(_context9.t0);
            throw new Error("An error occurred while generating a refresh token.");
          case 20:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 16]]);
  }));
  return function handleGenerateRefreshToken(_x14, _x15) {
    return _ref9.apply(this, arguments);
  };
}();
var handleGenerateAccessToken = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(id, phoneNumber) {
    var accessToken;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            accessToken = _jsonwebtoken["default"].sign({
              time: Date(),
              id: id,
              phoneNumber: phoneNumber
            }, process.env.NODE_ACCESS_TOKEN_SECRET_KEY, {
              expiresIn: process.env.NODE_ACCESS_TOKEN_EXPIRES_IN
            });
            return _context10.abrupt("return", accessToken);
          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function handleGenerateAccessToken(_x16, _x17) {
    return _ref10.apply(this, arguments);
  };
}();

/** SUPPORTER METHODS */

var isExistPhone = function isExistPhone(currentPhone) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var customer;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return _models["default"].Customer.findOne({
                where: {
                  phoneNumber: currentPhone
                }
              });
            case 3:
              customer = _context11.sent;
              if (customer) {
                resolve(true);
              } else {
                resolve(false);
              }
              _context11.next = 10;
              break;
            case 7:
              _context11.prev = 7;
              _context11.t0 = _context11["catch"](0);
              reject(_context11.t0);
            case 10:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 7]]);
    }));
    return function (_x18, _x19) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var hashPassword = function hashPassword(password) {
  var salt = _bcryptjs["default"].genSaltSync(10);
  return _bcryptjs["default"].hashSync(password, salt);
};
module.exports = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
  handleChangePassword: handleChangePassword,
  handleUpdateProfile: handleUpdateProfile,
  handleVerifyRefreshToken: handleVerifyRefreshToken,
  handleRefreshTokens: handleRefreshTokens
};