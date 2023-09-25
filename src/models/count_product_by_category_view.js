"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CountProductByCategoryView extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    CountProductByCategoryView.init(
        {
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            product_count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "CountProductByCategoryView",
            tableName: "count_product_by_category_view",
            timestamps: false,
        },
    );

    return CountProductByCategoryView;
};
