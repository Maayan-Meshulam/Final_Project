const express = require("express");
const auth = require("../../auth/authService");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser, verifyLogin, connectEmployeToManager, changePassword, getUserByEmail } = require("../models/userAccessDBService");
const { userValidation, userLoginValidation } = require("../validation/userValidatorService");
const { generateToken, verifyToken } = require("../../auth/providers/jwt");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const { hash } = require("bcrypt");
const sendingEmail = require("../../emails/smtpServer");
const router = express.Router();
const jwt = require("jsonwebtoken")

//add user - register
router.post('/addUser', auth, userValidation, async (req, res, next) => {
    console.log("in post user");
    try {
        let user = req.userValid;
        console.log(req.userInfo);

        //נצטרך לקחת פרטים ישירות מהמסד - למקרה שיווצרו כמה עובדים אחד אחרי השני ולא יהיה בניהם חיבור מחדש למערכת
        //אם אין חיבור הפיילואד לא מתעדכן
        let manageronnect = await getUserById(req.userInfo.id);

        console.log(manageronnect);


        //נבדוק הרשאות
        if (manageronnect.managerLevel < 1) {
            return next(buildError("Authentication Error", "user not allow, access block", 403))
        }

        if (! await getUserById(user.directManager)) return next(buildError("details Error", "direct manager not exist", 400));


        //טיפול בשמירת הנתונים
        user = await createUser(user);

        await connectEmployeToManager(manageronnect.managerLevel, manageronnect._id, user._id, manageronnect.connectedEmployess);

        res.status(201).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});

//login user
router.post('/login', async (req, res, next) => {
    console.log("in login user router");

    try {
        let user = req.body;
        console.log(JSON.stringify(user));

        console.log(user.email, user.password + " verify");


        //בדיקת זהות המשתמש - האם קיים ופרטיו נכונים
        if (!await verifyLogin(user.email, user.password)) {
            console.log("innnnnnnnnnnnnnnnnnnnn");

            return next(buildError("Authentication Error", "user not register / details not right", 403))
        }

        //יצירת טוקן - המשתמש קיים
        const token = await generateToken(user);
        res.status(200).send(token);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});

// get all users
router.get('/', auth, async (req, res, next) => {

    try {
        console.log("in get all users");
        const user = req.userInfo;

        console.log(req);

        let { ArrEmployess } = (req.query);
        console.log(ArrEmployess);


        if (ArrEmployess == '') {
            console.log(1);
            ArrEmployess = [];
        }
        else if (!ArrEmployess) {
            console.log(3);
            return next(buildError("mongoose Error", `need to pass manager employess array in quary`, 500));
        }
        else {
            ArrEmployess = ArrEmployess.split(',');
            console.log(2);
        }

        // console.log(JSON.stringify(ArrEmployess) + "11111111111111111111111111111");
        // ArrEmployess = ArrEmployess.split(',')
        // console.log(JSON.stringify(ArrEmployess) + "11111111111111111111111111111");

        //נבדוק הרשאות
        console.log("manager level" + user.managerLevel);

        if (user.managerLevel < 1) {
            return next(buildError("Authentication Error", "user not allow, access block", 403));
        }
        // else if (user.connectedEmployess.length < 1) {
        //     next(buildError("Authentication Error", "you dont have employess", 403));
        // }

        let allUsers = await getAllUsers(ArrEmployess);
        console.log("hiiiiiiiiiii" + allUsers);

        res.status(200).send(allUsers);

    } catch (error) {
        return next(buildError("General Error", error.message, 403));
    }
});


//get user by email
router.get('/email/:email', async (req, res, next) => {
    try {
        console.log("in royer get by email");

        console.log(req.params);

        const { email } = req.params
        console.log(email);

        const user = await getUserByEmail(email);
        console.log(user);


        if (!user)
            return next(buildError("Authitcation Error:", "user not exist", 403));

        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));

    }
});

// get user by id
router.get('/:id', auth, async (req, res, next) => {
    console.log("in get user by id");

    try {
        console.log(req.params);
        let { id } = req.params;
        let user = req.userInfo;


        //בדיקת הרשאות משתמש - המשתמש עצמו / המנהל
        if (user.id != id && !(user.connectedEmployess).includes(id)) {
            return next(buildError("Authentication Error", "user not allow, access block", 403));
        };

        //שמירת נתונים במסד
        user = await getUserById(id);
        console.log("after saving");
        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});

// update user
router.put('/:id', auth, userValidation, async (req, res, next) => {
    console.log("in update user router");
    try {
        let { id } = req.params;
        let user = req.userInfo;
        let bodyValid = req.userValid;

        //בדיקת הרשאות משתמש - המשתמש עצמו / המנהל
        if (user.id != id && !(user.connectedEmployess.includes(id))) {
            return next(buildError("Authentication Error", "user not allow, access block", 403));
        }

        //שמירת נתונים במסד
        user = await updateUser(id, bodyValid);
        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});


// delete user
router.delete('/:id', auth, async (req, res, next) => {
    console.log("in delte user roiuter **************************************************************************");
    try {
        let { id } = req.params;
        console.log(id);
        let user = req.userInfo;

        let managerId = req.body.manager_id;
        console.log(managerId + "55555555555");


        //בדיקת הרשאות משתמש - המשתמש עצמו / המנהל
        if (user.id != id && !(user.connectedEmployess).includes(id)) {
            return next(("Authentication Error", "user not allow, access block", 403))
        }

        //שמירת נתונים במסד
        user = await deleteUser(id, managerId);
        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});


router.patch('/change-password/:id', async (req, res, next) => {
    try {

        console.log("in patch password");

        const { token } = req.query;
        console.log(req);

        const { id } = req.params;

        console.log(token);

        if (!token)
            return next(buildError("authication Error", "user not allow, access block", 403));


        const temp_payload = jwt.verify(token, "TEMP_SECRET");
        console.log(temp_payload);

        if (temp_payload.id != id)
            return next(buildError("authication Error", "user not match", 400));


        console.log(req.body);
        const { password, verpassword } = req.body

        if (password != verpassword)
            return next(buildError("validation Error", "passwords not match", 400));

        if (!((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`|\\/]).{8,}$/).test(password)))
            return next(buildError("validation Error", "password not match the pattern", 400));

        const bycrptPassword = await hash(password, 10);
        console.log(bycrptPassword);

        //שמירה בDB
        const user = changePassword(bycrptPassword, id)
        res.status(200).send(user)

    } catch (error) {
        return next(buildError("General Error", error.message, 400));

    }
})

//שינוי עובדים משויכים של מנהל
router.patch('/:id', async (req, res, next) => {
    try {
        console.log("in patch axios");
        const { id } = req.params;
        console.log("id + " + id);


        console.log(JSON.stringify(req.body) + "bodyyyyyy");

        const user = await connectEmployeToManager(id, req.body);
        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});


router.post('/send-email', async (req, res, next) => {
    try {
        console.log("in send email server");
        let { email, id, randomNum } = req.body;

        const token = jwt.sign({ id: id }, "TEMP_SECRET", { expiresIn: "15m" });
        console.log(token);

        let message = "";
        let title = "";

        //במקרה של שחזור סיסמא או עריכת משתמש
        if (randomNum < 0) {
            message = `
                <p>לחץ 
                    <a href="http://localhost:5173/users/change-password/${id}?token=${token}">כאן</a> 
                    על מנת לשחזר את הסיסמא שלך
                </p>`
                title = "שחזור סיסמא"
        }
        else {
            message = `
                <p>הסיסמא הינה  : 
                    ${randomNum}
                </p>
            `
            title = "קוד לעריכת פרטי משתמש"
        }


        console.log(email, message);

        message = await sendingEmail(email, message, title);
        console.log(message + "77??");

        res.status(200).send(message)

    } catch (error) {
        return next(buildError("General Error", error.message, 403));
    }
})


module.exports = router;