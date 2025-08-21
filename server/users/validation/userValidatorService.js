const userValidator = require("./joi/userValidator");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const VALIDATOR = "joi";

const userValidation = (req, res, next) => {
    console.log("in user validator");

    try {
        const user = req.body;
        

        if (VALIDATOR == "joi") {
            
            const { error } = userValidator(user);

            if (error) {
                console.log("in user error validation");
                console.log(error.details);
                

                const errorValidation = error.details.map(detail => detail.message);
                const newError = buildError("Joi Validation", errorValidation, 400);
                return next(new Error(newError));
            }

            return next();
        }

        const newError = buildError("", "validation type not exist", 400);
        return next(new Error(newError));

    } catch (error) {
        next(error);
    }
};

module.exports = userValidation;