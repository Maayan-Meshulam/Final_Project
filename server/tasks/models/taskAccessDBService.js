//Task modle
const buildError = require("../../helpers/erorrs/errorsHandeling");
const Task = require("./mongoDB/Task");
const DB = "MongoDB" // ----> אינטגרציה ??

//add task
const createTask = async (newTask) => {
    try {
        if (DB == "MongoDB") {
            console.log("in create task mongo");
            let task = new Task(newTask);
            task = await task.save();
            return task;
        }
        return (buildError("Mongoose Error:", "DB type is not exist", 500))

    } catch (error) {
        return (buildError("Mongoose Error:", error, 500))
    }
}

//get all tasks
const getAllTasks = async (connectedEmployess, managerId) => {
    try {
        if (DB == "MongoDB") {

            const allTasks = await Task.find({ userIdCreatorTask: { $in: [...connectedEmployess, managerId] } });
            console.log(JSON.stringify(allTasks) + "////////////////");
            return allTasks;
        }
        return (buildError("Mongoose Error:", "DB type is not exist", 500))

    } catch (error) {
        return (buildError("Mongoose Error:", error, 500))
    }


}

//get my tasks
const getMyTasks = async (userId) => {
    console.log(userId + " 8");

    console.log("in my tasks");
    try {
        if (DB == "MongoDB") {
            const myTasks = await Task.find({ workerTaskId: userId });
            return myTasks;
        }
        return (buildError("Mongoose Error:", "DB type is not exist", 500))

    } catch (error) {
        return (buildError("Mongoose Error:", error, 500))
    }

}

//get task by id
const getTaskById = async (taskId) => {
    console.log("in task by id")

    try {
        if (DB == "MongoDB") {
            const task = await Task.findById(taskId);            
            return task;
        }
        return (buildError("Mongoose Error:", "DB type is not exist", 500))

    } catch (error) {
        return (buildError("Mongoose Error:", error, 500))
    }
}

//update task
const updateTask = async (taskId, newTask) => {

    try {
        if (DB == "MongoDB") {
            const taskUpdated = await Task.findByIdAndUpdate(taskId, newTask, { new: true });
            return taskUpdated;
        }
        return (buildError("Mongoose Error:", "DB type is not exist", 500))

    } catch (error) {
        return (buildError("Mongoose Error:", error, 500))
    }
}

//delete task
const deleteTask = async (taskId) => {
    console.log("in delete task");

    try {
        if (DB == "MongoDB") {
            const taskRemove = await Task.findByIdAndDelete(taskId);
            return taskRemove;
        }
        return (buildError("Mongoose Error:", "DB type is not exist", 500))

    } catch (error) {
        return (buildError("Mongoose Error:", error, 500))
    }
}


module.exports = {
    createTask,
    getAllTasks,
    getMyTasks,
    getTaskById,
    updateTask,
    deleteTask
}