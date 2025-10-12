const buildError = require("../../helpers/erorrs/errorsHandeling");
const User = require("./mongoDB/User");
const DB = process.env.DB
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { getMyTasks, getAllTasks, getTaskById } = require("../../tasks/models/taskAccessDBService");
const Task = require("../../tasks/models/mongoDB/Task");


//create user - register
const createUser = async (newUser) => {
    console.log("in create user DB");

    try {
        if (DB == "MongoDB") {
            let user = new User(newUser);
            user = await user.save();
            return user;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);
    }
};

//get user by id
const getUserById = async (userId) => {
    console.log("in get user by id DB");
    console.log(userId + "/////");

    try {
        if (DB == "MongoDB") {
            const user = await User.findById({ _id: userId });
            console.log(JSON.stringify(user));
            return user;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);
    }
};


//get user by email
const getUserByEmail = async (email) => {
    console.log("in get user by email DB");

    try {
        if (DB == "MongoDB") {
            console.log("inn");

            const user = await User.findOne({ email });
            console.log(user);

            return user;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);
    }
};


//get all users
const getAllUsers = async (managerEmployeesArray) => {
    console.log("in get all users DB");
    console.log(managerEmployeesArray)

    try {
        if (DB == "MongoDB") {
            const allUsers = await User.find({ _id: { $in: managerEmployeesArray } });
            console.log(allUsers + " all users");

            return allUsers;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);
    }
};

//update user
const updateUser = async (userId, newUser) => {
    console.log("in update user DB");

    try {
        if (DB == "MongoDB") {
            const user = await User.findByIdAndUpdate(userId, newUser, { new: true });
            return user;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);
    }
};

//delete user
const deleteUser = async (userId, managerId) => {
    console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");

    console.log(userId + " user id #");

    console.log("delete user DB");
    try {
        if (DB == "MongoDB") {
            await transformTasks_employees(userId, managerId); // העברת נתונים למנהל
            const user = await User.findByIdAndDelete(userId);//מחיקת המשתמש
            await deleteUserFromManager(userId, managerId);//מחיקת המשתמש ממערך העובדים של המנהל
            return user;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);
    }
};

const transformTasks_employees = async (idToDelete, manager_id) => {
    try {
        if (DB == "MongoDB") {
            console.log("in tranfrom");

            console.log(idToDelete + " user id to delete %");

            const user = await getUserById(idToDelete);
            console.log(user + " user to delete %");

            const employees = user.connectedEmployess;
            console.log(employees, " user employees %");

            const managerId = user.directManager;
            console.log(managerId, " direct manager %");

            const manager = await getUserById(managerId);
            console.log(manager, "  manager %");

            const myTasks = await getMyTasks(idToDelete);
            console.log(myTasks, "  users tasks %");

            const myEmployeesTaks = await getAllTasks(employees);
            console.log(myEmployeesTaks, " all employess users tasks");


            //נעביר את כל העובדים של המשמתש למנהל שלו
            const updatedManagerEmployees = Array.from(new Set([...manager.connectedEmployess, ...employees]));
            console.log(updatedManagerEmployees);
            console.log("update here new employess array of the manager");

            const newUser = await User.findByIdAndUpdate(managerId, {
                connectedEmployess: updatedManagerEmployees
            }, { new: true });

            console.log(newUser);
            console.log("update here new manager details %");


            //משימות אישיות של המשתמש / שקיבל מהמנהל הישיר יעברו למנהל

            await Promise.all([

                ...(employees.map((employee) => {
                    return employee.directManager == managerId;
                })),

                ...(myTasks.map((task) => {
                    console.log(2);

                    return Task.findByIdAndUpdate(task._id, {
                        workerTaskId: managerId,
                        userIdCreatorTask: managerId,
                        type: "1"
                    });

                })),

                ...(myEmployeesTaks.map((task) => {
                    console.log(1);

                    return Task.findByIdAndUpdate(task._id, {
                        userIdCreatorTask: managerId,
                        type: "2"
                    });

                }))]).then(res => {
                    console.log(res.data);
                }).catch(error => {
                    throw buildError("Mongoose Error:", error.message, 400)
                })

        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);

    }

}

const deleteUserFromManager = async (userId, managerId) => {
    try {
        if (DB == "MongoDB") {

            console.log(managerId + "00000000000000000000000000000000000000000000000000000000");

            const user = await User.findByIdAndUpdate(managerId, { $pull: { connectedEmployess: userId } }, { new: true });
            console.log(user.connectedEmployess);
            console.log("8989898989989889");

            const root = await getUserByEmail("root@gmail.com");
            if (user._id != root._id) {
                await User.findByIdAndUpdate(root._id, { $pull: { connectedEmployess: userId } }, { new: true });
                console.log(root.connectedEmployess);
            }
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);

    }

}

const verifyLogin = async (email, password) => {
    console.log("in verify login");
    console.log(email, password);

    try {
        if (DB == "MongoDB") {

            const user = await User.findOne({ email });
            console.log(typeof user);

            console.log(user + "*****");

            let isVaid = false;
            if (user) isVaid = await bcrypt.compare(password, user.password);

            console.log(isVaid + "1212123132");

            return isVaid;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);
    }
}

const connectEmployeToManager = async (managerLevel, managerId, userToAddId, newArrayEmployees) => {
    try {
        if (DB == "MongoDB") {

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
        }

        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {

        throw buildError("mongoose Error", error.message, 500);
    }
}

const changePassword = async (newPassword, userId) => {
    try {
        if (DB == "MongoDB") {
            console.log("form db  password");

            const user = await User.findOneAndUpdate({ _id: userId }, { $set: { password: newPassword } }, { new: true });
            return user;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);
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