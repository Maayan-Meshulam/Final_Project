const Joi = require("joi");
const { GENERAL_VALIDATION, MINI_GENERAL_VALIDATION } = require("../../../helpers/joi/generalValidation");

const taskValidator = (task) => {
    console.log("in task validator");
    
    const schema = Joi.object({
        title: GENERAL_VALIDATION,
        subTitle: GENERAL_VALIDATION,
        description: GENERAL_VALIDATION.concat(Joi.string().max(1024)),
        workerTaskId: Joi.required(),
        receiptDate: Joi.date().required(),
        deadLine: Joi.date().required(),
        status: MINI_GENERAL_VALIDATION,
        type: MINI_GENERAL_VALIDATION,
        userIdCreatorTask: Joi.required()
    });
            
    return schema.validate(task, {abortEarly:false});
};

module.exports = taskValidator;