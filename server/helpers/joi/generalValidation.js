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
    url: Joi.string(),
    alt: Joi.string().min(2).max(256)
});

const ADDRESS = Joi.object({
    city: GENERAL_VALIDATION,
    street: GENERAL_VALIDATION,
    houseNumber: Joi.string()
        .required()
        .min(2),
    zip: Joi.string()
        .required()
        .min(2)
});


const MANAGER_LEVEL = Joi.number()
.required()

const CONNECTEDEMPLOYESS = Joi.array()


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
    CONNECTEDEMPLOYESS
}