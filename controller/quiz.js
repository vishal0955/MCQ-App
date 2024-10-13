const Question = require("../model/Question");
const Quiz = require("../model/Quiz");
const { sendSuccess, sendError } = require("../utils/error");

exports.addQuiz = async (req, res) => {
    try { 
        const { title, description } = req.body;

        if (!title || !description) {
            return sendError(res, 400, "All Fields are required");
        }

        const result = await Quiz.create({ title, description });
        return sendSuccess(res, 201, result, "Quiz Added Successfully")

    } catch (error) {
        console.log('error: ', error);
        return sendError(res);
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const { id, title, description } = req.body;

        if (!id) {
            return sendError(res, 400, "id is required");
        }

        const quizToUpdate = await Quiz.findOne({ where: { id } })
        if (!quizToUpdate) return sendError(res, 400, "Quiz Not Found");

        await Quiz.update({ title, description }, { where: { id } });
        const result = { id, title, description }
        return sendSuccess(res, 200, result, "Quiz updated successfully");

    } catch (error) {
        console.log('error: ', error);
        return sendError(res);
    }
};

exports.deleteQuiz = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) return sendError(res, 400, "id is required");


        const deleted = await Quiz.destroy({ where: { id } });
        if (!deleted) {
            return sendError(res, 404, "Quiz Not Found");
        }

        return sendSuccess(res, 200, [], "Quiz Deleted Successfully");

    } catch (error) {
        console.log('error: ', error);
        return sendError(res);
    }
};

exports.getAllQuiz = async (req, res) => {
    try {
        const result = await Quiz.findAll({});
        return sendSuccess(res, 200, result)
    } catch (error) {
        console.log('error: ', error);
        return sendError(res)
    }
};

exports.addQuestionToQuiz = async (req, res) => {
    try {
        const { id, question } = req.body;

        if (!id) {
            return sendError(res, 400, "id is required");
        }
        const quizExisist = await Quiz.findByPk(id);

        if (quizExisist) {
            const newQuestion = await quizExisist.createQuestion({ question_text: question });
            return sendSuccess(res, 201, newQuestion, "Question Added Successfully")
        }

        return sendError(res, 400, "Quiz Not Found");

    } catch (error) {
        console.log('error: ', error);
        return sendError(res);
    }
};

exports.updateQuestion = async (req,res) => {
    try {
        const {id , question_text} =req.body;
        
        if (!id || !question_text) {
            return sendError(res, 400, "Both Question ID and text are required");
        }
       
        const [updated] = await Question.update({ question_text }, { where: { id } });

        if (!updated) {
            return sendError(res, 404, "Question Not Found");
        }
        return sendSuccess(res, 200, { id, question_text }, "Question updated successfully");

    } catch (error) {
        console.error('Error updating question:', error);
        return sendError(res);
    }
};

exports.deleteQuestion = async (req,res) => {
        try {
            const { id } = req.body;
          
            if (!id) return sendError(res, 400, "Question ID is required");
    
            const deleted = await Question.destroy({ where: { id } });
            if (!deleted) {
                return sendError(res, 404, "Question Not Found");
            }
            return sendSuccess(res, 200, null, "Question deleted successfully");

        } catch (error) {
            console.error('Error deleting question:', error);
            return sendError(res);
        }
};

exports.getAllQuestion =async (req,res) => {
    try {
        const result = await Question.findAll({});
        return sendSuccess(res, 200, result)
    } catch (error) {
        console.log('error: ', error);
        return sendError(res)
    }
}