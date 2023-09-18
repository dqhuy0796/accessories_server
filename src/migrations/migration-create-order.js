"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            order_uuid: {
                type: Sequelize.STRING,
            },
            shipping_address: {
                type: Sequelize.TEXT,
            },
            note: {
                type: Sequelize.TEXT,
            },
            subtotal: {
                type: Sequelize.DOUBLE,
            },
            discount: {
                type: Sequelize.DOUBLE,
            },
            shipping_fee: {
                type: Sequelize.DOUBLE,
            },
            total_amount: {
                type: Sequelize.DECIMAL,
            },
            customer_id: {
                type: Sequelize.INTEGER,
            },
            employee_id: {
                type: Sequelize.INTEGER,
            },
            payment_method_id: {
                type: Sequelize.INTEGER,
            },
            status_id: {
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
        await queryInterface.dropTable("orders");
    },
};
