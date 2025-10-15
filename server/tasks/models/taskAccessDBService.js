//Task modle
const buildError = require("../../helpers/erorrs/errorsHandeling");
const Task = require("./mongoDB/Task");
const DB = process.env.DB // ----> אינטגרציה ??

//add task
const createTask = async (newTask) => {
    try {
        if (DB == "MongoDB") {
            let task = new Task(newTask);
            task = await task.save();
            return task;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw (buildError("Mongoose Error:", error.message, 500))
    }
}

//get all tasks
const getAllTasks = async (connectedEmployess) => {
    try {
        if (DB == "MongoDB") {
            const allTasks = await Task.find({ workerTaskId: { $in: connectedEmployess } });
            return allTasks;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw (buildError("Mongoose Error:", error.message, 500))
    }


}

//get my tasks
const getMyTasks = async (userId) => {
    
    try {
        if (DB == "MongoDB") {
            const myTasks = await Task.find({ workerTaskId: userId });
            return myTasks;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw (buildError("Mongoose Error:", error.message, 500))
    }

}

//get task by id
const getTaskById = async (taskId) => {
    try {
        if (DB == "MongoDB") {
            const task = await Task.findById(taskId);
            return task;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw (buildError("Mongoose Error:", error.message, 500))
    }
}

//update task
const updateTask = async (taskId, newTask) => {

    try {
        if (DB == "MongoDB") {
            const taskUpdated = await Task.findByIdAndUpdate(taskId, newTask, { new: true });
            return taskUpdated;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw (buildError("Mongoose Error:", error.message, 500))
    }
}

//delete task
const deleteTask = async (taskId) => {
    try {
        if (DB == "MongoDB") {
            const taskRemove = await Task.findByIdAndDelete(taskId);
            return taskRemove;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw (buildError("Mongoose Error:", error.message, 500))
    }
}

//like-unlike task
const likeUnlikeTask = async (taskId) => {
    try {
        if (DB == "MongoDB") {
            const temp = await Task.findById(taskId, { star: 1 });
            
            const task = await Task.findByIdAndUpdate(taskId,
                { $bit: { star: { xor: 1 } } }, { new: true });
           

            return task;
        }
        else
            throw buildError("Mongoose Error:", "DB type is not exist", 500)

    } catch (error) {
        throw (buildError("Mongoose Error:", error.message, 500))
    }
}


module.exports = {
    createTask,
    getAllTasks,
    getMyTasks,
    getTaskById,
    updateTask,
    deleteTask,
    likeUnlikeTask
}