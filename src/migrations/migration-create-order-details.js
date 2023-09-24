"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("order_details", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            slug: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            feature_image_url: {
                type: Sequelize.TEXT,
            },
            price: {
                type: Sequelize.DOUBLE,
            },
            quantity: {
                type: Sequelize.INTEGER,
            },
            order_uuid: {
                type: Sequelize.STRING,
            },
            product_id: {
                type: Sequelize.INTEGER,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("order_details");
    },
};
