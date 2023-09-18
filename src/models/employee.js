"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        static associate(models) {
            // Define associations here
            Employee.belongsTo(models.User, {
                foreignKey: "user_id",
                onDelete: "CASCADE",
            });
            Employee.hasMany(models.Order, {
                foreignKey: "employee_id",
            });
        }
    }

    Employee.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            address: DataTypes.STRING,
            position: DataTypes.STRING,
            salary: DataTypes.DECIMAL,
            hire_date: DataTypes.DATEONLY,
        },
        {
            sequelize,
            modelName: "Employee",
            tableName: "employees",
        },
    );

    return Employee;
};
