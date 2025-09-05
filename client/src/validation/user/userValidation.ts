import * as Yup from 'yup'

const userLoginValidation = {
    email: Yup.string().email('אימייל לא תואם לתבנית').required('שדה זה הינו חובה'),
    password: Yup.string().required('שדה זה הינו חובה')
}

const BASIC_VAL_STRING = Yup.string().required();
const BASIC_VAL_NUMBER = Yup.number().required();


const userRegisterValidation = {
    firstName: BASIC_VAL_STRING,
    lastName: BASIC_VAL_STRING,
    phone: BASIC_VAL_STRING,
    email: BASIC_VAL_STRING,
    password: BASIC_VAL_STRING,
    birthDay: Yup.date().required(),
    url: Yup.string(),
    alt: Yup.string(),
    city: BASIC_VAL_STRING,
    street: BASIC_VAL_STRING,
    houseNumber: BASIC_VAL_NUMBER,
    zip: BASIC_VAL_NUMBER,
    startDate: Yup.date().required(),
    role: BASIC_VAL_STRING,
    jobType: BASIC_VAL_STRING,
    fromWhereWorking: BASIC_VAL_STRING,
    directManager: BASIC_VAL_STRING,
    department: BASIC_VAL_STRING,
    team: BASIC_VAL_STRING,
    managerLevel: BASIC_VAL_STRING,
    connectedEmployess: Yup.array()
}

export {
    userLoginValidation,
    userRegisterValidation
}