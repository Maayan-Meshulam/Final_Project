const express = require("express");
const router = express.Router();
const taskRouter = require("../tasks/routes/taskController");
const userRouter = require("../users/routes/userController");
const { verifyLogin } = require("../users/models/userAccessDBService");
const buildError = require("../helpers/erorrs/errorsHandeling");
const { generateToken } = require("../auth/providers/jwt");

router.use('/tasks', taskRouter);
router.use('/users', userRouter);


//login user - home router
router.post('/', async (req, res, next) => {
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

module.exports = router;