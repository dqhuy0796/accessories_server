"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Status extends Model {
        static associate(models) {
            //
        }
    }
    Status.init(
        {
            code: DataTypes.STRING,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Status",
            tableName: "status",
            timestamps: false,
        },
    );
    return Status;
};
