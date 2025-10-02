import { useEffect, useState, type FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, Link } from "react-router-dom";
import { clearState, setState } from "../../redux/userInfoState";
import { getTokenInStorage, removeTokenFromStorage } from "../../services/tokenService";
import style from "../../style/navber_footer/navbar_footer.module.css";
import UpdateUser from "../user/UpdateUser";
import { getUserById, sendEmail } from "../../services/userService";
import EnterCode from "../user/EnterCode";


interface NavbarProps {

}

const Navbar: FunctionComponent<NavbarProps> = () => {

    const userInfo = useSelector((state: any) => state.userBaseInfo);
    console.log(JSON.stringify(userInfo) + "-----------------------------------------------------------------");
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
        console.log(userInfo.id + "iddd");

        getUserById(userInfo.id, token as string)
            .then(res => {
                console.log("???????????????????????????????????????");
                console.log(JSON.stringify(res.data) + "9999");
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }, [userInfo])

    useEffect(() => {
        setRandomNum(Math.floor(Math.random() * 1_000_000));
    }, [])

    return (<>
        <nav className="navbar navbar-expand-lg" id={style.navbarContainer}>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {/* משתמש רגיל מחובר  */}
                    {userInfo.id && userInfo.managerLevel < 1 && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users/login" onClick={() => {
                                    dispatch(clearState()); //איפוס מידע על המשתמש
                                    removeTokenFromStorage()
                                }}>Exit</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks/myTasks">My Tasks</Link >
                            </li>


                            {user && randomNum &&
                                <li>
                                    <span onClick={() => {
                                        console.log(user.email, userInfo.id, randomNum)
                                        sendEmail(user.email, userInfo._id, randomNum)
                                            .then((res) => {
                                                setCloseCode(true);
                                                console.log(12312312);
                                            })
                                            .catch(err => console.log(err))
                                    }}>Edit User</span>

                                    {/* <span onClick={() => setCloseUpdating(true)}>Edit User</span>
                                {closeUpdating && user && <UpdateUser user={user} oncloseUpdating={setCloseUpdating} />} */}
                                </li>
                            }
                        </>
                    )}


                    {/* מנהל מחובר*/}
                    {userInfo.id && userInfo.managerLevel >= 1 && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users/login" onClick={() => {
                                    dispatch(clearState()); //איפוס מידע על המשתמש
                                    removeTokenFromStorage()
                                }}>Exit</Link>
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
                        </>
                    )}

                    {/* משתמש לא מחובר */}
                    {!userInfo.id && (
                        <>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/users/login">Login</Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav >

        {closeCode && randomNum !== null && user && <>
            <EnterCode codeFromEmail={randomNum} user={user} onclosecode={setCloseCode}/>
        </>
        }
    </>);
}
export default Navbar;