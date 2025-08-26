const buildError = require("../../helpers/erorrs/errorsHandeling");
const { taskNormalization } = require("../helpers/normelizeTask");
const taskValidator = require("./joi/taskValidation");
const mongoose = require("mongoose");

const validator = 'Joi';

const taskValidation = (req, res, next) => {
    console.log("in task validation");

    try {

        let task = req.body;

        //בדיקת תקינות של סוג המשתנה שהועבר בנתיב         
        if (req.params.id && !mongoose.isObjectIdOrHexString(req.params.id))
            return next(buildError("", "invalid id format at url", 400));

        task = taskNormalization(task, req.userInfo);
        console.log(task);

        if (validator == 'Joi') {

            const { error } = taskValidator(task);
            console.log("error" + error);
            

            if (error) {
                console.log("in task error validation");

                const validationError = error.details.map(detail => detail.message);
                return next(buildError("Joi Validation: ", validationError, 400));
            }

            req.newTaskNormalize = task;
            console.log(JSON.stringify( req.newTaskNormalize));
            
            return next();
        }
        return next(new Error("validator is not defined"));

    } catch (error) {
        next(error);
    }
}


module.exports = taskValidation;