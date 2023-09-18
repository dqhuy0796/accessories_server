"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            slug: {
                type: Sequelize.STRING,
            },
            category: {
                type: Sequelize.STRING,
            },
            material: {
                type: Sequelize.STRING,
            },
            brand: {
                type: Sequelize.STRING,
            },
            color: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.DOUBLE,
            },
            feature_image_url: {
                type: Sequelize.TEXT,
            },
            description: {
                type: Sequelize.TEXT,
            },
            quantity: {
                type: Sequelize.INTEGER,
            },
            sold: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("products");
    },
};
