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
            ShippingAddress.belongsTo(models.User, {
                foreignKey: "user_id",
            });
        }
    }
    ShippingAddress.init(
        {
            address: DataTypes.STRING,
            ward: DataTypes.STRING,
            district: DataTypes.STRING,
            province: DataTypes.STRING,
            name: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            is_default: DataTypes.BOOLEAN,
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
