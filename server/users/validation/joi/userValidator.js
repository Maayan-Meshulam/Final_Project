const Joi = require("joi");
const { MINI_GENERAL_VALIDATION, NAME,
    PHONE, EMAIL, PASSWORD, IMAGE, ADDRESS, MANAGER_LEVEL, CONNECTEDEMPLOYESS, MINI_GENERAL_DATES} = require("../../../helpers/joi/generalValidation");
const { default: mongoose } = require("mongoose");


const userValid = (user) => {
    
    const schema = Joi.object({
        name: NAME,
        phone: PHONE,
        email: EMAIL,
        password: PASSWORD,
        birthDay:MINI_GENERAL_DATES,
        image: IMAGE,
        address: ADDRESS,
        startDate: MINI_GENERAL_DATES,
        role: MINI_GENERAL_VALIDATION,
        jobType: MINI_GENERAL_VALIDATION,
        fromWhereWorking: MINI_GENERAL_VALIDATION,
        directManager: Joi.required() ,
        // Joi.object().length(24).hex()
        department: MINI_GENERAL_VALIDATION,
        team: MINI_GENERAL_VALIDATION,
        managerLevel: MANAGER_LEVEL,
        connectedEmployess: CONNECTEDEMPLOYESS
    });

    return schema.validate(user, { abortEarly: false })
};

const UserValidLogin = (user) => {
    const schema = Joi.object({
        email: EMAIL,
        password: PASSWORD
    });

    return schema.validate(user, { abortEarly: false });
};

module.exports = { userValid, UserValidLogin };