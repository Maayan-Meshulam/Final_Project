const { userValid, UserValidLogin } = require("./joi/userValidator");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const User = require("../models/mongoDB/User");
const normaliztionUser = require("../helpers/normalizeUser");
const { hash } = require("bcrypt");
const VALIDATOR = process.env.VALIDATOR;

const userValidation = async (req, res, next) => {

    try {
        const bycrptPassword = await hash(req.body.password, 10);

        const allData = {
            ...req.body,
            url: req.file ? `/images/${req.file.filename}` : "/images/profile.png"
        }

        const user = normaliztionUser(allData, bycrptPassword);


        if (VALIDATOR == "joi") {

            const { error } = userValid(user);

            if (error) {
            
                const errorValidation = error.details.map(detail => detail.message);
                return next(buildError("Joi Validation", errorValidation, 400));
            }

            req.userValid = user;
            return next();
        }

        return next(buildError("validation Type Error", "validation type not exist", 400));

    } catch (error) {
        return next(buildError("Genral Error:", error.message, 500));
    }
};


const userLoginValidation = async (req, res, next) => {
    try {
        let user = req.body;
        ({ email, password } = user);

        if (VALIDATOR == "joi") {

            const { error } = UserValidLogin(user);

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