"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ShippingAddress extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ShippingAddress.init(
        {
            receiver_address: DataTypes.TEXT,
            receiver_name: DataTypes.STRING,
            receiver_phone: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ShippingAddress",
            tableName: "shipping_addresses",
            timestamps: false,
        },
    );
    return ShippingAddress;
};
