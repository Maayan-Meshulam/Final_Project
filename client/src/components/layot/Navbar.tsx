import type { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearState } from "../../redux/userInfoState";
import { removeTokenFromStorage } from "../../services/tokenService";

interface NavbarProps {

}

const Navbar: FunctionComponent<NavbarProps> = () => {

    const userInfo = useSelector((state: any) => state.userBaseInfo);
    console.log(JSON.stringify(userInfo) + "-----------------------------------------------------------------");

    const dispatch = useDispatch();

    return (<>
        <div id="navbarContainer" style={{ display: "flex", padding: "15px", background: "lightBlue" }}>

            {/* מנהל מחובר */}
            {userInfo.id && userInfo.managerLevel < 1 && (
                <>
                    <Link to="/users/login" onClick={() => {
                        dispatch(clearState()); //איפוס מידע על המשתמש
                        removeTokenFromStorage();
                    }}>Exit</Link>
                    <Link to="/tasks/myTasks">My Tasks</Link>
                </>
            )}

            {/* משתמש רגיל מחובר */}
            {userInfo.id && userInfo.managerLevel >= 1 && (
                <>
                    <Link to="/users/login" onClick={() => {
                        dispatch(clearState()); //איפוס מידע על המשתמש
                        removeTokenFromStorage()
                    }}>Exit</Link>
                    <Link to="/tasks/myTasks">My Tasks</Link>
                    <Link to="/users/managerDash">Manager Dash</Link>

                </>
            )}

            {/* משתמש לא מחובר */}
            {!userInfo.id && (
                <>
                    <Link to="/users/login">login</Link>
                </>
            )}

        </div>
    </>);
}

export default Navbar;