import * as Yup from 'yup'

const userLoginValidation = {
    email: Yup.string()
        .required('שדה זה הינו חובה')
        .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            'אימייל לא תואם לתבנית'
        ),
    password: Yup.string().
        required('שדה זה הינו חובה').
        matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`|\\/]).{8,}$/,
            'הסיסמא חייבת להכיל לפחות אות אחת גדולה, אחת קטנה, מספר, תו מיוחד ומינימום 8 ספרות'
        )
}

const BASIC_VAL_STRING = Yup.string().required();
const BASIC_VAL_NUMBER = Yup.number().required();


const userRegisterValidation = {
    firstName: BASIC_VAL_STRING.min(2, "יש להזין לפחות 2 תווים"),
    lastName: BASIC_VAL_STRING.min(2, "יש להזין לפחות 2 תווים"),
    phone: BASIC_VAL_STRING.matches(/^(?:972|0)([23489]\d{7}|5\d{8})$/, 'טלפון לא תואם לתבנית'),
    email: BASIC_VAL_STRING.matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        'אימייל לא תואם לתבנית'
    ),
    password: BASIC_VAL_STRING.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~`|\\/]).{8,}$/,
        'הסיסמא חייבת להכיל לפחות אות אחת גדולה, אחת קטנה, מספר, תו מיוחד ומינימום 8 ספרות'
    ),
    birthDay: Yup.date().required(),
    alt: Yup.string().min(2, "יש להזין לפחות 2 תווים"),
    city: BASIC_VAL_STRING,
    street: BASIC_VAL_STRING,
    houseNumber: BASIC_VAL_NUMBER.min(1,"ערך מינימלי 1"),
    zip: BASIC_VAL_NUMBER.min(1,"ערך מינימלי 1"),
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