const express = require("express");
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../models/taskAccessDBService");
const taskValidation = require("../validation/taskValidationService");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const auth = require("../../auth/authService");
const { getUserById } = require("../../users/models/userAccessDBService");
const router = express.Router();


//post new task
router.post('/', auth, taskValidation, async (req, res, next) => {
    console.log("in router-post");

    try {
        let task = req.body;
        console.log(JSON.stringify(task) + "task");
        
        let user = req.userInfo;    
        user = await getUserById(user.id);          
        
        console.log(JSON.stringify(user));
        console.log(user.connectedEmployess, task.workerTaskId);
        
        //בדיקת הרשאות - האם זה המשתמש עצמו / עובד שמושיך למנהל
        if (!((user.connectedEmployess).includes(task.workerTaskId) || task.workerTaskId == user.id)) {
            
            return next(buildError("Authorization", "access blocked, user not allow", 403));
        }        

        //טיפול בשמירת הנתונים
        task = await createTask(task);
        res.status(201).send("task added successfully");

    } catch (error) {   
        next(error);
    }
});

//get all tasks
router.get('/', async (req, res) => {
    try {
        const allTasks = await getAllTasks();
        res.status(200).send("all tasks recived")
    } catch (error) {
        console.log(error);
    }
});

//get task by id
router.get('/:id', async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const task = await getTaskById(id);
        res.status(200).send(`task ${id} recived successfully`);
    } catch (error) {
        console.log(error);
    }
});

//update task
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = req.newTask
        const updatedTask = await updateTask(id, updatedTask);
        res.status(201).send("task updated successfully");
    } catch (error) {
        console.log(error);
    }
});


//delete task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const taskDeleted = await deleteTask(id);
        res.status(200).send("task deleted successfully");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
