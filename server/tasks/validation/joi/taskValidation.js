const Joi = require("joi");
const { GENERAL_VALIDATION, MINI_GENERAL_VALIDATION } = require("../../../helpers/joi/generalValidation");

const taskValidator = (task) => {
    const schema = Joi.object({
        title: GENERAL_VALIDATION,
        subTitle: GENERAL_VALIDATION,
        description: GENERAL_VALIDATION.concat(Joi.max(1024)),
        workerTaskId: Joi.required(),
        receiptDate: Joi.date(),
        deadLine: Joi.date(),
        status: MINI_GENERAL_VALIDATION,
        type: MINI_GENERAL_VALIDATION,
        userIdCreatorTask: Joi.required()
    });
        
    return schema.validate(task, {abortEarly:false});
};

module.exports = taskValidator;