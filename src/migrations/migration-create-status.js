"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("status", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("status");
    },
};
