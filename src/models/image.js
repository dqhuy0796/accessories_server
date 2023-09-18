"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Image.init(
        {
            target_id: DataTypes.INTEGER,
            target_type: DataTypes.STRING,
            public_id: DataTypes.STRING,
            secure_url: DataTypes.TEXT,
            thumbnail_url: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Image",
            tableName: "images",
            timestamps: false,
        },
    );
    return Image;
};
