const express = require("express");
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getMyTasks } = require("../models/taskAccessDBService");
const taskValidation = require("../validation/taskValidationService");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const auth = require("../../auth/authService");
const { taskNormalization } = require("../helpers/normelizeTask");
const mongoose = require("mongoose");
const router = express.Router();


//post new task
router.post('/', auth, taskValidation, async (req, res, next) => {
    console.log("in router-post");

    try {
        let task = req.body;
        let user = req.userInfo;

        task = taskNormalization(task, user);
        console.log(JSON.stringify(task) + "*******788");


        //בדיקת הרשאות - האם זה המשתמש עצמו / עובד שמושיך למנהל
        if (!((user.connectedEmployess).includes(task.workerTaskId) || task.workerTaskId == user.id)) {
            return next(buildError("Authorization", "access blocked, user not allow", 403));
        }

        //טיפול בשמירת הנתונים
        task = await createTask(task);
        res.status(201).send(task);

    } catch (error) {
        next(error);
    }
});

//get all tasks
router.get('/', auth, async (req, res, next) => {
    console.log("in get all tasks");

    try {
        const employeesId = req.userInfo;
        console.log(employeesId);

        if (employeesId.managerLevel < 1) {
            return next(buildError("Authorization", "access blocked, user not allow", 403));
        }
        else if (employeesId.connectedEmployess.length < 1)
            return next(buildError("Authorization", "you dont have employees", 403));

        const allTasks = await getAllTasks(req.userInfo.connectedEmployess);
        res.status(200).send(allTasks);

    } catch (error) {
        next(error);
    }
});


//get my tasks
router.get('/myTasks', auth, async (req, res, next) => {
    console.log("in get all my tasks");

    try {
        const allTasks = await getMyTasks(req.user);
        res.status(200).send(allTasks);

    } catch (error) {
        next(error);
    }
});

//get task by id
router.get('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;

        //בדיקת תקינות של סוג המשתנה שהועבר בנתיב        
        if (!mongoose.isObjectIdOrHexString(id))
            return next(buildError("", "invalid id format at url", 400));

        const task = await getTaskById(id);
        const user = req.userInfo;

        //בדיקת הרשאות - האם זה המשתמש עצמו / עובד שמושיך למנהל
        if (user.id != task.userIdCreatorTask && !(user.connectedEmployess).includes(id)) {
            return next(buildError("Authorization", "access blocked, user not allow", 403));
        }

        res.status(200).send(task);

    } catch (error) {
        next(error)
    }
});

//update task
router.put('/:id', auth, taskValidation, async (req, res, next) => {
    try {
        const { id } = req.params;
        const newtask = req.newTaskNormalize;
        console.log("new task "+ newtask);
        
        const user = req.userInfo;

        const taskFromDB = await getTaskById(id);

        //בדיקת הרשאות - האם זה המשתמש עצמו / עובד שמשויך למנהל
        if (user.id != taskFromDB.userIdCreatorTask && !(user.connectedEmployess).includes(id)) {
            return next(buildError("Authorization", "access blocked, user not allow", 403));
        }

        //שמירת נתונים בטבלה
        const updatedTask = await updateTask(id, newtask);
        res.status(201).send(updatedTask);

    } catch (error) {
        next(error);
    }
});


//delete task
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await deleteTask(id);
        const user = req.userInfo;

        //בדיקת הרשאות - האם זה המשתמש עצמו / עובד שמשויך למנהל
        if (user.id != task.userIdCreatorTask && !(user.connectedEmployess).includes(id)) {
            return next(buildError("Authorization", "access blocked, user not allow", 403));
        }

        res.status(200).send(task);

    } catch (error) {
        next();
    }
});

module.exports = router;
