"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: "category",
            });
            Product.belongsTo(models.Material, {
                foreignKey: "material",
            });
            Product.hasMany(models.OrderDetail, {
                foreignKey: "product_id",
                onDelete: "CASCADE",
            });
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            brand: DataTypes.STRING,
            color: DataTypes.STRING,
            price: DataTypes.DOUBLE,
            feature_image_url: DataTypes.TEXT,
            description: DataTypes.TEXT,
            quantity: DataTypes.INTEGER,
            sold: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "products",
        },
    );
    return Product;
};
