"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Define associations here
            User.belongsTo(models.Role, {
                foreignKey: "role_id",
            });
        }
    }

    User.init(
        {
            phone_number: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            birth: DataTypes.DATE,
            last_login: DataTypes.DATE,
            bio: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
        },
    );

    return User;
};
