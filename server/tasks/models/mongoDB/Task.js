const { Schema, model, default: mongoose } = require('mongoose');
const { GENERAL_VALIDATION, MINI_GENERAL_VALIDATION, WORKER } = require('../../../helpers/mongoDB/generalValidation');
const { required } = require('joi');

const taskSchema = Schema({
    title: GENERAL_VALIDATION,
    subTitle: GENERAL_VALIDATION,
    description: { ...GENERAL_VALIDATION, maxLngth: 1024 },
    workerTaskId: {}, //ברגע ששיניתי זה לא עבד טוב
    receiptDate: { type: Date }, //לשנות ל date ??
    deadLine: { type: Date },
    status: MINI_GENERAL_VALIDATION,
    type: MINI_GENERAL_VALIDATION,
    userIdCreatorTask: { type: mongoose.Types.ObjectId, required: true },
    priority: { type: String, required: true }
});


const Task = model("task", taskSchema);
module.exports = Task;
