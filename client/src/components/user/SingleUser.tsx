import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/singleMission/singleMission.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTaskById } from "../../services/tasksService";
import { getTokenInStorage } from "../../services/tokenService";
import { statusConvert, typeConvert } from "../../helpers/Convert_valueSelectsToString";
import UpdateTask from '../user/UpdaeTask';
import DeleteTask from "./DeleteTask";
import { getAllUsers, getUserById } from "../../services/userService";
import { useSelector } from "react-redux";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import imageTaskSrc from "../../images/task.png";
import ErrorPremission from "../layot/ErrorPremission";
import { errorMessage } from "../../toastify/toastifyService";


interface SingleUserProps {

}

const SingleUser: FunctionComponent<SingleUserProps> = () => {

    const userInfo = useSelector((state: any) => state.userBaseInfo);

    const token = getTokenInStorage() as string;
    const [user, setUser] = useState<any>()

    const [closeDeleting, setCloseDeleting] = useState<boolean>(false);
    const [closeUpdating, setCloseUpdating] = useState<boolean>(false);

    const [namesMap, setNamesMap] = useState<Map<string, string>>(new Map());

    const nav = useNavigate()


    const { id } = useParams() as any

    useEffect(() => {
        if (!token)
            return;

        getAllUsers(userInfo.connectedEmployess, token)
            .then(res => {
                const mapNames = new Map();

                (res.data).forEach((user: any) => {
                    const name = `${user.name.first} ${user.name.last}`;
                    mapNames.set(user._id, name);
                });

                getUserById(userInfo.id, token)
                    .then(res1 => {
                        mapNames.set(userInfo.id, `${res1.data.name.first} ${res1.data.name.last}`)
                        setNamesMap(mapNames);
                    })
                    .catch(error => errorMessage(error.message));

            })
            .catch(error => errorMessage(error.message))

        getUserById(id, token)
            .then(res => {
                setUser(res.data);
            })
            .catch(error => errorMessage(error.message))

    }, [closeUpdating]);

    if (!userInfo.id) {
        return <ErrorPremission />
    }

    return (<>
        {user ? (<div className="container">

            <div className="btn_back" onClick={() => nav(+1)}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="btn_forword" onClick={() => nav(-1)}>
                <i className="fa-solid fa-arrow-right"></i>
            </div>


            <div className={style.containerWithImg}>

                <div className={style.task_characterization}>
                    <h1>{user.name.first} {user.name.last}</h1>
                    <h3>{user.role}</h3>
                    <p>מזהה : <span>{user._id}</span></p>
                    <p>{user.phone} | {user.email}</p>
                    <p>יומולדת : <span>{(user.birthDay).split('T')[0]}</span></p>
                    <p>{user.address.city}, {user.address.street}, {user.address.houseNumber}, {user.address.zip}</p>
                    <p>תאריך התחלה : <span>{(user.startDate).split('T')[0]}</span></p>
                    <p>{user.jobType}, {user.fromWhereWorking}</p>
                    <p>מנהל ישיר : <span>{namesMap.get(user.directManager)}</span></p>
                    <p>מחלקה וצוות : <span>{user.department}, {user.team}</span></p>
                    <p>רמת ניהול : <span>{user.managerLevel}</span></p>
                    <p><span>עובדים משויכים :</span>{(user.connectedEmployess).map((user: any) => {
                        return namesMap.get(user) + ' , '
                    })}</p>
                    <img className={style.image} src={`http://localhost:3131/${user.image.url}`} alt={user.image.alt} />

                    <div className={style.buttons_container}>

                        <button
                            type="button"
                            id={style.exit}
                            onClick={() => {
                                setCloseUpdating(true);
                            }}
                        >Edit</button>

                        {closeUpdating && <UpdateUser oncloseUpdating={setCloseUpdating} user={user} />}

                        <button
                            type="button"
                            id={style.delete}
                            onClick={() => {
                                setCloseDeleting(true);
                            }}
                        >Delete</button>
                        {closeDeleting && <DeleteUser onCloseDeleting={setCloseDeleting} user={user} />}

                    </div>
                </div>
                <img className={style.imgTask} src={imageTaskSrc} alt="task" />

            </div>

        </div >) : (<ErrorPremission />)
        }

    </>);
}

export default SingleUser;