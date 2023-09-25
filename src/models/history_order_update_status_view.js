"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class HistoryOrderUpdateStatusView extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    HistoryOrderUpdateStatusView.init(
        {
            order_uuid: DataTypes.STRING,
            employee_id: DataTypes.STRING,
            description: DataTypes.STRING,
            status_id: DataTypes.STRING,
            status_code: DataTypes.STRING,
            status_description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "HistoryOrderUpdateStatusView",
            tableName: "view_history_order_update_status",
        },
    );

    return HistoryOrderUpdateStatusView;
};
