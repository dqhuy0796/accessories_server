"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            // define association here
        }
    }
    Role.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Role",
            tableName: "roles",
            timestamps: false,
        },
    );
    return Role;
};
