import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/previewMission/preivewDiaplayMission.module.css';
import { useSelector } from "react-redux";
import { getTokenInStorage } from "../../services/tokenService";
import { deleteUser, getAllUsers, getUserById } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import DeleteUser from "../user/DeleteUser";
import UpdateUser from "../user/UpdateUser";
import FilterBar from "../layot/FilterBar";

interface ManageEmployeeProps {

}

const ManageEmployee: FunctionComponent<ManageEmployeeProps> = () => {

    const userInfo = useSelector((state: any) => state.userBaseInfo);
    const token = getTokenInStorage() as string;

    const [closeDeleting, setCloseDeleting] = useState<boolean>(false);
    const [toggleCloseDeleting, toggleSetCloseDeleting] = useState<boolean>(false);
    const [closeUpdating, setCloseUpdating] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [filters, setFilters] = useState<any>({});
    const [arrTemp, setArrTemp] = useState<any>([]);
    const [arrFilter, setArrFilter] = useState<any>([]);
    const [allUsers, setAllUsers] = useState<any>([]);

    const nav = useNavigate();

    const filterTable = () => {
        console.log(16);

        const arrAllCities: any = [];
        const arrAllRoles: any = [];
        const arrAllTypeWork: any = [];
        const arrAllFromWhereWork: any = [];
        const arrAllDepartment: any = [];

        Object.entries(filters).forEach(([key, value]) => {

            //שדה שלא מתקיים נדלג עליו - אין צורך בסינון שלו
            if (!value)
                return

            const [type, ...rest] = key.split("_"); //פירוק למערך לפי התו המועבר
            console.log(rest);
            const valueOriginal = rest.join(" "); // הרכבת מחרוזת לפי התו המועבר
            console.log(valueOriginal);

            //נוסיף את הערך למערך המתאים לו
            //נקבל מערכים שבכל אחד מהם יש את כל הסינונים שנבחרו בהתאם לסוג שלהם
            if (type == "city")
                arrAllCities.push(valueOriginal)
            else if (type == "role")
                arrAllRoles.push(valueOriginal)
            else if (type == "typeWork")
                arrAllTypeWork.push(valueOriginal)
            else if (type == "fromWhereWork")
                arrAllFromWhereWork.push(valueOriginal)
            else if (type == "department")
                arrAllDepartment.push(valueOriginal)

        });

        //נסנן את המערך
        //אם המערך ריק - סימן שלא נבחרו סינונים לסוג הספציפי ונחזיר את המשתמש
        //אם המערך לא ריק - נבדוק האם הסינונים שיש תואמים למשתמש ואם כן נחזיר אותו
        const filterd = arrTemp.filter((employee: any) => {
            const chosenCity = arrAllCities.length == 0 || arrAllCities.includes(employee.address.city)
            const chosenRole = arrAllRoles.length == 0 || arrAllRoles.includes(employee.role);
            const chosenTypeWork = arrAllTypeWork.length == 0 || arrAllTypeWork.includes(employee.jobType);
            const chosenFromWhereWork = arrAllFromWhereWork.length == 0 || arrAllFromWhereWork.includes(employee.fromWhereWorking);
            const chosenDepartment = arrAllDepartment.length == 0 || arrAllDepartment.includes(employee.department);

            return chosenCity && chosenRole && chosenTypeWork
                && chosenFromWhereWork && chosenDepartment
        });

        setArrFilter(filterd);
    }

    useEffect(() => {
        console.log(userInfo.connectedEmployess);
        console.log(userInfo.connectedEmployess.length);


        getAllUsers(userInfo.connectedEmployess, token)
            .then(res => {
                console.log(res.data + "123 123 123 123");
                setAllUsers(res.data);
                setArrFilter(res.data);
                setArrTemp(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [toggleCloseDeleting, userInfo]);


    useEffect(() => {
        console.log("before filtering");
        filterTable();
    }, [filters]);


    return (<>
        <div className="container">
            <FilterBar allEmployees={allUsers} setfilters={setFilters} />
            <div className={style.scroller_container}>
                <table className={style.dashBoardTasks}>
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
                            <th>סוג עבודה</th>
                            <th>מאיפה עובד</th>
                            <th>מחלקה</th>
                            <th>מנהל ישיר</th>
                            <th>רמת ניהול</th>
                            <th>צפייה</th>
                            <th>עריכה</th>
                            <th>מחיקה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrFilter.length > 0 && arrFilter.map((user: any) => (
                            <tr key={user._id}>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.birthDay}</td>
                                <td>{user.address.city}</td>
                                <td>{user.address.street}</td>
                                <td>{user.address.houseNumber}</td>
                                <td>{user.role}</td>
                                <td>{user.jobType}</td>
                                <td>{user.fromWhereWorking}</td>
                                <td>{user.department}</td>
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