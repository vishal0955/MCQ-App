const { sequelize } = require("./index");
const { DataTypes } = require("sequelize");
const Quiz = require("./Quiz")


const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question_text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});


Question.belongsTo(Quiz, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
Quiz.hasMany(Question, { foreignKey: "quiz_id" })


Question.sync({alter: true});

module.exports = Question;
