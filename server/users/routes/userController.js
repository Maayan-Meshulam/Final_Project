const express = require("express");
const auth = require("../../auth/authService");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../models/userAccessDBService");
const { userValidation, userLoginValidation } = require("../validation/userValidatorService");
const { generateToken } = require("../../auth/providers/jwt");
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
        console.log(error);
    }
});

router.get('/login', userLoginValidation, async (req, res, next) => {
    console.log("in login user router");

    try {
        let user = req.body;
        //יצירת טוקן - המשתמש קיים
        const token = generateToken(user);
        console.log(token + " token");
        res.status(200).send(token);

    } catch (error) {
        console.log(error);
    }
});

// get all users
router.get('/', auth, async (req, res, next) => {
    console.log("in get all users");

    try {
        let allUsers = await getAllUsers();
        res.status(200).send(allUsers);

    } catch (error) {
        next(error);
    }
});

// get user by id
router.get('/:id', async (req, res, next) => {
    console.log("in get user by id");

    try {
        console.log(req.params);
        let { id } = req.params;
        let user = await getUserById(id);
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
    }
});


// update user
router.put('/:id', async (req, res, next) => {
    console.log("in update user router");
    try {
        let { id } = req.params;
        let user = await updateUser(id);
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
});


// delete user
router.delete('/:id', async (req, res, next) => {
    console.log("in delte user roiuter");
    try {
        let { id } = req.params;
        console.log(id);
        let user = await deleteUser(id);
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;