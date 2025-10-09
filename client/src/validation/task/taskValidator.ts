import * as Yup from 'yup';

const GENERAL_VALID = Yup.string().required().min(2).max(256);

export const taskSchema :any = {
    title: GENERAL_VALID,
    subTitle: GENERAL_VALID,
    description: GENERAL_VALID.max(1024),
    // description: GENERAL_VALID.concat(Yup.string().max(1024)), // זה מוחק את השדה של החובה - שלחתי הודעה לחברה של YUP
    deadLine: Yup.string().required(),
    receiptDate: Yup.string().required(),
    type: Yup.string().required(),
    status: Yup.string().required(),
    workerTaskId: Yup.string().required(),
    priority: Yup.string().required(),
    star: Yup.number().oneOf([0, 1], "הערכים המותרים ה 0 /1 ").required()
};

console.log("after validaion acheama");


