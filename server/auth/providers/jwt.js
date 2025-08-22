const Jwt = require("jsonwebtoken");
const { getUserById, getUserByEmail } = require("../../users/models/userAccessDBService");
const SECRET_KEY = "secret"

//יצירת טוקן
const generateToken = async(user) => {
    console.log("in genertae func");    
    
    const userFromDB = await getUserByEmail(user.email);    
    
    const payload = {
        id: userFromDB._id,
        managerLevel: userFromDB.managerLevel,
        connectedEmployess: userFromDB.connectedEmployess ?? [],
    }    

    console.log(payload);
    

    const token = Jwt.sign(payload, SECRET_KEY);
    return token;
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


module.exports = {generateToken, verifyToken};