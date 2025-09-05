const { required, date } = require("joi");
const { Schema, default: mongoose } = require("mongoose");

const GENERAL_VALIDATION = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true
}

const MINI_GENERAL_VALIDATION = {
    type: String,
    required: true,
    lowercase: true,
}

const NAME = Schema({
    first: GENERAL_VALIDATION,
    last: GENERAL_VALIDATION
});

const PHONE = {
    type: String,
    match: RegExp(/^(?:972|0)([23489]\d{7}|5\d{8})$/)
};

const EMAIL = {
    type: String,
    unique: true,
    match: RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
};

const PASSWORD = {
    type: String,
    match: RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`|\\/]).{8,}$/)
};

const IMAGE = Schema({
    url: { type: String },
    alt: { type: String, minLength: 2, maxLength: 256 }
});

const ADDRESS = Schema({
    city: GENERAL_VALIDATION,
    street: GENERAL_VALIDATION,
    houseNumber: {
        type: Number,
        required: true,
        min: 1
    },
    zip: {
        type: Number,
        required: true,
        min: 1
    }
});


const MANAGER_LEVEL = {
    type: Number,
    required: true
};

const CONNECTEDEMPLOYESS = {
    type: [mongoose.Types.ObjectId],
    required: true,
    defult: []
};

const WORKER = {
};

const MINI_GENERAL_DATES = {
    type: Date,
    required: true
}


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
    WORKER,
    MINI_GENERAL_DATES
}