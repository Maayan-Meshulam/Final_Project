//Task modle
const Task = require("./mongoDB/Task");
const DB = "MongoDB" // ----> אינטגרציה ??

//add task
const createTask = async (newTask) => {
    if (DB == "MongoDB")
        try {
            console.log("in create task mongo");
            console.log(newTask);
            let task = new Task(newTask);
            task = await task.save();
            console.log("after saving task in mongo");
            return task;
        } catch (error) {
            console.log(error);
        }
}

//get all tasks
const getAllTasks = async () => {
    if (DB == "MongoDB") {
        try {
            const allTasks = await Task.find();
            return allTasks;
        } catch (error) {
            console.log(error);
        }
    }
}

//get task by id
const getTaskById = async (taskId) => {
    if (DB == "MongoDB") {
        try {
            const task = await Task.findById(taskId);
            return task;
        } catch (error) {
            console.log(error);
        }
    }
}

//update task
const updateTask = async (taskId, newTask) => {
    if (DB == "MongoDB") {
        try {
            const taskUpdated = await Task.findByIdAndUpdate(taskId, newTask, { new: true });
            return taskUpdated;
        } catch (error) {
            console.log(error);
        }
    }
}

//delete task
const deleteTask = async (taskId) => {
    if (DB == "MongoDB") {
        try {
            const taskRemove = await Task.findByIdAndDelete(taskId);
            return taskRemove;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}