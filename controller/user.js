const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const JWT_SECRET = process.env.JWT_SECRET;
const { sendError, sendSuccess } = require("../utils/error");

exports.register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return sendError(res, 400, "All Fields are required");
        }

        const userExsist = await User.findOne({ where: { email } });
        if (userExsist) return sendError(res, 400, "Email Already Exsist");

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hashedPassword: ', hashedPassword);

        const result = await User.create({ email, name, password: hashedPassword });
        result.password = undefined;
        return sendSuccess(res, 201, result, "User Registered Successfully")

    } catch (error) {
        console.log('error: ', error);
        return sendError(res);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, "All Fields are required");
        }

        const userExsist = await User.findOne({ where: { email } });
        if (!userExsist) {
            return sendError(res, 401, "User Not Found");
        }

        const passwordMatch = await bcrypt.compare(password, userExsist.password);
        if (!passwordMatch) {
            return sendError(res, 401, "Incorrect password");
        }

        const token = jwt.sign({ id: userExsist.id }, JWT_SECRET, { expiresIn: '1h' });
        const userResponse = {
            id: userExsist.id,
            email: userExsist.email,
            name: userExsist.name,
            token,
        };

        return sendSuccess(res, 200, userResponse, "Logged in successfull");

    } catch (error) {
        console.log('error: ', error);
        return sendError(res);
    }
};
