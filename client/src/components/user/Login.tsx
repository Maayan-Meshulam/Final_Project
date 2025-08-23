import type { FunctionComponent } from "react";
import style from '../../style/login/login.module.css';

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
    return (<>
        <div id={style.loginBg}>
            <div className={style.loginForm}>
                <div className="form-floating">
                    <input type="email" className="form-control" id={style.emailInput} placeholder="name@example.com" />
                    <label htmlFor={style.emailInput}>Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id={style.passwordInput} placeholder="Password" />
                    <label htmlFor={style.passwordInput}>Password</label>
                </div>
                <div className={style.Btn_Form_Container}>
                    <button className={style.login_btn} type="button">login</button>
                    <button className={style.reset_btn} type="button">reset</button>
                </div>
            </div>
        </div>
    </>);
}

export default Login;