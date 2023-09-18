"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("shipping_addresses", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            address: {
                type: Sequelize.STRING,
            },
            ward: {
                type: Sequelize.STRING,
            },
            district: {
                type: Sequelize.STRING,
            },
            province: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            phone_number: {
                type: Sequelize.STRING,
            },
            is_default: {
                type: Sequelize.BOOLEAN,
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("shipping_addresses");
    },
};
