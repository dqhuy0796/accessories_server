"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // Define associations here
            Order.belongsTo(models.User, {
                foreignKey: "employee_id",
            });
            Order.belongsTo(models.PaymentMethod, {
                foreignKey: "payment_method_id",
            });
            Order.belongsTo(models.ShippingAddress, {
                foreignKey: "shipping_address_id",
            });
            Order.belongsTo(models.Status, {
                foreignKey: "status_id",
            });
        }
    }

    Order.init(
        {
            order_uuid: DataTypes.STRING,
            customer_phone_number: DataTypes.STRING,
            note: DataTypes.TEXT,
            subtotal: DataTypes.DOUBLE,
            discount: DataTypes.DOUBLE,
            shipping_fee: DataTypes.DOUBLE,
            total: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Order",
            tableName: "orders",
        },
    );

    return Order;
};
