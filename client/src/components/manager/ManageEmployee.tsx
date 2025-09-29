import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/previewMission/preivewDiaplayMission.module.css';
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

    const [closeDeleting, setCloseDeleting] = useState<boolean>(false);
    const [toggleCloseDeleting, toggleSetCloseDeleting] = useState<boolean>(false);
    const [closeUpdating, setCloseUpdating] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);


    const [allUsers, setAllUsers] = useState<any>([]);

    const nav = useNavigate();

    useEffect(() => {
        getAllUsers(userInfo.connectedEmployess, token)
            .then(res => {
                console.log(res.data + "123 123 123 123");
                setAllUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [toggleCloseDeleting]);


    return (<>
        <div className="container">
            <div className={style.scroller_container}>
                <table className={style.dashBoardTasks}>
                    <thead>
                        <tr>
                            <th>מזהה</th>
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
                                }}>
                                    <i className="fa-solid fa-eye"></i>
                                </td>

                                <td onClick={() => {
                                    setCloseUpdating(true);
                                    setSelectedUser(user);
                                }}> <i className="fa-solid fa-pen-to-square"></i>
                                </td>
                                <td><i className="fa-solid fa-trash" onClick={() => {
                                    setSelectedUser(user);
                                    setCloseDeleting(true);
                                }}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {closeDeleting && selectedUser && <DeleteUser onToggleCloseDeleting={toggleSetCloseDeleting} onCloseDeleting={setCloseDeleting} user={selectedUser} />}
            {closeUpdating && selectedUser && <UpdateUser oncloseUpdating={setCloseUpdating} user={selectedUser} />}
        </div>
    </>);
}

export default ManageEmployee;