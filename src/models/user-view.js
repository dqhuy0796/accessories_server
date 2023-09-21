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
            avatar_url: DataTypes.TEXT,
            address: DataTypes.STRING,
            birth: DataTypes.DATE,
            bio: DataTypes.TEXT,
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
