//נהפוך את אובייקט המשימה למשימה שניתן לשלוח למסד נתונים
//נוסיף תמונה במידה ואין
//נוסיף userIdCreatorTask
//נוסיף workerTaskId

const taskNormalization = (task, user) => {

    console.log(user.id + "******");
    console.log("in task normalize");
    
    return ({
        ...task,
        userIdCreatorTask: user.id,
        workerTaskId: task.workerTaskId == "" ? user.id :  task.workerTaskId 
    });

};

module.exports = { taskNormalization }