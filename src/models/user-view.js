"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserView extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    UserView.init(
        {
            phone_number: DataTypes.STRING,
            email: DataTypes.STRING,
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            birth: DataTypes.DATE,
            last_login: DataTypes.DATE,
            role: DataTypes.STRING,
            role_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "UserView",
            tableName: "view_users",
            timestamps: false,
        },
    );

    return UserView;
};
