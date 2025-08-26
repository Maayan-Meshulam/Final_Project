import * as Yup from 'yup'

const userLoginValidation = {
    email: Yup.string().email('אימייל לא תואם לתבנית').required('שדה זה הינו חובה'),
    password: Yup.string().required('שדה זה הינו חובה')
}

export{
    userLoginValidation
}