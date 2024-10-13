const sendSuccess = (res, statuCode = 200, data = [], message = "Success") => {
    res.json({
        success: true,
        status: statuCode,
        data: data,
        message: message
    })
}

const sendError = (res, statusCode = 500, message = "Interval Server Error") => {
    res.json({
        success: false,
        status: statusCode,
        message: message
    })
};

module.exports = { sendSuccess, sendError };