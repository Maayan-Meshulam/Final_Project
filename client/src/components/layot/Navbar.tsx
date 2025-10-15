import { useEffect, useState, type FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, Link, useNavigate } from "react-router-dom";
import { clearState, setState } from "../../redux/userInfoState";
import { getTokenInStorage, removeTokenFromStorage } from "../../services/tokenService";
import style from "../../style/navber_footer/navbar_footer.module.css";
import UpdateUser from "../user/UpdateUser";
import { getUserById, sendEmail } from "../../services/userService";
import EnterCode from "../user/EnterCode";
import { errorMessage, successMessage } from "../../toastify/toastifyService";


interface NavbarProps {

}

const Navbar: FunctionComponent<NavbarProps> = () => {

    const userInfo = useSelector((state: any) => state.userBaseInfo);
    const [closeUpdating, setCloseUpdating] = useState<boolean>(false);
    const [user, setUser] = useState(null);
    const [randomNum, setRandomNum] = useState<number | null>(null)
    const [closeCode, setCloseCode] = useState<boolean>(false)
    const dispatch = useDispatch();
    // let userFromStore = useSelector((state: any) => state.userBaseInfo);
    // dispatch(clearState()); //איפוס מידע על המשתמש
    // dispatch(setState(userInfo)); // נאחסן בחנות את המידע עבור המשתמש שהתחבר


    useEffect(() => {
        const token = getTokenInStorage();
     

        if (token && userInfo.id) {
            getUserById(userInfo.id, token as string)
                .then(res => {
                    setUser(res.data);
                })
                .catch(error => errorMessage(error.message))
        }

    }, [userInfo])

    useEffect(() => {
        setRandomNum(Math.floor(Math.random() * 1_000_000));
    }, [])

    const nav = useNavigate()

    return (<>
        <nav className="navbar navbar-expand-lg " id={style.navbarContainer}>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavDropdown">
                <ul className="navbar-nav ">
                    {/* משתמש רגיל מחובר  */}
                    {userInfo.id && userInfo.managerLevel < 1 && (
                        <>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => {
                                    dispatch(clearState()); //איפוס מידע על המשתמש
                                    removeTokenFromStorage();
                                    successMessage("התנתקת בהצלחה ! מצפים לראותך בקרוב");
                                    nav('/')
                                }}>Exit</button>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks/myTasks">My Tasks</Link >
                            </li>


                            {user && randomNum &&
                                <li style={{
                                    display: "flex", flexDirection: 'row', position: "absolute",
                                    top: "10px", right: "20px"
                                }}>
                                    <span
                                        style={{ cursor: "pointer" }}
                                        className="nav-link"
                                        onClick={() => {
                                            sendEmail(user.email, userInfo._id, randomNum)
                                                .then((res) => {
                                                    setCloseCode(true);
                                                    successMessage("איימייל נשלח בהצלחה !")
                                                })
                                                .catch(error => error.response ? errorMessage(error.response.data)
                                                    : errorMessage("שגיאה כללית -לא נשלחה בקשה"));
                                        }}>Edit User</span>
                                    {user && <img className={style.profile} src={`http://localhost:3131/${user.image.url}`} alt={user.image.alt} />}
                                </li>
                            }



                        </>
                    )}


                    {/* מנהל מחובר*/}
                    {userInfo.id && userInfo.managerLevel >= 1 && (
                        <>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => {
                                    dispatch(clearState()); //איפוס מידע על המשתמש
                                    removeTokenFromStorage();
                                    successMessage("התנתקת בהצלחה ! מצפים לראותך בקרוב");
                                    nav('/')
                                }}>Exit</button>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks/myTasks">My Tasks</Link >
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Manager
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="dropdown-item" to="/users/managerDash">ManagerDash</Link >
                                    <Link className="dropdown-item" to="/users/manageEmployess">Manage Employees</Link >
                                    <Link className="dropdown-item" to="/tasks/manageEmployessTasks">Manage Employees Tasks</Link >
                                </div>
                            </li>

                            {user && randomNum &&
                                <li
                                    style={{
                                        display: "flex", flexDirection: 'row', position: "absolute",
                                        top: "10px", right: "20px"
                                    }}>
                                    <span
                                        style={{ cursor: "pointer" }}
                                        className="nav-link"
                                        onClick={() => {
                                            sendEmail(user.email, userInfo._id, randomNum)
                                                .then((res) => {
                                                    setCloseCode(true);
                                                    successMessage("איימייל נשלח בהצלחה !")
                                                })
                                                .catch(error => error.response ? errorMessage(error.response.data)
                                                    : errorMessage("שגיאה כללית -לא נשלחה בקשה"));
                                        }}>Edit User</span>
                                    {user && <img className={style.profile} src={`http://localhost:3131/${user.image.url}`} alt={user.image.alt} />}
                                </li>
                            }
                        </>
                    )}

                    {/* משתמש לא מחובר */}
                    {!userInfo.id && (
                        <>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Login</Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav >

        {closeCode && randomNum !== null && user && <>
            <EnterCode codeFromEmail={randomNum} user={user} onclosecode={setCloseCode} />
        </>
        }
    </>);
}
export default Navbar;