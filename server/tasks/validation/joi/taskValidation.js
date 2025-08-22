const Joi = require("joi");
const { GENERAL_VALIDATION, MINI_GENERAL_VALIDATION } = require("../../../helpers/joi/generalValidation");

const taskValidator = (task) => {
    const schema = Joi.object({
        title: GENERAL_VALIDATION,
        subTitle: GENERAL_VALIDATION,
        description: GENERAL_VALIDATION.max(1024),
        workerTaskId: Joi.number(),
        receiptDate: MINI_GENERAL_VALIDATION,
        deadLine: Joi.string(),
        status: MINI_GENERAL_VALIDATION,
        type: MINI_GENERAL_VALIDATION
    });
    
    console.log(schema.validate(task, {abortEarly:false}));
    
    return schema.validate(task, {abortEarly:false});
};

module.exports = taskValidator;