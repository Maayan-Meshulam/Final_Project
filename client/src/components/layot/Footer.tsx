import type { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearState } from "../../redux/userInfoState";
import { removeTokenFromStorage } from "../../services/tokenService";
import style from "../../style/navber_footer/navbar_footer.module.css";


interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {

    const userInfo = useSelector((state: any) => state.userBaseInfo);
    console.log(JSON.stringify(userInfo) + "-----------------------------------------------------------------");

    const dispatch = useDispatch();

    return (<>
        <footer className={style.footerContainer}>
            <div className={style.footerInlineContainer}>
                {/* משתמש רגיל מחובר  */}
                {userInfo.id && userInfo.managerLevel < 1 && (
                    <>
                        <div className="footer-item">
                            <Link className="footer-link footerLinks ${style.footerLinks}" to="/" onClick={() => {
                                dispatch(clearState()); //איפוס מידע על המשתמש
                                removeTokenFromStorage()
                            }}>Exit</Link>
                        </div>

                        <div className="footer-item">
                            <Link className={`footer-link ${style.footerLinks}`} to="/tasks/myTasks">My Tasks</Link >
                        </div>
                    </>
                )}

                {/* מנהל מחובר*/}
                {userInfo.id && userInfo.managerLevel >= 1 && (
                    <>
                        <div className="footer-item">
                            <Link className={`footer-link ${style.footerLinks}`} to="/" onClick={() => {
                                dispatch(clearState()); //איפוס מידע על המשתמש
                                removeTokenFromStorage()
                            }}>Exit</Link>
                        </div>

                        <div className="footer-item">
                            <Link className={`footer-link ${style.footerLinks}`} to="/tasks/myTasks">My Tasks</Link >
                        </div>

                        <div className="footer-item">
                            <Link className={`footer-link ${style.footerLinks}`} to="/users/managerDash">ManagerDash</Link >
                        </div>

                        <div className="footer-item">
                            <Link className={`footer-link ${style.footerLinks}`} to="/users/manageEmployess">Manage Employees</Link >
                        </div>

                        <div className="footer-item">
                            <Link className={`footer-link ${style.footerLinks}`} to="/tasks/manageEmployessTasks">Manage Employees Tasks</Link >
                        </div>
                    </>
                )}

                {/* משתמש לא מחובר */}
                {!userInfo.id && (
                    <>
                        <div className="footer-item">
                            <Link className={`footer-link ${style.footerLinks}`} to="/">Login</Link>
                        </div>
                    </>
                )}
            </div>

            <hr style={{ width: "90%" }} />

            <div className={style.footerInlineContainer}>
                כל הזכויות שמורות | מעיין משולם
            </div>

        </footer>
    </>);
}
export default Footer;