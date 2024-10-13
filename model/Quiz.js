const { sequelize } = require("./index")
const { DataTypes } = require("sequelize");
const Question = require("./Question");

const Quiz = sequelize.define("quiz", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
}, {
    freezeTableName: true,
    paranoid: true
});

Quiz.sync({ alter: true });
module.exports = Quiz;