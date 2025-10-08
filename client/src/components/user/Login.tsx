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
import type { JwtPayload } from "jwt-decode";


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
            console.log(JSON.stringify(values) + " values");
            loginUser(values)
                .then(res => {
                    const token = res.data;
                    saveTokenInStorage(token); //שמירת הטוקן בזיכרון
                    let userInfo = tokenDecoding(token) as any // פענוח הטוקן
                    console.log(JSON.stringify(userInfo) + "888888888888888");

                    dispatch(setState(userInfo)); // נאחסן בחנות את המידע עבור המשתמש שהתחבר
                    formik.resetForm();
                    userInfo.managerLevel < 1 ? nav('/tasks/myTasks') : nav('/users/managerDash');
                })
                .catch(error => console.log(error))
        })
    });

    console.log(formik);

    return (<>
        <form onSubmit={formik.handleSubmit} id={style.loginBg}>
            <div className={style.loginForm}>

                <CreateInputs type="text" id="email" name="אימייל" formik={formik} placeholder="example@example.com" />

                <CreateInputs type="password" id="password" name="סיסמא" formik={formik} />

                <p style={{color:"white"}}>שכחת סיסמא ? לחץ <Link to="/users/send-email">כאן</Link> לשחזור</p>

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