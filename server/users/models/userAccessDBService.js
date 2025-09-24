const buildError = require("../../helpers/erorrs/errorsHandeling");
const User = require("./mongoDB/User");
const DB = "MongoDB"
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

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

        const user = await User.findOne({ email });
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
        const allUsers = await User.find({ _id: { $in: managerEmployeesArray } });
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
        const user = await User.find({ email, password }, { email });
        console.log(JSON.stringify(isUserExist) + "*****");

        const isVaid = false;
        if (user) isVaid = bcrypt.compare(password, user.password);

        return isVaid;
    } catch (error) {
        return buildError("mongoose Error", error, 500);
    }
}

const connectEmployeToManager = async (managerId, userToAddId, newArrayEmployees) => {
    try {

        console.log("form db patch");

        let directManagerEmployeesArray = newArrayEmployees;
        //במידה ומגיע מהדפדפן
        if (newArrayEmployees.connectedEmployess) {
            directManagerEmployeesArray = (newArrayEmployees.connectedEmployess).map(employeId => new mongoose.Types.ObjectId(employeId));
        }

        directManagerEmployeesArray.push(userToAddId);

        //לשייך את העובד גם לאדמין הראשי
        const root = await getUserByEmail("root@gmail.com");
        let rootConnectedEmployess = root.connectedEmployess;
        rootConnectedEmployess = [...root.connectedEmployess, userToAddId]

        const rootId = root._id;


        await User.findOneAndUpdate({ _id: rootId },
            { $set: { connectedEmployess: rootConnectedEmployess } },
            { new: true })

        console.log("finish root");
        
        const user = await User.findOneAndUpdate({ _id: managerId },
            { $set: { connectedEmployess: directManagerEmployeesArray } },
            { new: true });

        return user;

    } catch (error) {
        console.log("erorr", error.message, 500);

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
    verifyLogin,
    connectEmployeToManager
};