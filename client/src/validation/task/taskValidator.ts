import * as Yup from 'yup';

const GENERAL_VALID = Yup.string().required().min(2).max(256);

export const taskSchema :any = {
    title: GENERAL_VALID,
    subTitle: GENERAL_VALID,
    description: GENERAL_VALID.concat(Yup.string().max(1024)),
    deadLine: Yup.string().required(),
    receiptDate: Yup.string().required(),
    type: Yup.string().required(),
    status: Yup.string().required()
};

console.log("after validaion acheama");


