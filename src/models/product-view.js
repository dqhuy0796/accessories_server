"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductView extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    ProductView.init(
        {
            name: DataTypes.STRING,
            brand: DataTypes.STRING,
            material_id: DataTypes.INTEGER,
            material: DataTypes.STRING,
            category_id: DataTypes.INTEGER,
            category: DataTypes.STRING,
            color: DataTypes.STRING,
            price: DataTypes.DOUBLE,
            image_url: DataTypes.TEXT,
            description: DataTypes.TEXT,
            quantity: DataTypes.INTEGER,
            sold: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "ProductView",
            tableName: "view_products",
            timestamps: false,
        },
    );

    return ProductView;
};
