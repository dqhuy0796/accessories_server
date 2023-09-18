"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Category.init(
        {
            slug: DataTypes.STRING,
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Category",
            tableName: "categories",
            timestamps: false,
        },
    );
    return Category;
};
