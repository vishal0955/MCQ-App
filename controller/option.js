const Option = require("../model/Option")
const { sendSuccess, sendError } = require("../utils/error");

exports.addOption = async (req, res) => {
    try {
        const { question_id, option_text, is_correct } = req.body;
        if (!question_id) {
            return sendError(res, 400, "question_id is required");
        }
        if (!option_text) {
            return sendError(res, 400, "option_text is required");
        }

        const newOption = await Option.create({ question_id, option_text, is_correct });
        return sendSuccess(res, 201, newOption, "Option Added Successfully");
    } catch (error) {
        console.error('Error adding option:', error);
        return sendError(res);
    }
};

exports.updateOption = async (req, res) => {
    try {
        const { id, option_text, is_correct} = req.body;
        if (!id) {
            return sendError(res, 400, "Option ID required");
        }
       
        const [updated] = await Option.update({ option_text,is_correct}, { where: { id } });

        if (!updated) {
            return sendError(res, 404, "Option Not Found");
        }
        return sendSuccess(res, 200, { id, option_text }, "Option updated successfully");

    } catch (error) {
        console.error('Error updating options:', error);
        return sendError(res);
    }

};

exports.deleteOption =async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return sendError(res, 400, "Option ID is required");
        const option = await option.destroy({ where: { id } });
        if (!option) return sendError(res, 404, "Option Not Found");

        return sendSuccess(res, 200, null, "Option deleted successfully");
    } catch (error) {
        console.error('Error deleting option:', error);
        return sendError(res);
    }
};

exports.getOptionforQuestion = async (req, res) => {
    try {
        const { question_id } = req.body;
        const result = await Option.findAll({ where : {question_id}});
        return sendSuccess(res, 200, result)
    } catch (error) {
        console.log('error: ', error);
        return sendError(res)
    }
};