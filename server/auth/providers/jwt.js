const Jwt = require("jsonwebtoken");
const SECRET_KEY = "secret"

//יצירת טוקן
const generateToken = (user, worker) => {
    const payload = {
        id: user.id,
        AdminLevel: user.AdminLevel,
        connectedEmployees: user.connectedEmployees,
        workerTaskId: worker
    }

    const token = Jwt.sign(payload, SECRET_KEY);
};

//בדיקת תקינות הטוקן
const verifyToken = (token) => {
    try {
        //בדיקת מהימנות הטוקן
        const payload = Jwt.verify(token, SECRET_KEY);
        console.log(payload + " payload");
        return payload;

    } catch (error) {
        return null;
    }
};


module.exports = {generateToken, verifyToken};