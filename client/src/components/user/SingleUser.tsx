import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/singleMission/singleMission.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTaskById } from "../../services/tasksService";
import { getTokenInStorage } from "../../services/tokenService";
import { statusConvert, typeConvert } from "../../helpers/Convert_valueSelectsToString";
import UpdateTask from '../user/UpdaeTask';
import DeleteTask from "./DeleteTask";
import { getUserById } from "../../services/userService";
import { useSelector } from "react-redux";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import imageTaskSrc from "../../images/task.png";


interface SingleUserProps {

}

const SingleUser: FunctionComponent<SingleUserProps> = () => {

    const userInfo = useSelector((state: any) => state.userBaseInfo);

    const token = getTokenInStorage() as string;
    const [user, setUser] = useState<any>()

    const [closeDeleting, setCloseDeleting] = useState<boolean>(false);
    const [closeUpdating, setCloseUpdating] = useState<boolean>(false);
    const [toggleUpdaedUser, settoggleUpdaedUser] = useState<boolean>(false);


    const { id } = useParams() as any

    useEffect(() => {
        getUserById(id, token)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [toggleUpdaedUser]);

    return (<>
        {user ? (<div className="container">
            <div className={style.containerWithImg}>

                <div className={style.task_characterization}>
                    <h1>{user.name.first} {user.name.last}</h1>
                    <h3>{user.role}</h3>
                    <p>מזהה : <span>{user._id}</span></p>
                    <p>{user.phone} | {user.email}</p>
                    <p>יומולדת : <span>{user.birthDay}</span></p>
                    <p>{user.address.city}, {user.address.street}, {user.address.houseNumber}, {user.address.zip}</p>
                    <p>תאריך התחלה : <span>{user.startDate}</span></p>
                    <p>{user.jobType}, {user.fromWhereWorking}</p>
                    <p>מנהל ישיר : <span>{user.directManager}</span></p>
                    <p>מחלקה וצוות : <span>{user.department}, {user.team}</span></p>
                    <p>רמת ניהול : <span>{user.managerLevel}</span></p>
                    <p><span>עובדים משויכים :</span>{user.connectedEmployess}</p>

                    <div className={style.buttons_container}>

                        <button
                            type="button"
                            onClick={() => {
                                setCloseUpdating(true);
                            }}
                        >Edit</button>

                        {closeUpdating && <UpdateUser oncloseUpdating={setCloseUpdating} user={user} />}

                        <button
                            type="button"
                            onClick={() => {
                                setCloseDeleting(true);
                            }}
                        >Delete</button>
                        {closeDeleting && <DeleteUser onCloseDeleting={setCloseDeleting} user={user} />}

                    </div>
                </div>
                <img className={style.imgTask} src={imageTaskSrc} alt="task" />

            </div>

        </div >) : (<p>אין הרשאה לפעולה</p>)
        }

    </>);
}

export default SingleUser;