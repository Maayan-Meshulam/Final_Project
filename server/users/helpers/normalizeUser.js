const { hash } = require("bcrypt");
const { default: mongoose } = require("mongoose");

const normaliztionUser = (user, bycrptPassword) => {

    const { firstName, lastName, phone, email, birthDay, url, alt,
        city, street, houseNumber, zip, startDate, jobType, role, fromWhereWorking, directManager
        , department, team, managerLevel, connectedEmployess
    } = { ...user }


    return {
        name: {
            first: firstName,
            last: lastName
        },
        phone: phone,
        email: email,
        password: bycrptPassword ,
        birthDay: new Date(birthDay),
        image: {
            url: url == "" ? "client/src/images/profile.png" : url,
            alt: alt == "" ? "defult profile" : alt,
        },
        address: {
            city: city,
            street: street,
            houseNumber: houseNumber,
            zip: zip
        },
        startDate: new Date(startDate),
        role: role,
        jobType: jobType,
        fromWhereWorking: fromWhereWorking,
        directManager: new mongoose.Types.ObjectId(directManager),
        department: department,
        team: team,
        managerLevel: managerLevel,
        connectedEmployess: connectedEmployess
    }
}

module.exports = normaliztionUser;