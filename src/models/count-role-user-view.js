"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CountRoleUserView extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    CountRoleUserView.init(
        {
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            user_count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "CountRoleUserView",
            tableName: "count_role_user_view",
            timestamps: false,
        },
    );

    return CountRoleUserView;
};
