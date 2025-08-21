const Joi = require("joi");
const { MINI_GENERAL_VALIDATION, NAME,
    PHONE, EMAIL, PASSWORD, IMAGE, ADDRESS, MANAGER_LEVEL, CONNECTEDEMPLOYESS } = require("../../../helpers/joi/generalValidation");


const UserValidataion = (user) => {

    const schema = Joi.object({
        name: NAME,
        phone: PHONE,
        email: EMAIL,
        password: PASSWORD,
        image: IMAGE,
        address: ADDRESS,
        directManager: MINI_GENERAL_VALIDATION,
        department: MINI_GENERAL_VALIDATION,
        team: MINI_GENERAL_VALIDATION,
        managerLevel: MANAGER_LEVEL,
        connectedEmployess: CONNECTEDEMPLOYESS
    });

    console.log(schema.validate(user, { abortEarly: false }));

    return schema.validate(user, { abortEarly: false })
};

module.exports = UserValidataion;