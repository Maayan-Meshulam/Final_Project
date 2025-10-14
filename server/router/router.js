const express = require("express");
const router = express.Router();
const taskRouter = require("../tasks/routes/taskController");
const userRouter = require("../users/routes/userController");
const { verifyLogin } = require("../users/models/userAccessDBService");
const buildError = require("../helpers/erorrs/errorsHandeling");
const { generateToken } = require("../auth/providers/jwt");

router.use('/tasks', taskRouter);
router.use('/users', userRouter);


module.exports = router;