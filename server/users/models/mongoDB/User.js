const mongoose = require("mongoose");
const { NAME, PHONE, EMAIL, PASSWORD, IMAGE, ADDRESS, MINI_GENERAL_VALIDATION,CONNECTEDEMPLOYESS, MANAGER_LEVEL } = require("../../../helpers/mongoDB/generalValidation");

const userSchema = mongoose.Schema({
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
    connectedEmployess: CONNECTEDEMPLOYESS,
});

const User = mongoose.model('user', userSchema);
module.exports = User;