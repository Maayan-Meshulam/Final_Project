const Jwt = require("jsonwebtoken");
const { getUserById, getUserByEmail } = require("../../users/models/userAccessDBService");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const SECRET_KEY = "secret"

//יצירת טוקן
const generateToken = async (user) => {
    console.log("in genertae func");
    console.log("email", user.email);


    try {
        const [userFromDB] = await getUserByEmail(user.email);
        console.log(JSON.stringify(userFromDB) + "******************");

        if (!userFromDB) {
            console.log("noooooo");
            throw new Error("Mongoode Error, user's datails not rigth / need registeration");
        }

        console.log("importent!! "+ userFromDB.connectedEmployess);
        

        const payload = {
            id: userFromDB._id,
            managerLevel: userFromDB.managerLevel,
            connectedEmployess: userFromDB.connectedEmployess,
        }

        console.log(userFromDB._id);

        console.log(payload);

        const token = Jwt.sign(payload, SECRET_KEY);
        return token;

    } catch (error) {
        throw new Error(error);
    }
};

//בדיקת תקינות הטוקן
const verifyToken = (token) => {
    console.log("in verify token");

    try {
        //בדיקת מהימנות הטוקן
        const payload = Jwt.verify(token, SECRET_KEY);
        return payload;

    } catch (error) {
        return null;
    }
};


module.exports = { generateToken, verifyToken };