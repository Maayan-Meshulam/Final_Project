import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/manageEmployee/manageEmployee.module.css';
import { useSelector } from "react-redux";
import { getTokenInStorage } from "../../services/tokenService";
import { deleteUser, getAllUsers, getUserById } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import DeleteUser from "../user/DeleteUser";
import UpdateUser from "../user/UpdateUser";

interface ManageEmployeeProps {

}

const ManageEmployee: FunctionComponent<ManageEmployeeProps> = () => {

    const userInfo = useSelector((state: any) => state.userBaseInfo);
    const token = getTokenInStorage() as string;
    const [closeDeleting, setCloseDeleting] = useState<any>(false);
    const [closeUpdating, setCloseUpdating] = useState<any>(false);
    const [toggleCloseUpdating, setToggleCloseUpdating] = useState<any>(false);


    const [allUsers, setAllUsers] = useState<any>([]);

    const nav = useNavigate();

    useEffect(() => {
        getAllUsers(userInfo.connectedEmployess, token)
            .then(res => {
                console.log(res.data);
                setAllUsers(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [toggleCloseUpdating]);


    return (<>

        <table className={style.employessTable}>
            <caption>employees</caption>
            <thead>
                <tr>
                    <th>שם פרטי</th>
                    <th>שם משפחה</th>
                    <th>טלפון</th>
                    <th>אימייל</th>
                    <th>תאריך לידה</th>
                    <th>עיר</th>
                    <th>רחוב</th>
                    <th>מספר בית</th>
                    <th>תפקיד</th>
                    <th>מנהל ישיר</th>
                    <th>רמת ניהול</th>
                    <th>צפייה</th>
                    <th>עריכה</th>
                    <th>מחיקה</th>
                </tr>
            </thead>
            <tbody>
                {allUsers.length > 0 && allUsers.map((user: any) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.birthDay}</td>
                        <td>{user.address.city}</td>
                        <td>{user.address.street}</td>
                        <td>{user.address.houseNumber}</td>
                        <td>{user.role}</td>
                        <td>{user.directManager}</td>
                        <td>{user.managerLevel}</td>
                        <td onClick={() => {
                            console.log('click on', user._id);
                            getUserById(user._id, token)
                                .then(res => nav(`/users/${user._id}`))
                                .catch(err => console.log(err))
                        }}>פרטים נוספים</td>

                        <td onClick={() => {
                            setCloseUpdating(true);
                        }}>עריכה</td>
                        <td>
                            {closeUpdating && <UpdateUser oncloseUpdating={setCloseUpdating} user={user} onToggleUpdateUser={setToggleCloseUpdating} />}
                        </td>

                        <td onClick={() => {
                            setCloseDeleting(true);
                            window.location.reload();
                        }}>מחיקה</td>
                        <td>
                            {closeDeleting && <DeleteUser onCloseDeleting={setCloseDeleting} user={user} />}
                        </td>
                    </tr>


                ))}
            </tbody>
        </table>

    </>);
}

export default ManageEmployee;