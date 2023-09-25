import express from "express";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import postController from "../controllers/postController";
import homeController from "../controllers/homeController";
import adminController from "../controllers/adminController";
import authController from "../controllers/authController";
import customerController from "../controllers/customerController";
import orderController from "../controllers/orderController";
import verifyAccessToken from "../middleware/verifyAccessToken";
import deliveryAddressController from "../controllers/deliveryAddressController";
import verifyRefreshToken from "../middleware/verifyRefreshToken";

let router = express.Router();

let initRoutes = (app) => {
    router.get("/", homeController.getHomepage);

    /** ADMIN */

    router.post("/api/admin/login", adminController.adminLogin);

    /** AUTH */

    router.post("/api/auth/user/login", authController.userLogin);
    router.post("/api/auth/user/logout", authController.userLogout);
    router.post("/api/auth/user/refresh", verifyRefreshToken, authController.userRefresh);
    router.put("/api/auth/user/update-profile", verifyAccessToken, authController.updateProfile);

    router.post("/api/auth/customer/login", authController.customerLogin);
    router.post("/api/auth/customer/logout", authController.customerLogin);
    router.post("/api/auth/customer/register", authController.customerRegister);
    router.post("/api/auth/customer/refresh", verifyRefreshToken, authController.customerRefreshTokens);
    router.put("/api/auth/customer/update-profile", verifyAccessToken, authController.customerUpdateProfile);
    router.post("/api/auth/customer/change-password", verifyAccessToken, authController.changeCustomerPassword);

    /** USER */

    router.get("/api/role/get", userController.getRoles);
    router.get("/api/user/count", userController.countUsers);
    router.get("/api/user/get", verifyAccessToken, userController.getUser);
    router.post("/api/user/create", verifyAccessToken, userController.createUser);
    router.put("/api/user/update", verifyAccessToken, userController.updateUser);
    router.delete("/api/user/delete", verifyAccessToken, userController.deleteUser);

    /** PRODUCTS */

    router.get("/api/category/get", productController.getCategories);
    router.get("/api/material/get", productController.getMaterials);
    router.get("/api/product/count", productController.countProducts);
    router.get("/api/product/get", productController.getProduct);
    router.get("/api/product/search", productController.searchProduct);
    router.post("/api/product/create", verifyAccessToken, productController.createProduct);
    router.put("/api/product/update", verifyAccessToken, productController.updateProduct);
    router.delete("/api/product/delete", verifyAccessToken, productController.deleteProduct);

    /** ORDER */

    router.get("/api/payment-method/get", orderController.getPaymentMethods);
    router.get("/api/order/get", orderController.getOrder);
    router.post("/api/order/checkout", orderController.createOrder);

    router.get("/api/auth/order/get", orderController.getAllOrder);
    router.post("/api/order/create", verifyAccessToken, orderController.createOrder);
    router.post("/api/order/confirm", verifyAccessToken, orderController.confirmOrder);
    router.post("/api/order/delivery", verifyAccessToken, orderController.deliveryOrder);
    router.post("/api/order/finished", verifyAccessToken, orderController.finishedOrder);
    router.post("/api/order/cancel", verifyAccessToken, orderController.cancelOrder);

    /** CUSTOMER */

    router.get("/api/customer/get", verifyAccessToken, customerController.getCustomer);
    router.post("/api/customer/create", verifyAccessToken, customerController.createCustomer);
    router.put("/api/customer/update", verifyAccessToken, customerController.updateCustomer);
    router.delete("/api/customer/delete", verifyAccessToken, customerController.deleteCustomer);

    /** DELIVERY ADDRESS */

    router.get("/api/address/get", verifyAccessToken, deliveryAddressController.getDeliveryAddress);
    router.post("/api/address/create", verifyAccessToken, deliveryAddressController.createDeliveryAddress);
    router.put("/api/address/update", verifyAccessToken, deliveryAddressController.updateDeliveryAddress);
    router.delete("/api/address/delete", verifyAccessToken, deliveryAddressController.deleteDeliveryAddress);

    /** IMAGES */
    router.post("/api/image/rollback", productController.rollbackImages);

    /** BLOG */

    router.get("/api/posts/get", postController.getPost);
    router.post("/api/posts/create", verifyAccessToken, postController.createPost);
    router.put("/api/posts/update", verifyAccessToken, postController.updatePost);
    router.delete("/api/posts/delete", verifyAccessToken, postController.deletePost);

    /** APPLY ROUTER */

    return app.use("/", router);
};

module.exports = initRoutes;
