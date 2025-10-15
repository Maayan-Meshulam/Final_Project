import type { FunctionComponent } from "react";
import style from '../../style/login/login.module.css';
import { useFormik } from "formik";
import * as Yup from 'yup'
import { loginUser } from "../../services/userService";
import { userLoginValidation } from "../../validation/user/userValidation";
import CreateInputs from "./CreateInputs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setState } from "../../redux/userInfoState";
import { saveTokenInStorage, tokenDecoding } from "../../services/tokenService";
import { errorMessage, successMessage } from "../../toastify/toastifyService";


interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object(userLoginValidation),
        onSubmit: (values => {
            loginUser(values)
                .then(res => {
                    const token = res.data;
                    saveTokenInStorage(token); //שמירת הטוקן בזיכרון
                    let userInfo = tokenDecoding(token) as any // פענוח הטוקן
                    dispatch(setState(userInfo)); // נאחסן בחנות את המידע עבור המשתמש שהתחבר
                    formik.resetForm();
                    userInfo.managerLevel < 1 ? nav('/tasks/myTasks') : nav('/users/managerDash');
                    successMessage(" התחברת בהצלחה ! ברוך הבא");
                })
                .catch(error => error.response ? errorMessage(error.response.data)
                    : errorMessage("שגיאה כללית -לא נשלחה בקשה"));
        })
    });


    return (<>
        <form onSubmit={formik.handleSubmit} id={style.loginBg}>
            <div className={style.loginForm}>

                <div>
                    <div className={`form-floating `}>

                        <label>email :</label>
                        <input
                            type="text"
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values["email"]}
                            className={`form-control ${style.formInputs}`}
                        />
                    </div>

                    <p style={{ color: "white" }}>{formik.touched["email"] && formik.errors["email"]}</p>
                </div>

                <div>
                    <div className={`form-floating `}>

                        <label>password :</label>
                        <input
                            type="password"
                            id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values["password"]}
                            className={`form-control ${style.formInputs}`}
                        />
                    </div>

                    <p style={{ color: "white" }}>{formik.touched["password"] && formik.errors["password"]}</p>
                </div>

                <p style={{ color: "white" }}>שכחת סיסמא ? לחץ <Link to="/users/send-email">כאן</Link> לשחזור</p>

                <div className={style.Btn_Form_Container}>
                    <button
                        className={style.login_btn}
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid}
                    >login
                    </button>

                    <button
                        className={style.reset_btn}
                        type="button">reset
                    </button>

                </div>
            </div>
        </form>
    </>);
}

export default Login;