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
        throw buildError("mongoose Error", error.message, 500);
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
        throw buildError("mongoose Error", error, 500);
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
        throw buildError("mongoose Error", error, 500);
    }
};


//get all users
const getAllUsers = async (managerEmployeesArray) => {
    console.log("in get all users DB");
    console.log(managerEmployeesArray)

    try {
        const allUsers = await User.find({ _id: { $in: managerEmployeesArray } });
        console.log(allUsers + " all users");

        return allUsers;

    } catch (error) {
        throw buildError("mongoose Error", error, 500);
    }
};

//update user
const updateUser = async (userId, newUser) => {
    console.log("in update user DB");

    try {
        const user = await User.findByIdAndUpdate(userId, newUser, { new: true });
        return user;

    } catch (error) {
        throw buildError("mongoose Error", error, 500);
    }
};

//delete user
const deleteUser = async (userId, managerId) => {
    console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn ---------------------");

    console.log(userId);

    console.log("delete user DB");
    try {
        const user = await User.findByIdAndDelete(userId);
        await deleteUserFromManager(userId, managerId);
        return user;

    } catch (error) {
        throw buildError("mongoose Error", error, 500);
    }
};

const deleteUserFromManager = async (userId, managerId) => {
    try {
        console.log(managerId + "00000000000000000000000000000000000000000000000000000000");

        const user = await User.findByIdAndUpdate(managerId, { $pull: { connectedEmployess: userId } }, { new: true });
        console.log(user.connectedEmployess);
        console.log("8989898989989889");

        const root = await getUserByEmail("root@gmail.com");
        await User.findByIdAndUpdate(root._id, { $pull: { connectedEmployess: userId } }, { new: true });
        console.log(root.connectedEmployess);
    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);

    }

}

const verifyLogin = async (email, password) => {
    console.log("in verify login");
    console.log(email, password);

    try {

        const user = await User.findOne({ email });
        console.log(typeof user);

        console.log(user + "*****");
        console.log(user.password, password);


        let isVaid = false;
        if (user) isVaid = await bcrypt.compare(password, user.password);

        console.log(isVaid + "1212123132");

        return isVaid;
    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);
    }
}

const connectEmployeToManager = async (managerLevel, managerId, userToAddId, newArrayEmployees) => {
    try {

        console.log("form db patch");

        let directManagerEmployeesArray = newArrayEmployees;

        //במידה ומגיע מהדפדפן
        if (newArrayEmployees.connectedEmployess) {
            directManagerEmployeesArray = (newArrayEmployees.connectedEmployess).map(employeId => new mongoose.Types.ObjectId(employeId));
        }

        directManagerEmployeesArray.push(userToAddId);

        //לשייך את העובד גם לאדמין הראשי
        if (managerLevel != 3) {
            const root = await getUserByEmail("root@gmail.com");
            let rootConnectedEmployess = root.connectedEmployess;
            rootConnectedEmployess = [...root.connectedEmployess, userToAddId]

            const rootId = root._id;

            await User.findOneAndUpdate({ _id: rootId },
                { $set: { connectedEmployess: rootConnectedEmployess } },
                { new: true })

            console.log("finish root");
        }


        await User.findOneAndUpdate({ _id: managerId },
            { $set: { connectedEmployess: directManagerEmployeesArray } },
            { new: true });


    } catch (error) {
        console.log("erorr", error.message, 500);

        throw buildError("mongoose Error", error, 500)
    }
}

const changePassword = async (newPassword, userId) => {
    try {
        console.log("form db  password");


        const user = await User.findOneAndUpdate({ _id: userId }, { $set: { password: newPassword } }, { new: true });

        return user;

    } catch (error) {
        throw buildError("mongoose Error", error, 500)
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
    connectEmployeToManager,
    changePassword
};