const buildError = require("../../helpers/erorrs/errorsHandeling");
const User = require("./mongoDB/User");
const DB = process.env.DB
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { getMyTasks, getAllTasks, getTaskById } = require("../../tasks/models/taskAccessDBService");
const Task = require("../../tasks/models/mongoDB/Task");


//create user - register
const createUser = async (newUser) => {

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

    try {
        if (DB == "MongoDB") {
            const user = await User.findById({ _id: userId });
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

    try {
        if (DB == "MongoDB") {
            const user = await User.findOne({ email });

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

    try {
        if (DB == "MongoDB") {
            const allUsers = await User.find({ _id: { $in: managerEmployeesArray } });

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
           
            const user = await getUserById(idToDelete);

            let employees = user.connectedEmployess;

            employees = employees.map((employe) => { return employe.toString() });

            const managerId = user.directManager;

            const manager = await getUserById(managerId);

            const myTasks = await getMyTasks(idToDelete);

            const myEmployeesTaks = await getAllTasks(employees);


            //נעביר את כל העובדים של המשמתש למנהל שלו
            const tempArrEmployees = [...employees, ...(
                (manager.connectedEmployess).map((employeId) => { return employeId.toString() })
            )];
            
            let updatedManagerEmployees = Array.from(new Set(tempArrEmployees));
            updatedManagerEmployees = updatedManagerEmployees.map(employsId=>{return new mongoose.Types.ObjectId(employsId)})

            const newUser = await User.findByIdAndUpdate(managerId, {
                connectedEmployess: updatedManagerEmployees
            }, { new: true });


            //משימות אישיות של המשתמש / שקיבל מהמנהל הישיר יעברו למנהל

            await Promise.all([

                ...(employees.map((employee) => {
                    return User.findByIdAndUpdate(employee, {
                        directManager: managerId
                    })
                })),

                ...(myTasks.map((task) => {

                    return Task.findByIdAndUpdate(task._id, {
                        workerTaskId: managerId,
                        userIdCreatorTask: managerId,
                        type: "1"
                    });

                })),

                ...(myEmployeesTaks.map((task) => {

                    return Task.findByIdAndUpdate(task._id, {
                        userIdCreatorTask: managerId,
                        type: "2"
                    });

                }))]).then(res => {
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

            const user = await User.findByIdAndUpdate(managerId, { $pull: { connectedEmployess: userId } }, { new: true });

            const root = await getUserByEmail("root@gmail.com");
            if (user._id != root._id) {
                await User.findByIdAndUpdate(root._id, { $pull: { connectedEmployess: userId } }, { new: true });
            }
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw buildError("mongoose Error", error.message, 500);

    }

}

const verifyLogin = async (email, password) => {
    try {
        if (DB == "MongoDB") {

            const user = await User.findOne({ email });

            let isVaid = false;
            if (user) isVaid = await bcrypt.compare(password, user.password);

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