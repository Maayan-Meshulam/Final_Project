const buildError = require("../../helpers/erorrs/errorsHandeling");
const { taskNormalization } = require("../helpers/normelizeTask");
const taskValidator = require("./joi/taskValidation");
const mongoose = require("mongoose");

const VALIDATOR = process.env.VALIDATOR;

const taskValidation = (req, res, next) => {
    console.log("in task validation");

    try {

        let task = req.body;
        let { id } = req.params;
        console.log(id + "............");


        //בדיקת תקינות של סוג המשתנה שהועבר בנתיב         
        if (id && !mongoose.isObjectIdOrHexString(id))
            return next(buildError("", "invalid id format at url", 400));

        task = taskNormalization(task, req.userInfo);
        console.log(task);
        console.log("\n normalize up 1!!");


        if (VALIDATOR == 'joi') {

            const { error } = taskValidator(task);
            console.log("error" + error);


            if (error) {
                console.log("in task error validation");

                const validationError = error.details.map(detail => detail.message);
                return next(buildError("joi Validation: ", validationError, 400));
            }

            req.newTaskNormalize = task;
            console.log(JSON.stringify(req.newTaskNormalize));

            return next();
        }
        return next(buildError('Validator Error', 'validator is not defined', 400));

    } catch (error) {
        return next(buildError('Error', error.message, 500));
    }
}


module.exports = taskValidation;