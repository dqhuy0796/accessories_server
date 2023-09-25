"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CountProductByMaterialView extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    CountProductByMaterialView.init(
        {
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            product_count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "CountProductByMaterialView",
            tableName: "count_product_by_material_view",
            timestamps: false,
        },
    );

    return CountProductByMaterialView;
};
