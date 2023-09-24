"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    Customer.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            address: DataTypes.STRING,
            birth_date: DataTypes.DATEONLY,
            loyalty_points: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Customer",
            tableName: "customers",
        },
    );

    return Customer;
};
