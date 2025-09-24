const express = require("express");
const auth = require("../../auth/authService");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser, verifyLogin, connectEmployeToManager } = require("../models/userAccessDBService");
const { userValidation, userLoginValidation } = require("../validation/userValidatorService");
const { generateToken, verifyToken } = require("../../auth/providers/jwt");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const app = express();
const router = express.Router();

//add user - register
router.post('/addUser', auth, userValidation, async (req, res, next) => {
    console.log("in post user");
    try {
        let user = req.body;
        let userConnectInfo = req.userInfo;
        console.log(userConnectInfo);


        //נבדוק הרשאות
        if (userConnectInfo.managerLevel < 1) {
            return next(buildError("Authentication Error", "user not allow, access block", 403))
        }

        //טיפול בשמירת הנתונים
        user = await createUser(user);

        console.log(userConnectInfo.connectedEmployess);
        
        user = await connectEmployeToManager(userConnectInfo.id, user._id, userConnectInfo.connectedEmployess);
        
        res.status(201).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});

//login user
router.post('/login', userLoginValidation, async (req, res, next) => {
    console.log("in login user router");

    try {
        let user = req.body;
        console.log(JSON.stringify(user));

        console.log(user.email, user.password + " verify");

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

// get all users
router.get('/', auth, async (req, res, next) => {
    console.log("in get all users");
    const user = req.userInfo;
    let { ArrEmployess } = (req.query)
    console.log(JSON.stringify(ArrEmployess) + "11111111111111111111111111111");
    ArrEmployess = ArrEmployess.split(',')
    console.log(JSON.stringify(ArrEmployess) + "11111111111111111111111111111");

    try {
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

        //בדיקת הרשאות משתמש - המשתמש עצמו / המנהל
        if (user.id != id && !(user.connectedEmployess.includes(id))) {
            return next(buildError("Authentication Error", "user not allow, access block", 403));
        }

        //שמירת נתונים במסד
        user = await updateUser(id, req.body);
        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
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
        if (user.id != id && !(user.connectedEmployess).includes(id)) {
            return next(("Authentication Error", "user not allow, access block", 403))
        }

        //שמירת נתונים במסד
        user = await deleteUser(id);
        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
});

//שינוי עובדים משויכים של מנהל
router.patch('/:id', async (req, res, next) => {
    try {
        console.log("in patch axios");
        const { id } = req.params;
        console.log("id + " +id);
        

        console.log(JSON.stringify(req.body) + "bodyyyyyy");

        const user = await connectEmployeToManager(id, req.body);
        res.status(200).send(user);

    } catch (error) {
        return next(buildError("General Error", error, 403));
    }
})

module.exports = router;