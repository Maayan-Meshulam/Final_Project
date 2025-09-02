const mongoose = require("mongoose");
const { NAME, PHONE, EMAIL, PASSWORD, IMAGE, ADDRESS, MINI_GENERAL_VALIDATION,CONNECTEDEMPLOYESS, MANAGER_LEVEL,MINI_GENERAL_DATES } = require("../../../helpers/mongoDB/generalValidation");

const userSchema = mongoose.Schema({
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
        managerName: MINI_GENERAL_VALIDATION,
        department: MINI_GENERAL_VALIDATION,
        team: MINI_GENERAL_VALIDATION,
        managerLevel: MANAGER_LEVEL,
        connectedEmployess: CONNECTEDEMPLOYESS
});

const User = mongoose.model('user', userSchema);
module.exports = User;