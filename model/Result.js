const { sequelize } = require("./index");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Quiz = require("./Quiz");

const Result = sequelize.define("Result", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_questions: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true
});

Result.belongsTo(User, { foreignKey: 'user_id' });
Result.belongsTo(Quiz, { foreignKey: 'quiz_id' });
Result.sync({alter: true})
module.exports = Result;
