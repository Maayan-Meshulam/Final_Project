const buildError = require("../../helpers/erorrs/errorsHandeling");
const taskValidator = require("./joi/taskValidation");

const validator = 'Joi';

const taskValidation = (req, res, next) => {
    console.log("in task validation");

    try {

        const task = req.body;
        console.log(task);

        if (validator == 'Joi') {

            const { error } = taskValidator(task);

            if (error) {
                console.log("in task error validation");
                                
                const validationError = error.details.map(detail => detail.message);
                return next(buildError("Joi Validation: ", validationError, 400));
            }
            return next();
        }
        return next(new Error("validator is not defined"));

    } catch (error) {
        next(error);
    }
}


module.exports = taskValidation;