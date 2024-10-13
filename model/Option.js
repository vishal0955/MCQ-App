const { sequelize } = require("./index");
const { DataTypes } = require("sequelize");
const Question = require("./Question")

const Option = sequelize.define("Option", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    option_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true
});

Question.hasMany(Option, { foreignKey: 'question_id', onDelete: "CASCADE" })


Option.sync({alter: true})
module.exports = Option;
