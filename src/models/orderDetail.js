"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            OrderDetail.belongsTo(models.Order, {
                foreignKey: "order_id",
            });
            OrderDetail.belongsTo(models.Product, {
                foreignKey: "product_id",
            });
        }
    }
    OrderDetail.init(
        {
            price: DataTypes.DOUBLE,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "OrderDetail",
            tableName: "order_details",
            timestamps: false,
        },
    );
    return OrderDetail;
};
