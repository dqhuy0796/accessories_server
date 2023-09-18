"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // Define associations here
            Order.belongsTo(models.Customer, {
                foreignKey: "customer_id",
            });
            Order.belongsTo(models.Employee, {
                foreignKey: "employee_id",
            });
            Order.belongsTo(models.PaymentMethod, {
                foreignKey: "payment_method_id",
            });
            Order.belongsTo(models.Status, {
                foreignKey: "status_id",
            });
        }
    }

    Order.init(
        {
            order_uuid: DataTypes.STRING,
            shipping_address: DataTypes.TEXT,
            note: DataTypes.TEXT,
            subtotal: DataTypes.DOUBLE,
            discount: DataTypes.DOUBLE,
            shipping_fee: DataTypes.DOUBLE,
            total_amount: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Order",
            tableName: "orders",
        },
    );

    return Order;
};
