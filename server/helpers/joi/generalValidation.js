const Joi = require("joi");


const GENERAL_VALIDATION = Joi.string()
    .required()
    .min(2)
    .max(256)
    .trim()
    .lowercase()

const MINI_GENERAL_VALIDATION = Joi.string()
    .required()
    .lowercase()

const NAME = Joi.object({
    first: GENERAL_VALIDATION,
    last: GENERAL_VALIDATION
});

const PHONE = Joi.string()
    .regex(/^(?:972|0)([23489]\d{7}|5\d{8})$/);

// להוסיף שזה שדה ייחודי*******
const EMAIL = Joi.string()
    .email()

const PASSWORD = Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`|\\/]).{8,}$/);


const IMAGE = Joi.object({
    url: Joi.string().allow(''),
    alt: Joi.string().min(2).max(256)
});

const ADDRESS = Joi.object({
    city: GENERAL_VALIDATION,
    street: GENERAL_VALIDATION,
    houseNumber: Joi.number()
        .required()
        .min(1),
    zip: Joi.number()
        .required()
        .min(1)
});


const MANAGER_LEVEL = Joi.string()
    .required()

const CONNECTEDEMPLOYESS = Joi.array()

const MINI_GENERAL_DATES = Joi.date().required()


module.exports = {
    GENERAL_VALIDATION,
    MINI_GENERAL_VALIDATION,
    NAME,
    PHONE,
    EMAIL,
    PASSWORD,
    IMAGE,
    ADDRESS,
    MANAGER_LEVEL,
    CONNECTEDEMPLOYESS,
    MINI_GENERAL_DATES,

}