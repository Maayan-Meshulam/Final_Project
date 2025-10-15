const buildError = require("../../helpers/erorrs/errorsHandeling");
const { taskNormalization } = require("../helpers/normelizeTask");
const taskValidator = require("./joi/taskValidation");
const mongoose = require("mongoose");

const VALIDATOR = process.env.VALIDATOR;

const taskValidation = (req, res, next) => {

    try {

        let task = req.body;
        let { id } = req.params;

        //בדיקת תקינות של סוג המשתנה שהועבר בנתיב         
        if (id && !mongoose.isObjectIdOrHexString(id))
            return next(buildError("", "invalid id format at url", 400));

        task = taskNormalization(task, req.userInfo);
   
        if (VALIDATOR == 'joi') {

            const { error } = taskValidator(task);


            if (error) {

                const validationError = error.details.map(detail => detail.message);
                return next(buildError("joi Validation: ", validationError, 400));
            }

            req.newTaskNormalize = task;

            return next();
        }
        return next(buildError('Validator Error', 'validator is not defined', 400));

    } catch (error) {
        return next(buildError('Error', error.message, 500));
    }
}


module.exports = taskValidation;