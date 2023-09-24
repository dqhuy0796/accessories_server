"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _productController = _interopRequireDefault(require("../controllers/productController"));
var _postController = _interopRequireDefault(require("../controllers/postController"));
var _homeController = _interopRequireDefault(require("../controllers/homeController"));
var _adminController = _interopRequireDefault(require("../controllers/adminController"));
var _authController = _interopRequireDefault(require("../controllers/authController"));
var _customerController = _interopRequireDefault(require("../controllers/customerController"));
var _orderController = _interopRequireDefault(require("../controllers/orderController"));
var _verifyAccessToken = _interopRequireDefault(require("../middleware/verifyAccessToken"));
var _deliveryAddressController = _interopRequireDefault(require("../controllers/deliveryAddressController"));
var _verifyRefreshToken = _interopRequireDefault(require("../middleware/verifyRefreshToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initRoutes = function initRoutes(app) {
  router.get("/", _homeController["default"].getHomepage);

  /** ADMIN */

  router.post("/api/admin/login", _adminController["default"].adminLogin);

  /** AUTH */

  router.post("/api/auth/user/login", _authController["default"].userLogin);
  router.post("/api/auth/user/logout", _authController["default"].userLogout);
  router.post("/api/auth/user/refresh", _verifyRefreshToken["default"], _authController["default"].userRefresh);
  router.put("/api/auth/user/update-profile", _verifyAccessToken["default"], _authController["default"].updateProfile);
  router.post("/api/auth/customer/login", _authController["default"].customerLogin);
  router.post("/api/auth/customer/logout", _authController["default"].customerLogin);
  router.post("/api/auth/customer/register", _authController["default"].customerRegister);
  router.post("/api/auth/customer/refresh", _verifyRefreshToken["default"], _authController["default"].customerRefreshTokens);
  router.put("/api/auth/customer/update-profile", _verifyAccessToken["default"], _authController["default"].customerUpdateProfile);
  router.post("/api/auth/customer/change-password", _verifyAccessToken["default"], _authController["default"].changeCustomerPassword);

  /** USER */

  router.get("/api/role/get", _userController["default"].getRoles);
  router.get("/api/user/count", _userController["default"].countUsers);
  router.get("/api/user/get", _verifyAccessToken["default"], _userController["default"].getUser);
  router.post("/api/user/create", _verifyAccessToken["default"], _userController["default"].createUser);
  router.put("/api/user/update", _verifyAccessToken["default"], _userController["default"].updateUser);
  router["delete"]("/api/user/delete", _verifyAccessToken["default"], _userController["default"].deleteUser);

  /** PRODUCTS */

  router.get("/api/category/get", _productController["default"].getCategories);
  router.get("/api/material/get", _productController["default"].getMaterials);
  router.get("/api/product/count", _productController["default"].countProducts);
  router.get("/api/product/get", _productController["default"].getProduct);
  router.post("/api/product/create", _verifyAccessToken["default"], _productController["default"].createProduct);
  router.put("/api/product/update", _verifyAccessToken["default"], _productController["default"].updateProduct);
  router["delete"]("/api/product/delete", _verifyAccessToken["default"], _productController["default"].deleteProduct);

  /** ORDER */

  router.post("/api/order/checkout", _verifyAccessToken["default"], _orderController["default"].createOrder);
  router.get("/api/payment-method/get", _orderController["default"].getPaymentMethods);
  router.get("/api/order/get", _orderController["default"].getOrder);
  router.post("/api/order/create", _verifyAccessToken["default"], _orderController["default"].createOrder);
  router.post("/api/order/confirm", _verifyAccessToken["default"], _orderController["default"].confirmOrder);
  router.post("/api/order/delivery", _verifyAccessToken["default"], _orderController["default"].deliveryOrder);
  router.post("/api/order/finished", _verifyAccessToken["default"], _orderController["default"].finishedOrder);
  router.post("/api/order/cancel", _verifyAccessToken["default"], _orderController["default"].cancelOrder);

  /** CUSTOMER */

  router.get("/api/customer/get", _verifyAccessToken["default"], _customerController["default"].getCustomer);
  router.post("/api/customer/create", _verifyAccessToken["default"], _customerController["default"].createCustomer);
  router.put("/api/customer/update", _verifyAccessToken["default"], _customerController["default"].updateCustomer);
  router["delete"]("/api/customer/delete", _verifyAccessToken["default"], _customerController["default"].deleteCustomer);

  /** DELIVERY ADDRESS */

  router.get("/api/address/get", _verifyAccessToken["default"], _deliveryAddressController["default"].getDeliveryAddress);
  router.post("/api/address/create", _verifyAccessToken["default"], _deliveryAddressController["default"].createDeliveryAddress);
  router.put("/api/address/update", _verifyAccessToken["default"], _deliveryAddressController["default"].updateDeliveryAddress);
  router["delete"]("/api/address/delete", _verifyAccessToken["default"], _deliveryAddressController["default"].deleteDeliveryAddress);

  /** IMAGES */
  router.post("/api/image/rollback", _productController["default"].rollbackImages);

  /** BLOG */

  router.get("/api/posts/get", _postController["default"].getPost);
  router.post("/api/posts/create", _verifyAccessToken["default"], _postController["default"].createPost);
  router.put("/api/posts/update", _verifyAccessToken["default"], _postController["default"].updatePost);
  router["delete"]("/api/posts/delete", _verifyAccessToken["default"], _postController["default"].deletePost);

  /** APPLY ROUTER */

  return app.use("/", router);
};
module.exports = initRoutes;