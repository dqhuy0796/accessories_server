var sequelize = require("./database");

var connectDatabase = async function () {
    try {
        await sequelize.authenticate();
        console.log("Connected successfully on port", process.env.NODE_DATABASE_PORT);
    } catch (error) {
        console.error("Connection failure:", error);
    }
};

module.exports = connectDatabase;
