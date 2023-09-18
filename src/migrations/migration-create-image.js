"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("images", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            target_id: {
                type: Sequelize.INTEGER,
            },
            target_type: {
                type: Sequelize.STRING,
            },
            public_id: {
                type: Sequelize.STRING,
            },
            secure_url: {
                type: Sequelize.TEXT,
            },
            thumbnail_url: {
                type: Sequelize.TEXT,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("images");
    },
};
