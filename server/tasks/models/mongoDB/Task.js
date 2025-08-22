const { Schema, model } = require('mongoose');
const { GENERAL_VALIDATION, MINI_GENERAL_VALIDATION, WORKER } = require('../../../helpers/mongoDB/generalValidation');

const taskSchema = Schema({
    title: GENERAL_VALIDATION,
    subTitle: GENERAL_VALIDATION,
    description: { ...GENERAL_VALIDATION, maxLngth: 1024 },
    workerTaskId: WORKER,
    receiptDate: { type: String }, //לשנות ל date ??
    deadLine: { type: String },
    status: MINI_GENERAL_VALIDATION,
    type: MINI_GENERAL_VALIDATION 
});


const Task = model("task", taskSchema);
module.exports = Task;
