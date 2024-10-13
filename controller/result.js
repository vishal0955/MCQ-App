const Option = require("../model/Option");
const Question = require("../model/Question");
const Result = require('../model/Result'); 
const {sendError , sendSuccess} = require("../utils/error")

exports.takeQuiz = async (req, res) => {
    const { quiz_id, answers } = req.body; 

    if (!quiz_id || !answers) {
        return sendError(res, 400, "quiz_id and answers are required");
    }

    try {
        const questions = await Question.findAll({
            where: { quiz_id },
            include: [Option]
        });

        let score = 0;

        answers.forEach(answer => {
            const question = questions.find(q => q.id === answer.question_id);
            if (question) {
                const correctOption = question.Options.find(opt => opt.is_correct);
                if (correctOption && correctOption.id === answer.selected_option_id) {
                    score += 1; 
                }
            }
        });
        await Result.create({ user_id: req.user.id, quiz_id, score });

        sendSuccess(res, 200, { score }, "Quiz submitted successfully");
    } catch (error) {
        console.error('Error taking quiz:', error);
        sendError(res, 400, error.message);
    }
};

exports.getResults = async (req, res) => {
    const { quiz_id } = req.body;

    if (!quiz_id) {
        return sendError(res, 400, "quiz_id is required");
    }

    try {
        const result = await Result.findOne({
            where: {
                user_id: req.user.id,
                quiz_id
            }
        });

        if (!result) {
            return sendError(res, 404, "Results not found");
        }

        sendSuccess(res, 200, result, "Results retrieved successfully");
    } catch (error) {
        console.error('Error fetching results:', error);
        sendError(res);
    }
};

