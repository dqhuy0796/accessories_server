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
            receiver_address: {
                type: Sequelize.TEXT,
            },
            receiver_name: {
                type: Sequelize.STRING,
            },
            receiver_phone: {
                type: Sequelize.STRING,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("shipping_addresses");
    },
};
