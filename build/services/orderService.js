"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _models = _interopRequireDefault(require("../models"));
var _constant = require("../constant");
var _database = _interopRequireDefault(require("../config/database"));
var _lodash = _interopRequireDefault(require("lodash"));
var _excluded = ["id", "shipping_address_id", "payment_method_id", "status_id"],
  _excluded2 = ["id", "shipping_address_id", "payment_method_id", "status_id"],
  _excluded3 = ["id", "shipping_address_id", "payment_method_id", "status_id"],
  _excluded4 = ["id", "shipping_address_id", "payment_method_id", "status_id"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) { if (n.call(e, o)) return next.value = e[o], next.done = !1, next; } return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) { r.push(n); } return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) { "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); } }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var handleGetPaymentMethods = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var paymentMethods;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models["default"].PaymentMethod.findAll();
          case 3:
            paymentMethods = _context.sent;
            if (!paymentMethods) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "get payment methods successfully",
              result: paymentMethods
            });
          case 6:
            return _context.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "get payment methods failure"
            });
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", {
              code: _constant.ResponseCode.INTERNAL_SERVER_ERROR,
              message: "Error occurs, check again!"
            });
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function handleGetPaymentMethods() {
    return _ref.apply(this, arguments);
  };
}();
var handleGetAllOrders = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(status_id, page) {
    var t, currentPage, _yield$db$Order$findA, count, orders, _yield$Promise$all, _yield$Promise$all2, orderDetails, shippingAddresses, paymentMethods, orderStatuses, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            t = _database["default"].transaction();
            currentPage = page && !_lodash["default"].isNaN(page) ? page : 1;
            _context2.prev = 2;
            _context2.next = 5;
            return _models["default"].Order.findAndCountAll({
              order: [["id", "DESC"]],
              limit: 12,
              offset: (currentPage - 1) * 12
            });
          case 5:
            _yield$db$Order$findA = _context2.sent;
            count = _yield$db$Order$findA.count;
            orders = _yield$db$Order$findA.rows;
            if (!(count > 0)) {
              _context2.next = 19;
              break;
            }
            _context2.next = 11;
            return Promise.all([_models["default"].OrderDetail.findAll({
              where: {
                order_uuid: orders.map(function (order) {
                  return order.order_uuid;
                })
              }
            }), _models["default"].ShippingAddress.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.shipping_address_id;
                })
              }
            }), _models["default"].PaymentMethod.findAll(), _models["default"].Status.findAll()]);
          case 11:
            _yield$Promise$all = _context2.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 4);
            orderDetails = _yield$Promise$all2[0];
            shippingAddresses = _yield$Promise$all2[1];
            paymentMethods = _yield$Promise$all2[2];
            orderStatuses = _yield$Promise$all2[3];
            result = orders.map(function (order) {
              var id = order.id,
                shipping_address_id = order.shipping_address_id,
                payment_method_id = order.payment_method_id,
                status_id = order.status_id,
                rest = _objectWithoutProperties(order, _excluded);
              var orderStatus = orderStatuses.find(function (status) {
                return status.id === status_id;
              });
              var orderDetail = orderDetails.filter(function (detail) {
                return detail.order_uuid === order.order_uuid;
              });
              var shippingAddress = shippingAddresses.find(function (address) {
                return address.id === shipping_address_id;
              });
              var paymentMethod = paymentMethods.find(function (method) {
                return method.id === payment_method_id;
              });
              return _objectSpread(_objectSpread({}, rest), {}, {
                status: orderStatus,
                items: orderDetail,
                shipping_address: shippingAddress,
                payment_method: paymentMethod
              });
            });
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders successfully",
              page: currentPage,
              total_pages: Math.ceil(count / 12),
              total_results: count,
              result: result
            });
          case 19:
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the orders."
            });
          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 22]]);
  }));
  return function handleGetAllOrders(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var handleGetOneOrderByUuid = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(order_uuid) {
    var t, order, id, shipping_address_id, payment_method_id, status_id, rest, _yield$Promise$all3, _yield$Promise$all4, order_status, order_details, shipping_address, payment_method, history;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            t = _database["default"].transaction();
            _context3.prev = 1;
            _context3.next = 4;
            return _models["default"].Order.findOne({
              where: {
                order_uuid: order_uuid
              }
            });
          case 4:
            order = _context3.sent;
            if (!order) {
              _context3.next = 17;
              break;
            }
            id = order.id, shipping_address_id = order.shipping_address_id, payment_method_id = order.payment_method_id, status_id = order.status_id, rest = _objectWithoutProperties(order, _excluded2);
            _context3.next = 9;
            return Promise.all([_models["default"].Status.findOne({
              where: {
                id: status_id
              }
            }), _models["default"].OrderDetail.findAll({
              where: {
                order_uuid: order_uuid
              }
            }), _models["default"].ShippingAddress.findOne({
              where: {
                id: shipping_address_id
              }
            }), _models["default"].PaymentMethod.findOne({
              where: {
                id: payment_method_id
              }
            }), _models["default"].HistoryOrderUpdateStatusView.findAll({
              where: {
                order_uuid: order_uuid
              }
            })]);
          case 9:
            _yield$Promise$all3 = _context3.sent;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 5);
            order_status = _yield$Promise$all4[0];
            order_details = _yield$Promise$all4[1];
            shipping_address = _yield$Promise$all4[2];
            payment_method = _yield$Promise$all4[3];
            history = _yield$Promise$all4[4];
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved order ".concat(order_uuid, " successfully"),
              result: _objectSpread(_objectSpread({}, rest), {}, {
                status: order_status,
                items: order_details,
                shipping_address: shipping_address,
                payment_method: payment_method,
                history: history
              })
            });
          case 17:
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Order ".concat(order_uuid, " not found.")
            });
          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the order."
            });
          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 20]]);
  }));
  return function handleGetOneOrderByUuid(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var handleGetOrdersByUuids = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(encodedUuids) {
    var t, decodedUuids, uuids, orders, _yield$Promise$all5, _yield$Promise$all6, orderDetails, orderStatuses, shippingAddresses, paymentMethods, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            t = _database["default"].transaction();
            _context4.prev = 1;
            decodedUuids = decodeURIComponent(encodedUuids);
            if (!_lodash["default"].isEmpty(decodedUuids)) {
              _context4.next = 5;
              break;
            }
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 5:
            uuids = decodedUuids.split(",");
            _context4.next = 8;
            return _models["default"].Order.findAll({
              where: {
                order_uuid: uuids
              }
            });
          case 8:
            orders = _context4.sent;
            if (!(orders.length > 0)) {
              _context4.next = 20;
              break;
            }
            _context4.next = 12;
            return Promise.all([_models["default"].OrderDetail.findAll({
              where: {
                order_uuid: uuids
              }
            }), _models["default"].Status.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.status_id;
                })
              }
            }), _models["default"].ShippingAddress.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.shipping_address_id;
                })
              }
            }), _models["default"].PaymentMethod.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.payment_method_id;
                })
              }
            })]);
          case 12:
            _yield$Promise$all5 = _context4.sent;
            _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 4);
            orderDetails = _yield$Promise$all6[0];
            orderStatuses = _yield$Promise$all6[1];
            shippingAddresses = _yield$Promise$all6[2];
            paymentMethods = _yield$Promise$all6[3];
            result = orders.map(function (order) {
              var id = order.id,
                shipping_address_id = order.shipping_address_id,
                payment_method_id = order.payment_method_id,
                status_id = order.status_id,
                rest = _objectWithoutProperties(order, _excluded3);
              var orderStatus = orderStatuses.find(function (status) {
                return status.id === status_id;
              });
              var orderDetail = orderDetails.filter(function (detail) {
                return detail.order_uuid === order.order_uuid;
              });
              var shippingAddress = shippingAddresses.find(function (address) {
                return address.id === shipping_address_id;
              });
              var paymentMethod = paymentMethods.find(function (method) {
                return method.id === payment_method_id;
              });
              return _objectSpread(_objectSpread({}, rest), {}, {
                status: orderStatus,
                items: orderDetail,
                shipping_address: shippingAddress,
                payment_method: paymentMethod
              });
            });
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders successfully",
              result: result
            });
          case 20:
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            return _context4.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the orders."
            });
          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 23]]);
  }));
  return function handleGetOrdersByUuids(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var handleGetOrdersByUserPhoneNumber = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(phone_number) {
    var t, user, orders, _yield$Promise$all7, _yield$Promise$all8, orderDetails, orderStatuses, shippingAddresses, paymentMethods, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            t = _database["default"].transaction();
            _context5.prev = 1;
            _context5.next = 4;
            return _models["default"].User.findOne({
              where: {
                phone_number: phone_number
              }
            });
          case 4:
            user = _context5.sent;
            if (!user) {
              _context5.next = 20;
              break;
            }
            _context5.next = 8;
            return _models["default"].Order.findAll({
              where: {
                customer_phone_number: user.phone_number
              }
            });
          case 8:
            orders = _context5.sent;
            if (!(orders.length > 0)) {
              _context5.next = 20;
              break;
            }
            _context5.next = 12;
            return Promise.all([_models["default"].OrderDetail.findAll({
              where: {
                order_uuid: orders.map(function (order) {
                  return order.order_uuid;
                })
              }
            }), _models["default"].Status.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.status_id;
                })
              }
            }), _models["default"].ShippingAddress.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.shipping_address_id;
                })
              }
            }), _models["default"].PaymentMethod.findAll({
              where: {
                id: orders.map(function (order) {
                  return order.payment_method_id;
                })
              }
            })]);
          case 12:
            _yield$Promise$all7 = _context5.sent;
            _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 4);
            orderDetails = _yield$Promise$all8[0];
            orderStatuses = _yield$Promise$all8[1];
            shippingAddresses = _yield$Promise$all8[2];
            paymentMethods = _yield$Promise$all8[3];
            result = orders.map(function (order) {
              var id = order.id,
                shipping_address_id = order.shipping_address_id,
                payment_method_id = order.payment_method_id,
                status_id = order.status_id,
                rest = _objectWithoutProperties(order, _excluded4);
              var orderDetail = orderDetails.filter(function (detail) {
                return detail.order_uuid === order.order_uuid;
              });
              var orderStatus = orderStatuses.find(function (status) {
                return status.id === status_id;
              });
              var shippingAddress = shippingAddresses.find(function (address) {
                return address.id === shipping_address_id;
              });
              var paymentMethod = paymentMethods.find(function (method) {
                return method.id === payment_method_id;
              });
              return _objectSpread(_objectSpread({}, rest), {}, {
                status: orderStatus,
                items: orderDetail,
                shipping_address: shippingAddress,
                payment_method: paymentMethod
              });
            });
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Retrieved orders successfully",
              result: result
            });
          case 20:
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.FILE_NOT_FOUND,
              message: "Orders not found."
            });
          case 23:
            _context5.prev = 23;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred while retrieving the orders."
            });
          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 23]]);
  }));
  return function handleGetOrdersByUserPhoneNumber(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var handleCreateOrder = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(order) {
    var t, thisMoment, datetimeUuid, customerPhoneNumber, items, note, paymentDetails, paymentMethod, shippingAddress, _yield$db$ShippingAdd, _yield$db$ShippingAdd2, shipping_adddress, created, orderDataToInsert, orderItemsToInsert, historyDataToInsert;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _database["default"].transaction();
          case 2:
            t = _context6.sent;
            _context6.prev = 3;
            thisMoment = new Date();
            datetimeUuid = thisMoment.valueOf();
            customerPhoneNumber = order.customerPhoneNumber, items = order.items, note = order.note, paymentDetails = order.paymentDetails, paymentMethod = order.paymentMethod, shippingAddress = order.shippingAddress;
            _context6.next = 9;
            return _models["default"].ShippingAddress.findOrCreate({
              where: _objectSpread({}, shippingAddress),
              defaults: shippingAddress,
              transaction: t
            });
          case 9:
            _yield$db$ShippingAdd = _context6.sent;
            _yield$db$ShippingAdd2 = _slicedToArray(_yield$db$ShippingAdd, 2);
            shipping_adddress = _yield$db$ShippingAdd2[0];
            created = _yield$db$ShippingAdd2[1];
            orderDataToInsert = _objectSpread(_objectSpread({
              order_uuid: datetimeUuid,
              customer_phone_number: customerPhoneNumber,
              shipping_address_id: shipping_adddress.id,
              payment_method_id: paymentMethod.id
            }, paymentDetails), {}, {
              status_id: 1,
              note: note
            });
            orderItemsToInsert = items.map(function (_ref7) {
              var id = _ref7.id,
                name = _ref7.name,
                slug = _ref7.slug,
                price = _ref7.price,
                quantity = _ref7.quantity,
                feature_image_url = _ref7.feature_image_url;
              return {
                order_uuid: datetimeUuid,
                product_id: id,
                slug: slug,
                name: name,
                price: price,
                quantity: quantity,
                feature_image_url: feature_image_url
              };
            });
            historyDataToInsert = {
              order_uuid: datetimeUuid,
              employee_id: null,
              status_id: 1,
              description: "Kh\xE1ch ".concat(customerPhoneNumber, " \u0111\u1EB7t h\xE0ng")
            };
            _context6.next = 18;
            return Promise.all([_models["default"].Order.create(orderDataToInsert, {
              transaction: t
            }), _models["default"].OrderDetail.bulkCreate(orderItemsToInsert, {
              transaction: t
            }), _models["default"].HistoryOrderUpdate.create(historyDataToInsert, {
              transaction: t
            })]);
          case 18:
            _context6.next = 20;
            return t.commit();
          case 20:
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.SUCCESS,
              message: "Create order successfully",
              result: datetimeUuid
            });
          case 23:
            _context6.prev = 23;
            _context6.t0 = _context6["catch"](3);
            _context6.next = 27;
            return t.rollback();
          case 27:
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              code: _constant.ResponseCode.DATABASE_ERROR,
              message: "An error occurred during the transaction."
            });
          case 29:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 23]]);
  }));
  return function handleCreateOrder(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var handleConfirmOrder = function handleConfirmOrder(uuid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var data, targetOrder, thisMoment, stateArray, newStateArray;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              data = {};
              _context7.prev = 1;
              _context7.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  orderUuid: uuid
                }
              });
            case 4:
              targetOrder = _context7.sent;
              if (!targetOrder) {
                _context7.next = 16;
                break;
              }
              thisMoment = new Date();
              stateArray = JSON.parse(targetOrder.state);
              if (!(stateArray[stateArray.length - 1].code < 1)) {
                _context7.next = 14;
                break;
              }
              newStateArray = [].concat(_toConsumableArray(stateArray), [{
                code: 1,
                description: "Đã xác nhận",
                time: thisMoment.toISOString()
              }]);
              _context7.next = 12;
              return _models["default"].Order.update({
                state: JSON.stringify(newStateArray)
              }, {
                where: {
                  orderUuid: uuid
                }
              });
            case 12:
              data.code = 0;
              data.message = "this order has been confirmed";
            case 14:
              _context7.next = 18;
              break;
            case 16:
              data.code = 2;
              data.message = "invalid order";
            case 18:
              resolve(data);
              _context7.next = 24;
              break;
            case 21:
              _context7.prev = 21;
              _context7.t0 = _context7["catch"](1);
              reject(_context7.t0);
            case 24:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 21]]);
    }));
    return function (_x7, _x8) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var handleDeliveryOrder = function handleDeliveryOrder(uuid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var data, targetOrder, thisMoment, stateArray, newStateArray;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              data = {};
              _context8.prev = 1;
              _context8.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  orderUuid: uuid
                }
              });
            case 4:
              targetOrder = _context8.sent;
              if (!targetOrder) {
                _context8.next = 16;
                break;
              }
              thisMoment = new Date();
              stateArray = JSON.parse(targetOrder.state);
              if (!(stateArray[stateArray.length - 1].code < 2)) {
                _context8.next = 14;
                break;
              }
              newStateArray = [].concat(_toConsumableArray(stateArray), [{
                code: 2,
                description: "Đang giao hàng",
                time: thisMoment.toISOString()
              }]);
              _context8.next = 12;
              return _models["default"].Order.update({
                state: JSON.stringify(newStateArray)
              }, {
                where: {
                  orderUuid: uuid
                }
              });
            case 12:
              data.code = 0;
              data.message = "this order being delivery";
            case 14:
              _context8.next = 18;
              break;
            case 16:
              data.code = 2;
              data.message = "invalid order";
            case 18:
              resolve(data);
              _context8.next = 24;
              break;
            case 21:
              _context8.prev = 21;
              _context8.t0 = _context8["catch"](1);
              reject(_context8.t0);
            case 24:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[1, 21]]);
    }));
    return function (_x9, _x10) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var handleFinishedOrder = function handleFinishedOrder(uuid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var data, targetOrder, thisMoment, stateArray, newStateArray;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              data = {};
              _context9.prev = 1;
              _context9.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  orderUuid: uuid
                }
              });
            case 4:
              targetOrder = _context9.sent;
              if (!targetOrder) {
                _context9.next = 16;
                break;
              }
              thisMoment = new Date();
              stateArray = JSON.parse(targetOrder.state);
              if (!(stateArray[stateArray.length - 1].code === 2)) {
                _context9.next = 14;
                break;
              }
              newStateArray = [].concat(_toConsumableArray(stateArray), [{
                code: 3,
                description: "Giao hàng thành công",
                time: thisMoment.toISOString()
              }]);
              _context9.next = 12;
              return _models["default"].Order.update({
                state: JSON.stringify(newStateArray)
              }, {
                where: {
                  orderUuid: uuid
                }
              });
            case 12:
              data.code = 0;
              data.message = "delivery success";
            case 14:
              _context9.next = 18;
              break;
            case 16:
              data.code = 2;
              data.message = "invalid order";
            case 18:
              resolve(data);
              _context9.next = 24;
              break;
            case 21:
              _context9.prev = 21;
              _context9.t0 = _context9["catch"](1);
              reject(_context9.t0);
            case 24:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[1, 21]]);
    }));
    return function (_x11, _x12) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var handleCancelOrder = function handleCancelOrder(uuid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var data, targetOrder, thisMoment, stateArray, newStateArray;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              data = {};
              _context10.prev = 1;
              _context10.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  orderUuid: uuid
                }
              });
            case 4:
              targetOrder = _context10.sent;
              if (!targetOrder) {
                _context10.next = 16;
                break;
              }
              thisMoment = new Date();
              stateArray = JSON.parse(targetOrder.state);
              if (!(stateArray[stateArray.length - 1].code !== 4)) {
                _context10.next = 14;
                break;
              }
              newStateArray = [].concat(_toConsumableArray(stateArray), [{
                code: 4,
                description: "Đã hủy",
                time: thisMoment.toISOString()
              }]);
              _context10.next = 12;
              return _models["default"].Order.update({
                state: JSON.stringify(newStateArray)
              }, {
                where: {
                  orderUuid: uuid
                }
              });
            case 12:
              data.code = 0;
              data.message = "this order has been cancelled";
            case 14:
              _context10.next = 18;
              break;
            case 16:
              data.code = 2;
              data.message = "invalid order";
            case 18:
              resolve(data);
              _context10.next = 24;
              break;
            case 21:
              _context10.prev = 21;
              _context10.t0 = _context10["catch"](1);
              reject(_context10.t0);
            case 24:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[1, 21]]);
    }));
    return function (_x13, _x14) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var handleDeleteOrder = function handleDeleteOrder(orderId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var data, targetOrder;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              data = {};
              _context11.prev = 1;
              _context11.next = 4;
              return _models["default"].Order.findOne({
                where: {
                  id: orderId
                }
              });
            case 4:
              targetOrder = _context11.sent;
              if (!targetOrder) {
                _context11.next = 12;
                break;
              }
              _context11.next = 8;
              return _models["default"].Order.destroy({
                where: {
                  id: orderId
                }
              });
            case 8:
              data.code = 0;
              data.message = "delete order success";
              _context11.next = 14;
              break;
            case 12:
              data.code = 1;
              data.message = "invalid order";
            case 14:
              resolve(data);
              _context11.next = 20;
              break;
            case 17:
              _context11.prev = 17;
              _context11.t0 = _context11["catch"](1);
              reject(_context11.t0);
            case 20:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[1, 17]]);
    }));
    return function (_x15, _x16) {
      return _ref12.apply(this, arguments);
    };
  }());
};
module.exports = {
  handleGetPaymentMethods: handleGetPaymentMethods,
  handleGetAllOrders: handleGetAllOrders,
  handleGetOneOrderByUuid: handleGetOneOrderByUuid,
  handleGetOrdersByUuids: handleGetOrdersByUuids,
  handleGetOrdersByUserPhoneNumber: handleGetOrdersByUserPhoneNumber,
  handleCreateOrder: handleCreateOrder,
  handleConfirmOrder: handleConfirmOrder,
  handleDeliveryOrder: handleDeliveryOrder,
  handleFinishedOrder: handleFinishedOrder,
  handleCancelOrder: handleCancelOrder,
  handleDeleteOrder: handleDeleteOrder
};