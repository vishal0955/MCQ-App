const validator = require("validator");

const signUpValidateData = (req) => {
    const {email, password} = req.body;
    
    if(!validator.isEmail(email)){
        throw new Error("Invalid Email Address")
    }
    
}
module.exports = {signUpValidateData }