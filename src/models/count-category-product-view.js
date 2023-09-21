"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CountCategoryProductView extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    CountCategoryProductView.init(
        {
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            product_count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "CountCategoryProductView",
            tableName: "count_category_product_view",
            timestamps: false,
        },
    );

    return CountCategoryProductView;
};
