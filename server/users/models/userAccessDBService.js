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

    try {
        const user = await User.findById({ _id: userId });
        return user;

    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
};


//get user by email
const getUserByEmail = async (email) => {
    console.log("in get user by email DB");

    try {
        const user = await User.find({ email });
        return user;

    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
};


//get all users
const getAllUsers = async (employess) => {
    console.log("in get all users DB");

    try {
        const allUsers = await User.find({ _id: { $in: employess } });
        return allUsers;

    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
};

//update user
const updateUser = async (userId, newUser) => {
    console.log("in update user DB");

    try {
        const user = await User.findByIdAndUpdate(userId, newUser, {new: true});        
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


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
};