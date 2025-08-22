const { userValid, UserValidLogin } = require("./joi/userValidator");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const User = require("../models/mongoDB/User");
const VALIDATOR = "joi";

const userValidation = (req, res, next) => {
    console.log("in user validator");

    try {
        const user = req.body;


        if (VALIDATOR == "joi") {

            const { error } = userValid(user);

            if (error) {
                console.log("in user error validation");
                console.log(error.details);


                const errorValidation = error.details.map(detail => detail.message);
                return next(buildError("Joi Validation", errorValidation, 400));
            }

            return next();
        }

        return next(buildError("", "validation type not exist", 400));

    } catch (error) {
        next(error);
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
        console.log(error);
    }

}

module.exports = { userValidation, userLoginValidation };