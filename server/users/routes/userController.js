const express = require("express");
const auth = require("../../auth/authService");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../models/userAccessDBService");
const { userValidation, userLoginValidation } = require("../validation/userValidatorService");
const { generateToken } = require("../../auth/providers/jwt");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const app = express();
const router = express.Router();

//add user - register
router.post('/', userValidation, async (req, res, next) => {
    console.log("in post user");
    try {
        let user = req.body;

        //טיפול בשמירת הנתונים
        user = await createUser(user);
        res.status(201).send(user);

    } catch (error) {
        return next(error);
    }
});

//login user
router.post('/login', userLoginValidation, async (req, res, next) => {
    console.log("in login user router");

    try {
        let user = req.body;

        //יצירת טוקן - המשתמש קיים
        const token = await generateToken(user);
        res.status(200).send(token);

    } catch (error) {
        return next(error);
    }
});

// get all users
router.get('/', auth, async (req, res, next) => {
    console.log("in get all users");
    const user = req.userInfo;
    console.log(JSON.stringify(user) + " user ****************");

    try {
        //נבדוק הרשאות
        console.log("manager level" + user.managerLevel);

        if (user.managerLevel < 1) {
            next(buildError("Authentication Error", "user not allow, access block", 403));
        }
        else if (user.connectedEmployess.length < 1) {
            next(buildError("Authentication Error", "you dont have employess", 403));
        }

        let allUsers = await getAllUsers();
        res.status(200).send(allUsers);

    } catch (error) {
        next(error);
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
            next(buildError("Authentication Error", "user not allow, access block", 403));
        };

        //שמירת נתונים במסד
        user = await getUserById(id);
        res.status(200).send(user);

    } catch (error) {
        next(error);
    }
});


// update user
router.put('/:id', auth, userValidation, async (req, res, next) => {
    console.log("in update user router");
    try {
        let { id } = req.params;
        let user = req.userInfo;

        //בדיקת הרשאות משתמש - המשתמש עצמו / המנהל
        if (user.id != id && !(user.connectedEmployess.includes(id))) {
            return next(buildError("Authentication Error", "user not allow, access block", 403));
        }

        //שמירת נתונים במסד
        user = await updateUser(id, req.body);        
        res.status(200).send(user);

    } catch (error) {
        next(error)
    }
});


// delete user
router.delete('/:id', auth, async (req, res, next) => {
    console.log("in delte user roiuter");
    try {
        let { id } = req.params;
        console.log(id);
        let user = req.userInfo;

        //בדיקת הרשאות משתמש - המשתמש עצמו / המנהל
        if(user.id != id && !(user.connectedEmployess).includes(id)){
            return next(("Authentication Error", "user not allow, access block", 403))
        }

        //שמירת נתונים במסד
        user = await deleteUser(id);
        res.status(200).send(user);
        
    } catch (error) {
        next(error);
    }
});


module.exports = router;