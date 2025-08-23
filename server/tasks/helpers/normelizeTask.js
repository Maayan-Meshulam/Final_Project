//נהפוך את אובייקט המשימה למשימה שניתן לשלוח למסד נתונים
//נוסיף תמונה במידה ואין
//נוסיף userIdCreatorTask
//נוסיף workerTaskId
const {isObjectIdOrHexString} = require("mongoose");
const buildError = require("../../helpers/erorrs/errorsHandeling");
const mongoose = require("mongoose");

const taskNormalization = (task, user) => {
    console.log("in task normalize");
    
    return ({
        ...task,
        userIdCreatorTask: user.id,
        workerTaskId: task.workerTaskId ?? user.id
    });

};

module.exports = { taskNormalization }