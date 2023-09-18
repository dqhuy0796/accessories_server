"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CategoryProductCountView extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    CategoryProductCountView.init(
        {
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            product_count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "CategoryProductCountView",
            tableName: "category_product_count_view",
            timestamps: false,
        },
    );

    return CategoryProductCountView;
};
