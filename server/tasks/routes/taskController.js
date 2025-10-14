const express = require("express");
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getMyTasks, likeUnlikeTask } = require("../models/taskAccessDBService");
const taskValidation = require("../validation/taskValidationService");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const auth = require("../../auth/authService");
const mongoose = require("mongoose");
const { getUserById } = require("../../users/models/userAccessDBService");
const router = express.Router();


//post new task
router.post('/', auth, taskValidation, async (req, res, next) => {
    console.log("in router-post");

    try {
        let task = req.newTaskNormalize;
        let user = req.userInfo;

        console.log(JSON.stringify(task) + "*******788");

        console.log(task.workerTaskId);
        console.log(user.id);


        //בדיקת הרשאות - האם זה המשתמש עצמו / עובד שמושיך למנהל
        if (!((user.connectedEmployess).includes(task.workerTaskId) || task.workerTaskId == user.id)) {
            return next(buildError("Authorization Error", "access blocked, user not allow", 403));
        }

        console.log(JSON.stringify(task));
        console.log("tasl before seving");


        //טיפול בשמירת הנתונים
        task = await createTask(task);
        res.status(201).send(task);

    } catch (error) {
        return next(buildError("Error", error.message, 500))
    }
});


//get my tasks
router.get('/myTasks', auth, async (req, res, next) => {
    console.log("in get all my tasks");
    console.log(JSON.stringify(req.userInfo) + "*************");

    try {
        const allTasks = await getMyTasks(req.userInfo.id);
        res.status(200).send(allTasks);

    } catch (error) {
        return next(buildError("Error", error.message, 500))
    }
});

//קבלת כל המשימות של העבודים - עבור מנהלים
//לנסות לשנותconst ואז לראות את השגיאה - חובה לטפל !!
router.get('/', auth, async (req, res, next) => {

    try {
        console.log("in all tasks");

        console.log(req.query);

        let { arrEmployess } = req.query;

        if (arrEmployess == '') {
            console.log(1);
            arrEmployess = [];
        }
        else if (!arrEmployess) {
            console.log(3);
            return next(buildError("mongoose Error", `need to pass manager employess array in quary`, 500));
        }
        else {
            arrEmployess = arrEmployess.split(',');
            console.log(2);
        }

        const allTasks = await getAllTasks(arrEmployess);
        console.log(allTasks);
        res.status(200).send(allTasks);
    } catch (error) {
        return next(buildError("Error", error.message, 500))
    }

})

//get task by id
router.get('/:id', auth, async (req, res, next) => {
    try {
        console.log("in get task by id");

        const { id } = req.params;
        console.log("/// " + id);

        //בדיקת תקינות של סוג המשתנה שהועבר בנתיב        
        if (!mongoose.isObjectIdOrHexString(id))
            return next(buildError("Id Format Error", "invalid id format at url", 400));

        const user = req.userInfo;
        const task = await getTaskById(id);

        console.log(user.id, "user id !!$");
        console.log(task.workerTaskId, " who does !!$");
        console.log(user.id != task.workerTaskId, " equal ??$");


        // בדיקת הרשאות - האם זה המשתמש עצמו / עובד שמושיך למנהל / משימה משויכת לעובד
        if (user.id != task.workerTaskId && !(user.connectedEmployess).includes(task.workerTaskId)) {
            return next(buildError("Authorization", "access blocked, user not allow", 403));
        }


        // נוסיף כאן שליפה של שמות המשתמשים ונחזיר אותם כחלק מה-Task
        const creator = await getUserById(task.userIdCreatorTask);
        const worker = await getUserById(task.workerTaskId);

        console.log(task, "123");
        
        const taskWithNames = {
            ...task.toObject(),
            creatorName: `${creator.name.first} ${creator.name.last}`,
            workerName: `${worker.name.first} ${worker.name.last}`
        };

        res.status(200).send(taskWithNames);

    } catch (error) {
        return next(buildError("Error", error.message, 500))
    }
});

//update task
router.put('/:id', auth, taskValidation, async (req, res, next) => {
    try {
        const { id } = req.params;
        const newtask = req.newTaskNormalize;
        console.log("new task " + newtask);

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
        return next(buildError("Error", error.message, 500))
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
        return next(buildError("Error", error.message, 500))
    }
});

router.patch('/like-unlike', auth, async (req, res, next) => {
    try {
        console.log("at router like task");
        console.log(req);

        const { task_id } = req.body;
        console.log(task_id + "---10000");

        const task = await likeUnlikeTask(task_id);
        res.status(200).send(task);


    } catch (error) {
        return next(buildError("Error", error.message, 500))
    }
})

module.exports = router;
