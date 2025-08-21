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
        console.log(error);
    }
};

//get user by id
const getUserById = async (userId) => {
    console.log("in get user by id DB");

    try {
        const user = await User.find({ id: userId });
        return user;

    } catch (error) {
        console.log(error);
    }
};

//get all users
const getAllUsers = async () => {
    console.log("in get all users DB");

    try {
        const allUsers = await User.find({});
        return allUsers;

    } catch (error) {
        console.log(error);
    }
};

//update user
const updateUser = async (userId) => {
    console.log("in update user DB");

    try {
        const user = await User.findByIdAndUpdate(userId);
        return user;

    } catch (error) {
        console.log(error);
    }
};

//delete user
const deleteUser = async (userId) => {
    console.log(userId);
    
    console.log("delete user DB");
    try {        
        const user = await User.findByIdAndDelete(userId);
        console.log(user);
        return user;

    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};