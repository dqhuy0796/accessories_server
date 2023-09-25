"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CountProductByColorView extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    CountProductByColorView.init(
        {
            name: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            product_count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "CountProductByColorView",
            tableName: "count_product_by_color_view",
            timestamps: false,
        },
    );

    return CountProductByColorView;
};
