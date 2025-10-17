const express = require("express");
const auth = require("../../auth/authService");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser, verifyLogin, connectEmployeToManager, changePassword, getUserByEmail } = require("../models/userAccessDBService");
const { userValidation, userLoginValidation } = require("../validation/userValidatorService");
const { generateToken, verifyToken } = require("../../auth/providers/jwt");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const { hash } = require("bcrypt");
const sendingEmail = require("../../emails/smtpServer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const upload = require("../../helpers/multer/multerService");


// //login user
router.post('/login', async (req, res, next) => {

    try {
        let user = req.body;

        //בדיקת זהות המשתמש - האם קיים ופרטיו נכונים
        if (!await verifyLogin(user.email, user.password)) {
            return next(buildError("Authentication Error", "user not register / details not right", 403))
        }

        //יצירת טוקן - המשתמש קיים
        const token = await generateToken(user);
        res.status(200).send(token);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});

//add user - register
router.post('/addUser', auth, upload.single("image"), userValidation, async (req, res, next) => {
    try {
        if (!req.file) {
            return next(buildError("File Error", "no image file uploaded", 400))
        }
        let user = req.userValid;

        const newUrl = `/images/${req.file.filename}`;

        user = { ...(req.userValid), url: newUrl }

        let managerConnect = await getUserById(req.userInfo.id);

        //נבדוק הרשאות
        if (managerConnect.managerLevel < 1) {
            return next(buildError("Authentication Error", "user not allow, access block", 403))
        }

        if (! await getUserById(user.directManager)) return next(buildError("details Error", "direct manager not exist", 400));


        //טיפול בשמירת הנתונים
        user = await createUser(user);

        await connectEmployeToManager(managerConnect.managerLevel, managerConnect._id, user._id, managerConnect.connectedEmployess);

        //יצירת טוקן חדש ומעודכם לאחר הוספת משתמש
        const updatedPayload = {
            id: managerConnect._id,
            managerLevel: managerConnect.managerLevel,
            connectedEmployess: managerConnect.connectedEmployess,
        }

        const updatedToken = jwt.sign(updatedPayload, "secret");

        res.status(201).json({
            new_user: user,
            new_token: updatedToken
        });

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});


// get all users
router.get('/', auth, async (req, res, next) => {

    try {
        const user = req.userInfo;

        let { ArrEmployess } = (req.query);

        if (ArrEmployess == '') {
            ArrEmployess = [];
        }
        else if (!ArrEmployess) {
            return next(buildError("mongoose Error", `need to pass manager employess array in quary`, 500));
        }
        else {
            ArrEmployess = ArrEmployess.split(',');
        }


        //נבדוק הרשאות
        if (user.managerLevel < 1) {
            return next(buildError("Authentication Error", "user not allow, access block", 403));
        }

        let allUsers = await getAllUsers(ArrEmployess);

        res.status(200).send(allUsers);

    } catch (error) {
        return next(buildError("General Error", error.message, 403));
    }
});


//get user by email
router.get('/email/:email', async (req, res, next) => {
    try {

        const { email } = req.params

        const user = await getUserByEmail(email);

        if (!user)
            return next(buildError("Authitcation Error:", "user not exist", 403));

        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));

    }
});

// get user by id
router.get('/:id', auth, async (req, res, next) => {

    try {
        let { id } = req.params;
        let user = req.userInfo;

        //בדיקת הרשאות משתמש - המשתמש עצמו / המנהל
        if (user.id != id && !(user.connectedEmployess).includes(id)) {
            return next(buildError("Authentication Error", "user not allow, access block", 403));
        };

        //שמירת נתונים במסד
        user = await getUserById(id);
        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error.message, 403));
    }
});

// update user
router.put('/:id', auth, upload.single("image"), userValidation, async (req, res, next) => {
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
    try {
        let { id } = req.params;
        let user = req.userInfo;

        let managerId = req.body.manager_id;

        if (!user) {
            return next(buildError(("Error", "user not exsist", 400)));
        }

        //בדיקת הרשאות משתמש - המנהל
        if (!(user.connectedEmployess).includes(id)) {
            return next(buildError(("Authentication Error", "user not allow, access block", 403)))
        }

        //שמירת נתונים במסד
        user = await deleteUser(id, managerId);
        res.status(200).send("משתמש נמחק בהצלחה וכל הנתונים שלו הועברו למנהל הישיר");

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});


router.patch('/change-password/:id', async (req, res, next) => {
    try {
        const { token } = req.query;
        const { id } = req.params;
        
        console.log("BODY:", req.body);
        console.log("PARAM ID:", req.params.id);
        console.log("QUERY TOKEN:", req.query.token);

        if (!token)
            return next(buildError("authication Error", "user not allow, access block", 403));


        const temp_payload = jwt.verify(token, "TEMP_SECRET");

        if (temp_payload.id != id)
            return next(buildError("authication Error", "user not match", 400));

        const { password, verpassword } = req.body

        if (password != verpassword)
            return next(buildError("validation Error", "passwords not match", 400));

        if (!((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`|\\/]).{8,}$/).test(password)))
            return next(buildError("validation Error", "password not match the pattern", 400));

        const bycrptPassword = await hash(password, 10);

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
        const { id } = req.params;

        const user = await connectEmployeToManager(id, req.body);
        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});


router.post('/send-email', async (req, res, next) => {
    try {
        let { email, id, randomNum } = req.body;

        const token = jwt.sign({ id: id }, "TEMP_SECRET", { expiresIn: "15m" });

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


        message = await sendingEmail(email, message, title);

        res.status(200).send(message)

    } catch (error) {
        return next(buildError("General Error", error.message, 403));
    }
})


module.exports = router;