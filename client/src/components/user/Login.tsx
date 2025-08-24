import type { FunctionComponent } from "react";
import style from '../../style/login/login.module.css';
import { useFormik } from "formik";
import * as Yup from 'yup'
import { loginUser } from "../../services/userService";
import { userLoginValidation } from "../../validation/user/userValidation";
import CreateInputs from "./CreateInputs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setState } from "../../redux/userInfoState";


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
            console.log(values + " values");
            loginUser(values)
                .then(res => {
                    console.log(res.data);
                    dispatch(setState(res.data)); // נאחסן בחנות את המידע עבור המשתמש שהתחבר
                    formik.resetForm();
                    nav('/manageAllTaks');
                })
                .catch(error => console.log(error))
        })
    });

    console.log(formik);

    return (<>
        <form onSubmit={formik.handleSubmit} id={style.loginBg}>
            <div className={style.loginForm}>

                <CreateInputs type="text" id="email" name="אימייל" formik={formik} placeholder="example@example.com" />

                <CreateInputs type="password" id="pass" name="סיסמא" formik={formik} />

                <div className={style.Btn_Form_Container}>
                    <button
                        className={style.login_btn}
                        type="submit">login
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