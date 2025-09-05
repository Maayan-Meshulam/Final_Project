const buildError = require("../../helpers/erorrs/errorsHandeling");
const User = require("./mongoDB/User");
const DB = "MongoDB"
const mongoose = require("mongoose");

//create user - register
const createUser = async (newUser) => {
    console.log("in create user DB");

    try {
        if (DB == "MongoDB") {
            let user = new User(newUser);
            user = await user.save();
            return user;
        }

    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
};

//get user by id
const getUserById = async (userId) => {
    console.log("in get user by id DB");
    console.log(userId + "/////");

    try {
        const user = await User.findById({ _id: userId });
        console.log(JSON.stringify(user));
        return user;

    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
};


//get user by email
const getUserByEmail = async (email) => {
    console.log("in get user by email DB");

    try {
        console.log("inn");

        const user = await User.find({ email });
        console.log(user);

        return user;

    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
};


//get all users
const getAllUsers = async (managerEmployeesArray) => {
    console.log("in get all users DB");
    console.log(managerEmployeesArray + "***************************");
    

    try {
        const allUsers = await User.find({_id : {$in : managerEmployeesArray}});
        console.log(allUsers + " all users");

        return allUsers;

    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
};

//update user
const updateUser = async (userId, newUser) => {
    console.log("in update user DB");

    try {
        const user = await User.findByIdAndUpdate(userId, newUser, { new: true });
        return user;

    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
};

//delete user
const deleteUser = async (userId) => {
    console.log(userId);

    console.log("delete user DB");
    try {
        const user = await User.findByIdAndDelete(userId);
        return user;

    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
};

const verifyLogin = async (email, password) => {
    console.log("in verify login");
    console.log(email, password);

    try {
        const isUserExist = await User.exists({ email, password });
        console.log(isUserExist + "*****");

        return isUserExist;
    } catch (error) {
        return buildError("mongoose Error", error, 500)
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    verifyLogin
};