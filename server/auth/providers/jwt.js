const Jwt = require("jsonwebtoken");
const { getUserById, getUserByEmail } = require("../../users/models/userAccessDBService");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const SECRET_KEY = process.env.SECRET_KEY;

//יצירת טוקן
const generateToken = async (user) => {

    try {
        const userFromDB = await getUserByEmail(user.email);

        if (!userFromDB) {
            throw new Error("Mongoode Error, user's datails not rigth / need registeration");
        }
        else {
            const payload = {
                id: userFromDB._id,
                managerLevel: userFromDB.managerLevel,
                connectedEmployess: userFromDB.connectedEmployess,
            }

            const token = Jwt.sign(payload, SECRET_KEY);
            return token;
        }
    } catch (error) {
        throw new Error(error);
    }
};

//בדיקת תקינות הטוקן
const verifyToken = (token) => {

    try {
        //בדיקת מהימנות הטוקן
        const payload = Jwt.verify(token, SECRET_KEY);
        return payload;

    } catch (error) {
        return null;
    }
};


module.exports = { generateToken, verifyToken };