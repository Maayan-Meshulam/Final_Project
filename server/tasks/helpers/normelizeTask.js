//נהפוך את אובייקט המשימה למשימה שניתן לשלוח למסד נתונים
//נוסיף תמונה במידה ואין
//נוסיף userIdCreatorTask
//נוסיף workerTaskId

const { default: mongoose } = require("mongoose");

const taskNormalization = (task, user) => {

    console.log(user.id + "******");
    console.log("in task normalize");
    
    return ({
        ...task,
        userIdCreatorTask: user.id,
        workerTaskId:  task.workerTaskId == "0" ? user.id :  (task.workerTaskId ?? user.id)
    });

};

module.exports = { taskNormalization }