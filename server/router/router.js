const express = require("express");
const router = express.Router();
const taskRouter = require("../tasks/routes/taskController");
// const userRouter = require("../users/routes/userController");

router.use('/tasks', taskRouter);
// router.use('/users', userRouter);

module.exports = router;