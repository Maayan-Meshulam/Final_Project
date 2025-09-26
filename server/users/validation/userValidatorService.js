const { userValid, UserValidLogin } = require("./joi/userValidator");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const User = require("../models/mongoDB/User");
const normaliztionUser = require("../helpers/normalizeUser");
const { hash } = require("bcrypt");
const VALIDATOR = "joi";

const userValidation = async (req, res, next) => {

    console.log("in user validator");

    try {
        const bycrptPassword = await hash(req.body.password, 10);
        console.log(bycrptPassword);
        

        const user = normaliztionUser(req.body, bycrptPassword);
        console.log(JSON.stringify(user));


        if (VALIDATOR == "joi") {

            const { error } = userValid(user);

            if (error) {
                console.log("in user error validation");
                console.log(error.details);


                const errorValidation = error.details.map(detail => detail.message);
                return next(buildError("Joi Validation", errorValidation, 400));
            }

            req.userValid = user;
            return next();
        }

        return next(buildError("validation Type Error", "validation type not exist", 400));

    } catch (error) {
        next(buildError("Genral Error:", error, 500));
    }
};


const userLoginValidation = async (req, res, next) => {
    try {
        let user = req.body;
        ({ email, password } = user);

        if (VALIDATOR == "joi") {

            const { error } = UserValidLogin(user);
            console.log(error);

            if (error) {
                const errorValidation = error.details.map(detail => detail.message);
                return next(buildError("Joi Validation", errorValidation, 400))
            }

            user = await User.find({ email, password });

            if (!user) {
                return next(buildError("Error", "user is not exist", 400));
            }

            return next();
        }

        return next(buildError("", "validation type not exist", 400));

    } catch (error) {
        return next(buildError("Error:", error.message, 500))
    }

}

module.exports = { userValidation, userLoginValidation };